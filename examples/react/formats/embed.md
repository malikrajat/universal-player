# Generic iframe embed in React

> [Examples home](../../README.md) › [React](../README.md) › [Formats](./README.md) › Generic iframe embed

A generic embed renders the URL in a sandboxed-by-permissions iframe (`allow="autoplay; fullscreen; picture-in-picture; encrypted-media"`). It is a display surface, not a controllable player.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /react (component + hook) or /ui (custom element) |
| Adapter id | `generic-embed` |
| Factory | `createEmbedEngine` (internal; not exported) |
| Extensions / input | Any non-YouTube/Vimeo URL passed as `{ kind: "embed" }` |
| MIME | text/html (iframe) |
| Unit | `<iframe>` |
| Status | Implemented; no command bridge |
| Rendering | embed |
| Capabilities | Declared play/pause/seek/volume/rate/fullscreen; calls are no-ops for `generic` |

## Basic usage

### Import and create

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";
```

There is no adapter to select. `generic-embed` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `{ kind: "embed", provider: "generic", src: "https://example.com/embed/player" }` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.embed", { type: "text/html (iframe)" })` |
| Structured | Required for this input |

### Full viewer (built-in UI)

```tsx
import { PlayerElement } from "./PlayerElement";

export function Example() {
  return <PlayerElement source={{ kind: "embed", provider: "generic", src: "https://example.com/embed/player" }} />;
}
```

### Headless (native controls)

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Headless() {
  return <UniversalPlayer source={{ kind: "embed", provider: "generic", src: "https://example.com/embed/player" }} controls="native" />;
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
| `play()`, `pause()`, `seek()` | **No-ops**; the generic bridge posts nothing |
| `setVolume()`, `setMuted()`, `setPlaybackRate()` | **No-ops** |
| `syncTime()` | Emits the last known values; no provider query |
| `mediaElement` | The `HTMLIFrameElement` |
| `state` | Stays at initial values unless the page posts messages |

### Copy-paste calls

```ts
await player.load({ kind: "embed", provider: "generic", src: "https://example.com/embed/player" });
// Display only: these calls do not reach the embedded page.
player.play();
player.pause();
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- React: keep `source` referentially stable; use `addEventListener` for custom-element events.

## Edge cases

- The generic provider posts nothing to the iframe. `play()`, `pause()`, `seek()`, volume and rate cannot control the embedded document. State stays at the initial values until the page posts messages (it will not).
- Do not advertise generic embeds as controllable. Use a provider-specific integration if you need commands.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.
- Generic embeds are display-only; commands are no-ops.



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
