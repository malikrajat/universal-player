import { createPlayerError } from "../../core/errors.js";
// src/features/pip/pip.ts
/** Returns true when Picture-in-Picture is available. */
function canPictureInPicture() {
	return typeof document !== "undefined" && "pictureInPictureEnabled" in document && document.pictureInPictureEnabled === true;
}
/** Requests Picture-in-Picture for a video element. */
async function requestPictureInPicture(media) {
	if (typeof media.requestPictureInPicture !== "function") throw createPlayerError("Picture-in-Picture is not supported in this environment.", { code: "unsupported-environment" });
	await media.requestPictureInPicture();
}
/** Exits Picture-in-Picture when active. */
async function exitPictureInPicture() {
	if (typeof document === "undefined" || typeof document.exitPictureInPicture !== "function") throw createPlayerError("Picture-in-Picture is not supported in this environment.", { code: "unsupported-environment" });
	if (document.pictureInPictureElement !== null) await document.exitPictureInPicture();
}
export { canPictureInPicture, exitPictureInPicture, requestPictureInPicture };

//# sourceMappingURL=pip.js.map