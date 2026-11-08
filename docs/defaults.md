# Defaults — what happens when you omit an option

> [Docs home](./README.md) › Defaults

**Only `container` is required.** Everything else has a runtime default. This page separates **core** defaults from **built-in UI** defaults, because many options are accepted by the type but consumed only by `<universal-player>`.

| Enforcement | Meaning |
| --- | --- |
| **core** | Read by `UniversalPlayer` / an engine |
| **UI only** | Accepted by `PlayerOptions`, consumed by `<universal-player>`; inert in headless surfaces |
| **both** | Core stores it; the UI also reads it |

## Core defaults

| Option | If omitted | Enforcement | What you observe |
| --- | --- | --- | --- |
| `container` | **required** | core | Constructor throws `invalid-argument` if not an `HTMLElement`. |
| `source` | `undefined` | core | Idle until `load()`; a constructor source starts loading immediately. |
| `label` | `"Media"` | core | `aria-label` on the media element. The custom element uses `"Media player"`. |
| `controls` | `"custom"` | core + UI | Core sets `media.controls = false`. Only the element adds chrome. `"native"` shows browser controls. |
| `theme` | `undefined`; UI resolves `"system"` | UI only | No effect on a headless surface. |
| `ui` | `undefined` | UI only | Element uses its default layout/menus. |
| `locale` | `"en"` | UI only | Element uses English strings. |
| `strings` | `{}` | UI only | Element uses locale strings. |
| `autoplay` | `false` | core | No automatic play; autoplay rejection is swallowed. |
| `muted` | `false` | core | Unmuted. |
| `loop` | `false` | core | No loop. |
| `preload` | `"metadata"` | core | Media element `preload="metadata"`. |
| `poster` | `undefined` | core | No poster attribute; black surface. |
| `crossOrigin` | not set | core | Browser default CORS mode. |
| `playsInline` | `true` (video) | core | Video plays inline on iOS. |
| `volume` | `1` | core | Full volume, clamped 0–1. |
| `playbackRate` | `1` | core | Normal speed, clamped 0.25–4. |
| `startTime` | `undefined` | core | No initial seek. |
| `live` | `false` | core + UI | VOD assumed; HLS low-latency mode off. |
| `qualities` | `[]` | core | Engine ladder only (HLS/DASH); no configured levels. |
| `textTracks` | `[]` | core | Discovered from the media element. |
| `audioTracks` | `[]` | core | Discovered from the media element. |
| `chapters` | `[]` | core + UI | No chapter rail/menu. |
| `thumbnails` | `undefined` | UI only | No seek previews. |
| `captions` | `undefined` | core + UI | Captions treated as enabled; `persist` effectively `true`; no default track. |
| `survey` | `undefined` | core + UI | No survey. |
| `playlist` | `undefined` | core | No queue. |
| `image` | `undefined` | UI only | Zoom/rotate enabled; no slideshow. |
| `resume` | `undefined` | core | `enabled: false`; no storage reads/writes. |
| `analytics` | `undefined` | core | If `onEvent` is absent, nothing is emitted (even though `enabled` is treated as true). |
| `onStateChange` | `undefined` | core | No callback. |
| `onEvent` | `undefined` | core | No callback. |

## UI-only defaults

These are inert in `/core`, `/vanilla`, `/react`, `/vue`, `/angular`, `/svelte4` and `/svelte5`.

| Option | Default | Notes |
| --- | --- | --- |
| `keyboard` | `true` | Shortcuts require focus inside the element. |
| `clickToPlay` | `true` | Ignored for images. |
| `doubleClickFullscreen` | `true` | — |
| `autoHideControls` | `true` | — |
| `seekStep` | `5` | Arrow seek; J/L use `2 × seekStep` (10 s). |
| `volumeStep` | `0.1` | Arrow volume. |
| `ui.idleDelay` | `3000` ms | Minimum `500`. |
| `ui.gestures.enabled` | `false` | Threshold `48` px. |
| `ui.showTitle`, `showChapterLabel`, `showTime`, `showBuffered`, `showPreview`, `showBigPlay` | `true` | — |
| `ui.time.mode` | `"elapsed"` | `toggle: true`, `showTotal: true`. |
| `ui.settings` | enabled when sections exist | `loop`, `autoplay`, `autoplayNext`, `sleepTimer`, `stats`, `shortcuts` default true. |
| `ui.speed` | enabled when rate is supported | `rates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`; `keyboard: true`. |
| `ui.share` | enabled | `embed` enabled; snippet defaults to `player` when a poster exists, otherwise `iframe`. |
| `ui.download` | hidden | `true` or an object with `enabled !== false` shows it; `saveAs: true`. |
| `image.zoom` / `rotate` | `true` | UI hides when `false`. |
| `image.minZoom` / `maxZoom` | `0.25` / `8` | — |
| `image.slideDuration` | `undefined` | No automatic image advance. |

## Element attribute defaults

| Attribute | If omitted |
| --- | --- |
| `controls` | `custom` |
| `theme` | `system` |
| `locale` | `en` |
| `label` | `Media player` |
| `playsinline` | `true` unless the attribute is exactly `"false"` |
| `keyboard`, `click-to-play`, `double-click-fullscreen`, `auto-hide-controls` | `true` unless `"false"` |
| `shadow` | Shadow DOM |
| `inject-styles` | off |
| `preload` | `metadata` |
| `volume` / `rate` | `1` / `1` |
| `seek-step` / `volume-step` | `5` / `0.1` |

## Initial state

`createInitialState()` returns:

```text
status: "idle"            source: null             kind: null
capabilities: native      currentTime: 0           duration: 0
buffered: 0               volume: 1                muted: false
playbackRate: 1           playing: false           ended: false
seeking: false            live: false              fullscreen: false
pictureInPicture: false   quality: null            qualities: []
textTrack: null           textTracks: []           audioTrack: null
audioTracks: []           chapters: []             activeChapter: null
playlist: null            survey: null             surveyOpen: false
error: null
```

`volume` is clamped to 0–1 and `playbackRate` to 0.25–4 at construction.

## Survey normalisation

| Field | Default |
| --- | --- |
| `kind` | `"survey"` |
| `id` | `"<kind>:<title>"` |
| `title` | Per kind (`Survey`, `Feedback`, `Review`, `Quiz`) |
| `submitLabel` / `skipLabel` / `closeLabel` | `Submit` / `Skip` / `Close` |
| `thankYouTitle` / `thankYouText` | `Thank you!` / `""` |
| `trigger` | `"ended"` |
| `once` | `true` |
| `allowSkip` | `!required` |
| `required` / `blocking` | `false` |
| `submitMode` | `"manual"`; `"on-select"` if `autoSubmit: true` |
| `autoSubmitDelay` | `0` |
| `instantFeedback` | `true` for `kind: "quiz"`, otherwise false |
| `allowRetake` | `allowResubmit ?? false` |
| `maxAttempts` | `undefined` (unlimited) |

## Playlist defaults

`startIndex: 0`, `autoAdvance: false`, `loop: false`, `autoAdvanceDelay: 0`, `requireCompletion: false`, `gateAdvance: false`, `allowNext: true`, `allowPrevious: true`.

## Speed and resume limits

- Rate: 0.25–4 (clamped). Preset chips use the eight `PLAYBACK_RATES`.
- Resume: `minDuration: 30` seconds; key `universal-player:<url>`; storage `localStorage`.
- Caption persistence key: `universal-player:captions:<url>`.
- HLS back buffer: 90 seconds.

## Source detection fallback

If the host is not YouTube/Vimeo and no MIME/extension matches, `detectMediaKind()` returns `"video"`. An extension-less URL is a video URL unless you pass a structured source.

**Canonical guides:** [Configuration](./configuration.md) · [Core API](./reference/api-core.md) · [Defaults in the example book](../examples/guides/configuration.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
