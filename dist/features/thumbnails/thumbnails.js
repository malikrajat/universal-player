// src/features/thumbnails/thumbnails.ts
/** Finds the thumbnail cue covering a timestamp. */
function findThumbnailAt(track, time) {
	for (const cue of track.cues) if (time >= cue.startTime && time < cue.endTime) return cue;
	return null;
}
/** Returns the image URL for a timestamp, or null when no cue matches. */
function thumbnailUrlAt(track, time) {
	return findThumbnailAt(track, time)?.url ?? null;
}
/** Clamps a preview width to the thumbnail's intrinsic size. */
function thumbnailWidth(cue, maxWidth) {
	return Math.min(cue.width ?? maxWidth, maxWidth);
}
export { findThumbnailAt, thumbnailUrlAt, thumbnailWidth };

//# sourceMappingURL=thumbnails.js.map