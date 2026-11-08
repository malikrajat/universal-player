import { createPlayerError } from "../../core/errors.js";
// src/features/ads/ads.ts
/** Finds the ad break covering a timestamp. */
function findAdBreakAt(schedule, time) {
	for (const adBreak of schedule.breaks) if (time >= adBreak.time && time < adBreak.time + adBreak.duration) return adBreak;
	return null;
}
/**
* Creates a placeholder ad controller.
*
* The skeleton reserves the contract; wire a VAST/IMA SDK by replacing the
* three `play*` methods.
*/
function createAdController(schedule) {
	const notConfigured = () => {
		throw createPlayerError("Ad playback requires an ad SDK adapter.", { code: "not-implemented" });
	};
	return {
		schedule,
		async playPreRoll() {
			if (schedule.preRoll === true) notConfigured();
		},
		async playMidRoll(breakId) {
			if (schedule.breaks.some((adBreak) => adBreak.id === breakId)) notConfigured();
		},
		async playPostRoll() {
			if (schedule.postRoll === true) notConfigured();
		},
		destroy() {}
	};
}
export { createAdController, findAdBreakAt };

//# sourceMappingURL=ads.js.map