# Assets and fixtures

> [Examples home](../README.md) › [Assets](./README.md) › Assets and fixtures

## Where to put fixtures

```text
examples/assets/
├─ video/    sample.mp4, sample.webm
├─ audio/    sample.mp3, sample.m4a
├─ image/    sample.jpg, sample.png, sample.svg
├─ captions/ sample.vtt
├─ posters/  poster.jpg
└─ README.md
```

These paths are conventions, not shipped binaries. Do not commit large media to this repository.

## Recommended sample set

| File | Format | Used by |
| --- | --- | --- |
| `video/sample.mp4` | H.264/AAC MP4, 10 s | MP4, blob, chunked, chapter pages |
| `video/sample.webm` | VP9/Opus WebM, 10 s | WebM page |
| `audio/sample.mp3` | MP3, 30 s | Audio pages, resume |
| `audio/sample.m4a` | AAC in MP4 | M4A page |
| `image/sample.jpg` | JPEG, 1600×900 | Image/DAM pages |
| `image/sample.png` | PNG with transparency | PNG page |
| `image/sample.svg` | Simple vector | SVG security note |
| `captions/sample.vtt` | WebVTT, 10 cues | Captions pages |
| `posters/poster.jpg` | 1280×720 | Poster examples |

## MIME hints

| Extension | MIME |
| --- | --- |
| `.mp4`, `.m4v` | `video/mp4` |
| `.webm` | `video/webm` |
| `.m3u8` | `application/vnd.apple.mpegurl` |
| `.mpd` | `application/dash+xml` |
| `.mp3` | `audio/mpeg` |
| `.m4a` | `audio/mp4` |
| `.wav` | `audio/wav` |
| `.flac` | `audio/flac` |
| `.oga` | `audio/ogg` |
| `.vtt` | `text/vtt` |
| `.jpg`/`.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.webp` | `image/webp` |
| `.svg` | `image/svg+xml` |
| `.avif` | `image/avif` |

## Safe fixture rules

- Use synthetic or CC0 media.
- No personal data, faces without consent, or confidential screens.
- Keep files small (< 5 MB) and short (< 30 s).
- Strip metadata.
- Do not commit DRM-protected samples.
- Serve with correct MIME types and range support.

## Remote URL rules

- Use `https://` only.
- Use placeholder hosts in docs; do not imply a third-party URL is a guaranteed test stream.
- Do not hot-link private or signed URLs.
- Expect CORS failures for arbitrary hosts; that is a valid example.

## Engine/asset paths

The package ships no workers, WASM, fonts, language packs or converters. HLS/DASH SDKs are optional peers installed by the consumer. Captions, posters, thumbnails and sprites are yours.

## License and privacy warning

Do not copy commercial media into the repo. Do not put analytics endpoints or tokens in fixtures. If you add a third-party sample, record its license in this file.

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
