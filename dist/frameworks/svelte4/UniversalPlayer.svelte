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

  export let src: PlayerSourceInput | undefined = undefined;
  export let controls: "custom" | "native" | undefined = undefined;
  export let theme: "light" | "dark" | "system" | undefined = undefined;
  export let locale: string | undefined = undefined;
  export let autoplay: boolean | undefined = undefined;
  export let muted: boolean | undefined = undefined;
  export let loop: boolean | undefined = undefined;
  export let poster: string | undefined = undefined;
  export let volume: number | undefined = undefined;
  export let playbackRate: number | undefined = undefined;
  export let label: string | undefined = undefined;
  export let chapters: readonly Chapter[] | undefined = undefined;
  export let thumbnails: ThumbnailTrack | undefined = undefined;
  export let captions: CaptionsOptions | undefined = undefined;
  export let survey: SurveySource | undefined = undefined;
  export let playlist: PlaylistOptions | undefined = undefined;
  export let keyboard: boolean | undefined = undefined;
  export let clickToPlay: boolean | undefined = undefined;
  export let autoHideControls: boolean | undefined = undefined;
  export let seekStep: number | undefined = undefined;
  export let volumeStep: number | undefined = undefined;

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

  $: if (player !== null && src !== undefined) {
    void player.load(src).catch(() => {
      // Failures are surfaced through the error event and state.
    });
  }
</script>

<div
  bind:this={host}
  data-up-framework="svelte4"
  data-up-status={state?.status ?? "idle"}
></div>
