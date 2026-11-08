// src/core/engine.ts
/** Capabilities shared by native video and audio elements. */
const NATIVE_CAPABILITIES = Object.freeze({
	play: true,
	pause: true,
	seek: true,
	volume: true,
	playbackRate: true,
	fullscreen: true,
	pictureInPicture: true,
	textTracks: true,
	audioTracks: true,
	quality: false,
	live: true
});
/** Capabilities of a still-image surface. */
const IMAGE_CAPABILITIES = Object.freeze({
	play: false,
	pause: false,
	seek: false,
	volume: false,
	playbackRate: false,
	fullscreen: true,
	pictureInPicture: false,
	textTracks: false,
	audioTracks: false,
	quality: false,
	live: false
});
/** Capabilities of an iframe-based embed. */
const EMBED_CAPABILITIES = Object.freeze({
	play: true,
	pause: true,
	seek: true,
	volume: true,
	playbackRate: true,
	fullscreen: true,
	pictureInPicture: false,
	textTracks: false,
	audioTracks: false,
	quality: false,
	live: true
});
/** Best-effort capabilities before an engine is selected. */
function capabilitiesForKind(kind) {
	switch (kind) {
		case "audio": return NATIVE_CAPABILITIES;
		case "image": return IMAGE_CAPABILITIES;
		case "embed": return EMBED_CAPABILITIES;
		default: return NATIVE_CAPABILITIES;
	}
}
export { EMBED_CAPABILITIES, IMAGE_CAPABILITIES, NATIVE_CAPABILITIES, capabilitiesForKind };

//# sourceMappingURL=engine.js.map