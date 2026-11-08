// src/features/quality/quality.ts
/** Returns quality levels sorted from highest to lowest. */
function normalizeQualityLevels(levels) {
	return [...levels].sort((left, right) => {
		const leftRank = left.height ?? left.bitrate ?? 0;
		return (right.height ?? right.bitrate ?? 0) - leftRank;
	});
}
/** Finds a quality level by id. */
function findQuality(levels, id) {
	if (id === null) return null;
	return levels.find((level) => level.id === id) ?? null;
}
/**
* Steps through the quality ladder.
*
* Levels are ordered highest first. A positive `direction` moves to a higher
* quality, a negative one to a lower quality. Passing the edge of the ladder
* selects automatic quality (`null`). When automatic quality is active, the
* first step picks the highest or lowest level in that direction.
*/
function stepQuality(levels, currentId, direction) {
	const sorted = normalizeQualityLevels(levels);
	if (sorted.length === 0 || direction === 0) return currentId;
	const index = sorted.findIndex((level) => level.id === currentId);
	if (index < 0) return direction > 0 ? sorted[0]?.id ?? null : sorted[sorted.length - 1]?.id ?? null;
	const next = index + (direction > 0 ? -1 : 1);
	return next < 0 || next >= sorted.length ? null : sorted[next]?.id ?? null;
}
/** Human-readable label for a quality level. */
function qualityLabel(level) {
	if (level.label.length > 0) return level.label;
	if (level.height !== void 0) return `${level.height}p`;
	if (level.bitrate !== void 0) return `${Math.round(level.bitrate / 1e3)} kbps`;
	return level.id;
}
export { findQuality, normalizeQualityLevels, qualityLabel, stepQuality };

//# sourceMappingURL=quality.js.map