import { NATIVE_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { bindMediaElement, bufferedEnd, safeDuration, waitForMetadata } from "../../core/media-events.js";
import { clamp } from "../../core/utils.js";
import { chunkToBufferSource, collectChunks, iterateChunks } from "../shared/chunks.js";
import { createMediaElement, removeElement } from "../shared/dom.js";
import { applyCaptionTracks, listAudioTracks, listTextTracks, setMediaAudioTrack, setMediaTextTrack } from "../shared/media-tracks.js";
// src/adapters/chunked/engine.ts
function supportsMse(mimeType) {
	return typeof MediaSource !== "undefined" && typeof MediaSource.isTypeSupported === "function" && MediaSource.isTypeSupported(mimeType);
}
function waitForSourceOpen(mediaSource) {
	if (mediaSource.readyState === "open") return Promise.resolve();
	return new Promise((resolve) => {
		mediaSource.addEventListener("sourceopen", () => resolve(), { once: true });
	});
}
function appendBuffer(sourceBuffer, buffer) {
	return new Promise((resolve, reject) => {
		const cleanup = () => {
			sourceBuffer.removeEventListener("updateend", onEnd);
			sourceBuffer.removeEventListener("error", onError);
		};
		const onEnd = () => {
			cleanup();
			resolve();
		};
		const onError = () => {
			cleanup();
			reject(createPlayerError("A media chunk could not be appended.", { code: "media-error" }));
		};
		sourceBuffer.addEventListener("updateend", onEnd, { once: true });
		sourceBuffer.addEventListener("error", onError, { once: true });
		try {
			sourceBuffer.appendBuffer(buffer);
		} catch (cause) {
			cleanup();
			reject(createPlayerError("A media chunk could not be appended.", {
				code: "media-error",
				cause
			}));
		}
	});
}
/**
* Engine for media delivered as chunks.
*
* Video/audio use MediaSource when the MIME type is supported; otherwise the
* chunks are buffered into a Blob first. Images use the image engine.
*/
function createChunkedMediaEngine(context) {
	const { source, options, emit } = context;
	const chunked = "chunks" in source.source ? source.source : null;
	const mimeType = source.mimeType ?? "video/mp4";
	const mode = chunked?.mode ?? "auto";
	const delay = chunked?.chunkDelay ?? 0;
	let media = null;
	let detach = null;
	let objectUrl = null;
	let mediaSource = null;
	let destroyed = false;
	const captions = options.captions?.tracks ?? source.source.captions;
	const createElement = () => {
		const element = source.kind === "audio" ? createMediaElement("audio", options) : createMediaElement("video", options);
		applyCaptionTracks(element, captions);
		return element;
	};
	const appendRest = async (iterator, sourceBuffer) => {
		try {
			for await (const chunk of iterator) {
				if (destroyed) return;
				const buffer = await chunkToBufferSource(chunk);
				if (sourceBuffer.updating) await new Promise((resolve) => {
					sourceBuffer.addEventListener("updateend", () => resolve(), { once: true });
				});
				await appendBuffer(sourceBuffer, buffer);
			}
			if (!destroyed && mediaSource?.readyState === "open") mediaSource.endOfStream();
		} catch (error) {
			if (!destroyed) emit("error", { error: error instanceof Error ? error : createPlayerError("The chunked stream failed.", { code: "media-error" }) });
		}
	};
	const loadBlob = async (element) => {
		if (chunked === null) throw createPlayerError("Chunk data is missing.", { code: "invalid-argument" });
		const blob = await collectChunks(chunked.chunks, mimeType, delay);
		if (typeof URL.createObjectURL !== "function") throw createPlayerError("Object URLs are not available in this environment.", { code: "unsupported-environment" });
		objectUrl = URL.createObjectURL(blob);
		element.src = objectUrl;
		const metadata = waitForMetadata(element);
		element.load();
		await metadata;
	};
	const loadMse = async (element) => {
		if (chunked === null) throw createPlayerError("Chunk data is missing.", { code: "invalid-argument" });
		mediaSource = new MediaSource();
		objectUrl = URL.createObjectURL(mediaSource);
		element.src = objectUrl;
		element.load();
		await waitForSourceOpen(mediaSource);
		const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
		const iterator = iterateChunks(chunked.chunks);
		const first = await iterator.next();
		if (first.done === true) throw createPlayerError("The chunked source is empty.", { code: "media-error" });
		await appendBuffer(sourceBuffer, await chunkToBufferSource(first.value));
		appendRest(iterator, sourceBuffer);
	};
	const loadStream = async (element) => {
		if (mode === "blob" || typeof MediaSource === "undefined" || !supportsMse(mimeType)) {
			await loadBlob(element);
			return;
		}
		try {
			await loadMse(element);
		} catch (error) {
			if (mode !== "auto") throw error;
			mediaSource = null;
			if (objectUrl !== null && typeof URL.revokeObjectURL === "function") {
				URL.revokeObjectURL(objectUrl);
				objectUrl = null;
			}
			element.removeAttribute("src");
			element.load();
			await loadBlob(element);
		}
	};
	return {
		kind: source.kind,
		get element() {
			return media;
		},
		capabilities: NATIVE_CAPABILITIES,
		async load() {
			const element = createElement();
			media = element;
			detach = bindMediaElement(element, emit);
			context.host.append(element);
			await loadStream(element);
			const preferred = options.captions?.defaultTrack;
			if (options.captions?.enabled === false) setMediaTextTrack(element, null);
			else if (preferred !== void 0 && preferred !== null) setMediaTextTrack(element, preferred);
		},
		async play() {
			if (media === null) throw createPlayerError("No media element is attached.", { code: "invalid-state" });
			await media.play();
		},
		pause() {
			media?.pause();
		},
		seek(time) {
			if (media === null) return;
			const duration = safeDuration(media);
			media.currentTime = duration > 0 ? clamp(time, 0, duration) : Math.max(0, time);
		},
		setVolume(volume) {
			if (media !== null) media.volume = clamp(volume, 0, 1);
		},
		setMuted(muted) {
			if (media !== null) media.muted = muted;
		},
		setPlaybackRate(rate) {
			if (media !== null) media.playbackRate = clamp(rate, .25, 4);
		},
		setTextTrack(id) {
			if (media !== null) setMediaTextTrack(media, id);
		},
		setAudioTrack(id) {
			if (media !== null) setMediaAudioTrack(media, id);
		},
		getQualities() {
			return [];
		},
		getTextTracks() {
			return media === null ? [] : listTextTracks(media);
		},
		getAudioTracks() {
			return media === null ? [] : listAudioTracks(media);
		},
		getCurrentTime() {
			return media?.currentTime ?? 0;
		},
		getDuration() {
			return media === null ? 0 : safeDuration(media);
		},
		getBuffered() {
			return media === null ? 0 : bufferedEnd(media);
		},
		destroy() {
			destroyed = true;
			detach?.();
			detach = null;
			mediaSource = null;
			if (media !== null) {
				media.pause();
				media.removeAttribute("src");
				media.load();
				removeElement(media);
				media = null;
			}
			if (objectUrl !== null && typeof URL.revokeObjectURL === "function") {
				URL.revokeObjectURL(objectUrl);
				objectUrl = null;
			}
		}
	};
}
export { createChunkedMediaEngine };

//# sourceMappingURL=engine.js.map