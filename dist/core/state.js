import { capabilitiesForKind } from "./engine.js";
import { clamp } from "./utils.js";
// src/core/state.ts
/** Creates the initial immutable state snapshot for a player. */
function createInitialState(options = {}) {
	return {
		status: "idle",
		source: null,
		kind: null,
		capabilities: capabilitiesForKind(null),
		currentTime: 0,
		duration: 0,
		buffered: 0,
		volume: clamp(options.volume ?? 1, 0, 1),
		muted: options.muted ?? false,
		playbackRate: clamp(options.playbackRate ?? 1, .25, 4),
		playing: false,
		ended: false,
		seeking: false,
		live: options.live ?? false,
		fullscreen: false,
		pictureInPicture: false,
		quality: null,
		qualities: options.qualities ?? [],
		textTrack: null,
		textTracks: options.textTracks ?? [],
		audioTrack: null,
		audioTracks: options.audioTracks ?? [],
		chapters: options.chapters ?? [],
		activeChapter: null,
		playlist: null,
		survey: null,
		surveyOpen: false,
		error: null
	};
}
export { createInitialState };

//# sourceMappingURL=state.js.map