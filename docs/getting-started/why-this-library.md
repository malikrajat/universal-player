# Why this library

> [Docs home](../README.md) › [Getting started](./introduction.md) › Why this library

A plain `<video src>` is excellent until you need more than one media kind.

## Problems it solves

| Problem | What this library does |
| --- | --- |
| `.m3u8` is not playable in most non-Safari browsers | Lazily loads `hls.js` and maps its level ladder to `QualityLevel[]`. |
| `.mpd` needs dash.js plumbing | Lazily loads `dashjs` 4.x/5.x and normalises representations. |
| YouTube/Vimeo need different postMessage protocols | One iframe engine handles both, including time sync. |
| Images are a separate viewer | The image engine shares the same state, playlist and UI surface. |
| Uploads arrive as chunks | `ChunkedSource` uses MediaSource or a Blob fallback. |
| Every framework needs the same lifecycle glue | React/Vue/Angular/Svelte adapters own creation and teardown. |
| Captions, quality, speed, PiP, chapters, surveys each need UI | The custom element ships them in one control surface. |

## What it deliberately does not do

- No DRM/EME. If you need Widevine/FairPlay/PlayReady, this package is not the playback layer.
- No server-side rendering. The core imports without a DOM, but constructing a player needs one.
- No plugin registry. `createEngine()` is internal.
- No metadata extraction from media files. Chapters, thumbnails and captions are supplied by you.

## Trade-off

You accept a browser-only ESM package and optionally install `hls.js`/`dashjs`. In return you get one state model and one event bus across every media kind.

**Canonical guide:** [Core concepts](../guides/core-concepts.md) · [Feature status](../features.md)

---

← Previous: [Introduction](./introduction.md) · Next: [Prerequisites](./prerequisites.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
