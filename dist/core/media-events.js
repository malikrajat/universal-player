import { createPlayerError } from "./errors.js";
// src/core/media-events.ts
/** Returns the end of the last buffered range, or 0 when nothing is buffered. */
function bufferedEnd(media) {
	const ranges = media.buffered;
	if (ranges.length === 0) return 0;
	const end = ranges.end(ranges.length - 1);
	return Number.isFinite(end) ? end : 0;
}
/** Returns a finite duration or 0 for live/unknown streams. */
function safeDuration(media) {
	return Number.isFinite(media.duration) ? media.duration : 0;
}
/** True when the media has no finite duration. */
function isLiveMedia(media) {
	return !Number.isFinite(media.duration);
}
/**
* Bridges native media-element events into the player event bus.
*
* Returns an unsubscribe function that detaches every listener.
*/
function bindMediaElement(media, emit) {
	const controller = new AbortController();
	const { signal } = controller;
	const listen = (type, listener) => {
		media.addEventListener(type, listener, { signal });
	};
	listen("play", () => emit("play", void 0));
	listen("playing", () => emit("playing", void 0));
	listen("pause", () => emit("pause", void 0));
	listen("waiting", () => emit("waiting", void 0));
	listen("canplay", () => emit("canplay", void 0));
	listen("ended", () => emit("ended", void 0));
	listen("timeupdate", () => {
		emit("timeupdate", {
			currentTime: media.currentTime,
			duration: safeDuration(media),
			buffered: bufferedEnd(media)
		});
	});
	listen("progress", () => emit("progress", { buffered: bufferedEnd(media) }));
	listen("durationchange", () => {
		emit("durationchange", {
			duration: safeDuration(media),
			live: isLiveMedia(media)
		});
	});
	listen("loadedmetadata", () => {
		const video = media instanceof HTMLVideoElement ? media : null;
		emit("loadedmetadata", {
			duration: safeDuration(media),
			width: video?.videoWidth ?? 0,
			height: video?.videoHeight ?? 0,
			live: isLiveMedia(media)
		});
	});
	listen("seeking", () => emit("seeking", { currentTime: media.currentTime }));
	listen("seeked", () => emit("seeked", { currentTime: media.currentTime }));
	listen("volumechange", () => {
		emit("volumechange", {
			volume: media.volume,
			muted: media.muted
		});
	});
	listen("ratechange", () => emit("ratechange", { playbackRate: media.playbackRate }));
	listen("error", () => {
		const mediaError = media.error;
		emit("error", { error: createPlayerError(mediaError?.message ?? "The media could not be played.", {
			code: "media-error",
			...mediaError == null ? {} : {
				cause: mediaError,
				details: { code: mediaError.code }
			}
		}) });
	});
	listen("enterpictureinpicture", () => emit("pictureinpicturechange", { pictureInPicture: true }));
	listen("leavepictureinpicture", () => emit("pictureinpicturechange", { pictureInPicture: false }));
	return () => controller.abort();
}
/** Resolves when metadata is available, or rejects on media error. */
function waitForMetadata(media) {
	if (media.readyState >= HTMLMediaElement.HAVE_METADATA) return Promise.resolve();
	return new Promise((resolve, reject) => {
		const cleanup = () => {
			media.removeEventListener("loadedmetadata", onLoaded);
			media.removeEventListener("error", onError);
		};
		const onLoaded = () => {
			cleanup();
			resolve();
		};
		const onError = () => {
			cleanup();
			reject(createPlayerError(media.error?.message ?? "The media could not be loaded.", {
				code: "media-error",
				...media.error == null ? {} : { cause: media.error }
			}));
		};
		media.addEventListener("loadedmetadata", onLoaded, { once: true });
		media.addEventListener("error", onError, { once: true });
		if (media.readyState >= HTMLMediaElement.HAVE_METADATA) {
			cleanup();
			resolve();
		}
	});
}
export { bindMediaElement, bufferedEnd, isLiveMedia, safeDuration, waitForMetadata };

//# sourceMappingURL=media-events.js.map