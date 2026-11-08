import { NATIVE_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { bindMediaElement, bufferedEnd, safeDuration, waitForMetadata } from "../../core/media-events.js";
import { clamp } from "../../core/utils.js";
import { createMediaElement, removeElement } from "../shared/dom.js";
import { applyCaptionTracks, listAudioTracks, listTextTracks, setMediaAudioTrack, setMediaTextTrack } from "../shared/media-tracks.js";
// src/adapters/hls/engine.ts
function toQualities(levels) {
	return levels.map((level, index) => {
		const label = level.height === void 0 ? `Level ${index + 1}` : `${level.height}p`;
		return {
			id: String(index),
			label,
			...level.width === void 0 ? {} : { width: level.width },
			...level.height === void 0 ? {} : { height: level.height },
			...level.bitrate === void 0 ? {} : { bitrate: level.bitrate }
		};
	});
}
/** HLS engine backed by the optional `hls.js` peer dependency. */
function createHlsEngine(context) {
	const { source, options, emit } = context;
	let video = null;
	let hls = null;
	let detach = null;
	let qualities = options.qualities ?? [];
	return {
		kind: "video",
		get element() {
			return video;
		},
		capabilities: {
			...NATIVE_CAPABILITIES,
			quality: true
		},
		async load() {
			const element = createMediaElement("video", options);
			video = element;
			detach = bindMediaElement(element, emit);
			applyCaptionTracks(element, options.captions?.tracks ?? source.source.captions);
			context.host.append(element);
			const Hls = (await import("hls.js")).default;
			if (!Hls.isSupported()) {
				if (element.canPlayType("application/vnd.apple.mpegurl") === "") throw createPlayerError("HLS playback is not supported in this browser.", { code: "unsupported-environment" });
				element.src = source.url;
				const metadata = waitForMetadata(element);
				element.load();
				await metadata;
				return;
			}
			const instance = new Hls({
				enableWorker: true,
				lowLatencyMode: options.live ?? false,
				backBufferLength: 90
			});
			hls = instance;
			await new Promise((resolve, reject) => {
				instance.on(Hls.Events.MANIFEST_PARSED, () => {
					qualities = toQualities(instance.levels);
					resolve();
				});
				instance.on(Hls.Events.ERROR, (...args) => {
					const payload = args[1];
					if (payload?.fatal === true) reject(createPlayerError("The HLS stream could not be loaded.", {
						code: "network-error",
						details: {
							...payload.details === void 0 ? {} : { details: payload.details },
							source: source.url
						}
					}));
				});
				instance.loadSource(source.url);
				instance.attachMedia(element);
			});
			instance.on(Hls.Events.LEVEL_SWITCHED, () => {
				emit("qualitychange", { quality: instance.autoLevelEnabled ? null : String(instance.currentLevel) });
			});
			await waitForMetadata(element);
		},
		async play() {
			if (video === null) throw createPlayerError("No media element is attached.", { code: "invalid-state" });
			await video.play();
		},
		pause() {
			video?.pause();
		},
		seek(time) {
			if (video !== null) {
				const duration = safeDuration(video);
				video.currentTime = duration > 0 ? clamp(time, 0, duration) : Math.max(0, time);
			}
		},
		setVolume(volume) {
			if (video !== null) video.volume = clamp(volume, 0, 1);
		},
		setMuted(muted) {
			if (video !== null) video.muted = muted;
		},
		setPlaybackRate(rate) {
			if (video !== null) video.playbackRate = clamp(rate, .25, 4);
		},
		setQuality(quality) {
			if (hls !== null) hls.currentLevel = quality === null ? -1 : Number(quality);
		},
		setTextTrack(id) {
			if (video !== null) setMediaTextTrack(video, id);
		},
		setAudioTrack(id) {
			if (video !== null) setMediaAudioTrack(video, id);
		},
		getQualities() {
			return qualities;
		},
		getTextTracks() {
			return video === null ? [] : listTextTracks(video);
		},
		getAudioTracks() {
			return video === null ? [] : listAudioTracks(video);
		},
		getCurrentTime() {
			return video?.currentTime ?? 0;
		},
		getDuration() {
			return video === null ? 0 : safeDuration(video);
		},
		getBuffered() {
			return video === null ? 0 : bufferedEnd(video);
		},
		destroy() {
			detach?.();
			detach = null;
			hls?.destroy();
			hls = null;
			if (video !== null) {
				video.pause();
				video.removeAttribute("src");
				video.load();
				removeElement(video);
				video = null;
			}
		}
	};
}
export { createHlsEngine };

//# sourceMappingURL=engine.js.map