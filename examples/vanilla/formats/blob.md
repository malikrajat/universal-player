# Blob and File in Vanilla

> [Examples home](../../README.md) › [Vanilla](../README.md) › [Formats](./README.md) › Blob and File

`Blob` and `File` inputs are converted to object URLs. The object URL is owned by the player and revoked when the source changes or the player is destroyed.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /vanilla (headless helper) or /ui (custom element) |
| Adapter id | `native or image` |
| Factory | native/image engine (internal) (internal, not exported) |
| Extensions / input | No extension |
| MIME | From `Blob.type` |
| Unit | Object URL + `<video>`/`<audio>`/`<img>` |
| Status | Implemented |
| Rendering | video, audio or image (from MIME) |
| Capabilities | Same as the resolved kind |

## Basic usage

### Import and create

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";
```

There is no adapter to select. `native or image` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `file` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.blob", { type: "From `Blob.type`" })` |
| Structured | Required for this input |

### Full viewer (built-in UI)

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load(file);
</script>
```

### Headless (native controls)

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: file,
  controls: "native",
});

player.destroy();
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
await player.load(file);
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Vanilla: `mountUniversalPlayer()` is headless; use the element for the UI.

## Edge cases

- The player creates an object URL and revokes it on replace/destroy. An empty `Blob.type` defaults to video classification (`detectMediaKind` falls through to `video`).
- If you need an explicit kind for a type-less blob, build a structured source with a URL you own, or set `Blob.type` before loading.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.




## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `invalid-argument` | Bad source/id | Fix the input/fallback |
| `unsupported-environment` | Missing browser API or HLS support | Fix the input/fallback |
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

[Vanilla basic](../basic-usage.md) · [Vanilla advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)
