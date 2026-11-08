// src/features/speed/speed.ts
/** Playback rates offered by the built-in speed control. */
const PLAYBACK_RATES = [
	.25,
	.5,
	.75,
	1,
	1.25,
	1.5,
	1.75,
	2
];
/** Clamps a playback rate into the supported 0.25–4 range. */
function clampPlaybackRate(rate) {
	if (!Number.isFinite(rate)) return 1;
	return Math.min(Math.max(rate, .25), 4);
}
/** Formats a playback rate for display. */
function formatPlaybackRate(rate) {
	return `${rate}x`;
}
export { PLAYBACK_RATES, clampPlaybackRate, formatPlaybackRate };

//# sourceMappingURL=speed.js.map