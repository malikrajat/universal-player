import type { SvelteComponent } from "svelte";
import type {
  CaptionsOptions,
  Chapter,
  PlaylistOptions,
  PlayerSourceInput,
  PlayerState,
  SurveySource,
  ThumbnailTrack,
} from "@codewithrajat/universal-player/core";

export interface UniversalPlayerProps {
  src?: PlayerSourceInput;
  controls?: "custom" | "native";
  theme?: "light" | "dark" | "system";
  locale?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  volume?: number;
  playbackRate?: number;
  label?: string;
  chapters?: readonly Chapter[];
  thumbnails?: ThumbnailTrack;
  captions?: CaptionsOptions;
  survey?: SurveySource;
  playlist?: PlaylistOptions;
  keyboard?: boolean;
  clickToPlay?: boolean;
  autoHideControls?: boolean;
  seekStep?: number;
  volumeStep?: number;
}

export default class UniversalPlayer extends SvelteComponent<UniversalPlayerProps> {
  $$events: {
    ready: CustomEvent<PlayerState>;
    play: CustomEvent<void>;
    pause: CustomEvent<void>;
    timeupdate: CustomEvent<{
      currentTime: number;
      duration: number;
      buffered: number;
    }>;
    ended: CustomEvent<void>;
    error: CustomEvent<Error>;
    statechange: CustomEvent<PlayerState>;
  };
}
