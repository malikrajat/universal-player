/** Returns true when a duration represents an unbounded live stream. */
export declare function isLiveDuration(duration: number): boolean;
/** Returns the seekable window, or null when nothing is seekable. */
export declare function seekableRange(media: HTMLMediaElement): {
  start: number;
  end: number;
} | null;
/** Returns the live edge (end of the seekable window), or null. */
export declare function liveEdge(media: HTMLMediaElement): number | null;
/** Returns true when playback is within `threshold` seconds of the live edge. */
export declare function isAtLiveEdge(media: HTMLMediaElement, threshold?: number): boolean;
//# sourceMappingURL=live.d.ts.map