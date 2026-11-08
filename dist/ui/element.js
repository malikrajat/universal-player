import styles_default from "./styles.js";
import { createPlayer } from "../core/player.js";
import { formatTime, formatTimecode } from "../core/utils.js";
import { captionMenuItems, captionStyleDeclarations } from "../features/captions/captions.js";
import { chapterMarkers, sortChapters } from "../features/chapters/chapters.js";
import { findQuality, normalizeQualityLevels, qualityLabel, stepQuality } from "../features/quality/quality.js";
import { IMAGE_TRANSFORM_DEFAULT, imageTransformCss, isImageTransformed, resetImageTransform, rotateImage, zoomImage } from "../features/image-viewer/image-viewer.js";
import { liveEdge } from "../features/live/live.js";
import { PLAYER_SHORTCUTS, shortcutForEvent } from "../features/shortcuts/shortcuts.js";
import { PLAYBACK_RATES, clampPlaybackRate, formatPlaybackRate } from "../features/speed/speed.js";
import { findThumbnailAt } from "../features/thumbnails/thumbnails.js";
import { getStrings } from "./i18n.js";
import { createIcon } from "./icons.js";
import { createSurveyPanel } from "./survey-panel.js";
// src/ui/element.ts
/** Default custom-element tag name. */
const UNIVERSAL_PLAYER_TAG = "universal-player";
const STYLE_ID = "universal-player-styles";
const OBSERVED_ATTRIBUTES = [
	"src",
	"type",
	"poster",
	"thumbnail",
	"autoplay",
	"muted",
	"loop",
	"controls",
	"theme",
	"accent-color",
	"ui",
	"locale",
	"preload",
	"crossorigin",
	"playsinline",
	"start-time",
	"shadow",
	"inject-styles",
	"volume",
	"rate",
	"label",
	"chapters",
	"thumbnails",
	"captions",
	"survey",
	"playlist",
	"image",
	"keyboard",
	"click-to-play",
	"double-click-fullscreen",
	"auto-hide-controls",
	"seek-step",
	"volume-step"
];
const SHARE_TARGETS = [
	{
		label: "WhatsApp",
		href: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
	},
	{
		label: "X",
		href: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
	},
	{
		label: "Facebook",
		href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
	},
	{
		label: "LinkedIn",
		href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
	},
	{
		label: "Telegram",
		href: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
	},
	{
		label: "Email",
		href: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
	}
];
const FORWARDED_EVENTS = [
	"statechange",
	"loadstart",
	"loadedmetadata",
	"durationchange",
	"play",
	"playing",
	"pause",
	"timeupdate",
	"progress",
	"seeking",
	"seeked",
	"waiting",
	"canplay",
	"ended",
	"volumechange",
	"ratechange",
	"qualitychange",
	"texttrackchange",
	"audiotrackchange",
	"chapterchange",
	"playlistchange",
	"surveyopen",
	"surveysubmit",
	"surveyskip",
	"surveyclose",
	"fullscreenchange",
	"pictureinpicturechange",
	"error"
];
function injectStylesOnce(css) {
	if (typeof document === "undefined" || document.getElementById(STYLE_ID) !== null) return;
	const style = document.createElement("style");
	style.id = STYLE_ID;
	style.textContent = css;
	document.head.append(style);
}
function element(tag, className) {
	const node = document.createElement(tag);
	if (className !== void 0) node.className = className;
	return node;
}
function setHidden(node, hidden) {
	if (node !== null) node.hidden = hidden;
}
function setIcon(button, name) {
	button.replaceChildren(createIcon(name));
}
function escapeHtmlAttribute(value) {
	return value.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function parseColorChannels(value) {
	const color = value.trim();
	const hex = /^#([0-9a-f]{3,8})$/i.exec(color);
	if (hex !== null) {
		const digits = hex[1] ?? "";
		if (digits.length === 3 || digits.length === 4) return [
			Number.parseInt(`${digits[0]}${digits[0]}`, 16),
			Number.parseInt(`${digits[1]}${digits[1]}`, 16),
			Number.parseInt(`${digits[2]}${digits[2]}`, 16)
		];
		if (digits.length === 6 || digits.length === 8) return [
			Number.parseInt(digits.slice(0, 2), 16),
			Number.parseInt(digits.slice(2, 4), 16),
			Number.parseInt(digits.slice(4, 6), 16)
		];
	}
	const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
	if (rgb !== null) return [
		Number(rgb[1]),
		Number(rgb[2]),
		Number(rgb[3])
	];
	return null;
}
/** Picks black or white text for a solid accent colour. */
function contrastColor(value) {
	const channels = parseColorChannels(value);
	if (channels === null) return "#ffffff";
	const linearize = (channel) => {
		const normalized = channel / 255;
		return normalized <= .03928 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4;
	};
	const [red, green, blue] = channels;
	return .2126 * linearize(red) + .7152 * linearize(green) + .0722 * linearize(blue) > .45 ? "#0b0b0b" : "#ffffff";
}
/**
* `<universal-player>` web component.
*
* Attributes:
* - `src`, `type`, `poster`, `label`
* - `autoplay`, `muted`, `loop`, `playsinline`
* - `controls="custom|native"`, `theme="light|dark|system"`,
*   `accent-color` (any CSS colour)
* - `locale`, `preload`, `crossorigin`, `start-time`, `volume`, `rate`
* - `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image`, `ui` (JSON)
* - `keyboard`, `click-to-play`, `double-click-fullscreen`,
*   `auto-hide-controls`, `seek-step`, `volume-step`
* - `shadow="shadow|light"` (read once), `inject-styles` (light DOM only)
*/
var UniversalPlayerElement = class extends HTMLElement {
	static get observedAttributes() {
		return OBSERVED_ATTRIBUTES;
	}
	#player = null;
	#root = null;
	#viewport = null;
	#shadow = null;
	#strings = getStrings("en");
	#stringsOverride = {};
	#unsubscribes = [];
	#controller = null;
	#built = false;
	#seeking = false;
	#menuOpen = null;
	#menuReturn = null;
	#settingsView = "main";
	#timeMode = "elapsed";
	#speedViewBuilt = false;
	#sleepTimer = null;
	#sleepMinutes = 0;
	#sleepDeadline = 0;
	#castWatchId = null;
	#castWatchMedia = null;
	#castAvailable = null;
	#uiOptions = null;
	#gesture = null;
	#menus = [];
	#captionsMenu = null;
	#settingsMenu = null;
	#chaptersMenu = null;
	#playlistMenu = null;
	#statsPanel = null;
	#shortcutsPanel = null;
	#shareMenu = null;
	#surveyPanel = null;
	#surveyKey = "";
	#surveyCompletion = false;
	#toast = null;
	#toastTimer = null;
	#clickTimer = null;
	#idleTimer = null;
	#imageTransform = { ...IMAGE_TRANSFORM_DEFAULT };
	#imageOptions = null;
	#imageSourceUrl = "";
	#chapterSignature = "";
	#playButton = null;
	#bigPlay = null;
	#muteButton = null;
	#captionsButton = null;
	#settingsButton = null;
	#fullscreenButton = null;
	#pipButton = null;
	#prevButton = null;
	#nextButton = null;
	#chaptersButton = null;
	#playlistButton = null;
	#liveButton = null;
	#castButton = null;
	#shareButton = null;
	#downloadButton = null;
	#seekWrap = null;
	#seekInput = null;
	#volumeInput = null;
	#bufferedBar = null;
	#chapterRail = null;
	#preview = null;
	#previewImage = null;
	#previewTime = null;
	#timeLabel = null;
	#chapterLabel = null;
	#titleBar = null;
	#titleLabel = null;
	#playGroup = null;
	#volumeGroup = null;
	#imageGroup = null;
	#audioVisual = null;
	#audioArt = null;
	#spinner = null;
	#error = null;
	#errorText = null;
	/** The live player instance, or null before connection. */
	get player() {
		return this.#player;
	}
	/** Per-instance string overrides. */
	set strings(value) {
		this.#stringsOverride = value;
		this.#strings = getStrings(this.#locale(), value);
		this.#chapterSignature = "";
		const state = this.#player?.state;
		if (state !== void 0) this.#render(state);
	}
	get strings() {
		return this.#stringsOverride;
	}
	connectedCallback() {
		this.#mount();
	}
	disconnectedCallback() {
		this.#unmount();
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (!this.#built || oldValue === newValue) return;
		this.#applyAttribute(name, newValue);
	}
	/** Loads a new source. */
	async load(source) {
		await this.#player?.load(source);
	}
	/** Starts playback. */
	async play() {
		await this.#player?.play();
	}
	/** Pauses playback. */
	pause() {
		this.#player?.pause();
	}
	/** Seeks to an absolute time in seconds. */
	seek(time) {
		this.#player?.seek(time);
	}
	/** Returns an iframe embed snippet for the current media, or null. */
	getEmbedCode() {
		return this.#embedCode();
	}
	/** Destroys the internal player. */
	destroy() {
		this.#unmount();
	}
	#mount() {
		if (this.#built) return;
		this.#built = true;
		this.#strings = getStrings(this.#locale(), this.#stringsOverride);
		this.#uiOptions = this.#jsonAttribute("ui");
		const root = element("div", "up-root");
		root.setAttribute("part", "root");
		root.dataset.upTheme = this.#theme();
		root.dataset.upControls = this.#controlsMode();
		root.dataset.upKind = "video";
		root.dataset.upStatus = "idle";
		root.dataset.upIdle = "false";
		root.tabIndex = -1;
		const existingShadow = this.shadowRoot;
		if (!(this.getAttribute("shadow") === "light")) {
			const target = existingShadow ?? this.attachShadow({ mode: "open" });
			target.replaceChildren();
			const style = document.createElement("style");
			style.textContent = styles_default;
			target.append(style, root);
			this.#shadow = target;
		} else {
			existingShadow?.replaceChildren();
			this.replaceChildren();
			this.append(root);
			this.#shadow = null;
			if (this.hasAttribute("inject-styles")) injectStylesOnce(styles_default);
		}
		this.#root = root;
		const viewport = element("div", "up-viewport");
		viewport.setAttribute("part", "viewport");
		root.append(viewport);
		this.#viewport = viewport;
		const audioVisual = element("div", "up-audio-visual");
		audioVisual.setAttribute("part", "audio-visual");
		audioVisual.setAttribute("aria-hidden", "true");
		const audioArt = element("img", "up-audio-art");
		audioArt.alt = "";
		audioArt.hidden = true;
		const audioBars = element("div", "up-audio-bars");
		for (let index = 0; index < 28; index += 1) {
			const bar = element("span", "up-audio-bar");
			bar.style.setProperty("--up-bar-height", `${22 + index * 37 % 68}%`);
			bar.style.setProperty("--up-bar-delay", `${(index % 11 * -.09).toFixed(2)}s`);
			audioBars.append(bar);
		}
		audioVisual.append(audioArt, audioBars);
		viewport.append(audioVisual);
		this.#audioVisual = audioVisual;
		this.#audioArt = audioArt;
		const bigPlay = element("button", "up-big-play");
		bigPlay.type = "button";
		bigPlay.dataset.upAction = "play";
		bigPlay.setAttribute("part", "big-play-button");
		viewport.append(bigPlay);
		this.#bigPlay = bigPlay;
		this.#buildControls(root);
		this.#buildMenus(root);
		this.#buildFeedback(root);
		this.#bindControls();
		this.#applyUIOptions();
		try {
			const player = createPlayer(this.#playerOptions(viewport));
			this.#player = player;
			this.#bindPlayer(player);
			const src = this.getAttribute("src");
			if (src !== null && src.length > 0) player.load(src).catch(() => {});
			this.#render(player.state);
		} catch (error) {
			this.#showFatal(error);
		}
	}
	#unmount() {
		this.#controller?.abort();
		this.#controller = null;
		for (const unsubscribe of this.#unsubscribes) unsubscribe();
		this.#unsubscribes = [];
		if (this.#toastTimer !== null) clearTimeout(this.#toastTimer);
		if (this.#clickTimer !== null) clearTimeout(this.#clickTimer);
		if (this.#idleTimer !== null) clearTimeout(this.#idleTimer);
		if (this.#sleepTimer !== null) clearTimeout(this.#sleepTimer);
		this.#toastTimer = null;
		this.#clickTimer = null;
		this.#idleTimer = null;
		this.#sleepTimer = null;
		this.#sleepMinutes = 0;
		this.#sleepDeadline = 0;
		this.#stopCastWatch();
		this.#timeMode = "elapsed";
		this.#speedViewBuilt = false;
		this.#player?.destroy();
		this.#player = null;
		if (this.#shadow !== null) {
			this.#shadow.replaceChildren();
			this.#shadow = null;
		}
		this.replaceChildren();
		this.#root = null;
		this.#viewport = null;
		this.#built = false;
		this.#seeking = false;
		this.#menuOpen = null;
		this.#menuReturn = null;
		this.#settingsView = "main";
		this.#uiOptions = null;
		this.#gesture = null;
		this.#menus = [];
		this.#captionsMenu = null;
		this.#settingsMenu = null;
		this.#chaptersMenu = null;
		this.#playlistMenu = null;
		this.#statsPanel = null;
		this.#shortcutsPanel = null;
		this.#shareMenu = null;
		this.#surveyPanel = null;
		this.#surveyKey = "";
		this.#surveyCompletion = false;
		this.#toast = null;
		this.#imageTransform = { ...IMAGE_TRANSFORM_DEFAULT };
		this.#imageOptions = null;
		this.#chapterSignature = "";
		this.#playButton = null;
		this.#bigPlay = null;
		this.#muteButton = null;
		this.#captionsButton = null;
		this.#settingsButton = null;
		this.#fullscreenButton = null;
		this.#pipButton = null;
		this.#prevButton = null;
		this.#nextButton = null;
		this.#chaptersButton = null;
		this.#playlistButton = null;
		this.#liveButton = null;
		this.#castButton = null;
		this.#shareButton = null;
		this.#downloadButton = null;
		this.#seekWrap = null;
		this.#seekInput = null;
		this.#volumeInput = null;
		this.#bufferedBar = null;
		this.#chapterRail = null;
		this.#preview = null;
		this.#previewImage = null;
		this.#previewTime = null;
		this.#timeLabel = null;
		this.#chapterLabel = null;
		this.#titleBar = null;
		this.#titleLabel = null;
		this.#playGroup = null;
		this.#volumeGroup = null;
		this.#imageGroup = null;
		this.#audioVisual = null;
		this.#audioArt = null;
		this.#spinner = null;
		this.#error = null;
		this.#errorText = null;
	}
	#playerOptions(container) {
		const options = {
			container,
			controls: this.#controlsMode(),
			theme: this.#theme(),
			locale: this.#locale(),
			strings: this.#stringsOverride,
			label: this.getAttribute("label") ?? "Media player",
			autoplay: this.hasAttribute("autoplay"),
			muted: this.hasAttribute("muted"),
			loop: this.hasAttribute("loop"),
			playsInline: this.getAttribute("playsinline") !== "false",
			keyboard: this.#booleanAttribute("keyboard", true),
			clickToPlay: this.#booleanAttribute("click-to-play", true),
			doubleClickFullscreen: this.#booleanAttribute("double-click-fullscreen", true),
			autoHideControls: this.#booleanAttribute("auto-hide-controls", true)
		};
		if (this.#uiOptions !== null) options.ui = this.#uiOptions;
		const poster = this.getAttribute("poster") ?? this.getAttribute("thumbnail");
		if (poster !== null) options.poster = poster;
		const preload = this.getAttribute("preload");
		if (preload === "none" || preload === "metadata" || preload === "auto") options.preload = preload;
		const crossOrigin = this.getAttribute("crossorigin");
		if (crossOrigin === "anonymous" || crossOrigin === "use-credentials") options.crossOrigin = crossOrigin;
		else if (crossOrigin === "null") options.crossOrigin = null;
		const volume = this.#numberAttribute("volume");
		if (volume !== null) options.volume = volume;
		const rate = this.#numberAttribute("rate");
		const speed = this.#speedOptions();
		if (rate !== null) options.playbackRate = rate;
		else if (speed !== false && speed.defaultRate !== void 0) options.playbackRate = speed.defaultRate;
		const startTime = this.#numberAttribute("start-time");
		if (startTime !== null) options.startTime = startTime;
		const seekStep = this.#numberAttribute("seek-step");
		if (seekStep !== null) options.seekStep = seekStep;
		const volumeStep = this.#numberAttribute("volume-step");
		if (volumeStep !== null) options.volumeStep = volumeStep;
		const chapters = this.#jsonAttribute("chapters");
		if (chapters !== null) options.chapters = chapters;
		const thumbnails = this.#jsonAttribute("thumbnails");
		if (thumbnails !== null) options.thumbnails = thumbnails;
		const captions = this.#jsonAttribute("captions");
		if (captions !== null) options.captions = captions;
		const survey = this.#jsonAttribute("survey");
		if (survey !== null) options.survey = survey;
		const playlist = this.#jsonAttribute("playlist");
		if (playlist !== null) options.playlist = playlist;
		const image = this.#jsonAttribute("image");
		if (image !== null) {
			this.#imageOptions = image;
			options.image = image;
		}
		return options;
	}
	#buildControls(root) {
		const titleBar = element("div", "up-titlebar");
		const title = element("span", "up-title");
		titleBar.append(title);
		titleBar.hidden = true;
		root.append(titleBar);
		this.#titleBar = titleBar;
		this.#titleLabel = title;
		const controls = element("div", "up-controls");
		controls.setAttribute("part", "controls");
		const seekWrap = element("div", "up-seek-wrap");
		const buffered = element("div", "up-buffered");
		const chapterRail = element("div", "up-chapter-rail");
		const seek = this.#createRange("up-seek", 0, 1e3, 1, this.#strings.seek);
		const preview = element("div", "up-preview");
		const previewImage = element("img", "up-preview-image");
		previewImage.alt = "";
		const previewTime = element("span", "up-preview-time");
		preview.append(previewImage, previewTime);
		preview.hidden = true;
		seekWrap.append(buffered, chapterRail, seek, preview);
		controls.append(seekWrap);
		const row = element("div", "up-control-row");
		const playGroup = element("div", "up-control-group up-play-group");
		const play = this.#button("play", "play", this.#strings.play);
		play.classList.add("up-play");
		playGroup.append(play);
		const prev = this.#button("previous", "previous", this.#strings.previous);
		const next = this.#button("next", "next", this.#strings.next);
		playGroup.append(prev, next);
		const volumeGroup = element("div", "up-control-group up-volume-group");
		const mute = this.#button("mute", "volume-high", this.#strings.mute);
		mute.classList.add("up-mute");
		const volume = this.#createRange("up-volume", 0, 1, .01, this.#strings.volume);
		volume.value = "1";
		volumeGroup.append(mute, volume);
		const time = element("button", "up-time");
		time.type = "button";
		time.dataset.upAction = "time-toggle";
		time.setAttribute("part", "time");
		time.setAttribute("aria-label", this.#strings.elapsedTime);
		time.textContent = "0:00 / 0:00";
		const chapterLabel = element("span", "up-chapter-label");
		const imageGroup = element("div", "up-control-group up-image-group");
		const zoomOut = this.#button("zoom-out", "zoom-out", this.#strings.zoomOut);
		const zoomIn = this.#button("zoom-in", "zoom-in", this.#strings.zoomIn);
		const rotate = this.#button("rotate", "rotate", this.#strings.rotate);
		const imageDownload = this.#button("download", "download", this.#strings.download);
		imageGroup.append(zoomOut, zoomIn, rotate, imageDownload);
		const right = element("div", "up-control-group up-right-controls");
		const playlistButton = this.#button("playlist", "playlist", this.#strings.playlist);
		const chaptersButton = this.#button("chapters", "chapters", this.#strings.chapters);
		const captions = this.#button("captions", "captions", this.#strings.captions);
		captions.classList.add("up-captions");
		const settings = this.#button("settings", "settings", this.#strings.settings);
		const live = this.#button("live-edge", "stats", this.#strings.goLive);
		live.classList.add("up-live");
		live.textContent = this.#strings.live;
		const share = this.#button("share", "share", this.#strings.share);
		const download = this.#button("download", "download", this.#strings.download);
		download.classList.add("up-download");
		const cast = this.#button("cast", "cast", this.#strings.cast);
		const pip = this.#button("pip", "pip", this.#strings.pictureInPicture);
		pip.classList.add("up-pip");
		const fullscreen = this.#button("fullscreen", "fullscreen", this.#strings.fullscreen);
		fullscreen.classList.add("up-fullscreen");
		right.append(playlistButton, chaptersButton, captions, settings, live, share, download, cast, pip, fullscreen);
		const spacer = element("div", "up-spacer");
		row.append(playGroup, volumeGroup, time, chapterLabel, spacer, imageGroup, right);
		controls.append(row);
		root.append(controls);
		this.#playButton = play;
		this.#bigPlay = this.#bigPlay ?? play;
		this.#prevButton = prev;
		this.#nextButton = next;
		this.#muteButton = mute;
		this.#captionsButton = captions;
		this.#settingsButton = settings;
		this.#chaptersButton = chaptersButton;
		this.#playlistButton = playlistButton;
		this.#liveButton = live;
		this.#shareButton = share;
		this.#downloadButton = download;
		this.#castButton = cast;
		this.#pipButton = pip;
		this.#fullscreenButton = fullscreen;
		this.#seekWrap = seekWrap;
		this.#seekInput = seek;
		this.#volumeInput = volume;
		this.#bufferedBar = buffered;
		this.#chapterRail = chapterRail;
		this.#preview = preview;
		this.#previewImage = previewImage;
		this.#previewTime = previewTime;
		this.#timeLabel = time;
		this.#chapterLabel = chapterLabel;
		this.#playGroup = playGroup;
		this.#volumeGroup = volumeGroup;
		this.#imageGroup = imageGroup;
	}
	#buildMenus(root) {
		this.#captionsMenu = this.#createMenu("up-captions-menu");
		this.#settingsMenu = this.#createMenu("up-settings-menu");
		this.#chaptersMenu = this.#createMenu("up-chapters-menu");
		this.#playlistMenu = this.#createMenu("up-playlist-menu");
		this.#statsPanel = this.#createMenu("up-stats-panel");
		this.#shortcutsPanel = this.#createMenu("up-shortcuts-panel");
		this.#shareMenu = this.#createMenu("up-share-menu");
		this.#menus = [
			this.#captionsMenu,
			this.#settingsMenu,
			this.#chaptersMenu,
			this.#playlistMenu,
			this.#statsPanel,
			this.#shortcutsPanel,
			this.#shareMenu
		];
		root.append(...this.#menus);
	}
	#buildFeedback(root) {
		const spinner = element("div", "up-spinner");
		spinner.setAttribute("part", "spinner");
		spinner.setAttribute("aria-hidden", "true");
		spinner.hidden = true;
		const error = element("div", "up-error");
		error.setAttribute("part", "error");
		error.setAttribute("role", "alert");
		error.hidden = true;
		const errorText = element("span", "up-error-text");
		const retry = this.#button("retry", "retry", this.#strings.retry);
		retry.classList.add("up-retry");
		error.append(errorText, retry);
		const toast = element("div", "up-toast");
		toast.setAttribute("part", "toast");
		toast.setAttribute("role", "status");
		toast.hidden = true;
		const surveyPanel = createSurveyPanel({
			onSubmit: (answers) => {
				const player = this.#player;
				if (player === null) return false;
				const allowRetake = player.activeSurvey?.allowRetake === true;
				if (allowRetake) this.#surveyCompletion = true;
				try {
					player.submitSurvey(answers);
					if (!allowRetake) this.#showToast(this.#strings.thankYou);
					return true;
				} catch (failure) {
					this.#surveyCompletion = false;
					this.#showToast(failure instanceof Error ? failure.message : this.#strings.error);
					return false;
				}
			},
			onSkip: () => {
				this.#player?.skipSurvey();
			},
			onClose: () => {
				this.#player?.closeSurvey();
			},
			onRetake: () => {
				const player = this.#player;
				if (player === null) return;
				this.#surveyCompletion = false;
				this.#surveyKey = "";
				this.#surveyPanel?.clear();
				player.retakeSurvey().then((opened) => {
					if (!opened) this.#showToast(this.#strings.error);
				});
			},
			onDone: () => {
				this.#surveyCompletion = false;
				this.#surveyKey = "";
				this.#surveyPanel?.clear();
			}
		});
		root.append(spinner, error, toast, surveyPanel.element);
		this.#spinner = spinner;
		this.#error = error;
		this.#errorText = errorText;
		this.#toast = toast;
		this.#surveyPanel = surveyPanel;
	}
	#bindControls() {
		const root = this.#root;
		const viewport = this.#viewport;
		if (root === null || viewport === null) return;
		const controller = new AbortController();
		this.#controller = controller;
		const { signal } = controller;
		root.addEventListener("click", (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			if (target.closest(".up-survey") !== null) return;
			const action = target.closest("[data-up-action]")?.dataset.upAction;
			if (action !== void 0) {
				const opensMenu = action === "settings" || action === "chapters" || action === "playlist" || action === "share";
				if (this.#menuOpen !== null && !opensMenu) this.#closeMenus();
				this.#runAction(action);
				return;
			}
			const menuItem = target.closest("[data-up-menu]");
			if (menuItem !== null) {
				this.#runMenuAction(menuItem);
				return;
			}
			if (this.#menuOpen !== null && target.closest(".up-menu") === null) this.#closeMenus();
		}, { signal });
		document.addEventListener("pointerdown", this.#onDocumentPointerDown, {
			signal,
			capture: true
		});
		root.addEventListener("input", (event) => {
			const target = event.target;
			if (!(target instanceof HTMLInputElement) || target.dataset.upSpeedSlider !== "true") return;
			const rate = Number(target.value);
			if (Number.isFinite(rate)) {
				this.#player?.setPlaybackRate(rate);
				this.#syncSpeedView(rate);
			}
		}, { signal });
		viewport.addEventListener("click", (event) => {
			if (!this.#booleanAttribute("click-to-play", true) || this.#player?.state.kind === "image") return;
			const target = event.target;
			if (target instanceof Element && target.closest("[data-up-action]") !== null) return;
			if (this.#clickTimer !== null) clearTimeout(this.#clickTimer);
			this.#clickTimer = setTimeout(() => {
				this.#clickTimer = null;
				this.#togglePlay();
			}, 220);
		}, { signal });
		viewport.addEventListener("dblclick", (event) => {
			if (!this.#booleanAttribute("double-click-fullscreen", true)) return;
			event.preventDefault();
			if (this.#clickTimer !== null) {
				clearTimeout(this.#clickTimer);
				this.#clickTimer = null;
			}
			this.#toggleFullscreen();
		}, { signal });
		viewport.addEventListener("pointerdown", (event) => {
			if (this.#gestureOptions() === null || event.pointerType === "mouse" || !(event.target instanceof Element) || event.target.closest("[data-up-action], .up-seek-wrap, .up-menu, .up-survey") !== null) {
				this.#gesture = null;
				return;
			}
			this.#gesture = {
				x: event.clientX,
				y: event.clientY,
				time: Date.now(),
				active: true
			};
		}, { signal });
		const endGesture = (event) => {
			const gesture = this.#gesture;
			const gestures = this.#gestureOptions();
			this.#gesture = null;
			if (gesture === null || !gesture.active || gestures === null) return;
			const dx = event.clientX - gesture.x;
			const dy = event.clientY - gesture.y;
			const threshold = Math.max(16, gestures.threshold ?? 48);
			if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy)) {
				if (gestures.swipeSeek === false) return;
				const duration = this.#player?.state.duration ?? 0;
				const step = Math.max(this.#numberAttribute("seek-step") ?? 10, duration > 0 ? duration * .05 : 0);
				if (dx > 0 && gestures.swipeRight !== false) this.#player?.seek((this.#player?.state.currentTime ?? 0) + step);
				else if (dx < 0 && gestures.swipeLeft !== false) this.#player?.seek((this.#player?.state.currentTime ?? 0) - step);
				return;
			}
			if (Math.abs(dy) >= threshold && Math.abs(dy) > Math.abs(dx)) {
				if (gestures.swipeFullscreen === false) return;
				if (dy < 0 && gestures.swipeUp !== false) this.requestFullscreen().catch(() => {});
				else if (dy > 0 && gestures.swipeDown !== false) document.exitFullscreen?.().catch(() => {});
			}
		};
		viewport.addEventListener("pointerup", endGesture, { signal });
		viewport.addEventListener("pointercancel", () => {
			this.#gesture = null;
		}, { signal });
		const wake = () => {
			this.#showControls();
			this.#scheduleIdle();
		};
		root.addEventListener("pointermove", wake, { signal });
		root.addEventListener("pointerdown", wake, { signal });
		root.addEventListener("keydown", wake, { signal });
		root.addEventListener("pointerleave", () => {
			this.#scheduleIdle();
		}, { signal });
		this.#seekInput?.addEventListener("pointerdown", () => {
			this.#seeking = true;
		}, { signal });
		const endSeek = () => {
			this.#seeking = false;
		};
		this.#seekInput?.addEventListener("pointerup", endSeek, { signal });
		this.#seekInput?.addEventListener("change", endSeek, { signal });
		this.#seekInput?.addEventListener("input", (event) => {
			if (!(event.target instanceof HTMLInputElement)) return;
			const duration = this.#player?.state.duration ?? 0;
			if (duration > 0) this.#player?.seek(Number(event.target.value) / 1e3 * duration);
		}, { signal });
		this.#seekWrap?.addEventListener("pointermove", (event) => {
			this.#updatePreview(event);
		}, { signal });
		this.#seekWrap?.addEventListener("pointerleave", () => {
			setHidden(this.#preview, true);
		}, { signal });
		this.#volumeInput?.addEventListener("input", (event) => {
			if (event.target instanceof HTMLInputElement) this.#player?.setVolume(Number(event.target.value));
		}, { signal });
		this.addEventListener("keydown", this.#onKeydown, { signal });
	}
	#bindPlayer(player) {
		for (const type of FORWARDED_EVENTS) this.#unsubscribes.push(player.on(type, (detail) => {
			this.dispatchEvent(new CustomEvent(type, { detail }));
		}));
		this.#unsubscribes.push(player.on("statechange", (state) => {
			this.#render(state);
		}), player.on("timeupdate", (event) => {
			this.#renderTime(event.currentTime, event.duration, event.buffered);
		}), player.on("progress", (event) => {
			const state = player.state;
			this.#renderBuffered(event.buffered, state.duration);
		}), player.on("error", (event) => {
			if (this.#errorText !== null) this.#errorText.textContent = event.error.message;
		}), player.on("surveyopen", () => {
			this.#render(player.state);
		}), player.on("surveyclose", () => {
			this.#render(player.state);
		}));
	}
	#render(state) {
		const root = this.#root;
		if (root === null) return;
		const kind = state.kind ?? "video";
		root.dataset.upKind = kind;
		root.dataset.upStatus = state.status;
		root.dataset.upPlaying = String(state.playing);
		root.dataset.upEnded = String(state.ended);
		root.dataset.upTheme = this.#theme();
		root.dataset.upControls = this.#controlsMode();
		this.dataset.upStatus = state.status;
		this.dataset.upKind = kind;
		this.setAttribute("aria-busy", state.status === "loading" ? "true" : "false");
		if (state.status === "loading" && !state.surveyOpen) this.#surveyCompletion = false;
		this.#applyLabels(state);
		this.#applyVisibility(state);
		this.#setupCastAvailability();
		this.#applyCaptionStyle();
		this.#renderTime(state.currentTime, state.duration, state.buffered);
		this.#renderChapterRail(state);
		this.#renderTitle(state);
		this.#renderAudioVisual(kind);
		this.#renderSurvey(state);
		this.#renderMenus(state);
		this.#renderError(state);
		if (kind === "image") {
			const url = this.#player?.source?.url ?? "";
			if (url !== this.#imageSourceUrl) {
				this.#imageSourceUrl = url;
				this.#resetImageTransform();
			}
		}
		this.#applyImageTransform();
		if (this.#volumeInput !== null) {
			const level = state.muted ? 0 : state.volume;
			this.#volumeInput.value = String(level);
			this.#volumeInput.style.setProperty("--up-volume", `${level * 100}%`);
		}
		if (this.#spinner !== null) this.#spinner.hidden = state.status !== "loading";
		if (this.#playButton !== null) this.#playButton.disabled = !state.capabilities.play;
		if (this.#seekInput !== null) this.#seekInput.disabled = !state.capabilities.seek || state.duration <= 0;
		if (state.playing) this.#scheduleIdle();
		else this.#showControls();
	}
	#applyLabels(state) {
		if (this.#playButton !== null) {
			const icon = state.ended ? "replay" : state.playing ? "pause" : "play";
			setIcon(this.#playButton, icon);
			this.#playButton.setAttribute("aria-label", state.playing ? this.#strings.pause : state.ended ? this.#strings.replay : this.#strings.play);
			this.#playButton.setAttribute("aria-pressed", String(state.playing));
		}
		if (this.#bigPlay !== null) {
			setIcon(this.#bigPlay, state.ended ? "replay" : "play");
			this.#bigPlay.setAttribute("aria-label", state.ended ? this.#strings.replay : this.#strings.play);
			this.#bigPlay.hidden = state.playing || state.status === "loading" || !state.capabilities.play;
		}
		if (this.#muteButton !== null) {
			const silent = state.muted || state.volume === 0;
			setIcon(this.#muteButton, silent ? "volume-muted" : state.volume < .5 ? "volume-low" : "volume-high");
			this.#muteButton.setAttribute("aria-label", state.muted ? this.#strings.unmute : this.#strings.mute);
			this.#muteButton.setAttribute("aria-pressed", String(silent));
		}
		if (this.#captionsButton !== null) {
			this.#captionsButton.setAttribute("aria-label", this.#strings.captions);
			this.#captionsButton.title = this.#strings.captions;
			this.#captionsButton.setAttribute("aria-pressed", String(state.textTrack !== null));
			this.#captionsButton.dataset.upActive = String(state.textTrack !== null);
		}
		if (this.#fullscreenButton !== null) {
			setIcon(this.#fullscreenButton, state.fullscreen ? "fullscreen-exit" : "fullscreen");
			this.#fullscreenButton.setAttribute("aria-label", state.fullscreen ? this.#strings.exitFullscreen : this.#strings.fullscreen);
			this.#fullscreenButton.setAttribute("aria-pressed", String(state.fullscreen));
		}
		if (this.#pipButton !== null) {
			this.#pipButton.setAttribute("aria-label", this.#strings.pictureInPicture);
			this.#pipButton.setAttribute("aria-pressed", String(state.pictureInPicture));
		}
		if (this.#prevButton !== null) this.#prevButton.setAttribute("aria-label", this.#strings.previous);
		if (this.#nextButton !== null) this.#nextButton.setAttribute("aria-label", this.#strings.next);
		if (this.#chaptersButton !== null) this.#chaptersButton.setAttribute("aria-label", this.#strings.chapters);
		if (this.#playlistButton !== null) this.#playlistButton.setAttribute("aria-label", this.#strings.playlist);
		if (this.#settingsButton !== null) this.#settingsButton.setAttribute("aria-label", this.#strings.settings);
		if (this.#liveButton !== null) {
			this.#liveButton.textContent = this.#strings.live;
			this.#liveButton.setAttribute("aria-label", this.#strings.goLive);
			this.#liveButton.title = this.#strings.goLive;
		}
		if (this.#shareButton !== null) this.#shareButton.setAttribute("aria-label", this.#strings.share);
		if (this.#downloadButton !== null) {
			this.#downloadButton.setAttribute("aria-label", this.#strings.download);
			this.#downloadButton.title = this.#strings.download;
		}
		if (this.#castButton !== null) this.#castButton.setAttribute("aria-label", this.#strings.cast);
		if (this.#seekInput !== null) this.#seekInput.setAttribute("aria-label", this.#strings.seek);
		if (this.#volumeInput !== null) this.#volumeInput.setAttribute("aria-label", this.#strings.volume);
		if (this.#imageGroup !== null) {
			const buttons = this.#imageGroup.querySelectorAll("button");
			const labels = [
				this.#strings.zoomOut,
				this.#strings.zoomIn,
				this.#strings.rotate,
				this.#strings.download
			];
			buttons.forEach((button, index) => {
				const label = labels[index];
				if (label !== void 0) {
					button.setAttribute("aria-label", label);
					button.title = label;
				}
			});
		}
	}
	#applyVisibility(state) {
		const caps = state.capabilities;
		const kind = state.kind ?? "video";
		const isImage = kind === "image";
		const speed = this.#speedOptions();
		const hasSettings = this.#uiOptions?.settings !== false && (speed !== false && caps.playbackRate && this.#settingsSection("speed") || state.qualities.length > 0 && this.#settingsSection("quality") || state.textTracks.length > 0 && (this.#settingsSection("captions") || this.#settingsSection("captionStyle")) || state.audioTracks.length > 1 && this.#settingsSection("audio") || this.#settingsSection("loop") || this.#settingsSection("autoplay") || state.playlist !== null && state.playlist.length > 1 && this.#settingsSection("autoplayNext") || this.#settingsSection("sleepTimer") || this.#settingsSection("stats") || this.#settingsSection("shortcuts"));
		const hasPlaylist = state.playlist !== null;
		const canPlay = caps.play && this.#controlAllowed("play");
		setHidden(this.#playGroup, !canPlay && !hasPlaylist);
		if (this.#playButton !== null) this.#playButton.hidden = !canPlay;
		const showVolume = caps.volume && this.#controlAllowed("volume");
		const showMute = caps.volume && this.#controlAllowed("mute");
		setHidden(this.#volumeGroup, !showVolume && !showMute);
		setHidden(this.#muteButton, !showMute);
		setHidden(this.#volumeInput, !showVolume);
		setHidden(this.#seekWrap, !caps.seek || !this.#controlAllowed("seek"));
		setHidden(this.#captionsButton, !caps.textTracks || state.textTracks.length === 0 || !this.#controlAllowed("captions"));
		setHidden(this.#settingsButton, isImage || !hasSettings || !this.#controlAllowed("settings"));
		setHidden(this.#pipButton, !caps.pictureInPicture || kind !== "video" || !this.#controlAllowed("pip"));
		setHidden(this.#chaptersButton, state.chapters.length === 0 || !this.#controlAllowed("chapters"));
		setHidden(this.#playlistButton, state.playlist === null || !this.#controlAllowed("playlist"));
		setHidden(this.#liveButton, !state.live || !this.#controlAllowed("live"));
		setHidden(this.#shareButton, !this.#shareEnabled() || !this.#controlAllowed("share"));
		setHidden(this.#downloadButton, isImage || !this.#downloadAllowed(kind));
		setHidden(this.#castButton, !this.#remotePlaybackAvailable() || !this.#controlAllowed("cast"));
		setHidden(this.#fullscreenButton, !caps.fullscreen || !this.#controlAllowed("fullscreen"));
		setHidden(this.#imageGroup, !isImage);
		setHidden(this.#bigPlay, !canPlay || state.playing || state.status === "loading" || this.#uiOptions?.showBigPlay === false);
		if (this.#prevButton !== null) {
			const allowPrevious = this.#player?.options.playlist?.allowPrevious !== false;
			const showPrevious = hasPlaylist && this.#controlAllowed("previous") && allowPrevious;
			this.#prevButton.hidden = !showPrevious;
			this.#prevButton.disabled = state.playlist?.canPrevious !== true;
		}
		if (this.#nextButton !== null) {
			const allowNext = this.#player?.options.playlist?.allowNext !== false;
			const showNext = hasPlaylist && this.#controlAllowed("next") && allowNext;
			this.#nextButton.hidden = !showNext;
			this.#nextButton.disabled = state.playlist?.canNext !== true;
			this.#nextButton.title = state.playlist?.nextLocked === true ? this.#strings.required : this.#strings.next;
		}
		if (this.#timeLabel !== null) this.#timeLabel.hidden = this.#uiOptions?.showTime === false || this.#controlAllowed("time") === false;
		if (this.#bufferedBar !== null) this.#bufferedBar.hidden = this.#uiOptions?.showBuffered === false;
		if (this.#imageGroup !== null) {
			const imageOptions = this.#imageOptions ?? this.#player?.options.image;
			this.#imageGroup.querySelectorAll("[data-up-action=\"zoom-in\"], [data-up-action=\"zoom-out\"]").forEach((button) => {
				button.hidden = imageOptions?.zoom === false || !this.#controlAllowed("zoom");
			});
			const rotate = this.#imageGroup.querySelector("[data-up-action=\"rotate\"]");
			const download = this.#imageGroup.querySelector("[data-up-action=\"download\"]");
			if (rotate !== null) rotate.hidden = imageOptions?.rotate === false || !this.#controlAllowed("rotate");
			if (download !== null) {
				const configured = this.#uiOptions?.download;
				download.hidden = imageOptions?.download === false || configured !== void 0 && !this.#downloadAllowed("image") || !this.#controlAllowed("download");
			}
		}
	}
	#applyCaptionStyle() {
		const root = this.#root;
		if (root === null) return;
		const style = this.#player?.options.captions?.style;
		if (style === void 0) return;
		const declarations = captionStyleDeclarations(style);
		for (const [property, value] of Object.entries(declarations)) root.style.setProperty(property, value);
	}
	#renderTime(currentTime, duration, buffered) {
		const live = this.#player?.state.live ?? false;
		const remaining = Math.max(duration - currentTime, 0);
		if (this.#timeLabel !== null) {
			if (live) {
				this.#timeLabel.textContent = this.#strings.live;
				this.#timeLabel.title = this.#strings.live;
				this.#timeLabel.setAttribute("aria-label", this.#strings.live);
			} else {
				const elapsed = formatTimecode(currentTime, duration);
				const leftToPlay = formatTimecode(remaining, duration);
				const total = formatTimecode(duration, duration);
				const showTotal = this.#uiOptions?.time?.showTotal !== false;
				const leading = this.#timeMode === "remaining" ? `-${leftToPlay}` : elapsed;
				this.#timeLabel.textContent = showTotal ? `${leading} / ${total}` : leading;
				this.#timeLabel.dataset.upTimeMode = this.#timeMode;
				this.#timeLabel.title = `${this.#strings.elapsedTime}: ${elapsed} · ${this.#strings.remainingTime}: ${leftToPlay} · ${this.#strings.totalTime}: ${total}`;
				this.#timeLabel.setAttribute("aria-label", `${leading}${showTotal ? ` / ${total}` : ""}. ${this.#strings.elapsedTime} ${elapsed}, ${this.#strings.remainingTime} ${leftToPlay}`);
			}
		}
		if (this.#seekInput !== null) {
			const progress = duration > 0 ? Math.min(Math.max(currentTime / duration, 0), 1) : 0;
			this.#seekInput.style.setProperty("--up-progress", `${progress * 100}%`);
			if (!this.#seeking) this.#seekInput.value = String(progress * 1e3);
			this.#seekInput.setAttribute("aria-valuetext", `${formatTimecode(currentTime, duration)} / ${formatTimecode(duration, duration)}`);
		}
		this.#renderBuffered(buffered, duration);
		if (this.#chapterLabel !== null) {
			const chapter = this.#player?.state.activeChapter;
			this.#chapterLabel.textContent = chapter?.title ?? "";
			this.#chapterLabel.hidden = chapter === null || this.#uiOptions?.showChapterLabel === false || !this.#controlAllowed("chapterLabel");
		}
		if (this.#menuOpen === "stats") {
			const state = this.#player?.state;
			if (state !== void 0) this.#renderStatsPanel(state);
		}
	}
	#renderBuffered(buffered, duration) {
		if (this.#bufferedBar !== null) this.#bufferedBar.style.width = duration > 0 ? `${Math.min(Math.max(buffered / duration, 0), 1) * 100}%` : "0%";
	}
	#renderChapterRail(state) {
		const rail = this.#chapterRail;
		if (rail === null) return;
		const signature = `${state.duration}|${state.chapters.map((chapter) => `${chapter.id}:${chapter.startTime}`).join(",")}`;
		if (signature === this.#chapterSignature) return;
		this.#chapterSignature = signature;
		rail.replaceChildren();
		rail.hidden = state.chapters.length === 0;
		for (const marker of chapterMarkers(state.chapters, state.duration)) {
			const node = element("span", "up-chapter-marker");
			node.style.left = `${marker.position * 100}%`;
			node.title = `${formatTimecode(marker.chapter.startTime, state.duration)} ${marker.chapter.title}`;
			rail.append(node);
		}
	}
	#renderTitle(state) {
		if (this.#titleBar === null || this.#titleLabel === null) return;
		const source = state.source;
		const title = source !== null && "title" in source && typeof source.title === "string" ? source.title : this.getAttribute("label") ?? "";
		this.#titleLabel.textContent = title;
		this.#titleBar.hidden = title.length === 0 || this.#uiOptions?.showTitle === false || !this.#controlAllowed("title");
	}
	#renderAudioVisual(kind) {
		const visual = this.#audioVisual;
		const art = this.#audioArt;
		if (visual === null || art === null) return;
		const poster = (this.#player?.options.poster ?? this.getAttribute("poster") ?? this.getAttribute("thumbnail") ?? "").trim();
		const hasPoster = kind === "audio" && poster.length > 0;
		if (hasPoster) {
			if (art.getAttribute("src") !== poster) art.src = poster;
			art.hidden = false;
		} else {
			art.hidden = true;
			art.removeAttribute("src");
		}
		visual.dataset.upHasPoster = String(hasPoster);
	}
	#renderSurvey(state) {
		const panel = this.#surveyPanel;
		const survey = state.survey;
		if (panel === null) return;
		if (!state.surveyOpen || survey === null) {
			if (this.#surveyCompletion) return;
			if (this.#surveyKey.length > 0) {
				panel.clear();
				this.#surveyKey = "";
			}
			return;
		}
		this.#surveyCompletion = false;
		const key = `${survey.id ?? survey.title ?? "survey"}:${survey.questions.map((question) => question.id).join(",")}`;
		if (key === this.#surveyKey) return;
		this.#surveyKey = key;
		panel.render(survey, this.#strings);
		queueMicrotask(() => panel.focus());
	}
	#renderMenus(state) {
		switch (this.#menuOpen) {
			case "captions":
				this.#renderCaptionsMenu(state);
				break;
			case "settings":
				if (this.#settingsView === "speed" && this.#speedViewBuilt) this.#syncSpeedView(state.playbackRate);
				else this.#renderSettingsMenu(state);
				break;
			case "chapters":
				this.#renderChaptersMenu(state);
				break;
			case "playlist":
				this.#renderPlaylistMenu(state);
				break;
			case "stats":
				this.#renderStatsPanel(state);
				break;
			case "shortcuts":
				this.#renderShortcutsPanel();
				break;
			case "share": this.#renderShareMenu();
		}
	}
	#renderError(state) {
		if (this.#error === null || this.#errorText === null) return;
		const failed = state.status === "error";
		this.#error.hidden = !failed;
		this.#errorText.textContent = failed ? state.error?.message ?? this.#strings.error : "";
	}
	#renderCaptionsMenu(state) {
		const menu = this.#captionsMenu;
		if (menu === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.subtitles, this.#menuReturn ?? "close");
		const items = captionMenuItems(state.textTracks, state.textTrack?.id ?? null, this.#strings.captionsOff);
		for (const item of items) menu.append(this.#menuItem(item.label, "text-track", item.id ?? "__off__", item.selected, { subtitle: item.language }));
		menu.append(this.#menuDivider(), this.#appendMenuTitle(menu, this.#strings.captionSize));
		for (const [label, value] of [
			["Small", "80%"],
			["Medium", "100%"],
			["Large", "140%"]
		]) {
			const current = this.#player?.options.captions?.style?.fontSize ?? "100%";
			menu.append(this.#menuItem(label, "caption-size", value, current === value, { keepOpen: true }));
		}
	}
	#renderSettingsMenu(state) {
		const menu = this.#settingsMenu;
		if (menu === null) return;
		menu.replaceChildren();
		this.#speedViewBuilt = false;
		if (this.#settingsView === "main") {
			this.#appendMenuHeader(menu, this.#strings.settings, "close");
			let rows = 0;
			if (this.#speedOptions() !== false && state.capabilities.playbackRate && this.#settingsSection("speed")) {
				this.#appendSettingsRow(menu, "speed", this.#strings.speed, state.playbackRate === 1 ? this.#strings.normal : formatPlaybackRate(state.playbackRate), "speed", "< / >");
				rows += 1;
			}
			if (state.qualities.length > 0 && this.#settingsSection("quality")) {
				this.#appendSettingsRow(menu, "quality", this.#strings.quality, this.#qualityLabel(state), "quality", "[ / ]");
				rows += 1;
			}
			if (state.textTracks.length > 0 && this.#settingsSection("captions")) {
				this.#appendSettingsRow(menu, "captions", this.#strings.subtitles, state.textTrack?.label ?? this.#strings.off, "captions", "C");
				rows += 1;
			}
			if (state.audioTracks.length > 1 && this.#settingsSection("audio")) {
				this.#appendSettingsRow(menu, "audio-track", this.#strings.audio, state.audioTrack?.label ?? this.#strings.auto, "audio", "A");
				rows += 1;
			}
			if (this.#settingsSection("sleepTimer")) {
				this.#appendSettingsRow(menu, "sleep-timer", this.#strings.sleepTimer, this.#sleepTimerLabel(), "sleep", "T");
				rows += 1;
			}
			if (this.#settingsSection("loop")) {
				menu.append(this.#menuItem(this.#strings.loop, "loop", "toggle", this.#player?.options.loop === true, {
					keepOpen: true,
					toggle: true,
					icon: "loop",
					shortcut: "R"
				}));
				rows += 1;
			}
			if (this.#settingsSection("autoplay")) {
				menu.append(this.#menuItem(this.#strings.autoplay, "autoplay", "toggle", this.#player?.options.autoplay === true, {
					keepOpen: true,
					toggle: true,
					icon: "play"
				}));
				rows += 1;
			}
			if (this.#settingsSection("autoplayNext") && state.playlist !== null && state.playlist.length > 1) {
				menu.append(this.#menuItem(this.#strings.autoplayNext, "autoplay-next", "toggle", state.playlist.autoAdvance, {
					keepOpen: true,
					toggle: true,
					icon: "skip-next"
				}));
				rows += 1;
			}
			if (state.textTracks.length > 0 && this.#settingsSection("captionStyle")) {
				this.#appendSettingsRow(menu, "text-size", this.#strings.captionSize, this.#player?.options.captions?.style?.fontSize ?? "100%", "caption-size");
				rows += 1;
			}
			if (this.#settingsSection("stats") || this.#settingsSection("shortcuts")) menu.append(this.#menuDivider());
			if (this.#settingsSection("stats")) {
				menu.append(this.#menuItem(this.#strings.statsForNerds, "stats", "open", false, {
					icon: "stats",
					trailing: "chevron",
					shortcut: "I"
				}));
				rows += 1;
			}
			if (this.#settingsSection("shortcuts")) {
				menu.append(this.#menuItem(this.#strings.keyboardShortcuts, "shortcuts", "open", false, {
					icon: "shortcuts",
					trailing: "chevron",
					shortcut: "?"
				}));
				rows += 1;
			}
			if (rows === 0) menu.append(this.#menuEmpty(this.#strings.off));
			return;
		}
		this.#appendSettingsHeader(menu, this.#settingsViewTitle(this.#settingsView));
		switch (this.#settingsView) {
			case "speed":
				this.#renderSpeedView(menu, state);
				this.#speedViewBuilt = true;
				break;
			case "quality":
				this.#renderQualityView(menu, state);
				break;
			case "captions":
				menu.append(this.#menuItem(this.#strings.subtitles, "text-track-toggle", "toggle", state.textTrack !== null, {
					keepOpen: true,
					toggle: true,
					icon: "captions"
				}));
				menu.append(this.#menuDivider());
				for (const item of captionMenuItems(state.textTracks, state.textTrack?.id ?? null, this.#strings.captionsOff)) menu.append(this.#menuItem(item.label, "text-track", item.id ?? "__off__", item.selected, {
					subtitle: item.language,
					trailing: "check"
				}));
				break;
			case "audio":
				for (const track of state.audioTracks) menu.append(this.#menuItem(track.label, "audio-track", track.id, state.audioTrack?.id === track.id, {
					subtitle: track.language,
					trailing: "check"
				}));
				break;
			case "sleep":
				for (const minutes of [
					0,
					5,
					10,
					15,
					30,
					45,
					60
				]) menu.append(this.#menuItem(minutes === 0 ? this.#strings.off : `${minutes} ${this.#strings.minutes}`, "sleep-timer", String(minutes), this.#sleepMinutes === minutes, {
					keepOpen: false,
					trailing: "check",
					icon: minutes === 0 ? void 0 : "sleep-timer"
				}));
				break;
			case "caption-size":
			case "accessibility": for (const [label, value] of [
				["Small", "80%"],
				["Medium", "100%"],
				["Large", "140%"]
			]) {
				const current = this.#player?.options.captions?.style?.fontSize ?? "100%";
				menu.append(this.#menuItem(label, "caption-size", value, current === value, {
					keepOpen: true,
					trailing: "check"
				}));
			}
		}
	}
	#renderSpeedView(menu, state) {
		const rates = this.#speedRates();
		if (rates.length === 0) return;
		const min = Math.min(...rates);
		const max = Math.max(...rates);
		const current = clampPlaybackRate(state.playbackRate);
		const panel = element("div", "up-speed-panel");
		const display = element("div", "up-speed-value");
		display.dataset.upSpeedValue = "true";
		display.textContent = this.#formatSpeedValue(current);
		const row = element("div", "up-speed-row");
		const adjust = (delta) => {
			const button = element("button", "up-speed-adjust");
			button.type = "button";
			button.dataset.upMenu = "speed-adjust";
			button.dataset.upValue = String(delta);
			button.dataset.upKeepOpen = "true";
			button.setAttribute("aria-label", `${delta > 0 ? "+" : "−"}${formatPlaybackRate(.25)}`);
			button.append(createIcon(delta > 0 ? "plus" : "minus", 18));
			return button;
		};
		const slider = element("input", "up-speed-slider");
		slider.type = "range";
		slider.min = String(min);
		slider.max = String(max);
		slider.step = "0.05";
		slider.value = String(current);
		slider.dataset.upSpeedSlider = "true";
		slider.setAttribute("aria-label", this.#strings.speed);
		slider.setAttribute("aria-valuetext", this.#formatSpeedValue(current));
		row.append(adjust(-.25), slider, adjust(.25));
		const chips = element("div", "up-speed-chips");
		for (const rate of rates) {
			const chip = element("button", "up-speed-chip");
			chip.type = "button";
			chip.dataset.upMenu = "speed";
			chip.dataset.upValue = String(rate);
			chip.dataset.upKeepOpen = "true";
			chip.setAttribute("role", "menuitemradio");
			chip.setAttribute("aria-checked", String(Math.abs(current - rate) < .001));
			const value = element("span", "up-speed-chip-value");
			value.textContent = this.#formatSpeedChip(rate);
			const note = element("span", "up-speed-chip-note");
			note.textContent = rate === 1 ? this.#strings.normal : "";
			chip.append(value, note);
			chips.append(chip);
		}
		panel.append(display, row, chips);
		menu.append(panel);
	}
	#syncSpeedView(rate) {
		const menu = this.#settingsMenu;
		if (menu === null) return;
		const value = menu.querySelector("[data-up-speed-value]");
		if (value !== null) value.textContent = this.#formatSpeedValue(rate);
		const slider = menu.querySelector("[data-up-speed-slider]");
		if (slider !== null) {
			if (document.activeElement !== slider) slider.value = String(rate);
			slider.setAttribute("aria-valuetext", this.#formatSpeedValue(rate));
		}
		for (const chip of menu.querySelectorAll(".up-speed-chip")) chip.setAttribute("aria-checked", String(Math.abs(Number(chip.dataset.upValue) - rate) < .001));
	}
	#renderQualityView(menu, state) {
		const levels = normalizeQualityLevels(state.qualities);
		if (levels.length === 0) {
			menu.append(this.#menuEmpty(this.#strings.off));
			return;
		}
		const panel = element("div", "up-speed-panel up-quality-panel");
		const display = element("div", "up-speed-value up-quality-value");
		display.textContent = this.#qualityLabel(state);
		const row = element("div", "up-speed-row");
		const adjust = (delta) => {
			const button = element("button", "up-speed-adjust up-quality-adjust");
			button.type = "button";
			button.dataset.upMenu = "quality-adjust";
			button.dataset.upValue = String(delta);
			button.dataset.upKeepOpen = "true";
			button.setAttribute("aria-label", delta > 0 ? this.#strings.qualityHigher ?? "Higher quality" : this.#strings.qualityLower ?? "Lower quality");
			button.append(createIcon(delta > 0 ? "plus" : "minus", 18));
			return button;
		};
		row.append(adjust(-1), display, adjust(1));
		const chips = element("div", "up-speed-chips up-quality-chips");
		const appendChip = (label, value, selected) => {
			const chip = element("button", "up-speed-chip up-quality-chip");
			chip.type = "button";
			chip.dataset.upMenu = "quality";
			chip.dataset.upValue = value;
			chip.dataset.upKeepOpen = "true";
			chip.setAttribute("role", "menuitemradio");
			chip.setAttribute("aria-checked", String(selected));
			const text = element("span", "up-speed-chip-value");
			text.textContent = label;
			chip.append(text);
			chips.append(chip);
		};
		appendChip(this.#strings.auto, "__auto__", state.quality === null);
		for (const level of levels) appendChip(level.label, level.id, state.quality === level.id);
		panel.append(row, chips);
		menu.append(panel);
	}
	#qualityLabel(state) {
		if (state.quality === null) return this.#strings.auto;
		const level = findQuality(state.qualities, state.quality);
		return level === null ? state.quality : qualityLabel(level);
	}
	#formatSpeedValue(rate) {
		return `${rate.toFixed(2)}x`;
	}
	#formatSpeedChip(rate) {
		return Number.isInteger(rate) ? rate.toFixed(1) : String(rate);
	}
	#sleepTimerLabel() {
		if (this.#sleepMinutes <= 0 || this.#sleepDeadline <= 0) return this.#strings.off;
		return `${Math.max(1, Math.ceil((this.#sleepDeadline - Date.now()) / 6e4))} ${this.#strings.minutes}`;
	}
	#setSleepTimer(minutes) {
		if (this.#sleepTimer !== null) {
			clearTimeout(this.#sleepTimer);
			this.#sleepTimer = null;
		}
		this.#sleepMinutes = Math.max(0, minutes);
		this.#sleepDeadline = 0;
		if (this.#sleepMinutes === 0) return;
		this.#sleepDeadline = Date.now() + this.#sleepMinutes * 6e4;
		this.#sleepTimer = setTimeout(() => {
			this.#sleepTimer = null;
			this.#sleepMinutes = 0;
			this.#sleepDeadline = 0;
			this.#player?.pause();
			this.#showToast(this.#strings.sleepTimerEnded);
			if (this.#menuOpen === "settings") {
				const state = this.#player?.state;
				if (state !== void 0) this.#renderSettingsMenu(state);
			}
		}, this.#sleepMinutes * 6e4);
	}
	#settingsViewTitle(view) {
		switch (view) {
			case "speed": return this.#strings.speed;
			case "quality": return this.#strings.quality;
			case "captions": return this.#strings.subtitles;
			case "audio": return this.#strings.audio;
			case "sleep": return this.#strings.sleepTimer;
			case "caption-size": return this.#strings.captionSize;
			case "accessibility": return this.#strings.captionSize;
			default: return this.#strings.settings;
		}
	}
	#appendSettingsRow(menu, icon, label, value, view, shortcut) {
		menu.append(this.#menuItem(label, "settings-view", view, false, {
			icon,
			trailingText: value,
			trailing: "chevron",
			...shortcut === void 0 ? {} : { shortcut }
		}));
	}
	#appendSettingsHeader(menu, title) {
		const header = element("div", "up-menu-header");
		const back = element("button", "up-menu-back");
		back.type = "button";
		back.dataset.upMenu = "settings-back";
		back.dataset.upValue = "main";
		back.setAttribute("aria-label", this.#strings.close);
		back.append(createIcon("chevron-left", 20));
		const label = element("span", "up-menu-header-title");
		label.textContent = title;
		header.append(back, label);
		menu.append(header);
	}
	#appendMenuHeader(menu, title, returnTo) {
		const header = element("div", "up-menu-header");
		const back = element("button", "up-menu-back");
		back.type = "button";
		back.dataset.upMenu = "menu-back";
		back.dataset.upValue = returnTo;
		back.setAttribute("aria-label", this.#strings.close);
		back.append(createIcon("chevron-left", 20));
		const label = element("span", "up-menu-header-title up-menu-title");
		label.textContent = title;
		header.append(back, label);
		menu.append(header);
	}
	#renderChaptersMenu(state) {
		const menu = this.#chaptersMenu;
		if (menu === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.chapters, this.#menuReturn ?? "close");
		for (const chapter of sortChapters(state.chapters)) menu.append(this.#menuItem(`${formatTimecode(chapter.startTime, state.duration)}  ${chapter.title}`, "chapter", chapter.id, state.activeChapter?.id === chapter.id, { image: chapter.thumbnail }));
	}
	#renderPlaylistMenu(state) {
		const menu = this.#playlistMenu;
		const player = this.#player;
		if (menu === null || player === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.playlist, this.#menuReturn ?? "close");
		const items = player.playlistItems;
		if (items.length === 0) {
			menu.append(this.#menuEmpty(this.#strings.off));
			return;
		}
		const current = state.playlist?.index ?? 0;
		const gatesAdvance = player.options.playlist?.requireCompletion === true || player.options.playlist?.gateAdvance === true;
		const allowNext = player.options.playlist?.allowNext !== false;
		items.forEach((item, index) => {
			const button = this.#menuItem(item.title ?? `${this.#strings.playlist} ${index + 1}`, "playlist-item", String(index), state.playlist?.index === index, {
				image: item.poster,
				subtitle: item.duration === void 0 ? void 0 : formatTime(item.duration)
			});
			button.disabled = index > current && (!allowNext || gatesAdvance && state.playlist?.completed !== true) || index < current && player.options.playlist?.allowPrevious === false;
			menu.append(button);
		});
	}
	#renderStatsPanel(state) {
		const menu = this.#statsPanel;
		if (menu === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.statsForNerds, this.#menuReturn ?? "close");
		const media = this.#player?.mediaElement;
		const video = typeof HTMLVideoElement !== "undefined" && media instanceof HTMLVideoElement ? media : null;
		const rows = [
			[this.#strings.resolution, video === null ? "—" : `${video.videoWidth}×${video.videoHeight}`],
			[this.#strings.frames, video === null ? "—" : `${video.getVideoPlaybackQuality?.().totalVideoFrames ?? 0}`],
			[this.#strings.quality, this.#qualityLabel(state)],
			[this.#strings.audioTrack, state.audioTrack?.label ?? this.#strings.auto],
			[this.#strings.subtitles, state.textTrack?.label ?? this.#strings.off],
			[this.#strings.speed, formatPlaybackRate(state.playbackRate)],
			[this.#strings.volume, `${Math.round((state.muted ? 0 : state.volume) * 100)}%`],
			[this.#strings.buffered, formatTime(state.buffered)],
			[this.#strings.network, video === null ? "—" : String(video.networkState)],
			[this.#strings.live, String(state.live)],
			["Source", this.#player?.source?.url ?? "—"]
		];
		for (const [label, value] of rows) {
			const row = element("div", "up-stats-row");
			const key = element("span", "up-stats-key");
			key.textContent = label;
			const val = element("span", "up-stats-value");
			val.textContent = value;
			val.title = value;
			row.append(key, val);
			menu.append(row);
		}
	}
	#renderShortcutsPanel() {
		const menu = this.#shortcutsPanel;
		if (menu === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.keyboardShortcuts, this.#menuReturn ?? "close");
		for (const shortcut of PLAYER_SHORTCUTS) {
			const row = element("div", "up-shortcut-row");
			const keys = element("kbd", "up-kbd");
			keys.textContent = shortcut.keys;
			const action = element("span", "up-shortcut-action");
			action.textContent = shortcut.action;
			row.append(keys, action);
			menu.append(row);
		}
	}
	#renderShareMenu() {
		const menu = this.#shareMenu;
		if (menu === null) return;
		menu.replaceChildren();
		this.#appendMenuHeader(menu, this.#strings.share, this.#menuReturn ?? "close");
		const url = this.#shareUrl();
		if (url.length === 0) {
			menu.append(this.#menuEmpty(this.#strings.shareUnavailable ?? "Sharing is not available for this media."));
			return;
		}
		const title = this.#shareTitle();
		const poster = this.#posterUrl();
		if (poster.length > 0) {
			const preview = element("img", "up-share-thumb");
			preview.src = poster;
			preview.alt = "";
			preview.loading = "lazy";
			menu.append(preview);
		}
		if (typeof navigator !== "undefined" && typeof navigator.share === "function") menu.append(this.#shareAction(this.#strings.share, "share-native"));
		menu.append(this.#shareAction(this.#strings.copyLink, "share-copy"));
		if (this.#embedOptions() !== null) menu.append(this.#shareAction(this.#strings.copyEmbed ?? this.#strings.embed ?? "Copy embed code", "share-embed"));
		if (/^https?:\/\//i.test(url)) {
			menu.append(this.#menuDivider());
			for (const target of SHARE_TARGETS) menu.append(this.#shareLink(target, url, title));
		}
	}
	#shareAction(label, kind) {
		const button = element("button", "up-menu-item");
		button.type = "button";
		button.dataset.upMenu = kind;
		button.setAttribute("role", "menuitem");
		button.append(this.#menuItemLabel(label));
		return button;
	}
	#shareLink(target, url, title) {
		const link = element("a", "up-menu-item");
		link.href = target.href(url, title);
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.dataset.upMenu = "share-dismiss";
		link.setAttribute("role", "menuitem");
		link.append(this.#menuItemLabel(target.label));
		return link;
	}
	#menuItemLabel(label) {
		const text = element("span", "up-menu-item-text");
		const title = element("span", "up-menu-item-label");
		title.textContent = label;
		text.append(title);
		return text;
	}
	#createMenu(className) {
		const menu = element("div", `up-menu ${className}`);
		menu.hidden = true;
		menu.setAttribute("part", "menu");
		menu.setAttribute("role", "menu");
		return menu;
	}
	#appendMenuTitle(parent, title) {
		const node = element("div", "up-menu-title");
		node.textContent = title;
		parent.append(node);
		return node;
	}
	#menuDivider() {
		return element("div", "up-menu-divider");
	}
	#menuEmpty(label) {
		const node = element("div", "up-menu-empty");
		node.textContent = label;
		return node;
	}
	#menuItem(label, kind, value, selected, options = {}) {
		const button = element("button", "up-menu-item");
		button.type = "button";
		button.dataset.upMenu = kind;
		button.dataset.upValue = value;
		button.setAttribute("role", options.toggle === true ? "menuitemcheckbox" : "menuitemradio");
		button.setAttribute("aria-checked", String(selected));
		if (options.keepOpen === true) button.dataset.upKeepOpen = "true";
		if (options.image !== void 0 && options.image.length > 0) {
			const image = element("img", "up-menu-thumb");
			image.src = options.image;
			image.alt = "";
			image.loading = "lazy";
			button.append(image);
		} else if (options.icon !== void 0) {
			const icon = element("span", "up-menu-icon");
			icon.append(createIcon(options.icon, 20));
			button.append(icon);
		}
		const text = element("span", "up-menu-item-text");
		const title = element("span", "up-menu-item-label");
		title.textContent = label;
		text.append(title);
		if (options.subtitle !== void 0 && options.subtitle.length > 0) {
			const subtitle = element("span", "up-menu-item-subtitle");
			subtitle.textContent = options.subtitle;
			text.append(subtitle);
		}
		button.append(text);
		if (options.shortcut !== void 0 && options.shortcut.length > 0) {
			const shortcut = element("kbd", "up-kbd up-menu-shortcut");
			shortcut.textContent = options.shortcut;
			button.append(shortcut);
		}
		if (options.trailingText !== void 0 && options.trailingText.length > 0) {
			const trailingText = element("span", "up-menu-value");
			trailingText.textContent = options.trailingText;
			button.append(trailingText);
		}
		if (options.toggle === true) {
			const switchNode = element("span", "up-switch");
			switchNode.dataset.upChecked = String(selected);
			switchNode.setAttribute("aria-hidden", "true");
			button.append(switchNode);
		} else if (selected && options.trailing !== "chevron") button.append(createIcon("check", 16));
		else if (options.trailing === "chevron") {
			const chevron = createIcon("chevron-right", 18);
			chevron.classList.add("up-menu-chevron");
			button.append(chevron);
		}
		return button;
	}
	#showMenu(name, returnTo = null) {
		const map = {
			captions: this.#captionsMenu,
			settings: this.#settingsMenu,
			chapters: this.#chaptersMenu,
			playlist: this.#playlistMenu,
			stats: this.#statsPanel,
			shortcuts: this.#shortcutsPanel,
			share: this.#shareMenu
		};
		for (const menu of this.#menus) menu.hidden = true;
		const target = map[name];
		if (target === null) return;
		this.#menuOpen = name;
		this.#menuReturn = returnTo;
		if (name === "settings") this.#settingsView = "main";
		this.#showControls();
		const state = this.#player?.state;
		if (state !== void 0) this.#renderMenus(state);
		target.hidden = false;
		this.#syncMenuButtonState();
		target.querySelector("button")?.focus();
	}
	#toggleMenu(name) {
		if (this.#menuOpen === name) {
			this.#closeMenus();
			return;
		}
		this.#showMenu(name);
	}
	#closeMenus() {
		for (const menu of this.#menus) menu.hidden = true;
		this.#menuOpen = null;
		this.#menuReturn = null;
		this.#settingsView = "main";
		this.#speedViewBuilt = false;
		this.#syncMenuButtonState();
	}
	#syncMenuButtonState() {
		for (const [name, button] of [
			["settings", this.#settingsButton],
			["chapters", this.#chaptersButton],
			["playlist", this.#playlistButton],
			["shortcuts", null],
			["share", this.#shareButton]
		]) button?.setAttribute("aria-expanded", String(this.#menuOpen === name));
	}
	#runAction(action) {
		switch (action) {
			case "play":
				this.#togglePlay();
				break;
			case "previous":
				this.#player?.previous().catch(() => {});
				break;
			case "next":
				this.#player?.next().catch(() => {});
				break;
			case "mute":
				this.#player?.toggleMute();
				break;
			case "captions":
				this.#toggleSubtitles();
				break;
			case "time-toggle": {
				if (this.#uiOptions?.time?.toggle === false) break;
				this.#timeMode = this.#timeMode === "elapsed" ? "remaining" : "elapsed";
				const state = this.#player?.state;
				if (state !== void 0) this.#renderTime(state.currentTime, state.duration, state.buffered);
				break;
			}
			case "settings":
				this.#toggleMenu("settings");
				break;
			case "chapters":
				this.#toggleMenu("chapters");
				break;
			case "playlist":
				this.#toggleMenu("playlist");
				break;
			case "live-edge": {
				const media = this.#player?.mediaElement;
				const target = (typeof HTMLMediaElement !== "undefined" && media instanceof HTMLMediaElement ? liveEdge(media) : null) ?? this.#player?.state.duration ?? 0;
				if (target > 0) this.#player?.seek(target);
				break;
			}
			case "share":
				this.#toggleMenu("share");
				break;
			case "cast":
				this.#promptRemotePlayback();
				break;
			case "pip":
				this.#togglePip();
				break;
			case "fullscreen":
				this.#toggleFullscreen();
				break;
			case "zoom-in":
				this.#imageTransform = zoomImage(this.#imageTransform, 1, this.#imageOptions?.minZoom, this.#imageOptions?.maxZoom);
				this.#applyImageTransform();
				break;
			case "zoom-out":
				this.#imageTransform = zoomImage(this.#imageTransform, -1, this.#imageOptions?.minZoom, this.#imageOptions?.maxZoom);
				this.#applyImageTransform();
				break;
			case "rotate":
				this.#imageTransform = rotateImage(this.#imageTransform);
				this.#applyImageTransform();
				break;
			case "download":
				this.#download();
				break;
			case "retry": this.#player?.retry().catch(() => {});
		}
	}
	#toggleSubtitles() {
		const player = this.#player;
		if (player === null) return;
		const enable = player.state.textTrack === null;
		player.setCaptionsEnabled(enable);
		const track = player.state.textTrack;
		this.#showToast(track === null ? this.#strings.captionsOff : `${this.#strings.subtitles}: ${track.label}`);
	}
	#stepQuality(delta) {
		const player = this.#player;
		if (player === null || player.state.qualities.length === 0) return;
		const next = stepQuality(player.state.qualities, player.state.quality, delta);
		player.setQuality(next);
		this.#showToast(`${this.#strings.quality}: ${this.#qualityLabel(player.state)}`);
	}
	#openSettingsView(view) {
		const player = this.#player;
		if (player === null) return;
		if (view === "quality" && player.state.qualities.length === 0) return;
		if (view === "audio" && player.state.audioTracks.length < 2) return;
		this.#showMenu("settings");
		this.#settingsView = view;
		this.#renderSettingsMenu(player.state);
		this.#syncMenuButtonState();
		this.#settingsMenu?.querySelector("button")?.focus();
	}
	#runMenuAction(item) {
		const player = this.#player;
		const kind = item.dataset.upMenu;
		const value = item.dataset.upValue ?? "";
		const keepOpen = item.dataset.upKeepOpen === "true";
		if (player === null || kind === void 0) return;
		switch (kind) {
			case "text-track":
				player.setTextTrack(value === "__off__" ? null : value);
				break;
			case "text-track-toggle":
				player.setCaptionsEnabled(player.state.textTrack === null);
				break;
			case "quality-adjust": {
				const next = stepQuality(player.state.qualities, player.state.quality, Number(value));
				player.setQuality(next);
				break;
			}
			case "audio-track":
				player.setAudioTrack(value);
				break;
			case "speed":
				player.setPlaybackRate(Number(value));
				break;
			case "speed-adjust": {
				const rates = this.#speedRates();
				const current = player.state.playbackRate;
				if (rates.length > 0) {
					const next = clampPlaybackRate(Math.min(Math.max(current + Number(value), Math.min(...rates)), Math.max(...rates)));
					player.setPlaybackRate(next);
				}
				break;
			}
			case "quality":
				player.setQuality(value === "__auto__" ? null : value);
				break;
			case "sleep-timer":
				this.#setSleepTimer(Number(value));
				this.#showToast(Number(value) > 0 ? `${this.#strings.sleepTimer}: ${value} ${this.#strings.minutes}` : `${this.#strings.sleepTimer}: ${this.#strings.off}`);
				break;
			case "caption-size":
				player.setCaptionStyle({ fontSize: value });
				this.#applyCaptionStyle();
				break;
			case "loop":
				player.setLoop(player.options.loop !== true);
				break;
			case "autoplay": {
				const enabled = player.options.autoplay !== true;
				player.setAutoplay(enabled);
				this.#showToast(`${this.#strings.autoplay}: ${enabled ? this.#strings.on : this.#strings.off}`);
				break;
			}
			case "autoplay-next": {
				const enabled = player.state.playlist?.autoAdvance !== true;
				player.setAutoAdvance(enabled);
				this.#showToast(`${this.#strings.autoplayNext}: ${enabled ? this.#strings.on : this.#strings.off}`);
				break;
			}
			case "chapter":
				player.seekToChapter(value);
				break;
			case "playlist-item":
				player.playPlaylistItem(Number(value)).catch(() => {});
				break;
			case "stats":
				this.#showMenu("stats", "settings");
				return;
			case "shortcuts":
				this.#showMenu("shortcuts", "settings");
				return;
			case "settings-view":
				this.#settingsView = value;
				this.#renderSettingsMenu(player.state);
				this.#syncMenuButtonState();
				return;
			case "settings-back":
				this.#settingsView = "main";
				this.#renderSettingsMenu(player.state);
				this.#syncMenuButtonState();
				return;
			case "menu-back":
				if (value === "close" || value.length === 0) this.#closeMenus();
				else this.#showMenu(value);
				return;
			case "share-copy":
				this.#closeMenus();
				this.#copyShareLink();
				return;
			case "share-embed":
				this.#closeMenus();
				this.#copyEmbedCode();
				return;
			case "share-native":
				this.#closeMenus();
				this.#shareNative();
				return;
		}
		if (!keepOpen) this.#closeMenus();
		else {
			const state = player.state;
			this.#renderMenus(state);
		}
	}
	#applyImageTransform() {
		const node = this.#player?.mediaElement;
		if (node === null || node === void 0 || !(node instanceof HTMLImageElement)) return;
		node.style.transform = imageTransformCss(this.#imageTransform);
		node.style.transformOrigin = "center center";
		node.dataset.upTransformed = String(isImageTransformed(this.#imageTransform));
	}
	#resetImageTransform() {
		this.#imageTransform = resetImageTransform();
		this.#applyImageTransform();
	}
	#download() {
		const source = this.#player?.source;
		const mediaUrl = this.#player?.mediaElement?.getAttribute("src") ?? "";
		const url = source?.url !== void 0 && source.url.length > 0 ? source.url : mediaUrl;
		if (url.length === 0) return;
		const options = this.#downloadOptions();
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = options?.filename ?? source?.title ?? "media";
		anchor.rel = "noopener";
		if (options?.saveAs !== false) anchor.target = "_blank";
		anchor.click();
	}
	#shareOptions() {
		const share = this.#uiOptions?.share;
		if (share === false) return null;
		return share ?? {};
	}
	#shareEnabled() {
		return this.#shareOptions()?.enabled !== false;
	}
	#posterUrl() {
		const share = this.#shareOptions();
		const configured = share?.thumbnail?.trim();
		if (configured !== void 0 && configured.length > 0) return configured;
		const embed = share?.embed;
		if (embed !== void 0 && embed !== false && typeof embed === "object") {
			const embedPoster = embed.poster?.trim();
			if (embedPoster !== void 0 && embedPoster.length > 0) return embedPoster;
		}
		return (this.#player?.options.poster ?? this.getAttribute("poster") ?? this.getAttribute("thumbnail") ?? "").trim();
	}
	#shareUrl() {
		const configured = this.#shareOptions()?.url?.trim();
		if (configured !== void 0 && configured.length > 0) return configured;
		return this.#player?.source?.url?.trim() ?? "";
	}
	#shareTitle() {
		const configured = this.#shareOptions()?.title?.trim();
		if (configured !== void 0 && configured.length > 0) return configured;
		const trimmed = ((this.#player?.source)?.title ?? this.#titleLabel?.textContent ?? this.getAttribute("label") ?? (typeof document === "undefined" ? "" : document.title)).trim();
		return trimmed.length > 0 ? trimmed : "Media";
	}
	#embedOptions() {
		const share = this.#shareOptions();
		if (share === null) return null;
		const embed = share.embed;
		if (embed === false) return null;
		if (embed === true || embed === void 0) return {};
		return embed.enabled === false ? null : embed;
	}
	#embedCode() {
		const options = this.#embedOptions();
		if (options === null) return null;
		const url = options.url?.trim() ?? this.#shareUrl();
		if (url.length === 0) return null;
		const title = options.title?.trim() ?? this.#shareTitle();
		const width = options.width ?? 640;
		const height = options.height ?? 360;
		const poster = options.poster?.trim() ?? this.#posterUrl();
		if ((options.mode ?? (poster.length > 0 ? "player" : "iframe")) === "player") {
			const attributes = [
				`src="${escapeHtmlAttribute(url)}"`,
				"controls=\"custom\"",
				`label="${escapeHtmlAttribute(title)}"`,
				`style="width:${escapeHtmlAttribute(String(width))}px;height:${escapeHtmlAttribute(String(height))}px"`
			];
			if (poster.length > 0) attributes.push(`poster="${escapeHtmlAttribute(poster)}"`);
			return [`<universal-player ${attributes.join(" ")}></universal-player>`, "<script type=\"module\" src=\"https://cdn.jsdelivr.net/npm/@codewithrajat/universal-player/dist/entries/index.js\"><\/script>"].join("\n");
		}
		return [
			"<iframe",
			` src="${escapeHtmlAttribute(url)}"`,
			` title="${escapeHtmlAttribute(title)}"`,
			` width="${escapeHtmlAttribute(String(width))}"`,
			` height="${escapeHtmlAttribute(String(height))}"`,
			" frameborder=\"0\"",
			" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\"",
			" referrerpolicy=\"strict-origin-when-cross-origin\"",
			" allowfullscreen",
			"></iframe>"
		].join("");
	}
	async #copyText(text, onCopied) {
		try {
			if (typeof navigator !== "undefined" && navigator.clipboard !== void 0) await navigator.clipboard.writeText(text);
			else this.#legacyCopy(text);
			onCopied?.();
			return true;
		} catch {
			try {
				this.#legacyCopy(text);
				onCopied?.();
				return true;
			} catch {
				return false;
			}
		}
	}
	async #copyShareLink() {
		const url = this.#shareUrl();
		if (url.length === 0) return;
		if (!await this.#copyText(url, () => {
			this.#showToast(this.#strings.copied);
		})) this.#showToast(url);
	}
	async #copyEmbedCode() {
		const code = this.#embedCode();
		if (code === null) return;
		if (!await this.#copyText(code, () => {
			this.#showToast(this.#strings.embedCopied ?? "Embed code copied");
		})) this.#showToast(code);
	}
	#legacyCopy(text) {
		const area = document.createElement("textarea");
		area.value = text;
		area.setAttribute("readonly", "");
		area.style.position = "fixed";
		area.style.top = "-9999px";
		area.style.opacity = "0";
		document.body.append(area);
		area.select();
		const copied = typeof document.execCommand === "function" ? document.execCommand("copy") : false;
		area.remove();
		if (!copied) throw new Error("Copy command was rejected.");
	}
	async #shareNative() {
		const url = this.#shareUrl();
		if (url.length === 0 || typeof navigator.share !== "function") return;
		try {
			await navigator.share({
				title: this.#shareTitle(),
				url
			});
		} catch (failure) {
			if (failure instanceof DOMException && failure.name === "AbortError") return;
			await this.#copyShareLink();
		}
	}
	#remotePlaybackAvailable() {
		const media = this.#player?.mediaElement;
		return typeof media?.remote?.prompt === "function" || typeof media?.webkitShowPlaybackTargetPicker === "function";
	}
	#setupCastAvailability() {
		const media = this.#player?.mediaElement;
		if (media === null || media === void 0 || typeof media.remote?.watchAvailability !== "function") return;
		if (this.#castWatchMedia === media) return;
		this.#stopCastWatch();
		this.#castWatchMedia = media;
		try {
			media.remote.watchAvailability((available) => {
				if (!this.#built) return;
				this.#castAvailable = available;
				const player = this.#player;
				if (player !== null) this.#render(player.state);
			}).then((id) => {
				if (this.#castWatchMedia === media) this.#castWatchId = id;
				else media.remote?.cancelWatchAvailability?.(id);
			}).catch(() => {});
		} catch {}
	}
	#stopCastWatch() {
		const media = this.#castWatchMedia;
		if (media !== null && this.#castWatchId !== null) media.remote?.cancelWatchAvailability?.(this.#castWatchId);
		this.#castWatchId = null;
		this.#castWatchMedia = null;
		this.#castAvailable = null;
	}
	async #promptRemotePlayback() {
		const media = this.#player?.mediaElement;
		if (this.#castAvailable === false) {
			this.#showToast(this.#strings.castUnavailable ?? "No cast or AirPlay devices are available.");
			return;
		}
		if (typeof media?.remote?.prompt === "function") try {
			await media.remote.prompt();
			if (media.remote.state === "connected") this.#showToast(this.#strings.cast ?? "Cast");
			else this.#showToast(this.#strings.castPrompt ?? "Choose a cast device from your browser.");
			return;
		} catch (failure) {
			if (failure instanceof DOMException && failure.name === "AbortError") return;
			this.#showToast(this.#strings.castUnavailable ?? "No cast or AirPlay devices are available.");
			return;
		}
		if (typeof media?.webkitShowPlaybackTargetPicker === "function") try {
			media.webkitShowPlaybackTargetPicker();
			return;
		} catch {}
		if (media !== null && media !== void 0) this.#showToast(this.#strings.castUnavailable ?? "No cast or AirPlay devices are available.");
	}
	#updatePreview(event) {
		const wrap = this.#seekWrap;
		const image = this.#previewImage;
		const label = this.#previewTime;
		const preview = this.#preview;
		const player = this.#player;
		if (wrap === null || image === null || label === null || preview === null || player === null || this.#uiOptions?.showPreview === false || this.#controlAllowed("seek") === false) return;
		const track = player.thumbnails;
		const state = player.state;
		if (track === null || state.duration <= 0) {
			setHidden(preview, true);
			return;
		}
		const rect = wrap.getBoundingClientRect();
		if (rect.width <= 0) return;
		const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
		const time = ratio * state.duration;
		const cue = findThumbnailAt(track, time);
		if (cue === null) {
			setHidden(preview, true);
			return;
		}
		image.src = cue.url;
		label.textContent = formatTimecode(time, state.duration);
		preview.style.left = `${ratio * 100}%`;
		preview.hidden = false;
	}
	#showControls() {
		if (this.#idleTimer !== null) {
			clearTimeout(this.#idleTimer);
			this.#idleTimer = null;
		}
		const root = this.#root;
		if (root !== null) root.dataset.upIdle = "false";
	}
	#scheduleIdle() {
		if (this.#idleTimer !== null) clearTimeout(this.#idleTimer);
		if (this.#player?.state.playing !== true || !this.#autoHideControls()) {
			this.#showControls();
			this.#idleTimer = null;
			return;
		}
		this.#idleTimer = setTimeout(() => {
			this.#idleTimer = null;
			if (this.#root !== null && this.#menuOpen === null) this.#root.dataset.upIdle = "true";
		}, this.#idleDelay());
	}
	#showToast(text) {
		const toast = this.#toast;
		if (toast === null) return;
		toast.textContent = text;
		toast.hidden = false;
		if (this.#toastTimer !== null) clearTimeout(this.#toastTimer);
		this.#toastTimer = setTimeout(() => {
			this.#toastTimer = null;
			toast.hidden = true;
		}, 2500);
	}
	#applyAttribute(name, value) {
		const player = this.#player;
		if (player === null) return;
		switch (name) {
			case "src":
				if (value !== null && value.length > 0) player.load(value).catch(() => {});
				return;
			case "controls": {
				const mode = value === "native" ? "native" : "custom";
				player.setControls(mode);
				if (this.#root !== null) this.#root.dataset.upControls = mode;
				return;
			}
			case "theme": {
				const theme = value === "light" || value === "dark" ? value : "system";
				player.setTheme(theme);
				if (this.#root !== null) this.#root.dataset.upTheme = theme;
				return;
			}
			case "accent-color":
				this.#applyUIOptions();
				return;
			case "ui":
				this.#uiOptions = this.#jsonAttribute("ui");
				this.#applyUIOptions();
				return;
			case "locale": {
				const locale = value ?? "en";
				this.#strings = getStrings(locale, this.#stringsOverride);
				this.#chapterSignature = "";
				player.setLocale(locale);
				this.#render(player.state);
				return;
			}
			case "muted":
				player.setMuted(value !== null);
				return;
			case "loop":
				player.setLoop(value !== null);
				return;
			case "autoplay":
				player.setAutoplay(value !== null);
				return;
			case "volume": {
				const volume = this.#numberAttribute("volume");
				if (volume !== null) player.setVolume(volume);
				return;
			}
			case "rate": {
				const rate = this.#numberAttribute("rate");
				if (rate !== null) player.setPlaybackRate(rate);
				return;
			}
			case "poster":
			case "thumbnail": {
				const media = player.mediaElement;
				if (typeof HTMLVideoElement !== "undefined" && media instanceof HTMLVideoElement) media.poster = value ?? "";
				this.#renderAudioVisual(player.state.kind ?? "video");
				return;
			}
			case "label":
				if (this.#root !== null) this.#root.setAttribute("aria-label", value ?? "Media player");
				return;
			case "shadow":
				this.#unmount();
				this.#mount();
				return;
			case "inject-styles":
				if (value !== null && this.shadowRoot === null) injectStylesOnce(styles_default);
				return;
			case "chapters": {
				const chapters = this.#jsonAttribute("chapters") ?? [];
				player.setChapters(chapters);
				return;
			}
			case "thumbnails":
				player.setThumbnails(this.#jsonAttribute("thumbnails"));
				return;
			case "survey":
				player.setSurvey(this.#jsonAttribute("survey"));
				return;
			case "playlist":
				player.setPlaylist(this.#jsonAttribute("playlist"));
				return;
			case "captions": {
				const captions = this.#jsonAttribute("captions");
				if (captions !== null) player.setCaptions({
					...captions,
					style: { ...captions.style }
				});
				this.#reloadSource();
				return;
			}
			case "image":
				this.#imageOptions = this.#jsonAttribute("image");
				this.#render(player.state);
				return;
			case "type":
			case "preload":
			case "crossorigin":
			case "playsinline":
			case "start-time":
				this.#reloadSource();
				return;
			default: return;
		}
	}
	#reloadSource() {
		const src = this.getAttribute("src");
		if (src !== null && src.length > 0) this.#player?.load(src).catch(() => {});
	}
	#togglePlay() {
		const player = this.#player;
		if (player === null) return;
		if (player.state.playing) {
			player.pause();
			return;
		}
		player.play().catch(() => {});
	}
	#togglePip() {
		const player = this.#player;
		if (player === null) return;
		if (document.pictureInPictureElement != null) {
			player.exitPictureInPicture().catch(() => {});
			return;
		}
		player.requestPictureInPicture().catch(() => {});
	}
	async #toggleFullscreen() {
		if (document.fullscreenElement != null) {
			try {
				await document.exitFullscreen();
			} catch {}
			return;
		}
		const media = this.#player?.mediaElement;
		const attempts = [
			() => this.requestFullscreen(),
			() => this.#root?.requestFullscreen(),
			() => {
				if (media !== null && media !== void 0) {
					if (typeof media.webkitEnterFullscreen === "function") {
						media.webkitEnterFullscreen();
						return;
					}
					if (typeof media.requestFullscreen === "function") return media.requestFullscreen();
				}
				throw new Error("Fullscreen is not supported.");
			}
		];
		for (const attempt of attempts) try {
			await attempt();
			return;
		} catch {}
		this.#showToast(this.#strings.fullscreenUnavailable ?? "Fullscreen is not available in this environment.");
	}
	#onDocumentPointerDown = (event) => {
		if (this.#menuOpen === null) return;
		const root = this.#root;
		if (root === null) return;
		if (event.composedPath().includes(root)) return;
		this.#closeMenus();
	};
	#onKeydown = (event) => {
		if (this.#player?.state.surveyOpen === true) return;
		if (!this.#booleanAttribute("keyboard", true)) return;
		const action = shortcutForEvent(event, {
			seekStep: this.#numberAttribute("seek-step") ?? 5,
			volumeStep: this.#numberAttribute("volume-step") ?? .1
		});
		if (action === null) return;
		const player = this.#player;
		if (player === null) return;
		if (event.key === "Escape") {
			if (this.#menuOpen !== null) {
				event.preventDefault();
				this.#closeMenus();
			}
			return;
		}
		event.preventDefault();
		switch (action.type) {
			case "toggle-play":
				this.#togglePlay();
				break;
			case "toggle-mute":
				player.toggleMute();
				break;
			case "toggle-fullscreen":
				this.#toggleFullscreen();
				break;
			case "toggle-captions":
				this.#toggleSubtitles();
				break;
			case "toggle-pip":
				this.#togglePip();
				break;
			case "toggle-settings":
				this.#toggleMenu("settings");
				break;
			case "open-quality":
				this.#openSettingsView("quality");
				break;
			case "open-audio":
				this.#openSettingsView("audio");
				break;
			case "open-sleep":
				this.#openSettingsView("sleep");
				break;
			case "toggle-stats":
				this.#toggleMenu("stats");
				break;
			case "quality-relative":
				this.#stepQuality(action.delta);
				break;
			case "toggle-shortcuts":
				this.#toggleMenu("shortcuts");
				break;
			case "toggle-loop":
				player.setLoop(player.options.loop !== true);
				break;
			case "seek-relative":
				player.seek(player.state.currentTime + action.delta);
				break;
			case "seek-percent":
				player.seek(player.state.duration * action.percent);
				break;
			case "seek-start":
				player.seek(0);
				break;
			case "seek-end":
				player.seek(player.state.duration);
				break;
			case "volume-relative":
				player.setVolume(player.state.volume + action.delta);
				break;
			case "speed-relative": {
				const speed = this.#speedOptions();
				if (speed === false || speed.keyboard === false) break;
				const rates = this.#speedRates();
				const current = player.state.playbackRate;
				const index = rates.findIndex((rate) => rate >= current);
				const next = rates[action.delta > 0 ? Math.min(rates.length - 1, index < 0 ? rates.length - 1 : index + 1) : Math.max(0, index < 0 ? 0 : index - 1)];
				player.setPlaybackRate(clampPlaybackRate(next ?? current + action.delta));
				break;
			}
			case "next-item":
				player.next().catch(() => {});
				break;
			case "previous-item":
				player.previous().catch(() => {});
				break;
			case "escape": this.#closeMenus();
		}
	};
	#button(action, icon, label) {
		const button = element("button", `up-button up-${action}`);
		button.type = "button";
		button.dataset.upAction = action;
		button.append(createIcon(icon));
		button.title = label;
		button.setAttribute("aria-label", label);
		button.setAttribute("part", `${action}-button`);
		if (action === "settings" || action === "chapters" || action === "playlist" || action === "share") {
			button.setAttribute("aria-haspopup", "menu");
			button.setAttribute("aria-expanded", "false");
		}
		return button;
	}
	#createRange(className, min, max, step, label) {
		const input = element("input", `up-range ${className}`);
		input.type = "range";
		input.min = String(min);
		input.max = String(max);
		input.step = String(step);
		input.value = String(min);
		input.setAttribute("aria-label", label);
		input.setAttribute("part", "range");
		return input;
	}
	#showFatal(error) {
		if (this.#errorText !== null && this.#error !== null) {
			this.#error.hidden = false;
			this.#errorText.textContent = error instanceof Error ? error.message : this.#strings.error;
		}
	}
	#applyUIOptions() {
		const root = this.#root;
		if (root === null) return;
		this.#applyAccentColor();
		this.#applyThemeTokens(this.#uiOptions?.theme);
		this.#applyControlOrder(this.#uiOptions?.order);
		this.#timeMode = this.#uiOptions?.time?.mode === "remaining" ? "remaining" : "elapsed";
		this.#speedViewBuilt = false;
		root.dataset.upAutoHide = String(this.#autoHideControls());
		const state = this.#player?.state;
		if (state !== void 0) this.#render(state);
	}
	#applyAccentColor() {
		const root = this.#root;
		if (root === null) return;
		const accent = this.getAttribute("accent-color")?.trim();
		if (accent !== void 0 && accent.length > 0) {
			root.style.setProperty("--up-color-accent", accent);
			root.style.setProperty("--up-color-accent-contrast", contrastColor(accent));
		} else {
			root.style.removeProperty("--up-color-accent");
			root.style.removeProperty("--up-color-accent-contrast");
		}
	}
	#applyThemeTokens(theme) {
		const root = this.#root;
		if (root === null || theme === void 0) return;
		if (theme.colors !== void 0) {
			const colors = theme.colors;
			for (const [key, property] of Object.entries({
				accent: "--up-color-accent",
				accentContrast: "--up-color-accent-contrast",
				background: "--up-color-bg",
				surface: "--up-color-surface",
				foreground: "--up-color-fg",
				muted: "--up-color-muted",
				border: "--up-color-border",
				overlay: "--up-color-overlay"
			})) {
				const value = colors[key];
				if (value !== void 0) root.style.setProperty(property, value);
			}
			if (colors.accent !== void 0 && colors.accentContrast === void 0) root.style.setProperty("--up-color-accent-contrast", contrastColor(colors.accent));
		}
		if (theme.variables !== void 0) for (const [property, value] of Object.entries(theme.variables)) root.style.setProperty(property, value);
		if (theme.radius !== void 0) root.style.setProperty("--up-radius", theme.radius);
		if (theme.controlRadius !== void 0) root.style.setProperty("--up-control-radius", theme.controlRadius);
		if (theme.fontFamily !== void 0) root.style.setProperty("--up-font-family", theme.fontFamily);
		if (theme.menuBackground !== void 0) root.style.setProperty("--up-color-menu", theme.menuBackground);
		if (theme.menuBlur !== void 0) root.style.setProperty("--up-menu-blur", theme.menuBlur);
	}
	#applyControlOrder(order) {
		if (order === void 0 || order.length === 0) return;
		const positions = /* @__PURE__ */ new Map();
		order.forEach((control, index) => positions.set(control, index));
		const apply = (node, controls, fallback) => {
			if (node === null) return;
			let position = Number.POSITIVE_INFINITY;
			for (const control of controls) {
				const value = positions.get(control);
				if (value !== void 0 && value < position) position = value;
			}
			node.style.order = String(Number.isFinite(position) ? position : fallback);
		};
		const right = this.#root?.querySelector(".up-right-controls") ?? null;
		const rightControls = [
			"playlist",
			"chapters",
			"captions",
			"settings",
			"live",
			"share",
			"download",
			"cast",
			"pip",
			"fullscreen"
		];
		apply(this.#playGroup, [
			"play",
			"previous",
			"next"
		], 0);
		apply(this.#volumeGroup, ["mute", "volume"], 1);
		apply(this.#timeLabel, ["time"], 2);
		apply(this.#chapterLabel, ["chapterLabel"], 3);
		apply(this.#imageGroup, [
			"zoom",
			"rotate",
			"download"
		], 900);
		apply(right, rightControls, 1e3);
		const applyChildren = (node, controls) => {
			if (node === null) return;
			for (const control of controls) {
				const child = node.querySelector(`[data-up-action="${control}"]`);
				const position = positions.get(control);
				if (child !== null && position !== void 0) child.style.order = String(position);
			}
		};
		applyChildren(this.#playGroup, [
			"play",
			"previous",
			"next"
		]);
		applyChildren(this.#volumeGroup, ["mute"]);
		applyChildren(this.#imageGroup, [
			"zoom",
			"rotate",
			"download"
		]);
		applyChildren(right, rightControls);
		const spacer = this.#root?.querySelector(".up-spacer") ?? null;
		if (spacer !== null) {
			const firstRight = Math.min(...rightControls.map((control) => positions.get(control) ?? Number.POSITIVE_INFINITY));
			spacer.style.order = String(Number.isFinite(firstRight) ? Math.max(0, firstRight - .1) : 999);
		}
	}
	#controlAllowed(control) {
		const ui = this.#uiOptions;
		if (ui === null) return true;
		if (ui.hide?.includes(control) === true) return false;
		const controls = ui.controls;
		if (controls === void 0) return true;
		if (Array.isArray(controls)) return controls.includes(control);
		return controls[control] !== false;
	}
	#settingsSection(section) {
		const settings = this.#uiOptions?.settings;
		if (settings === false) return false;
		return settings?.[section] !== false;
	}
	#speedOptions() {
		const speed = this.#uiOptions?.speed;
		if (speed === false) return false;
		return speed ?? {};
	}
	#speedRates() {
		const speed = this.#speedOptions();
		if (speed === false) return [];
		return speed.rates !== void 0 && speed.rates.length > 0 ? speed.rates : PLAYBACK_RATES;
	}
	#downloadOptions() {
		const download = this.#uiOptions?.download;
		if (download === false) return null;
		if (download === true) return { enabled: true };
		if (download === void 0) return null;
		return download.enabled === false ? null : download;
	}
	#downloadAllowed(kind) {
		const download = this.#downloadOptions();
		if (download === null) return false;
		return download.kinds === void 0 || download.kinds.includes(kind);
	}
	#gestureOptions() {
		const gestures = this.#uiOptions?.gestures;
		if (gestures === false || gestures === void 0 || gestures.enabled !== true) return null;
		return gestures;
	}
	#autoHideControls() {
		return this.#uiOptions?.autoHideControls ?? this.#booleanAttribute("auto-hide-controls", true);
	}
	#idleDelay() {
		return Math.max(500, this.#uiOptions?.idleDelay ?? 3e3);
	}
	#theme() {
		const value = this.getAttribute("theme");
		return value === "light" || value === "dark" ? value : "system";
	}
	#controlsMode() {
		return this.getAttribute("controls") === "native" ? "native" : "custom";
	}
	#locale() {
		return this.getAttribute("locale") ?? "en";
	}
	#numberAttribute(name) {
		const raw = this.getAttribute(name);
		if (raw === null || raw.trim().length === 0) return null;
		const value = Number(raw);
		return Number.isFinite(value) ? value : null;
	}
	#booleanAttribute(name, fallback) {
		const raw = this.getAttribute(name);
		if (raw === null) return fallback;
		return raw !== "false";
	}
	#jsonAttribute(name) {
		const raw = this.getAttribute(name);
		if (raw === null || raw.trim().length === 0) return null;
		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}
};
/**
* Registers `<universal-player>` once.
*
* Returns false when the Custom Elements API is unavailable.
*/
function defineUniversalPlayerElement(tagName = UNIVERSAL_PLAYER_TAG) {
	if (typeof customElements === "undefined") return false;
	if (customElements.get(tagName) !== void 0) return true;
	const constructor = tagName === "universal-player" ? UniversalPlayerElement : class extends UniversalPlayerElement {};
	customElements.define(tagName, constructor);
	return true;
}
export { UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement };

//# sourceMappingURL=element.js.map