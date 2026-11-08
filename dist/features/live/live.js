// src/features/live/live.ts
/** Returns true when a duration represents an unbounded live stream. */
function isLiveDuration(duration) {
	return !Number.isFinite(duration);
}
/** Returns the seekable window, or null when nothing is seekable. */
function seekableRange(media) {
	const ranges = media.seekable;
	if (ranges.length === 0) return null;
	const start = ranges.start(0);
	const end = ranges.end(ranges.length - 1);
	if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
	return {
		start,
		end
	};
}
/** Returns the live edge (end of the seekable window), or null. */
function liveEdge(media) {
	return seekableRange(media)?.end ?? null;
}
/** Returns true when playback is within `threshold` seconds of the live edge. */
function isAtLiveEdge(media, threshold = 10) {
	const edge = liveEdge(media);
	return edge !== null && edge - media.currentTime <= threshold;
}
export { isAtLiveEdge, isLiveDuration, liveEdge, seekableRange };

//# sourceMappingURL=live.js.map