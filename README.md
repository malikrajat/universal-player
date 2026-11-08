# @codewithrajat/universal-player

[![npm version](https://img.shields.io/npm/v/@codewithrajat/universal-player.svg)](https://www.npmjs.com/package/@codewithrajat/universal-player)
[![license](https://img.shields.io/npm/l/@codewithrajat/universal-player.svg)](./LICENSE)
[![node](https://img.shields.io/node/v/@codewithrajat/universal-player.svg)](./package.json)

Framework-agnostic universal media player for **video, audio, images and embeds**.

> **Publication status:** `@codewithrajat/universal-player@0.0.1` is **not published on the public npm registry**. Registry commands below are intended-only. Build the repository and install it from the folder (`pnpm add file:/absolute/path/to/universal-player`) or a packed tarball until a release exists.

One headless TypeScript core, one `<universal-player>` web component, and thin
adapters for React, Vue, Angular, Svelte 4 and Svelte 5. ESM-only, tree-shakeable,
browser-first and dependency-free at the core.

> **Status: experience release.** Native playback, images, HLS, DASH,
> YouTube/Vimeo time sync, adaptive controls, chapters, playlists, thumbnails,
> caption menus, in-player surveys and a YouTube-style control surface are
> implemented. Cast, ads and VR remain contract-only. See
> [docs/features.md](./docs/features.md).

---

## Why "universal"

The player is not tied to `<video>`. It resolves a source into one of eight
internal engine providers:

| Source                       | Engine        | Runtime dependency |
| ---------------------------- | ------------- | ------------------ |
| `.mp4`, `.webm`, `.mov`, ... | native        | none               |
| `.mp3`, `.wav`, `.m4a`, ...  | native        | none               |
| `.jpg`, `.png`, `.avif`, ... | image         | none               |
| `.m3u8`                      | HLS           | optional `hls.js`  |
| `.mpd`                       | DASH          | optional `dashjs`  |
| YouTube URLs                 | iframe embed  | none               |
| Vimeo URLs                   | iframe embed  | none               |
| Structured `{ kind: "embed", provider: "generic" }` | generic embed | none |
| Chunked `Blob`/stream input  | chunked       | none               |
| `data:` URLs                 | native/image  | none               |

Engine selection is internal. The public API deliberately does **not** expose a
plugin registry (see [docs/decisions.md](./docs/decisions.md)).

---

## Install

```bash
# Real path today (the registry has no published version)
pnpm install
pnpm build
pnpm add file:/absolute/path/to/universal-player

# Intended-only, after a public release:
# pnpm add @codewithrajat/universal-player
# npm install @codewithrajat/universal-player
```

Optional peers, installed only when you need them:

```bash
pnpm add hls.js     # HLS streams
pnpm add dashjs    # MPEG-DASH streams
pnpm add rxjs       # optional RxJS interop via toRxjsObservable()
pnpm add react      # React adapter
pnpm add vue        # Vue 2.7 / Vue 3 adapter
pnpm add @angular/core  # Angular adapter
pnpm add svelte     # Svelte 4 / Svelte 5 adapter
```

---

## Quick start

### 1. Custom element (any framework, any page)

```html
<script type="module">
  import "@codewithrajat/universal-player";
  // Shadow DOM is the default and ships its own styles.
  // For light DOM add shadow="light" and import styles.css.
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="dark"
  locale="en"
></universal-player>
```

The element registers a `UniversalPlayer` instance and exposes it as
`element.player`.

### 2. Vanilla mount helper

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

// Headless: this renders media, not the built-in control bar.
const player = mountUniversalPlayer("#app", {
  source: "/media/clip.mp4",
  poster: "/media/poster.jpg",
  controls: "native",
});

player.on("timeupdate", ({ currentTime, duration }) => {
  console.log(currentTime, duration);
});
```

### 3. Headless core

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "https://example.com/live.m3u8", // hls.js loaded lazily
  controls: "native", // custom adds no chrome in the headless core
  autoplay: false,
  muted: false,
});

await player.load("https://example.com/live.m3u8");
await player.play();

player.observe("statechange").subscribe((state) => {
  console.log(state.status, state.currentTime);
});
```

### 4. React

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Demo() {
  return (
    <UniversalPlayer
      source="/media/clip.mp4"
      poster="/media/poster.jpg"
      controls="native"
      onEvent={(event) => console.log(event.type)}
    />
  );
}
```

The React adapter is headless: the prop is `source`, and it does not render the built-in control bar.

A `useUniversalPlayer()` hook and an imperative `UniversalPlayerHandle` are also
exported.

### 5. Vue (2.7 and 3)

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer src="/media/clip.mp4" controls="native" />
</template>
```

The Vue adapter is headless; `src` is the component prop.

### 6. Angular

Angular libraries built by a generic bundler cannot safely ship a precompiled
`@Component`, so this package ships a decorator-free controller. A standalone
component you own forwards lifecycle calls to it:

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
      inputs: { source: "/media/clip.mp4" },
    });
    this.controller.ngAfterViewInit();
  }
}
```

A complete standalone example lives in [the Angular guide](./docs/frameworks.md#angular). The controller is headless; add `controls: "native"` or mount the custom element for controls.

### 7. Svelte 4 and Svelte 5

Svelte tooling expects source components, so the package ships two entries:

```svelte
<!-- Svelte 5 -->
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src="/media/clip.mp4" controls="native" />
```

Svelte components are headless; `src` is the prop.

```svelte
<!-- Svelte 4 -->
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte4";
</script>

<UniversalPlayer src="/media/clip.mp4" controls="native" />
```

---

## Entry points

| Import                                       | Contents                                                     |
| -------------------------------------------- | ------------------------------------------------------------ |
| `@codewithrajat/universal-player`            | Core + UI + vanilla + all feature helpers                    |
| `@codewithrajat/universal-player/core`       | Headless player, types, events, source detection             |
| `@codewithrajat/universal-player/ui`         | `<universal-player>` element, i18n, registration side effect |
| `@codewithrajat/universal-player/vanilla`    | `mountUniversalPlayer()`                                     |
| `@codewithrajat/universal-player/react`      | `<UniversalPlayer>` and `useUniversalPlayer()`               |
| `@codewithrajat/universal-player/vue`        | Vue 2.7 / Vue 3 component and composable                     |
| `@codewithrajat/universal-player/angular`    | `AngularUniversalPlayer` controller                          |
| `@codewithrajat/universal-player/svelte4`    | Svelte 4 component                                           |
| `@codewithrajat/universal-player/svelte5`    | Svelte 5 component                                           |
| `@codewithrajat/universal-player/styles.css` | Stylesheet for light-DOM usage                               |

`core` and the feature modules are SSR-import-safe by construction, but the
library is **browser-only by decision**: it does not guarantee server rendering
of the element or framework wrappers.

---

## Core API

```ts
import { createPlayer, type PlayerState } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: element,
  source: "/media/clip.mp4",
  controls: "custom", // or "native"
  theme: "system", // "light" | "dark" | "system"
  locale: "en",
  resume: { enabled: true },
  analytics: { onEvent: (event) => console.log(event) },
});

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
await player.openSurvey();
await player.requestFullscreen();
await player.requestPictureInPicture();
player.destroy();
```

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

Errors are plain `Error` objects with a stable `code`:

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";

try {
  await player.play();
} catch (error) {
  if (isPlayerError(error)) {
    console.log(error.code); // "invalid-state", "media-error", ...
  }
}
```

---

## Theming

The built-in UI is neutral by default: progress fills, slider thumbs, selected
menu items and focus rings use a white accent on dark themes (and dark ink on
light themes). Set a brand colour per instance with the `accent-color`
attribute:

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

The same value is available through the JS/JSON API:

```ts
createPlayer({
  container,
  source: "/clip.mp4",
  ui: { theme: { colors: { accent: "#22c55e" } } },
});
```

All visual tokens are CSS custom properties on `.up-root`/the host:

```css
universal-player {
  --up-color-accent: #22c55e;
  /* Text/icons drawn on top of the accent. Auto-derived by `accent-color`. */
  --up-color-accent-contrast: #06240f;
  --up-radius: 1rem;
  --up-font-family: "Inter", system-ui, sans-serif;

  /* Survey / feedback actions */
  --up-survey-button-radius: 999px;
  --up-survey-submit-bg: #22c55e;
  --up-survey-submit-color: #06240f;
  --up-survey-submit-hover-bg: #16a34a;
}
```

- `theme="light" | "dark" | "system"`
- Shadow DOM by default (style isolation and built-in styles).
- `shadow="light"` for light DOM; import `styles.css` or add `inject-styles`.
- `::part(root|controls|play-button|...)` is available for advanced styling.
- Survey actions (`Skip`, `Submit`, `Retake`, `Done`) use a rounded text-button shape. Tune them with `--up-survey-button-radius`, `--up-survey-submit-bg`, `--up-survey-submit-color`, `--up-survey-submit-hover-bg` and `--up-survey-submit-border`.

---

## Internationalization

Built-in strings are English. Register a locale or override per instance:

```ts
import { registerLocale } from "@codewithrajat/universal-player/ui";

registerLocale("hi", { play: "चलाएँ", pause: "रोकें" });
```

```ts
const player = createPlayer({
  container,
  locale: "hi",
  strings: { play: "Start" },
});
```

The UI uses logical properties and works in RTL layouts.

---

## URL, stored and chunked media

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

Chunked video/audio stream through MediaSource when the MIME type supports it
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

For a photo slideshow, pass an array and set `image.slideDuration`:

```ts
createPlayer({
  container,
  source: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"],
  image: { slideDuration: 5, zoom: true, rotate: true },
});
```

## Captions and subtitles

External WebVTT tracks can be supplied per source or per player. The CC button
in the control bar toggles subtitles **on/off** immediately; open
**Settings → Subtitles/CC** to choose a language, turn them off, or change the
caption size. The same tracks are also available headlessly. Track choice and
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

## Surveys, feedback and reviews

Surveys are rendered **inside the player**, not on a separate page. Questions
can come from the player config, from source metadata, or from an async provider
(for example an API call when the video ends).

```ts
const player = createPlayer({
  container,
  source: "/media/clip.mp4",
  survey: {
    id: "post-watch",
    kind: "feedback",
    title: "How was the video?",
    description: "This helps us improve the next one.",
    trigger: "ended", // or "manual" / seconds / { at: 120 }
    once: true,
    allowSkip: true,
    questions: [
      {
        id: "liked",
        type: "radio",
        label: "Did you like it?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "topics",
        type: "checkbox",
        label: "What should we cover next?",
        options: [
          { id: "api", label: "API design" },
          { id: "ui", label: "UI patterns" },
        ],
      },
      {
        id: "rating",
        type: "rating",
        label: "Rate this video",
        max: 5,
      },
      {
        id: "comment",
        type: "textarea",
        label: "Anything else?",
        maxLength: 500,
        allowOther: false,
      },
    ],
    onSubmit: async (result) => {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.answers),
      });
    },
  },
});
```

Supported question types: `radio`, `checkbox`, `select`, `text`, `textarea`,
`rating` and `scale`. Choice questions support `allowOther`, `minSelections`,
`maxSelections`; text questions support `minLength`/`maxLength`; numeric
questions support `min`/`max`/`step`. Required validation is enforced by both
the UI and the core.

Submission is configurable:

```ts
survey: {
  submitMode: "manual",       // "manual" | "on-select" | "on-complete"
  autoSubmit: true,           // shorthand for submitMode: "on-select"
  autoSubmitDelay: 0,         // ms before auto-submission
  required: true,             // cannot close/skip until submitted
  blocking: true,             // alias for required
  allowRetake: true,          // show a completion screen with Retake
  maxAttempts: 3,
  instantFeedback: true,      // quiz-style correct/incorrect feedback
  kind: "quiz",               // feedback/review never show correctness by default
  questions: [
    {
      id: "answer",
      type: "radio",
      label: "2 + 2?",
      required: true,
      correct: "4",
      explanation: "Four",
      options: [
        { id: "3", label: "3" },
        { id: "4", label: "4" },
      ],
    },
  ],
}
```

- `on-select` submits as soon as the required answers are selected.
- `on-complete` submits when every required question is answered.
- `instantFeedback` shows Correct/Incorrect and an explanation immediately for
  quiz questions.
- `feedback` and `review` forms stay as a normal single form submission.
- `required`/`blocking` hides skip/close and prevents the survey from being
  dismissed until it is submitted.
- `allowRetake` (alias `allowResubmit`) keeps a thank-you screen open with
  **Retake** and **Done** actions. `player.retakeSurvey()` is also available
  headlessly, with `maxAttempts` controlling how many times.

Dynamic or externally loaded questions:

```ts
player.setSurvey(async () => {
  const response = await fetch("/api/survey");
  return response.json(); // SurveyConfig
});

await player.openSurvey(); // manual trigger
```

Events and state:

```ts
player.on("surveyopen", ({ survey }) => {});
player.on("surveysubmit", ({ survey, answers, result }) => {});
player.on("surveyskip", ({ survey }) => {});
player.on("surveyclose", ({ survey, reason }) => {});
console.log(player.state.survey, player.state.surveyOpen);
```

Partial/required answers can be validated without opening the UI:

```ts
import { validateSurveyAnswers } from "@codewithrajat/universal-player";
```

### Ready-made survey examples

The package ships five copy-paste presets. Spread any preset and override only
what you need:

```ts
import {
  blockingReview,
  contentFeedback,
  endOfVideoFeedback,
  netPromoterScore,
  quizFeedback,
} from "@codewithrajat/universal-player";

const player = createPlayer({
  container,
  source: "/courses/lesson-1.mp4",
  survey: endOfVideoFeedback({
    title: "Was lesson one useful?",
    onSubmit: (result) => saveFeedback(result.answers),
  }),
});
```

| Preset               | Use it for                                           |
| -------------------- | ---------------------------------------------------- |
| `endOfVideoFeedback` | CSAT rating + topics + optional comment              |
| `netPromoterScore`   | NPS 0–10 + reason                                    |
| `contentFeedback`    | “Was this helpful?” with one-select auto-submit      |
| `blockingReview`     | Required review/notes before the viewer can continue |
| `quizFeedback`       | Instant correct/incorrect quiz feedback              |

The presets are plain `SurveyConfig` objects, so they also work from source
metadata, `player.setSurvey()`, or the `survey` JSON attribute.

### Survey implementation checklist

1. Pick a trigger: `"ended"`, `"manual"`, a number, or `{ at: 120 }`.
2. Decide whether the form is optional (`allowSkip: true`) or blocking
   (`blocking: true`, which also hides skip/close).
3. Choose submission: `manual`, `on-select`, or `on-complete`.
4. Persist once-per-source with `once: true` and a stable `id`.
5. Submit to your API in `onSubmit`; listen to `surveysubmit` for analytics.
6. Use `maxAttempts` + `allowRetake` for training/assessment flows.

## Adaptive controls

The built-in UI reads `state.kind` and `state.capabilities` and only renders
controls that make sense:

| Media | Controls                                                                    |
| ----- | --------------------------------------------------------------------------- |
| video | Play, seek, time, volume, CC, settings, chapters, playlist, PiP, fullscreen |
| audio | Play, seek, time, volume, settings, playlist, loop, autoplay, fullscreen    |
| image | Zoom in/out, rotate, download, share, fullscreen (no timeline or volume)    |
| embed | Play, seek, time, volume, settings, fullscreen                              |

You can also drive the same surface headlessly; `player.capabilities` and
`player.state.capabilities` are always in sync with the active engine.

When the engine advertises more than one quality level (HLS/DASH, or an embed
with configured `qualities`), **Settings → Quality** has `−`/`+` steps plus Auto
and every level. Single-file native media has one quality, so the option is not
shown there. **Stats for nerds** also lives in Settings.

### Advanced control surface configuration

Every control, menu section, gesture and colour can be configured. Use an
allow-list when you want a minimal surface, or an object to hide individual
controls. Every field is optional: omitted values keep the built-in defaults,
and partial objects (for example `settings: { stats: false }`) only override the
keys you provide.

```ts
const player = createPlayer({
  container,
  source: "/media/clip.mp4",
  playlist: {
    items: [
      { source: "/media/lesson-1.mp4", title: "Lesson 1" },
      { source: "/media/lesson-2.mp4", title: "Lesson 2" },
    ],
    // The viewer must finish lesson 1 before Next becomes actionable.
    requireCompletion: true,
    // Or remove forward/backward navigation entirely:
    // allowNext: false,
    // allowPrevious: false,
  },
  ui: {
    // Allow-list: only these controls render.
    controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"],
    // Preferred order; omitted controls keep their default position.
    order: ["play", "volume", "time", "captions", "settings", "fullscreen"],
    settings: {
      speed: true,
      quality: true,
      captions: true,
      captionStyle: true,
      audio: true,
      loop: false,
      autoplay: true,
      autoplayNext: true,
      sleepTimer: true,
      stats: false,
      shortcuts: false,
    },
    speed: {
      enabled: true,
      rates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      keyboard: false,
    },
    // Timestamp defaults to elapsed time; clicking it shows the remaining time.
    time: {
      mode: "elapsed",
      toggle: true,
      showTotal: true,
    },
    // Do not offer downloads at all.
    download: false,
    // Gestures are opt-in. Disable swipe-up, or disable all gestures.
    gestures: {
      enabled: true,
      swipeSeek: true,
      swipeFullscreen: true,
      swipeUp: false,
      swipeDown: true,
    },
    theme: {
      colors: { accent: "#ff0033" },
      radius: "0.9rem",
      menuBackground: "rgba(24, 24, 24, 0.82)",
      menuBlur: "16px",
      variables: { "--up-control-size": "2.75rem" },
    },
    showTitle: true,
    showChapterLabel: true,
    showTime: true,
    showBuffered: true,
    showPreview: true,
    showBigPlay: true,
    autoHideControls: true,
    idleDelay: 2500,
  },
});
```

Useful combinations:

| Goal                              | Configuration                                                |
| --------------------------------- | ------------------------------------------------------------ |
| Kiosk / no-forward course player  | `playlist.requireCompletion: true`, `ui.controls` allow-list |
| No downloads                      | `ui.download: false`                                         |
| No speed changes                  | `ui.speed: false`                                            |
| No swipe-up fullscreen            | `ui.gestures: { enabled: true, swipeUp: false }`             |
| Disable all touch gestures        | `ui.gestures: false`                                         |
| Hide share/cast/PiP/previous/next | `ui.controls: { share: false, cast: false, ... }`            |
| Brand colours without forking CSS | `ui.theme.colors` + `ui.theme.variables`                     |
| Start with remaining time         | `ui.time.mode: "remaining"`                                  |
| Keep the elapsed-only timestamp   | `ui.time.toggle: false`                                      |

The timestamp is self-sizing: `1:02:03` for hour-long media, `2:03` for
minute-long media, and `9s` for clips shorter than a minute. Clicking it swaps
the elapsed value for the remaining value (`-7s` / `-1:51:03`) while the tooltip
keeps elapsed, remaining and total together. Open menus also close when the user
clicks anywhere on the surrounding page, matching YouTube.

The same options can be passed declaratively through a JSON `ui` attribute.

## Chapters, playlists and time sync

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

## Keyboard shortcuts

`Space`/`K` play-pause, `M` mute, `F` fullscreen, `C` subtitles on/off,
`S` open Settings, `Q` open the quality sheet, `[`/`]` lower or raise quality,
`A` open audio tracks, `T` open the sleep timer, `R` toggle loop, arrows seek
and change volume, `J`/`L` seek 10s, `0`–`9` seek to a percentage, `Home`/`End`
jump to start/end, `<`/`>` change speed, `N`/`P` next/previous, `I` stats for
nerds, `?` shortcut help and `Esc` closes overlays. Shortcut hints are also
shown beside the matching rows in the Settings sheet.

## Share and embed

The share sheet includes native share, copy link, social targets and an
**Embed** action that copies a ready-to-paste iframe snippet. The embed action
is enabled by default and can be customised or disabled with `ui.share`:

```ts
ui: {
  share: {
    url: "https://example.com/watch/clip", // optional share/embed URL
    title: "Lesson one",
    thumbnail: "/media/thumb.jpg",          // shown in the share sheet
    embed: {
      mode: "player",                       // "player" or "iframe"
      poster: "/media/thumb.jpg",
      width: 960,
      height: 540,
    },                                      // or embed: false
  },
}
```

### Thumbnail images

Thumbnails can be used in four places:

- **Poster before playback** — set `poster="/poster.jpg"` (or the
  `thumbnail` alias) on `<universal-player>` / `PlayerOptions.poster`.
- **Seek-bar hover previews** — pass `thumbnails: { cues: [...] }` or the
  `thumbnails` JSON attribute.
- **Share/embed preview** — set `ui.share.thumbnail` and
  `ui.share.embed.poster`. When a poster is present the embed snippet uses the
  `player` mode automatically, or set `mode: "iframe"` to force an iframe.
- **Playlist/chapter thumbnails** — set `poster` on playlist items or
  `thumbnail` on chapters; they render beside the item in the menu.

### Audio presentation

Audio-only sources show an animated gradient and equalizer surface by default so
the player still has a focused, eye-catching visual. If the audio source or
playlist item supplies `poster`/`thumbnail`, that image is shown instead.
Settings also exposes **Autoplay** and, for playlists, **Autoplay next** so the
viewer can control automatic playback.

## Declarative configuration

Complex options can be passed as JSON attributes:

```html
<universal-player
  src="/media/clip.mp4"
  chapters='[{"id":"a","title":"Intro","startTime":0}]'
  survey='{"title":"How was it?","questions":[{"id":"liked","type":"radio","label":"Liked?","options":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}]}]}'
  captions='{"tracks":[{"src":"/en.vtt","label":"English","language":"en"}]}'
  ui='{"speed":false,"download":false,"controls":{"share":false,"cast":false},"gestures":{"enabled":true,"swipeUp":false}}'
></universal-player>
```

## Accessibility

Target: **WCAG 2.2 AA**.

- Every control is a native `<button>`/`<input>`/`<select>`.
- Visible focus rings and keyboard operation.
- Shortcuts: `Space`/`K` play-pause, `M` mute, `F` fullscreen, `C` subtitles,
  `S` settings, `[`/`]` quality and arrows seek/change volume.
- `aria-label`, `aria-pressed`, `aria-valuetext`, `aria-busy` and `role="alert"`.
- Reduced-motion and forced-colors media queries.

A formal axe/Playwright audit is on the roadmap; see
[docs/features.md](./docs/features.md).

---

## Browser support

Evergreen browsers, compiled to ES2023:

- Chrome/Edge 125+
- Firefox 128+
- Safari 18+

The package ships ESM only. CommonJS consumers must use dynamic `import()`.

---

## Feature status

| Area               | Status                                                       |
| ------------------ | ------------------------------------------------------------ |
| Native video/audio | Implemented                                                  |
| Stored/chunked     | Blob/File/data URL + chunk streams via MediaSource/Blob      |
| Images             | Implemented + zoom/rotate/download controls                  |
| HLS / DASH         | Implemented via optional peers                               |
| YouTube / Vimeo    | Commands, play state, duration and time sync via postMessage |
| Captions           | External WebVTT, Off + language menu, sizing, persistence    |
| Multiple audio     | Native audio-track switching + settings menu                 |
| Quality selection  | HLS/DASH level lists + settings menu                         |
| Playback speed     | Implemented, 0.25×–4×                                        |
| PiP / fullscreen   | Implemented                                                  |
| AirPlay / Cast     | Remote Playback prompt button                                |
| Thumbnails/preview | Seek-bar hover previews                                      |
| Chapters           | Timeline markers, chapter list, next/previous seek           |
| Playlist/queue     | Auto-advance, next/previous, looping, queue menu             |
| Surveys/feedback   | In-player forms, auto-submit, instant feedback, retakes      |
| Adaptive controls  | Per-kind/capability control visibility                       |
| Resume             | Implemented                                                  |
| Live/DVR           | Live label + seekable helpers                                |
| Ads                | Typed contract/stub                                          |
| Analytics          | Player hooks + safe sink                                     |
| Mini-player        | PiP helper                                                   |
| Stats for nerds    | Implemented                                                  |
| Keyboard shortcuts | Full YouTube-style set + help overlay                        |
| 360/VR             | Contract/marker only                                         |
| DRM                | Out of scope                                                 |

See [docs/features.md](./docs/features.md) for details.

---

## Repository scripts

```bash
pnpm install
pnpm run check        # oxlint + formatting via Vite+
pnpm run typecheck    # tsc --noEmit
pnpm run test         # Vitest unit tests (jsdom)
pnpm run test:coverage
pnpm run test:browser # Vitest browser mode via Playwright
pnpm run build        # Vite+ pack: ESM + d.ts + publint + attw
pnpm run build:repo   # build + assemble build/<repo-name>/ for hand-off
pnpm run repo         # re-assemble the folder without rebuilding
pnpm run check:pack   # tarball allowlist + export-target check
pnpm run check:imports# fail on Node built-ins/globals
pnpm run check:exports# publint --strict
pnpm run check:types  # attw --profile esm-only
pnpm run docs         # TypeDoc
pnpm run sbom         # CycloneDX SBOM (sbom.json)
pnpm run validate     # full local gate
```

---

## Architecture

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
[docs/decisions.md](./docs/decisions.md) for every decision made during the
initial design interview.

---

## Release

- Versioning and changelogs: [Changesets](https://github.com/changesets/changesets).
- Publishing: GitHub Actions on `main`, with npm provenance.
- Branch model: `main` (releases) and `develop` (integration).
- Public API policy: strict SemVer with a documented deprecation window.

To add a change:

```bash
pnpm changeset
git add .changeset
```

---

## Contributing, support and security

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [SECURITY.md](./SECURITY.md)
- [SUPPORT.md](./SUPPORT.md)

## License

MIT © 2026 Rajat Malik.
