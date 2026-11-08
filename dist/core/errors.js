// src/core/errors.ts
/**
* Error helpers.
*
* The public contract deliberately uses plain `Error` objects (not a custom
* subclass). A stable, enumerable code is attached so consumers can branch on
* failures without depending on engine-specific error shapes.
*/
/** Stable error categories. Values are part of the public contract. */
const PLAYER_ERROR_CODES = [
	"invalid-argument",
	"invalid-state",
	"unsupported-source",
	"unsupported-environment",
	"network-error",
	"media-error",
	"aborted",
	"destroyed",
	"not-implemented"
];
/** Creates a plain `Error` with a stable `code` and optional `details`. */
function createPlayerError(message, options) {
	const error = new Error(message, options.cause === void 0 ? void 0 : { cause: options.cause });
	Object.defineProperty(error, "name", {
		configurable: true,
		value: "UniversalPlayerError",
		writable: true
	});
	Object.defineProperty(error, "code", {
		configurable: true,
		enumerable: true,
		value: options.code,
		writable: false
	});
	Object.defineProperty(error, "details", {
		configurable: true,
		enumerable: true,
		value: options.details === void 0 ? {} : { ...options.details },
		writable: false
	});
	return error;
}
/** Returns true when a value is a {@link PlayerError}. */
function isPlayerError(value) {
	return value instanceof Error && typeof value.code === "string" && PLAYER_ERROR_CODES.includes(value.code);
}
/** Normalizes any thrown value into a {@link PlayerError}. */
function toPlayerError(value, fallbackCode = "media-error") {
	if (isPlayerError(value)) return value;
	if (value instanceof Error) return createPlayerError(value.message, {
		code: fallbackCode,
		cause: value
	});
	return createPlayerError(String(value), {
		code: fallbackCode,
		cause: value
	});
}
export { PLAYER_ERROR_CODES, createPlayerError, isPlayerError, toPlayerError };

//# sourceMappingURL=errors.js.map