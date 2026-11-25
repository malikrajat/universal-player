# MP4 / M4V in Vue

> [Examples home](../../README.md) › [Vue](../README.md) › [Formats](./README.md) › MP4 / M4V

MP4 is the default native path. A URL string ending in `.mp4` or `.m4v`, a structured `{ kind: "video", src }` object, a `File`/`Blob` with `video/mp4`, and a `MediaStream` all resolve to the native engine.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /vue (component + composable) or /ui (custom element) |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal; not exported) |
| Extensions / input | .mp4, .m4v |
| MIME | video/mp4 |
| Unit | `<video>` |
| Status | Implemented; codec support is the browser's |
| Rendering | video |
| Capabilities | play, pause, seek, volume, rate, fullscreen, PiP, text tracks, audio tracks, live |

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
| Static asset | `"/media/sample.mp4"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.mp4", { type: "video/mp4" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```vue
<script setup lang="ts">
import PlayerElement from "./PlayerElement.vue";
const source = "/media/sample.mp4";
</script>

<template>
  <PlayerElement :source="source" />
</template>
```

### Headless (native controls)

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
const source = "/media/sample.mp4";
</script>

<template>
  <UniversalPlayer :src="source" controls="native" />
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
await player.load("/media/sample.mp4");
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

- The player does not transcode. H.264/AAC plays in mainstream browsers; HEVC/AV1 and 10-bit depend on the browser and OS.
- Use MP4 when you need the widest browser and hardware-decoding coverage. Keep a WebM rendition only if you actually need VP9/AV1.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.




## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `media-error` | Decode/load/SDK failure | Fix and `retry()` |
| `unsupported-environment` | Missing browser API or HLS support | Fix the input/fallback |

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

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
