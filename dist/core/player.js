import { findChapterAt } from "../features/chapters/chapters.js";
import { createSurveyAnswers, createSurveyStore, createSurveySubmission, emptySurveyAnswer, normalizeSurvey, surveyTriggerTime, validateSurveyAnswers } from "../features/survey/survey.js";
import { capabilitiesForKind } from "./engine.js";
import { createPlayerError, toPlayerError } from "./errors.js";
import { PlayerEventBus } from "./events.js";
import { createEngine } from "./engines.js";
import { normalizeSource, revokeSource } from "./source.js";
import { createInitialState } from "./state.js";
import { clamp, finiteOr } from "./utils.js";
// src/core/player.ts
function isElement(value) {
	return typeof HTMLElement !== "undefined" && value instanceof HTMLElement;
}
/**
* Framework-agnostic media player.
*
* The player owns one engine at a time, exposes a single immutable state
* snapshot, and emits three equivalent event styles:
*
* - standard DOM events (`player.addEventListener("play", ...)`)
* - typed subscriptions (`player.on("play", ...)`)
* - observable streams (`player.observe("play").subscribe(...)`)
*/
var UniversalPlayer = class extends EventTarget {
	#bus = new PlayerEventBus();
	#root;
	#documentController = new AbortController();
	#options;
	#source = null;
	#engine = null;
	#state = createInitialState();
	#destroyed = false;
	#loadSequence = 0;
	#lastResumeSave = 0;
	#playlist = [];
	#playlistIndex = -1;
	#playlistOptions = null;
	#playlistTimer = null;
	#imageTimer = null;
	#pendingAutoAdvance = false;
	#surveySource = null;
	#survey = null;
	#surveyStorage = null;
	#surveyShownForSource = false;
	#surveyAttempt = 0;
	#lastActiveChapterId = null;
	#chaptersOverride = null;
	#thumbnailsOverride = void 0;
	constructor(options) {
		super();
		if (!isElement(options.container)) throw createPlayerError("The player requires a container element.", {
			code: "invalid-argument",
			details: { field: "container" }
		});
		this.#options = { ...options };
		this.#root = document.createElement("div");
		this.#root.className = "up-stage";
		this.#root.dataset.upStage = "";
		this.#root.setAttribute("part", "stage");
		options.container.append(this.#root);
		this.#state = createInitialState(options);
		if (options.survey !== void 0) {
			this.#surveySource = options.survey;
			if (typeof options.survey !== "function") {
				this.#survey = normalizeSurvey(options.survey);
				this.#state = {
					...this.#state,
					survey: this.#survey
				};
			}
		}
		if (options.playlist !== void 0) this.setPlaylist(options.playlist);
		document.addEventListener("fullscreenchange", () => {
			this.#emitEvent("fullscreenchange", { fullscreen: document.fullscreenElement != null });
		}, { signal: this.#documentController.signal });
		const initial = options.source ?? (options.playlist === void 0 ? void 0 : options.playlist.items[options.playlist.startIndex ?? 0]?.source);
		if (initial !== void 0) this.load(initial).catch(() => {});
	}
	/** Whether `destroy()` has run. */
	get destroyed() {
		return this.#destroyed;
	}
	/** Immutable state snapshot. */
	get state() {
		return this.#state;
	}
	/** Current construction options. */
	get options() {
		return this.#options;
	}
	/** The normalized source, or null before the first load. */
	get source() {
		return this.#source;
	}
	/** The currently active survey config, or null. */
	get activeSurvey() {
		return this.#survey;
	}
	/** A snapshot of the playlist position, or null without a playlist. */
	get playlistStatus() {
		return this.#state.playlist;
	}
	/** The current playlist items. */
	get playlistItems() {
		return [...this.#playlist];
	}
	/** The current playlist item, or null. */
	get playlistItem() {
		return this.#playlist[this.#playlistIndex] ?? null;
	}
	/** Cancels a scheduled auto-advance. */
	cancelAutoAdvance() {
		this.#clearPlaylistTimer();
		this.#pendingAutoAdvance = false;
	}
	/** The underlying media element, when the engine exposes one. */
	get mediaElement() {
		return this.#engine?.element ?? null;
	}
	/** Capabilities of the active engine, or null before a load. */
	get capabilities() {
		return this.#engine?.capabilities ?? null;
	}
	/** Subscribes to a typed event. */
	on(type, listener) {
		return this.#bus.on(type, listener);
	}
	/** Subscribes to the next occurrence of a typed event. */
	once(type, listener) {
		return this.#bus.once(type, listener);
	}
	/** Returns an observable stream for a typed event. */
	observe(type) {
		return this.#bus.observe(type);
	}
	/**
	* Loads or replaces the current source.
	*
	* A newer `load()` call cancels an older in-flight load. Errors are emitted
	* as an `error` event and rethrown to the caller.
	*/
	async load(input) {
		this.#assertAlive();
		if (Array.isArray(input)) {
			const list = input;
			const first = list[0];
			if (first === void 0) throw createPlayerError("The source list must not be empty.", { code: "invalid-argument" });
			this.setPlaylist({
				items: list.map((source) => ({ source })),
				autoAdvance: false
			});
			await this.load(first);
			return;
		}
		const sequence = this.#loadSequence += 1;
		const next = normalizeSource(input);
		const previous = this.#source;
		this.#destroyEngine();
		this.#closeSurvey("closed", false);
		this.#pendingAutoAdvance = false;
		this.#clearPlaylistTimer();
		this.#clearImageTimer();
		this.#surveyShownForSource = false;
		this.#surveyAttempt = 0;
		this.#lastActiveChapterId = null;
		this.#chaptersOverride = null;
		this.#thumbnailsOverride = void 0;
		if (previous?.objectUrl === true && previous.url !== next.url) revokeSource(previous);
		this.#source = next;
		const sourceSurvey = next.source.survey;
		if (sourceSurvey !== void 0) {
			this.#surveySource = sourceSurvey;
			this.#survey = typeof sourceSurvey === "function" ? null : normalizeSurvey(sourceSurvey);
		} else if (this.#options.survey === void 0) {
			this.#surveySource = null;
			this.#survey = null;
		}
		this.#emitEvent("loadstart", {
			source: next.source,
			kind: next.kind
		});
		const emit = (type, detail) => {
			this.#emitEvent(type, detail);
		};
		try {
			const engine = await createEngine({
				host: this.#root,
				source: next,
				options: this.#options,
				emit
			});
			if (sequence !== this.#loadSequence) {
				engine.destroy();
				return;
			}
			this.#engine = engine;
			await engine.load();
			if (sequence !== this.#loadSequence) {
				engine.destroy();
				this.#engine = null;
				return;
			}
			this.#applyInitialOptions(engine);
			if (this.#state.status === "loading") this.#setState({
				status: "ready",
				capabilities: engine.capabilities,
				duration: engine.getDuration(),
				live: this.#state.live,
				qualities: engine.getQualities?.() ?? this.#options.qualities ?? [],
				textTracks: engine.getTextTracks?.() ?? this.#options.textTracks ?? [],
				audioTracks: engine.getAudioTracks?.() ?? this.#options.audioTracks ?? [],
				chapters: this.#chapters()
			});
			if (this.#options.autoplay === true) await this.play().catch(() => {});
		} catch (error) {
			if (sequence !== this.#loadSequence) return;
			this.#destroyEngine();
			const failure = toPlayerError(error);
			this.#emitEvent("error", { error: failure });
			throw failure;
		}
	}
	/** Starts playback. */
	async play() {
		this.#assertAlive();
		if (this.#engine === null) throw createPlayerError("No media is loaded.", { code: "invalid-state" });
		if (this.#state.ended) {
			this.#engine.seek(0);
			this.#setState({
				currentTime: 0,
				ended: false
			}, false);
		}
		await this.#engine.play();
	}
	/** Pauses playback. */
	pause() {
		this.#assertAlive();
		this.#engine?.pause();
	}
	/** Seeks to an absolute time in seconds. */
	seek(time) {
		this.#assertAlive();
		const next = Math.max(0, finiteOr(time, 0));
		this.#engine?.seek(next);
		this.#setState({
			currentTime: next,
			seeking: true
		}, false);
	}
	/** Sets the volume in the inclusive 0–1 range. */
	setVolume(volume) {
		this.#assertAlive();
		const next = clamp(volume, 0, 1);
		this.#engine?.setVolume(next);
		this.#setState({ volume: next }, false);
	}
	/** Mutes or unmutes playback. */
	setMuted(muted) {
		this.#assertAlive();
		this.#engine?.setMuted(muted);
		this.#setState({ muted }, false);
	}
	/** Toggles muted state. */
	toggleMute() {
		this.setMuted(!this.#state.muted);
	}
	/** Sets the playback rate in the inclusive 0.25–4 range. */
	setPlaybackRate(rate) {
		this.#assertAlive();
		const next = clamp(rate, .25, 4);
		this.#engine?.setPlaybackRate(next);
		this.#setState({ playbackRate: next }, false);
	}
	/** Selects a quality level, or null for automatic selection. */
	setQuality(quality) {
		this.#assertAlive();
		this.#engine?.setQuality?.(quality);
		this.#emitEvent("qualitychange", { quality });
	}
	/** Selects a text track, or null to disable captions. */
	setTextTrack(id) {
		this.#assertAlive();
		this.#engine?.setTextTrack?.(id);
		this.#saveCaptionPreference(id);
		const tracks = this.#engine?.getTextTracks?.() ?? this.#state.textTracks;
		const track = id === null ? null : tracks.find((entry) => entry.id === id) ?? null;
		this.#emitEvent("texttrackchange", { track });
	}
	/** Selects an audio track, or null to let the browser decide. */
	setAudioTrack(id) {
		this.#assertAlive();
		this.#engine?.setAudioTrack?.(id);
		const tracks = this.#engine?.getAudioTracks?.() ?? this.#state.audioTracks;
		const track = id === null ? null : tracks.find((entry) => entry.id === id) ?? null;
		this.#emitEvent("audiotrackchange", { track });
	}
	/** Enables or disables captions. */
	setCaptionsEnabled(enabled) {
		this.#assertAlive();
		if (!enabled) {
			this.setTextTrack(null);
			return;
		}
		const { textTrack, textTracks } = this.#state;
		const preferred = this.#options.captions?.defaultTrack ?? textTrack?.id ?? textTracks[0]?.id ?? null;
		if (preferred !== null) this.setTextTrack(preferred);
	}
	/** Cycles through off and the available caption tracks. */
	toggleCaptions() {
		this.#assertAlive();
		const { textTrack, textTracks } = this.#state;
		const current = textTrack?.id ?? null;
		if (textTracks.length === 0) {
			this.setTextTrack(null);
			return;
		}
		if (current === null) {
			this.setTextTrack(textTracks[0]?.id ?? null);
			return;
		}
		const index = textTracks.findIndex((track) => track.id === current);
		const next = index < 0 ? 0 : index + 1;
		this.setTextTrack(next >= textTracks.length ? null : textTracks[next]?.id ?? null);
	}
	/** Updates caption styling without reloading the media. */
	setCaptionStyle(style) {
		this.#assertAlive();
		this.#options = {
			...this.#options,
			captions: {
				...this.#options.captions,
				style: {
					...this.#options.captions?.style,
					...style
				}
			}
		};
	}
	/** Replaces the caption configuration (tracks, default track, style). */
	setCaptions(options) {
		this.#assertAlive();
		this.#options = {
			...this.#options,
			captions: options
		};
		if (options.enabled === false) {
			this.setTextTrack(null);
			return;
		}
		if (options.defaultTrack !== void 0 && options.defaultTrack !== null) this.setTextTrack(options.defaultTrack);
	}
	/** Replaces the chapter list. */
	setChapters(chapters) {
		this.#assertAlive();
		this.#chaptersOverride = chapters;
		this.#options = {
			...this.#options,
			chapters
		};
		this.#applyChapters(chapters, this.#state.currentTime);
	}
	/** Returns the chapter active at the current position. */
	get currentChapter() {
		return findChapterAt(this.#chapters(), this.#state.currentTime);
	}
	/** Seeks to a chapter by id or object. */
	seekToChapter(chapter) {
		this.#assertAlive();
		const target = typeof chapter === "string" ? this.#chapters().find((entry) => entry.id === chapter) : chapter;
		if (target !== void 0) {
			this.seek(target.startTime);
			this.#applyChapters(this.#chapters(), target.startTime);
		}
	}
	/** Updates the seek-bar thumbnail track. */
	setThumbnails(thumbnails) {
		this.#assertAlive();
		this.#thumbnailsOverride = thumbnails;
		if (thumbnails === null) {
			const { thumbnails: _thumbnails, ...rest } = this.#options;
			this.#options = rest;
			return;
		}
		this.#options = {
			...this.#options,
			thumbnails
		};
	}
	/** Current thumbnail track, or null. */
	get thumbnails() {
		if (this.#thumbnailsOverride !== void 0) return this.#thumbnailsOverride;
		return this.#options.thumbnails ?? this.#source?.source.thumbnails ?? null;
	}
	/** Enables or disables looping. */
	setLoop(loop) {
		this.#assertAlive();
		this.#options = {
			...this.#options,
			loop
		};
		const media = this.#engine?.element;
		if (typeof HTMLMediaElement !== "undefined" && media instanceof HTMLMediaElement) media.loop = loop;
	}
	/** Enables or disables autoplay for subsequent loads. */
	setAutoplay(autoplay) {
		this.#assertAlive();
		this.#options = {
			...this.#options,
			autoplay
		};
		const media = this.#engine?.element;
		if (typeof HTMLMediaElement !== "undefined" && media instanceof HTMLMediaElement) media.autoplay = autoplay;
	}
	/** Enables or disables automatic playlist advancement. */
	setAutoAdvance(autoAdvance) {
		this.#assertAlive();
		if (this.#playlistOptions === null) return;
		this.#playlistOptions = {
			...this.#playlistOptions,
			autoAdvance
		};
		if (this.#options.playlist !== void 0) this.#options = {
			...this.#options,
			playlist: {
				...this.#options.playlist,
				autoAdvance
			}
		};
		const status = this.#playlistStatus();
		this.#setState({ playlist: status });
		this.#emitEvent("playlistchange", {
			index: this.#playlistIndex,
			item: this.#playlist[this.#playlistIndex] ?? null,
			status
		});
	}
	/** Replaces the survey config or clears it. */
	setSurvey(survey) {
		this.#assertAlive();
		this.#closeSurvey("closed", false);
		this.#surveySource = survey;
		this.#survey = survey !== null && typeof survey !== "function" ? normalizeSurvey(survey) : null;
		this.#surveyShownForSource = false;
		this.#surveyAttempt = 0;
		this.#setState({
			survey: this.#survey,
			surveyOpen: false
		});
	}
	/**
	* Opens the configured survey. Resolves to true when it was opened (false
	* when there is no survey or it was already completed in "once" mode).
	*/
	async openSurvey(force = false) {
		this.#assertAlive();
		if (this.#state.surveyOpen) return true;
		const survey = await this.#resolveSurvey();
		if (survey === null) return false;
		const store = createSurveyStore(survey, this.#source?.url ?? null);
		this.#surveyStorage = store;
		const maxAttempts = survey.maxAttempts ?? Number.POSITIVE_INFINITY;
		if (this.#surveyAttempt >= maxAttempts) return false;
		if (!force && survey.once !== false && store.wasShown()) return false;
		this.#surveyAttempt += 1;
		this.#surveyShownForSource = true;
		this.#setState({
			survey,
			surveyOpen: true
		});
		this.#emitEvent("surveyopen", { survey });
		return true;
	}
	/** Reopens a survey when `allowRetake` is enabled. */
	async retakeSurvey() {
		this.#assertAlive();
		const survey = await this.#resolveSurvey();
		if (survey === null || survey.allowRetake !== true) return false;
		this.#surveyShownForSource = false;
		this.#surveyStorage?.clear();
		const opened = await this.openSurvey(true);
		if (opened) try {
			Promise.resolve(survey.onRetake?.(survey, this.#surveyAttempt)).catch(() => {});
		} catch {}
		return opened;
	}
	/** Submits survey answers. Throws when required validation fails. */
	submitSurvey(answers) {
		this.#assertAlive();
		const survey = this.#survey;
		if (survey === null) throw createPlayerError("No survey is active.", { code: "invalid-state" });
		const normalized = this.#normalizeAnswers(survey, answers);
		const issues = validateSurveyAnswers(survey, normalized);
		if (issues.length > 0) throw createPlayerError("The survey answers are incomplete.", {
			code: "invalid-argument",
			details: { issues }
		});
		const result = createSurveySubmission(survey, normalized, {
			source: this.#source?.url ?? null,
			position: this.#state.currentTime,
			duration: this.#state.duration,
			attempt: this.#surveyAttempt
		});
		this.#completeSurvey(survey, result, "submitted");
		return result;
	}
	/** Skips the active survey. */
	skipSurvey() {
		this.#assertAlive();
		const survey = this.#survey;
		if (survey === null || !this.#state.surveyOpen || survey.allowSkip === false) return null;
		const result = createSurveySubmission(survey, this.#defaultAnswers(survey), {
			source: this.#source?.url ?? null,
			position: this.#state.currentTime,
			duration: this.#state.duration,
			skipped: true,
			attempt: this.#surveyAttempt
		});
		this.#completeSurvey(survey, result, "skipped");
		return result;
	}
	/** Closes the survey overlay without submitting. */
	closeSurvey() {
		this.#assertAlive();
		if (this.#survey?.required === true) return;
		this.#closeSurvey("closed", true);
	}
	/** Replaces the playlist/queue. */
	setPlaylist(options) {
		this.#assertAlive();
		this.#clearPlaylistTimer();
		this.#pendingAutoAdvance = false;
		if (options === null || options.items.length === 0) {
			this.#playlist = [];
			this.#playlistIndex = -1;
			this.#playlistOptions = null;
			this.#setState({ playlist: null });
			this.#emitEvent("playlistchange", {
				index: -1,
				item: null,
				status: null
			});
			return;
		}
		this.#playlist = [...options.items];
		this.#playlistOptions = options;
		const requested = options.startIndex ?? 0;
		this.#playlistIndex = Number.isInteger(requested) && requested >= 0 && requested < this.#playlist.length ? requested : 0;
		const status = this.#playlistStatus();
		this.#setState({ playlist: status });
		this.#emitEvent("playlistchange", {
			index: this.#playlistIndex,
			item: this.#playlist[this.#playlistIndex] ?? null,
			status
		});
	}
	/** Plays a playlist item by index. */
	async playPlaylistItem(index) {
		this.#assertAlive();
		if (!Number.isInteger(index) || index < 0 || index >= this.#playlist.length) return false;
		const current = this.#playlistStatus();
		if (current !== null && index > current.index) {
			if (this.#playlistOptions?.allowNext === false) throw createPlayerError("Advancing to the next item is disabled.", { code: "invalid-state" });
			if (!current.completed && current.nextLocked) throw createPlayerError("Complete the current item before advancing.", { code: "invalid-state" });
		}
		if (current !== null && index < current.index && this.#playlistOptions?.allowPrevious === false) return false;
		this.#playlistIndex = index;
		this.#clearPlaylistTimer();
		this.#pendingAutoAdvance = false;
		const item = this.#playlist[index] ?? null;
		if (item === null) return false;
		const { poster: _poster, ...rest } = this.#options;
		this.#options = item.poster === void 0 ? rest : {
			...rest,
			poster: item.poster
		};
		const status = this.#playlistStatus();
		this.#setState({ playlist: status });
		this.#emitEvent("playlistchange", {
			index,
			item,
			status
		});
		await this.load(item.source);
		return true;
	}
	/** Plays the next playlist item. */
	async next() {
		this.#assertAlive();
		const status = this.#playlistStatus();
		if (status === null) return null;
		if (status.hasNext && !status.canNext) throw createPlayerError(this.#playlistOptions?.allowNext === false ? "Advancing to the next item is disabled." : "Complete the current item before advancing.", { code: "invalid-state" });
		const nextIndex = status.hasNext ? status.index + 1 : this.#playlistOptions?.loop === true ? 0 : -1;
		if (nextIndex < 0) return null;
		await this.playPlaylistItem(nextIndex);
		return this.#playlist[nextIndex] ?? null;
	}
	/** Plays the previous playlist item. */
	async previous() {
		this.#assertAlive();
		const status = this.#playlistStatus();
		if (status === null) return null;
		if (status.hasPrevious && !status.canPrevious) return null;
		const previousIndex = status.hasPrevious ? status.index - 1 : this.#playlistOptions?.loop === true ? this.#playlist.length - 1 : -1;
		if (previousIndex < 0) return null;
		await this.playPlaylistItem(previousIndex);
		return this.#playlist[previousIndex] ?? null;
	}
	/** Asks the engine for an immediate time sync (useful for embeds). */
	syncTime() {
		this.#assertAlive();
		this.#engine?.requestTimeSync?.();
		const currentTime = this.#engine?.getCurrentTime() ?? this.#state.currentTime;
		const duration = this.#engine?.getDuration() ?? this.#state.duration;
		const buffered = this.#engine?.getBuffered() ?? this.#state.buffered;
		this.#emitEvent("timeupdate", {
			currentTime,
			duration,
			buffered
		});
	}
	/** Reloads the current source after an error. */
	async retry() {
		this.#assertAlive();
		const source = this.#source?.source;
		if (source === void 0) throw createPlayerError("No media is loaded.", { code: "invalid-state" });
		await this.load(source);
	}
	/** Requests fullscreen for the container element. */
	async requestFullscreen() {
		this.#assertAlive();
		if (typeof this.#options.container.requestFullscreen !== "function") throw createPlayerError("Fullscreen is not supported in this environment.", { code: "unsupported-environment" });
		await this.#options.container.requestFullscreen();
	}
	/** Exits fullscreen when active. */
	async exitFullscreen() {
		if (typeof document.exitFullscreen !== "function") throw createPlayerError("Fullscreen is not supported in this environment.", { code: "unsupported-environment" });
		if (document.fullscreenElement != null) await document.exitFullscreen();
	}
	/** Requests Picture-in-Picture for the underlying video element. */
	async requestPictureInPicture() {
		this.#assertAlive();
		const media = this.#engine?.element;
		if (typeof HTMLVideoElement === "undefined" || !(media instanceof HTMLVideoElement)) throw createPlayerError("Picture-in-Picture requires a video element.", { code: "unsupported-source" });
		if (typeof media.requestPictureInPicture !== "function") throw createPlayerError("Picture-in-Picture is not supported in this environment.", { code: "unsupported-environment" });
		await media.requestPictureInPicture();
	}
	/** Exits Picture-in-Picture when active. */
	async exitPictureInPicture() {
		if (typeof document.exitPictureInPicture !== "function") throw createPlayerError("Picture-in-Picture is not supported in this environment.", { code: "unsupported-environment" });
		if (document.pictureInPictureElement != null) await document.exitPictureInPicture();
	}
	/** Switches between custom and native controls. */
	setControls(mode) {
		this.#options = {
			...this.#options,
			controls: mode
		};
		const media = this.#engine?.element;
		if (typeof HTMLMediaElement !== "undefined" && media instanceof HTMLMediaElement) media.controls = mode === "native";
	}
	/** Updates the theme preference. */
	setTheme(theme) {
		this.#options = {
			...this.#options,
			theme
		};
	}
	/** Updates the locale preference. */
	setLocale(locale) {
		this.#options = {
			...this.#options,
			locale
		};
	}
	/** Merges string overrides. */
	setStrings(strings) {
		this.#options = {
			...this.#options,
			strings: {
				...this.#options.strings,
				...strings
			}
		};
	}
	/** Stops playback, releases resources and removes the surface. */
	destroy() {
		if (this.#destroyed) return;
		this.saveResume();
		this.#destroyed = true;
		this.#loadSequence += 1;
		this.#clearPlaylistTimer();
		this.#clearImageTimer();
		this.#documentController.abort();
		this.#destroyEngine();
		revokeSource(this.#source);
		this.#source = null;
		this.#setState({
			status: "idle",
			playing: false,
			ended: false,
			seeking: false,
			surveyOpen: false,
			activeChapter: null,
			error: null
		}, false);
		this.#emitEvent("destroy", void 0);
		this.#bus.clear();
		this.#root.remove();
	}
	#assertAlive() {
		if (this.#destroyed) throw createPlayerError("The player has been destroyed.", { code: "destroyed" });
	}
	#destroyEngine() {
		const engine = this.#engine;
		this.#engine = null;
		engine?.destroy();
	}
	#chapters() {
		return this.#chaptersOverride ?? this.#source?.source.chapters ?? this.#options.chapters ?? [];
	}
	#applyChapters(chapters, time) {
		const active = findChapterAt(chapters, time);
		this.#setState({
			chapters,
			activeChapter: active
		});
		if ((active?.id ?? null) !== this.#lastActiveChapterId) {
			this.#lastActiveChapterId = active?.id ?? null;
			this.#emitEvent("chapterchange", { chapter: active });
		}
	}
	#playlistStatus(state = this.#state) {
		if (this.#playlist.length === 0 || this.#playlistIndex < 0) return null;
		const hasNext = this.#playlistIndex + 1 < this.#playlist.length;
		const hasPrevious = this.#playlistIndex > 0;
		const completed = state.ended || state.duration > 0 && state.currentTime > 0 && state.currentTime >= state.duration - .25;
		const gatesAdvance = this.#playlistOptions?.requireCompletion === true || this.#playlistOptions?.gateAdvance === true;
		const allowsNext = this.#playlistOptions?.allowNext !== false;
		const allowsPrevious = this.#playlistOptions?.allowPrevious !== false;
		const nextLocked = hasNext && (!allowsNext || gatesAdvance && !completed);
		const previousLocked = hasPrevious && !allowsPrevious;
		return {
			index: this.#playlistIndex,
			length: this.#playlist.length,
			hasNext,
			hasPrevious,
			autoAdvance: this.#playlistOptions?.autoAdvance === true,
			completed,
			canNext: hasNext && allowsNext && (completed || !gatesAdvance),
			canPrevious: hasPrevious && allowsPrevious,
			nextLocked,
			previousLocked
		};
	}
	#clearPlaylistTimer() {
		if (this.#playlistTimer !== null) {
			clearTimeout(this.#playlistTimer);
			this.#playlistTimer = null;
		}
	}
	#clearImageTimer() {
		if (this.#imageTimer !== null) {
			clearTimeout(this.#imageTimer);
			this.#imageTimer = null;
		}
	}
	#scheduleImageAdvance() {
		this.#clearImageTimer();
		const seconds = this.#options.image?.slideDuration;
		if (seconds === void 0 || seconds <= 0) return;
		const status = this.#playlistStatus();
		if (status === null || !status.canNext && status.hasNext || !status.hasNext && this.#playlistOptions?.loop !== true) return;
		this.#imageTimer = setTimeout(() => {
			this.#imageTimer = null;
			this.next().catch(() => {});
		}, seconds * 1e3);
	}
	#scheduleAutoAdvance() {
		if (this.#playlistOptions?.autoAdvance !== true) return;
		const status = this.#playlistStatus();
		if (status === null || !status.canNext && status.hasNext || !status.hasNext && this.#playlistOptions.loop !== true) return;
		this.#pendingAutoAdvance = true;
		if (this.#state.surveyOpen) return;
		this.#clearPlaylistTimer();
		this.#pendingAutoAdvance = false;
		const delay = Math.max(0, this.#playlistOptions.autoAdvanceDelay ?? 0);
		if (delay === 0) {
			this.next().catch(() => {});
			return;
		}
		this.#playlistTimer = setTimeout(() => {
			this.#playlistTimer = null;
			this.next().catch(() => {});
		}, delay * 1e3);
	}
	async #resolveSurvey() {
		const source = this.#surveySource ?? this.#source?.source.survey ?? this.#options.survey ?? null;
		if (source === null) return null;
		if (typeof source === "function") {
			const resolved = await source();
			const normalized = normalizeSurvey(resolved);
			this.#survey = normalized;
			return normalized;
		}
		this.#survey = normalizeSurvey(source);
		return this.#survey;
	}
	#defaultAnswers(survey) {
		return createSurveyAnswers(survey);
	}
	#normalizeAnswers(survey, answers) {
		const normalized = {};
		for (const question of survey.questions) {
			const value = answers[question.id];
			if (value === void 0) {
				normalized[question.id] = emptySurveyAnswer(question);
				continue;
			}
			if (question.type === "checkbox") {
				normalized[question.id] = Array.isArray(value) ? value.filter((entry) => typeof entry === "string") : typeof value === "string" && value.length > 0 ? [value] : [];
				continue;
			}
			if (question.type === "rating" || question.type === "scale") {
				const numeric = typeof value === "number" ? value : Number(value);
				normalized[question.id] = Number.isFinite(numeric) ? numeric : question.min ?? 0;
				continue;
			}
			normalized[question.id] = typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : "";
		}
		return normalized;
	}
	#completeSurvey(survey, result, reason) {
		this.#surveyStorage?.markShown();
		this.#setState({ surveyOpen: false });
		if (reason === "submitted") this.#emitEvent("surveysubmit", {
			survey,
			answers: result.answers,
			result
		});
		else this.#emitEvent("surveyskip", {
			survey,
			result
		});
		this.#emitEvent("surveyclose", {
			survey,
			reason
		});
		const callback = reason === "submitted" ? survey.onSubmit : survey.onSkip;
		if (callback !== void 0) try {
			Promise.resolve(callback(result)).catch(() => {});
		} catch {}
		if (this.#pendingAutoAdvance || this.#state.ended) {
			this.#pendingAutoAdvance = false;
			this.#scheduleAutoAdvance();
		}
	}
	#closeSurvey(reason, emitEvent) {
		const survey = this.#survey;
		if (survey === null || !this.#state.surveyOpen) return;
		this.#setState({ surveyOpen: false });
		if (emitEvent) this.#emitEvent("surveyclose", {
			survey,
			reason
		});
		if (this.#pendingAutoAdvance || this.#state.ended) {
			this.#pendingAutoAdvance = false;
			this.#scheduleAutoAdvance();
		}
	}
	#captionStorageKey() {
		if (this.#source === null || this.#options.captions?.persist === false) return null;
		return this.#options.captions?.storageKey ?? `universal-player:captions:${this.#source.url}`;
	}
	#readCaptionPreference() {
		const key = this.#captionStorageKey();
		if (key === null) return;
		try {
			if (typeof localStorage === "undefined") return;
			const value = localStorage.getItem(key);
			return value === null ? void 0 : value.length === 0 ? null : value;
		} catch {
			return;
		}
	}
	#saveCaptionPreference(id) {
		const key = this.#captionStorageKey();
		if (key === null) return;
		try {
			if (typeof localStorage === "undefined") return;
			if (id === null) localStorage.setItem(key, "");
			else localStorage.setItem(key, id);
		} catch {}
	}
	#triggerSurveyAt(time) {
		if (this.#surveyShownForSource) return;
		const source = this.#surveySource;
		if (source === null || typeof source === "function") return;
		const trigger = surveyTriggerTime(source.trigger);
		if (trigger === null || trigger <= 0 || time < trigger) return;
		this.#surveyShownForSource = true;
		this.openSurvey().catch(() => {});
	}
	#applyInitialOptions(engine) {
		const volume = this.#options.volume ?? this.#state.volume;
		const muted = this.#options.muted ?? this.#state.muted;
		const rate = this.#options.playbackRate ?? this.#state.playbackRate;
		engine.setVolume(volume);
		engine.setMuted(muted);
		engine.setPlaybackRate(rate);
		if (this.#options.startTime !== void 0) engine.seek(this.#options.startTime);
		this.#setState({
			volume,
			muted,
			playbackRate: rate
		}, false);
	}
	#emitEvent(type, detail) {
		this.#applyEventToState(type, detail);
		this.#bus.emit(type, detail);
		try {
			this.#options.onEvent?.({
				type,
				detail
			});
		} catch {}
		if (typeof CustomEvent === "function") this.dispatchEvent(new CustomEvent(type, { detail }));
	}
	#setState(patch, emitStateChange = true) {
		const merged = {
			...this.#state,
			...patch
		};
		const next = this.#playlist.length > 0 ? {
			...merged,
			playlist: this.#playlistStatus(merged)
		} : merged;
		this.#state = next;
		if (!emitStateChange) return;
		this.#emitEvent("statechange", next);
		try {
			this.#options.onStateChange?.(next);
		} catch {}
	}
	#applyEventToState(type, detail) {
		switch (type) {
			case "statechange": return;
			case "loadstart": {
				const event = detail;
				this.#setState({
					status: "loading",
					source: event.source,
					kind: event.kind,
					capabilities: capabilitiesForKind(event.kind),
					currentTime: 0,
					duration: 0,
					buffered: 0,
					playing: false,
					ended: false,
					seeking: false,
					error: null,
					quality: null,
					qualities: this.#options.qualities ?? [],
					textTrack: null,
					textTracks: this.#options.textTracks ?? [],
					audioTrack: null,
					audioTracks: this.#options.audioTracks ?? [],
					chapters: this.#chapters(),
					activeChapter: null,
					survey: this.#survey,
					surveyOpen: false,
					playlist: this.#playlistStatus()
				});
				return;
			}
			case "loadedmetadata": {
				const event = detail;
				const textTracks = this.#engine?.getTextTracks?.() ?? this.#options.textTracks ?? [];
				const audioTracks = this.#engine?.getAudioTracks?.() ?? this.#options.audioTracks ?? [];
				const configuredCaption = this.#options.captions?.defaultTrack;
				const preferredCaption = configuredCaption !== void 0 ? configuredCaption : this.#readCaptionPreference();
				const textTrack = this.#options.captions?.enabled === false ? null : preferredCaption === null ? null : textTracks.find((track) => track.id === preferredCaption) ?? (configuredCaption === void 0 ? textTracks.find((track) => track.default === true) ?? null : null);
				const audioTrack = audioTracks.find((track) => track.default === true) ?? null;
				if (textTrack !== null) this.#engine?.setTextTrack?.(textTrack.id);
				else if (this.#options.captions?.enabled === false) this.#engine?.setTextTrack?.(null);
				const chapters = this.#chapters();
				const activeChapter = findChapterAt(chapters, this.#state.currentTime);
				this.#setState({
					status: "ready",
					capabilities: this.#engine?.capabilities ?? this.#state.capabilities,
					duration: event.duration,
					live: event.live,
					error: null,
					qualities: this.#engine?.getQualities?.() ?? this.#options.qualities ?? [],
					textTracks,
					textTrack,
					audioTracks,
					audioTrack,
					chapters,
					activeChapter
				});
				if (this.#state.kind === "image") this.#scheduleImageAdvance();
				this.restoreResume();
				this.track("loadedmetadata");
				return;
			}
			case "durationchange": {
				const event = detail;
				this.#setState({
					duration: event.duration,
					live: event.live
				});
				return;
			}
			case "play":
				this.#setState({
					status: "playing",
					playing: true,
					ended: false
				});
				this.track("play");
				return;
			case "playing":
				this.#setState({
					status: "playing",
					playing: true
				});
				return;
			case "pause":
				this.#setState({
					status: this.#state.ended ? "ended" : "paused",
					playing: false
				});
				this.saveResume();
				this.track("pause");
				return;
			case "timeupdate": {
				const event = detail;
				this.#setState({
					currentTime: event.currentTime,
					duration: event.duration,
					buffered: event.buffered
				}, false);
				const chapters = this.#state.chapters;
				if (chapters.length > 0) {
					const active = findChapterAt(chapters, event.currentTime);
					if ((active?.id ?? null) !== this.#lastActiveChapterId) {
						this.#lastActiveChapterId = active?.id ?? null;
						this.#setState({ activeChapter: active });
						this.#emitEvent("chapterchange", { chapter: active });
					}
				}
				if (!this.#state.surveyOpen) this.#triggerSurveyAt(event.currentTime);
				const now = Date.now();
				if (now - this.#lastResumeSave > 5e3) {
					this.#lastResumeSave = now;
					this.saveResume();
				}
				return;
			}
			case "progress": {
				const event = detail;
				this.#setState({ buffered: event.buffered }, false);
				return;
			}
			case "seeking": {
				const event = detail;
				this.#setState({
					seeking: true,
					currentTime: event.currentTime
				});
				return;
			}
			case "seeked": {
				const event = detail;
				this.#setState({
					seeking: false,
					currentTime: event.currentTime
				});
				this.saveResume();
				this.track("seeked");
				return;
			}
			case "waiting":
			case "canplay": return;
			case "ended":
				this.#setState({
					status: "ended",
					ended: true,
					playing: false
				});
				this.saveResume();
				this.track("ended");
				if (!(this.#surveySource !== null || this.#source?.source.survey !== void 0) || this.#surveyShownForSource) {
					this.#scheduleAutoAdvance();
					return;
				}
				this.#surveyShownForSource = true;
				this.openSurvey().then((opened) => {
					if (!opened) this.#scheduleAutoAdvance();
				}).catch(() => {
					this.#scheduleAutoAdvance();
				});
				return;
			case "volumechange": {
				const event = detail;
				this.#setState({
					volume: event.volume,
					muted: event.muted
				});
				return;
			}
			case "ratechange": {
				const event = detail;
				this.#setState({ playbackRate: event.playbackRate });
				return;
			}
			case "qualitychange": {
				const event = detail;
				this.#setState({ quality: event.quality });
				return;
			}
			case "texttrackchange": {
				const event = detail;
				this.#setState({ textTrack: event.track });
				return;
			}
			case "audiotrackchange": {
				const event = detail;
				this.#setState({ audioTrack: event.track });
				return;
			}
			case "fullscreenchange": {
				const event = detail;
				this.#setState({ fullscreen: event.fullscreen });
				return;
			}
			case "pictureinpicturechange": {
				const event = detail;
				this.#setState({ pictureInPicture: event.pictureInPicture });
				return;
			}
			case "error": {
				const event = detail;
				this.#setState({
					status: "error",
					error: event.error,
					playing: false
				});
				this.track("error", { message: event.error.message });
				return;
			}
			case "destroy": return;
		}
	}
	#resumeStorage() {
		const configured = this.#options.resume?.storage;
		if (configured !== void 0) return configured;
		try {
			return typeof localStorage === "undefined" ? null : localStorage;
		} catch {
			return null;
		}
	}
	#resumeKey() {
		if (this.#source === null) return null;
		return this.#options.resume?.key ?? `universal-player:${this.#source.url}`;
	}
	/** Restores a saved position after metadata is available. */
	restoreResume() {
		if (this.#options.resume?.enabled !== true) return;
		const storage = this.#resumeStorage();
		const key = this.#resumeKey();
		if (storage === null || key === null) return;
		try {
			const raw = storage.getItem(key);
			if (raw === null) return;
			const value = Number(raw);
			if (!Number.isFinite(value) || value <= 0) return;
			this.#engine?.seek(value);
			this.#setState({ currentTime: value }, false);
		} catch {}
	}
	/** Persists the current position when resume is enabled. */
	saveResume() {
		if (this.#options.resume?.enabled !== true) return;
		const storage = this.#resumeStorage();
		const key = this.#resumeKey();
		if (storage === null || key === null) return;
		try {
			if (this.#state.ended || this.#state.currentTime <= 0) {
				storage.removeItem(key);
				return;
			}
			const minDuration = this.#options.resume?.minDuration ?? 30;
			if (this.#state.duration > 0 && this.#state.duration < minDuration) return;
			storage.setItem(key, String(this.#state.currentTime));
		} catch {}
	}
	track(type, metadata) {
		const analytics = this.#options.analytics;
		if (analytics?.enabled === false || analytics?.onEvent === void 0) return;
		try {
			analytics.onEvent({
				type,
				at: Date.now(),
				position: this.#state.currentTime,
				duration: this.#state.duration,
				source: this.#source?.url ?? null,
				...metadata === void 0 ? {} : { metadata }
			});
		} catch {}
	}
};
/** Creates a player. Equivalent to `new UniversalPlayer(options)`. */
function createPlayer(options) {
	return new UniversalPlayer(options);
}
export { UniversalPlayer, createPlayer };

//# sourceMappingURL=player.js.map