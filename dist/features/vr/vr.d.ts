/** Projection modes reserved for 360°/VR playback. */
export type VrProjection = "360" | "stereo" | "none";
/** VR configuration. */
export interface VrOptions {
  readonly projection?: VrProjection;
  readonly fov?: number;
}
/** Returns true when WebXR is available. */
export declare function isVrSupported(): boolean;
/**
 * Marks an element as VR-enabled.
 *
 * A future renderer (WebXR / WebGL) will consume these data attributes. The
 * skeleton only reserves the contract so consumers can style and feature-detect.
 */
export declare function setVrMode(element: HTMLElement, options?: VrOptions): void;
/** Clears VR markers from an element. */
export declare function clearVrMode(element: HTMLElement): void;
//# sourceMappingURL=vr.d.ts.map