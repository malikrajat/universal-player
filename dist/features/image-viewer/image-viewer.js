import { clamp } from "../../core/utils.js";
// src/features/image-viewer/image-viewer.ts
/** A neutral image transform. */
const IMAGE_TRANSFORM_DEFAULT = Object.freeze({
	zoom: 1,
	rotation: 0,
	x: 0,
	y: 0
});
/** Clamps a zoom value to the configured bounds. */
function clampImageZoom(zoom, min = .25, max = 8) {
	return clamp(zoom, Math.min(min, max), Math.max(min, max));
}
/** Returns the next zoom step. */
function zoomImage(transform, direction, min = .25, max = 8) {
	const step = transform.zoom >= 4 ? .5 : .25;
	return {
		...transform,
		zoom: clampImageZoom(transform.zoom + step * direction, min, max)
	};
}
/** Rotates the image by a quarter turn. */
function rotateImage(transform, direction = 1) {
	return {
		...transform,
		rotation: (transform.rotation + 90 * direction) % 360
	};
}
/** Resets zoom, rotation and pan. */
function resetImageTransform() {
	return { ...IMAGE_TRANSFORM_DEFAULT };
}
/** Converts the transform into a CSS transform string. */
function imageTransformCss(transform) {
	return `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom}) rotate(${transform.rotation}deg)`;
}
/** Returns true when the transform differs from the neutral state. */
function isImageTransformed(transform) {
	return transform.zoom !== 1 || transform.rotation !== 0 || transform.x !== 0 || transform.y !== 0;
}
export { IMAGE_TRANSFORM_DEFAULT, clampImageZoom, imageTransformCss, isImageTransformed, resetImageTransform, rotateImage, zoomImage };

//# sourceMappingURL=image-viewer.js.map