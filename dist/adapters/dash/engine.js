import { NATIVE_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { bindMediaElement, bufferedEnd, safeDuration, waitForMetadata } from "../../core/media-events.js";
import { clamp } from "../../core/utils.js";
import { createMediaElement, removeElement } from "../shared/dom.js";
import { applyCaptionTracks, listAudioTracks, listTextTracks, setMediaAudioTrack, setMediaTextTrack } from "../shared/media-tracks.js";
// src/adapters/dash/engine.ts
function toQualities(levels) {
	return levels.map((level, index) => {
		return {
			id: String(level.qualityIndex ?? index),
			label: level.height === void 0 ? `Level ${index + 1}` : `${level.height}p`,
			...level.width === void 0 ? {} : { width: level.width },
			...level.height === void 0 ? {} : { height: level.height },
			...level.bitrate === void 0 ? {} : { bitrate: level.bitrate }
		};
	});
}
/**
* Reads the quality ladder from whichever dash.js API is available.
*
* dash.js 4 exposed `getBitrateInfoListFor`; dash.js 5 replaced it with
* `getRepresentationsByType`. Supporting both keeps the documented
* `dashjs@^5` peer range working without dropping 4.x consumers.
*/
function qualityLevelsFor(player) {
	const bitrates = player.getBitrateInfoListFor?.("video");
	if (bitrates !== void 0) return toQualities(bitrates);
	return (player.getRepresentationsByTypeUnfiltered?.("video") ?? player.getRepresentationsByType?.("video") ?? []).map((representation, index) => {
		const height = representation.height;
		const bitrate = representation.bandwidth ?? (representation.bitrateInKbit === void 0 ? void 0 : representation.bitrateInKbit * 1e3);
		return {
			id: String(representation.index ?? index),
			label: height === void 0 ? `Level ${index + 1}` : `${height}p`,
			...representation.width === void 0 ? {} : { width: representation.width },
			...height === void 0 ? {} : { height },
			...bitrate === void 0 ? {} : { bitrate }
		};
	});
}
/** MPEG-DASH engine backed by the optional `dashjs` peer dependency. */
function createDashEngine(context) {
	const { source, options, emit } = context;
	let video = null;
	let dash = null;
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
			const module = await import("dashjs");
			if (typeof module.MediaPlayer !== "function") {
				element.src = source.url;
				const metadata = waitForMetadata(element);
				element.load();
				await metadata;
				return;
			}
			const player = module.MediaPlayer().create();
			dash = player;
			const events = module.MediaPlayer.events ?? {};
			const readyEvent = events["STREAM_INITIALIZED"] ?? events["CAN_PLAY"] ?? "streamInitialized";
			await new Promise((resolve) => {
				player.on(readyEvent, () => {
					qualities = qualityLevelsFor(player);
					resolve();
				});
				player.initialize(element, source.url, false);
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
			if (dash === null) return;
			dash.updateSettings({ streaming: { abr: { autoSwitchBitrate: { video: quality === null } } } });
			if (quality !== null) {
				const index = Number(quality);
				if (typeof dash.setQualityFor === "function") dash.setQualityFor("video", index);
				else dash.setRepresentationForTypeByIndex?.("video", index);
			}
		},
		setTextTrack(id) {
			if (video !== null) setMediaTextTrack(video, id);
		},
		setAudioTrack(id) {
			if (video !== null) setMediaAudioTrack(video, id);
		},
		getQualities() {
			if (dash !== null) {
				const next = qualityLevelsFor(dash);
				if (next.length > 0) qualities = next;
			}
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
			dash?.reset();
			dash = null;
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
export { createDashEngine };

//# sourceMappingURL=engine.js.map