# Why this library

> [Docs home](./README.md) � Why this library

[← Docs](./README.md) · [Features](./features.md) · [Architecture](./architecture.md)

A native `<video>` tag is excellent at playing one MP4. The moment you need
captions, quality levels, playlists, images, embeds, surveys, analytics and
consistent controls across frameworks, “just use `<video>`” turns into a pile of
per-project plumbing.

This library exists to make that plumbing a product decision instead of a
research project.

---

## The problems it solves

| Problem                      | Native `<video>`     | This library                         |
| ---------------------------- | -------------------- | ------------------------------------ |
| Video, audio, images, embeds | One element per type | One API and one surface              |
| HLS/DASH                     | No                   | Optional lazy engines                |
| Custom controls              | Build everything     | Built-in, configurable surface       |
| Captions menu                | Browser-dependent    | CC toggle + language/size menus      |
| Quality levels               | No                   | HLS/DASH levels + menu               |
| Chapters                     | No                   | Markers, menu, active label          |
| Playlists                    | No                   | Queue, auto-advance, gating, loop    |
| Surveys/feedback             | No                   | In-player forms, validation, presets |
| Resume                       | No                   | Opt-in local storage                 |
| Analytics                    | No                   | Vendor-neutral events                |
| Theming                      | Partial              | Tokens + parts + accent              |
| i18n                         | No                   | Locale registry                      |
| Framework consistency        | Per-project          | Shared core + thin adapters          |
| Headless use                 | No                   | `/core` with state/events            |

---

## Design principles

### 1. One core, many surfaces

Playback, state and events live once. The custom element and framework adapters
are thin. This is why a bug fix in `setTextTrack()` benefits every framework.

### 2. Capabilities over guesses

Engines advertise `PlayerCapabilities`. The UI hides what cannot work instead of
special-casing audio vs. video vs. images in each wrapper.

### 3. Optional everything

The core has no runtime dependencies. Streaming SDKs and frameworks are
optional peers. A page that plays MP4 does not pay for HLS or React.

### 4. Explicit contracts

- Stable error codes.
- Immutable state.
- Typed events.
- Documented defaults.
- SemVer and a deprecation window.

### 5. Browser-first honesty

Media playback is a browser capability. The library states that it is
browser-only instead of pretending SSR works. `core` is import-safe, but the
player needs a DOM.

### 6. Product-grade defaults

The built-in custom-element surface is not a demo: adaptive controls, menus, gestures, sleep timer, stats, share/embed, surveys, accessible markup, reduced motion and forced-colors support. Headless entries do not render it.

---

## How it compares

| Concern                    | This library                | Video.js  | Plyr      | Shaka Player |
| -------------------------- | --------------------------- | --------- | --------- | ------------ |
| Framework-agnostic core    | Yes                         | Yes       | Yes       | Yes          |
| Framework adapters         | React, Vue, Angular, Svelte | Community | Community | Community    |
| ESM-only, tree-shakeable   | Yes                         | Varies    | Varies    | Yes          |
| Built-in surveys           | Yes                         | Plugin    | No        | No           |
| Built-in chapters/playlist | Yes                         | Plugin    | Partial   | No           |
| Images/embeds              | Yes                         | No        | No        | No           |
| DRM                        | No                          | Plugin    | No        | Yes          |
| Ads                        | Contract only               | Plugin    | Plugin    | No           |
| SSR                        | No                          | No        | No        | No           |
| Runtime deps               | Zero                        | Some      | Some      | Some         |

The comparison is about **scope**, not superiority. If you need DRM or a mature
ad ecosystem today, Shaka/Video.js plus plugins may be the better choice. If you
need a consistent, typed, framework-neutral experience surface with surveys,
playlists, images and embeds, this library is designed for that.

---

## When to use it

Use it when you need:

- one player across React/Vue/Angular/Svelte/plain HTML;
- video, audio, images and embeds with one API;
- built-in captions, quality, speed, chapters, playlists, surveys, resume and
  analytics;
- a headless core for a bespoke UI;
- strict TypeScript and a small dependency footprint.

---

## When not to use it

Do not use it when you need:

- DRM (Widevine/FairPlay/PlayReady) today;
- a production VAST/IMA ad stack today;
- a Google Cast SDK integration today;
- server-side rendering of the player;
- a public plugin marketplace;
- a legacy browser bundle (IE11).

Those are explicit non-goals in `0.0.1`. See [Roadmap](./roadmap.md).

---

## What “experience release” means

`0.0.1` focuses on the playback experience: native media, streaming, images,
embeds, controls, menus, captions, chapters, playlists, surveys, theming,
i18n, shortcuts, accessibility and packaging.

It does **not** claim completeness for monetisation (ads), casting SDKs, VR or
DRM. Those are documented as scaffolded or out of scope so you can plan around
them.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)