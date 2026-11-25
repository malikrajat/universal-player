# Roadmap

> [Docs home](./README.md) › Roadmap

[← Docs](./README.md) · [Feature status](./features.md) · [Changelog](./changelog.md)

This roadmap is honest about status. It separates what ships today, what is
partial, what is scaffolded and what is deliberately out of scope.

---

## Shipped in 0.0.1

### Core

- [x] Headless `UniversalPlayer` with immutable state.
- [x] Three event styles (DOM, typed, observable).
- [x] Stable error codes.
- [x] Source normalization and provider detection.
- [x] Native video/audio engine.
- [x] Image engine with zoom/rotate/download.
- [x] HLS via lazy `hls.js`.
- [x] DASH via lazy `dashjs`.
- [x] YouTube/Vimeo postMessage sync.
- [x] Generic iframe embeds.
- [x] Blob/File/data URL sources.
- [x] Chunked sources via MediaSource/Blob.
- [x] MediaStream sources.

### Experience

- [x] `<universal-player>` custom element.
- [x] Custom and native controls.
- [x] Adaptive control visibility.
- [x] Control allow-list/hide/order.
- [x] Settings sheet (speed, quality, captions, audio, loop, autoplay, sleep,
      stats, shortcuts).
- [x] Timestamp with elapsed/remaining toggle.
- [x] Seek-bar buffered rail, chapter markers, hover previews.
- [x] Captions menu, size, persistence.
- [x] Quality selection (`−`/`+`, auto, levels).
- [x] Playlists with auto-advance, loop and completion gating.
- [x] Chapters with menu and active label.
- [x] Surveys/feedback/quiz with validation and presets.
- [x] Resume.
- [x] Analytics hooks.
- [x] Share and embed snippets.
- [x] Keyboard shortcuts + help overlay.
- [x] Gestures (opt-in).
- [x] Theming tokens and parts.
- [x] i18n + RTL.
- [x] Light/dark/system themes.
- [x] Error overlay + retry.

### Frameworks and packaging

- [x] React adapter (hook + component).
- [x] Vue 2.7/3 adapter.
- [x] Angular controller.
- [x] Svelte 4/5 components.
- [x] Vanilla mount helper.
- [x] ESM-only, tree-shakeable build.
- [x] Type declarations, source maps.
- [x] publint, attw, tarball allowlist, browser-import scan.
- [x] Changesets + release workflow.

---

## Partial

- [ ] **Live/DVR UI** — live state, label and seekable helpers exist; a
      dedicated DVR window scrubber is not built.
- [ ] **Vue 2.7 fixture** — the adapter is written against the shared API, but
      the example suite primarily exercises Vue 3.

---

## Scaffolded (contract only)

- [ ] **Ads (VAST/IMA)** — `AdSchedule`/`AdController` types and a stub that
      throws `not-implemented`.
- [ ] **Chromecast SDK** — `CastProvider` contract; the UI uses the Remote
      Playback API prompt instead.
- [ ] **360/VR rendering** — `setVrMode()` writes data attributes; no WebGL/XR
      renderer.
- [ ] **Formal WCAG audit** — markup targets WCAG 2.2 AA; automated axe is not
      wired.

---

## Next (no dates promised)

### Quality and reliability

- [ ] Automated axe/Playwright accessibility audit in CI.
- [ ] Broader browser matrix (Firefox/Safari/WebKit) in browser tests.
- [ ] Visual regression tests for menus and surveys.
- [ ] Bundle budget enforcement.
- [ ] Vue 2.7 compatibility fixture in CI.

### Playback

- [ ] Dedicated live DVR scrubber.
- [ ] Audio-description menu polish.
- [ ] Better quality heuristics (ABR preference persistence).
- [ ] Chapter thumbnails from a sprite sheet.
- [ ] Optional transcript panel.

### Experience

- [ ] More locale presets.
- [ ] Theme presets (brand-oriented).
- [ ] Server-side share-card generation helpers (metadata only).
- [ ] More survey question types (ranking, matrix) — design first.

### Platform

- [ ] Optional public engine registry (major release, if demand exists).
- [ ] Ads SDK adapter (VAST/IMA).
- [ ] Chromecast SDK adapter.
- [ ] VR renderer.

---

## Out of scope

These are not planned for the current product:

- DRM (Widevine/FairPlay/PlayReady).
- Server-side rendering of the player or wrappers.
- A legacy/IE bundle.
- Bundling streaming SDKs into the package.
- A hosted analytics backend.
- A CMS/asset manager.

---

## How priorities are chosen

1. Correctness and accessibility of shipped features.
2. Packaging and upgrade safety.
3. Requested integrations that fit the core model.
4. New surface area only when it can be maintained.

If you need an item from “Next”, open an issue with the use case. If you need
an item from “Scaffolded”, say so explicitly; the contract exists so it can be
implemented without breaking consumers.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)