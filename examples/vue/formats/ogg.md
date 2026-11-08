# Ogg / Oga in Vue

> [Examples home](../../README.md) › [Vue](../README.md) › [Formats](./README.md) › Ogg / Oga

Ogg support is real but the kind detection is extension-led. `.ogg` and `.ogv` are treated as video, `.oga` as audio.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /vue (component + composable) or /ui (custom element) |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) (internal, not exported) |
| Extensions / input | .ogg, .oga, .ogv |
| MIME | audio/ogg, video/ogg |
| Unit | `<audio>` or `<video>` |
| Status | Implemented with an extension-based kind trap |
| Rendering | audio (`.oga`) or video (`.ogg`) |
| Capabilities | Whatever the native element exposes |

## Basic usage

### Import and create

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>
```

There is no adapter to select. `native` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `{ kind: "audio", src: "/media/sample.oga" }` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.ogg", { type: "audio/ogg, video/ogg" })` |
| Structured | Required for this input |

### Full viewer (built-in UI)

```vue
<script setup lang="ts">
import PlayerElement from "./PlayerElement.vue";
</script>

<template>
  <PlayerElement :source="{ kind: "audio", src: "/media/sample.oga" }" />
</template>
```

### Headless (native controls)

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer :src="{ kind: "audio", src: "/media/sample.oga" }" controls="native" />
</template>
```

## Advanced usage

### Options

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `source` | `PlayerSourceInput` | required in practice | The URL/File/structured source |
| `controls` | `"custom" | "native"` | `"custom"` | Headless surfaces render no chrome |
| `preload` | `"none" | "metadata" | "auto"` | `"metadata"` | Native/HLS/DASH/chunked |
| `crossOrigin` | `"anonymous" | "use-credentials" | null` | not set | CORS mode |
| `poster` | `string` | — | Video/audio artwork |

### Document surface

| Call | Behaviour |
| --- | --- |
| `play()`, `pause()`, `seek(t)` | Media element control |
| `setVolume(0–1)`, `setMuted` | Media element control |
| `setPlaybackRate(0.25–4)` | Media element control |
| `setQuality(id \| null)` | hls.js level / dash.js representation; `null` = auto |
| `setTextTrack(id \| null)`, `setAudioTrack(id \| null)` | Native track selection |
| `state.qualities`, `state.textTracks`, `state.audioTracks` | Discovered after metadata |
| `retry()` | Reloads the current source |

### Copy-paste calls

```ts
await player.load({ kind: "audio", src: "/media/sample.oga" });
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Vue: configure `isCustomElement` for the tag; `src` is the component prop.

## Edge cases

- `.ogg` is in the video extension set, so an audio-only `.ogg` is classified as video and gets a `<video>` element. Use `.oga` for audio or pass a structured source with `kind: "audio"`.
- This is the clearest example of why explicit structured sources are safer than bare URLs.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.




## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `media-error` | Decode/load/SDK failure | Fix and `retry()` |

```ts
player.on("error", ({ error }) => console.error((error as { code?: string }).code));
```

## Limitations to communicate

- No transcoding; the browser must decode it.
- No DRM.
- No metadata extraction.
- Verification is unit routing plus browser reality, not a codec lab.

## Checklist

- [ ] Source is correct for this input.
- [ ] Peer installed if conditional.
- [ ] UI track chosen (full vs native vs custom).
- [ ] Error listener attached.
- [ ] Teardown implemented.
- [ ] Tested in your target browser.

## Related

[Vue basic](../basic-usage.md) · [Vue advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)
