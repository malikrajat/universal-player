import { MediaKind, NormalizedSource, PlayerSourceInput } from "./types.js";
/** Returns the lowercase extension of a URL path, without the dot. */
export declare function extensionOf(pathname: string): string | null;
/** Infers a media kind from an extension, MIME type and URL. */
export declare function detectMediaKind(extension: string | null, mimeType: string | null, url: URL): MediaKind;
/** Infers a MIME type from an extension. */
export declare function inferMimeType(extension: string | null): string | null;
/** Returns true for YouTube URLs. */
export declare function isYouTubeHost(hostname: string): boolean;
/** Returns true for Vimeo URLs. */
export declare function isVimeoHost(hostname: string): boolean;
/**
 * Normalizes any supported input into a URL plus engine decision.
 *
 * Object URLs created for `Blob`/`File` inputs are owned by the returned
 * descriptor and must be released with {@link revokeSource}.
 */
export declare function normalizeSource(input: PlayerSourceInput): NormalizedSource;
/** Returns a stable string token for change detection. */
export declare function sourceToken(input: PlayerSourceInput | null | undefined): string;
/** Releases an object URL created by {@link normalizeSource}. */
export declare function revokeSource(source: NormalizedSource | null): void;
//# sourceMappingURL=source.d.ts.map