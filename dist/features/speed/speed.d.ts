/** Playback rates offered by the built-in speed control. */
export declare const PLAYBACK_RATES: readonly [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
/** Clamps a playback rate into the supported 0.25–4 range. */
export declare function clampPlaybackRate(rate: number): number;
/** Formats a playback rate for display. */
export declare function formatPlaybackRate(rate: number): string;
//# sourceMappingURL=speed.d.ts.map