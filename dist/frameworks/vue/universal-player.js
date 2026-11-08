import { UniversalPlayer as UniversalPlayer$1 } from "../../core/player.js";
import { sourceToken } from "../../core/source.js";
import { createInitialState } from "../../core/state.js";
import { computed, defineComponent, h, isRef, onBeforeUnmount, onMounted, shallowRef, watch } from "vue";
// src/frameworks/vue/universal-player.ts
function read(value) {
	if (value === void 0) return;
	return isRef(value) ? value.value : value;
}
function resolveOptions(options) {
	const resolved = {};
	for (const key of Object.keys(options)) {
		if (key === "host") continue;
		const value = read(options[key]);
		if (value !== void 0) resolved[key] = value;
	}
	return resolved;
}
/**
* Creates and maintains one player for the lifetime of a Vue component.
*
* Works with Vue 2.7 and Vue 3 through the shared Composition API surface.
*/
function useUniversalPlayer(options) {
	const state = shallowRef(createInitialState());
	const player = shallowRef(null);
	let instance = null;
	let unsubscribes = [];
	const connect = () => {
		const host = read(options.host);
		if (host === null || host === void 0 || instance !== null) return;
		const created = new UniversalPlayer$1({
			...resolveOptions(options),
			container: host
		});
		instance = created;
		player.value = created;
		state.value = created.state;
		unsubscribes = [created.on("statechange", (next) => {
			state.value = next;
		}), created.on("timeupdate", (event) => {
			state.value = {
				...state.value,
				currentTime: event.currentTime,
				duration: event.duration,
				buffered: event.buffered
			};
		})];
		const source = read(options.source);
		if (source !== void 0) created.load(source).catch(() => {});
	};
	const destroy = () => {
		for (const unsubscribe of unsubscribes) unsubscribe();
		unsubscribes = [];
		instance?.destroy();
		instance = null;
		player.value = null;
	};
	onMounted(connect);
	onBeforeUnmount(destroy);
	watch(() => sourceToken(read(options.source)), () => {
		const source = read(options.source);
		if (instance !== null && source !== void 0) instance.load(source).catch(() => {});
	});
	watch(() => read(options.volume), (value) => {
		if (instance !== null && value !== void 0) instance.setVolume(value);
	});
	watch(() => read(options.muted), (value) => {
		if (instance !== null && value !== void 0) instance.setMuted(value);
	});
	watch(() => read(options.playbackRate), (value) => {
		if (instance !== null && value !== void 0) instance.setPlaybackRate(value);
	});
	return {
		state,
		player,
		async play() {
			await instance?.play();
		},
		pause() {
			instance?.pause();
		},
		seek(time) {
			instance?.seek(time);
		},
		async load(source) {
			await instance?.load(source);
		},
		destroy
	};
}
/**
* Vue host component.
*
* The same component works in Vue 2.7 and Vue 3.
*/
const UniversalPlayer = defineComponent({
	name: "UniversalPlayer",
	props: {
		src: {
			type: [String, Object],
			default: void 0
		},
		controls: {
			type: String,
			default: void 0
		},
		theme: {
			type: String,
			default: void 0
		},
		locale: {
			type: String,
			default: void 0
		},
		autoplay: {
			type: Boolean,
			default: void 0
		},
		muted: {
			type: Boolean,
			default: void 0
		},
		loop: {
			type: Boolean,
			default: void 0
		},
		poster: {
			type: String,
			default: void 0
		},
		volume: {
			type: Number,
			default: void 0
		},
		playbackRate: {
			type: Number,
			default: void 0
		},
		chapters: {
			type: Array,
			default: void 0
		},
		thumbnails: {
			type: Object,
			default: void 0
		},
		captions: {
			type: Object,
			default: void 0
		},
		survey: {
			type: [Object, Function],
			default: void 0
		},
		playlist: {
			type: Object,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			default: true
		},
		clickToPlay: {
			type: Boolean,
			default: true
		},
		autoHideControls: {
			type: Boolean,
			default: true
		},
		seekStep: {
			type: Number,
			default: void 0
		},
		volumeStep: {
			type: Number,
			default: void 0
		}
	},
	emits: [
		"ready",
		"play",
		"pause",
		"timeupdate",
		"ended",
		"error",
		"statechange"
	],
	setup(props, { emit, slots }) {
		const hostRef = shallowRef(null);
		const onEvent = (event) => {
			switch (event.type) {
				case "loadedmetadata":
					emit("ready", event.detail);
					break;
				case "play":
					emit("play");
					break;
				case "pause":
					emit("pause");
					break;
				case "timeupdate":
					emit("timeupdate", event.detail);
					break;
				case "ended":
					emit("ended");
					break;
				case "error":
					emit("error", event.detail.error);
					break;
				case "statechange": emit("statechange", event.detail);
			}
		};
		const api = useUniversalPlayer({
			host: hostRef,
			source: computed(() => props.src),
			controls: computed(() => props.controls),
			theme: computed(() => props.theme),
			locale: computed(() => props.locale),
			autoplay: computed(() => props.autoplay),
			muted: computed(() => props.muted),
			loop: computed(() => props.loop),
			poster: computed(() => props.poster),
			volume: computed(() => props.volume),
			playbackRate: computed(() => props.playbackRate),
			chapters: computed(() => props.chapters),
			thumbnails: computed(() => props.thumbnails),
			captions: computed(() => props.captions),
			survey: computed(() => props.survey),
			playlist: computed(() => props.playlist),
			keyboard: computed(() => props.keyboard),
			clickToPlay: computed(() => props.clickToPlay),
			autoHideControls: computed(() => props.autoHideControls),
			seekStep: computed(() => props.seekStep),
			volumeStep: computed(() => props.volumeStep),
			onEvent
		});
		return () => h("div", {
			ref: hostRef,
			"data-up-framework": "vue",
			"data-up-status": api.state.value.status
		}, slots.default?.());
	}
});
export { UniversalPlayer, useUniversalPlayer };

//# sourceMappingURL=universal-player.js.map