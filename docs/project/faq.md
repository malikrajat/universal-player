# FAQ

> [Docs home](../README.md) › [Project](./architecture.md) › FAQ

## Installation and packaging

**Is the package on npm?**
No. `npm view @codewithrajat/universal-player` returns 404 on 2026-11-06. Use a folder or tarball install. The registry command is intended-only.

**Does it work with CommonJS?**
No. ESM only. Use dynamic `import()` from CJS.

**Are peers required?**
No. All peers are optional. Missing `hls.js`/`dashjs` fails only for those formats.

**Why do I get no controls?**
You are on a headless entry (`/core`, `/vanilla`, `/react`, `/vue`, `/angular`, `/svelte*`) with `controls: "custom"`. Use the custom element, `controls: "native"`, or your own chrome.

## Media and formats

**Does it support MOV/MKV?**
It recognises them and routes them to the native engine. Most browsers cannot demux them, so expect `media-error`. No transcoding is included.

**Why is my audio Ogg treated as video?**
`.ogg` is in the video extension set. Use `.oga` or a structured source with `kind: "audio"`.

**Does it support DRM?**
No. No EME, Widevine, FairPlay or PlayReady.

**Can it render PDFs/Office documents?**
No. This is a media player. Some filenames under `docs/api/` are a compatibility layout inherited from another library; their content is rewritten for media.

**Does it parse chapters/thumbnails from files?**
No. Supply `Chapter[]` and `ThumbnailTrack`.

## Features

**Is there a transcript panel?**
No.

**Do surveys block closing?**
`required`/`blocking` prevents `closeSurvey()` and skip. There is no focus trap.

**Is Chromecast supported?**
Only as a typed provider contract. The UI cast button uses the Remote Playback API.

**Are ads supported?**
No. `createAdController` throws `not-implemented` for scheduled breaks.

**Is 360/VR supported?**
No renderer. `setVrMode` writes data attributes only.

**Can I download media?**
Only if `ui.download` is enabled. It creates a link; it does not bypass CORS or rights management.

## Framework and SSR

**Do React/Vue/Angular/Svelte wrappers include the UI?**
No. They are headless. Render `<universal-player>` for the built-in UI.

**Does it work in Next.js/Nuxt/SvelteKit/Angular Universal?**
Client-side only. Use a dynamic, `ssr: false` boundary.

**Does React Strict Mode break it?**
The hook destroys on the simulated unmount and recreates; this is handled. Do not hoist a player instance outside the component.

## Operations

**How do I report an error?**
Capture `error.code`, `error.details`, `state`, source shape, browser, entry and whether peers are installed.

**Why does autoplay not start?**
Browser policy. The player swallows the rejection; start playback from a user gesture or start muted.

**What is the browser support?**
Declared Chrome/Edge 125+, Firefox 128+, Safari 18+. Only Chromium is executed in this repo.

**Is there a bundle-size guarantee?**
No. No numeric budget is enforced.

**Next:** [License](./license.md)

---

← Previous: [Roadmap](./roadmap.md) · Next: [License](./license.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
