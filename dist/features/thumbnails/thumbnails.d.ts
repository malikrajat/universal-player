import { ThumbnailCue, ThumbnailTrack } from "../../core/types.js";
/** Finds the thumbnail cue covering a timestamp. */
export declare function findThumbnailAt(track: ThumbnailTrack, time: number): ThumbnailCue | null;
/** Returns the image URL for a timestamp, or null when no cue matches. */
export declare function thumbnailUrlAt(track: ThumbnailTrack, time: number): string | null;
/** Clamps a preview width to the thumbnail's intrinsic size. */
export declare function thumbnailWidth(cue: ThumbnailCue, maxWidth: number): number;
//# sourceMappingURL=thumbnails.d.ts.map