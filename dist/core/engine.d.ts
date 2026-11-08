import { MediaKind, PlayerCapabilities } from "./types.js";
/** Capabilities shared by native video and audio elements. */
export declare const NATIVE_CAPABILITIES: PlayerCapabilities;
/** Capabilities of a still-image surface. */
export declare const IMAGE_CAPABILITIES: PlayerCapabilities;
/** Capabilities of an iframe-based embed. */
export declare const EMBED_CAPABILITIES: PlayerCapabilities;
/** Best-effort capabilities before an engine is selected. */
export declare function capabilitiesForKind(kind: MediaKind | null): PlayerCapabilities;
//# sourceMappingURL=engine.d.ts.map