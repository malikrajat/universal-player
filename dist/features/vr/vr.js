// src/features/vr/vr.ts
/** Returns true when WebXR is available. */
function isVrSupported() {
	return typeof navigator !== "undefined" && "xr" in navigator;
}
/**
* Marks an element as VR-enabled.
*
* A future renderer (WebXR / WebGL) will consume these data attributes. The
* skeleton only reserves the contract so consumers can style and feature-detect.
*/
function setVrMode(element, options = {}) {
	element.dataset.upVr = options.projection ?? "360";
	if (options.fov !== void 0) element.dataset.upVrFov = String(options.fov);
}
/** Clears VR markers from an element. */
function clearVrMode(element) {
	delete element.dataset.upVr;
	delete element.dataset.upVrFov;
}
export { clearVrMode, isVrSupported, setVrMode };

//# sourceMappingURL=vr.js.map