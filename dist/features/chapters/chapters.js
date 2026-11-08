// src/features/chapters/chapters.ts
/** Returns chapters sorted by start time. */
function sortChapters(chapters) {
	return [...chapters].sort((left, right) => left.startTime - right.startTime);
}
/** Finds the chapter containing a timestamp. */
function findChapterAt(chapters, time) {
	const ordered = sortChapters(chapters);
	for (let index = 0; index < ordered.length; index += 1) {
		const chapter = ordered[index];
		if (chapter === void 0) continue;
		const end = chapter.endTime ?? ordered[index + 1]?.startTime ?? Number.POSITIVE_INFINITY;
		if (time >= chapter.startTime && time < end) return chapter;
	}
	return null;
}
/** Returns progress through a chapter in the inclusive 0–1 range. */
function chapterProgress(chapter, time) {
	const end = chapter.endTime;
	if (end === void 0 || end <= chapter.startTime) return time >= chapter.startTime ? 1 : 0;
	const progress = (time - chapter.startTime) / (end - chapter.startTime);
	return Math.min(Math.max(progress, 0), 1);
}
/** The chapter active at a timestamp, or the nearest previous chapter. */
function activeChapterAt(chapters, time) {
	return findChapterAt(chapters, time);
}
/** Returns the next chapter after a timestamp. */
function nextChapter(chapters, time) {
	return sortChapters(chapters).find((chapter) => chapter.startTime > time + .001) ?? null;
}
/** Returns the previous chapter before (or containing) a timestamp. */
function previousChapter(chapters, time) {
	const ordered = sortChapters(chapters);
	const current = findChapterAt(ordered, time);
	if (current !== null) return current;
	for (let index = ordered.length - 1; index >= 0; index -= 1) {
		const chapter = ordered[index];
		if (chapter !== void 0 && chapter.startTime < time) return chapter;
	}
	return null;
}
/** Returns chapter marker positions for a timeline. */
function chapterMarkers(chapters, duration) {
	if (!Number.isFinite(duration) || duration <= 0) return [];
	return sortChapters(chapters).filter((chapter) => chapter.startTime > 0 && chapter.startTime < duration).map((chapter) => ({
		chapter,
		position: Math.min(Math.max(chapter.startTime / duration, 0), 1)
	}));
}
export { activeChapterAt, chapterMarkers, chapterProgress, findChapterAt, nextChapter, previousChapter, sortChapters };

//# sourceMappingURL=chapters.js.map