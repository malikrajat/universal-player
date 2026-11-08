import "../core/utils.js";
// src/ui/i18n.ts
/** Default English UI strings. */
const PLAYER_STRINGS_EN = Object.freeze({
	play: "Play",
	pause: "Pause",
	mute: "Mute",
	unmute: "Unmute",
	fullscreen: "Enter fullscreen",
	exitFullscreen: "Exit fullscreen",
	settings: "Settings",
	quality: "Quality",
	qualityLower: "Lower quality",
	qualityHigher: "Higher quality",
	speed: "Playback speed",
	captions: "Captions",
	captionsOff: "Off",
	subtitles: "Subtitles/CC",
	audioTrack: "Audio track",
	audio: "Audio",
	auto: "Auto",
	off: "Off",
	on: "On",
	live: "LIVE",
	seek: "Seek",
	volume: "Volume",
	pictureInPicture: "Picture in Picture",
	error: "The media could not be played.",
	loading: "Loading media",
	chapters: "Chapters",
	playlist: "Playlist",
	next: "Next",
	previous: "Previous",
	replay: "Replay",
	playNext: "Play next",
	loop: "Loop",
	autoplay: "Autoplay",
	autoplayNext: "Autoplay next",
	stats: "Stats",
	statsForNerds: "Stats for nerds",
	shortcuts: "Keyboard shortcuts",
	keyboardShortcuts: "Keyboard shortcuts",
	close: "Close",
	submit: "Submit",
	skip: "Skip",
	required: "Required",
	correct: "Correct",
	incorrect: "Incorrect",
	retake: "Retake",
	done: "Done",
	survey: "Survey",
	feedback: "Feedback",
	review: "Review",
	quiz: "Quiz",
	thankYou: "Thank you!",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out",
	resetZoom: "Reset zoom",
	rotate: "Rotate",
	download: "Download",
	share: "Share",
	copyLink: "Copy link",
	copied: "Copied",
	embed: "Embed",
	copyEmbed: "Copy embed code",
	embedCopied: "Embed code copied",
	shareUnavailable: "Sharing is not available for this media.",
	retry: "Retry",
	liveEdge: "Live edge",
	goLive: "Go to live",
	cast: "Cast",
	castPrompt: "Choose a cast device from your browser.",
	castUnavailable: "No cast or AirPlay devices are available.",
	airplay: "AirPlay",
	fullscreenUnavailable: "Fullscreen is not available in this environment.",
	moreOptions: "More options",
	captionSize: "Caption size",
	captionColor: "Caption colour",
	captionBackground: "Caption background",
	captionEdge: "Caption edge",
	default: "Default",
	buffered: "Buffered",
	resolution: "Resolution",
	frames: "Frames",
	network: "Network",
	elapsedTime: "Elapsed",
	remainingTime: "Remaining",
	totalTime: "Total",
	sleepTimer: "Sleep timer",
	sleepTimerEnded: "Sleep timer ended",
	normal: "Normal",
	minutes: "min"
});
const locales = /* @__PURE__ */ new Map([["en", PLAYER_STRINGS_EN]]);
/** Registers or replaces the strings for a locale. */
function registerLocale(locale, strings) {
	locales.set(locale.toLowerCase(), {
		...PLAYER_STRINGS_EN,
		...strings
	});
}
/** Alias for {@link registerLocale}. */
function setStrings(locale, strings) {
	registerLocale(locale, strings);
}
/** Resolves the strings for a locale, applying per-instance overrides. */
function getStrings(locale = "en", overrides) {
	const base = locales.get(locale.toLowerCase()) ?? PLAYER_STRINGS_EN;
	return overrides === void 0 ? base : {
		...base,
		...overrides
	};
}
export { PLAYER_STRINGS_EN, getStrings, registerLocale, setStrings };

//# sourceMappingURL=i18n.js.map