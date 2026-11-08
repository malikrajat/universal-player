# API reference

> [Docs home](./README.md) � API reference

[← Docs](./README.md) · [Options cheatsheet](./options-cheatsheet.md) · [Defaults](./defaults.md) · [Source reference](./api-source-reference.md)

Complete reference for the public surface of
`@codewithrajat/universal-player` **0.0.1**.

- Package: `@codewithrajat/universal-player`
- Module format: ESM only
- Language: TypeScript, bundled `.d.ts`
- Runtime dependencies: none

Every type below is exported from
`@codewithrajat/universal-player/core` unless a different entry is noted.

---

## Table of contents

1. [Entry points](#entry-points)
2. [Runtime exports](#runtime-exports)
3. [UniversalPlayer](#universalplayer)
4. [Methods](#methods)
5. [PlayerOptions](#playeroptions)
6. [Sources](#sources)
7. [PlayerState](#playerstate)
8. [Events](#events)
9. [UIOptions](#uioptions)
10. [Survey API](#survey-api)
11. [Playlist, chapter and thumbnail types](#playlist-chapter-and-thumbnail-types)
12. [Errors](#errors)
13. [Custom element API](#custom-element-api)
14. [Framework API](#framework-api)
15. [Feature helper exports](#feature-helper-exports)

---

## Entry points

| Import                                       | Exports                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@codewithrajat/universal-player`            | Everything in `core` + `ui` + `vanilla` + `features`                                   |
| `@codewithrajat/universal-player/core`       | Player, events, errors, source helpers, state helpers, types                           |
| `@codewithrajat/universal-player/ui`         | `UniversalPlayerElement`, `defineUniversalPlayerElement`, `UNIVERSAL_PLAYER_TAG`, i18n |
| `@codewithrajat/universal-player/vanilla`    | `mountUniversalPlayer`, `MountOptions`                                                 |
| `@codewithrajat/universal-player/react`      | `UniversalPlayer`, `useUniversalPlayer`, handle/props types                            |
| `@codewithrajat/universal-player/vue`        | `UniversalPlayer`, `useUniversalPlayer`, option/result types                           |
| `@codewithrajat/universal-player/angular`    | `AngularUniversalPlayer`, input/output types                                           |
| `@codewithrajat/universal-player/svelte4`    | Default Svelte 4 component                                                             |
| `@codewithrajat/universal-player/svelte5`    | Default Svelte 5 component                                                             |
| `@codewithrajat/universal-player/styles.css` | Light-DOM stylesheet                                                                   |

---

## Runtime exports

### From `/core`

```ts
// Player
export { UniversalPlayer, createPlayer };

// Events
export { PlayerEventBus, PlayerObservable, toRxjsObservable };
export type { PlayerObserver, Subscription };

// Errors
export { PLAYER_ERROR_CODES, createPlayerError, isPlayerError, toPlayerError };
export type { PlayerError, PlayerErrorCode, PlayerErrorOptions };

// Source detection
export {
  detectMediaKind,
  extensionOf,
  inferMimeType,
  isVimeoHost,
  isYouTubeHost,
  normalizeSource,
  revokeSource,
  sourceToken,
};

// State and utilities
export { createInitialState };
export type { InitialStateOptions };
export { clamp, finiteOr, formatTime, formatTimecode };

// Capabilities
export { EMBED_CAPABILITIES, IMAGE_CAPABILITIES, NATIVE_CAPABILITIES, capabilitiesForKind };
```

`toRxjsObservable` returns a `Promise` because it lazily imports the optional
`rxjs` peer.

### From `/ui`

```ts
export { UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement };

export { PLAYER_STRINGS_EN, getStrings, registerLocale, setStrings };
```

### From `/vanilla`

```ts
export { mountUniversalPlayer };
export type { MountOptions };
```

### From the package root

```ts
export * from "./core.js";
export * from "./ui.js";
export * from "./vanilla.js";
export * from "../features/index.js";
```

Importing the root also calls `defineUniversalPlayerElement()` once.

---

## UniversalPlayer

```ts
import { UniversalPlayer, createPlayer } from "@codewithrajat/universal-player/core";

const player = new UniversalPlayer(options);
const same = createPlayer(options); // equivalent factory
```

`UniversalPlayer` extends `EventTarget`. It owns exactly one engine at a time,
exposes one immutable `state` snapshot, and emits the same event through DOM,
typed and observable channels.

### Constructor

```ts
new UniversalPlayer(options: PlayerOptions)
```

**Throws** a `PlayerError` with `code: "invalid-argument"` when `container` is
not an `HTMLElement`.

If `options.source` is present, the constructor starts `load()` and publishes
failures through the `error` event and `state.error`; it does not throw
asynchronously.

### Read-only properties

| Property         | Type                         | Description                                                      |
| ---------------- | ---------------------------- | ---------------------------------------------------------------- |
| `state`          | `PlayerState`                | Immutable snapshot. Replaced on meaningful transitions.          |
| `options`        | `Readonly<PlayerOptions>`    | Current construction options, including runtime updates.         |
| `source`         | `NormalizedSource \| null`   | Normalized current source, or `null` before the first load.      |
| `activeSurvey`   | `SurveyConfig \| null`       | Active survey config, or `null`.                                 |
| `playlistStatus` | `PlaylistStatus \| null`     | Playlist snapshot, or `null` without a playlist.                 |
| `playlistItems`  | `readonly PlaylistItem[]`    | The current playlist items.                                      |
| `playlistItem`   | `PlaylistItem \| null`       | Current item, or `null`.                                         |
| `mediaElement`   | `HTMLElement \| null`        | Underlying `<video>`/`<audio>`/`<img>`/`<iframe>`, when exposed. |
| `capabilities`   | `PlayerCapabilities \| null` | Active engine capabilities, or `null` before a load.             |
| `destroyed`      | `boolean`                    | Whether `destroy()` has run.                                     |
| `currentChapter` | `Chapter \| null`            | Chapter active at `state.currentTime`.                           |
| `thumbnails`     | `ThumbnailTrack \| null`     | Active thumbnail track.                                          |

---

## Methods

### Subscriptions

| Method             | Signature                                                                             | Returns                             |
| ------------------ | ------------------------------------------------------------------------------------- | ----------------------------------- |
| `on`               | `<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void)` | `() => void` unsubscribe            |
| `once`             | `<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void)` | `() => void` unsubscribe            |
| `observe`          | `<K extends keyof PlayerEvents>(type: K)`                                             | `PlayerObservable<PlayerEvents[K]>` |
| `addEventListener` | inherited from `EventTarget`                                                          | —                                   |

Listener exceptions are isolated: a throwing subscriber cannot break playback
or other subscribers.

### Loading and playback

| Method     | Signature                                     | Notes                                                                                          |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `load`     | `(input: PlayerSourceInput) => Promise<void>` | Replaces the source. A newer call cancels an older in-flight load. An array builds a playlist. |
| `play`     | `() => Promise<void>`                         | Throws `invalid-state` when nothing is loaded. Replaying after `ended` seeks to `0` first.     |
| `pause`    | `() => void`                                  | No-op when nothing is loaded.                                                                  |
| `seek`     | `(time: number) => void`                      | Clamps negatives to `0`; non-finite becomes `0`.                                               |
| `retry`    | `() => Promise<void>`                         | Reloads the current source. Throws `invalid-state` when nothing is loaded.                     |
| `syncTime` | `() => void`                                  | Requests an immediate time refresh; useful for embeds.                                         |

### Volume and rate

| Method            | Signature                  | Range / default        |
| ----------------- | -------------------------- | ---------------------- |
| `setVolume`       | `(volume: number) => void` | Clamped to `0`–`1`.    |
| `setMuted`        | `(muted: boolean) => void` | —                      |
| `toggleMute`      | `() => void`               | —                      |
| `setPlaybackRate` | `(rate: number) => void`   | Clamped to `0.25`–`4`. |

### Tracks and quality

| Method               | Signature                            | Notes                                                                          |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `setQuality`         | `(quality: string \| null) => void`  | `null` selects automatic. Emits `qualitychange`.                               |
| `setTextTrack`       | `(id: string \| null) => void`       | `null` disables captions. Persists the choice when captions persistence is on. |
| `setAudioTrack`      | `(id: string \| null) => void`       | `null` lets the browser decide.                                                |
| `setCaptionsEnabled` | `(enabled: boolean) => void`         | Enables the default/current track or turns captions off.                       |
| `toggleCaptions`     | `() => void`                         | Cycles off → track 1 → … → off.                                                |
| `setCaptionStyle`    | `(style: CaptionStyle) => void`      | Merges into the current style.                                                 |
| `setCaptions`        | `(options: CaptionsOptions) => void` | Replaces the caption configuration.                                            |

### Chapters, thumbnails, playlists

| Method              | Signature                                      | Notes                                                                       |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| `setChapters`       | `(chapters: readonly Chapter[]) => void`       | Replaces chapters and recalculates the active chapter.                      |
| `seekToChapter`     | `(chapter: Chapter \| string) => void`         | Accepts a chapter object or id. Unknown id is a no-op.                      |
| `setThumbnails`     | `(thumbnails: ThumbnailTrack \| null) => void` | `null` removes the override.                                                |
| `setPlaylist`       | `(options: PlaylistOptions \| null) => void`   | `null` or an empty list clears the playlist.                                |
| `playPlaylistItem`  | `(index: number) => Promise<boolean>`          | Returns `false` for invalid indexes. Throws `invalid-state` when gated.     |
| `next`              | `() => Promise<PlaylistItem \| null>`          | Returns `null` at the end without loop. Throws when Next is gated/disabled. |
| `previous`          | `() => Promise<PlaylistItem \| null>`          | Returns `null` at the start without loop.                                   |
| `cancelAutoAdvance` | `() => void`                                   | Cancels a scheduled auto-advance.                                           |

### Survey

| Method         | Signature                                                          | Notes                                                                                          |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `setSurvey`    | `(survey: SurveySource \| null) => void`                           | Accepts a config or async provider. `null` clears it.                                          |
| `openSurvey`   | `(force = false) => Promise<boolean>`                              | `true` when opened; `false` when absent, already completed in `once` mode, or out of attempts. |
| `retakeSurvey` | `() => Promise<boolean>`                                           | Requires `allowRetake: true`.                                                                  |
| `submitSurvey` | `(answers: Readonly<Record<string, unknown>>) => SurveySubmission` | Throws `invalid-argument` with `details.issues` when validation fails.                         |
| `skipSurvey`   | `() => SurveySubmission \| null`                                   | `null` when absent/closed/not skippable.                                                       |
| `closeSurvey`  | `() => void`                                                       | No-op when `required: true`.                                                                   |

### Presentation and lifecycle

| Method                    | Signature                                   | Notes                                                                              |
| ------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| `requestFullscreen`       | `() => Promise<void>`                       | Throws `unsupported-environment` when unavailable.                                 |
| `exitFullscreen`          | `() => Promise<void>`                       | No-op when not fullscreen.                                                         |
| `requestPictureInPicture` | `() => Promise<void>`                       | Throws `unsupported-source` when the engine is not a video.                        |
| `exitPictureInPicture`    | `() => Promise<void>`                       | No-op when not in PiP.                                                             |
| `setControls`             | `(mode: ControlsMode) => void`              | `"custom"` or `"native"`.                                                          |
| `setTheme`                | `(theme: ThemeMode) => void`                | `"light"`, `"dark"`, `"system"`.                                                   |
| `setLocale`               | `(locale: string) => void`                  | BCP 47 tag.                                                                        |
| `setStrings`              | `(strings: Partial<PlayerStrings>) => void` | Merges string overrides.                                                           |
| `destroy`                 | `() => void`                                | Terminal. Stops playback, revokes object URLs, clears timers, removes the surface. |

### Resume helpers

| Method          | Signature    | Notes                                                            |
| --------------- | ------------ | ---------------------------------------------------------------- |
| `restoreResume` | `() => void` | Seeks to the stored position when `resume.enabled: true`.        |
| `saveResume`    | `() => void` | Writes the current position. `destroy()` calls it automatically. |

### Playlist gating semantics

`next()` and `playPlaylistItem(index)` enforce configuration in the core, not
only in the UI:

- `allowNext: false` → advancing throws `invalid-state`.
- `requireCompletion` / `gateAdvance: true` → advancing before the item ends
  throws `invalid-state`.
- `allowPrevious: false` → `previous()` returns `null`.
- `loop: true` → next at the end wraps to index `0`; previous at the start wraps
  to the last item.

---

## PlayerOptions

> **UI boundary:** `theme`, `ui`, `locale`, `strings`, `keyboard`, `clickToPlay`, `doubleClickFullscreen`, `autoHideControls`, `seekStep` and `volumeStep` are consumed only by `<universal-player>`. They are accepted by `PlayerOptions` but inert in headless surfaces.

`PlayerOptions` is the single construction object.

| Option                  | Type                                       | Required | Default                                                | Description                                                    |
| ----------------------- | ------------------------------------------ | -------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| `container`             | `HTMLElement`                              | **yes**  | —                                                      | Element that owns the player surface.                          |
| `source`                | `PlayerSourceInput`                        | no       | `undefined`                                            | Initial source. Omit to call `load()` later.                   |
| `label`                 | `string`                                   | no       | `"Media player"` in the element; otherwise `undefined` | Accessible region label.                                       |
| `controls`              | `"custom" \| "native"`                     | no       | `"custom"`                                             | Mode hint. `custom` removes native controls; only `<universal-player>` renders built-in chrome. |
| `theme`                 | `"light" \| "dark" \| "system"`            | no       | `"system"`                                             | Built-in UI theme.                                             |
| `ui`                    | `UIOptions`                                | no       | `undefined`                                            | Fine-grained control/menu/gesture/token configuration.         |
| `locale`                | `string`                                   | no       | `"en"`                                                 | BCP 47 locale for built-in strings.                            |
| `strings`               | `Partial<PlayerStrings>`                   | no       | `{}`                                                   | Per-instance string overrides.                                 |
| `autoplay`              | `boolean`                                  | no       | `false`                                                | Attempt playback after load. Browser policy may reject it.     |
| `muted`                 | `boolean`                                  | no       | `false`                                                | Initial muted state.                                           |
| `loop`                  | `boolean`                                  | no       | `false`                                                | Loop the current media.                                        |
| `preload`               | `"none" \| "metadata" \| "auto"`           | no       | `undefined` (browser default)                          | Forwarded preload hint.                                        |
| `poster`                | `string`                                   | no       | `undefined`                                            | Poster image. `poster`/`thumbnail` are aliases on the element. |
| `crossOrigin`           | `"anonymous" \| "use-credentials" \| null` | no       | `undefined`                                            | Native media CORS setting.                                     |
| `playsInline`           | `boolean`                                  | no       | `true` on the element; `undefined` in core             | iPhone inline playback.                                        |
| `volume`                | `number`                                   | no       | `1`                                                    | Clamped `0`–`1`.                                               |
| `playbackRate`          | `number`                                   | no       | `1`                                                    | Clamped `0.25`–`4`.                                            |
| `startTime`             | `number`                                   | no       | `undefined` (start at 0)                               | Initial seek position in seconds.                              |
| `live`                  | `boolean`                                  | no       | `false`                                                | Marks the source as live even before metadata.                 |
| `qualities`             | `readonly QualityLevel[]`                  | no       | `[]`                                                   | Declared quality levels for embeds or pre-metadata UI.         |
| `textTracks`            | `readonly TextTrackInfo[]`                 | no       | `[]`                                                   | Declared text tracks.                                          |
| `audioTracks`           | `readonly AudioTrackInfo[]`                | no       | `[]`                                                   | Declared audio tracks.                                         |
| `chapters`              | `readonly Chapter[]`                       | no       | `[]`                                                   | Chapter markers.                                               |
| `thumbnails`            | `ThumbnailTrack`                           | no       | `undefined`                                            | Seek-bar hover preview cues.                                   |
| `captions`              | `CaptionsOptions`                          | no       | `undefined`                                            | Track list, default track, style, persistence.                 |
| `survey`                | `SurveySource`                             | no       | `undefined`                                            | Inline survey config or async provider.                        |
| `playlist`              | `PlaylistOptions`                          | no       | `undefined`                                            | Queue/gallery configuration.                                   |
| `image`                 | `ImageOptions`                             | no       | `undefined`                                            | Still-image viewer options.                                    |
| `keyboard`              | `boolean`                                  | no       | `true`                                                 | Built-in shortcuts.                                            |
| `clickToPlay`           | `boolean`                                  | no       | `true`                                                 | Click the surface to toggle playback.                          |
| `doubleClickFullscreen` | `boolean`                                  | no       | `true`                                                 | Double-click enters fullscreen.                                |
| `autoHideControls`      | `boolean`                                  | no       | `true`                                                 | Hide controls while playing.                                   |
| `seekStep`              | `number`                                   | no       | `5`                                                    | Arrow seek step in seconds; `J`/`L` use `2 × seekStep`.        |
| `volumeStep`            | `number`                                   | no       | `0.1`                                                  | Arrow volume step.                                             |
| `resume`                | `ResumeOptions`                            | no       | `undefined` (`enabled: false`)                         | Storage-backed resume.                                         |
| `analytics`             | `AnalyticsOptions`                         | no       | `undefined`                                            | Vendor-neutral analytics sink.                                 |
| `onStateChange`         | `(state: PlayerState) => void`             | no       | `undefined`                                            | Called after each state replacement.                           |
| `onEvent`               | `(event: PlayerEvent) => void`             | no       | `undefined`                                            | Called for every event with `{ type, detail }`.                |

`onEvent` is also invoked for `timeupdate` and `progress`, so keep the callback
cheap.

### `ResumeOptions`

| Field         | Type      | Default                  | Notes                                       |
| ------------- | --------- | ------------------------ | ------------------------------------------- |
| `enabled`     | `boolean` | `false`                  | Resume only runs when exactly `true`.       |
| `key`         | `string`  | `universal-player:<url>` | Prefix or full key.                         |
| `storage`     | `Storage` | `localStorage`           | Any `Storage`-compatible adapter.           |
| `minDuration` | `number`  | `30`                     | Do not restore for media shorter than this. |

### `AnalyticsOptions`

| Field     | Type                              | Default     | Notes                                                |
| --------- | --------------------------------- | ----------- | ---------------------------------------------------- |
| `enabled` | `boolean`                         | `true`      | `false` disables all callbacks.                      |
| `onEvent` | `(event: AnalyticsEvent) => void` | `undefined` | Required for any tracking. Exceptions are swallowed. |

Tracked types: `loadedmetadata`, `play`, `pause`, `seeked`, `ended`, `error`.

### `ImageOptions`

| Field           | Type      | Default      | Notes                               |
| --------------- | --------- | ------------ | ----------------------------------- |
| `zoom`          | `boolean` | `true` in UI | Show zoom controls.                 |
| `rotate`        | `boolean` | `true` in UI | Show rotate controls.               |
| `download`      | `boolean` | `false`      | Show download.                      |
| `minZoom`       | `number`  | `0.25`       | Lower zoom bound.                   |
| `maxZoom`       | `number`  | `8`          | Upper zoom bound.                   |
| `slideDuration` | `number`  | `undefined`  | Seconds before advancing a gallery. |

### `CaptionsOptions`

| Field          | Type                      | Default     | Notes                                         |
| -------------- | ------------------------- | ----------- | --------------------------------------------- |
| `enabled`      | `boolean`                 | `false`     | Initial captions state.                       |
| `defaultTrack` | `string \| null`          | `undefined` | Track id to select.                           |
| `tracks`       | `readonly CaptionTrack[]` | `[]`        | External WebVTT tracks.                       |
| `style`        | `CaptionStyle`            | `undefined` | Font size, colour, background, opacity, edge. |
| `persist`      | `boolean`                 | `true`      | Remember the selected track per source.       |
| `storageKey`   | `string`                  | derived     | Storage key prefix.                           |

`CaptionTrack`:

| Field      | Type                                                                      | Required |
| ---------- | ------------------------------------------------------------------------- | -------- |
| `src`      | `string`                                                                  | yes      |
| `label`    | `string`                                                                  | yes      |
| `language` | `string`                                                                  | yes      |
| `id`       | `string`                                                                  | no       |
| `kind`     | `"subtitles" \| "captions" \| "descriptions" \| "chapters" \| "metadata"` | no       |
| `default`  | `boolean`                                                                 | no       |

`CaptionStyle`:

| Field        | Type                                                              | Notes                    |
| ------------ | ----------------------------------------------------------------- | ------------------------ |
| `fontSize`   | `string`                                                          | CSS size, e.g. `"120%"`. |
| `color`      | `string`                                                          | Cue text colour.         |
| `background` | `string`                                                          | Cue background.          |
| `opacity`    | `number`                                                          | `0`–`1`.                 |
| `edge`       | `"none" \| "outline" \| "drop-shadow" \| "raised" \| "depressed"` | Outline style.           |
| `fontFamily` | `string`                                                          | Font family.             |

---

## Sources

```ts
type PlayerSourceInput =
  | string
  | PlayerSource
  | Blob
  | File
  | MediaStream
  | readonly (string | PlayerSource | Blob | File | MediaStream)[];
```

An array is a playlist/gallery. An empty array throws `invalid-argument` from
`load()`.

### `VideoSource` / `AudioSource` / `ImageSource`

| Field         | Type                            | Required | Notes                           |
| ------------- | ------------------------------- | -------- | ------------------------------- |
| `kind`        | `"video" \| "audio" \| "image"` | yes      | Media kind.                     |
| `src`         | `string`                        | yes      | URL.                            |
| `type`        | `string`                        | no       | MIME type override.             |
| `alt`         | `string`                        | no       | Image alt text (`ImageSource`). |
| `title`       | `string`                        | no       | Metadata title.                 |
| `description` | `string`                        | no       | Metadata description.           |
| `captions`    | `readonly CaptionTrack[]`       | no       | Per-source captions.            |
| `chapters`    | `readonly Chapter[]`            | no       | Per-source chapters.            |
| `thumbnails`  | `ThumbnailTrack`                | no       | Per-source preview cues.        |
| `survey`      | `SurveySource`                  | no       | Per-source survey.              |

### `EmbedSource`

| Field      | Type                                | Required | Notes                     |
| ---------- | ----------------------------------- | -------- | ------------------------- |
| `kind`     | `"embed"`                           | yes      | Must be `"embed"`.        |
| `src`      | `string`                            | yes      | Embed URL.                |
| `provider` | `"youtube" \| "vimeo" \| "generic"` | yes      | Command bridge selection. |
| `title`    | `string`                            | no       | Accessible/embed title.   |
| `type`     | `string`                            | no       | MIME override.            |

YouTube and Vimeo mirror `currentTime`, `duration`, buffered progress and
play/pause/ended over `postMessage`. Generic embeds render the URL without a
command bridge.

### `ChunkedSource`

| Field                                                                  | Type                                     | Required | Notes                                            |
| ---------------------------------------------------------------------- | ---------------------------------------- | -------- | ------------------------------------------------ |
| `kind`                                                                 | `"video" \| "audio" \| "image"`          | yes      | Media kind.                                      |
| `chunks`                                                               | `ChunkIterable \| (() => ChunkIterable)` | yes      | Chunks in order. A function makes it replayable. |
| `type`                                                                 | `string`                                 | yes      | MIME type, e.g. `video/mp4`.                     |
| `mode`                                                                 | `"auto" \| "stream" \| "blob"`           | no       | Default `"auto"`.                                |
| `chunkDelay`                                                           | `number`                                 | no       | Millisecond delay for image chunks.              |
| `alt`                                                                  | `string`                                 | no       | Image alt text.                                  |
| `title`, `description`, `captions`, `chapters`, `thumbnails`, `survey` | metadata                                 | no       | Same as other sources.                           |

`ChunkData` is `Blob | ArrayBuffer | ArrayBufferView | string`.
`ChunkIterable` is `Iterable | AsyncIterable | ReadableStream`.

### `NormalizedSource`

Returned by `normalizeSource(input)`. Frozen.

| Field       | Type                                             | Notes                                            |
| ----------- | ------------------------------------------------ | ------------------------------------------------ |
| `source`    | `PlayerSource`                                   | Structured source.                               |
| `url`       | `string`                                         | Resolved URL (`""` for chunked/stream).          |
| `kind`      | `MediaKind`                                      | `video \| audio \| image \| embed`.              |
| `provider`  | `MediaProvider`                                  | Engine selection.                                |
| `mimeType`  | `string \| null`                                 | Inferred or declared.                            |
| `extension` | `string \| null`                                 | Lowercase extension.                             |
| `objectUrl` | `boolean`                                        | Whether the player owns and must revoke the URL. |
| `title`     | `string \| null`                                 | Metadata title.                                  |
| `stream`    | `MediaStream \| null`                            | For `MediaStream` inputs.                        |
| `chunks`    | `ChunkIterable \| (() => ChunkIterable) \| null` | For chunked inputs.                              |

### Source helpers

| Function          | Signature                                                   | Description                      |
| ----------------- | ----------------------------------------------------------- | -------------------------------- |
| `normalizeSource` | `(input: PlayerSourceInput) => NormalizedSource`            | Resolve URL and choose provider. |
| `revokeSource`    | `(source: NormalizedSource \| null) => void`                | Revoke an owned object URL.      |
| `sourceToken`     | `(input: PlayerSourceInput \| null \| undefined) => string` | Stable change-detection token.   |
| `detectMediaKind` | `(extension, mimeType, url) => MediaKind`                   | Kind inference.                  |
| `inferMimeType`   | `(extension: string \| null) => string \| null`             | Extension → MIME.                |
| `extensionOf`     | `(pathname: string) => string \| null`                      | Lowercase extension.             |
| `isYouTubeHost`   | `(hostname: string) => boolean`                             | YouTube host check.              |
| `isVimeoHost`     | `(hostname: string) => boolean`                             | Vimeo host check.                |

---

## PlayerState

| Field              | Type                                                                            | Meaning                                                   |
| ------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `status`           | `"idle" \| "loading" \| "ready" \| "playing" \| "paused" \| "ended" \| "error"` | Lifecycle.                                                |
| `source`           | `PlayerSource \| null`                                                          | Structured source.                                        |
| `kind`             | `MediaKind \| null`                                                             | Active kind.                                              |
| `capabilities`     | `PlayerCapabilities`                                                            | Engine features.                                          |
| `currentTime`      | `number`                                                                        | Seconds.                                                  |
| `duration`         | `number`                                                                        | Seconds; `Infinity`/non-finite for unbounded live.        |
| `buffered`         | `number`                                                                        | Buffered seconds ahead.                                   |
| `volume`           | `number`                                                                        | `0`–`1`.                                                  |
| `muted`            | `boolean`                                                                       | Muted state.                                              |
| `playbackRate`     | `number`                                                                        | `0.25`–`4`.                                               |
| `playing`          | `boolean`                                                                       | Currently playing.                                        |
| `ended`            | `boolean`                                                                       | Reached the end.                                          |
| `seeking`          | `boolean`                                                                       | Seek in progress.                                         |
| `live`             | `boolean`                                                                       | Live source.                                              |
| `fullscreen`       | `boolean`                                                                       | Fullscreen active.                                        |
| `pictureInPicture` | `boolean`                                                                       | PiP active.                                               |
| `quality`          | `string \| null`                                                                | Selected quality; `null` = auto.                          |
| `qualities`        | `readonly QualityLevel[]`                                                       | Available levels.                                         |
| `textTrack`        | `TextTrackInfo \| null`                                                         | Active text track.                                        |
| `textTracks`       | `readonly TextTrackInfo[]`                                                      | Available text tracks.                                    |
| `audioTrack`       | `AudioTrackInfo \| null`                                                        | Active audio track.                                       |
| `audioTracks`      | `readonly AudioTrackInfo[]`                                                     | Available audio tracks.                                   |
| `chapters`         | `readonly Chapter[]`                                                            | Chapter list.                                             |
| `activeChapter`    | `Chapter \| null`                                                               | Chapter at the current time.                              |
| `playlist`         | `PlaylistStatus \| null`                                                        | Playlist snapshot.                                        |
| `survey`           | `SurveyConfig \| null`                                                          | Survey config.                                            |
| `surveyOpen`       | `boolean`                                                                       | Survey overlay visible.                                   |
| `error`            | `Error \| null`                                                                 | Last error (a `PlayerError` when produced by the player). |

### `PlayerCapabilities`

| Field                                             | Type      |
| ------------------------------------------------- | --------- |
| `play`, `pause`, `seek`, `volume`, `playbackRate` | `boolean` |
| `fullscreen`, `pictureInPicture`                  | `boolean` |
| `textTracks`, `audioTracks`, `quality`, `live`    | `boolean` |

Exported constants: `NATIVE_CAPABILITIES`, `IMAGE_CAPABILITIES`,
`EMBED_CAPABILITIES`. `capabilitiesForKind(kind)` returns the best-effort set
before an engine exists.

### `QualityLevel`

| Field                                     | Type     | Required |
| ----------------------------------------- | -------- | -------- |
| `id`                                      | `string` | yes      |
| `label`                                   | `string` | yes      |
| `width`, `height`, `bitrate`, `frameRate` | `number` | no       |
| `codec`                                   | `string` | no       |

### `TextTrackInfo` and `AudioTrackInfo`

| Field      | Type                                                                            | Required        |
| ---------- | ------------------------------------------------------------------------------- | --------------- |
| `id`       | `string`                                                                        | yes             |
| `label`    | `string`                                                                        | yes             |
| `language` | `string`                                                                        | yes             |
| `kind`     | text: `"subtitles" \| "captions" \| "descriptions" \| "chapters" \| "metadata"` | yes (text only) |
| `default`  | `boolean`                                                                       | no              |

---

## Events

`PlayerEvents` maps each event name to its payload type.

| Event                    | Payload                               | Fired when                                                                       |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------------------------- |
| `statechange`            | `PlayerState`                         | A meaningful state transition occurs. Not fired for high-frequency time patches. |
| `loadstart`              | `{ source, kind }`                    | A new source begins loading.                                                     |
| `loadedmetadata`         | `{ duration, width, height, live }`   | Media metadata is known.                                                         |
| `durationchange`         | `{ duration, live }`                  | Duration changes.                                                                |
| `play`                   | `void`                                | Playback starts.                                                                 |
| `playing`                | `void`                                | Playback is actually progressing.                                                |
| `pause`                  | `void`                                | Playback pauses.                                                                 |
| `timeupdate`             | `{ currentTime, duration, buffered }` | Time progresses (high frequency).                                                |
| `progress`               | `{ buffered }`                        | Buffered ranges change.                                                          |
| `seeking`                | `{ currentTime }`                     | Seek starts.                                                                     |
| `seeked`                 | `{ currentTime }`                     | Seek completes.                                                                  |
| `waiting`                | `void`                                | Buffering/stalled.                                                               |
| `canplay`                | `void`                                | Enough data to play.                                                             |
| `ended`                  | `void`                                | Media reaches the end.                                                           |
| `volumechange`           | `{ volume, muted }`                   | Volume or mute changes.                                                          |
| `ratechange`             | `{ playbackRate }`                    | Playback rate changes.                                                           |
| `qualitychange`          | `{ quality }`                         | Quality selection changes.                                                       |
| `texttrackchange`        | `{ track }`                           | Text track changes.                                                              |
| `audiotrackchange`       | `{ track }`                           | Audio track changes.                                                             |
| `chapterchange`          | `{ chapter }`                         | Active chapter changes.                                                          |
| `playlistchange`         | `{ index, item, status }`             | Playlist position changes.                                                       |
| `surveyopen`             | `{ survey }`                          | Survey opens.                                                                    |
| `surveysubmit`           | `{ survey, answers, result }`         | Survey submitted.                                                                |
| `surveyskip`             | `{ survey, result }`                  | Survey skipped.                                                                  |
| `surveyclose`            | `{ survey, reason }`                  | Survey closes (`submitted`, `skipped`, `closed`).                                |
| `fullscreenchange`       | `{ fullscreen }`                      | Fullscreen changes.                                                              |
| `pictureinpicturechange` | `{ pictureInPicture }`                | PiP changes.                                                                     |
| `error`                  | `{ error }`                           | A failure is published.                                                          |
| `destroy`                | `void`                                | Player destroyed.                                                                |

`PlayerEvent` is the discriminated union `{ type, detail }` for every entry.
`onEvent` receives this union.

---

## UIOptions

| Option             | Type                                                                  | Default                    | Notes                                                  |
| ------------------ | --------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------ |
| `controls`         | `readonly PlayerControl[] \| Partial<Record<PlayerControl, boolean>>` | `undefined` (all)          | Array = allow-list; object = hide keys set to `false`. |
| `hide`             | `readonly PlayerControl[]`                                            | `undefined`                | Additional controls to hide.                           |
| `order`            | `readonly PlayerControl[]`                                            | `undefined`                | Preferred LTR order.                                   |
| `settings`         | `SettingsMenuOptions \| false`                                        | `undefined` (all sections) | `false` removes the menu.                              |
| `speed`            | `SpeedOptions \| false`                                               | `undefined` (enabled)      | `false` removes speed controls.                        |
| `share`            | `ShareOptions \| false`                                               | `undefined` (enabled)      | `false` removes share.                                 |
| `time`             | `TimeDisplayOptions`                                                  | elapsed/toggle/total       | Timestamp display.                                     |
| `download`         | `DownloadOptions \| boolean`                                          | `undefined` (hidden)       | `true` enables with defaults.                          |
| `gestures`         | `GestureOptions \| false`                                             | `undefined` (off)          | Opt-in touch gestures.                                 |
| `theme`            | `UIThemeOptions`                                                      | `undefined`                | Token overrides.                                       |
| `showTitle`        | `boolean`                                                             | `true`                     | Title overlay.                                         |
| `showChapterLabel` | `boolean`                                                             | `true`                     | Active chapter label.                                  |
| `showTime`         | `boolean`                                                             | `true`                     | Timestamp.                                             |
| `showBuffered`     | `boolean`                                                             | `true`                     | Buffered rail.                                         |
| `showPreview`      | `boolean`                                                             | `true`                     | Hover preview.                                         |
| `showBigPlay`      | `boolean`                                                             | `true`                     | Center play button.                                    |
| `autoHideControls` | `boolean`                                                             | `true`                     | Fade controls while playing.                           |
| `idleDelay`        | `number`                                                              | `3000`                     | Milliseconds; minimum `500`.                           |

### `SettingsMenuOptions`

`speed`, `quality`, `captions`, `captionStyle`, `audio`, `loop`, `autoplay`,
`autoplayNext`, `sleepTimer`, `stats`, `shortcuts` are all `boolean` and default
to `true`. `enabled` defaults to `true` when sections exist.

### `SpeedOptions`

| Field         | Type                | Default                                    |
| ------------- | ------------------- | ------------------------------------------ |
| `enabled`     | `boolean`           | `true` when the engine supports rate       |
| `rates`       | `readonly number[]` | `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]` |
| `defaultRate` | `number`            | `1`                                        |
| `keyboard`    | `boolean`           | `true`                                     |

### `ShareOptions`

| Field       | Type                           | Default           |
| ----------- | ------------------------------ | ----------------- |
| `enabled`   | `boolean`                      | `true`            |
| `url`       | `string`                       | current media URL |
| `title`     | `string`                       | current title     |
| `thumbnail` | `string`                       | `undefined`       |
| `embed`     | `boolean \| EmbedShareOptions` | enabled           |

`EmbedShareOptions`: `enabled` (default `true`), `mode` (`"iframe"` or
`"player"`, default `"iframe"` unless a poster is supplied), `url`, `poster`,
`width` (`640`), `height` (`360`), `title`.

### `DownloadOptions`

| Field      | Type                   | Default                   |
| ---------- | ---------------------- | ------------------------- |
| `enabled`  | `boolean`              | `false`                   |
| `filename` | `string`               | source title or `"media"` |
| `kinds`    | `readonly MediaKind[]` | all kinds                 |
| `saveAs`   | `boolean`              | `true`                    |

### `TimeDisplayOptions`

| Field       | Type                       | Default     |
| ----------- | -------------------------- | ----------- |
| `mode`      | `"elapsed" \| "remaining"` | `"elapsed"` |
| `toggle`    | `boolean`                  | `true`      |
| `showTotal` | `boolean`                  | `true`      |

### `GestureOptions`

| Field                                             | Type      | Default             |
| ------------------------------------------------- | --------- | ------------------- |
| `enabled`                                         | `boolean` | `false`             |
| `swipeSeek`                                       | `boolean` | `true` when enabled |
| `swipeFullscreen`                                 | `boolean` | `true` when enabled |
| `swipeUp`, `swipeDown`, `swipeLeft`, `swipeRight` | `boolean` | `true`              |
| `threshold`                                       | `number`  | `48`                |

### `UIThemeOptions`

| Field            | Type                                 | Notes                                                                                            |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `variables`      | `Record<\`--up-${string}\`, string>` | Any CSS token.                                                                                   |
| `colors`         | object                               | `accent`, `accentContrast`, `background`, `surface`, `foreground`, `muted`, `border`, `overlay`. |
| `radius`         | `string`                             | Root radius.                                                                                     |
| `controlRadius`  | `string`                             | Control radius.                                                                                  |
| `fontFamily`     | `string`                             | Font stack.                                                                                      |
| `menuBackground` | `string`                             | Floating menu background.                                                                        |
| `menuBlur`       | `string`                             | Backdrop blur.                                                                                   |

`PlayerControl` is the union:
`play | previous | next | rewind | forward | seek | time | volume | mute |
captions | settings | quality | speed | audioTrack | chapters | chapterLabel |
playlist | stats | share | cast | airplay | pip | fullscreen | zoom | rotate |
download | title | live`.

---

## Survey API

### `SurveyConfig`

| Field                                    | Type                                                  | Default      | Notes                                 |
| ---------------------------------------- | ----------------------------------------------------- | ------------ | ------------------------------------- |
| `id`                                     | `string`                                              | generated    | Stable id for persistence and `once`. |
| `kind`                                   | `"survey" \| "feedback" \| "review" \| "quiz"`        | `"survey"`   | Presentation/behavior.                |
| `title`                                  | `string`                                              | —            | Heading.                              |
| `description`                            | `string`                                              | —            | Supporting text.                      |
| `submitLabel`, `skipLabel`, `closeLabel` | `string`                                              | localized    | Button labels.                        |
| `thankYouTitle`, `thankYouText`          | `string`                                              | localized    | Completion screen.                    |
| `questions`                              | `readonly SurveyQuestion[]`                           | **required** | At least the UI expects one.          |
| `trigger`                                | `"ended" \| "manual" \| number \| { at: number }`     | `"ended"`    | When it opens.                        |
| `once`                                   | `boolean`                                             | `true`       | Show once per source + survey id.     |
| `allowSkip`                              | `boolean`                                             | `true`       | Show skip.                            |
| `required`                               | `boolean`                                             | `false`      | Prevent closing without submitting.   |
| `blocking`                               | `boolean`                                             | `false`      | Alias for `required`.                 |
| `submitMode`                             | `"manual" \| "on-select" \| "on-complete"`            | `"manual"`   | Submission behavior.                  |
| `autoSubmit`                             | `boolean`                                             | `false`      | Shorthand for `"on-select"`.          |
| `autoSubmitDelay`                        | `number`                                              | `0`          | Milliseconds before auto-submit.      |
| `instantFeedback`                        | `boolean`                                             | `false`      | Quiz correct/incorrect UI.            |
| `allowRetake`                            | `boolean`                                             | `false`      | Show Retake/Done.                     |
| `allowResubmit`                          | `boolean`                                             | `false`      | Alias for `allowRetake`.              |
| `maxAttempts`                            | `number`                                              | `Infinity`   | Retake limit.                         |
| `storageKey`                             | `string`                                              | derived      | Persistence key.                      |
| `onSubmit`                               | `(result: SurveySubmission) => void \| Promise<void>` | —            | Submission callback.                  |
| `onSkip`                                 | `(result: SurveySubmission) => void \| Promise<void>` | —            | Skip callback.                        |
| `onRetake`                               | `(survey, attempt) => void \| Promise<void>`          | —            | Retake callback.                      |

### `SurveyQuestion`

| Field                            | Type                                                                               | Required | Notes                                  |
| -------------------------------- | ---------------------------------------------------------------------------------- | -------- | -------------------------------------- |
| `id`                             | `string`                                                                           | yes      | Key in `answers`.                      |
| `type`                           | `"radio" \| "checkbox" \| "select" \| "text" \| "textarea" \| "rating" \| "scale"` | yes      | Question type.                         |
| `label`                          | `string`                                                                           | yes      | Visible question.                      |
| `description`                    | `string`                                                                           | no       | Helper text.                           |
| `placeholder`                    | `string`                                                                           | no       | Text inputs.                           |
| `required`                       | `boolean`                                                                          | no       | Validation.                            |
| `options`                        | `readonly SurveyOption[]`                                                          | no       | Choice questions.                      |
| `min`, `max`, `step`             | `number`                                                                           | no       | Numeric/rating/scale bounds.           |
| `minLength`, `maxLength`         | `number`                                                                           | no       | Text bounds.                           |
| `minSelections`, `maxSelections` | `number`                                                                           | no       | Checkbox bounds.                       |
| `allowOther`                     | `boolean`                                                                          | no       | Free-text "Other".                     |
| `otherLabel`                     | `string`                                                                           | no       | Label for "Other".                     |
| `correct`                        | `string \| readonly string[]`                                                      | no       | Quiz answers.                          |
| `explanation`                    | `string`                                                                           | no       | Quiz feedback.                         |
| `autoSubmit`                     | `boolean`                                                                          | no       | Submit when this question is answered. |

`SurveyOption`: `{ id: string; label: string; value?: string }`.
`SurveyAnswerValue`: `string | readonly string[] | number | null`.
`SurveyAnswers`: `Readonly<Record<string, SurveyAnswerValue>>`.

### `SurveySubmission`

| Field         | Type             | Notes                        |
| ------------- | ---------------- | ---------------------------- |
| `survey`      | `SurveyConfig`   | The submitted config.        |
| `answers`     | `SurveyAnswers`  | Normalized answers.          |
| `submittedAt` | `number`         | Unix epoch milliseconds.     |
| `source`      | `string \| null` | Media URL at submission.     |
| `position`    | `number`         | Playback time at submission. |
| `duration`    | `number`         | Media duration.              |
| `skipped`     | `boolean`        | Whether skipped.             |
| `attempt`     | `number`         | Zero-based retake attempt.   |

### Survey presets

| Function                         | Kind     | What it builds                             |
| -------------------------------- | -------- | ------------------------------------------ |
| `endOfVideoFeedback(overrides?)` | feedback | 5-star rating + topics + optional comment. |
| `netPromoterScore(overrides?)`   | survey   | 0–10 NPS + reason.                         |
| `contentFeedback(overrides?)`    | feedback | "Was this helpful?" with on-select submit. |
| `blockingReview(overrides?)`     | review   | Required review, retakes, 2 attempts.      |
| `quizFeedback(overrides?)`       | quiz     | Instant correct/incorrect feedback.        |

`SURVEY_PRESETS` maps those five functions by name.

### Survey helper exports

`normalizeSurvey`, `surveyId`, `surveyTriggerTime`, `createSurveyAnswers`,
`normalizeSurveyAnswers`, `emptySurveyAnswer`, `isSurveyAnswerEmpty`,
`isChoiceQuestion`, `isRequiredQuestion`, `validateSurveyAnswers`,
`isSurveyComplete`, `evaluateSurveyAnswer`, `createSurveySubmission`,
`createSurveyStore`, `SurveyValidationIssue`, `SurveyStore`, `SurveyStoreOptions`.

`validateSurveyAnswers(survey, answers)` returns an array of
`SurveyValidationIssue`; an empty array means valid. The same rules are used by
`submitSurvey()` and the UI.

---

## Playlist, chapter and thumbnail types

### `PlaylistOptions`

| Field               | Type                      | Default      | Notes                                                   |
| ------------------- | ------------------------- | ------------ | ------------------------------------------------------- |
| `items`             | `readonly PlaylistItem[]` | **required** | Empty clears the playlist when passed to `setPlaylist`. |
| `startIndex`        | `number`                  | `0`          | Invalid values fall back to `0`.                        |
| `autoAdvance`       | `boolean`                 | `false`      | Advance on end.                                         |
| `loop`              | `boolean`                 | `false`      | Wrap next/previous.                                     |
| `autoAdvanceDelay`  | `number`                  | `0`          | Seconds before advancing.                               |
| `requireCompletion` | `boolean`                 | `false`      | Gate Next until the item ends.                          |
| `gateAdvance`       | `boolean`                 | `false`      | Alias for `requireCompletion`.                          |
| `allowNext`         | `boolean`                 | `true`       | Show/allow Next.                                        |
| `allowPrevious`     | `boolean`                 | `true`       | Show/allow Previous.                                    |

`PlaylistItem`: `{ id?: string; source: PlayerSourceInput; title?: string;
poster?: string; duration?: number }`.

### `PlaylistStatus`

| Field                    | Type      | Meaning                                 |
| ------------------------ | --------- | --------------------------------------- |
| `index`                  | `number`  | Current index (`-1` when empty).        |
| `length`                 | `number`  | Item count.                             |
| `hasNext`, `hasPrevious` | `boolean` | Neighbours exist.                       |
| `autoAdvance`            | `boolean` | Auto-advance enabled.                   |
| `completed`              | `boolean` | Current item ended or reached duration. |
| `canNext`, `canPrevious` | `boolean` | Action currently allowed.               |
| `nextLocked`             | `boolean` | Next exists but is gated.               |
| `previousLocked`         | `boolean` | Previous exists but is disabled.        |

### `Chapter`

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| `id`        | `string` | yes      |
| `title`     | `string` | yes      |
| `startTime` | `number` | yes      |
| `endTime`   | `number` | no       |
| `thumbnail` | `string` | no       |

### `ThumbnailCue` and `ThumbnailTrack`

`ThumbnailCue`: `{ startTime: number; endTime: number; url: string; width?: number;
height?: number }`.

`ThumbnailTrack`: `{ cues: readonly ThumbnailCue[]; spriteUrl?: string }`.

---

## Errors

`createPlayerError(message, { code, cause?, details? })` returns a plain `Error`
with:

| Property  | Type                                | Notes                                 |
| --------- | ----------------------------------- | ------------------------------------- |
| `name`    | `"UniversalPlayerError"`            | Stable name.                          |
| `code`    | `PlayerErrorCode`                   | Enumerable, read-only.                |
| `details` | `Readonly<Record<string, unknown>>` | Structured context.                   |
| `cause`   | `unknown`                           | Standard `Error.cause` when supplied. |

### Codes

| Code                      | When                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `invalid-argument`        | Bad container, empty source, empty list, invalid survey answers, bad selector.     |
| `invalid-state`           | Play with no media, retry with no media, gated playlist advance, no active survey. |
| `unsupported-source`      | PiP requested for a non-video engine.                                              |
| `unsupported-environment` | Fullscreen/PiP/object URLs unavailable.                                            |
| `network-error`           | Network failure surfaced by an engine.                                             |
| `media-error`             | Decode/playback failure.                                                           |
| `aborted`                 | An operation was superseded/cancelled.                                             |
| `destroyed`               | Method called after `destroy()`.                                                   |
| `not-implemented`         | Ad stub used without an SDK adapter.                                               |

Helpers:

```ts
isPlayerError(value); // type guard
toPlayerError(value, fallback); // normalize anything into a PlayerError
```

---

## Custom element API

`<universal-player>` extends `HTMLElement` and registers itself through
`defineUniversalPlayerElement()`.

### Properties

| Property  | Type                      | Notes                           |
| --------- | ------------------------- | ------------------------------- |
| `player`  | `UniversalPlayer \| null` | Live instance after connection. |
| `strings` | `Partial<PlayerStrings>`  | Per-instance overrides.         |

### Methods

| Method         | Signature                                      |
| -------------- | ---------------------------------------------- |
| `load`         | `(source: PlayerSourceInput) => Promise<void>` |
| `play`         | `() => Promise<void>`                          |
| `pause`        | `() => void`                                   |
| `seek`         | `(time: number) => void`                       |
| `getEmbedCode` | `() => string \| null`                         |
| `destroy`      | `() => void`                                   |

### Attributes

| Attribute                 | Type                               | Default                          | Notes                       |
| ------------------------- | ---------------------------------- | -------------------------------- | --------------------------- |
| `src`                     | URL                                | —                                | Initial source.             |
| `type`                    | MIME                               | inferred                         | MIME override.              |
| `poster`, `thumbnail`     | URL                                | —                                | Poster image (aliases).     |
| `autoplay`                | boolean attribute                  | absent                           | Attempt autoplay.           |
| `muted`                   | boolean attribute                  | absent                           | Start muted.                |
| `loop`                    | boolean attribute                  | absent                           | Loop.                       |
| `controls`                | `"custom" \| "native"`             | `"custom"`                       | Controls mode.              |
| `theme`                   | `"light" \| "dark" \| "system"`    | `"system"`                       | Theme.                      |
| `accent-color`            | CSS colour                         | `#ffffff` dark / `#0f172a` light | Brand accent.               |
| `ui`                      | JSON `UIOptions`                   | —                                | UI configuration.           |
| `locale`                  | BCP 47                             | `"en"`                           | Locale.                     |
| `preload`                 | `"none" \| "metadata" \| "auto"`   | browser default                  | Preload hint.               |
| `crossorigin`             | `"anonymous" \| "use-credentials"` | —                                | CORS setting.               |
| `playsinline`             | boolean                            | `true` unless `"false"`          | Inline playback.            |
| `start-time`              | number                             | `0`                              | Initial seek.               |
| `volume`                  | `0`–`1`                            | `1`                              | Initial volume.             |
| `rate`                    | `0.25`–`4`                         | `1`                              | Initial rate.               |
| `label`                   | string                             | `"Media player"`                 | ARIA label.                 |
| `chapters`                | JSON `Chapter[]`                   | —                                | Chapters.                   |
| `thumbnails`              | JSON `ThumbnailTrack`              | —                                | Preview cues.               |
| `captions`                | JSON `CaptionsOptions`             | —                                | Captions.                   |
| `survey`                  | JSON `SurveyConfig`                | —                                | Survey.                     |
| `playlist`                | JSON `PlaylistOptions`             | —                                | Playlist.                   |
| `image`                   | JSON `ImageOptions`                | —                                | Image viewer.               |
| `keyboard`                | boolean                            | `true` unless `"false"`          | Shortcuts.                  |
| `click-to-play`           | boolean                            | `true` unless `"false"`          | Click toggles playback.     |
| `double-click-fullscreen` | boolean                            | `true` unless `"false"`          | Double-click fullscreen.    |
| `auto-hide-controls`      | boolean                            | `true` unless `"false"`          | Auto-hide.                  |
| `seek-step`               | number                             | `5`                              | Arrow seek seconds.         |
| `volume-step`             | number                             | `0.1`                            | Arrow volume step.          |
| `shadow`                  | `"light"`                          | shadow by default                | Read once at mount.         |
| `inject-styles`           | boolean attribute                  | absent                           | Inject styles in light DOM. |

Boolean attributes follow HTML semantics: presence = true, except for the
documented `"false"` handling on `playsinline`, `keyboard`, `click-to-play`,
`double-click-fullscreen` and `auto-hide-controls`.

---

## Framework API

See [Frameworks](./frameworks.md) for full examples.

| Export                   | Entry                  | Signature                                                                    |
| ------------------------ | ---------------------- | ---------------------------------------------------------------------------- |
| `mountUniversalPlayer`   | `/vanilla`             | `(target: string \| HTMLElement, options?: MountOptions) => UniversalPlayer` |
| `UniversalPlayer`        | `/react`               | `forwardRef<UniversalPlayerHandle, UniversalPlayerProps>`                    |
| `useUniversalPlayer`     | `/react`               | `(options: UseUniversalPlayerOptions) => UseUniversalPlayerResult`           |
| `UniversalPlayer`        | `/vue`                 | Vue component                                                                |
| `useUniversalPlayer`     | `/vue`                 | `(options: UseUniversalPlayerOptions) => UseUniversalPlayerResult`           |
| `AngularUniversalPlayer` | `/angular`             | class controller                                                             |
| default                  | `/svelte4`, `/svelte5` | Svelte component                                                             |

---

## Feature helper exports

The package root re-exports `src/features/index.ts`:

| Module         | Exports                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ads`          | `AdBreak`, `AdSchedule`, `AdController`, `findAdBreakAt`, `createAdController`                                                                              |
| `airplay`      | AirPlay availability/prompt helpers                                                                                                                         |
| `analytics`    | `AnalyticsSink`, `createAnalyticsSink`, `toAnalyticsEvent`                                                                                                  |
| `audio-tracks` | Audio track helpers                                                                                                                                         |
| `captions`     | Caption helpers and style normalization                                                                                                                     |
| `cast`         | `CastProvider`, `CastOptions`, `canCast`, `connectCast`, `disconnectCast`, `findAvailableCastProvider`                                                      |
| `chapters`     | `findChapterAt`, chapter helpers                                                                                                                            |
| `fullscreen`   | Fullscreen availability helpers                                                                                                                             |
| `image-viewer` | `ImageTransform`, `IMAGE_TRANSFORM_DEFAULT`, `clampImageZoom`, `zoomImage`, `rotateImage`, `resetImageTransform`, `imageTransformCss`, `isImageTransformed` |
| `live`         | `isLiveDuration`, `seekableRange`, `liveEdge`, `isAtLiveEdge`                                                                                               |
| `mini-player`  | PiP-based mini-player helpers                                                                                                                               |
| `pip`          | PiP availability helpers                                                                                                                                    |
| `playlist`     | Playlist helpers                                                                                                                                            |
| `quality`      | Quality sorting/formatting helpers                                                                                                                          |
| `resume`       | `DEFAULT_RESUME_KEY_PREFIX`, `ResumeStore`, `createResumeStore`                                                                                             |
| `shortcuts`    | `PlayerShortcutAction`, `ShortcutOptions`, `shortcutForEvent`, `PLAYER_SHORTCUTS`                                                                           |
| `speed`        | `PLAYBACK_RATES`, `clampPlaybackRate`, `formatPlaybackRate`                                                                                                 |
| `survey`       | Survey helpers (see above)                                                                                                                                  |
| `thumbnails`   | Thumbnail lookup helpers                                                                                                                                    |
| `vr`           | `VrProjection`, `VrOptions`, `isVrSupported`, `setVrMode`, `clearVrMode`                                                                                    |

Ads, Chromecast and VR are **contract/stub** surfaces in `0.0.1`. See
[Features](./features.md).

---

## Not exported

- Internal engines and the `PlayerEngine` contract.
- The plugin/engine registry (there is none).
- `src/*` internals.
- Test helpers.
- Ads SDK integration (contract only).
- Chromecast SDK integration (contract only).
- DRM/EME APIs (out of scope).

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)