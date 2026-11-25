# Advanced configuration

> [Docs home](./README.md) › Advanced configuration

[← Docs](./README.md) · [Configuration](./configuration.md) · [Theming](./theming.md)

This page is for teams that need to shape the player beyond the defaults: a
minimal kiosk surface, a course player with gated progression, brand tokens,
gesture rules, share/embed behaviour, caption persistence and survey flows.

Every field is optional. Omitted values keep the built-in defaults documented in
[Defaults](./defaults.md).

---

## 1. Control surface as a product decision

There are three ways to remove a control:

| Approach        | Example                                    | Behaviour                                        |
| --------------- | ------------------------------------------ | ------------------------------------------------ |
| Allow-list      | `controls: ["play", "seek", "fullscreen"]` | Only listed controls render.                     |
| Object override | `controls: { cast: false, share: false }`  | Everything renders except keys set to `false`.   |
| `hide` array    | `hide: ["download", "stats"]`              | Removes listed controls, merged with `controls`. |

Order is independent:

```ts
ui: {
  controls: ["play", "volume", "time", "captions", "settings", "fullscreen"],
  order: ["play", "volume", "time", "captions", "settings", "fullscreen"],
}
```

Controls omitted from `order` keep their default position.

### Full control vocabulary

`play`, `previous`, `next`, `rewind`, `forward`, `seek`, `time`, `volume`,
`mute`, `captions`, `settings`, `quality`, `speed`, `audioTrack`, `chapters`,
`chapterLabel`, `playlist`, `stats`, `share`, `cast`, `airplay`, `pip`,
`fullscreen`, `zoom`, `rotate`, `download`, `title`, `live`.

The UI still applies capability filtering after your configuration. For
example, `pip` never appears for audio or images.

---

## 2. Kiosk and course players

```ts
const player = createPlayer({
  container,
  source: lessons[0].source,
  playlist: {
    items: lessons,
    requireCompletion: true,
    allowPrevious: false,
    autoAdvance: true,
    autoAdvanceDelay: 3,
  },
  ui: {
    controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"],
    settings: { speed: false, quality: false, stats: false, shortcuts: false },
    download: false,
    share: false,
  },
  keyboard: true,
});
```

What this does:

- Next is locked until the current lesson ends, enforced in the core.
- Previous is unavailable (`previous()` returns `null`).
- No speed, quality, stats, shortcuts, download or share.
- Keyboard shortcuts remain, but cannot bypass gating because `next()` checks
  the same rule.

If you need a “must watch every second” policy, use `requireCompletion` plus
`allowNext: false` until your own completion callback flips a flag:

```ts
player.on("ended", async () => {
  await markLessonComplete(player.playlistItem?.id);
  player.setAutoAdvance(true);
});
```

---

## 3. Menus and settings

```ts
ui: {
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
    shortcuts: true,
  },
  speed: { enabled: true, rates: [0.5, 1, 1.5, 2], keyboard: false },
}
```

- `settings: false` removes the entire gear menu.
- A section set to `false` disappears; other sections remain.
- `speed: false` removes speed everywhere, including the keyboard.
- `speed.rates` replaces the preset chips and slider stops.
- `speed.keyboard: false` disables `<`/`>` only.

`autoplay` and `autoplayNext` are viewer preferences exposed in Settings. They
call `setAutoplay()` and `setAutoAdvance()` for subsequent loads.

---

## 4. Gestures

Gestures are opt-in, which preserves desktop behaviour and avoids accidental
seeks on mobile scroll.

```ts
ui: {
  gestures: {
    enabled: true,
    swipeSeek: true,
    swipeFullscreen: true,
    swipeUp: false,   // disable swipe-up fullscreen
    swipeDown: true,
    swipeLeft: true,
    swipeRight: true,
    threshold: 48,
  },
}
```

`ui.gestures: false` disables all gestures. `enabled: false` is equivalent to
omitting the bag. `threshold` is the minimum drag in CSS pixels.

---

## 5. Share and embed

The share sheet includes native share, copy link, social targets and an
**Embed** action that copies a ready-to-paste snippet.

```ts
ui: {
  share: {
    url: "https://example.com/watch/clip",
    title: "Lesson one",
    thumbnail: "/media/thumb.jpg",
    embed: {
      mode: "player",          // "player" or "iframe"
      poster: "/media/thumb.jpg",
      width: 960,
      height: 540,
      title: "Lesson one",
    },
  },
}
```

- `share: false` removes the share control.
- `embed: false` removes only the embed action.
- `mode: "player"` emits a `<universal-player>` snippet; `"iframe"` emits an
  iframe.
- A poster makes `"player"` mode the sensible default.
- `element.getEmbedCode()` returns the current snippet headlessly.

---

## 6. Captions, persistence and styling

```ts
captions: {
  enabled: true,
  defaultTrack: "en",
  tracks: [
    { src: "/en.vtt", label: "English", language: "en", default: true },
    { src: "/hi.vtt", label: "हिन्दी", language: "hi" },
  ],
  style: {
    fontSize: "120%",
    color: "#ffffff",
    background: "rgba(0,0,0,.72)",
    opacity: 1,
    edge: "outline",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  persist: true,
  storageKey: "my-player-captions:",
}
```

- `persist: false` stops remembering the last track per source.
- `storageKey` scopes storage for multi-app origins.
- The CC button toggles on/off; language and size live in Settings.
- `setCaptionStyle()` merges partial updates without a reload.

---

## 7. Surveys as workflows

### End-of-video CSAT

```ts
survey: endOfVideoFeedback({
  title: "Was lesson one useful?",
  onSubmit: (result) => saveFeedback(result.answers),
});
```

### Blocking review

```ts
survey: blockingReview({
  title: "Before you continue",
  onSubmit: async (result) => {
    await saveReview(result.answers);
    unlockNextLesson();
  },
});
```

`blockingReview` sets `required: true`, `allowSkip: false`, `allowRetake: true`
and `maxAttempts: 2`. `closeSurvey()` is a no-op while required.

### Quiz with instant feedback

```ts
survey: quizFeedback({
  questions: [
    {
      id: "q1",
      type: "radio",
      label: "Which API selects a caption track?",
      required: true,
      correct: "setTextTrack",
      explanation: "setTextTrack(null) turns captions off.",
      options: [
        { id: "setQuality", label: "setQuality" },
        { id: "setTextTrack", label: "setTextTrack" },
      ],
    },
  ],
});
```

### Dynamic questions from an API

```ts
player.setSurvey(async () => {
  const response = await fetch("/api/survey", { headers: authHeaders });
  return response.json(); // SurveyConfig
});

player.on("ended", () => void player.openSurvey());
```

### Validation without the UI

```ts
import { validateSurveyAnswers } from "@codewithrajat/universal-player";

const issues = validateSurveyAnswers(survey, answers);
if (issues.length > 0) showErrors(issues);
```

---

## 8. Playlists and galleries

```ts
playlist: {
  items: [
    { id: "one", source: "/one.mp4", title: "One", poster: "/one.jpg" },
    { id: "two", source: "/two.mp4", title: "Two", poster: "/two.jpg" },
  ],
  startIndex: 0,
  autoAdvance: true,
  autoAdvanceDelay: 5,
  loop: false,
  requireCompletion: false,
  allowNext: true,
  allowPrevious: true,
}
```

An array source is a shortcut for a playlist with `autoAdvance: false`.

Images in an array become a gallery; add `image.slideDuration` to auto-advance.

---

## 9. Analytics and callbacks

```ts
analytics: {
  enabled: true,
  onEvent: (event) => {
    // { type, at, position, duration, source, metadata? }
    dataLayer.push({ event: "player", ...event });
  },
},
onStateChange: (state) => render(state),
onEvent: (event) => devLog(event.type),
```

- Analytics exceptions are swallowed.
- `onEvent` is low-level and fires for every event, including `timeupdate`.
- `onStateChange` fires only when the state snapshot is replaced.
- Use `analytics` for product telemetry and `onEvent` for integration glue.

Data contract: [REST contract](./rest-contract.md).

---

## 10. Resume

```ts
resume: {
  enabled: true,
  key: "course:lesson-1",
  minDuration: 30,
  storage: window.sessionStorage,
}
```

Resume is best-effort. Storage failures are ignored. `destroy()` saves the
position; `restoreResume()` applies it.

---

## 11. Images

```ts
image: {
  zoom: true,
  rotate: true,
  download: true,
  minZoom: 0.5,
  maxZoom: 4,
  slideDuration: 6,
}
```

Images show zoom/rotate/reset/download/share/fullscreen instead of playback
controls. Panning is possible while zoomed.

---

## 12. Live streams

```ts
createPlayer({
  container,
  source: "/live/index.m3u8",
  live: true,
  ui: { controls: ["play", "volume", "settings", "fullscreen"] },
});
```

`state.live` and `state.duration` expose live state. The helper functions in
`features/live` give you `seekableRange()`, `liveEdge()` and
`isAtLiveEdge()`. A dedicated DVR scrubber is on the roadmap.

---

## 13. Theme tokens without forking CSS

```ts
ui: {
  theme: {
    colors: { accent: "#22c55e", accentContrast: "#06240f" },
    radius: "1rem",
    controlRadius: "0.5rem",
    fontFamily: "Inter, system-ui, sans-serif",
    menuBackground: "rgba(24,24,24,.82)",
    menuBlur: "16px",
    variables: {
      "--up-control-size": "2.75rem",
      "--up-survey-button-radius": "999px",
    },
  },
}
```

`accent-color` on the element is shorthand for
`theme.colors.accent`. The full token list is in [Theming](./theming.md).

---

## 14. A complete production configuration

```ts
import { createPlayer, contentFeedback } from "@codewithrajat/universal-player";

const player = createPlayer({
  container: document.querySelector("#player")!,
  source: {
    kind: "video",
    src: "/media/lesson-1.mp4",
    captions: [{ src: "/media/en.vtt", label: "English", language: "en", default: true }],
    chapters: [
      { id: "intro", title: "Introduction", startTime: 0 },
      { id: "demo", title: "Demo", startTime: 120 },
    ],
  },
  poster: "/media/poster.jpg",
  theme: "dark",
  locale: "en",
  startTime: 0,
  volume: 0.9,
  keyboard: true,
  clickToPlay: true,
  doubleClickFullscreen: true,
  ui: {
    controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"],
    settings: { stats: false, shortcuts: true, sleepTimer: true },
    speed: { rates: [0.75, 1, 1.25, 1.5, 2] },
    time: { mode: "elapsed", toggle: true, showTotal: true },
    share: { embed: true },
    gestures: { enabled: true, swipeUp: false },
    theme: { colors: { accent: "#22c55e" } },
    idleDelay: 2500,
  },
  captions: { persist: true },
  resume: { enabled: true, minDuration: 30 },
  analytics: { onEvent: (event) => sendTelemetry(event) },
  survey: contentFeedback({ trigger: "ended", once: true }),
});

player.on("error", ({ error }) => report(error));
```

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)