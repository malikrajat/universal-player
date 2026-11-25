# Vimeo in Svelte

> [Examples home](../../README.md) › [Svelte](../README.md) › [Formats](./README.md) › Vimeo

Vimeo URLs are detected by host and loaded through the Vimeo player iframe message protocol.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /svelte4 or /svelte5 (component) or /ui (custom element) |
| Adapter id | `vimeo` |
| Factory | `createVimeoEngine` (internal; not exported) |
| Extensions / input | Vimeo URL |
| MIME | text/html (iframe) |
| Unit | `<iframe>` |
| Status | Implemented with postMessage sync |
| Rendering | embed |
| Capabilities | play, pause, seek, volume, rate, fullscreen, quality (configured), live |

## Basic usage

### Import and create

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>
```

There is no adapter to select. `vimeo` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `{ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" }` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.vimeo", { type: "text/html (iframe)" })` |
| Structured | Required for this input |

### Full viewer (built-in UI)

```svelte
<script lang="ts">
  import PlayerElement from "./PlayerElement.svelte";
</script>

<PlayerElement source={{ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" }} />
```

### Headless (native controls)

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src={{ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" }} controls="native" />
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
| `qualities` | `QualityLevel[]` | `[]` | Fallback/embed ladder |

### Document surface

| Call | Behaviour |
| --- | --- |
| `play()`, `pause()`, `seek()` | Posts the provider command |
| `setVolume()`, `setMuted()`, `setPlaybackRate()` | Posts provider commands |
| `setQuality(id)` | Posts a quality command; `null` = default/auto |
| `syncTime()` | Requests an immediate time/duration refresh |
| `setTextTrack()`, `setAudioTrack()` | No track lists; calls are no-ops |
| `mediaElement` | The `HTMLIFrameElement` |
| `state.capabilities.pictureInPicture` | `false` |

### Copy-paste calls

```ts
await player.load({ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" });
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Svelte: use `/svelte4` or `/svelte5`; `src` is the prop.

## Edge cases

- No text/audio track lists; no PiP; private/domain-restricted videos may refuse to play.
- Vimeo numeric IDs are parsed from the last numeric path segment.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.




## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `invalid-argument` | Bad source/id | Fix the input/fallback |
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

[Svelte basic](../basic-usage.md) · [Svelte advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
