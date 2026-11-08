/**
 * Public types for the headless universal player.
 *
 * The core is deliberately browser-only and framework-agnostic. It knows how
 * to play media, not how any particular framework renders it.
 */
/** The media kinds the player understands. */
export type MediaKind = "video" | "audio" | "image" | "embed";
/** Controls that can be shown for a media kind. */
export type PlayerControl = "play" | "previous" | "next" | "rewind" | "forward" | "seek" | "time" | "volume" | "mute" | "captions" | "settings" | "quality" | "speed" | "audioTrack" | "chapters" | "chapterLabel" | "playlist" | "stats" | "share" | "cast" | "airplay" | "pip" | "fullscreen" | "zoom" | "rotate" | "download" | "title" | "live";
/** The engine selected for a normalized source. */
export type MediaProvider = "native" | "chunked" | "hls" | "dash" | "image" | "youtube" | "vimeo" | "generic-embed";
/** High-level lifecycle status. */
export type PlayerStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "ended" | "error";
/** Whether the built-in UI or the browser's native controls are used. */
export type ControlsMode = "custom" | "native";
/** Theme selection for the built-in UI. */
export type ThemeMode = "light" | "dark" | "system";
/** Preload hint forwarded to the native media element. */
export type PreloadMode = "none" | "metadata" | "auto";
/** A caption/subtitle track supplied by the consumer or by source metadata. */
export interface CaptionTrack {
  readonly id?: string;
  readonly src: string;
  readonly label: string;
  readonly language: string;
  readonly kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  readonly default?: boolean;
}
/** Visual styling for native captions and subtitles. */
export interface CaptionStyle {
  /** CSS font-size, for example `"1.25rem"` or `"120%"`. */
  readonly fontSize?: string;
  /** CSS color of the cue text. */
  readonly color?: string;
  /** CSS background of the cue text. */
  readonly background?: string;
  /** Cue background opacity in the inclusive 0–1 range. */
  readonly opacity?: number;
  /** Text outline style. */
  readonly edge?: "none" | "outline" | "drop-shadow" | "raised" | "depressed";
  readonly fontFamily?: string;
}
/** Caption configuration. */
export interface CaptionsOptions {
  readonly enabled?: boolean;
  readonly defaultTrack?: string | null;
  readonly tracks?: readonly CaptionTrack[];
  readonly style?: CaptionStyle;
  /** Remember the last selected track per source. Defaults to true. */
  readonly persist?: boolean;
  readonly storageKey?: string;
}
/** Options for the built-in still-image viewer controls. */
export interface ImageOptions {
  readonly zoom?: boolean;
  readonly rotate?: boolean;
  readonly download?: boolean;
  readonly minZoom?: number;
  readonly maxZoom?: number;
  /** Seconds before advancing to the next playlist image. */
  readonly slideDuration?: number;
}
/**
 * Per-control visibility rules.
 *
 * An array is an allow-list. An object lets a consumer hide a single control
 * without writing every other control.
 */
export type ControlVisibility = readonly PlayerControl[] | Readonly<Partial<Record<PlayerControl, boolean>>>;
/** Download button configuration. */
export interface DownloadOptions {
  /** Show a download action in the control bar. Defaults to false. */
  readonly enabled?: boolean;
  /** File name override. Defaults to the source title or `media`. */
  readonly filename?: string;
  /** Restrict the action to these media kinds. Defaults to every kind. */
  readonly kinds?: readonly MediaKind[];
  /** Force a same-tab download instead of opening a new tab. Defaults true. */
  readonly saveAs?: boolean;
}
/** Embed snippet configuration used by the share menu. */
export interface EmbedShareOptions {
  /** Set to false to hide the embed action for this player. Defaults to true. */
  readonly enabled?: boolean;
  /**
   * Snippet style. `iframe` embeds the URL directly; `player` emits a
   * `<universal-player>` snippet so poster/thumbnail and player options work.
   */
  readonly mode?: "iframe" | "player";
  /** URL placed in the embed. Defaults to the current media URL. */
  readonly url?: string;
  /** Thumbnail/poster image shown before playback or in the share preview. */
  readonly poster?: string;
  /** iframe/player width. Defaults to `640`. */
  readonly width?: number | string;
  /** iframe/player height. Defaults to `360`. */
  readonly height?: number | string;
  /** iframe title. Defaults to the share title. */
  readonly title?: string;
}
/** Share menu configuration. */
export interface ShareOptions {
  /** Set to false to hide the share control entirely. Defaults to true. */
  readonly enabled?: boolean;
  /** URL used by share targets. Defaults to the current media URL. */
  readonly url?: string;
  /** Title used by share targets and the embed snippet. */
  readonly title?: string;
  /** Thumbnail shown at the top of the share sheet and used by embeds. */
  readonly thumbnail?: string;
  /**
   * Add an "Embed" action that copies a snippet. Pass an object to override the
   * embed URL, size, title, poster or snippet mode.
   */
  readonly embed?: boolean | EmbedShareOptions;
}
/** Playback speed menu configuration. */
export interface SpeedOptions {
  /** Show speed controls. Defaults to true when the engine supports rate. */
  readonly enabled?: boolean;
  /** Selectable rates. Defaults to `0.25` … `2`. */
  readonly rates?: readonly number[];
  /** Initial rate when `PlayerOptions.playbackRate` is omitted. */
  readonly defaultRate?: number;
  /** Allow `<`/`>` keyboard shortcuts. Defaults to true. */
  readonly keyboard?: boolean;
}
/** Settings menu sections. Use `false` to hide an individual section. */
export interface SettingsMenuOptions {
  /** Show the settings button/menu. Defaults to true when it has sections. */
  readonly enabled?: boolean;
  readonly speed?: boolean;
  readonly quality?: boolean;
  readonly captions?: boolean;
  readonly captionStyle?: boolean;
  readonly audio?: boolean;
  readonly loop?: boolean;
  /** Autoplay for subsequent loads. Defaults to true. */
  readonly autoplay?: boolean;
  /** Autoplay-next toggle for playlists. Defaults to true. */
  readonly autoplayNext?: boolean;
  /** Sleep timer submenu with 5–60 minute presets. Defaults to true. */
  readonly sleepTimer?: boolean;
  readonly stats?: boolean;
  readonly shortcuts?: boolean;
}
/** Timestamp display configuration. */
export interface TimeDisplayOptions {
  /** Value shown on the left when the player loads. Defaults to `"elapsed"`. */
  readonly mode?: "elapsed" | "remaining";
  /** Clicking the timestamp toggles elapsed/remaining. Defaults to true. */
  readonly toggle?: boolean;
  /** Show the total duration after the slash. Defaults to true. */
  readonly showTotal?: boolean;
}
/** Touch/pointer gesture configuration. Gestures are opt-in. */
export interface GestureOptions {
  /** Master switch. Defaults to false, preserving desktop behaviour. */
  readonly enabled?: boolean;
  /** Horizontal drag seeks. Defaults to true when gestures are enabled. */
  readonly swipeSeek?: boolean;
  /** Vertical drag toggles fullscreen. Defaults to true when enabled. */
  readonly swipeFullscreen?: boolean;
  /** Allow an upward drag. Defaults to true. Set false to disable swipe-up. */
  readonly swipeUp?: boolean;
  /** Allow a downward drag. Defaults to true. */
  readonly swipeDown?: boolean;
  /** Allow a leftward drag. Defaults to true. */
  readonly swipeLeft?: boolean;
  /** Allow a rightward drag. Defaults to true. */
  readonly swipeRight?: boolean;
  /** Minimum drag distance in CSS pixels before a gesture fires. Defaults to 48. */
  readonly threshold?: number;
}
/** Design tokens for the built-in UI. */
export interface UIThemeOptions {
  /** CSS custom properties such as `--up-color-accent`. */
  readonly variables?: Readonly<Record<`--up-${string}`, string>>;
  /** Convenience aliases for the most-used colour tokens. */
  readonly colors?: {
    readonly accent?: string;
    /** Text/icon colour used on top of `accent`. Defaults automatically. */
    readonly accentContrast?: string;
    readonly background?: string;
    readonly surface?: string;
    readonly foreground?: string;
    readonly muted?: string;
    readonly border?: string;
    readonly overlay?: string;
  };
  readonly radius?: string;
  readonly controlRadius?: string;
  readonly fontFamily?: string;
  /** Background of the floating menus. Use an alpha colour for translucency. */
  readonly menuBackground?: string;
  /** Backdrop blur applied to menus, for example `"12px"`. */
  readonly menuBlur?: string;
}
/** Optional fine-grained configuration for the built-in control surface. */
export interface UIOptions {
  /** Exactly which controls are allowed. Array = allow-list, object = overrides. */
  readonly controls?: ControlVisibility;
  /** Additional controls to hide (merged with `controls`). */
  readonly hide?: readonly PlayerControl[];
  /** Preferred left-to-right order. Omitted controls keep their default spot. */
  readonly order?: readonly PlayerControl[];
  readonly settings?: SettingsMenuOptions | false;
  readonly speed?: SpeedOptions | false;
  readonly share?: ShareOptions | false;
  readonly time?: TimeDisplayOptions;
  readonly download?: DownloadOptions | boolean;
  readonly gestures?: GestureOptions | false;
  readonly theme?: UIThemeOptions;
  readonly showTitle?: boolean;
  readonly showChapterLabel?: boolean;
  readonly showTime?: boolean;
  readonly showBuffered?: boolean;
  readonly showPreview?: boolean;
  readonly showBigPlay?: boolean;
  readonly autoHideControls?: boolean;
  /** Milliseconds before the controls fade while playing. Defaults to 3000. */
  readonly idleDelay?: number;
}
/** A selectable option in a survey question. */
export interface SurveyOption {
  readonly id: string;
  readonly label: string;
  readonly value?: string;
}
/** Supported survey/feedback question types. */
export type SurveyQuestionType = "radio" | "checkbox" | "select" | "text" | "textarea" | "rating" | "scale";
/** A single survey question. */
export interface SurveyQuestion {
  readonly id: string;
  readonly type: SurveyQuestionType;
  readonly label: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly options?: readonly SurveyOption[];
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly minSelections?: number;
  readonly maxSelections?: number;
  /** Render an optional free-text "Other" field for choice questions. */
  readonly allowOther?: boolean;
  readonly otherLabel?: string;
  /** Correct answer(s) for quiz-style instant feedback. */
  readonly correct?: string | readonly string[];
  /** Feedback shown after a correct/incorrect quiz answer. */
  readonly explanation?: string;
  /** Submit as soon as this individual question is answered. */
  readonly autoSubmit?: boolean;
}
/** An answer value. */
export type SurveyAnswerValue = string | readonly string[] | number | null;
/** Answers keyed by question id. */
export type SurveyAnswers = Readonly<Record<string, SurveyAnswerValue>>;
/** When a survey is shown. */
export type SurveyTrigger = "ended" | "manual" | number | {
  readonly at: number;
};
/**
 * How answers are submitted.
 *
 * - `manual`: the user presses the submit button.
 * - `on-select`: choosing a single-choice answer submits once required
 *   questions are satisfied.
 * - `on-complete`: submits automatically as soon as every required question
 *   has an answer.
 */
export type SurveySubmitMode = "manual" | "on-select" | "on-complete";
/** A submitted or skipped survey result. */
export interface SurveySubmission {
  readonly survey: SurveyConfig;
  readonly answers: SurveyAnswers;
  readonly submittedAt: number;
  readonly source: string | null;
  readonly position: number;
  readonly duration: number;
  readonly skipped: boolean;
  /** Zero-based retake attempt. */
  readonly attempt: number;
}
/** A configurable end-of-media survey, feedback form or review. */
export interface SurveyConfig {
  readonly id?: string;
  readonly kind?: "survey" | "feedback" | "review" | "quiz";
  readonly title?: string;
  readonly description?: string;
  readonly submitLabel?: string;
  readonly skipLabel?: string;
  readonly closeLabel?: string;
  readonly thankYouTitle?: string;
  readonly thankYouText?: string;
  readonly questions: readonly SurveyQuestion[];
  /** Defaults to `"ended"`. A number opens the survey at that time. */
  readonly trigger?: SurveyTrigger;
  /** Show once per source + survey id. Defaults to true. */
  readonly once?: boolean;
  readonly allowSkip?: boolean;
  /** Prevent closing without submitting. Defaults to false. */
  readonly required?: boolean;
  /**
   * Alias for `required` that reads naturally for "must answer before the
   * player can continue/close the survey".
   */
  readonly blocking?: boolean;
  /** Submission behaviour. Defaults to `"manual"`. */
  readonly submitMode?: SurveySubmitMode;
  /** Shorthand for `submitMode: "on-select"`. */
  readonly autoSubmit?: boolean;
  /** Delay before auto-submitting, in milliseconds. */
  readonly autoSubmitDelay?: number;
  /** Show correct/incorrect feedback for quiz questions. */
  readonly instantFeedback?: boolean;
  /** Allow the viewer to submit another response (retake). */
  readonly allowRetake?: boolean;
  /** Alias for `allowRetake`. */
  readonly allowResubmit?: boolean;
  /** Default max attempts when `allowRetake` is enabled. */
  readonly maxAttempts?: number;
  readonly storageKey?: string;
  readonly onSubmit?: (result: SurveySubmission) => void | Promise<void>;
  readonly onSkip?: (result: SurveySubmission) => void | Promise<void>;
  readonly onRetake?: (survey: SurveyConfig, attempt: number) => void | Promise<void>;
}
/** Resolves survey questions dynamically, for example from an API. */
export type SurveyProvider = () => SurveyConfig | Promise<SurveyConfig>;
/** A survey config or an async provider. */
export type SurveySource = SurveyConfig | SurveyProvider;
/** Items that can be auto-advanced after the current media ends. */
export interface PlaylistItem {
  readonly id?: string;
  readonly source: PlayerSourceInput;
  readonly title?: string;
  readonly poster?: string;
  readonly duration?: number;
}
/** Playlist/queue configuration. */
export interface PlaylistOptions {
  readonly items: readonly PlaylistItem[];
  readonly startIndex?: number;
  readonly autoAdvance?: boolean;
  readonly loop?: boolean;
  readonly autoAdvanceDelay?: number;
  /**
   * Prevent the Next action from running until the current item has finished.
   * Useful for course/onboarding flows where the viewer must watch item one
   * before item two becomes available.
   */
  readonly requireCompletion?: boolean;
  /** Alias for `requireCompletion`. */
  readonly gateAdvance?: boolean;
  /** Show/allow the Next action. Defaults to true. */
  readonly allowNext?: boolean;
  /** Show/allow the Previous action. Defaults to true. */
  readonly allowPrevious?: boolean;
}
/** A snapshot of the player's playlist position. */
export interface PlaylistStatus {
  readonly index: number;
  readonly length: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly autoAdvance: boolean;
  /** True when the current item has ended or reached its duration. */
  readonly completed: boolean;
  /** Whether Next is currently actionable. */
  readonly canNext: boolean;
  /** Whether Previous is currently actionable. */
  readonly canPrevious: boolean;
  /** Next exists but is gated until completion. */
  readonly nextLocked: boolean;
  /** Previous exists but is disabled by configuration. */
  readonly previousLocked: boolean;
}
/** Metadata that can travel with any source. */
export interface SourceMetadata {
  readonly title?: string;
  readonly description?: string;
  readonly captions?: readonly CaptionTrack[];
  readonly chapters?: readonly Chapter[];
  readonly thumbnails?: ThumbnailTrack;
  readonly survey?: SurveySource;
}
/** One chunk of a stored or streamed media file. */
export type ChunkData = Blob | ArrayBuffer | ArrayBufferView | string;
/** A reusable iterable/stream of media chunks. */
export type ChunkIterable = Iterable<ChunkData> | AsyncIterable<ChunkData> | ReadableStream<ChunkData>;
/** A source delivered incrementally, for example from an upload or an API. */
export interface ChunkedSource extends SourceMetadata {
  readonly kind: "video" | "audio" | "image";
  /**
   * Chunks in order. Pass a function returning a fresh iterable when the
   * source must be replayable/reloadable.
   */
  readonly chunks: ChunkIterable | (() => ChunkIterable);
  /** MIME type, for example `video/mp4`, `audio/webm` or `image/png`. */
  readonly type: string;
  /**
   * `auto` (default) streams video/audio through MediaSource when supported
   * and falls back to a Blob; `blob` always buffers first.
   */
  readonly mode?: "auto" | "stream" | "blob";
  /** Optional delay between image chunks/collection, in milliseconds. */
  readonly chunkDelay?: number;
  readonly alt?: string;
}
/** A video source. */
export interface VideoSource extends SourceMetadata {
  readonly kind: "video";
  readonly src: string;
  readonly type?: string;
}
/** An audio source. */
export interface AudioSource extends SourceMetadata {
  readonly kind: "audio";
  readonly src: string;
  readonly type?: string;
}
/** A still image rendered inside the player surface. */
export interface ImageSource extends SourceMetadata {
  readonly kind: "image";
  readonly src: string;
  readonly type?: string;
  readonly alt?: string;
}
/** A third-party embed source. */
export interface EmbedSource extends SourceMetadata {
  readonly kind: "embed";
  readonly src: string;
  readonly provider: "youtube" | "vimeo" | "generic";
  readonly type?: string;
  readonly title?: string;
}
/** A structured media source. */
export type PlayerSource = VideoSource | AudioSource | ImageSource | EmbedSource | ChunkedSource;
/** One loadable source item. */
export type PlayerSourceItem = string | PlayerSource | Blob | File | MediaStream;
/**
 * Anything the player can load. An array is treated as a playlist/gallery,
 * which is useful for photo or clip lists.
 */
export type PlayerSourceInput = PlayerSourceItem | readonly PlayerSourceItem[];
/** A source after URL resolution and engine detection. */
export interface NormalizedSource {
  readonly source: PlayerSource;
  readonly url: string;
  readonly kind: MediaKind;
  readonly provider: MediaProvider;
  readonly mimeType: string | null;
  readonly extension: string | null;
  readonly objectUrl: boolean;
  readonly title: string | null;
  readonly stream: MediaStream | null;
  readonly chunks: ChunkIterable | (() => ChunkIterable) | null;
}
/** A selectable video quality level. */
export interface QualityLevel {
  readonly id: string;
  readonly label: string;
  readonly width?: number;
  readonly height?: number;
  readonly bitrate?: number;
  readonly codec?: string;
  readonly frameRate?: number;
}
/** A text track exposed by the current media. */
export interface TextTrackInfo {
  readonly id: string;
  readonly label: string;
  readonly language: string;
  readonly kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  readonly default?: boolean;
}
/** An audio track exposed by the current media. */
export interface AudioTrackInfo {
  readonly id: string;
  readonly label: string;
  readonly language: string;
  readonly default?: boolean;
}
/** A chapter marker. */
export interface Chapter {
  readonly id: string;
  readonly title: string;
  readonly startTime: number;
  readonly endTime?: number;
  readonly thumbnail?: string;
}
/** A single thumbnail preview entry. */
export interface ThumbnailCue {
  readonly startTime: number;
  readonly endTime: number;
  readonly url: string;
  readonly width?: number;
  readonly height?: number;
}
/** A full thumbnail track (sprite sheet or individual images). */
export interface ThumbnailTrack {
  readonly cues: readonly ThumbnailCue[];
  readonly spriteUrl?: string;
}
/** Resume-playback configuration. */
export interface ResumeOptions {
  readonly enabled?: boolean;
  readonly key?: string;
  readonly storage?: Storage;
  readonly minDuration?: number;
}
/** Vendor-neutral analytics payload. */
export interface AnalyticsEvent {
  readonly type: string;
  readonly at: number;
  readonly position: number;
  readonly duration: number;
  readonly source: string | null;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
/** Analytics configuration. */
export interface AnalyticsOptions {
  readonly enabled?: boolean;
  readonly onEvent?: (event: AnalyticsEvent) => void;
}
/** Strings rendered by the built-in UI. */
export interface PlayerStrings {
  readonly play: string;
  readonly pause: string;
  readonly mute: string;
  readonly unmute: string;
  readonly fullscreen: string;
  readonly exitFullscreen: string;
  readonly settings: string;
  readonly quality: string;
  /** Accessible label for the lower-quality step button. */
  readonly qualityLower?: string;
  /** Accessible label for the higher-quality step button. */
  readonly qualityHigher?: string;
  readonly speed: string;
  readonly captions: string;
  readonly captionsOff: string;
  readonly subtitles: string;
  readonly audioTrack: string;
  readonly audio: string;
  readonly auto: string;
  readonly off: string;
  readonly on: string;
  readonly live: string;
  readonly seek: string;
  readonly volume: string;
  readonly pictureInPicture: string;
  readonly error: string;
  readonly loading: string;
  readonly chapters: string;
  readonly playlist: string;
  readonly next: string;
  readonly previous: string;
  readonly replay: string;
  readonly playNext: string;
  readonly loop: string;
  readonly autoplay: string;
  readonly autoplayNext: string;
  readonly stats: string;
  readonly statsForNerds: string;
  readonly shortcuts: string;
  readonly keyboardShortcuts: string;
  readonly close: string;
  readonly submit: string;
  readonly skip: string;
  readonly required: string;
  readonly correct: string;
  readonly incorrect: string;
  readonly retake: string;
  readonly done: string;
  readonly survey: string;
  readonly feedback: string;
  readonly review: string;
  readonly quiz: string;
  readonly thankYou: string;
  readonly zoomIn: string;
  readonly zoomOut: string;
  readonly resetZoom: string;
  readonly rotate: string;
  readonly download: string;
  readonly share: string;
  readonly copyLink: string;
  readonly copied: string;
  /** Share menu label for the iframe embed action. */
  readonly embed?: string;
  /** Share menu label for the copy-embed action. */
  readonly copyEmbed?: string;
  /** Success message after copying an iframe embed snippet. */
  readonly embedCopied?: string;
  /** Message shown when the current media has no shareable link. */
  readonly shareUnavailable?: string;
  readonly retry: string;
  readonly liveEdge: string;
  readonly goLive: string;
  readonly cast: string;
  /** Message shown while the browser is opening its cast/AirPlay picker. */
  readonly castPrompt?: string;
  /** Message shown when no cast/AirPlay receiver can be opened. */
  readonly castUnavailable?: string;
  readonly airplay: string;
  /** Message shown when the environment blocks fullscreen. */
  readonly fullscreenUnavailable?: string;
  readonly moreOptions: string;
  readonly captionSize: string;
  readonly captionColor: string;
  readonly captionBackground: string;
  readonly captionEdge: string;
  readonly default: string;
  readonly buffered: string;
  readonly resolution: string;
  readonly frames: string;
  readonly network: string;
  readonly elapsedTime: string;
  readonly remainingTime: string;
  readonly totalTime: string;
  readonly sleepTimer: string;
  readonly sleepTimerEnded: string;
  readonly normal: string;
  readonly minutes: string;
}
/** A snapshot of everything the UI needs to render. */
export interface PlayerState {
  readonly status: PlayerStatus;
  readonly source: PlayerSource | null;
  readonly kind: MediaKind | null;
  readonly capabilities: PlayerCapabilities;
  readonly currentTime: number;
  readonly duration: number;
  readonly buffered: number;
  readonly volume: number;
  readonly muted: boolean;
  readonly playbackRate: number;
  readonly playing: boolean;
  readonly ended: boolean;
  readonly seeking: boolean;
  readonly live: boolean;
  readonly fullscreen: boolean;
  readonly pictureInPicture: boolean;
  readonly quality: string | null;
  readonly qualities: readonly QualityLevel[];
  readonly textTrack: TextTrackInfo | null;
  readonly textTracks: readonly TextTrackInfo[];
  readonly audioTrack: AudioTrackInfo | null;
  readonly audioTracks: readonly AudioTrackInfo[];
  readonly chapters: readonly Chapter[];
  readonly activeChapter: Chapter | null;
  readonly playlist: PlaylistStatus | null;
  readonly survey: SurveyConfig | null;
  readonly surveyOpen: boolean;
  readonly error: Error | null;
}
/** Events emitted by the player. */
export interface PlayerEvents {
  readonly statechange: PlayerState;
  readonly loadstart: {
    readonly source: PlayerSource;
    readonly kind: MediaKind;
  };
  readonly loadedmetadata: {
    readonly duration: number;
    readonly width: number;
    readonly height: number;
    readonly live: boolean;
  };
  readonly durationchange: {
    readonly duration: number;
    readonly live: boolean;
  };
  readonly play: void;
  readonly playing: void;
  readonly pause: void;
  readonly timeupdate: {
    readonly currentTime: number;
    readonly duration: number;
    readonly buffered: number;
  };
  readonly progress: {
    readonly buffered: number;
  };
  readonly seeking: {
    readonly currentTime: number;
  };
  readonly seeked: {
    readonly currentTime: number;
  };
  readonly waiting: void;
  readonly canplay: void;
  readonly ended: void;
  readonly volumechange: {
    readonly volume: number;
    readonly muted: boolean;
  };
  readonly ratechange: {
    readonly playbackRate: number;
  };
  readonly qualitychange: {
    readonly quality: string | null;
  };
  readonly texttrackchange: {
    readonly track: TextTrackInfo | null;
  };
  readonly audiotrackchange: {
    readonly track: AudioTrackInfo | null;
  };
  readonly chapterchange: {
    readonly chapter: Chapter | null;
  };
  readonly playlistchange: {
    readonly index: number;
    readonly item: PlaylistItem | null;
    readonly status: PlaylistStatus | null;
  };
  readonly surveyopen: {
    readonly survey: SurveyConfig;
  };
  readonly surveysubmit: {
    readonly survey: SurveyConfig;
    readonly answers: SurveyAnswers;
    readonly result: SurveySubmission;
  };
  readonly surveyskip: {
    readonly survey: SurveyConfig;
    readonly result: SurveySubmission;
  };
  readonly surveyclose: {
    readonly survey: SurveyConfig;
    readonly reason: "submitted" | "skipped" | "closed";
  };
  readonly fullscreenchange: {
    readonly fullscreen: boolean;
  };
  readonly pictureinpicturechange: {
    readonly pictureInPicture: boolean;
  };
  readonly error: {
    readonly error: Error;
  };
  readonly destroy: void;
}
/** A discriminated union of every event. */
export type PlayerEvent = { [K in keyof PlayerEvents]: {
  readonly type: K;
  readonly detail: PlayerEvents[K];
}; }[keyof PlayerEvents];
/** Optional capabilities advertised by an engine. */
export interface PlayerCapabilities {
  readonly play: boolean;
  readonly pause: boolean;
  readonly seek: boolean;
  readonly volume: boolean;
  readonly playbackRate: boolean;
  readonly fullscreen: boolean;
  readonly pictureInPicture: boolean;
  readonly textTracks: boolean;
  readonly audioTracks: boolean;
  readonly quality: boolean;
  readonly live: boolean;
}
/** Construction options for {@link UniversalPlayer}. */
export interface PlayerOptions {
  /** Element that owns the player surface. */
  readonly container: HTMLElement;
  /** Initial source. Omit it to call `load()` later. */
  readonly source?: PlayerSourceInput;
  /** Accessible label for the player region. */
  readonly label?: string;
  /** `custom` (default) or `native` browser controls. */
  readonly controls?: ControlsMode;
  /** Theme used by the built-in UI. */
  readonly theme?: ThemeMode;
  /** Fine-grained built-in UI configuration (controls, menus, gestures, tokens). */
  readonly ui?: UIOptions;
  /** BCP 47 locale used to resolve built-in strings. */
  readonly locale?: string;
  /** String overrides for the built-in UI. */
  readonly strings?: Partial<PlayerStrings>;
  readonly autoplay?: boolean;
  readonly muted?: boolean;
  readonly loop?: boolean;
  readonly preload?: PreloadMode;
  readonly poster?: string;
  readonly crossOrigin?: "anonymous" | "use-credentials" | null;
  readonly playsInline?: boolean;
  readonly volume?: number;
  readonly playbackRate?: number;
  readonly startTime?: number;
  readonly live?: boolean;
  readonly qualities?: readonly QualityLevel[];
  readonly textTracks?: readonly TextTrackInfo[];
  readonly audioTracks?: readonly AudioTrackInfo[];
  readonly chapters?: readonly Chapter[];
  readonly thumbnails?: ThumbnailTrack;
  readonly captions?: CaptionsOptions;
  readonly survey?: SurveySource;
  readonly playlist?: PlaylistOptions;
  readonly image?: ImageOptions;
  /** Enable the built-in keyboard shortcuts. Defaults to true. */
  readonly keyboard?: boolean;
  /** Toggle playback when the media surface is clicked. Defaults to true. */
  readonly clickToPlay?: boolean;
  /** Enter fullscreen on a double click. Defaults to true. */
  readonly doubleClickFullscreen?: boolean;
  /** Hide the control bar while playing. Defaults to true. */
  readonly autoHideControls?: boolean;
  /** Seconds skipped by the arrow/J/L shortcuts. Defaults to 5/10. */
  readonly seekStep?: number;
  /** Volume step for the arrow shortcuts. Defaults to 0.1. */
  readonly volumeStep?: number;
  readonly resume?: ResumeOptions;
  readonly analytics?: AnalyticsOptions;
  readonly onStateChange?: (state: PlayerState) => void;
  readonly onEvent?: (event: PlayerEvent) => void;
}
/** Removes a listener. */
export type Unsubscribe = () => void;
//# sourceMappingURL=types.d.ts.map