import { PlayerObservable } from "./events.js";
import { normalizeSource } from "./source.js";
import { CaptionStyle, CaptionsOptions, Chapter, ControlsMode, PlayerCapabilities, PlayerEvents, PlayerOptions, PlayerSourceInput, PlayerState, PlayerStrings, PlaylistItem, PlaylistOptions, PlaylistStatus, SurveyConfig, SurveySource, SurveySubmission, ThemeMode, ThumbnailTrack } from "./types.js";
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
export declare class UniversalPlayer extends EventTarget {
  #private;
  constructor(options: PlayerOptions);
  /** Whether `destroy()` has run. */
  get destroyed(): boolean;
  /** Immutable state snapshot. */
  get state(): PlayerState;
  /** Current construction options. */
  get options(): Readonly<PlayerOptions>;
  /** The normalized source, or null before the first load. */
  get source(): ReturnType<typeof normalizeSource> | null;
  /** The currently active survey config, or null. */
  get activeSurvey(): SurveyConfig | null;
  /** A snapshot of the playlist position, or null without a playlist. */
  get playlistStatus(): PlaylistStatus | null;
  /** The current playlist items. */
  get playlistItems(): readonly PlaylistItem[];
  /** The current playlist item, or null. */
  get playlistItem(): PlaylistItem | null;
  /** Cancels a scheduled auto-advance. */
  cancelAutoAdvance(): void;
  /** The underlying media element, when the engine exposes one. */
  get mediaElement(): HTMLElement | null;
  /** Capabilities of the active engine, or null before a load. */
  get capabilities(): PlayerCapabilities | null;
  /** Subscribes to a typed event. */
  on<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void): () => void;
  /** Subscribes to the next occurrence of a typed event. */
  once<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void): () => void;
  /** Returns an observable stream for a typed event. */
  observe<K extends keyof PlayerEvents>(type: K): PlayerObservable<PlayerEvents[K]>;
  /**
   * Loads or replaces the current source.
   *
   * A newer `load()` call cancels an older in-flight load. Errors are emitted
   * as an `error` event and rethrown to the caller.
   */
  load(input: PlayerSourceInput): Promise<void>;
  /** Starts playback. */
  play(): Promise<void>;
  /** Pauses playback. */
  pause(): void;
  /** Seeks to an absolute time in seconds. */
  seek(time: number): void;
  /** Sets the volume in the inclusive 0–1 range. */
  setVolume(volume: number): void;
  /** Mutes or unmutes playback. */
  setMuted(muted: boolean): void;
  /** Toggles muted state. */
  toggleMute(): void;
  /** Sets the playback rate in the inclusive 0.25–4 range. */
  setPlaybackRate(rate: number): void;
  /** Selects a quality level, or null for automatic selection. */
  setQuality(quality: string | null): void;
  /** Selects a text track, or null to disable captions. */
  setTextTrack(id: string | null): void;
  /** Selects an audio track, or null to let the browser decide. */
  setAudioTrack(id: string | null): void;
  /** Enables or disables captions. */
  setCaptionsEnabled(enabled: boolean): void;
  /** Cycles through off and the available caption tracks. */
  toggleCaptions(): void;
  /** Updates caption styling without reloading the media. */
  setCaptionStyle(style: CaptionStyle): void;
  /** Replaces the caption configuration (tracks, default track, style). */
  setCaptions(options: CaptionsOptions): void;
  /** Replaces the chapter list. */
  setChapters(chapters: readonly Chapter[]): void;
  /** Returns the chapter active at the current position. */
  get currentChapter(): Chapter | null;
  /** Seeks to a chapter by id or object. */
  seekToChapter(chapter: Chapter | string): void;
  /** Updates the seek-bar thumbnail track. */
  setThumbnails(thumbnails: ThumbnailTrack | null): void;
  /** Current thumbnail track, or null. */
  get thumbnails(): ThumbnailTrack | null;
  /** Enables or disables looping. */
  setLoop(loop: boolean): void;
  /** Enables or disables autoplay for subsequent loads. */
  setAutoplay(autoplay: boolean): void;
  /** Enables or disables automatic playlist advancement. */
  setAutoAdvance(autoAdvance: boolean): void;
  /** Replaces the survey config or clears it. */
  setSurvey(survey: SurveySource | null): void;
  /**
   * Opens the configured survey. Resolves to true when it was opened (false
   * when there is no survey or it was already completed in "once" mode).
   */
  openSurvey(force?: boolean): Promise<boolean>;
  /** Reopens a survey when `allowRetake` is enabled. */
  retakeSurvey(): Promise<boolean>;
  /** Submits survey answers. Throws when required validation fails. */
  submitSurvey(answers: Readonly<Record<string, unknown>>): SurveySubmission;
  /** Skips the active survey. */
  skipSurvey(): SurveySubmission | null;
  /** Closes the survey overlay without submitting. */
  closeSurvey(): void;
  /** Replaces the playlist/queue. */
  setPlaylist(options: PlaylistOptions | null): void;
  /** Plays a playlist item by index. */
  playPlaylistItem(index: number): Promise<boolean>;
  /** Plays the next playlist item. */
  next(): Promise<PlaylistItem | null>;
  /** Plays the previous playlist item. */
  previous(): Promise<PlaylistItem | null>;
  /** Asks the engine for an immediate time sync (useful for embeds). */
  syncTime(): void;
  /** Reloads the current source after an error. */
  retry(): Promise<void>;
  /** Requests fullscreen for the container element. */
  requestFullscreen(): Promise<void>;
  /** Exits fullscreen when active. */
  exitFullscreen(): Promise<void>;
  /** Requests Picture-in-Picture for the underlying video element. */
  requestPictureInPicture(): Promise<void>;
  /** Exits Picture-in-Picture when active. */
  exitPictureInPicture(): Promise<void>;
  /** Switches between custom and native controls. */
  setControls(mode: ControlsMode): void;
  /** Updates the theme preference. */
  setTheme(theme: ThemeMode): void;
  /** Updates the locale preference. */
  setLocale(locale: string): void;
  /** Merges string overrides. */
  setStrings(strings: Partial<PlayerStrings>): void;
  /** Stops playback, releases resources and removes the surface. */
  destroy(): void;
  /** Restores a saved position after metadata is available. */
  restoreResume(): void;
  /** Persists the current position when resume is enabled. */
  saveResume(): void;
  private track;
}
/** Creates a player. Equivalent to `new UniversalPlayer(options)`. */
export declare function createPlayer(options: PlayerOptions): UniversalPlayer;
//# sourceMappingURL=player.d.ts.map