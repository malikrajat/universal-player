import { NATIVE_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { bindMediaElement, bufferedEnd, safeDuration, waitForMetadata } from "../../core/media-events.js";
import { clamp } from "../../core/utils.js";
import { createMediaElement, removeElement } from "../shared/dom.js";
import { applyCaptionTracks, listAudioTracks, listTextTracks, setMediaAudioTrack, setMediaTextTrack } from "../shared/media-tracks.js";
// src/adapters/native/engine.ts
function sourceCaptions(context) {
	const fromOptions = context.options.captions?.tracks;
	const fromSource = context.source.source.captions;
	if (fromOptions !== void 0 && fromOptions.length > 0) return fromOptions;
	return fromSource;
}
function preferredCaptionId(context) {
	const configured = context.options.captions?.defaultTrack;
	if (configured !== void 0) return configured;
	return (sourceCaptions(context) ?? []).find((track) => track.default === true)?.id ?? null;
}
/** Native `<video>`/`<audio>` engine. */
function createNativeEngine(context) {
	const { source, options, emit } = context;
	let media = null;
	let detach = null;
	return {
		kind: source.kind,
		get element() {
			return media;
		},
		capabilities: NATIVE_CAPABILITIES,
		async load() {
			const element = source.kind === "audio" ? createMediaElement("audio", options) : createMediaElement("video", options);
			media = element;
			detach = bindMediaElement(element, emit);
			applyCaptionTracks(element, sourceCaptions(context));
			context.host.append(element);
			if (source.stream !== null) element.srcObject = source.stream;
			else element.src = source.url;
			const metadata = waitForMetadata(element);
			element.load();
			await metadata;
			const preferred = preferredCaptionId(context);
			if (options.captions?.enabled === false) setMediaTextTrack(element, null);
			else if (preferred !== null) setMediaTextTrack(element, preferred);
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
			detach?.();
			detach = null;
			if (media !== null) {
				media.pause();
				media.removeAttribute("src");
				media.srcObject = null;
				media.load();
				removeElement(media);
				media = null;
			}
		}
	};
}
export { createNativeEngine };

//# sourceMappingURL=engine.js.map