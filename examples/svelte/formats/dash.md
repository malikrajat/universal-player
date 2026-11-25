# MPEG-DASH (.mpd) in Svelte

> [Examples home](../../README.md) › [Svelte](../README.md) › [Formats](./README.md) › MPEG-DASH (.mpd)

MPEG-DASH is selected by the `.mpd` extension. The engine lazily imports `dashjs`, reads the video representation ladder, and maps auto quality to `null`.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /svelte4 or /svelte5 (component) or /ui (custom element) |
| Adapter id | `dash` |
| Factory | `createDashEngine` (internal; not exported) |
| Extensions / input | .mpd |
| MIME | application/dash+xml |
| Unit | `<video>` + dash.js |
| Status | Implemented; requires `dashjs` |
| Rendering | video |
| Capabilities | Native caps plus quality (representations) |

## Basic usage

### Import and create

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>
```

There is no adapter to select. `dash` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `"/media/manifest.mpd"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.mpd", { type: "application/dash+xml" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```svelte
<script lang="ts">
  import PlayerElement from "./PlayerElement.svelte";
</script>

<PlayerElement source={"/media/manifest.mpd"} />
```

### Headless (native controls)

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src={"/media/manifest.mpd"} controls="native" />
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
| `live` | `boolean` | `false` | HLS low-latency mode / UI live hint |
| `qualities` | `QualityLevel[]` | `[]` | Fallback/embed ladder |

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
await player.load("/media/manifest.mpd");
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

- Supports dash.js 4.x and 5.x ladder APIs. No DRM. If `MediaPlayer` is missing, the engine tries native playback.
- dash.js is an optional peer. The package declares `^5.0.0` but the adapter also calls 4.x methods when present.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.

- The SDK is an optional peer; a missing install fails at load.


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

[Svelte basic](../basic-usage.md) · [Svelte advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
