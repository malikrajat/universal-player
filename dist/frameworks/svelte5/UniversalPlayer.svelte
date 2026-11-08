<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import {
    UniversalPlayer,
    type CaptionsOptions,
    type Chapter,
    type PlaylistOptions,
    type PlayerSourceInput,
    type PlayerState,
    type SurveySource,
    type ThumbnailTrack,
  } from "@codewithrajat/universal-player/core";

  interface Props {
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

  let {
    src = undefined,
    controls = undefined,
    theme = undefined,
    locale = undefined,
    autoplay = undefined,
    muted = undefined,
    loop = undefined,
    poster = undefined,
    volume = undefined,
    playbackRate = undefined,
    label = undefined,
    chapters = undefined,
    thumbnails = undefined,
    captions = undefined,
    survey = undefined,
    playlist = undefined,
    keyboard = undefined,
    clickToPlay = undefined,
    autoHideControls = undefined,
    seekStep = undefined,
    volumeStep = undefined,
  }: Props = $props();

  const dispatch = createEventDispatcher<{
    ready: PlayerState;
    play: void;
    pause: void;
    timeupdate: { currentTime: number; duration: number; buffered: number };
    ended: void;
    error: Error;
    statechange: PlayerState;
  }>();

  let host: HTMLDivElement;
  let player: UniversalPlayer | null = null;
  let state: PlayerState | null = null;

  onMount(() => {
    player = new UniversalPlayer({
      container: host,
      ...(controls === undefined ? {} : { controls }),
      ...(theme === undefined ? {} : { theme }),
      ...(locale === undefined ? {} : { locale }),
      ...(autoplay === undefined ? {} : { autoplay }),
      ...(muted === undefined ? {} : { muted }),
      ...(loop === undefined ? {} : { loop }),
      ...(poster === undefined ? {} : { poster }),
      ...(volume === undefined ? {} : { volume }),
      ...(playbackRate === undefined ? {} : { playbackRate }),
      ...(label === undefined ? {} : { label }),
      ...(chapters === undefined ? {} : { chapters }),
      ...(thumbnails === undefined ? {} : { thumbnails }),
      ...(captions === undefined ? {} : { captions }),
      ...(survey === undefined ? {} : { survey }),
      ...(playlist === undefined ? {} : { playlist }),
      ...(keyboard === undefined ? {} : { keyboard }),
      ...(clickToPlay === undefined ? {} : { clickToPlay }),
      ...(autoHideControls === undefined ? {} : { autoHideControls }),
      ...(seekStep === undefined ? {} : { seekStep }),
      ...(volumeStep === undefined ? {} : { volumeStep }),
    });

    state = player.state;

    const unsubscribes = [
      player.on("statechange", (next) => {
        state = next;
        dispatch("statechange", next);
      }),
      player.on("loadedmetadata", () => {
        dispatch("ready", player?.state ?? state ?? ({} as PlayerState));
      }),
      player.on("play", () => dispatch("play")),
      player.on("pause", () => dispatch("pause")),
      player.on("timeupdate", (event) => dispatch("timeupdate", event)),
      player.on("ended", () => dispatch("ended")),
      player.on("error", (event) => dispatch("error", event.error)),
    ];

    return () => {
      for (const unsubscribe of unsubscribes) {
        unsubscribe();
      }

      player?.destroy();
      player = null;
    };
  });

  $effect(() => {
    if (player !== null && src !== undefined) {
      void player.load(src).catch(() => {
        // Failures are surfaced through the error event and state.
      });
    }
  });
</script>

<div
  bind:this={host}
  data-up-framework="svelte5"
  data-up-status={state?.status ?? "idle"}
></div>
