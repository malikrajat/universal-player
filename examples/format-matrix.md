# Format matrix

> [Examples home](./README.md) › Format matrix

## Status legend

| Status | Meaning |
| --- | --- |
| **Implemented** | The engine path exists; routing/normalisation is unit-tested. |
| **Conditional** | Requires a peer, browser API or provider. |
| **Provider-only** | The provider supplies the capability. |
| **Display-only** | Renders, but cannot be controlled. |
| **Not decodable** | Recognised by extension, but mainstream browsers cannot demux it. |

Actual codec playback is **not** covered by this repository's Chromium smoke test. Treat everything below as routing truth plus browser reality, not a universal playback guarantee.

## Quick matrix

| Format | Kind | Provider | Playable in a mainstream browser? | Verification |
| --- | --- | --- | --- | --- |
| MP4 / M4V | video | `native` | Browser-dependent | Unit routing; codec not verified |
| WebM | video | `native` | Browser-dependent | Unit routing; codec not verified |
| QuickTime MOV | video | `native` | Rarely | Unit routing; codec not verified |
| Matroska MKV | video | `native` | No (no demuxer) | Unit routing; codec not verified |
| HLS (.m3u8) | video | `hls` | Browser-dependent | Unit routing; codec not verified |
| MPEG-DASH (.mpd) | video | `dash` | Browser-dependent | Unit routing; codec not verified |
| MP3 | audio | `native` | Browser-dependent | Unit routing; codec not verified |
| M4A / AAC audio | audio | `native` | Browser-dependent | Unit routing; codec not verified |
| WAV | audio | `native` | Browser-dependent | Unit routing; codec not verified |
| FLAC | audio | `native` | Browser-dependent | Unit routing; codec not verified |
| Ogg / Oga | audio (`.oga`) or video (`.ogg`) | `native` | Browser-dependent | Unit routing; codec not verified |
| AAC (raw) | audio | `native` | Browser-dependent | Unit routing; codec not verified |
| JPEG | image | `image` | Browser-dependent | Unit routing; codec not verified |
| GIF | image | `image` | Browser-dependent | Unit routing; codec not verified |
| PNG | image | `image` | Browser-dependent | Unit routing; codec not verified |
| WebP | image | `image` | Browser-dependent | Unit routing; codec not verified |
| SVG | image | `image` | Browser-dependent | Unit routing; codec not verified |
| AVIF | image | `image` | Browser-dependent | Unit routing; codec not verified |
| YouTube | embed | `youtube` | Browser-dependent | Unit routing; codec not verified |
| Vimeo | embed | `vimeo` | Browser-dependent | Unit routing; codec not verified |
| Generic iframe embed | embed | `generic-embed` | Browser-dependent | Unit routing; codec not verified |
| Chunked / streamed media | video, audio or image | `chunked` | Browser-dependent | Unit routing; codec not verified |
| Blob and File | video, audio or image (from MIME) | `native or image` | Browser-dependent | Unit routing; codec not verified |

## MP4 / M4V

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .mp4, .m4v |
| MIME | video/mp4 |
| Unit | `<video>` |
| Rendering | video |
| Capabilities | play, pause, seek, volume, rate, fullscreen, PiP, text tracks, audio tracks, live |
| Options | `type`, `preload`, `crossOrigin`, `poster`, `playsInline`, `startTime` |
| Status | Implemented; codec support is the browser's |
| Limits | The player does not transcode. H.264/AAC plays in mainstream browsers; HEVC/AV1 and 10-bit depend on the browser and OS. |
| Failure codes | `media-error`, `unsupported-environment` |
| Start here | [Vanilla](./vanilla/formats/mp4.md) · [React](./react/formats/mp4.md) · [Vue](./vue/formats/mp4.md) · [Angular](./angular/formats/mp4.md) · [Svelte](./svelte/formats/mp4.md) |

## WebM

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .webm |
| MIME | video/webm |
| Unit | `<video>` |
| Rendering | video |
| Capabilities | play, pause, seek, volume, rate, fullscreen, PiP, text tracks, audio tracks, live |
| Options | `type`, `preload`, `crossOrigin`, `poster` |
| Status | Implemented; codec support is the browser's |
| Limits | VP8/VP9/Opus support varies; Safari support is version-dependent. No transcoding. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/webm.md) · [React](./react/formats/webm.md) · [Vue](./vue/formats/webm.md) · [Angular](./angular/formats/webm.md) · [Svelte](./svelte/formats/webm.md) |

## QuickTime MOV

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .mov |
| MIME | video/quicktime |
| Unit | `<video>` |
| Rendering | video |
| Capabilities | Whatever the browser exposes for the decoded stream |
| Options | `type`, `preload`, `crossOrigin` |
| Status | Detected and routed to native; playback is browser-dependent |
| Limits | Most browsers do not decode QuickTime containers. A `.mov` URL may fail with `media-error` even though the extension is recognised. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/mov.md) · [React](./react/formats/mov.md) · [Vue](./vue/formats/mov.md) · [Angular](./angular/formats/mov.md) · [Svelte](./svelte/formats/mov.md) |

## Matroska MKV

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .mkv |
| MIME | video/x-matroska |
| Unit | `<video>` |
| Rendering | video |
| Capabilities | Declared native capabilities; actual decoding usually fails |
| Options | `type`, `preload` |
| Status | Recognised, not decoded by mainstream browsers |
| Limits | Chromium/Firefox/Safari do not generally demux MKV in `<video>`. Expect `media-error`; use a server-side remux. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/mkv.md) · [React](./react/formats/mkv.md) · [Vue](./vue/formats/mkv.md) · [Angular](./angular/formats/mkv.md) · [Svelte](./svelte/formats/mkv.md) |

## HLS (.m3u8)

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `hls` |
| Factory | `createHlsEngine` (internal) |
| Extensions / input | .m3u8 |
| MIME | application/vnd.apple.mpegurl |
| Unit | `<video>` + hls.js or native HLS |
| Rendering | video |
| Capabilities | Native caps plus quality (levels); text/audio tracks where exposed |
| Options | `live`, `qualities` (fallback list), `captions.tracks`, `crossOrigin` |
| Status | Implemented; requires `hls.js` or native HLS |
| Limits | `hls.js` is a lazy optional peer. It uses `enableWorker: true`, `lowLatencyMode` from `live`, `backBufferLength: 90`. DRM is not supported. |
| Failure codes | `network-error`, `unsupported-environment`, `media-error` |
| Start here | [Vanilla](./vanilla/formats/hls.md) · [React](./react/formats/hls.md) · [Vue](./vue/formats/hls.md) · [Angular](./angular/formats/hls.md) · [Svelte](./svelte/formats/hls.md) |

## MPEG-DASH (.mpd)

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `dash` |
| Factory | `createDashEngine` (internal) |
| Extensions / input | .mpd |
| MIME | application/dash+xml |
| Unit | `<video>` + dash.js |
| Rendering | video |
| Capabilities | Native caps plus quality (representations) |
| Options | `live`, `qualities`, `captions.tracks` |
| Status | Implemented; requires `dashjs` |
| Limits | Supports dash.js 4.x and 5.x ladder APIs. No DRM. If `MediaPlayer` is missing, the engine tries native playback. |
| Failure codes | `media-error`, `unsupported-environment` |
| Start here | [Vanilla](./vanilla/formats/dash.md) · [React](./react/formats/dash.md) · [Vue](./vue/formats/dash.md) · [Angular](./angular/formats/dash.md) · [Svelte](./svelte/formats/dash.md) |

## MP3

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .mp3 |
| MIME | audio/mpeg |
| Unit | `<audio>` |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate, fullscreen, text tracks (limited), audio tracks (limited) |
| Options | `poster` (audio artwork in the UI), `preload`, `crossOrigin` |
| Status | Implemented |
| Limits | No waveform, no ID3 display. The built-in UI shows an animated audio visual. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/mp3.md) · [React](./react/formats/mp3.md) · [Vue](./vue/formats/mp3.md) · [Angular](./angular/formats/mp3.md) · [Svelte](./svelte/formats/mp3.md) |

## M4A / AAC audio

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .m4a |
| MIME | audio/mp4 |
| Unit | `<audio>` |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate, fullscreen |
| Options | `preload`, `crossOrigin` |
| Status | Implemented; codec support is the browser's |
| Limits | AAC in MP4 container is broadly supported; ALAC is not. No transcoding. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/m4a.md) · [React](./react/formats/m4a.md) · [Vue](./vue/formats/m4a.md) · [Angular](./angular/formats/m4a.md) · [Svelte](./svelte/formats/m4a.md) |

## WAV

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .wav |
| MIME | audio/wav |
| Unit | `<audio>` |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate, fullscreen |
| Options | `preload`, `crossOrigin` |
| Status | Implemented |
| Limits | Uncompressed files are large; there is no streaming optimisation beyond the browser. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/wav.md) · [React](./react/formats/wav.md) · [Vue](./vue/formats/wav.md) · [Angular](./angular/formats/wav.md) · [Svelte](./svelte/formats/wav.md) |

## FLAC

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .flac |
| MIME | audio/flac |
| Unit | `<audio>` |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate |
| Options | `preload`, `crossOrigin` |
| Status | Implemented; browser codec support varies |
| Limits | Firefox and Chromium support FLAC; Safari support depends on the OS version. No fallback decoder is bundled. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/flac.md) · [React](./react/formats/flac.md) · [Vue](./vue/formats/flac.md) · [Angular](./angular/formats/flac.md) · [Svelte](./svelte/formats/flac.md) |

## Ogg / Oga

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .ogg, .oga, .ogv |
| MIME | audio/ogg, video/ogg |
| Unit | `<audio>` or `<video>` |
| Rendering | audio (`.oga`) or video (`.ogg`) |
| Capabilities | Whatever the native element exposes |
| Options | `type`, `kind` via a structured source |
| Status | Implemented with an extension-based kind trap |
| Limits | `.ogg` is in the video extension set, so an audio-only `.ogg` is classified as video and gets a `<video>` element. Use `.oga` for audio or pass a structured source with `kind: "audio"`. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/ogg.md) · [React](./react/formats/ogg.md) · [Vue](./vue/formats/ogg.md) · [Angular](./angular/formats/ogg.md) · [Svelte](./svelte/formats/ogg.md) |

## AAC (raw)

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) |
| Extensions / input | .aac |
| MIME | audio/aac |
| Unit | `<audio>` |
| Rendering | audio |
| Capabilities | play, pause, seek, volume, rate |
| Options | `preload`, `crossOrigin` |
| Status | Implemented where the browser decodes raw ADTS |
| Limits | Raw `.aac` (ADTS) is less consistently supported than AAC inside MP4/M4A. Prefer `.m4a`. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/aac.md) · [React](./react/formats/aac.md) · [Vue](./vue/formats/aac.md) · [Angular](./angular/formats/aac.md) · [Svelte](./svelte/formats/aac.md) |

## JPEG

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .jpg, .jpeg |
| MIME | image/jpeg |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.zoom`, `image.rotate`, `image.download`, `image.minZoom`, `image.maxZoom`, `image.slideDuration` |
| Status | Implemented |
| Limits | The image engine has no play/seek/volume/rate. The alt text comes from `ImageSource.alt` or an empty string. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/jpg.md) · [React](./react/formats/jpg.md) · [Vue](./vue/formats/jpg.md) · [Angular](./angular/formats/jpg.md) · [Svelte](./svelte/formats/jpg.md) |

## GIF

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .gif |
| MIME | image/gif |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.*`, `alt` |
| Status | Implemented; animation is browser-controlled |
| Limits | Animated GIF plays as the browser animates it. The player cannot pause, step or scrub frames. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/gif.md) · [React](./react/formats/gif.md) · [Vue](./vue/formats/gif.md) · [Angular](./angular/formats/gif.md) · [Svelte](./svelte/formats/gif.md) |

## PNG

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .png |
| MIME | image/png |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.*`, `alt` |
| Status | Implemented |
| Limits | Large PNGs decode on the main thread; no tile renderer or downscaling is provided. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/png.md) · [React](./react/formats/png.md) · [Vue](./vue/formats/png.md) · [Angular](./angular/formats/png.md) · [Svelte](./svelte/formats/png.md) |

## WebP

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .webp |
| MIME | image/webp |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.*` |
| Status | Implemented; browser decode support |
| Limits | Animated WebP plays as the browser animates it; the player has no frame controls. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/webp.md) · [React](./react/formats/webp.md) · [Vue](./vue/formats/webp.md) · [Angular](./angular/formats/webp.md) · [Svelte](./svelte/formats/webp.md) |

## SVG

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .svg |
| MIME | image/svg+xml |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.*`, `alt` |
| Status | Implemented with a security caveat |
| Limits | SVG is loaded through `<img>`, which does not run scripts or load external resources in the same way as an inline SVG. Still treat untrusted SVG as untrusted input. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/svg.md) · [React](./react/formats/svg.md) · [Vue](./vue/formats/svg.md) · [Angular](./angular/formats/svg.md) · [Svelte](./svelte/formats/svg.md) |

## AVIF

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `image` |
| Factory | `createImageEngine` (internal) |
| Extensions / input | .avif |
| MIME | image/avif |
| Unit | `<img>` |
| Rendering | image |
| Capabilities | fullscreen; UI zoom/rotate/download |
| Options | `image.*` |
| Status | Implemented; browser decode support |
| Limits | Decode support is recent; older browsers emit `media-error`. No fallback is generated. |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/avif.md) · [React](./react/formats/avif.md) · [Vue](./vue/formats/avif.md) · [Angular](./angular/formats/avif.md) · [Svelte](./svelte/formats/avif.md) |

## YouTube

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `youtube` |
| Factory | `createYouTubeEngine` (internal) |
| Extensions / input | YouTube URL |
| MIME | text/html (iframe) |
| Unit | `<iframe>` |
| Rendering | embed |
| Capabilities | play, pause, seek, volume, rate, fullscreen, quality (configured), live |
| Options | `autoplay`, `muted`, `controls`, `qualities`, `captions.enabled` |
| Status | Implemented with postMessage sync |
| Limits | No text/audio track lists; no PiP; cross-origin playback depends on YouTube availability and embed policy. `youtube-nocookie.com` is not generated. |
| Failure codes | `invalid-argument`, `media-error` |
| Start here | [Vanilla](./vanilla/formats/youtube.md) · [React](./react/formats/youtube.md) · [Vue](./vue/formats/youtube.md) · [Angular](./angular/formats/youtube.md) · [Svelte](./svelte/formats/youtube.md) |

## Vimeo

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `vimeo` |
| Factory | `createVimeoEngine` (internal) |
| Extensions / input | Vimeo URL |
| MIME | text/html (iframe) |
| Unit | `<iframe>` |
| Rendering | embed |
| Capabilities | play, pause, seek, volume, rate, fullscreen, quality (configured), live |
| Options | `autoplay`, `muted`, `controls`, `qualities` |
| Status | Implemented with postMessage sync |
| Limits | No text/audio track lists; no PiP; private/domain-restricted videos may refuse to play. |
| Failure codes | `invalid-argument`, `media-error` |
| Start here | [Vanilla](./vanilla/formats/vimeo.md) · [React](./react/formats/vimeo.md) · [Vue](./vue/formats/vimeo.md) · [Angular](./angular/formats/vimeo.md) · [Svelte](./svelte/formats/vimeo.md) |

## Generic iframe embed

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `generic-embed` |
| Factory | `createEmbedEngine` (internal) |
| Extensions / input | Any non-YouTube/Vimeo URL passed as `{ kind: "embed" }` |
| MIME | text/html (iframe) |
| Unit | `<iframe>` |
| Rendering | embed |
| Capabilities | Declared play/pause/seek/volume/rate/fullscreen; calls are no-ops for `generic` |
| Options | `title`, `autoplay`, `muted` |
| Status | Implemented; no command bridge |
| Limits | The generic provider posts nothing to the iframe. `play()`, `pause()`, `seek()`, volume and rate cannot control the embedded document. State stays at the initial values until the page posts messages (it will not). |
| Failure codes | `media-error` |
| Start here | [Vanilla](./vanilla/formats/embed.md) · [React](./react/formats/embed.md) · [Vue](./vue/formats/embed.md) · [Angular](./angular/formats/embed.md) · [Svelte](./svelte/formats/embed.md) |

## Chunked / streamed media

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `chunked` |
| Factory | `createChunkedMediaEngine` (internal) |
| Extensions / input | No extension; `ChunkedSource` |
| MIME | Caller supplies `type` |
| Unit | `MediaSource` + `<video>`/`<audio>`, or Blob + `<img>` |
| Rendering | video, audio or image |
| Capabilities | Native caps for video/audio; image caps for images |
| Options | `kind`, `type`, `chunks`, `mode`, `chunkDelay`, `alt` |
| Status | Implemented |
| Limits | `mode: "auto"` tries MediaSource when `MediaSource.isTypeSupported(type)` and falls back to buffering a Blob. The chunk iterable is consumed once; pass a function returning a fresh iterable to reload. |
| Failure codes | `invalid-argument`, `media-error`, `unsupported-environment` |
| Start here | [Vanilla](./vanilla/formats/chunked.md) · [React](./react/formats/chunked.md) · [Vue](./vue/formats/chunked.md) · [Angular](./angular/formats/chunked.md) · [Svelte](./svelte/formats/chunked.md) |

## Blob and File

| Field | Value |
| --- | --- |
| Entry | Any of the player entries; the engine is internal |
| Adapter id | `native or image` |
| Factory | native/image engine (internal) |
| Extensions / input | No extension |
| MIME | From `Blob.type` |
| Unit | Object URL + `<video>`/`<audio>`/`<img>` |
| Rendering | video, audio or image (from MIME) |
| Capabilities | Same as the resolved kind |
| Options | `source` accepts the Blob/File directly, `kind` cannot be overridden for a Blob |
| Status | Implemented |
| Limits | The player creates an object URL and revokes it on replace/destroy. An empty `Blob.type` defaults to video classification (`detectMediaKind` falls through to `video`). |
| Failure codes | `invalid-argument`, `unsupported-environment`, `media-error` |
| Start here | [Vanilla](./vanilla/formats/blob.md) · [React](./react/formats/blob.md) · [Vue](./vue/formats/blob.md) · [Angular](./angular/formats/blob.md) · [Svelte](./svelte/formats/blob.md) |


## Capability matrix

| Format | Play | Seek | Volume | Rate | PiP | Captions | Quality | Live |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Native video | yes | yes | yes | yes | yes | native | no | yes |
| Native audio | yes | yes | yes | yes | no | native (limited) | no | yes |
| Image | no | no | no | no | no | no | no | no |
| HLS | yes | yes | yes | yes | yes | native | yes | yes |
| DASH | yes | yes | yes | yes | yes | native | yes | yes |
| YouTube | yes | yes | yes | yes | no | no | configured | yes |
| Vimeo | yes | yes | yes | yes | no | no | configured | yes |
| Generic embed | declared | declared | declared | declared | no | no | no | yes |
| Chunked | yes | yes | yes | yes | yes | native | no | yes |

## Feature matrix

| Feature | Works with | Not supported |
| --- | --- | --- |
| Captions | native, HLS, DASH, chunked | embeds, images |
| Chapters | native, HLS, DASH, chunked audio/video | images, embeds |
| Playlist | all kinds | — |
| Quality | HLS, DASH; configured embeds | native MP4, images |
| Survey | all kinds (UI required) | headless without your own panel |
| Resume | timeline media | images, live (best-effort) |

## Framework coverage

- **Vanilla** — `<universal-player>` after importing the root or `/ui`; headless: `mountUniversalPlayer()` or `createPlayer()`.
- **React** — `<universal-player>` via `/ui` (React does not register it); headless: `<UniversalPlayer>` or `useUniversalPlayer()`.
- **Vue** — `<universal-player>` via `/ui` (configure `isCustomElement`); headless: `<UniversalPlayer>` or `useUniversalPlayer()`.
- **Angular** — `<universal-player>` via `/ui` with `CUSTOM_ELEMENTS_SCHEMA`; headless: `AngularUniversalPlayer` controller inside your component.
- **Svelte** — `<universal-player>` via `/ui`; headless: `<UniversalPlayer>` from `/svelte4` or `/svelte5`.

## Explicitly unsupported

PDF, DOCX, XLSX, PPTX, ODT/ODS/ODP, EPUB, RTF, Markdown, ZIP, DRM-protected media, OCR, document signatures, WebXR rendering, Chromecast SDK, VAST/IMA playback, server-side rendering.

## Fidelity warnings

- No claim of universal codec support.
- No claim of pixel-perfect anything; this is media, not documents.
- Embeds are third-party and can change or block.
- Generic embeds are display-only.
- MOV/MKV recognition is not playback support.

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
