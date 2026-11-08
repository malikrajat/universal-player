import { PlayerOptions, PlayerState } from "./types.js";
export type InitialStateOptions = Pick<PlayerOptions, "volume" | "muted" | "playbackRate" | "live" | "qualities" | "textTracks" | "audioTracks" | "chapters" | "survey" | "playlist">;
/** Creates the initial immutable state snapshot for a player. */
export declare function createInitialState(options?: InitialStateOptions): PlayerState;
//# sourceMappingURL=state.d.ts.map