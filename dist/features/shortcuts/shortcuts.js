// src/features/shortcuts/shortcuts.ts
function isTypingTarget(target) {
	return target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
/**
* Maps a keyboard event to a player action.
*
* Returns null for keys that should be left to the browser or for events that
* originate inside a text field/select.
*/
function shortcutForEvent(event, options = {}) {
	if (event.defaultPrevented || isTypingTarget(event.target)) return null;
	if (event.ctrlKey || event.metaKey || event.altKey) return null;
	const seekStep = options.seekStep ?? 5;
	const volumeStep = options.volumeStep ?? .1;
	const key = event.key;
	if (key >= "0" && key <= "9" && key.length === 1) return {
		type: "seek-percent",
		percent: Number(key) / 10
	};
	switch (key) {
		case " ":
		case "k":
		case "K": return { type: "toggle-play" };
		case "m":
		case "M": return { type: "toggle-mute" };
		case "f":
		case "F": return { type: "toggle-fullscreen" };
		case "c":
		case "C": return { type: "toggle-captions" };
		case "s":
		case "S": return { type: "toggle-settings" };
		case "q":
		case "Q": return { type: "open-quality" };
		case "a":
		case "A": return { type: "open-audio" };
		case "t":
		case "T": return { type: "open-sleep" };
		case "r":
		case "R": return { type: "toggle-loop" };
		case "[": return {
			type: "quality-relative",
			delta: -1
		};
		case "]": return {
			type: "quality-relative",
			delta: 1
		};
		case "i":
		case "I": return { type: "toggle-stats" };
		case "l":
		case "L": return {
			type: "seek-relative",
			delta: seekStep * 2
		};
		case "j":
		case "J": return {
			type: "seek-relative",
			delta: -seekStep * 2
		};
		case "ArrowRight": return {
			type: "seek-relative",
			delta: seekStep
		};
		case "ArrowLeft": return {
			type: "seek-relative",
			delta: -seekStep
		};
		case "ArrowUp": return {
			type: "volume-relative",
			delta: volumeStep
		};
		case "ArrowDown": return {
			type: "volume-relative",
			delta: -volumeStep
		};
		case "Home": return { type: "seek-start" };
		case "End": return { type: "seek-end" };
		case ",": return {
			type: "speed-relative",
			delta: -.25
		};
		case ".": return {
			type: "speed-relative",
			delta: .25
		};
		case "<": return {
			type: "speed-relative",
			delta: -.25
		};
		case ">": return {
			type: "speed-relative",
			delta: .25
		};
		case "n":
		case "N":
		case "PageDown": return { type: "next-item" };
		case "p":
		case "P":
		case "PageUp": return { type: "previous-item" };
		case "?": return { type: "toggle-shortcuts" };
		case "Escape": return { type: "escape" };
		default: return null;
	}
}
/** The shortcut list rendered by the help overlay. */
const PLAYER_SHORTCUTS = Object.freeze([
	{
		keys: "Space / K",
		action: "Play or pause"
	},
	{
		keys: "M",
		action: "Mute or unmute"
	},
	{
		keys: "F",
		action: "Fullscreen"
	},
	{
		keys: "C",
		action: "Captions on/off"
	},
	{
		keys: "S",
		action: "Settings"
	},
	{
		keys: "Q",
		action: "Quality menu"
	},
	{
		keys: "[ / ]",
		action: "Lower / raise quality"
	},
	{
		keys: "A",
		action: "Audio track menu"
	},
	{
		keys: "T",
		action: "Sleep timer"
	},
	{
		keys: "R",
		action: "Loop on/off"
	},
	{
		keys: "↑ / ↓",
		action: "Volume"
	},
	{
		keys: "← / →",
		action: "Seek 5 seconds"
	},
	{
		keys: "J / L",
		action: "Seek 10 seconds"
	},
	{
		keys: "0 – 9",
		action: "Seek to percentage"
	},
	{
		keys: "Home / End",
		action: "Start or end"
	},
	{
		keys: "< / >",
		action: "Playback speed"
	},
	{
		keys: "N / P",
		action: "Next or previous item"
	},
	{
		keys: "I",
		action: "Stats for nerds"
	},
	{
		keys: "?",
		action: "Keyboard shortcuts"
	},
	{
		keys: "Esc",
		action: "Close overlays"
	}
]);
export { PLAYER_SHORTCUTS, shortcutForEvent };

//# sourceMappingURL=shortcuts.js.map