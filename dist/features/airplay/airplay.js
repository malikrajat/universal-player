import { createPlayerError } from "../../core/errors.js";
// src/features/airplay/airplay.ts
/** Returns true when the browser exposes the Remote Playback API. */
function canAirPlay(media) {
	return media.remote !== void 0;
}
/** Opens the platform remote-playback picker (AirPlay, Cast, etc.). */
async function showAirPlayPicker(media) {
	const remote = media.remote;
	if (remote === void 0) throw createPlayerError("Remote playback is not supported in this environment.", { code: "unsupported-environment" });
	await remote.prompt();
}
export { canAirPlay, showAirPlayPicker };

//# sourceMappingURL=airplay.js.map