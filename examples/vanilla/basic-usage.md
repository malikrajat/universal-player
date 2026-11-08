# Basic usage

> [Examples home](../README.md) › [Vanilla](./README.md) › Basic usage

## Setup

```ts
// full-player.ts — one reusable full-UI wrapper
import "@codewithrajat/universal-player/ui";
import type { PlayerSourceInput } from "@codewithrajat/universal-player/core";

export function createFullPlayer(host: HTMLElement, source: PlayerSourceInput) {
  const element = document.createElement("universal-player");
  element.setAttribute("controls", "custom");
  element.setAttribute("theme", "dark");
  host.append(element);
  void element.load(source);
  return {
    element,
    destroy() {
      element.destroy();
      element.remove();
    },
  };
}
```

The wrapper is optional if you only need headless playback. It is the reliable way to get the built-in UI in this framework.

## Source variants

| Variant | How |
| --- | --- |
| Static asset | `"/media/sample.mp4"` |
| CDN URL | `"https://cdn.example.com/sample.mp4"` |
| Uploaded File/Blob | `player.load(file)` |
| In-memory ArrayBuffer | Wrap it: `new File([buffer], "sample.mp4", { type: "video/mp4" })` |
| Structured source | `{ kind: "audio", src: "/sample.oga" }` |
| Chunked | `{ kind, type, chunks: () => iterable }` |

## Per-format examples

### MP4 / M4V

MP4 is the default native path. A URL string ending in `.mp4` or `.m4v`, a structured `{ kind: "video", src }` object, a `File`/`Blob` with `video/mp4`, and a `MediaStream` all resolve to the native engine.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.mp4" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.mp4",
  controls: "native",
});

player.destroy();
```

**Key options:** `type`, `preload`, `crossOrigin`, `poster`, `playsInline`, `startTime`. **Limit:** The player does not transcode. H.264/AAC plays in mainstream browsers; HEVC/AV1 and 10-bit depend on the browser and OS.

[Full MP4 / M4V page](./formats/mp4.md)

### WebM

WebM resolves to the native video engine and is a good fit for open-codec delivery when every target browser supports VP9 or AV1.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.webm" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.webm",
  controls: "native",
});

player.destroy();
```

**Key options:** `type`, `preload`, `crossOrigin`, `poster`. **Limit:** VP8/VP9/Opus support varies; Safari support is version-dependent. No transcoding.

[Full WebM page](./formats/webm.md)

### QuickTime MOV

MOV is recognised by the extension/MIME table and routed to the native engine. There is no QuickTime demuxer in the package, so success depends entirely on the browser.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.mov" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.mov",
  controls: "native",
});

player.destroy();
```

**Key options:** `type`, `preload`, `crossOrigin`. **Limit:** Most browsers do not decode QuickTime containers. A `.mov` URL may fail with `media-error` even though the extension is recognised.

[Full QuickTime MOV page](./formats/mov.md)

### Matroska MKV

MKV is in the extension table so a `.mkv` URL is classified as video. That is detection, not playback support. The player has no demuxer.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.mkv" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.mkv",
  controls: "native",
});

player.destroy();
```

**Key options:** `type`, `preload`. **Limit:** Chromium/Firefox/Safari do not generally demux MKV in `<video>`. Expect `media-error`; use a server-side remux.

[Full Matroska MKV page](./formats/mkv.md)

### HLS (.m3u8)

HLS is selected by the `.m3u8` extension. The engine imports `hls.js` lazily, exposes its level ladder as `QualityLevel[]`, and falls back to native HLS when the browser reports support.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/master.m3u8" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/master.m3u8",
  controls: "native",
});

player.destroy();
```

**Key options:** `live`, `qualities` (fallback list), `captions.tracks`, `crossOrigin`. **Limit:** `hls.js` is a lazy optional peer. It uses `enableWorker: true`, `lowLatencyMode` from `live`, `backBufferLength: 90`. DRM is not supported.

[Full HLS (.m3u8) page](./formats/hls.md)

### MPEG-DASH (.mpd)

MPEG-DASH is selected by the `.mpd` extension. The engine lazily imports `dashjs`, reads the video representation ladder, and maps auto quality to `null`.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/manifest.mpd" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/manifest.mpd",
  controls: "native",
});

player.destroy();
```

**Key options:** `live`, `qualities`, `captions.tracks`. **Limit:** Supports dash.js 4.x and 5.x ladder APIs. No DRM. If `MediaPlayer` is missing, the engine tries native playback.

[Full MPEG-DASH (.mpd) page](./formats/dash.md)

### MP3

MP3 resolves to the native audio engine. The player renders an `<audio>` element and the built-in UI shows the audio visual instead of a video surface.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.mp3" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.mp3",
  controls: "native",
});

player.destroy();
```

**Key options:** `poster` (audio artwork in the UI), `preload`, `crossOrigin`. **Limit:** No waveform, no ID3 display. The built-in UI shows an animated audio visual.

[Full MP3 page](./formats/mp3.md)

### M4A / AAC audio

M4A is classified as audio by extension and MIME. It plays through the native audio engine.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.m4a" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.m4a",
  controls: "native",
});

player.destroy();
```

**Key options:** `preload`, `crossOrigin`. **Limit:** AAC in MP4 container is broadly supported; ALAC is not. No transcoding.

[Full M4A / AAC audio page](./formats/m4a.md)

### WAV

WAV is classified as audio and routed to the native engine. It is useful for short previews, not long-form delivery.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.wav" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.wav",
  controls: "native",
});

player.destroy();
```

**Key options:** `preload`, `crossOrigin`. **Limit:** Uncompressed files are large; there is no streaming optimisation beyond the browser.

[Full WAV page](./formats/wav.md)

### FLAC

FLAC is in the audio extension table and plays through the native engine when the browser decodes it.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.flac" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.flac",
  controls: "native",
});

player.destroy();
```

**Key options:** `preload`, `crossOrigin`. **Limit:** Firefox and Chromium support FLAC; Safari support depends on the OS version. No fallback decoder is bundled.

[Full FLAC page](./formats/flac.md)

### Ogg / Oga

Ogg support is real but the kind detection is extension-led. `.ogg` and `.ogv` are treated as video, `.oga` as audio.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load({ kind: "audio", src: "/media/sample.oga" });
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: { kind: "audio", src: "/media/sample.oga" },
  controls: "native",
});

player.destroy();
```

**Key options:** `type`, `kind` via a structured source. **Limit:** `.ogg` is in the video extension set, so an audio-only `.ogg` is classified as video and gets a `<video>` element. Use `.oga` for audio or pass a structured source with `kind: "audio"`.

[Full Ogg / Oga page](./formats/ogg.md)

### AAC (raw)

AAC is classified as audio. Browser support for raw ADTS streams is narrower than for M4A.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.aac" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.aac",
  controls: "native",
});

player.destroy();
```

**Key options:** `preload`, `crossOrigin`. **Limit:** Raw `.aac` (ADTS) is less consistently supported than AAC inside MP4/M4A. Prefer `.m4a`.

[Full AAC (raw) page](./formats/aac.md)

### JPEG

JPEG resolves to the still-image engine. The player renders an `<img>` with `decoding="async"`, `loading="eager"`, and the element's `alt` attribute.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.jpg" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.jpg",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.zoom`, `image.rotate`, `image.download`, `image.minZoom`, `image.maxZoom`, `image.slideDuration`. **Limit:** The image engine has no play/seek/volume/rate. The alt text comes from `ImageSource.alt` or an empty string.

[Full JPEG page](./formats/jpg.md)

### GIF

GIF is a still-image source to the player even when the file is animated. The engine renders an `<img>` and the UI exposes zoom/rotate/download.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.gif" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.gif",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.*`, `alt`. **Limit:** Animated GIF plays as the browser animates it. The player cannot pause, step or scrub frames.

[Full GIF page](./formats/gif.md)

### PNG

PNG is a still-image source and uses the same image engine as JPEG.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.png" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.png",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.*`, `alt`. **Limit:** Large PNGs decode on the main thread; no tile renderer or downscaling is provided.

[Full PNG page](./formats/png.md)

### WebP

WebP uses the image engine and inherits its zoom/rotate/download controls in the built-in UI.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.webp" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.webp",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.*`. **Limit:** Animated WebP plays as the browser animates it; the player has no frame controls.

[Full WebP page](./formats/webp.md)

### SVG

SVG is an image source. The engine creates an `<img>` element; it never injects SVG markup into the DOM.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.svg" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.svg",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.*`, `alt`. **Limit:** SVG is loaded through `<img>`, which does not run scripts or load external resources in the same way as an inline SVG. Still treat untrusted SVG as untrusted input.

[Full SVG page](./formats/svg.md)

### AVIF

AVIF uses the image engine. The player supplies no format negotiation; use `<picture>` yourself if you need fallbacks.

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/sample.avif" controls="custom"></universal-player>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: "/media/sample.avif",
  controls: "native",
});

player.destroy();
```

**Key options:** `image.*`. **Limit:** Decode support is recent; older browsers emit `media-error`. No fallback is generated.

[Full AVIF page](./formats/avif.md)

### YouTube

YouTube URLs are detected by host (`youtube.com`, `*.youtube.com`, `youtu.be`) and loaded in an iframe with the YouTube IFrame API message protocol.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load({ kind: "embed", provider: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID" });
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: { kind: "embed", provider: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID" },
  controls: "native",
});

player.destroy();
```

**Key options:** `autoplay`, `muted`, `controls`, `qualities`, `captions.enabled`. **Limit:** No text/audio track lists; no PiP; cross-origin playback depends on YouTube availability and embed policy. `youtube-nocookie.com` is not generated.

[Full YouTube page](./formats/youtube.md)

### Vimeo

Vimeo URLs are detected by host and loaded through the Vimeo player iframe message protocol.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load({ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" });
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: { kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" },
  controls: "native",
});

player.destroy();
```

**Key options:** `autoplay`, `muted`, `controls`, `qualities`. **Limit:** No text/audio track lists; no PiP; private/domain-restricted videos may refuse to play.

[Full Vimeo page](./formats/vimeo.md)

### Generic iframe embed

A generic embed renders the URL in a sandboxed-by-permissions iframe (`allow="autoplay; fullscreen; picture-in-picture; encrypted-media"`). It is a display surface, not a controllable player.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load({ kind: "embed", provider: "generic", src: "https://example.com/embed/player" });
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: { kind: "embed", provider: "generic", src: "https://example.com/embed/player" },
  controls: "native",
});

player.destroy();
```

**Key options:** `title`, `autoplay`, `muted`. **Limit:** The generic provider posts nothing to the iframe. `play()`, `pause()`, `seek()`, volume and rate cannot control the embedded document. State stays at the initial values until the page posts messages (it will not).

[Full Generic iframe embed page](./formats/embed.md)

### Chunked / streamed media

A `ChunkedSource` carries an ordered `Iterable`, `AsyncIterable`, or `ReadableStream` of `Blob | ArrayBuffer | ArrayBufferView | string` chunks. The engine chooses MSE or Blob.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load({ kind: "video", type: "video/mp4", chunks: () => iterable });
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: { kind: "video", type: "video/mp4", chunks: () => iterable },
  controls: "native",
});

player.destroy();
```

**Key options:** `kind`, `type`, `chunks`, `mode`, `chunkDelay`, `alt`. **Limit:** `mode: "auto"` tries MediaSource when `MediaSource.isTypeSupported(type)` and falls back to buffering a Blob. The chunk iterable is consumed once; pass a function returning a fresh iterable to reload.

[Full Chunked / streamed media page](./formats/chunked.md)

### Blob and File

`Blob` and `File` inputs are converted to object URLs. The object URL is owned by the player and revoked when the source changes or the player is destroyed.

```html
<universal-player id="player" controls="custom"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#player");
  void element.load(file);
</script>
```

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#player", {
  source: file,
  controls: "native",
});

player.destroy();
```

**Key options:** `source` accepts the Blob/File directly, `kind` cannot be overridden for a Blob. **Limit:** The player creates an object URL and revokes it on replace/destroy. An empty `Blob.type` defaults to video classification (`detectMediaKind` falls through to `video`).

[Full Blob and File page](./formats/blob.md)


## Feature basics

- [Captions and subtitles](./formats/features/captions.md) — No transcript panel, no OCR, no caption authoring. Track lists come from the media element or `captions.tracks`.
- [Chapters](./formats/features/chapters.md) — Chapters are data, not embedded metadata parsing. The player does not read chapter atoms from MP4 or HLS manifests.
- [Playlist and queue](./formats/features/playlist.md) — `autoAdvance` defaults to false. Completion gating uses `ended` or `currentTime >= duration - 0.25`. There is no server-side queue sync.
- [Quality selection](./formats/features/quality.md) — `setQuality(null)` means automatic. There is no ABR UI beyond the settings menu and `[`/`]`. Native MP4 has no quality ladder.
- [Resume playback](./formats/features/resume.md) — Best-effort. Disabled by default. Positions shorter than `minDuration` are not saved. It is not a cross-device progress service.
- [Survey, feedback, review and quiz](./formats/features/survey.md) — No built-in backend. Persistence is localStorage for `once`; callbacks are fire-and-forget and isolated. The headless core can run surveys, but there is no UI without the custom element.

## Next

[Advanced usage](./advanced-usage.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
