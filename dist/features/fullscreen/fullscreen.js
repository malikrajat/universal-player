import { createPlayerError } from "../../core/errors.js";
// src/features/fullscreen/fullscreen.ts
/** Returns true when the document is currently fullscreen. */
function isFullscreen() {
	return typeof document !== "undefined" && document.fullscreenElement !== null;
}
/** Returns true when an element exposes the Fullscreen API. */
function canFullscreen(element) {
	return typeof element.requestFullscreen === "function";
}
/** Requests fullscreen for an element. */
async function requestFullscreen(element) {
	if (!canFullscreen(element)) throw createPlayerError("Fullscreen is not supported in this environment.", { code: "unsupported-environment" });
	await element.requestFullscreen();
}
/** Exits fullscreen when active. */
async function exitFullscreen() {
	if (typeof document === "undefined" || typeof document.exitFullscreen !== "function") throw createPlayerError("Fullscreen is not supported in this environment.", { code: "unsupported-environment" });
	if (document.fullscreenElement !== null) await document.exitFullscreen();
}
/** Subscribes to fullscreen changes. Returns an unsubscribe function. */
function onFullscreenChange(listener) {
	const handler = () => listener(isFullscreen());
	document.addEventListener("fullscreenchange", handler);
	return () => document.removeEventListener("fullscreenchange", handler);
}
export { canFullscreen, exitFullscreen, isFullscreen, onFullscreenChange, requestFullscreen };

//# sourceMappingURL=fullscreen.js.map