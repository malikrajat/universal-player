# Compatibility

> [Examples home](../README.md) › [Production guides](./README.md) › Compatibility

## Runtime

| Item | Status |
| --- | --- |
| Browser | Declared Chrome/Edge 125+, Firefox 128+, Safari 18+ |
| Executed browser | Chromium only |
| Mobile | Not verified |
| Module | ESM only |
| SSR | Not supported |
| Node | `>=24` for build/dev |

## Frameworks

| Framework | Range | Executed here |
| --- | --- | --- |
| React | `>=18` | 19.3.1 |
| Vue | `^2.7 \|\| ^3` | 3.5.44 |
| Angular | `>=17` | 22.2.4 |
| Svelte | `^4 \|\| ^5` | 5 |

## Formats

See the [format matrix](../format-matrix.md). The summary: native video/audio and images work subject to browser codecs; HLS/DASH need peers; embeds are provider-dependent; MOV/MKV are usually not decodable; generic embeds are display-only.

## Not supported

DRM, SSR, OCR, documents, transcoding, plugin registry, Chromecast SDK, VAST/IMA, WebXR, CommonJS, transcript panel, focus trap.

## Checklist

- [ ] Your browsers tested.
- [ ] Your codecs tested.
- [ ] HLS/DASH peers installed and streams tested.
- [ ] A11y manually tested.
- [ ] Unverified areas documented for your team.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
