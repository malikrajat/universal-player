# M4A / AAC audio in Svelte

> [Examples home](../../README.md) › [Svelte](../README.md) › [Formats](./README.md) › M4A / AAC audio

M4A is classified as audio by extension and MIME. It plays through the native audio engine.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /svelte4 or /svelte5 (component) or /ui (custom element) |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal; not exported) |
| Extensions / input | .m4a |
| MIME | audio/mp4 |
| Unit | `<audio>` |
| Status | Implemented; codec support is the browser's |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate, fullscreen |

## Basic usage

### Import and create

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>
```

There is no adapter to select. `native` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `"/media/sample.m4a"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.m4a", { type: "audio/mp4" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```svelte
<script lang="ts">
  import PlayerElement from "./PlayerElement.svelte";
</script>

<PlayerElement source={"/media/sample.m4a"} />
```

### Headless (native controls)

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src={"/media/sample.m4a"} controls="native" />
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
await player.load("/media/sample.m4a");
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

- AAC in MP4 container is broadly supported; ALAC is not. No transcoding.
- For spoken-word content, also ship captions/transcript files; the player has no transcription feature.
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

[Svelte basic](../basic-usage.md) · [Svelte advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
