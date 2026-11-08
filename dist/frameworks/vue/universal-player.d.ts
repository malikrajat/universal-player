import { UniversalPlayer as UniversalPlayer$1 } from "../../core/player.js";
import { CaptionsOptions, Chapter, ControlsMode, PlayerOptions, PlayerSourceInput, PlayerState, PlaylistOptions, SurveySource, ThemeMode, ThumbnailTrack } from "../../core/types.js";
import { PropType } from "vue";
export type MaybeRef<T> = T | {
  readonly value: T;
};
export type PlayerOptionKey = keyof Omit<PlayerOptions, "container">;
/** Reactive inputs accepted by the Vue composable. */
export type UseUniversalPlayerOptions = { readonly [K in PlayerOptionKey]?: MaybeRef<Omit<PlayerOptions, "container">[K]>; } & {
  readonly host: MaybeRef<HTMLElement | null>;
};
/** Result returned by {@link useUniversalPlayer}. */
export interface UseUniversalPlayerResult {
  readonly state: {
    readonly value: PlayerState;
  };
  readonly player: {
    readonly value: UniversalPlayer$1 | null;
  };
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  load(source: PlayerSourceInput): Promise<void>;
  destroy(): void;
}
/**
 * Creates and maintains one player for the lifetime of a Vue component.
 *
 * Works with Vue 2.7 and Vue 3 through the shared Composition API surface.
 */
export declare function useUniversalPlayer(options: UseUniversalPlayerOptions): UseUniversalPlayerResult;
/**
 * Vue host component.
 *
 * The same component works in Vue 2.7 and Vue 3.
 */
export declare const UniversalPlayer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
  src: {
    type: PropType<PlayerSourceInput>;
    default: undefined;
  };
  controls: {
    type: PropType<ControlsMode>;
    default: undefined;
  };
  theme: {
    type: PropType<ThemeMode>;
    default: undefined;
  };
  locale: {
    type: StringConstructor;
    default: undefined;
  };
  autoplay: {
    type: BooleanConstructor;
    default: undefined;
  };
  muted: {
    type: BooleanConstructor;
    default: undefined;
  };
  loop: {
    type: BooleanConstructor;
    default: undefined;
  };
  poster: {
    type: StringConstructor;
    default: undefined;
  };
  volume: {
    type: NumberConstructor;
    default: undefined;
  };
  playbackRate: {
    type: NumberConstructor;
    default: undefined;
  };
  chapters: {
    type: PropType<readonly Chapter[]>;
    default: undefined;
  };
  thumbnails: {
    type: PropType<ThumbnailTrack>;
    default: undefined;
  };
  captions: {
    type: PropType<CaptionsOptions>;
    default: undefined;
  };
  survey: {
    type: PropType<SurveySource>;
    default: undefined;
  };
  playlist: {
    type: PropType<PlaylistOptions>;
    default: undefined;
  };
  keyboard: {
    type: BooleanConstructor;
    default: boolean;
  };
  clickToPlay: {
    type: BooleanConstructor;
    default: boolean;
  };
  autoHideControls: {
    type: BooleanConstructor;
    default: boolean;
  };
  seekStep: {
    type: NumberConstructor;
    default: undefined;
  };
  volumeStep: {
    type: NumberConstructor;
    default: undefined;
  };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("ready" | "play" | "pause" | "timeupdate" | "ended" | "error" | "statechange")[], "ready" | "play" | "pause" | "timeupdate" | "ended" | "error" | "statechange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
  src: {
    type: PropType<PlayerSourceInput>;
    default: undefined;
  };
  controls: {
    type: PropType<ControlsMode>;
    default: undefined;
  };
  theme: {
    type: PropType<ThemeMode>;
    default: undefined;
  };
  locale: {
    type: StringConstructor;
    default: undefined;
  };
  autoplay: {
    type: BooleanConstructor;
    default: undefined;
  };
  muted: {
    type: BooleanConstructor;
    default: undefined;
  };
  loop: {
    type: BooleanConstructor;
    default: undefined;
  };
  poster: {
    type: StringConstructor;
    default: undefined;
  };
  volume: {
    type: NumberConstructor;
    default: undefined;
  };
  playbackRate: {
    type: NumberConstructor;
    default: undefined;
  };
  chapters: {
    type: PropType<readonly Chapter[]>;
    default: undefined;
  };
  thumbnails: {
    type: PropType<ThumbnailTrack>;
    default: undefined;
  };
  captions: {
    type: PropType<CaptionsOptions>;
    default: undefined;
  };
  survey: {
    type: PropType<SurveySource>;
    default: undefined;
  };
  playlist: {
    type: PropType<PlaylistOptions>;
    default: undefined;
  };
  keyboard: {
    type: BooleanConstructor;
    default: boolean;
  };
  clickToPlay: {
    type: BooleanConstructor;
    default: boolean;
  };
  autoHideControls: {
    type: BooleanConstructor;
    default: boolean;
  };
  seekStep: {
    type: NumberConstructor;
    default: undefined;
  };
  volumeStep: {
    type: NumberConstructor;
    default: undefined;
  };
}>> & Readonly<{
  onReady?: (...args: any[]) => any;
  onPlay?: (...args: any[]) => any;
  onPause?: (...args: any[]) => any;
  onTimeupdate?: (...args: any[]) => any;
  onEnded?: (...args: any[]) => any;
  onError?: (...args: any[]) => any;
  onStatechange?: (...args: any[]) => any;
}>, {
  src: PlayerSourceInput;
  controls: ControlsMode;
  theme: ThemeMode;
  locale: string;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  poster: string;
  volume: number;
  playbackRate: number;
  chapters: readonly Chapter[];
  thumbnails: ThumbnailTrack;
  captions: CaptionsOptions;
  survey: SurveySource;
  playlist: PlaylistOptions;
  keyboard: boolean;
  clickToPlay: boolean;
  autoHideControls: boolean;
  seekStep: number;
  volumeStep: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=universal-player.d.ts.map