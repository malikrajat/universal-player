# Edge cases

> [Examples home](../README.md) › [Angular](./README.md) › Edge cases

## Framework traps

- Add `CUSTOM_ELEMENTS_SCHEMA` for the custom element.
- The controller is decorator-free; you own the `@Component`.
- `load()` before `ngAfterViewInit()` rejects.
- `setInputs()` after destroy throws.
- Use `[attr.src]` for attributes on the custom element.

## Source and identity

- Equivalent URL strings do not reload in frameworks using `sourceToken`.
- A new `Blob`/`File` instance gets a new token and reloads.
- Changing only `requestInit`-like fields is not a thing here: the core does not accept request options. Do not assume headers changes reload.
- A structured object with the same kind/src/type produces the same token.

## Session creation vs event errors

Construction can throw `invalid-argument` synchronously (bad container). Load failures are emitted and rethrown from `load()`. Handle both.

## UI container and height

The custom element needs a sized host for the built-in UI. Set width and let `aspect-ratio` work, or give an explicit height.

## Per-format edge cases

- **MP4 / M4V** — The player does not transcode. H.264/AAC plays in mainstream browsers; HEVC/AV1 and 10-bit depend on the browser and OS.
- **WebM** — VP8/VP9/Opus support varies; Safari support is version-dependent. No transcoding.
- **QuickTime MOV** — Most browsers do not decode QuickTime containers. A `.mov` URL may fail with `media-error` even though the extension is recognised.
- **Matroska MKV** — Chromium/Firefox/Safari do not generally demux MKV in `<video>`. Expect `media-error`; use a server-side remux.
- **HLS (.m3u8)** — `hls.js` is a lazy optional peer. It uses `enableWorker: true`, `lowLatencyMode` from `live`, `backBufferLength: 90`. DRM is not supported.
- **MPEG-DASH (.mpd)** — Supports dash.js 4.x and 5.x ladder APIs. No DRM. If `MediaPlayer` is missing, the engine tries native playback.
- **MP3** — No waveform, no ID3 display. The built-in UI shows an animated audio visual.
- **M4A / AAC audio** — AAC in MP4 container is broadly supported; ALAC is not. No transcoding.
- **WAV** — Uncompressed files are large; there is no streaming optimisation beyond the browser.
- **FLAC** — Firefox and Chromium support FLAC; Safari support depends on the OS version. No fallback decoder is bundled.
- **Ogg / Oga** — `.ogg` is in the video extension set, so an audio-only `.ogg` is classified as video and gets a `<video>` element. Use `.oga` for audio or pass a structured source with `kind: "audio"`.
- **AAC (raw)** — Raw `.aac` (ADTS) is less consistently supported than AAC inside MP4/M4A. Prefer `.m4a`.
- **JPEG** — The image engine has no play/seek/volume/rate. The alt text comes from `ImageSource.alt` or an empty string.
- **GIF** — Animated GIF plays as the browser animates it. The player cannot pause, step or scrub frames.
- **PNG** — Large PNGs decode on the main thread; no tile renderer or downscaling is provided.
- **WebP** — Animated WebP plays as the browser animates it; the player has no frame controls.
- **SVG** — SVG is loaded through `<img>`, which does not run scripts or load external resources in the same way as an inline SVG. Still treat untrusted SVG as untrusted input.
- **AVIF** — Decode support is recent; older browsers emit `media-error`. No fallback is generated.
- **YouTube** — No text/audio track lists; no PiP; cross-origin playback depends on YouTube availability and embed policy. `youtube-nocookie.com` is not generated.
- **Vimeo** — No text/audio track lists; no PiP; private/domain-restricted videos may refuse to play.
- **Generic iframe embed** — The generic provider posts nothing to the iframe. `play()`, `pause()`, `seek()`, volume and rate cannot control the embedded document. State stays at the initial values until the page posts messages (it will not).
- **Chunked / streamed media** — `mode: "auto"` tries MediaSource when `MediaSource.isTypeSupported(type)` and falls back to buffering a Blob. The chunk iterable is consumed once; pass a function returning a fresh iterable to reload.
- **Blob and File** — The player creates an object URL and revokes it on replace/destroy. An empty `Blob.type` defaults to video classification (`detectMediaKind` falls through to `video`).

## Quick checklist

- [ ] Source identity stable.
- [ ] Teardown on unmount.
- [ ] No calls after destroy.
- [ ] UI track explicit.
- [ ] Error listener attached before load.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
