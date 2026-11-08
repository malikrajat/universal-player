/**
 * Error helpers.
 *
 * The public contract deliberately uses plain `Error` objects (not a custom
 * subclass). A stable, enumerable code is attached so consumers can branch on
 * failures without depending on engine-specific error shapes.
 */
/** Stable error categories. Values are part of the public contract. */
export declare const PLAYER_ERROR_CODES: readonly ["invalid-argument", "invalid-state", "unsupported-source", "unsupported-environment", "network-error", "media-error", "aborted", "destroyed", "not-implemented"];
export type PlayerErrorCode = (typeof PLAYER_ERROR_CODES)[number];
export interface PlayerErrorOptions {
  readonly code: PlayerErrorCode;
  readonly cause?: unknown;
  readonly details?: Readonly<Record<string, unknown>>;
}
/** A plain `Error` carrying a stable code and optional structured details. */
export type PlayerError = Error & {
  readonly code: PlayerErrorCode;
  readonly details: Readonly<Record<string, unknown>>;
};
/** Creates a plain `Error` with a stable `code` and optional `details`. */
export declare function createPlayerError(message: string, options: PlayerErrorOptions): PlayerError;
/** Returns true when a value is a {@link PlayerError}. */
export declare function isPlayerError(value: unknown): value is PlayerError;
/** Normalizes any thrown value into a {@link PlayerError}. */
export declare function toPlayerError(value: unknown, fallbackCode?: PlayerErrorCode): PlayerError;
//# sourceMappingURL=errors.d.ts.map