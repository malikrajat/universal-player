import { EMBED_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { clamp } from "../../core/utils.js";
import { createIframe, removeElement, waitForIframe } from "./dom.js";
// src/adapters/shared/iframe-engine.ts
function youtubeId(url) {
	if (url.hostname === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] ?? null;
	const byQuery = url.searchParams.get("v");
	if (byQuery !== null && byQuery.length > 0) return byQuery;
	const segments = url.pathname.split("/").filter(Boolean);
	const last = segments[segments.length - 1];
	return last === void 0 ? null : last;
}
function vimeoId(url) {
	const segments = url.pathname.split("/").filter(Boolean);
	for (let index = segments.length - 1; index >= 0; index -= 1) {
		const segment = segments[index];
		if (segment !== void 0 && /^\d+$/.test(segment)) return segment;
	}
	return null;
}
function embedOrigin() {
	try {
		return typeof location === "undefined" ? null : location.origin;
	} catch {
		return null;
	}
}
function embedUrl(provider, sourceUrl, context) {
	const url = new URL(sourceUrl);
	if (provider === "generic") return url.href;
	const autoplay = context.options.autoplay === true ? "1" : "0";
	const muted = context.options.muted === true ? "1" : "0";
	const controls = context.options.controls === "native" ? "1" : "0";
	if (provider === "youtube") {
		const id = youtubeId(url);
		if (id === null) throw createPlayerError("The YouTube URL does not contain a video id.", {
			code: "invalid-argument",
			details: { source: sourceUrl }
		});
		const params = new URLSearchParams({
			enablejsapi: "1",
			playsinline: "1",
			rel: "0",
			autoplay,
			mute: muted,
			controls,
			cc_load_policy: context.options.captions?.enabled === false ? "0" : "1"
		});
		const origin = embedOrigin();
		if (origin !== null) params.set("origin", origin);
		return `https://www.youtube.com/embed/${id}?${params.toString()}`;
	}
	const id = vimeoId(url);
	if (id === null) throw createPlayerError("The Vimeo URL does not contain a video id.", {
		code: "invalid-argument",
		details: { source: sourceUrl }
	});
	return `https://player.vimeo.com/video/${id}?${new URLSearchParams({
		api: "1",
		autoplay,
		muted,
		controls
	}).toString()}`;
}
function post(iframe, provider, method, value) {
	if (provider === "generic") return;
	const target = iframe.contentWindow;
	if (target === null) return;
	const message = provider === "youtube" ? {
		event: "command",
		func: method,
		args: value === void 0 ? [] : [value]
	} : {
		method,
		...value === void 0 ? {} : { value }
	};
	target.postMessage(JSON.stringify(message), "*");
}
function toNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
/** Iframe engine shared by YouTube, Vimeo and generic embeds. */
function createIframeEngine(context, provider) {
	const { source, options, emit } = context;
	let iframe = null;
	let volume = options.volume ?? 1;
	let muted = options.muted ?? false;
	let currentTime = 0;
	let duration = 0;
	let buffered = 0;
	let playbackRate = options.playbackRate ?? 1;
	let controller = null;
	const emitTime = () => {
		emit("timeupdate", {
			currentTime,
			duration,
			buffered
		});
	};
	const applyDuration = (next) => {
		if (!Number.isFinite(next) || next < 0 || next === duration) return;
		duration = next;
		emit("durationchange", {
			duration,
			live: false
		});
	};
	const applyState = (state) => {
		switch (state) {
			case 0:
				emit("pause", void 0);
				emit("ended", void 0);
				break;
			case 1:
				emit("play", void 0);
				emit("playing", void 0);
				break;
			case 2:
				emit("pause", void 0);
				break;
			case 3:
				emit("waiting", void 0);
				break;
			case 5: emit("loadedmetadata", {
				duration,
				width: 0,
				height: 0,
				live: false
			});
		}
	};
	const handleYouTube = (message) => {
		if (message.event === "onReady") {
			emit("loadedmetadata", {
				duration,
				width: 0,
				height: 0,
				live: false
			});
			return;
		}
		if (message.event === "onStateChange" && typeof message.info === "number") {
			applyState(message.info);
			return;
		}
		if (message.event === "infoDelivery" && typeof message.info === "object") {
			const info = message.info;
			const nextTime = toNumber(info.currentTime);
			const nextDuration = toNumber(info.duration);
			const fraction = toNumber(info.videoLoadedFraction);
			if (nextDuration !== null) applyDuration(nextDuration);
			if (nextTime !== null) {
				currentTime = Math.max(0, nextTime);
				emitTime();
			}
			if (fraction !== null) {
				buffered = Math.max(0, fraction) * duration;
				emit("progress", { buffered });
			}
			if (typeof info.playerState === "number") applyState(info.playerState);
		}
	};
	const handleVimeo = (message) => {
		switch (message.event) {
			case "ready":
				emit("loadedmetadata", {
					duration,
					width: 0,
					height: 0,
					live: false
				});
				break;
			case "loaded": {
				const nextDuration = toNumber(message.data?.duration);
				if (nextDuration !== null) applyDuration(nextDuration);
				break;
			}
			case "play":
			case "playProgress":
				emit("play", void 0);
				emit("playing", void 0);
				break;
			case "pause":
				emit("pause", void 0);
				break;
			case "finish":
			case "ended":
				emit("pause", void 0);
				emit("ended", void 0);
				break;
			case "timeupdate":
			case "progress": {
				const nextTime = toNumber(message.data?.seconds);
				const nextDuration = toNumber(message.data?.duration);
				if (nextDuration !== null) applyDuration(nextDuration);
				if (nextTime !== null) {
					currentTime = Math.max(0, nextTime);
					emitTime();
				}
				break;
			}
		}
	};
	const onMessage = (event) => {
		if (iframe === null || event.source !== iframe.contentWindow) return;
		const raw = event.data;
		if (typeof raw !== "string" || raw.length === 0) return;
		try {
			const message = JSON.parse(raw);
			if (provider === "youtube") handleYouTube(message);
			else if (provider === "vimeo") handleVimeo(message);
		} catch {}
	};
	const requestInitialSync = () => {
		if (iframe === null) return;
		if (provider === "youtube") {
			iframe.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*");
			post(iframe, provider, "getDuration");
			return;
		}
		if (provider === "vimeo") {
			post(iframe, provider, "addEventListener", "timeupdate");
			post(iframe, provider, "addEventListener", "play");
			post(iframe, provider, "addEventListener", "pause");
			post(iframe, provider, "addEventListener", "finish");
			post(iframe, provider, "getDuration");
		}
	};
	return {
		kind: "embed",
		get element() {
			return iframe;
		},
		capabilities: options.qualities !== void 0 && options.qualities.length > 0 ? {
			...EMBED_CAPABILITIES,
			quality: true
		} : EMBED_CAPABILITIES,
		async load() {
			const element = createIframe("up-media up-embed", source.title ?? `${provider} player`, "autoplay; fullscreen; picture-in-picture; encrypted-media");
			iframe = element;
			controller = new AbortController();
			window.addEventListener("message", onMessage, { signal: controller.signal });
			context.host.append(element);
			const loaded = waitForIframe(element);
			element.src = embedUrl(provider, source.url, context);
			await loaded;
			requestInitialSync();
			emit("loadedmetadata", {
				duration: 0,
				width: 0,
				height: 0,
				live: false
			});
		},
		async play() {
			if (iframe === null) throw createPlayerError("No embed frame is attached.", { code: "invalid-state" });
			post(iframe, provider, provider === "youtube" ? "playVideo" : "play");
			emit("play", void 0);
			emit("playing", void 0);
		},
		pause() {
			if (iframe !== null) {
				post(iframe, provider, provider === "youtube" ? "pauseVideo" : "pause");
				emit("pause", void 0);
			}
		},
		seek(time) {
			if (iframe === null) return;
			currentTime = Math.max(0, duration > 0 ? Math.min(time, duration) : time);
			post(iframe, provider, provider === "youtube" ? "seekTo" : "setCurrentTime", currentTime);
			emit("seeking", { currentTime });
			emit("seeked", { currentTime });
		},
		setVolume(nextVolume) {
			volume = clamp(nextVolume, 0, 1);
			if (iframe === null) return;
			post(iframe, provider, provider === "youtube" ? "setVolume" : "setVolume", provider === "youtube" ? Math.round(volume * 100) : volume);
		},
		setMuted(nextMuted) {
			muted = nextMuted;
			if (iframe === null) return;
			if (provider === "youtube") {
				post(iframe, provider, muted ? "mute" : "unMute");
				return;
			}
			post(iframe, provider, "setVolume", muted ? 0 : volume);
		},
		setPlaybackRate(rate) {
			playbackRate = clamp(rate, .25, 4);
			if (iframe !== null) post(iframe, provider, "setPlaybackRate", playbackRate);
		},
		setQuality(quality) {
			if (iframe === null) return;
			if (provider === "youtube") post(iframe, provider, "setPlaybackQuality", quality ?? "default");
			else if (provider === "vimeo") post(iframe, provider, "setQuality", quality ?? "auto");
		},
		requestTimeSync() {
			if (iframe === null) return;
			if (provider === "youtube") post(iframe, provider, "getCurrentTime");
			else if (provider === "vimeo") post(iframe, provider, "getCurrentTime");
			emitTime();
		},
		getQualities() {
			return options.qualities ?? [];
		},
		getTextTracks() {
			return [];
		},
		getAudioTracks() {
			return [];
		},
		getCurrentTime() {
			return currentTime;
		},
		getDuration() {
			return duration;
		},
		getBuffered() {
			return buffered;
		},
		destroy() {
			controller?.abort();
			controller = null;
			removeElement(iframe);
			iframe = null;
		}
	};
}
export { createIframeEngine };

//# sourceMappingURL=iframe-engine.js.map