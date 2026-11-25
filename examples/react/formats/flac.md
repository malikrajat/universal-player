# FLAC in React

> [Examples home](../../README.md) › [React](../README.md) › [Formats](./README.md) › FLAC

FLAC is in the audio extension table and plays through the native engine when the browser decodes it.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /react (component + hook) or /ui (custom element) |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal; not exported) |
| Extensions / input | .flac |
| MIME | audio/flac |
| Unit | `<audio>` |
| Status | Implemented; browser codec support varies |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate |

## Basic usage

### Import and create

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";
```

There is no adapter to select. `native` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `"/media/sample.flac"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.flac", { type: "audio/flac" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```tsx
import { PlayerElement } from "./PlayerElement";

export function Example() {
  return <PlayerElement source={"/media/sample.flac"} />;
}
```

### Headless (native controls)

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Headless() {
  return <UniversalPlayer source={"/media/sample.flac"} controls="native" />;
}
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
await player.load("/media/sample.flac");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- React: keep `source` referentially stable; use `addEventListener` for custom-element events.

## Edge cases

- Firefox and Chromium support FLAC; Safari support depends on the OS version. No fallback decoder is bundled.
- Offer an AAC/MP3 fallback for Safari if FLAC is a hard requirement.
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

[React basic](../basic-usage.md) · [React advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
