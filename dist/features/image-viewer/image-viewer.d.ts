/** Zoom/rotation state for the still-image viewer. */
export interface ImageTransform {
  readonly zoom: number;
  readonly rotation: number;
  readonly x: number;
  readonly y: number;
}
/** A neutral image transform. */
export declare const IMAGE_TRANSFORM_DEFAULT: ImageTransform;
/** Clamps a zoom value to the configured bounds. */
export declare function clampImageZoom(zoom: number, min?: number, max?: number): number;
/** Returns the next zoom step. */
export declare function zoomImage(transform: ImageTransform, direction: 1 | -1, min?: number, max?: number): ImageTransform;
/** Rotates the image by a quarter turn. */
export declare function rotateImage(transform: ImageTransform, direction?: 1 | -1): ImageTransform;
/** Resets zoom, rotation and pan. */
export declare function resetImageTransform(): ImageTransform;
/** Converts the transform into a CSS transform string. */
export declare function imageTransformCss(transform: ImageTransform): string;
/** Returns true when the transform differs from the neutral state. */
export declare function isImageTransformed(transform: ImageTransform): boolean;
//# sourceMappingURL=image-viewer.d.ts.map