# Roadmap

> [Docs home](../README.md) › [Project](./architecture.md) › Roadmap

This roadmap separates what exists from what is aspirational. Nothing here is a delivery commitment.

## Shipped in the scaffold

Native video/audio, images, HLS, DASH, YouTube/Vimeo sync, generic embeds, chunked sources, playlists, chapters, thumbnails, captions, quality, speed, PiP, fullscreen, AirPlay/cast prompt, surveys, resume, analytics, keyboard shortcuts, share/embed, stats, theming, i18n, six framework surfaces.

## Partial

- **Live/DVR** — live state and seekable helpers exist; no DVR scrubber UI.
- **UI accessibility** — markup and keyboard support exist; no axe audit or screen-reader suite; survey has no focus trap.

## Scaffolded (contracts, not features)

- **Ads** — `AdController` + `findAdBreakAt`; scheduled playback throws `not-implemented`.
- **Chromecast SDK** — `CastProvider` contract; the UI uses the Remote Playback prompt.
- **360/VR** — data attributes only.

## Explicitly out of scope

- DRM/EME.
- Server-side rendering of the player.
- A public engine/plugin registry.
- Transcoding/remuxing.
- Embedded metadata extraction.
- A transcript panel.
- CommonJS output.

## Possible future work (not scheduled)

- Automated accessibility audit.
- DVR window UI.
- Adapter-level browser matrix in CI.
- Optional subtitle rendering independent of native text tracks.

Do not present any of these as available.

**Next:** [FAQ](./faq.md)

---

← Previous: [Changelog](./changelog.md) · Next: [FAQ](./faq.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
