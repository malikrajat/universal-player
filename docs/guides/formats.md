# Formats and input types

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Formats and input types

The engine is chosen from the extension, MIME type and host. There is no public registry.

| Input | Detected kind | Provider | Playback reality |
| --- | --- | --- | --- |
| `.mp4`, `.m4v` | video | native | Broad H.264/AAC support; other codecs vary. |
| `.webm` | video | native | VP8/VP9/AV1 support varies. |
| `.mov` | video | native | Container usually unsupported in browsers; expect failure without remux. |
| `.mkv` | video | native | Recognised, generally not decodable in `<video>`. |
| `.m3u8` | video | hls | `hls.js` or native HLS. Level ladder exposed. |
| `.mpd` | video | dash | `dashjs`; representation ladder exposed. |
| `.mp3` | audio | native | Universal. |
| `.m4a` | audio | native | AAC in MP4; broad. |
| `.wav` | audio | native | Large but simple. |
| `.flac` | audio | native | Browser-dependent. |
| `.ogg` | **video** | native | Extension trap: audio-only Ogg gets a video element. |
| `.oga` | audio | native | Use this for Ogg audio. |
| `.ogv` | video | native | Ogg video. |
| `.aac` | audio | native | Raw ADTS support is narrower than M4A. |
| `.jpg`, `.jpeg` | image | image | `<img>`; UI zoom/rotate/download. |
| `.png` | image | image | `<img>`. |
| `.webp` | image | image | Animated WebP animates natively. |
| `.gif` | image | image | Animates natively; no frame controls. |
| `.svg` | image | image | Loaded through `<img>`, never inlined. |
| `.avif` | image | image | Recent decode support. |
| `.bmp`, `.ico` | image | image | Recognised by extension. |
| YouTube URL | embed | youtube | iframe + postMessage; no text/audio track list. |
| Vimeo URL | embed | vimeo | iframe + postMessage. |
| `{ kind: "embed", provider: "generic" }` | embed | generic-embed | Display-only; commands are no-ops. |
| `Blob` / `File` | from `type` | native/image | Empty type falls back to video. |
| `MediaStream` | video | native | `srcObject`; tracks are yours to stop. |
| `ChunkedSource` | declared | chunked | MSE when supported, Blob fallback. |
| `data:` URL | from MIME | native/image | Works, but large payloads are a bad idea. |

## No transcoding

The player never converts a container or codec. If the browser cannot decode it, the result is `media-error`. MOV/MKV in particular need server-side remuxing for web delivery.

## Detection fallback

`detectMediaKind()` returns `"video"` when nothing matches. A URL with no extension and no MIME hint is treated as video. Pass a structured source to remove the ambiguity.

## Verification level

Format support is **unit-tested at the routing and normalisation level**. Actual codec playback is browser-dependent and not covered by this repository's Chromium smoke test. See [Format matrix](../reference/formats-matrix.md).

**Next:** [Features](./features.md)

---

← Previous: [Advanced usage](./advanced-usage.md) · Next: [Features](./features.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
