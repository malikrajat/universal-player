# Examples changelog

> [Examples home](./README.md) › Examples changelog

## 0.0.1 — 2026-11-06

Added:

- A 200+ page Markdown example book covering 5 frameworks, 23 formats/inputs, 6 features, 16 recipes and 13 use cases.
- Root matrices: format, API, errors, cheatsheet, learning paths, architecture.
- Shared setup/source/feature/security references.
- 12 production guides.

Corrected relative to the earlier docs:

- The package is published on npm as `@codewithrajat/universal-player@0.0.1`; registry installs resolve.
- Only `<universal-player>` renders the built-in UI.
- React's prop is `source`; Vue/Svelte use `src`; Angular uses `source`.
- The engine count is 8 providers, not seven.
- `.ogg` is classified as video; use `.oga` for audio.
- MOV/MKV are recognised but usually not decodable.
- Generic embeds are display-only.

## Compatibility

- Library version: `0.0.1`.
- Published public release: `0.0.1` on npm (`npm view @codewithrajat/universal-player version` returns `0.0.1`).
- Node `>=24` for development; browsers per the declared floor.
- Chromium is the only executed browser test.

## Known unverified areas

Safari/Firefox/mobile playback, Vue 2.7 execution, Svelte 4 compilation, real HLS/DASH streams, DRM (absent), ads (absent), VR rendering (absent), accessibility conformance (not audited).

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
