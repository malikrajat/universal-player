import { createPlayerError } from "../../core/errors.js";
// src/features/mini-player/mini-player.ts
/** Returns true when the Picture-in-Picture mini-player is available. */
function canUseMiniPlayer() {
	return typeof document !== "undefined" && "pictureInPictureEnabled" in document && document.pictureInPictureEnabled === true;
}
/** Enters the browser mini-player. */
async function enterMiniPlayer(media, options = {}) {
	if (!canUseMiniPlayer() || typeof media.requestPictureInPicture !== "function") throw createPlayerError("The mini-player is not supported in this environment.", { code: "unsupported-environment" });
	if (options.width !== void 0) media.style.width = `${options.width}px`;
	if (options.height !== void 0) media.style.height = `${options.height}px`;
	await media.requestPictureInPicture();
}
/** Exits the browser mini-player. */
async function exitMiniPlayer() {
	if (typeof document === "undefined" || typeof document.exitPictureInPicture !== "function") throw createPlayerError("The mini-player is not supported in this environment.", { code: "unsupported-environment" });
	if (document.pictureInPictureElement !== null) await document.exitPictureInPicture();
}
export { canUseMiniPlayer, enterMiniPlayer, exitMiniPlayer };

//# sourceMappingURL=mini-player.js.map