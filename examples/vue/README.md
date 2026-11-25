# Vue

> [Examples home](../README.md) › [Vue](./README.md) › Vue

## What this integration gives you

- One core player mounted into a host element.
- State and 29 events.
- Source-change detection and teardown handled by the wrapper (or by you for vanilla).
- All media kinds: video, audio, images, embeds, chunked.

## What it does not give you

- **No built-in control bar.** `<universal-player>` via `/ui` (configure `isCustomElement`) is the path to the full UI.
- No framework-specific theming. The UI uses CSS variables.
- No extra features beyond the core API.

## Install

```bash
pnpm add file:/absolute/path/to/universal-player
pnpm add vue
```

## Quick start — full UI

```vue
<!-- PlayerElement.vue -->
<script setup lang="ts">
import "@codewithrajat/universal-player/ui";
import type { PlayerSourceInput } from "@codewithrajat/universal-player/core";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{ source: PlayerSourceInput }>();
const element = ref<HTMLElement | null>(null);

function load(source: PlayerSourceInput) {
  void (element.value as (HTMLElement & { load(s: PlayerSourceInput): Promise<void> }) | null)?.load(source);
}

onMounted(() => load(props.source));
watch(() => props.source, load);
</script>

<template>
  <universal-player ref="element" controls="custom"></universal-player>
</template>
```

Configure the Vue compiler: `isCustomElement: (tag) => tag === "universal-player"`.

```vue
<script setup lang="ts">
import PlayerElement from "./PlayerElement.vue";
const source = "/media/sample.mp4";
</script>

<template>
  <PlayerElement :source="source" />
</template>
```

## Quick start — headless

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
const source = "/media/sample.mp4";
</script>

<template>
  <UniversalPlayer :src="source" controls="native" />
</template>
```

## Identity and lifecycle rules

- `MaybeRef` inputs; connect on mounted, destroy on beforeUnmount
- Create one player per mount; never per render.
- Destroy on unmount. 
- Keep source objects referentially stable where the adapter uses `sourceToken`.

## Reactivity after mount

| Change | React | Vue | Angular | Svelte |
| --- | --- | --- | --- | --- |
| source | yes (`sourceToken`) | yes | yes (`sourceToken`) | yes |
| volume | yes | yes | yes | no |
| muted | yes | yes | yes | no |
| playbackRate | yes | yes | yes | no |
| other options | no | no | no | no |

If you need a different option later, recreate the player or use the core setters.

## API at a glance

| Type | Members |
| --- | --- |
| Options | `src/source`, controls, theme, locale, autoplay, muted, loop, poster, volume, playbackRate, chapters, thumbnails, captions, survey, playlist, keyboard, clickToPlay, autoHideControls, seekStep, volumeStep |
| Methods | play, pause, seek, load |
| Events | ready/loadedmetadata, play, pause, timeupdate, ended, error, statechange |
| Teardown | wrapper-owned (or `destroy()`) |

## Formats

[MP4 / M4V](./formats/mp4.md) · [WebM](./formats/webm.md) · [QuickTime MOV](./formats/mov.md) · [Matroska MKV](./formats/mkv.md) · [HLS (.m3u8)](./formats/hls.md) · [MPEG-DASH (.mpd)](./formats/dash.md) · [MP3](./formats/mp3.md) · [M4A / AAC audio](./formats/m4a.md) · [WAV](./formats/wav.md) · [FLAC](./formats/flac.md) · [Ogg / Oga](./formats/ogg.md) · [AAC (raw)](./formats/aac.md) · [JPEG](./formats/jpg.md) · [GIF](./formats/gif.md) · [PNG](./formats/png.md) · [WebP](./formats/webp.md) · [SVG](./formats/svg.md) · [AVIF](./formats/avif.md) · [YouTube](./formats/youtube.md) · [Vimeo](./formats/vimeo.md) · [Generic iframe embed](./formats/embed.md) · [Chunked / streamed media](./formats/chunked.md) · [Blob and File](./formats/blob.md)

## Features

[Captions and subtitles](./formats/features/captions.md) · [Chapters](./formats/features/chapters.md) · [Playlist and queue](./formats/features/playlist.md) · [Quality selection](./formats/features/quality.md) · [Resume playback](./formats/features/resume.md) · [Survey, feedback, review and quiz](./formats/features/survey.md)

## Known limitations

- Vue 3.5.44 in devDependencies; Vue 2.7 not exercised in this repo
- No built-in controls on this entry.
- No SSR rendering; see [SSR](../guides/ssr.md).
- No DRM, OCR, document rendering or plugin registry.

## Next

[Basic usage](./basic-usage.md) · [Advanced usage](./advanced-usage.md) · [Customization](./customization.md) · [Edge cases](./edge-cases.md) · [Failure cases](./failure-cases.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
