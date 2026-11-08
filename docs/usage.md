# Usage

> [Docs home](./README.md) � Usage

[← Docs](./README.md) · [Quick start](./quick-start.md) · [API reference →](./api-reference.md)

This guide covers the workflows most applications need. Each section links to
the specialist page where you can go deeper.

---

## Sources

The player resolves any supported input into a `NormalizedSource` and selects an
engine internally. You never choose an engine.

### Supported source shapes

```ts
// URL string
await player.load("/media/clip.mp4");

// Structured source
await player.load({
  kind: "video",
  src: "/media/clip.mp4",
  type: "video/mp4",
  captions: [{ src: "/captions.vtt", label: "English", language: "en" }],
});

// File / Blob (the player owns and revokes the object URL)
await player.load(file);

// data: URL
await player.load("data:image/png;base64,iVBORw0KGgo...");

// MediaStream (camera, screen share)
await player.load(mediaStream);

// Array => playlist/gallery
await player.load(["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"]);

// Chunked upload / API response
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

The player infers kind and provider from MIME type, extension and hostname:

| Input                                    | Kind                                   | Provider               |
| ---------------------------------------- | -------------------------------------- | ---------------------- |
| `.mp4`, `.webm`, `.mov`, `.mkv`          | video                                  | native                 |
| `.mp3`, `.wav`, `.m4a`, `.flac`          | audio                                  | native                 |
| `.jpg`, `.png`, `.webp`, `.avif`, `.svg` | image                                  | image                  |
| `.m3u8`                                  | video                                  | hls                    |
| `.mpd`                                   | video                                  | dash                   |
| `youtube.com`, `youtu.be`                | embed                                  | youtube                |
| `vimeo.com`                              | embed                                  | vimeo                  |
| Any other URL                            | embed (via structured source) or video | generic-embed / native |
| `Blob`/`File`                            | MIME-driven                            | native/image           |
| Chunked                                  | declared `kind`                        | chunked / image        |
| `MediaStream`                            | video                                  | native                 |

Unknown extensions default to `video` with the native engine. Full rules:
[Sources reference](./api-reference.md#sources).

### Replaying a finished video

Calling `play()` after `ended` seeks back to `0` first, so the same source can
be replayed without a reload.

### Chunked sources

```ts
source: {
  kind: "video",
  type: "video/mp4",
  mode: "auto", // "auto" | "stream" | "blob"
  chunks: () => fetchChunks(), // a function makes the source replayable
}
```

- `auto` streams through `MediaSource` when supported, else buffers to a Blob.
- `stream` prefers `MediaSource`.
- `blob` always buffers first.
- Pass a function returning a fresh iterable when the player must reload.

### Images and slideshows

```ts
createPlayer({
  container,
  source: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"],
  image: { slideDuration: 5, zoom: true, rotate: true, download: true },
});
```

Image sources render zoom, rotate, reset, download and fullscreen controls
instead of a timeline and volume. `slideDuration` is in seconds.

---

## Playback API

```ts
const player = createPlayer({ container, source: "/clip.mp4" });

await player.load("/clip.mp4");
await player.play();
player.pause();
player.seek(30);
player.setVolume(0.8);
player.toggleMute();
player.setPlaybackRate(1.5);
player.setQuality("720p"); // null = auto
player.setTextTrack("en"); // null = captions off
player.setAudioTrack("commentary");
player.seekToChapter("demo");
await player.next();
await player.previous();
await player.requestFullscreen();
await player.requestPictureInPicture();
await player.retry();
player.destroy();
```

Methods validate state and throw a `PlayerError` with a stable `code` when the
call cannot be honoured. See [Errors vs. logs](./errors-vs-logs.md).

### State

`player.state` is an immutable snapshot. It is replaced on meaningful
transitions; high-frequency `timeupdate`/`progress` events are silent patches.

```ts
console.log(player.state.status); // idle | loading | ready | playing | paused | ended | error
console.log(player.state.currentTime, player.state.duration);
console.log(player.state.capabilities);
```

### Capabilities

`player.state.capabilities` and `player.capabilities` describe the active
engine. Use them to decide which of _your_ controls to render:

```ts
if (player.state.capabilities.pictureInPicture) {
  showPipButton();
}
```

---

## Events

Three styles are backed by one event bus:

```ts
// 1. DOM events
player.addEventListener("play", (event) => {
  console.log((event as CustomEvent).detail);
});

// 2. Typed subscriptions
const unsubscribe = player.on("timeupdate", ({ currentTime }) => {
  console.log(currentTime);
});
unsubscribe();

// 3. Observables (RxJS-compatible)
player.observe("statechange").subscribe((state) => {
  console.log(state.status);
});
```

`once()` is available for one-shot listeners. `toRxjsObservable()` lazily loads
the optional `rxjs` peer:

```ts
import { toRxjsObservable } from "@codewithrajat/universal-player/core";

const rx = await toRxjsObservable(player.observe("play"));
```

A subscriber that throws is isolated; it cannot break playback or other
subscribers. Event payloads are listed in
[API reference → Events](./api-reference.md#events).

---

## Controls and UI

### Custom vs native

```ts
createPlayer({ container, source, controls: "custom" }); // default
createPlayer({ container, source, controls: "native" });
```

`custom` removes the browser's controls; it does **not** create a control surface. Only `<universal-player>` renders the built-in UI. `native` delegates to the browser's controls. Switch at runtime with `setControls("native")`.

### Allow-list, hide and order

```ts
ui: {
  controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"],
  order: ["play", "volume", "time", "captions", "settings", "fullscreen"],
  hide: ["cast"],
}
```

- An **array** is an allow-list: only those controls render.
- An **object** hides only the keys set to `false`.
- `hide` is merged on top of `controls`.
- `order` changes left-to-right order; omitted controls keep their default spot.

### Adaptive defaults

The UI reads `state.kind` and `state.capabilities` and hides controls that make
no sense:

| Media | Default controls                                                            |
| ----- | --------------------------------------------------------------------------- |
| video | play, seek, time, volume, CC, settings, chapters, playlist, PiP, fullscreen |
| audio | play, seek, time, volume, settings, playlist, loop, autoplay, fullscreen    |
| image | zoom, rotate, download, share, fullscreen (no timeline/volume)              |
| embed | play, seek, time, volume, settings, fullscreen                              |

### Timestamp

`ui.time` controls the timestamp:

```ts
ui: {
  time: {
    mode: "elapsed", // or "remaining"
    toggle: true,    // click swaps elapsed/remaining
    showTotal: true, // show duration after the slash
  },
}
```

The format is self-sizing: `9s`, `2:03`, `1:02:03`. The tooltip keeps elapsed,
remaining and total together.

### Settings menu

```ts
ui: {
  settings: {
    speed: true,
    quality: true,
    captions: true,
    captionStyle: true,
    audio: true,
    loop: true,
    autoplay: true,
    autoplayNext: true,
    sleepTimer: true,
    stats: false,
    shortcuts: true,
  },
}
```

Set `settings: false` to remove the whole menu. Each section can be hidden
individually.

### Gestures

Gestures are opt-in:

```ts
ui: {
  gestures: {
    enabled: true,
    swipeSeek: true,
    swipeFullscreen: true,
    swipeUp: false,
    swipeDown: true,
    threshold: 48,
  },
}
```

`ui.gestures: false` disables all touch gestures. Directions can be disabled
individually.

---

## Captions and subtitles

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
    persist: true,
  },
});

player.setTextTrack("hi");
player.setTextTrack(null); // off
player.toggleCaptions();
player.setCaptionStyle({ fontSize: "140%" });
```

The CC button toggles subtitles on/off; **Settings → Subtitles/CC** chooses a
language, turns them off, or changes size/colour. Track choice and size are
remembered per source when `persist` is not `false`.

Guide: [Captions](./captions.md).

---

## Chapters, thumbnails and playlists

```ts
const player = createPlayer({
  container,
  chapters: [
    { id: "intro", title: "Introduction", startTime: 0 },
    { id: "demo", title: "Demo", startTime: 90 },
  ],
  thumbnails: {
    cues: [{ startTime: 0, endTime: 10, url: "/media/thumb-0.jpg" }],
  },
  playlist: {
    items: [
      { source: "/media/one.mp4", title: "One" },
      { source: "/media/two.mp4", title: "Two" },
    ],
    autoAdvance: true,
    autoAdvanceDelay: 3,
    requireCompletion: true,
    allowNext: true,
    allowPrevious: true,
  },
});

player.seekToChapter("demo");
await player.next();
await player.previous();
```

`requireCompletion` (alias `gateAdvance`) blocks Next until the current item
ends — including keyboard shortcuts and `next()` calls, not just the button.
`allowNext: false` and `allowPrevious: false` remove navigation entirely.

Guide: [Playlists](./playlists.md).

---

## Surveys, feedback and quizzes

Surveys render **inside the player**. Questions can be inline, sourced from
metadata, or fetched asynchronously at trigger time.

```ts
const player = createPlayer({
  container,
  source: "/media/clip.mp4",
  survey: {
    id: "post-watch",
    kind: "feedback", // survey | feedback | review | quiz
    title: "How was the video?",
    trigger: "ended", // or "manual", seconds, { at: 120 }
    once: true,
    allowSkip: true,
    submitMode: "manual",
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

player.setSurvey(async () => (await fetch("/api/survey")).json());
await player.openSurvey();
player.retakeSurvey();
```

Ready-made presets: `endOfVideoFeedback`, `netPromoterScore`,
`contentFeedback`, `blockingReview`, `quizFeedback`.

Guide: [Surveys](./surveys.md) · Presets in
[API reference](./api-reference.md#survey-presets).

---

## Theming

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

```ts
createPlayer({
  container,
  source: "/clip.mp4",
  ui: { theme: { colors: { accent: "#22c55e" }, radius: "1rem" } },
});
```

All tokens are CSS custom properties on `.up-root`/the host:

```css
universal-player {
  --up-color-accent: #22c55e;
  --up-color-accent-contrast: #06240f;
  --up-radius: 1rem;
  --up-font-family: "Inter", system-ui, sans-serif;
}
```

Use `::part(root|controls|play-button|...)` for structural styling. Full token
list: [Theming](./theming.md).

---

## Internationalization

```ts
import { registerLocale } from "@codewithrajat/universal-player/ui";

registerLocale("hi", { play: "चलाएँ", pause: "रोकें" });

createPlayer({ container, source, locale: "hi", strings: { play: "Start" } });
```

Precedence: per-instance `strings` > registered locale > English. The UI uses
logical CSS properties and works in RTL layouts.

---

## Resume, live and analytics

```ts
const player = createPlayer({
  container,
  source: "/course.mp4",
  resume: { enabled: true, minDuration: 30 },
  live: false,
  analytics: {
    onEvent: (event) => {
      // vendor-neutral: { type, at, position, duration, source, metadata? }
      console.log(event.type);
    },
  },
});
```

- Resume stores a position in `localStorage` (or your `Storage` adapter) and is
  best-effort.
- Live sources show a LIVE label; helpers in `features/live` expose seekable
  range and live-edge detection. A dedicated DVR scrubber is not built yet.
- Analytics callbacks are isolated; a throwing sink cannot break playback.

Guides: [Resume](./resume.md) · [Live](./live.md) ·
[Analytics](./analytics.md).

---

## Declarative configuration

```html
<universal-player
  src="/clip.mp4"
  chapters='[{"id":"intro","title":"Intro","startTime":0}]'
  survey='{"title":"How was it?","questions":[{"id":"liked","type":"radio","label":"Liked?","options":[{"id":"yes","label":"Yes"},{"id":"no","label":"No"}]}]}'
  captions='{"tracks":[{"src":"/en.vtt","label":"English","language":"en"}]}'
  ui='{"speed":false,"download":false,"controls":{"share":false,"cast":false}}'
></universal-player>
```

Structured attributes accept JSON. Invalid JSON is ignored, not thrown. See
[Configuration](./configuration.md#4-declarative-json-attributes).

---

## Teardown

```ts
player.destroy();
```

`destroy()` stops playback, removes the surface, aborts document listeners,
revokes object URLs, clears timers and marks the instance unusable. Framework
adapters call it on unmount.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)