# JPEG in Vue

> [Examples home](../../README.md) › [Vue](../README.md) › [Formats](./README.md) › JPEG

JPEG resolves to the still-image engine. The player renders an `<img>` with `decoding="async"`, `loading="eager"`, and the element's `alt` attribute.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /vue (component + composable) or /ui (custom element) |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal; not exported) |
| Extensions / input | .jpg, .jpeg |
| MIME | image/jpeg |
| Unit | `<img>` |
| Status | Implemented |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |

## Basic usage

### Import and create

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>
```

There is no adapter to select. `image` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `"/media/sample.jpg"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.jpg", { type: "image/jpeg" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```vue
<script setup lang="ts">
import PlayerElement from "./PlayerElement.vue";
const source = "/media/sample.jpg";
</script>

<template>
  <PlayerElement :source="source" />
</template>
```

### Headless (native controls)

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
const source = "/media/sample.jpg";
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
| `image` | `ImageOptions` | zoom/rotate on | UI-only image controls |

### Document surface

| Call | Behaviour |
| --- | --- |
| `load(source)` | Renders an `<img>` and emits `loadedmetadata` with natural size |
| `play()`, `pause()`, `seek()` | No-ops |
| `setVolume()`, `setMuted()`, `setPlaybackRate()` | No-ops |
| `mediaElement` | The `HTMLImageElement` |
| `state.capabilities` | `IMAGE_CAPABILITIES` (fullscreen only) |
| `destroy()` | Removes the image and revokes any object URL |

### Copy-paste calls

```ts
await player.load("/media/sample.jpg");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Vue: configure `isCustomElement` for the tag; `src` is the component prop.

## Edge cases

- The image engine has no play/seek/volume/rate. The alt text comes from `ImageSource.alt` or an empty string.
- An image in a source array becomes a gallery; set `image.slideDuration` to auto-advance.
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

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
