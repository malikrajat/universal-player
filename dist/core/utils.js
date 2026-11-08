// src/core/utils.ts
/** Clamps a number into an inclusive range. */
function clamp(value, min, max) {
	if (!Number.isFinite(value)) return min;
	return Math.min(Math.max(value, min), max);
}
/** Returns a finite number or a fallback. */
function finiteOr(value, fallback) {
	return Number.isFinite(value) ? value : fallback;
}
/** Formats seconds as `m:ss` or `h:mm:ss`. */
function formatTime(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const total = Math.floor(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const secs = total % 60;
	if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	return `${minutes}:${String(secs).padStart(2, "0")}`;
}
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
function formatTimecode(seconds, referenceSeconds = seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0s";
	const reference = Number.isFinite(referenceSeconds) && referenceSeconds > 0 ? referenceSeconds : seconds;
	const total = Math.floor(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const secs = total % 60;
	if (reference >= 3600) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	if (reference >= 60) return `${minutes}:${String(secs).padStart(2, "0")}`;
	return `${secs}s`;
}
export { clamp, finiteOr, formatTime, formatTimecode };

//# sourceMappingURL=utils.js.map