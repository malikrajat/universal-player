# Changelog

> [Docs home](../README.md) › [Project](./architecture.md) › Changelog

The canonical release history is [`../CHANGELOG.md`](../CHANGELOG.md). This page records documentation-relevant changes.

## 0.0.1 — initial scaffold (unreleased)

Added:

- Headless `UniversalPlayer` with immutable state and three event styles.
- Native video/audio, image, HLS, DASH, YouTube, Vimeo, generic embed and chunked engines.
- `<universal-player>` with custom/native controls, theming, i18n and accessible markup.
- React, Vue 2.7/3, Angular, Svelte 4 and Svelte 5 adapters.
- Feature helpers for captions, audio tracks, quality, speed, PiP, fullscreen, AirPlay, cast contracts, thumbnails, chapters, playlists, resume, live, ads contracts, analytics, mini-player and VR contracts.
- ESM-only packaging, declarations, source maps, publint/attw/pack checks, Changesets.

Documentation changes on 2026-11-06:

- Corrected the publication status: the package is **not on npm**.
- Corrected the UI boundary: framework wrappers and `mountUniversalPlayer()` are headless.
- Corrected the entry count: 9 code entries, not "root + 9 subpaths".
- Corrected the engine count: 8 providers, not seven.
- Removed the "survey focus trap" claim; no trap exists.
- Added the `examples/` Markdown book.

## Compatibility

No previous public release exists, so there are no runtime compatibility commitments yet. See [Versioning](./versioning.md).

## Known unverified areas

Safari/Firefox/mobile execution, Vue 2.7 execution, Svelte 4 compilation in this repo, real HLS/DASH streams, DRM (absent), ads (absent), VR rendering (absent).

**Next:** [Roadmap](./roadmap.md)

---

← Previous: [Project structure](./project-structure.md) · Next: [Roadmap](./roadmap.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
