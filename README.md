# Universal Player

<p align="center">
  <img src="https://img.shields.io/badge/npm-0.0.1%20unreleased-orange?logo=npm&logoColor=white" alt="npm package 0.0.1, unreleased">
  <img src="https://img.shields.io/badge/registry-not%20published-lightgrey" alt="Not yet published to the public npm registry">
  <img src="https://img.shields.io/badge/TypeScript-declarations-blue?logo=typescript&logoColor=white" alt="TypeScript declarations included">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
  <img src="https://img.shields.io/github/issues/malikrajat/universal-player" alt="Open issues">
  <img src="https://img.shields.io/github/stars/malikrajat/universal-player" alt="GitHub stars">
  <img src="https://img.shields.io/github/issues-pr/malikrajat/universal-player" alt="Open pull requests">
  <img src="https://img.shields.io/github/contributors/malikrajat/universal-player?color=blue" alt="Contributors">
  <img src="https://img.shields.io/github/commit-activity/m/malikrajat/universal-player" alt="Commit activity">
  <img src="https://img.shields.io/github/last-commit/malikrajat/universal-player" alt="Last commit">
  <img src="https://img.shields.io/badge/Stability-experience%20release-yellow" alt="Experience release">
  <img src="https://img.shields.io/badge/Runtime%20dependencies-none-success" alt="Zero runtime dependencies">
  <img src="https://img.shields.io/badge/Peer%20dependencies-optional-success" alt="Optional peer dependencies">
  <img src="https://img.shields.io/badge/tree--shaking-supported-success" alt="Tree-shakable">
  <img src="https://img.shields.io/badge/output-unbundled%20ESM%20%2B%20.d.ts-blue" alt="Unbundled ESM with declarations">
  <img src="https://img.shields.io/badge/formats-Video%20%7C%20Audio%20%7C%20Images%20%7C%20Embeds-blue" alt="Supported media kinds">
  <img src="https://img.shields.io/badge/inputs-23-blue" alt="23 media formats and inputs">
  <img src="https://img.shields.io/badge/engines-8-blue" alt="8 engine providers">
  <img src="https://img.shields.io/badge/entry%20points-9-blue" alt="9 public code entry points">
  <img src="https://img.shields.io/badge/error%20codes-9-blue" alt="9 stable error codes">
  <img src="https://img.shields.io/badge/Web%20Component-supported-success" alt="Web component">
  <img src="https://img.shields.io/badge/Frameworks-React%20%7C%20Vue%20%7C%20Angular%20%7C%20Svelte-blue" alt="Framework adapters">
  <img src="https://img.shields.io/badge/Streaming-HLS%20%7C%20DASH%20optional%20peers-blue" alt="HLS and DASH via optional peers">
  <img src="https://img.shields.io/badge/TypeScript-strict-success" alt="Strict TypeScript">
  <img src="https://img.shields.io/badge/WCAG%202.2-AA%20target-success" alt="WCAG 2.2 AA target">
  <img src="https://img.shields.io/badge/SSR-import--safe%20core-success" alt="Core import safe on the server">
  <img src="https://img.shields.io/badge/Runtime-browser--only-blue" alt="Browser only">
  <img src="https://img.shields.io/badge/browsers-Chrome%20125%2B%20%7C%20Firefox%20128%2B%20%7C%20Safari%2018%2B-blue" alt="Supported browsers">
  <img src="https://img.shields.io/badge/Tests-Vitest%20%7C%20Playwright-success" alt="Tests">
  <img src="https://img.shields.io/badge/Coverage-gated-success" alt="Coverage gated">
  <img src="https://img.shields.io/badge/API-documented-blue" alt="API documented">
  <img src="https://img.shields.io/badge/Examples-available-success" alt="Examples available">
  <img src="https://img.shields.io/badge/Releases-Changesets-blue" alt="Changesets">
  <img src="https://img.shields.io/badge/Maintained-yes-success" alt="Maintained">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-blue?logo=githubactions&logoColor=white" alt="CI on GitHub Actions">
</p>

<div align="center">
  <h3>
    <a href="https://github.com/malikrajat/universal-player">Source Code</a>
    •
    <a href="./docs/README.md">Documentation</a>
    •
    <a href="./examples/README.md">Examples</a>
    •
    <a href="./docs/features.md">Feature Status</a>
  </h3>
</div>

<div align="center">
  <p>
    <strong>Framework Agnostic</strong> ·
    <strong>Headless Core</strong> ·
    <strong>Built-in Web Component</strong> ·
    <strong>Type-Safe</strong> ·
    <strong>Zero Runtime Dependencies</strong>
  </p>
</div>

> **Publication status:** `@codewithrajat/universal-player@0.0.1` is **not published on the public npm registry**. Registry commands in this README are intended-only. Build the repository and install it from the folder (`pnpm add file:/absolute/path/to/universal-player`) or a packed tarball until a release exists. See [Installation](./docs/getting-started/installation.md).

> **Status: experience release.** Native playback, images, HLS, DASH,
> YouTube/Vimeo time sync, adaptive controls, chapters, playlists, thumbnails,
> caption menus, in-player surveys and a YouTube-style control surface are
> implemented. The Chromecast SDK, ads and VR remain contract-only. See
> [Feature status](./docs/features.md).

## See It In Action

The smallest integration is one import and one element. The custom element owns
the complete built-in UI and exposes a live `UniversalPlayer` instance as
`element.player`:

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="dark"
  locale="en"
  label="Product tour"
></universal-player>
```

That gives you playback, a YouTube-style control bar, caption and quality menus,
keyboard shortcuts, fullscreen, Picture-in-Picture, theming and accessible
markup. No framework, no adapter and no runtime dependency are required.

## Table of Contents

- [Installation](./docs/getting-started/installation.md)
- [Quick Start / Usage](./docs/quick-start.md)
- [API Reference](./docs/api-reference.md)
- [Configuration](./docs/configuration.md)
- [Core Concepts](./docs/core-concepts.md)
- [Architecture](./docs/architecture.md)
- [Formats & Feature Status](./docs/features.md)
- [Frameworks](./docs/frameworks.md)
- [Theming](./docs/theming.md)
- [Captions](./docs/captions.md)
- [Surveys](./docs/surveys.md)
- [Media Sources & Features](#media-sources--playback-features)
- [Feature Status](#feature-status)
- [Performance Optimization](#performance-optimization)
- [Browser Support](#browser-support)
- [Migration & Versioning](./docs/migration.md)
- [FAQ](#faq)
- [Troubleshooting](./docs/troubleshooting.md)
- [Release & Publishing](./docs/maintainers/release.md)
- [Project Structure](#architecture--project-structure)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
- [Examples](./examples/README.md)

## Documentation & Examples

| | |
| --- | --- |
| <a href="./docs/README.md" target="_blank"><img src="https://img.shields.io/badge/Documentation_Index-1976D2?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Documentation Index"/></a><br/><br/><sub><b>Documentation Index</b></sub><br/><sub>Guides, API reference and internals</sub> | <a href="./examples/README.md" target="_blank"><img src="https://img.shields.io/badge/Code_Examples-181717?style=for-the-badge&logo=github&logoColor=white" alt="Examples"/></a><br/><br/><sub><b>Complete Examples</b></sub><br/><sub>Copy-paste ready, every framework and format</sub> |
| <a href="https://github.com/malikrajat/universal-player" target="_blank"><img src="https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository"/></a><br/><br/><sub><b>Source Code</b></sub><br/><sub>Star, fork, and contribute</sub> | <a href="./docs/features.md" target="_blank"><img src="https://img.shields.io/badge/Feature_Status-16A34A?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Feature status"/></a><br/><br/><sub><b>Feature Status</b></sub><br/><sub>What is implemented, partial or scaffolded</sub> |
| <a href="./docs/architecture.md" target="_blank"><img src="https://img.shields.io/badge/Architecture_%26_Decisions-375A7F?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Architecture and Decisions"/></a><br/><br/><sub><b>Architecture &amp; Decisions</b></sub><br/><sub>How it works, and why it is shaped that way</sub> | <a href="./docs/roadmap.md" target="_blank"><img src="https://img.shields.io/badge/Roadmap-F59E0B?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Roadmap"/></a><br/><br/><sub><b>Roadmap</b></sub><br/><sub>Shipped, partial, scaffolded and out of scope</sub> |

## Quick Start

`@codewithrajat/universal-player` is a framework-agnostic media player for **video, audio, still images and third-party embeds**. It ships one headless TypeScript core, one `<universal-player>` web component that owns the built-in UI, and thin adapters for React, Vue 2.7/3, Angular, Svelte 4 and Svelte 5.

A source is normalized into one of eight internal engine providers — native, image, HLS, DASH, YouTube, Vimeo, generic embed and chunked — and the player exposes one immutable state snapshot, three equivalent event styles and a stable set of error codes. The core has no runtime dependencies, streaming SDKs are optional lazy peers, and the package is ESM-only and tree-shakeable.

`0.0.1` is an **experience release** and is currently unreleased on npm. Core playback and the documented experience features are implemented; ads, Chromecast SDK and VR are contract-only.

### Installation

```bash
# Real path today (the registry has no published version)
pnpm install
pnpm build
pnpm add file:/absolute/path/to/universal-player

# Intended-only, after a public release:
# pnpm add @codewithrajat/universal-player
# npm install @codewithrajat/universal-player
```

### Basic Usage

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  controls: "native", // or "custom" with your own chrome
  poster: "/media/poster.jpg",
});

await player.load("/media/clip.mp4");
await player.play();

player.on("timeupdate", ({ currentTime, duration }) => {
  console.log(currentTime, duration);
});

player.destroy();
```

Use `/core` when you want playback and state without built-in chrome. Use the
root entry or `/ui` when you want the full `<universal-player>` experience.

### State

`player.state` is an immutable snapshot containing status, source, timing,
volume, playback rate, quality, text/audio tracks, live/fullscreen/PiP flags and
the last error.

### Three event styles

```ts
// 1. Standard DOM events
player.addEventListener("play", (event) => {
  console.log((event as CustomEvent).detail);
});

// 2. Typed subscriptions
const unsubscribe = player.on("timeupdate", ({ currentTime }) => {
  console.log(currentTime);
});
unsubscribe();

// 3. Observable streams (RxJS-compatible; no rxjs import required)
player.observe("statechange").subscribe((state) => {
  console.log(state.status);
});

// Optional lazy RxJS bridge (only if rxjs is installed)
import { toRxjsObservable } from "@codewithrajat/universal-player/core";
const rx = await toRxjsObservable(player.observe("play"));
```

## Why “universal”

The player is not tied to `<video>`. It resolves a source into one of eight
internal engine providers:

| Source | Engine | Runtime dependency |
| --- | --- | --- |
| `.mp4`, `.webm`, `.mov`, ... | native | none |
| `.mp3`, `.wav`, `.m4a`, ... | native | none |
| `.jpg`, `.png`, `.avif`, ... | image | none |
| `.m3u8` | HLS | optional `hls.js` |
| `.mpd` | DASH | optional `dashjs` |
| YouTube URLs | iframe embed | none |
| Vimeo URLs | iframe embed | none |
| Structured `{ kind: "embed", provider: "generic" }` | generic embed | none |
| Chunked `Blob`/stream input | chunked | none |
| `Blob`, `File`, `MediaStream`, `data:` URLs, arrays | native / image | none |

Engine selection is internal. The public API deliberately does **not** expose a
plugin registry (see [docs/decisions.md](./docs/decisions.md)).

## Features

- **One API for four media kinds**: Video, audio, still images and iframe embeds share the same player, state and event surface
- **Automatic engine selection**: Eight providers — native, image, HLS, DASH, YouTube, Vimeo, generic embed and chunked — chosen from extension, MIME type or host
- **Complete built-in UI**: `<universal-player>` adds a YouTube-style control bar, menus, gestures, overlays, captions UI and surveys
- **Headless by design**: `/core`, `/vanilla` and every framework adapter mount media and state without rendering chrome
- **Framework adapters**: React component + hook, Vue 2.7/3 component + composable, Angular controller, Svelte 4 and Svelte 5 components
- **Optional streaming peers**: `hls.js` and `dashjs` are imported lazily only when an `.m3u8` or `.mpd` source is loaded
- **Universal inputs**: URLs, `Blob`, `File`, `MediaStream`, `data:` URLs, chunk iterables, `ReadableStream` and source arrays
- **Chunked streaming**: Video/audio stream through `MediaSource` when supported and fall back to buffering into a Blob; images assemble into a Blob
- **Captions**: External WebVTT, CC quick toggle, Off + language menu, caption sizing, per-source persistence and headless control
- **Quality selection**: HLS/DASH level lists with `−`/`+` steps, Auto, and `[`/`]` keyboard shortcuts
- **Chapters and thumbnails**: Timeline markers, chapter menu, active label, seek-bar hover previews and sprite sheets
- **Playlists and gating**: Auto-advance, next/previous, looping, queue menu, `requireCompletion`, `allowNext` and `allowPrevious`
- **Surveys, feedback and quizzes**: In-player forms, seven question types, async providers, auto-submit, instant feedback, retakes and five presets
- **Adaptive controls**: The UI reads `state.kind` and `state.capabilities` and renders only the controls that make sense
- **Configurable control surface**: Allow-list, hide, reorder, settings sections, speed presets, timestamp mode, downloads and gestures
- **Theming**: Light/dark/system, `accent-color`, CSS custom properties and `::part()` hooks
- **Internationalization**: English strings, locale registration, per-instance overrides and RTL-safe logical properties
- **Keyboard shortcuts**: A full YouTube-style set plus a `?` help overlay and hints beside Settings rows
- **Share and embed**: Native share, copy link, social targets and a ready-to-paste player/iframe snippet
- **Resume and analytics**: Opt-in storage-backed resume, vendor-neutral event hooks and privacy-safe defaults
- **Accessibility**: Native controls, focus rings, ARIA state, reduced-motion and forced-colors support, targeting WCAG 2.2 AA
- **Deterministic core**: One immutable state snapshot, silent high-frequency patches, listener isolation and stable error codes
- **Strict TypeScript**: Strict source, bundled `.d.ts` per entry, source maps and validated public types
- **Zero runtime dependencies**: Optional peers only; the core ships nothing else
- **Tiny and tree-shakable**: Unbundled ESM output, `sideEffects` limited to CSS and the two element-registering entries
- **Validated packaging**: publint, attw, tarball allowlist, browser-import scan, SBOM and Changesets-based releases

---

## Quick Start Guide

### 1. Installation

Choose your preferred package manager. Until the package is published, use the
folder or tarball path from [Installation](./docs/getting-started/installation.md):

```bash
# From the repository root
pnpm install
pnpm build

# In your application
pnpm add file:/absolute/path/to/universal-player

# Or install a packed tarball
pnpm pack --pack-destination ..
pnpm add ../codewithrajat-universal-player-0.0.1.tgz
```

Optional peers, installed only when you need them:

```bash
pnpm add hls.js    # HLS streams
pnpm add dashjs    # MPEG-DASH streams
pnpm add rxjs      # optional RxJS interop via toRxjsObservable()
```

Framework peers come from your application: React, Vue, Angular and Svelte are
never installed by this package.

### 2. Basic Integration

#### Option A: Custom element with the built-in UI (Recommended)

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="system"
  locale="en"
  accent-color="#22c55e"
></universal-player>
```

Shadow DOM is the default and ships its own styles. For light DOM, add
`shadow="light"` and import `@codewithrajat/universal-player/styles.css` (or add
`inject-styles`).

#### Option B: Headless core (your own UI)

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "/media/clip.mp4",
  controls: "custom", // no chrome is rendered by the headless core
});

player.on("statechange", (state) => {
  console.log(state.status, state.currentTime);
});
```

| Entry point | Use it for | Renders built-in UI? |
| --- | --- | --- |
| `@codewithrajat/universal-player` | Core + UI + vanilla + feature helpers | Yes, registers the element |
| `@codewithrajat/universal-player/ui` | Element, i18n and registration | Yes |
| `@codewithrajat/universal-player/core` | Headless player, state, events, source detection | No |
| `@codewithrajat/universal-player/vanilla` | `mountUniversalPlayer()` | No |
| `@codewithrajat/universal-player/react` | Component + `useUniversalPlayer()` | No |
| `@codewithrajat/universal-player/vue` | Vue 2.7/3 component + composable | No |
| `@codewithrajat/universal-player/angular` | `AngularUniversalPlayer` controller | No |
| `@codewithrajat/universal-player/svelte4` | Svelte 4 component | No |
| `@codewithrajat/universal-player/svelte5` | Svelte 5 component | No |

Only `<universal-player>` draws the built-in control bar. The framework
wrappers and `mountUniversalPlayer()` mount the core, not the element.

### 3. Common Use Cases

#### Full UI in React, Vue, Angular or Svelte

Import `/ui` for its registration side effect, then render the element. Your
framework only owns placement and cleanup:

```tsx
import { createElement } from "react";
import "@codewithrajat/universal-player/ui";

export function LessonPlayer({ src }: { src: string }) {
  return createElement("universal-player", {
    src,
    controls: "custom",
    theme: "dark",
    style: { display: "block", inlineSize: "100%", aspectRatio: "16 / 9" },
  });
}
```

For headless React playback, use the adapter instead:

```tsx
import { useUniversalPlayer } from "@codewithrajat/universal-player/react";

export function HeadlessPlayer({ src }: { src: string }) {
  const { hostRef } = useUniversalPlayer({ source: src, controls: "native" });
  return <div ref={hostRef} />;
}
```

#### Vanilla, Vue, Angular and Svelte

```ts
// Vanilla mount helper (headless)
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#app", {
  source: "/media/clip.mp4",
  poster: "/media/poster.jpg",
  controls: "native",
});
```

```vue
<!-- Vue 2.7 / Vue 3 (headless) -->
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer src="/media/clip.mp4" controls="native" />
</template>
```

Angular libraries built by a generic bundler cannot safely ship a precompiled
`@Component`, so the package ships a decorator-free controller. You own the
standalone component and forward lifecycle calls:

```ts
import { Component, ElementRef, ViewChild, type AfterViewInit } from "@angular/core";
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";

@Component({
  selector: "app-player",
  standalone: true,
  template: `<div #host></div>`,
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild("host", { static: true }) host!: ElementRef<HTMLElement>;
  private controller!: AngularUniversalPlayer;

  ngAfterViewInit(): void {
    this.controller = new AngularUniversalPlayer({
      elementRef: this.host,
      inputs: { source: "/media/clip.mp4", controls: "native" },
    });
    this.controller.ngAfterViewInit();
  }
}
```

```svelte
<!-- Svelte 5 (headless) -->
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src="/media/clip.mp4" controls="native" />
```

Svelte 4 uses the same component shape from `/svelte4`. A complete Angular
example lives in the [Angular guide](./docs/frameworks.md#angular).

#### Image Gallery with Zoom and Rotation

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container,
  source: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"],
  image: { slideDuration: 5, zoom: true, rotate: true },
});
```

An array becomes a playlist/gallery. Images get zoom, rotate and optional
download controls instead of a timeline and volume slider.

#### HLS or DASH Stream

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container,
  source: "https://example.com/live.m3u8",
  live: true,
});

// hls.js is imported lazily; install it only where streaming is used.
await player.play();
```

#### Post-Watch Survey

```ts
import { createPlayer, endOfVideoFeedback } from "@codewithrajat/universal-player";

const player = createPlayer({
  container,
  source: "/courses/lesson-1.mp4",
  survey: endOfVideoFeedback({
    title: "Was lesson one useful?",
    onSubmit: (result) => saveFeedback(result.answers),
  }),
});
```

See [ready-made survey presets](./docs/surveys.md) for NPS, content feedback,
blocking reviews and quiz feedback.

### 4. Advanced Configuration

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container,
  source: "/media/clip.mp4",
  controls: "custom",
  theme: "dark", // "light" | "dark" | "system"
  locale: "en",
  label: "Product tour",

  autoplay: false,
  muted: false,
  loop: false,
  preload: "metadata",
  poster: "/media/poster.jpg",
  playsInline: true,
  volume: 0.8,
  playbackRate: 1,
  startTime: 0,

  captions: {
    enabled: true,
    defaultTrack: "en",
    persist: true,
    style: { fontSize: "120%", color: "#fff", background: "rgba(0,0,0,.7)" },
  },

  chapters: [
    { id: "intro", title: "Introduction", startTime: 0 },
    { id: "demo", title: "Demo", startTime: 90 },
  ],

  thumbnails: {
    cues: [{ startTime: 0, endTime: 10, url: "/media/thumb-0.jpg" }],
  },

  playlist: {
    items: [
      { source: "/media/lesson-1.mp4", title: "Lesson 1" },
      { source: "/media/lesson-2.mp4", title: "Lesson 2" },
    ],
    autoAdvance: true,
    autoAdvanceDelay: 3,
    requireCompletion: true,
  },

  resume: { enabled: true, minDuration: 30 },

  analytics: {
    onEvent: (event) => queue.push(event),
  },

  ui: {
    controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"],
    order: ["play", "volume", "time", "captions", "settings", "fullscreen"],
    settings: {
      speed: true,
      quality: true,
      captions: true,
      sleepTimer: true,
      stats: false,
    },
    speed: { rates: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    time: { mode: "elapsed", toggle: true, showTotal: true },
    download: false,
    gestures: { enabled: true, swipeSeek: true, swipeUp: false },
    theme: {
      colors: { accent: "#22c55e" },
      radius: "0.9rem",
      variables: { "--up-control-size": "2.75rem" },
    },
    idleDelay: 2500,
  },
});
```

Only `container` is required. Omitted options keep their documented defaults,
and UI-only options (`theme`, `ui`, `locale`, `strings`, `keyboard`,
`clickToPlay`, `doubleClickFullscreen`, `autoHideControls`, `seekStep`,
`volumeStep`) are inert in headless entries. See
[Configuration](./docs/configuration.md) and [Defaults](./docs/defaults.md).

### 5. Programmatic Control

```ts
import { createPlayer, isPlayerError } from "@codewithrajat/universal-player/core";

const player = createPlayer({ container });

await player.load("/media/clip.mp4");
await player.play();
player.pause();
player.seek(30);
player.setVolume(0.8);
player.setMuted(true);
player.setPlaybackRate(1.5);

player.setQuality("720p"); // null = automatic
player.setTextTrack("en"); // null = captions off
player.setAudioTrack("commentary");
player.seekToChapter("demo");
await player.next();
await player.previous();

player.setSurvey(async () => {
  const response = await fetch("/api/survey");
  return response.json();
});
await player.openSurvey();

await player.requestFullscreen();
await player.requestPictureInPicture();
player.destroy();
```

Errors are plain `Error` objects with a stable `code`:

```ts
try {
  await player.play();
} catch (error) {
  if (isPlayerError(error)) {
    console.log(error.code); // "invalid-state", "media-error", ...
  }
}
```

`destroy()` is terminal: it stops playback, revokes owned object URLs, clears
timers and removes the surface. Create a new player instead of reusing a
destroyed one.

### 6. Built-in UI, Theming and Share

The built-in UI is capability-driven:

| Media | Controls |
| --- | --- |
| video | Play, seek, time, volume, CC, settings, chapters, playlist, PiP, fullscreen |
| audio | Play, seek, time, volume, settings, playlist, loop, autoplay, fullscreen |
| image | Zoom in/out, rotate, download, share, fullscreen (no timeline or volume) |
| embed | Play, seek, time, volume, settings, fullscreen |

Set a brand colour per instance with `accent-color`, or use CSS custom
properties and `::part()`:

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

```css
universal-player {
  --up-color-accent: #22c55e;
  --up-radius: 1rem;
  --up-font-family: "Inter", system-ui, sans-serif;
}
```

The share sheet includes native share, copy link, social targets and an
**Embed** action that copies a ready-to-paste iframe snippet:

```ts
createPlayer({
  container,
  source: "/media/clip.mp4",
  ui: {
    share: {
      url: "https://example.com/watch/clip",
      title: "Lesson one",
      thumbnail: "/media/thumb.jpg",
      embed: { mode: "player", poster: "/media/thumb.jpg", width: 960, height: 540 },
    },
  },
});
```

Localized strings can be registered globally or overridden per instance:

```ts
import { registerLocale } from "@codewithrajat/universal-player/ui";

registerLocale("hi", { play: "चलाएँ", pause: "रोकें" });
```

---

## Media Sources & Playback Features

### Sources: URL, stored, chunked and arrays

Every media type accepts the same source styles:

```ts
// Remote URL
await player.load("/media/clip.mp4");

// Stored file / Blob / object URL / data URL
await player.load(file);
await player.load("data:image/png;base64,...");

// A list becomes a playlist/gallery (images or clips)
await player.load(["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"]);

// Chunked upload or API response
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: async function* () {
    const response = await fetch("/api/video");
    const reader = response.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  },
});
```

Chunked video/audio stream through `MediaSource` when the MIME type supports it
and fall back to buffering into a Blob. Chunked images are assembled into a
Blob. Pass a function that returns a fresh iterable/stream when the source must
be replayable or reloadable.

```ts
source: {
  kind: "video",
  type: "video/mp4",
  mode: "blob", // always buffer first
  chunks: () => fetchChunks(), // reusable
}
```

Playing a finished video automatically seeks back to `0` before replaying, so
the same URL/source can be replayed without reloading it.

For a photo slideshow, pass an array and set `image.slideDuration`; objects are
revoked when the source is replaced or the player is destroyed.

### Captions and subtitles

External WebVTT tracks can be supplied per source or per player. The CC button
toggles subtitles **on/off** immediately; open **Settings → Subtitles/CC** to
choose a language, turn them off, or change the caption size. Track choice and
caption size are remembered per source.

```ts
const player = createPlayer({
  container,
  source: {
    kind: "video",
    src: "/media/lecture.mp4",
    captions: [
      { src: "/media/en.vtt", label: "English", language: "en", default: true },
      { src: "/media/hi.vtt", label: "हिन्दी", language: "hi" },
    ],
  },
  captions: {
    enabled: true,
    defaultTrack: "en",
    style: { fontSize: "120%", color: "#fff", background: "rgba(0,0,0,.7)" },
  },
});

player.setTextTrack("hi");
player.setTextTrack(null); // off
player.toggleCaptions(); // keyboard: C
player.setCaptionStyle({ fontSize: "140%" });
```

### Surveys, feedback and quizzes

Surveys are rendered **inside the player**, not on a separate page. Questions
can come from the player config, from source metadata, or from an async provider
(for example an API call when the video ends). Supported question types:
`radio`, `checkbox`, `select`, `text`, `textarea`, `rating` and `scale`. Choice
questions support `allowOther`, `minSelections` and `maxSelections`; text
questions support `minLength`/`maxLength`; numeric questions support
`min`/`max`/`step`. Required validation is enforced by both the UI and the core.

The package ships five copy-paste presets. Spread any preset and override only
what you need:

| Preset | Use it for |
| --- | --- |
| `endOfVideoFeedback` | CSAT rating + topics + optional comment |
| `netPromoterScore` | NPS 0–10 + reason |
| `contentFeedback` | "Was this helpful?" with one-select auto-submit |
| `blockingReview` | Required review/notes before the viewer can continue |
| `quizFeedback` | Instant correct/incorrect quiz feedback |

Submission is configurable: `manual`, `on-select` or `on-complete`, with
`autoSubmitDelay`, `instantFeedback` and `maxAttempts`. Use `required`/`blocking`
to prevent dismissal, and `allowRetake` for training or assessment flows.
`player.setSurvey()` supplies dynamic questions and
`validateSurveyAnswers()` validates without opening the UI.

### Chapters, playlists and time sync

```ts
const player = createPlayer({
  container,
  chapters: [
    { id: "intro", title: "Introduction", startTime: 0 },
    { id: "demo", title: "Demo", startTime: 90 },
  ],
  playlist: {
    items: [
      { source: "/media/one.mp4", title: "One" },
      { source: "/media/two.mp4", title: "Two" },
    ],
    autoAdvance: true,
    autoAdvanceDelay: 3,
  },
  thumbnails: {
    cues: [{ startTime: 0, endTime: 10, url: "/media/thumb-0.jpg" }],
  },
});

await player.next();
await player.previous();
player.seekToChapter("demo");
```

YouTube and Vimeo embeds mirror `currentTime`, `duration`, buffered progress and
play/pause/ended state over `postMessage`. Call `player.syncTime()` for an
immediate refresh.

### Thumbnail images

Thumbnails can be used in four places:

- **Poster before playback** — set `poster="/poster.jpg"` (or the
  `thumbnail` alias) on `<universal-player>` / `PlayerOptions.poster`.
- **Seek-bar hover previews** — pass `thumbnails: { cues: [...] }` or the
  `thumbnails` JSON attribute.
- **Share/embed preview** — set `ui.share.thumbnail` and
  `ui.share.embed.poster`.
- **Playlist/chapter thumbnails** — set `poster` on playlist items or
  `thumbnail` on chapters; they render beside the item in the menu.

### Audio presentation

Audio-only sources show an animated gradient and equalizer surface by default so
the player still has a focused, eye-catching visual. If the audio source or
playlist item supplies `poster`/`thumbnail`, that image is shown instead.
Settings also exposes **Autoplay** and, for playlists, **Autoplay next** so the
viewer can control automatic playback.

### Keyboard shortcuts

`Space`/`K` play-pause, `M` mute, `F` fullscreen, `C` subtitles on/off,
`S` open Settings, `Q` open the quality sheet, `[`/`]` lower or raise quality,
`A` open audio tracks, `T` open the sleep timer, `R` toggle loop, arrows seek
and change volume, `J`/`L` seek 10s, `0`–`9` seek to a percentage, `Home`/`End`
jump to start/end, `<`/`>` change speed, `N`/`P` next/previous, `I` stats for
nerds, `?` shortcut help and `Esc` closes overlays. Shortcut hints are also
shown beside the matching rows in the Settings sheet.

### Declarative configuration

Complex options can be passed as JSON attributes, which lets CMS authors
configure chapters, playlists and surveys without a code change:

```html
<universal-player
  src="/media/clip.mp4"
  chapters='[{"id":"a","title":"Intro","startTime":0}]'
  survey='{"title":"How was it?","questions":[{"id":"liked","type":"radio","label":"Liked?","options":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}]}]}'
  captions='{"tracks":[{"src":"/en.vtt","label":"English","language":"en"}]}'
  ui='{"speed":false,"download":false,"controls":{"share":false,"cast":false},"gestures":{"enabled":true,"swipeUp":false}}'
></universal-player>
```

### Accessibility

Target: **WCAG 2.2 AA**.

- Every control is a native `<button>`/`<input>`/`<select>`.
- Visible focus rings and full keyboard operation.
- `aria-label`, `aria-pressed`, `aria-valuetext`, `aria-busy` and `role="alert"`.
- Reduced-motion and forced-colors media queries.
- RTL-safe logical CSS properties.

A formal axe/Playwright audit is on the roadmap; see
[docs/features.md](./docs/features.md).

---

## Code Examples

Explore the recipes in [`examples/`](./examples/README.md). Every page is
copy-paste ready and written against the repository source:

| Example | Description | File |
| --- | --- | --- |
| **Custom Element (Full UI)** | The smallest setup: one import, one element, complete chrome | [`examples/vanilla/basic-usage.md`](./examples/vanilla/basic-usage.md) |
| **Headless Core** | Drive playback and build your own controls | [`examples/vanilla/advanced-usage.md`](./examples/vanilla/advanced-usage.md) |
| **Upload and Preview** | Accept a `File`/`Blob`, preview it, and revoke the object URL | [`examples/recipes/01-upload-and-preview.md`](./examples/recipes/01-upload-and-preview.md) |
| **Custom Chrome** | Replace the built-in surface with your own buttons | [`examples/recipes/04-custom-chrome.md`](./examples/recipes/04-custom-chrome.md) |
| **Captions and Navigation** | Track menus, chapters and keyboard navigation | [`examples/recipes/05-captions-and-navigation.md`](./examples/recipes/05-captions-and-navigation.md) |
| **Surveys and Quizzes** | In-player forms, presets, auto-submit and retakes | [`examples/recipes/08-survey-and-quiz.md`](./examples/recipes/08-survey-and-quiz.md) |
| **Quality and Adaptation** | HLS/DASH levels, auto, and quality controls | [`examples/recipes/09-quality-and-adaptation.md`](./examples/recipes/09-quality-and-adaptation.md) |
| **HLS and DASH** | Optional peers, CORS and live playback | [`examples/recipes/10-hls-dash.md`](./examples/recipes/10-hls-dash.md) |
| **SSR and Teardown** | Client-only mounting and reliable cleanup | [`examples/recipes/11-ssr-and-teardown.md`](./examples/recipes/11-ssr-and-teardown.md) |
| **Testing** | Unit, browser and package-level checks | [`examples/recipes/12-testing.md`](./examples/recipes/12-testing.md) |
| **React / Next.js** | Component, hook and client-only guard | [`examples/react/README.md`](./examples/react/README.md) |
| **Vue / Nuxt** | Vue 2.7/3 component, composable and plugin setup | [`examples/vue/README.md`](./examples/vue/README.md) |
| **Angular** | Controller pattern, standalone component and zoneless setup | [`examples/angular/README.md`](./examples/angular/README.md) |
| **Svelte / SvelteKit** | Svelte 4/5 components and browser guard | [`examples/svelte/README.md`](./examples/svelte/README.md) |
| **Training Quiz** | Assessment flow with retakes and scoring | [`examples/use-cases/training-quiz.md`](./examples/use-cases/training-quiz.md) |
| **Live Event** | Live HLS, chat-safe controls and recovery | [`examples/use-cases/live-event.md`](./examples/use-cases/live-event.md) |
| **Production Guides** | Accessibility, performance, security, SSR and compatibility | [`examples/guides/README.md`](./examples/guides/README.md) |

[View All Examples](./examples/README.md)

---

## Documentation

| Documentation | Description |
| --- | --- |
| **[Getting Started](./docs/getting-started/introduction.md)** | What the library is, install, first mount |
| **[Quick Start](./docs/quick-start.md)** | Five mount paths in one page |
| **[Configuration](./docs/configuration.md)** | Every option, precedence and runtime behavior |
| **[Defaults](./docs/defaults.md)** | The value in force when an option is omitted |
| **[Core Concepts](./docs/core-concepts.md)** | Lifecycle, events, state, engines and sources |
| **[Architecture](./docs/architecture.md)** | Layers, parameter flow, build and dependency policy |
| **[Feature Status](./docs/features.md)** | Implemented, partial, scaffolded and out of scope |
| **[Formats Matrix](./docs/reference/formats-matrix.md)** | Capabilities and verification level per input |
| **[API Reference](./docs/api-reference.md)** | Every export, option, method, event and type |
| **[Frameworks](./docs/frameworks.md)** | React, Vue, Angular and Svelte integrations |
| **[Theming](./docs/theming.md)** | Tokens, parts, light/dark/system and design guidance |
| **[Captions](./docs/captions.md)** | Track setup, menus, sizing and persistence |
| **[Surveys](./docs/surveys.md)** | Question types, triggers, presets and submission |
| **[Keyboard Shortcuts](./docs/keyboard-shortcuts.md)** | The full shortcut set and help overlay |
| **[Accessibility](./docs/accessibility.md)** | WCAG 2.2 AA target, ARIA and reduced motion |
| **[Performance](./docs/performance-optimization.md)** | Keeping the player out of the hot path |
| **[Testing](./docs/testing.md)** | Unit, browser and package validation |
| **[Migration](./docs/migration.md)** | Move from `<video>`, Video.js, Plyr or another player |
| **[Troubleshooting](./docs/troubleshooting.md)** | Symptoms, causes, diagnosis and fixes |
| **[Browser Support](./docs/browser-support.md)** | Declared floors, API fallbacks and SSR frameworks |

---

## Installation & Setup

For detailed installation instructions, see the
[Getting Started guide](./docs/getting-started/installation.md).

The package has no runtime dependencies and ships ESM only. Native video,
audio and images need nothing extra. HLS and DASH remain optional peers:

```bash
pnpm add hls.js    # .m3u8
pnpm add dashjs    # .mpd
pnpm add rxjs      # optional toRxjsObservable() bridge
```

Because the package is not yet published, point your bundler at the repository
folder or a packed tarball:

```bash
pnpm install
pnpm build
pnpm add file:/absolute/path/to/universal-player
```

The folder must contain `dist/`, because the export map points at built files.

For plain HTML, register the element with a module import:

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/clip.mp4" controls="custom"></universal-player>
```

Shadow DOM is the default and needs no stylesheet. Only light-DOM usage requires
`@codewithrajat/universal-player/styles.css`.

---

## Usage

For comprehensive usage examples and the full API, see the
[Quick Start](./docs/quick-start.md) and the
[API reference](./docs/api-reference.md).

The short mental model:

- `<universal-player>` = full UI + playback.
- `/core`, `/vanilla` and framework adapters = playback + state, no chrome.
- The source determines the engine; there is no public plugin or engine registry.
- You own assets, CORS, signed URLs and server-side validation.

---

## Feature Status

This matrix is the contract for what `0.0.1` actually does.

| Area | Status | Notes |
| --- | --- | --- |
| Native video/audio | Implemented | MP4/WebM/MOV; MP3/WAV/M4A and browser-supported codecs |
| Stored/chunked | Implemented | Blob/File/data URL + chunk streams via MediaSource/Blob |
| Images | Implemented | JPG/PNG/WebP/AVIF/SVG/GIF + zoom/rotate/download |
| HLS / DASH | Implemented | Via optional peers; native HLS in Safari |
| YouTube / Vimeo | Implemented | Commands, play state, duration and time sync via postMessage |
| Generic iframe | Implemented | Renders the URL; no command bridge |
| `MediaStream` sources | Implemented | Native engine uses `srcObject` |
| DRM | Out of scope | No EME/license-server support |
| Play / pause / seek | Implemented | Core + UI + click-to-play + keyboard |
| Volume / mute / speed | Implemented | Speed `0.25`–`4`; slider + preset chips |
| Fullscreen / PiP | Implemented | Core + UI |
| Captions | Implemented | External WebVTT, Off + language menu, sizing, persistence |
| Multiple audio tracks | Implemented | Native switching + settings menu |
| Quality selection | Implemented | HLS/DASH levels + settings menu |
| Live / DVR | Partial | Live label/state + seekable helpers; dedicated DVR UI not built |
| Resume / loop / autoplay | Implemented | Storage-backed, opt-in resume; loop and autoplay toggles |
| Sleep timer | Implemented | 5–60 minute presets; pauses playback and shows a toast |
| AirPlay / Cast prompt | Implemented | Remote Playback API button |
| Chromecast SDK | Scaffolded | Typed `CastProvider` contract |
| Thumbnails / preview | Implemented | Poster, seek hover, share preview, playlist/chapter images |
| Chapters | Implemented | Markers, menu, active chapter label |
| Playlist / queue | Implemented | Auto-advance, loop, next/previous, completion gating |
| Surveys / feedback | Implemented | In-player forms, dynamic providers, events, persistence |
| Mini-player | Implemented | PiP-based helper |
| Ads (VAST/IMA) | Scaffolded | Contract + stub controller |
| Analytics | Implemented | Player hooks + vendor-neutral sink |
| Stats for nerds | Implemented | Resolution, frames, buffer, quality, tracks, network |
| 360/VR | Scaffolded | Data-attribute contract only |
| Custom controls | Implemented | YouTube-style bar, translucent submenus, adaptive visibility |
| Control configuration | Implemented | Allow-list/hide/order, menu sections, speed, download |
| Theming / i18n | Implemented | CSS variables, light/dark/system, locale registration, RTL |
| Keyboard shortcuts | Implemented | Full YouTube-style set + help overlay |
| Share and embed | Implemented | Link/social share + iframe or player snippet + poster preview |
| ARIA state | Implemented | Labels, pressed/expanded/busy state, alert role |
| Formal WCAG audit | Not done | Target-oriented markup only; no automated axe audit |
| Framework adapters | Implemented | Vanilla, React, Vue 2.7/3, Angular, Svelte 4/5 |
| SSR | Not supported | Browser-only by decision |
| ESM / declarations | Implemented | `type: module`, bundled `.d.ts` per entry, source maps |
| Tree-shaking | Implemented | Unbundled output + `sideEffects` allowlist |
| Bundle budget | Not enforced | Deliberately deferred |
| publint / attw / checks | Implemented | Build + CI packaging gates |

See [docs/features.md](./docs/features.md) for the full matrix and
[docs/roadmap.md](./docs/roadmap.md) for what comes next.

---

## Browser Support

Evergreen browsers, compiled to ES2023:

- Chrome/Edge 125+
- Firefox 128+
- Safari 18+

The package ships ESM only. CommonJS consumers must use dynamic `import()`.

These are **declared minimums**, not a formal test matrix. The executed browser
test runs Chromium through Playwright. The player is browser-only: `core` imports
safely in Node, but constructing a player needs a DOM.

**Mobile notes:** `playsInline` is `true` by default on the element, iOS
fullscreen uses the native video path, PiP support varies, touch gestures are
opt-in, and autoplay generally requires `muted: true`.

See [docs/browser-support.md](./docs/browser-support.md) for API fallbacks and
SSR-framework guidance.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and updates.

---

### Latest Release

Check the [releases page](https://github.com/malikrajat/universal-player/releases) for the most
recent version and changes. Version `0.0.1` has not been published to npm yet.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use this library freely in commercial and personal projects.

### MIT License Summary

**You can:**

- Use commercially
- Modify the code
- Distribute
- Use privately

**You must:**

- Include the license and copyright notice

**You cannot:**

- Hold the author liable

---

## FAQ

<details>
<summary><strong>What does “universal” mean?</strong></summary>

The player is not tied to `<video>`. One API resolves **video, audio, still
images and embeds** into one of eight internal engines: native, image, HLS,
DASH, YouTube, Vimeo, generic embed and chunked. Each keeps the same state,
event and method surface wherever the underlying media permits it.

</details>

<details>
<summary><strong>Does it send data anywhere or need a backend?</strong></summary>

**No.** The package contains no endpoints, no account and no analytics backend.
Optional analytics are a callback you provide (`analytics.onEvent`), and resume
and caption persistence use `localStorage` by default. The player makes no
network requests at module load.

</details>

<details>
<summary><strong>Which runtimes and frameworks are supported?</strong></summary>

The runtime is **browser-only ESM**, targeting Chrome/Edge 125+, Firefox 128+
and Safari 18+. The core imports safely in Node, but constructing a player needs
a DOM. React 18/19, Vue 2.7/3, Angular 17+ and Svelte 4/5 have dedicated
adapters; the custom element works in any browser environment with Custom
Elements and ESM. Node 24+ is required for development and builds.

</details>

<details>
<summary><strong>Is it safe to import during server-side rendering?</strong></summary>

`/core` imports without touching the DOM or globals, so importing is safe. But
the player, the custom element and every framework adapter are **browser-only by
decision**: there is no SSR rendering. Mount them in `useEffect`, `onMount`,
`<ClientOnly>`, `isPlatformBrowser` or a dynamic import with `ssr: false`.

</details>

<details>
<summary><strong>Do I have to install hls.js and dashjs?</strong></summary>

Only if you load HLS or DASH sources. Both are optional peers, dynamically
imported by their adapters. Native MP4/WebM/audio/image playback needs no peer.
Safari plays HLS natively.

</details>

<details>
<summary><strong>Why does only the custom element show controls?</strong></summary>

`<universal-player>` owns the built-in UI. `/core`, `mountUniversalPlayer()` and
the React/Vue/Angular/Svelte adapters are headless by design: they mount media
and expose state but render no chrome. Use `controls: "native"` for browser
controls, mount the element for the full UI, or build your own controls from
`state` and the methods.

</details>

<details>
<summary><strong>How do I use the full UI inside React, Vue, Angular or Svelte?</strong></summary>

Import the registration side effect, then render the element:

```ts
import "@codewithrajat/universal-player/ui";
```

The element works in any framework's markup, with the usual custom-element
compiler flags: React renders it as a custom element (TypeScript may need a JSX
intrinsic declaration), Vue needs `compilerOptions.isCustomElement`, Angular
needs `CUSTOM_ELEMENTS_SCHEMA`, and Svelte works as-is. Your framework owns
placement and teardown; the element owns playback and chrome. Use the framework
adapter when you want headless playback instead.

</details>

<details>
<summary><strong>Can I play YouTube or Vimeo?</strong></summary>

**Yes.** Pass the URL or a structured embed source. Time, duration, buffered
progress and play/pause/ended state sync over `postMessage`. Provider
restrictions still apply: some videos disallow embedding, and captions, audio
tracks or quality levels are available only if the provider exposes them.

</details>

<details>
<summary><strong>Does it support DRM, ads, Chromecast or VR?</strong></summary>

- **DRM** is out of scope: no Widevine, FairPlay or PlayReady.
- **Ads (VAST/IMA)** and the **Chromecast SDK** are scaffolded contracts, not
  working integrations. The UI uses the Remote Playback API prompt for
  AirPlay/Cast where available.
- **360/VR** is a data-attribute contract only; there is no WebGL/XR renderer.

See [Feature status](./docs/features.md) before committing to those areas.

</details>

<details>
<summary><strong>How do I theme the built-in UI?</strong></summary>

Use `accent-color`, CSS custom properties, or `::part()`:

```css
universal-player {
  --up-color-accent: #22c55e;
  --up-radius: 1rem;
}
```

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

Shadow DOM is the default, so host CSS does not leak in. Switch to
`shadow="light"` and load `styles.css` only when you need to integrate with an
existing design system.

</details>

<details>
<summary><strong>How do I add a survey or quiz?</strong></summary>

Pass a `survey` config or spread a preset:

```ts
import { createPlayer, endOfVideoFeedback } from "@codewithrajat/universal-player";

const player = createPlayer({
  container,
  source: "/courses/lesson-1.mp4",
  survey: endOfVideoFeedback({ title: "Was this useful?" }),
});
```

Questions can also come from source metadata or an async provider via
`player.setSurvey()`. `validateSurveyAnswers()` validates without opening the
UI. Quiz correctness requires `kind: "quiz"`, `instantFeedback: true` and
`correct`/`explanation` on questions.

</details>

<details>
<summary><strong>Why did my survey not open a second time?</strong></summary>

`once` defaults to `true`. Set `once: false`, use a new survey `id`, or call
`player.openSurvey(true)` to force it. Retakes additionally require
`allowRetake: true` (or `allowResubmit`) and respect `maxAttempts`.

</details>

<details>
<summary><strong>Can I use it without a bundler?</strong></summary>

**Yes**, with a native ES module import. Shadow DOM is the default, so the
element ships its own styles. Light-DOM usage needs `styles.css` or the
`inject-styles` attribute. There is no CommonJS `require()` entry; use dynamic
`import()` in CJS environments.

</details>

<details>
<summary><strong>How large is the package, and will it bloat my bundle?</strong></summary>

The core has zero runtime dependencies, and the output is unbundled ESM with
`sideEffects` limited to CSS and the two element-registering entries. Unused
adapters, features and streaming SDKs are tree-shaken away. HLS/DASH peers are
only fetched when a matching source is loaded. A bundle budget is **not yet
enforced**; see the [roadmap](./docs/roadmap.md).

</details>

<details>
<summary><strong>Why is the package ESM-only?</strong></summary>

It targets modern browsers and bundlers, avoids the dual-package hazard and keeps
the export map small. CommonJS consumers use dynamic `import()`.

</details>

<details>
<summary><strong>Why does the Angular adapter use a controller instead of a component?</strong></summary>

Angular AOT requires partial-compilation metadata that a generic bundler cannot
emit. The decorator-free controller keeps AOT builds safe; you own the small
standalone component and forward lifecycle calls to it. See
[Frameworks](./docs/frameworks.md#angular).

</details>

<details>
<summary><strong>How do I stop memory growth after route changes?</strong></summary>

Call `player.destroy()`. It releases the engine, timers, document listeners and
object URLs. Framework adapters do this on unmount; if you use `/core` or
`mountUniversalPlayer()` directly, you own teardown. Do not reuse a destroyed
player.

</details>

<details>
<summary><strong>Is this library free for commercial use?</strong></summary>

**Yes.** Licensed under **MIT** — use it in commercial products, SaaS
applications and enterprise projects. You only need to retain the copyright
notice. See the [License](#license) section.

</details>

---

## Performance Optimization

### Optimization Tips

#### 1. Import the Lowest Surface That Fits

```ts
// Good: headless core only
import { createPlayer } from "@codewithrajat/universal-player/core";

// Also good: the UI only when you need it
import "@codewithrajat/universal-player/ui";
```

Avoid the root entry when you only need playback; it also pulls in the custom
element, i18n and feature helpers (still tree-shakeable, but explicit is
better). A React app never imports Vue or Angular.

#### 2. Create One Player per Surface and Destroy It

```ts
useEffect(() => {
  const player = createPlayer({ container, source });
  return () => player.destroy();
}, []);
```

Creating a player builds a stage, engine and listeners. Recreating it on every
render is expensive and loses playback position. Leaked players keep timers,
document listeners and decoders alive.

#### 3. Throttle High-Frequency Consumers

`timeupdate` typically fires 4–10 times per second, and `progress` can be
similar. `statechange` is the safe hook for full re-renders; it fires only on
meaningful transitions.

```ts
player.on(
  "timeupdate",
  throttle(({ currentTime }) => updateProgress(currentTime), 250),
);
```

Keep `analytics.onEvent` cheap too: queue or batch network work instead of
blocking the media pipeline.

#### 4. Preload Deliberately

```ts
createPlayer({ container, source, preload: "metadata" });
```

`metadata` loads dimensions and duration without the full file. `none` avoids
network until play. `auto` may download aggressively. On pages with many
players, prefer `metadata` or `none`.

#### 5. Choose the Right Source Strategy

| Scenario | Recommendation |
| --- | --- |
| Short clips | Direct MP4 URL |
| Long videos | MP4 with range requests, or HLS/DASH |
| Live | HLS/DASH |
| User upload before server | Chunked with `MediaSource` (`mode: "auto"`) |
| Large galleries | Lazy-load images; the player does not virtualise playlists |

Blob buffering holds the entire file in memory. Use `MediaSource` for large
files when the codec and MIME type are supported.

#### 6. Keep Streaming Peers on Streaming Routes

`hls.js` and `dashjs` are dynamically imported. Keep streaming sources on the
routes that need them so the SDK is not fetched on every page. Use a sprite
sheet (`spriteUrl`) for dense thumbnail previews instead of thousands of image
requests.

---

## Testing Examples

### Unit Testing with Vitest

```ts
import { describe, expect, it } from "vitest";
import { createPlayer } from "@codewithrajat/universal-player/core";

describe("UniversalPlayer", () => {
  it("starts idle and clamps volume", () => {
    const container = document.createElement("div");
    const player = createPlayer({ container });

    expect(player.state.status).toBe("idle");
    expect(player.state.volume).toBe(1);

    player.setVolume(2);
    expect(player.state.volume).toBe(1);

    player.destroy();
  });

  it("rejects play without media", async () => {
    const container = document.createElement("div");
    const player = createPlayer({ container });

    await expect(player.play()).rejects.toMatchObject({ code: "invalid-state" });

    player.destroy();
  });
});
```

Always destroy players you create, use real timers where possible, and assert
behaviour rather than private fields. Use `toMatchObject({ code })` for
`PlayerError`.

### Browser Testing with Vitest Browser Mode

Behaviours that jsdom cannot model — actual media decoding, fullscreen,
Picture-in-Picture, `srcObject`, `MediaSource` and CSS layout — belong in the
browser suite:

```ts
import { describe, expect, it } from "vitest";
import { createPlayer } from "@codewithrajat/universal-player/core";

describe("browser media", () => {
  it("loads a local video fixture", async () => {
    const container = document.createElement("div");
    document.body.append(container);

    const player = createPlayer({ container });
    const loaded = new Promise<void>((resolve) =>
      player.once("loadedmetadata", () => resolve()),
    );

    await player.load("/fixtures/clip.mp4");
    await loaded;

    expect(player.state.duration).toBeGreaterThan(0);
    expect(player.mediaElement?.tagName).toBe("VIDEO");

    player.destroy();
    container.remove();
  });
});
```

The workspace runs unit tests with **Vitest** in jsdom and browser tests through
**Vitest browser mode with the Playwright provider** (Chromium). Coverage is
gated on core and selected features at 90% lines/functions/statements and 80%
branches.

```bash
pnpm run test            # unit, jsdom
pnpm run test:watch      # watch
pnpm run test:coverage   # coverage + thresholds
pnpm run test:browser    # Chromium via Playwright
```

See [`examples/recipes/12-testing.md`](./examples/recipes/12-testing.md) for
more patterns.

---

## Migration Guide

### From a Native `<video>` Element

| Native approach | Universal Player |
| --- | --- |
| `<video src controls>` | `<universal-player src controls="custom">` |
| Query the `<video>` element | `player.mediaElement` when you truly need it |
| `video.play()` / `video.pause()` | `player.play()` / `player.pause()` |
| `video.currentTime` | `player.state.currentTime` / `player.seek()` |
| `video.volume` / `video.muted` | `player.state.volume` / `setVolume()` / `setMuted()` |
| `video.playbackRate` | `player.setPlaybackRate()` |
| `video.textTracks` | `player.state.textTracks` / `setTextTrack()` |
| `video.requestFullscreen()` | `player.requestFullscreen()` |
| `timeupdate`, `ended`, `loadedmetadata` | Typed `player.on(...)` events |

```html
<!-- Before -->
<video id="player" src="/clip.mp4" controls poster="/poster.jpg" preload="metadata"></video>

<!-- After: smallest change -->
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/clip.mp4"
  poster="/poster.jpg"
  controls="custom"
  preload="metadata"
></universal-player>
```

### From Video.js or Plyr

There is no automatic importer. The mapping is conceptual:

| Video.js / Plyr concept | This library |
| --- | --- |
| Player constructor | `createPlayer()` / `<universal-player>` |
| `player.play()` | `player.play()` |
| `player.currentTime()` | `player.state.currentTime` / `seek()` |
| `player.volume()` | `state.volume` / `setVolume()` |
| `player.on("event")` | `player.on("event")` |
| Plugins | Feature modules and core APIs |
| Skins | CSS tokens and `::part()` |
| Tech order | Automatic provider selection |

If you rely on a plugin with no equivalent (ads, DRM), keep the existing player
for that surface until the roadmap item ships.

### From Another Internal Player

1. Replace the wrapper component with the matching adapter or the element.
2. Map configuration to [`PlayerOptions`](./docs/api-reference.md#playeroptions).
3. Map events to [`PlayerEvents`](./docs/api-reference.md#events).
4. Replace custom controls with the `ui.controls` allow-list or hide object.
5. Move survey and feedback flows to `SurveyConfig`.
6. Move telemetry to `analytics.onEvent`.
7. Keep the old player behind a flag until parity is verified.

### Within `0.0.x`

- Read [CHANGELOG.md](./CHANGELOG.md).
- Re-run typecheck and tests.
- Check [Defaults](./docs/defaults.md) if you rely on omitted values.
- Pin exact peer versions in your lockfile and test upgrades in CI.

See the [Migration guide](./docs/migration.md) for framework-specific examples.

---

## Troubleshooting

### Common Issues

#### Issue: nothing renders

```ts
// Check the chain in order:
console.log(customElements.get("universal-player")); // undefined => not registered
console.log(document.querySelector("universal-player")?.player); // null => not connected
```

Ensure the root or `/ui` entry was imported, the element is connected to the
DOM, the host has a size, and the source did not fail before any UI existed.
Check the console for a `PlayerError`.

#### Issue: the player has zero height

Percentage-height children need a sized parent:

```css
universal-player,
.player-host {
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
}
```

For audio, set a fixed `block-size` or `min-height`.

#### Issue: black screen or no playback

```ts
player.on("error", ({ error }) => console.error(error));
console.log(player.state.status, player.state.error);
console.log(player.state.capabilities);
```

Open the media URL directly in a tab. If it fails there, the player is not the
problem. Verify the codec, `Content-Type`, CORS headers and range requests. For
autoplay, try `muted: true` or wait for a user gesture.

#### Issue: HLS or DASH fails

```bash
pnpm add hls.js
pnpm add dashjs
```

Add CORS to **every segment**, not just the manifest, use the correct MIME type
(`application/vnd.apple.mpegurl`, `application/dash+xml`), and confirm manifest
URLs are absolute or correctly relative.

#### Issue: controls are unstyled

Light DOM without the stylesheet. Import `styles.css` or add `inject-styles`:

```html
<script type="module">
  import "@codewithrajat/universal-player";
  import "@codewithrajat/universal-player/styles.css";
</script>

<universal-player shadow="light" src="/clip.mp4"></universal-player>
```

In Shadow DOM mode this should not happen.

#### Issue: `document is not defined` during SSR

The player is browser-only. Mount it in a client effect or with a framework
client-only guard. Importing `/core` is safe; constructing a player is not.

#### Issue: a method throws a `PlayerError`

Every error has a stable `code`. Branch on the code, not the message:

```ts
player.on("error", ({ error }) => {
  if (isPlayerError(error)) {
    switch (error.code) {
      case "network-error":
        showRetry(() => player.retry());
        break;
      case "unsupported-environment":
        showFallbackLink();
        break;
      default:
        report(error);
    }
  }
});
```

The nine codes are `invalid-argument`, `invalid-state`, `unsupported-source`,
`unsupported-environment`, `network-error`, `media-error`, `aborted`,
`destroyed` and `not-implemented`. See
[Error codes](./docs/reference/errors.md).

---

## API Reference Quick Start

### Inputs

`createPlayer(options)` requires `container` and accepts a partial
`PlayerOptions`.

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `container` | `HTMLElement` | **required** | Element that owns the player surface |
| `source` | `PlayerSourceInput` | `undefined` | URL, structured source, `Blob`/`File`, `MediaStream`, chunked source or array |
| `controls` | `"custom" \| "native"` | `"custom"` | `custom` removes native controls; only the element renders chrome |
| `theme` | `"light" \| "dark" \| "system"` | `"system"` (UI) | Built-in UI theme |
| `locale` | `string` | `"en"` (UI) | BCP 47 locale for built-in strings |
| `autoplay` | `boolean` | `false` | Attempt playback after load; browser policy may reject |
| `muted` | `boolean` | `false` | Initial muted state |
| `loop` | `boolean` | `false` | Loop the current media |
| `preload` | `"none" \| "metadata" \| "auto"` | `"metadata"` | Forwarded preload hint |
| `poster` | `string` | `undefined` | Poster image; `thumbnail` is an element alias |
| `volume` | `number` | `1` | Clamped to `0`–`1` |
| `playbackRate` | `number` | `1` | Clamped to `0.25`–`4` |
| `startTime` | `number` | `undefined` | Initial seek position in seconds |
| `live` | `boolean` | `false` | Mark the source as live before metadata |
| `captions` | `CaptionsOptions` | `undefined` | Tracks, default track, style and persistence |
| `chapters` | `readonly Chapter[]` | `[]` | Chapter markers |
| `thumbnails` | `ThumbnailTrack` | `undefined` | Seek-bar hover preview cues |
| `playlist` | `PlaylistOptions` | `undefined` | Queue/gallery configuration |
| `image` | `ImageOptions` | `undefined` | Zoom, rotate, download and slideshow |
| `survey` | `SurveySource` | `undefined` | Inline survey config or async provider |
| `resume` | `ResumeOptions` | `undefined` (`enabled: false`) | Storage-backed resume |
| `analytics` | `AnalyticsOptions` | `undefined` | Vendor-neutral event sink |
| `ui` | `UIOptions` | `undefined` (UI) | Controls, menus, gestures and tokens |
| `onStateChange` | `(state) => void` | `undefined` | Called after each state replacement |
| `onEvent` | `(event) => void` | `undefined` | Called for every event, including high-frequency ones |

### Outputs

| Output | Kind | Description |
| --- | --- | --- |
| `<universal-player>` | Web component | Full UI, menus, gestures, surveys and accessibility |
| `element.player` | `UniversalPlayer` | Live instance exposed by the custom element |
| `player.state` | `PlayerState` | Immutable snapshot replaced on meaningful transitions |
| `player.on()` / `observe()` | Events | Typed subscriptions and RxJS-compatible streams |
| `player.capabilities` | `PlayerCapabilities` | Features supported by the active engine |
| `mountUniversalPlayer()` | Vanilla helper | Mounts headless playback into a selector or element |
| `validateSurveyAnswers()` | Helper | Validate survey answers without opening the UI |
| `detectMediaKind()`, `normalizeSource()`, `sourceToken()` | Source helpers | Public source utilities |

### Methods

| Method | Owner | Returns | Description |
| --- | --- | --- | --- |
| `load(input)` | `UniversalPlayer` | `Promise<void>` | Replace the source; a newer call cancels an older in-flight load |
| `play()` | `UniversalPlayer` | `Promise<void>` | Play; throws `invalid-state` when nothing is loaded |
| `pause()` | `UniversalPlayer` | `void` | Pause; no-op without media |
| `seek(time)` | `UniversalPlayer` | `void` | Seek in seconds; negatives clamp to `0` |
| `retry()` | `UniversalPlayer` | `Promise<void>` | Reload the current source |
| `syncTime()` | `UniversalPlayer` | `void` | Request an immediate time refresh for embeds |
| `setVolume(volume)` | `UniversalPlayer` | `void` | Clamp and set volume |
| `setMuted(muted)` | `UniversalPlayer` | `void` | Mute or unmute |
| `setPlaybackRate(rate)` | `UniversalPlayer` | `void` | Clamp to `0.25`–`4` |
| `setQuality(quality)` | `UniversalPlayer` | `void` | Select a level; `null` = automatic |
| `setTextTrack(id)` | `UniversalPlayer` | `void` | Select captions; `null` = off |
| `setAudioTrack(id)` | `UniversalPlayer` | `void` | Select an audio track; `null` = browser default |
| `seekToChapter(chapter)` | `UniversalPlayer` | `void` | Accepts a chapter object or id |
| `next()` / `previous()` | `UniversalPlayer` | `Promise<PlaylistItem \| null>` | Advance or go back; gating enforced in core |
| `setSurvey(source)` | `UniversalPlayer` | `void` | Set a survey config or async provider |
| `openSurvey(force?)` | `UniversalPlayer` | `Promise<boolean>` | Open the survey and report success |
| `retakeSurvey()` | `UniversalPlayer` | `Promise<boolean>` | Retake when `allowRetake` is enabled |
| `requestFullscreen()` | `UniversalPlayer` | `Promise<void>` | Enter fullscreen |
| `requestPictureInPicture()` | `UniversalPlayer` | `Promise<void>` | Enter PiP for video |
| `destroy()` | `UniversalPlayer` | `void` | Terminal cleanup; releases engine, listeners and object URLs |

### Events

| Event | Payload | Fired when |
| --- | --- | --- |
| `statechange` | `PlayerState` | A meaningful transition occurs (not every time tick) |
| `loadstart` | `{ source, kind }` | A new source begins loading |
| `loadedmetadata` | `{ duration, width, height, live }` | Metadata is known |
| `play` / `pause` / `ended` | `void` | Playback lifecycle changes |
| `timeupdate` | `{ currentTime, duration, buffered }` | Time progresses (high frequency) |
| `qualitychange` | `{ quality }` | Quality selection changes |
| `texttrackchange` | `{ track }` | Active caption track changes |
| `chapterchange` | `{ chapter }` | Active chapter changes |
| `surveyopen` / `surveysubmit` / `surveyskip` / `surveyclose` | Survey payloads | Survey lifecycle changes |
| `error` | `{ error }` | A failure is published |

Full reference: **[docs/api-reference.md](./docs/api-reference.md)**.

---

## Best Practices

### 1. Choose the Lowest API Level That Fits

| Need | Use |
| --- | --- |
| Complete UI on any page | `<universal-player>` |
| Complete UI inside a framework | `import "@codewithrajat/universal-player/ui"` and render the element |
| Headless playback in a framework | The matching framework adapter |
| Your own buttons | `/core` or a framework hook |
| No UI at all | `/core` |

Do not re-implement the built-in surface unless you need a fundamentally
different interaction model. It already handles adaptive controls, caption
menus, gestures, surveys, the sleep timer and ARIA.

### 2. Own the Lifecycle

```ts
useEffect(() => {
  const player = createPlayer({ container, source });
  return () => player.destroy();
}, []);
```

Framework adapters own creation and destruction. If you use `/core` or
`mountUniversalPlayer()`, you own them. One player per surface; do not share one
instance across two containers.

### 3. Give the Host a Size

```css
.player {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
```

Use `aspect-ratio` for video, a fixed height for audio and `min-height` for
images. A percentage-height child inside an auto-height parent collapses to
zero.

### 4. Gate Navigation in the Core

```ts
playlist: { requireCompletion: true, allowPrevious: false }
```

Hiding buttons is not enforcement. The core checks the same rules for keyboard
shortcuts and programmatic `next()` calls.

### 5. Prefer Tokens over Internal Overrides

```css
universal-player {
  --up-color-accent: #22c55e;
}
```

Use `::part()` for structure and tokens for colour and shape. Avoid `!important`
rules against internal classes, and do not toggle `shadow` at runtime; the
element reads it at mount.

---

## Documentation

- **[Getting Started](./docs/getting-started/introduction.md)** — Install, first mount, mental model
- **[Configuration](./docs/configuration.md)** — Every setting, precedence and validation
- **[Defaults](./docs/defaults.md)** — What happens when an option is omitted
- **[Architecture](./docs/architecture.md)** — Layers, pipeline, packaging and licensing
- **[Core Concepts](./docs/core-concepts.md)** — Lifecycle, events, state, engines and sources
- **[API Reference](./docs/api-reference.md)** — Every export, signature and type
- **[Feature Status](./docs/features.md)** — Implemented, partial, scaffolded and out of scope
- **[Formats Matrix](./docs/reference/formats-matrix.md)** — Status and capabilities per format
- **[Theming](./docs/theming.md)** — Tokens, parts and design guidance
- **[Accessibility](./docs/accessibility.md)** — WCAG 2.2 AA target and ARIA
- **[Testing](./docs/testing.md)** — Unit, browser and package validation
- **[Migration](./docs/migration.md)** — Upgrade from a native element or another player
- **[Troubleshooting](./docs/troubleshooting.md)** — Common failures and their causes
- **[Roadmap](./docs/roadmap.md)** — Shipped, next and out of scope

---

## Statistics

[![Package source](https://img.shields.io/badge/GitHub-malikrajat%2Funiversal--player-181717?logo=github)](https://github.com/malikrajat/universal-player)
[![GitHub issues](https://img.shields.io/github/issues/malikrajat/universal-player.svg)](https://github.com/malikrajat/universal-player/issues)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/universal-player.svg?style=social)](https://github.com/malikrajat/universal-player/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malikrajat/universal-player/blob/main/LICENSE)

---

## Architecture & Project Structure

```
src/
├── core/          headless player, state, events, source detection
├── adapters/      native, image, hls, dash, youtube, vimeo, embed
├── features/      quality, speed, chapters, captions, resume, ads, ...
├── ui/            <universal-player>, styles, i18n
├── vanilla/       DOM mount helper
├── frameworks/    react, vue, angular, svelte4, svelte5
└── entries/       public subpath entry points
```

Read [docs/architecture.md](./docs/architecture.md) for the data flow and
[docs/decisions.md](./docs/decisions.md) for the design decisions behind it.

### Repository Scripts

```bash
pnpm install
pnpm run check         # oxlint + formatting via Vite+
pnpm run typecheck     # tsc --noEmit
pnpm run test          # Vitest unit tests (jsdom)
pnpm run test:coverage # coverage thresholds
pnpm run test:browser  # Vitest browser mode via Playwright
pnpm run build         # Vite+ pack: ESM + d.ts + publint + attw
pnpm run build:repo    # build + assemble build/<repo-name>/ for hand-off
pnpm run repo          # re-assemble the folder without rebuilding
pnpm run check:pack    # tarball allowlist + export-target check
pnpm run check:imports # fail on Node built-ins/globals in browser code
pnpm run check:exports # publint --strict
pnpm run check:types   # attw --profile esm-only
pnpm run docs          # TypeDoc
pnpm run sbom          # CycloneDX SBOM (sbom.json)
pnpm run validate      # full local gate
```

---

## Release

- Versioning and changelogs: [Changesets](https://github.com/changesets/changesets).
- Publishing: GitHub Actions on `main`, with npm provenance.
- Branch model: `main` (releases) and `develop` (integration).
- Public API policy: strict SemVer with a documented deprecation window.
- Registry status: **0.0.1 is not published**; folder and tarball installs are
  the supported paths today.

To add a change:

```bash
pnpm changeset
git add .changeset
```

---

## Support This Project

If **Universal Player** has helped you build better media experiences, please consider:

If this library has saved you development time and helped make video, audio,
images and embeds feel consistent in your projects, **please consider giving it
a star!**

**Why star this repo?**

- Help other developers discover a lightweight, framework-agnostic player
- Support continued development and improvements
- Show appreciation for free, quality tools
- Boost visibility in the JavaScript community
- Encourage more open-source media tooling
- Help other developers find a headless alternative to heavyweight players

### **Want More Quality Libraries?**

This is just one of several useful libraries I've created. **[Explore my other JavaScript & web development libraries](https://github.com/malikrajat?tab=repositories)** that might solve your next challenge:

- **Utility libraries** for common development tasks
- **UI components** for better user experiences
- **Performance tools** for optimization
- **Mobile-friendly solutions** for responsive apps

**Found them helpful?** A star on each repo you find useful helps tremendously! It takes just one click but means the world to open-source maintainers.

[![GitHub](https://img.shields.io/badge/View_All_Repositories-181717?logo=github)](https://github.com/malikrajat?tab=repositories)
[![GitHub followers](https://img.shields.io/github/followers/malikrajat?style=social)](https://github.com/malikrajat)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/universal-player?style=social)](https://github.com/malikrajat/universal-player/stargazers)

---

## Support and Community

### Getting Help

Need assistance? We're here to help!

| Support Channel | Link | Best For |
| --- | --- | --- |
| Bug Reports | [Report Bug](https://github.com/malikrajat/universal-player/issues) | Technical issues |
| Feature Requests | [Request Feature](https://github.com/malikrajat/universal-player/issues) | New features |
| Discussions | [Join Discussion](https://github.com/malikrajat/universal-player/discussions) | General questions |
| Email | [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com?subject=Universal%20Player%20Support) | Direct support |

### Documentation

- [GitHub Repository](https://github.com/malikrajat/universal-player)
- [Documentation Index](./docs/README.md)
- [Examples](./examples/README.md)
- [Changelog](https://github.com/malikrajat/universal-player/blob/main/CHANGELOG.md)
- [Roadmap](./docs/roadmap.md)

### Community

- Star the repository to show support
- Watch for updates and new releases
- Share your use cases and feedback
- Contribute code, examples or documentation

### Stay Updated

- Follow the project on [GitHub](https://github.com/malikrajat/universal-player)
- Star the repository for updates
- Watch for new releases

### Security

Please follow [SECURITY.md](./SECURITY.md) and do not open a public issue with
exploit details. For contribution guidelines, see
[CONTRIBUTING.md](./CONTRIBUTING.md) and
[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## Acknowledgements

This library was built to make one media experience work across video, audio,
images and embeds without locking an application into a vendor player or a
framework.

Special thanks to:

- **The JavaScript community** — for the standards, tooling and feedback that shaped this API
- **The media and accessibility communities** — for the guidance behind the control surface and WCAG target
- **Contributors** — for making the library better with every issue and pull request
- **Everyone shipping media on the open web** — for proving that a good player is part of the product, not an afterthought

---

## Other Libraries

### Media & Playback

| Library | Description | Link |
| --- | --- | --- |
| **@codewithrajat/universal-player** | Framework-agnostic media player for video, audio, images and embeds. One headless TypeScript core, one `<universal-player>` web component and adapters for React, Vue, Angular, Svelte 4 and Svelte 5. Automatic engine selection across native, HLS, DASH, YouTube, Vimeo, generic embed and chunked playback. **Zero runtime dependencies, tree-shakeable, ESM-only** — built-in captions, quality, chapters, playlists, surveys, theming, i18n, keyboard shortcuts and WCAG 2.2 AA-oriented markup. | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/universal-player) |

---

### Monitoring & Diagnostics

| Library | Description | Link |
| --- | --- | --- |
| **@codewithrajat/rm-logvault** | Offline-first browser error tracking, logging and one-file diagnostics export. Redacts PII before writing, stores in IndexedDB, uploads only to your own endpoint. **Zero dependencies, tree-shakeable, framework-agnostic** — React, Vue, Angular, axios and TanStack Query adapters included. | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-logvault.svg)](https://www.npmjs.com/package/@codewithrajat/rm-logvault) |
| **@codewithrajat/tracepulse** | Zero-dependency API request monitoring, timing and performance observability. Instruments `fetch()` and XHR automatically, measures queue, time-to-response, response-body and UI-render phases, classifies warning/critical thresholds and prints colour-coded console reports or self-contained HTML/JSON exports — no backend, agent or account. | [![npm](https://img.shields.io/badge/npm-1.0.0-blue?logo=npm)](https://www.npmjs.com/package/@codewithrajat/tracepulse) |

---

### UI Components

| Library | Description | npm Link |
| --- | --- | --- |
| **rm-range-slider** | Lightweight two-thumb range slider with tooltips and color customization | [![npm](https://img.shields.io/npm/v/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider) |
| **rm-ng-range-slider** | Angular-specific version of the dual range slider | [![npm](https://img.shields.io/npm/v/rm-ng-range-slider.svg)](https://www.npmjs.com/package/rm-ng-range-slider) |
| **rm-carousel** | Simple, responsive carousel component | [![npm](https://img.shields.io/npm/v/rm-carousel.svg)](https://www.npmjs.com/package/rm-carousel) |
| **rm-image-slider** | Minimal image slider with smooth transitions | [![npm](https://img.shields.io/npm/v/rm-image-slider.svg)](https://www.npmjs.com/package/rm-image-slider) |
| **rm-ng-star-rating** | Configurable Angular star rating component with readonly mode | [![npm](https://img.shields.io/npm/v/rm-ng-star-rating.svg)](https://www.npmjs.com/package/rm-ng-star-rating) |
| **@codewithrajat/rm-ng-typeahead** | Angular autocomplete/typeahead component with search suggestions and keyboard navigation | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-typeahead) |
| **@codewithrajat/rm-ng-editor** | Rich text editor component for Angular applications with customizable toolbar support | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-editor.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-editor) |

---

### PDF & Export Libraries

| Library | Description | npm Link |
| --- | --- | --- |
| **rm-ng-export-to-csv** | Export JSON data to CSV with zero dependencies | [![npm](https://img.shields.io/npm/v/rm-ng-export-to-csv.svg)](https://www.npmjs.com/package/rm-ng-export-to-csv) |
| **@codewithrajat/rm-ng-pdf-export** | Image-based PDF export tool for Angular applications | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export) |
| **@codewithrajat/rm-ng-structure-pdf** | Generate structured PDFs for reports, invoices, or documents | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-structure-pdf.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-structure-pdf) |
| **@codewithrajat/rm-ng-pdf-viewer** | Angular PDF viewer component with zoom, navigation, and document rendering support | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-viewer.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-viewer) |

---

### Chrome Extension

| Library | Description | Link |
| --- | --- | --- |
| **quickocr** | Chrome extension that extracts text from images using OCR technology | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/quickocr/releases) |
| **readLoude** | Chrome extension that reads web pages aloud, e.g. articles | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/readLoude/releases) |
| **ai-assistant-reply** | AI Chrome extension to auto-generate replies on LinkedIn posts | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/ai-assistant-reply/releases) |

---

### VS Code Extension

| Library | Description | Link |
| --- | --- | --- |
| **dead-css-cleaner** | VS Code extension for identifying and cleaning unused CSS styles | [![Install](https://img.shields.io/badge/Install-VS_Code-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=RajatMalik.dead-css-cleaner) [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/dead-css-cleaner/releases) |
| **file-coverage-insight** | VS Code extension for automatically generated component file coverage on open | [![Install](https://img.shields.io/badge/Install-VS_Code-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=RajatMalik.file-coverage-insight) [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/file-coverage-insight/releases) |
| **npmDepScript** | Run npm scripts and review outdated, deprecated and vulnerable dependencies without leaving VS Code | [![Install](https://img.shields.io/badge/Install-VS_Code-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=RajatMalik.npm-dep-script) [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/npmDepScript) |

---

### Desktop Applications — All Platforms

| Library | Description | Link |
| --- | --- | --- |
| **deepwork** | Cross-platform productivity application for focus sessions and deep work tracking | [![Website](https://img.shields.io/badge/Website-deepwork.rajatmalik.dev-blue?logo=googlechrome&logoColor=white)](https://deepwork.rajatmalik.dev/) [![Web App](https://img.shields.io/badge/Web_App-app.deepwork.rajatmalik.dev-success?logo=googlechrome&logoColor=white)](https://app.deepwork.rajatmalik.dev/) [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/deepwork/releases) |
| **JsSandbox** | Cross-platform JavaScript playground and code execution environment | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/JsSandbox/releases) |

---

### Device Detection

| Library | Description | npm Link |
| --- | --- | --- |
| **rm-ng-device-detection** | Detect device type, OS, and browser in Angular | [![npm](https://img.shields.io/npm/v/rm-ng-device-detection.svg)](https://www.npmjs.com/package/rm-ng-device-detection) |

---

### Notifications

| Library | Description | npm Link |
| --- | --- | --- |
| **rm-pushnotify** | Lightweight push-style toast notification utility | [![npm](https://img.shields.io/npm/v/rm-pushnotify.svg)](https://www.npmjs.com/package/rm-pushnotify) |
| **@codewithrajat/rm-toast-notification** | Cross-platform toast and desktop notification library for web, Angular, and desktop applications | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-toast-notification.svg)](https://www.npmjs.com/package/@codewithrajat/rm-toast-notification) |

---

### Layout & Dynamic Rendering

| Library | Description | Link |
| --- | --- | --- |
| **rm-ng-dynamic-layout** | Dynamic layout rendering engine for Angular applications using JSON-driven UI configuration | [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/malikrajat/rm-ng-dynamic-layout) |

---

### Developer Tools & Extensions

| Library | Description | npm Link |
| --- | --- | --- |
| **rm-colorful-console-logger** | Structured and colorized console logging utility for developers | [![npm](https://img.shields.io/npm/v/rm-colorful-console-logger.svg)](https://www.npmjs.com/package/rm-colorful-console-logger) |

---

### Meta & Personal Branding

| Library | Description | npm Link |
| --- | --- | --- |
| **about-rajat** | Developer portfolio package for branding and quick personal info | [![npm](https://img.shields.io/npm/v/about-rajat.svg)](https://www.npmjs.com/package/about-rajat) |

---

### All Packages

Browse all my packages:

- [npm: @codewithrajat](https://www.npmjs.com/~codewithrajat)
- [npm: rajatmalik](https://www.npmjs.com/~rajatmalik)
- [GitHub: @malikrajat](https://github.com/malikrajat?tab=repositories)

---

## Author

**Rajat Malik**

Full-Stack Developer and Frontend Architect at Siemens with 14+ years building scalable enterprise platforms, specializing in micro-frontends, AI-native development, React, and Angular.
Author of 10+ open-source libraries and 100+ technical articles, driving innovation through developer-friendly tools, performance optimization, and AI-assisted workflows.

### GET IN TOUCH

- Portfolio:  [rajatmalik.dev](https://rajatmalik.dev)
- Email:      [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- LinkedIn:   [errajatmalik](https://linkedin.com/in/errajatmalik)
- GitHub:     [@malikrajat](https://github.com/malikrajat)
- npm:        [rajatmalik](https://www.npmjs.com/~rajatmalik)

### SOCIAL PRESENCE

- Threads:    [rajatmalik](https://www.threads.net/@er.rajatmalik)
- Twitter/X:  [rajatmalik](https://x.com/er_rajatmalik)
- BlueSky:    [rajatmalik](http://devrajat.bsky.social)

### CONTENT & WRITING

- Medium:    [rajatmalik](https://medium.com/@codewithrajat)
- Dev.to:    [rajatmalik](https://dev.to/codewithrajat)
- Substack:  [rajatmalik](https://codewithrajat.substack.com)
- Hashnode:  [rajatmalik](https://hashnode.com/@codeswithrajat)

---

<p align="center">
  Made with care and love by <a href="https://rajatmalik.dev">Rajat Malik</a> for the JavaScript community
</p>

<p align="center">
  <a href="https://github.com/malikrajat/universal-player/stargazers">Star on GitHub</a> •
  <a href="./docs/README.md">Documentation</a> •
  <a href="./examples/README.md">Examples</a> •
  <a href="https://github.com/malikrajat/universal-player/issues">Report Issue</a>
</p>

<p align="center">
  Made with dedication by <a href="https://rajatmalik.dev">Rajat Malik</a>
</p>
