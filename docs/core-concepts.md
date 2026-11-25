# Core concepts

> [Docs home](./README.md) › Core concepts

[← Docs](./README.md) · [Architecture](./architecture.md) · [Project structure](./project-structure.md)

Five ideas explain almost everything about this library: **sources**,
**engines**, **state**, **events** and **capabilities**. The **lifecycle** ties
them together.

---

## 1. Source

A source is anything the player can load. You never choose an engine; the source
is normalized and the engine is chosen for you.

```ts
type PlayerSourceInput =
  | string
  | PlayerSource
  | Blob
  | File
  | MediaStream
  | readonly (string | PlayerSource | Blob | File | MediaStream)[];
```

A source has a **kind** and a **provider**:

| Concept  | Values                                                                           |
| -------- | -------------------------------------------------------------------------------- |
| Kind     | `video`, `audio`, `image`, `embed`                                               |
| Provider | `native`, `chunked`, `hls`, `dash`, `image`, `youtube`, `vimeo`, `generic-embed` |

Kind answers “what is it?”. Provider answers “how do we play it?”. The UI uses
kind; the core uses provider.

### Structured sources

A structured source lets you attach metadata:

```ts
{
  kind: "video",
  src: "/lesson.mp4",
  type: "video/mp4",
  captions: [{ src: "/en.vtt", label: "English", language: "en" }],
  chapters: [{ id: "intro", title: "Intro", startTime: 0 }],
  thumbnails: { cues: [...] },
  survey: endOfVideoFeedback(),
}
```

Per-source metadata overrides player-level metadata when present.

### Chunked sources

```ts
{
  kind: "video",
  type: "video/mp4",
  chunks: async function* () { /* yield Blob/ArrayBuffer/string */ },
  mode: "auto",
}
```

`auto` prefers `MediaSource`; `blob` buffers first. A function returning fresh
chunks makes the source replayable.

---

## 2. Engine

An engine is the internal adapter that actually plays a provider. It implements
`PlayerEngine` and is created by `createEngine()`.

| Provider            | Engine                 |
| ------------------- | ---------------------- |
| `native`            | `<video>` / `<audio>`  |
| `image`             | `<img>`                |
| `chunked`           | `MediaSource` or Blob  |
| `hls`               | `hls.js`               |
| `dash`              | `dashjs`               |
| `youtube` / `vimeo` | iframe + `postMessage` |
| `generic-embed`     | iframe                 |

Engines have no public registry. New engines are added in-repo. This is a
deliberate product decision: a small, predictable set is easier to support than
an unmaintained third-party plugin surface.

Engines never own application state. They emit media events; the player turns
those into state.

---

## 3. State

`player.state` is an immutable snapshot. It is replaced, never mutated.

```ts
type PlayerStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "ended" | "error";
```

The snapshot includes timing, volume, rate, tracks, quality, live/fullscreen/PiP
flags, chapters, playlist position, survey state and the last error.

Two update speeds:

| Event                    | State behaviour                           |
| ------------------------ | ----------------------------------------- |
| `statechange`            | Full snapshot replacement; UI re-renders. |
| `timeupdate`, `progress` | Silent patch; no `statechange`.           |

This is why subscribing to `statechange` is cheap and why `timeupdate` is the
right hook for a progress bar.

---

## 4. Events

One bus, three views:

```ts
player.addEventListener("play", handler); // DOM CustomEvent
player.on("play", handler); // typed callback
player.observe("play").subscribe(handler); // observable
```

Rules:

- `on()` returns an unsubscribe function.
- `once()` auto-unsubscribes after the first call.
- `observe()` returns an object with `subscribe()` and `@@observable` interop.
- A throwing listener is isolated.
- `onEvent` in options receives `{ type, detail }` for every event.
- `analytics.onEvent` receives vendor-neutral payloads for selected events.

Event payloads are documented in
[API reference → Events](./api-reference.md#events).

---

## 5. Capabilities

Every engine advertises what it can do:

```ts
interface PlayerCapabilities {
  play: boolean;
  pause: boolean;
  seek: boolean;
  volume: boolean;
  playbackRate: boolean;
  fullscreen: boolean;
  pictureInPicture: boolean;
  textTracks: boolean;
  audioTracks: boolean;
  quality: boolean;
  live: boolean;
}
```

- `player.capabilities` is the active engine's set (or `null` before load).
- `player.state.capabilities` is always in sync with state.
- `capabilitiesForKind(kind)` gives a best-effort set before an engine exists.
- Constants `NATIVE_CAPABILITIES`, `IMAGE_CAPABILITIES` and
  `EMBED_CAPABILITIES` are exported for your own UI logic.

The built-in UI combines capabilities with `state.kind`; that is why PiP
disappears for audio and the timeline disappears for images without special
cases in each wrapper.

---

## 6. Lifecycle

```
idle
  └─ load(source)
       ├─ normalize
       ├─ destroy previous engine
       ├─ loadstart
       ├─ create engine
       ├─ loadedmetadata
       └─ ready
            ├─ play → playing
            ├─ pause → paused
            ├─ seek → seeking → seeked
            └─ ended
                 └─ play → seeks to 0 and replays

error at any point → error
destroy() at any point → terminal
```

### Load races

A newer `load()` supersedes an older one. The older engine is destroyed when it
finishes loading if its sequence number is stale. Errors from stale loads are
dropped.

### Destroy

`destroy()` is idempotent and terminal:

- saves resume state
- increments the load sequence
- clears playlist and image timers
- aborts document listeners
- destroys the engine
- revokes the source object URL
- resets state to idle
- emits `destroy`

Calling a method after `destroy()` throws `PlayerError` with code `destroyed`
(except `destroy()` itself).

---

## 7. Controls and UI

The UI is a consumer of the core, not part of it:

- `state.kind` decides which control set is relevant.
- `state.capabilities` decides which are possible.
- `ui.controls` / `ui.hide` decides which are allowed.
- `ui.order` decides where they sit.

The core exposes equivalent methods so a custom UI never needs the element.

---

## 8. Three levels of API

| Level              | Entry                                    | You own                                          |
| ------------------ | ---------------------------------------- | ------------------------------------------------ |
| Batteries included | root / `/ui`                             | Nothing; use `<universal-player>`.               |
| Framework adapter  | `/react`, `/vue`, `/angular`, `/svelte*` | The component tree; adapter owns core lifecycle. |
| Headless           | `/core`                                  | Everything visual; core owns playback and state. |

Choose the lowest level that gives you the UI you need. Moving down does not
change playback behaviour; it only changes who renders controls.

---

**Next:** [Architecture](./architecture.md) · [Lifecycle](#6-lifecycle) ·
[Glossary](#9-glossary)

---

## 9. Glossary

| Term                 | Definition                                                                                                          | Read more                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Source**           | Anything loadable: URL, structured object, `Blob`, `File`, `MediaStream`, chunked stream, or array.                 | [Sources](./api-reference.md#sources)                                |
| **Kind**             | `video`, `audio`, `image` or `embed`. What the media is.                                                            | [Source](#1-source)                                                  |
| **Provider**         | The internal engine family: `native`, `chunked`, `hls`, `dash`, `image`, `youtube`, `vimeo`, `generic-embed`.       | [Engine](#2-engine)                                                  |
| **NormalizedSource** | Frozen result of `normalizeSource()` with URL, kind, provider, MIME, extension, object-URL flag, stream and chunks. | [API reference](./api-reference.md#normalizedsource)                 |
| **Chunked source**   | Media delivered incrementally through an iterable/stream.                                                           | [API reference](./api-reference.md#chunkedsource)                    |
| **Playlist**         | Ordered list of sources with auto-advance, gating and loop.                                                         | [Playlists guide](./playlists.md)                                    |
| **Gallery**          | A source array of images with optional slide duration.                                                              | [Images guide](./images.md)                                          |
| **Engine**           | Internal adapter that plays one provider.                                                                           | [Engine](#2-engine)                                                  |
| **Media element**    | The underlying `<video>`, `<audio>`, `<img>` or `<iframe>`.                                                         | [Engine](#2-engine)                                                  |
| **Status**           | Lifecycle value: `idle`, `loading`, `ready`, `playing`, `paused`, `ended`, `error`.                                 | [Lifecycle](#6-lifecycle)                                            |
| **State**            | Immutable `PlayerState` snapshot.                                                                                   | [State](#3-state)                                                    |
| **Capabilities**     | Booleans describing what the active engine can do.                                                                  | [Capabilities](#5-capabilities)                                      |
| **Quality**          | A selectable level (`id`, `label`, dimensions, bitrate).                                                            | [API reference](./api-reference.md#qualitylevel)                     |
| **Text track**       | Captions/subtitles track exposed by media or config.                                                                | [Captions guide](./captions.md)                                      |
| **Audio track**      | Alternative audio (language, commentary).                                                                           | [API reference](./api-reference.md#texttrackinfo-and-audiotrackinfo) |
| **Player**           | `UniversalPlayer` instance; owner of one engine and one state.                                                      | [API reference](./api-reference.md#universalplayer)                  |
| **Entry point**      | A public import path (`/core`, `/ui`, `/react`, …).                                                                 | [Installation](./installation.md#4-choose-an-entry-point)            |
| **Event**            | Typed payload emitted by the player (`play`, `timeupdate`, `surveyopen`, …).                                        | [Events](#4-events)                                                  |
| **Observable**       | RxJS-compatible stream returned by `observe()`.                                                                     | [Events](#4-events)                                                  |
| **PlayerError**      | Plain `Error` with a stable `code` and `details`.                                                                   | [Errors vs logs](./errors-vs-logs.md)                                |
| **Options**          | `PlayerOptions`, the construction object.                                                                           | [Configuration](./configuration.md)                                  |
| **UIOptions**        | Nested control/menu/gesture/token configuration.                                                                    | [Advanced configuration](./advanced-configuration.md)                |
| **Chapter**          | Timestamped marker with title and optional thumbnail.                                                               | [Playlists guide](./playlists.md#5-chapters)                         |
| **Thumbnail cue**    | Time range mapped to a preview image.                                                                               | [API reference](./api-reference.md#thumbnailcue-and-thumbnailtrack)  |
| **Survey**           | In-player form with validation, triggers and submission.                                                            | [Surveys guide](./surveys.md)                                        |
| **Preset**           | Ready-made `SurveyConfig` (CSAT, NPS, quiz, review).                                                                | [Surveys guide](./surveys.md#7-presets)                              |
| **Resume**           | Storage-backed playback position.                                                                                   | [Resume guide](./resume.md)                                          |
| **Live edge**        | End of the seekable window for a live stream.                                                                       | [Live guide](./live.md)                                              |
| **Stats for nerds**  | Diagnostic panel with resolution, buffer, tracks, network.                                                          | [Features](./features.md)                                            |
| **Entry**            | `src/entries/*.ts`, the only public module boundaries.                                                              | [Project structure](./project-structure.md)                          |
| **Adapter**          | Implementation of `PlayerEngine` for a provider.                                                                    | [Extending](./extending.md)                                          |
| **Wrapper**          | Framework-specific component/composable/controller.                                                                 | [Frameworks](./frameworks.md)                                        |
| **Peer**             | Optional external package required only by one feature.                                                             | [Peer dependencies](./peer-dependencies.md)                          |
| **SemVer**           | Major/minor/patch contract for the public API.                                                                      | [Versioning](./versioning-and-breaking-changes.md)                   |
| **Changeset**        | Release note + version bump file.                                                                                   | [Changelog](./changelog.md)                                          |

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)