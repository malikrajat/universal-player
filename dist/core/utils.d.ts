/** Clamps a number into an inclusive range. */
export declare function clamp(value: number, min: number, max: number): number;
/** Returns a finite number or a fallback. */
export declare function finiteOr(value: number, fallback: number): number;
/** Formats seconds as `m:ss` or `h:mm:ss`. */
export declare function formatTime(seconds: number): string;
/**
 * Formats a timecode using the precision the reference duration needs.
 *
 * - At least one hour: `h:mm:ss`
 * - At least one minute: `m:ss`
 * - Under one minute: `Ns`
 *
 * The reference keeps the layout stable while the current time ticks. For
 * example a 12:02 video renders `0:02`, while a 9 second clip renders `3s`.
 */
export declare function formatTimecode(seconds: number, referenceSeconds?: number): string;
//# sourceMappingURL=utils.d.ts.map