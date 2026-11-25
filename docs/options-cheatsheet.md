# Options cheatsheet

> [Docs home](./README.md) › Options cheatsheet

[← Docs](./README.md) · [Defaults](./defaults.md) · [API reference](./api-reference.md)

The complete `PlayerOptions` object in one block, then an entry per option with
its default, accepted values and practical notes. Copy the block, delete what
you do not need, and keep the [Defaults](./defaults.md) page open when you are
unsure what an omitted key does.

---

## 1. The complete object

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  // Required
  container: document.querySelector("#player")!,

  // Source
  source: "/media/clip.mp4",

  // Presentation
  label: "Product demo",
  controls: "custom",
  theme: "system",
  locale: "en",
  strings: {},
  ui: {
    controls: undefined,
    hide: undefined,
    order: undefined,
    settings: {
      enabled: true,
      speed: true,
      quality: true,
      captions: true,
      captionStyle: true,
      audio: true,
      loop: true,
      autoplay: true,
      autoplayNext: true,
      sleepTimer: true,
      stats: true,
      shortcuts: true,
    },
    speed: {
      enabled: true,
      rates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      defaultRate: 1,
      keyboard: true,
    },
    share: {
      enabled: true,
      url: undefined,
      title: undefined,
      thumbnail: undefined,
      embed: {
        enabled: true,
        mode: "iframe",
        url: undefined,
        poster: undefined,
        width: 640,
        height: 360,
        title: undefined,
      },
    },
    time: { mode: "elapsed", toggle: true, showTotal: true },
    download: {
      enabled: false,
      filename: undefined,
      kinds: undefined,
      saveAs: true,
    },
    gestures: {
      enabled: false,
      swipeSeek: true,
      swipeFullscreen: true,
      swipeUp: true,
      swipeDown: true,
      swipeLeft: true,
      swipeRight: true,
      threshold: 48,
    },
    theme: {
      colors: {
        accent: undefined,
        accentContrast: undefined,
        background: undefined,
        surface: undefined,
        foreground: undefined,
        muted: undefined,
        border: undefined,
        overlay: undefined,
      },
      radius: undefined,
      controlRadius: undefined,
      fontFamily: undefined,
      menuBackground: undefined,
      menuBlur: undefined,
      variables: undefined,
    },
    showTitle: true,
    showChapterLabel: true,
    showTime: true,
    showBuffered: true,
    showPreview: true,
    showBigPlay: true,
    autoHideControls: true,
    idleDelay: 3000,
  },

  // Playback
  autoplay: false,
  muted: false,
  loop: false,
  preload: "metadata",
  poster: undefined,
  crossOrigin: undefined,
  playsInline: true,
  volume: 1,
  playbackRate: 1,
  startTime: 0,
  live: false,

  // Tracks and metadata
  qualities: [],
  textTracks: [],
  audioTracks: [],
  chapters: [],
  thumbnails: undefined,
  captions: {
    enabled: false,
    defaultTrack: null,
    tracks: [],
    style: undefined,
    persist: true,
    storageKey: undefined,
  },

  // Features
  survey: undefined,
  playlist: undefined,
  image: {
    zoom: true,
    rotate: true,
    download: false,
    minZoom: 0.25,
    maxZoom: 8,
    slideDuration: undefined,
  },
  resume: {
    enabled: false,
    key: undefined,
    storage: undefined,
    minDuration: 30,
  },
  analytics: {
    enabled: true,
    onEvent: undefined,
  },

  // Interaction
  keyboard: true,
  clickToPlay: true,
  doubleClickFullscreen: true,
  autoHideControls: true,
  seekStep: 5,
  volumeStep: 0.1,

  // Callbacks
  onStateChange: undefined,
  onEvent: undefined,
});
```

> The block shows explicit defaults for clarity. In real code you should omit
> `undefined` values; `exactOptionalPropertyTypes` is enabled in this project,
> and passing `undefined` explicitly is different from omitting a key for some
> types.

---

## 2. Required

### `container`

- **Type:** `HTMLElement`
- **Required:** yes
- **Default:** none

The element that owns the player surface. It receives an internal stage and the
media engine's element. The core throws `invalid-argument` when it is not an
`HTMLElement`.

The custom element supplies its own internal viewport, so consumers never pass
`container` to `<universal-player>`.

---

## 3. Source

### `source`

- **Type:** `PlayerSourceInput`
- **Required:** no
- **Default:** `undefined`

A URL, structured source, `Blob`, `File`, `MediaStream`, chunked source, or an
array (playlist/gallery). Omit it to call `load()` later.

```ts
source: "/clip.mp4";
source: { kind: "video", src: "/clip.mp4", type: "video/mp4" };
source: file;
source: ["/1.jpg", "/2.jpg"];
```

### Structured source fields

| Field         | Type                                       | Required       | Applies to      |
| ------------- | ------------------------------------------ | -------------- | --------------- |
| `kind`        | `"video" \| "audio" \| "image" \| "embed"` | yes            | All             |
| `src`         | `string`                                   | yes            | All non-chunked |
| `type`        | `string`                                   | no             | All             |
| `alt`         | `string`                                   | no             | Images          |
| `provider`    | `"youtube" \| "vimeo" \| "generic"`        | yes for embeds | Embed           |
| `title`       | `string`                                   | no             | Metadata/embeds |
| `description` | `string`                                   | no             | Metadata        |
| `captions`    | `readonly CaptionTrack[]`                  | no             | Metadata        |
| `chapters`    | `readonly Chapter[]`                       | no             | Metadata        |
| `thumbnails`  | `ThumbnailTrack`                           | no             | Metadata        |
| `survey`      | `SurveySource`                             | no             | Metadata        |

### Chunked source fields

| Field        | Type                               | Required |
| ------------ | ---------------------------------- | -------- |
| `kind`       | `"video" \| "audio" \| "image"`    | yes      |
| `type`       | `string`                           | yes      |
| `chunks`     | iterable or function returning one | yes      |
| `mode`       | `"auto" \| "stream" \| "blob"`     | no       |
| `chunkDelay` | `number`                           | no       |

---

## 4. Presentation

### `controls`

- **Type:** `"custom" | "native"`
- **Default:** `"custom"`

`custom` removes the browser's controls; it does **not** create controls. Only `<universal-player>` renders the built-in surface. `native` delegates to browser controls.
Runtime: `setControls()`.

### `theme`

- **Type:** `"light" | "dark" | "system"`
- **Default:** `"system"`

`system` follows `prefers-color-scheme`. Runtime: `setTheme()`.

### `ui`

- **Type:** `UIOptions`
- **Default:** `undefined`

The entire advanced surface. See [UIOptions](#7-uioptions) below.

### `locale`

- **Type:** `string` (BCP 47)
- **Default:** `"en"`

Selects registered strings. Register locales with `registerLocale()`.

### `strings`

- **Type:** `Partial<PlayerStrings>`
- **Default:** `{}`

Per-instance overrides. Highest string precedence. Runtime: `setStrings()`.

### `label`

- **Type:** `string`
- **Default:** `"Media player"` on the element

ARIA label for the player region.

---

## 5. Playback

### `autoplay`

- **Type:** `boolean`
- **Default:** `false`

Attempts playback after load. Browsers commonly reject programmatic autoplay;
the rejection is swallowed and `state.playing` stays false.

### `muted`

- **Type:** `boolean`
- **Default:** `false`

Muted autoplay is more likely to be allowed.

### `loop`

- **Type:** `boolean`
- **Default:** `false`

Loops the current media. Runtime: `setLoop()`.

### `preload`

- **Type:** `"none" | "metadata" | "auto"`
- **Default:** `undefined` (browser default)

Forwarded to the native media element. Has no effect on iframe embeds.

### `poster`

- **Type:** `string`
- **Default:** `undefined`

Poster image before playback. The element also accepts `thumbnail` as an alias.
Playlist items may override it with their own `poster`.

### `crossOrigin`

- **Type:** `"anonymous" | "use-credentials" | null`
- **Default:** `undefined`

Native media CORS mode. Required for cross-origin captions/canvas access in many
browsers.

### `playsInline`

- **Type:** `boolean`
- **Default:** `true` on the element; `undefined` in core

Prevents iPhone fullscreen takeover on play.

### `volume`

- **Type:** `number` (`0`–`1`)
- **Default:** `1`

Clamped. Runtime: `setVolume()`.

### `playbackRate`

- **Type:** `number` (`0.25`–`4`)
- **Default:** `1`

Clamped. Runtime: `setPlaybackRate()`.

### `startTime`

- **Type:** `number` (seconds)
- **Default:** `undefined` → `0`

Applied after metadata. For resume, prefer the `resume` option.

### `live`

- **Type:** `boolean`
- **Default:** `false`

Marks a source as live before metadata. The UI also infers live from duration.

---

## 6. Tracks and metadata

### `qualities`

- **Type:** `readonly QualityLevel[]`
- **Default:** `[]`

Useful for embeds or to pre-populate the menu before HLS/DASH levels arrive.
Each level: `{ id, label, width?, height?, bitrate?, codec?, frameRate? }`.

### `textTracks`

- **Type:** `readonly TextTrackInfo[]`
- **Default:** `[]`

Declared tracks for engines that cannot enumerate them. Each:
`{ id, label, language, kind, default? }`.

### `audioTracks`

- **Type:** `readonly AudioTrackInfo[]`
- **Default:** `[]`

Declared audio tracks. Each: `{ id, label, language, default? }`.

### `chapters`

- **Type:** `readonly Chapter[]`
- **Default:** `[]`

Each: `{ id, title, startTime, endTime?, thumbnail? }`.

### `thumbnails`

- **Type:** `ThumbnailTrack`
- **Default:** `undefined`

`{ cues: [{ startTime, endTime, url, width?, height? }], spriteUrl? }`.

### `captions`

See [Captions options](#10-captions-options).

---

## 7. UIOptions

### `ui.controls`

- **Type:** array or object
- **Default:** `undefined` (all)

Array = allow-list. Object = hide keys set to `false`.

### `ui.hide`

- **Type:** `readonly PlayerControl[]`
- **Default:** `undefined`

Additional hides, merged on top of `controls`.

### `ui.order`

- **Type:** `readonly PlayerControl[]`
- **Default:** `undefined`

Preferred order. Omitted controls keep their default slot.

### `ui.settings`

- **Type:** `SettingsMenuOptions | false`
- **Default:** `undefined` (all sections shown)

`false` removes the menu. Sections default to `true`.

### `ui.speed`

- **Type:** `SpeedOptions | false`
- **Default:** `undefined` (enabled)

`false` removes speed controls. `rates` replaces the chip/slider values.

### `ui.share`

- **Type:** `ShareOptions | false`
- **Default:** `undefined` (enabled)

`false` removes share. `embed: false` removes only the embed action.

### `ui.time`

- **Type:** `TimeDisplayOptions`
- **Default:** `{ mode: "elapsed", toggle: true, showTotal: true }`

### `ui.download`

- **Type:** `DownloadOptions | boolean`
- **Default:** `undefined` (hidden)

`true` enables with defaults. An object with `enabled: true` also enables.

### `ui.gestures`

- **Type:** `GestureOptions | false`
- **Default:** `undefined` (off)

`enabled: true` turns gestures on. `false` disables everything.

### `ui.theme`

- **Type:** `UIThemeOptions`
- **Default:** `undefined`

Token overrides. See [Theming](./theming.md).

### Layout flags

| Option             | Default            |
| ------------------ | ------------------ |
| `showTitle`        | `true`             |
| `showChapterLabel` | `true`             |
| `showTime`         | `true`             |
| `showBuffered`     | `true`             |
| `showPreview`      | `true`             |
| `showBigPlay`      | `true`             |
| `autoHideControls` | `true`             |
| `idleDelay`        | `3000` (min `500`) |

---

## 8. Survey options

```ts
survey: {
  id: "post-watch",
  kind: "feedback",
  title: "How was the video?",
  description: "Optional description",
  submitLabel: "Send",
  skipLabel: "Skip",
  closeLabel: "Close",
  thankYouTitle: "Thanks!",
  thankYouText: "Your feedback helps.",
  questions: [],
  trigger: "ended",
  once: true,
  allowSkip: true,
  required: false,
  blocking: false,
  submitMode: "manual",
  autoSubmit: false,
  autoSubmitDelay: 0,
  instantFeedback: false,
  allowRetake: false,
  allowResubmit: false,
  maxAttempts: 3,
  storageKey: undefined,
  onSubmit: undefined,
  onSkip: undefined,
  onRetake: undefined,
}
```

| Option                           | Type                                              | Default         |
| -------------------------------- | ------------------------------------------------- | --------------- |
| `id`                             | `string`                                          | generated       |
| `kind`                           | `"survey" \| "feedback" \| "review" \| "quiz"`    | `"survey"`      |
| `title`, `description`           | `string`                                          | —               |
| `questions`                      | `SurveyQuestion[]`                                | **required**    |
| `trigger`                        | `"ended" \| "manual" \| number \| { at: number }` | `"ended"`       |
| `once`                           | `boolean`                                         | `true`          |
| `allowSkip`                      | `boolean`                                         | `true`          |
| `required`                       | `boolean`                                         | `false`         |
| `blocking`                       | `boolean`                                         | `false` (alias) |
| `submitMode`                     | `"manual" \| "on-select" \| "on-complete"`        | `"manual"`      |
| `autoSubmit`                     | `boolean`                                         | `false`         |
| `autoSubmitDelay`                | `number`                                          | `0`             |
| `instantFeedback`                | `boolean`                                         | `false`         |
| `allowRetake`                    | `boolean`                                         | `false`         |
| `allowResubmit`                  | `boolean`                                         | `false` (alias) |
| `maxAttempts`                    | `number`                                          | `Infinity`      |
| `onSubmit`, `onSkip`, `onRetake` | callbacks                                         | —               |

### Question options

| Option                            | Type                                                                 | Default      |
| --------------------------------- | -------------------------------------------------------------------- | ------------ |
| `id`                              | `string`                                                             | **required** |
| `type`                            | `radio \| checkbox \| select \| text \| textarea \| rating \| scale` | **required** |
| `label`                           | `string`                                                             | **required** |
| `description`                     | `string`                                                             | —            |
| `placeholder`                     | `string`                                                             | —            |
| `required`                        | `boolean`                                                            | `false`      |
| `options`                         | `SurveyOption[]`                                                     | —            |
| `min` / `max` / `step`            | `number`                                                             | —            |
| `minLength` / `maxLength`         | `number`                                                             | —            |
| `minSelections` / `maxSelections` | `number`                                                             | —            |
| `allowOther`                      | `boolean`                                                            | `false`      |
| `otherLabel`                      | `string`                                                             | —            |
| `correct`                         | `string \| string[]`                                                 | —            |
| `explanation`                     | `string`                                                             | —            |
| `autoSubmit`                      | `boolean`                                                            | `false`      |

---

## 9. Playlist options

| Option              | Type             | Default         |
| ------------------- | ---------------- | --------------- |
| `items`             | `PlaylistItem[]` | **required**    |
| `startIndex`        | `number`         | `0`             |
| `autoAdvance`       | `boolean`        | `false`         |
| `loop`              | `boolean`        | `false`         |
| `autoAdvanceDelay`  | `number`         | `0`             |
| `requireCompletion` | `boolean`        | `false`         |
| `gateAdvance`       | `boolean`        | `false` (alias) |
| `allowNext`         | `boolean`        | `true`          |
| `allowPrevious`     | `boolean`        | `true`          |

`PlaylistItem`: `{ id?, source, title?, poster?, duration? }`.

---

## 10. Captions options

| Option         | Type             | Default |
| -------------- | ---------------- | ------- |
| `enabled`      | `boolean`        | `false` |
| `defaultTrack` | `string \| null` | `null`  |
| `tracks`       | `CaptionTrack[]` | `[]`    |
| `style`        | `CaptionStyle`   | —       |
| `persist`      | `boolean`        | `true`  |
| `storageKey`   | `string`         | derived |

`CaptionTrack`: `{ id?, src, label, language, kind?, default? }`.
`CaptionStyle`: `{ fontSize?, color?, background?, opacity?, edge?, fontFamily? }`.

---

## 11. Image options

| Option          | Type      | Default     |
| --------------- | --------- | ----------- |
| `zoom`          | `boolean` | `true`      |
| `rotate`        | `boolean` | `true`      |
| `download`      | `boolean` | `false`     |
| `minZoom`       | `number`  | `0.25`      |
| `maxZoom`       | `number`  | `8`         |
| `slideDuration` | `number`  | `undefined` |

---

## 12. Resume options

| Option        | Type      | Default                  |
| ------------- | --------- | ------------------------ |
| `enabled`     | `boolean` | `false`                  |
| `key`         | `string`  | `universal-player:<url>` |
| `storage`     | `Storage` | `localStorage`           |
| `minDuration` | `number`  | `30`                     |

---

## 13. Analytics options

| Option    | Type                              | Default     |
| --------- | --------------------------------- | ----------- |
| `enabled` | `boolean`                         | `true`      |
| `onEvent` | `(event: AnalyticsEvent) => void` | `undefined` |

`AnalyticsEvent`: `{ type, at, position, duration, source, metadata? }`.

---

## 14. Interaction options

> These options are **UI only**. They are accepted by `PlayerOptions` but consumed by `<universal-player>`, not by the headless core.

| Option                  | Type      | Default | Notes                     |
| ----------------------- | --------- | ------- | ------------------------- |
| `keyboard`              | `boolean` | `true`  | Built-in shortcuts.       |
| `clickToPlay`           | `boolean` | `true`  | Click surface to toggle.  |
| `doubleClickFullscreen` | `boolean` | `true`  | Double-click fullscreen.  |
| `autoHideControls`      | `boolean` | `true`  | Fade while playing.       |
| `seekStep`              | `number`  | `5`     | Arrow step; `J`/`L` = 2×. |
| `volumeStep`            | `number`  | `0.1`   | Arrow volume.             |

---

## 15. Callbacks

### `onStateChange`

- **Type:** `(state: PlayerState) => void`
- **Default:** `undefined`

Called after each state replacement. Exceptions are swallowed.

### `onEvent`

- **Type:** `(event: PlayerEvent) => void`
- **Default:** `undefined`

Called for every event, including `timeupdate` and `progress`. Keep it cheap.

---

## 16. Copy-paste presets

### Minimal

```ts
{ container, source: "/clip.mp4" }
```

### Branded

```ts
{
  container,
  source: "/clip.mp4",
  theme: "dark",
  ui: { theme: { colors: { accent: "#22c55e" }, radius: "1rem" } },
}
```

### Course

```ts
{
  container,
  source: lessons[0].source,
  playlist: { items: lessons, requireCompletion: true, allowPrevious: false },
  ui: { controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"] },
}
```

### Kiosk

```ts
{
  container,
  source: "/loop.mp4",
  loop: true,
  ui: {
    controls: ["play", "fullscreen"],
    settings: false,
    download: false,
    share: false,
    gestures: false,
  },
}
```

### Feedback

```ts
{
  container,
  source: "/clip.mp4",
  survey: endOfVideoFeedback({ onSubmit: saveFeedback }),
}
```

### Privacy-first

```ts
{
  container,
  source: "/clip.mp4",
  resume: { enabled: false },
  analytics: { enabled: false },
  captions: { persist: false },
}
```

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)