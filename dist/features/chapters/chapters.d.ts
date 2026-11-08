import { Chapter } from "../../core/types.js";
/** Returns chapters sorted by start time. */
export declare function sortChapters(chapters: readonly Chapter[]): readonly Chapter[];
/** Finds the chapter containing a timestamp. */
export declare function findChapterAt(chapters: readonly Chapter[], time: number): Chapter | null;
/** Returns progress through a chapter in the inclusive 0–1 range. */
export declare function chapterProgress(chapter: Chapter, time: number): number;
/** The chapter active at a timestamp, or the nearest previous chapter. */
export declare function activeChapterAt(chapters: readonly Chapter[], time: number): Chapter | null;
/** Returns the next chapter after a timestamp. */
export declare function nextChapter(chapters: readonly Chapter[], time: number): Chapter | null;
/** Returns the previous chapter before (or containing) a timestamp. */
export declare function previousChapter(chapters: readonly Chapter[], time: number): Chapter | null;
/** A chapter marker positioned on a timeline. */
export interface ChapterMarker {
  readonly chapter: Chapter;
  /** Position in the inclusive 0–1 range. */
  readonly position: number;
}
/** Returns chapter marker positions for a timeline. */
export declare function chapterMarkers(chapters: readonly Chapter[], duration: number): readonly ChapterMarker[];
//# sourceMappingURL=chapters.d.ts.map