# Formats

> [Examples home](../README.md) › [Vue](./README.md) › Formats › Formats

Every supported format/input has its own page. The engine is chosen internally; there is no "pick adapter" step.

| Format | Kind | Provider | Page |
| --- | --- | --- | --- |
| MP4 / M4V | video | `native` | [mp4.md](./mp4.md) |
| WebM | video | `native` | [webm.md](./webm.md) |
| QuickTime MOV | video | `native` | [mov.md](./mov.md) |
| Matroska MKV | video | `native` | [mkv.md](./mkv.md) |
| HLS (.m3u8) | video | `hls` | [hls.md](./hls.md) |
| MPEG-DASH (.mpd) | video | `dash` | [dash.md](./dash.md) |
| MP3 | audio | `native` | [mp3.md](./mp3.md) |
| M4A / AAC audio | audio | `native` | [m4a.md](./m4a.md) |
| WAV | audio | `native` | [wav.md](./wav.md) |
| FLAC | audio | `native` | [flac.md](./flac.md) |
| Ogg / Oga | audio (`.oga`) or video (`.ogg`) | `native` | [ogg.md](./ogg.md) |
| AAC (raw) | audio | `native` | [aac.md](./aac.md) |
| JPEG | image | `image` | [jpg.md](./jpg.md) |
| GIF | image | `image` | [gif.md](./gif.md) |
| PNG | image | `image` | [png.md](./png.md) |
| WebP | image | `image` | [webp.md](./webp.md) |
| SVG | image | `image` | [svg.md](./svg.md) |
| AVIF | image | `image` | [avif.md](./avif.md) |
| YouTube | embed | `youtube` | [youtube.md](./youtube.md) |
| Vimeo | embed | `vimeo` | [vimeo.md](./vimeo.md) |
| Generic iframe embed | embed | `generic-embed` | [embed.md](./embed.md) |
| Chunked / streamed media | video, audio or image | `chunked` | [chunked.md](./chunked.md) |
| Blob and File | video, audio or image (from MIME) | `native or image` | [blob.md](./blob.md) |

## Reading a format page

1. At a glance: provider, unit, status, capabilities.
2. Basic: source variants, full UI, headless.
3. Advanced: options, surface table, copy-paste calls.
4. Customization: UI vs headless.
5. Edge/failure: what breaks and why.
6. Related links.

## Unsupported

PDF/Office/EPUB, DRM, OCR, transcoding, generic embeds as controllable players. See [format matrix](../../format-matrix.md).

---

**Docs home** · [Documentation index](../../../docs/README.md) · [Summary](../../../docs/SUMMARY.md)
