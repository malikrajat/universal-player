# Core API

> [Docs home](../README.md) › [Reference](./README.md) › Core API

Entry: `@codewithrajat/universal-player/core`. Everything here is public.

## `UniversalPlayer`

```ts
import { UniversalPlayer, createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({ container, source });
// equivalent: new UniversalPlayer({ container, source })
```

`UniversalPlayer` extends `EventTarget` and exposes three subscription styles. Listener errors are swallowed.

### Construction

| Option | Type | Required | Default | Behaviour | Errors |
| --- | --- | --- | --- | --- | --- |
| `container` | `HTMLElement` | **required** | — | Owns the `.up-stage` div; the engine appends the media surface | `invalid-argument` if not an `HTMLElement` |
| `source` | `PlayerSourceInput` | optional | — | Loaded asynchronously in the constructor; failures go to `error`/state | `invalid-argument`, `unsupported-environment`, `media-error` |
| `label` | `string` | optional | `"Media"` on the element; `"Media player"` on the custom element | Accessible label | — |
| `controls` | `"custom" \| "native"` | optional | `"custom"` | Sets `media.controls`; **does not create chrome** | — |
| `theme` | `"light" \| "dark" \| "system"` | optional | UI resolves `"system"` | Preference only; the core does not render | — |
| `ui` | `UIOptions` | optional | — | Consumed by the custom element only | — |
| `locale` | `string` | optional | `"en"` | UI string resolution | — |
| `strings` | `Partial<PlayerStrings>` | optional | `{}` | Per-instance UI overrides | — |
| `autoplay` | `boolean` | optional | `false` | Calls `play()` after load; rejection is swallowed | Browser policy may reject silently |
| `muted` | `boolean` | optional | `false` | Initial mute | — |
| `loop` | `boolean` | optional | `false` | Forwarded to the media element | — |
| `preload` | `"none" \| "metadata" \| "auto"` | optional | `"metadata"` | Media element hint | — |
| `poster` | `string` | optional | — | Video/audio artwork (UI) | — |
| `crossOrigin` | `"anonymous" \| "use-credentials" \| null` | optional | not set | Sets `media.crossOrigin` | CORS failures become `media-error` |
| `playsInline` | `boolean` | optional | `true` | Video only | — |
| `volume` | `number` | optional | `1` | Clamped 0–1 | — |
| `playbackRate` | `number` | optional | `1` | Clamped 0.25–4 | — |
| `startTime` | `number` | optional | — | Seeks after the engine loads | — |
| `live` | `boolean` | optional | `false` | Initial live hint; HLS uses it for low-latency mode | — |
| `qualities` | `readonly QualityLevel[]` | optional | `[]` | Fallback/embed ladder | — |
| `textTracks` | `readonly TextTrackInfo[]` | optional | `[]` | Fallback list | — |
| `audioTracks` | `readonly AudioTrackInfo[]` | optional | `[]` | Fallback list | — |
| `chapters` | `readonly Chapter[]` | optional | `[]` | Timeline chapters | — |
| `thumbnails` | `ThumbnailTrack` | optional | — | Seek previews | — |
| `captions` | `CaptionsOptions` | optional | see defaults | Text tracks/style/persistence | — |
| `survey` | `SurveySource` | optional | — | Config or async provider | — |
| `playlist` | `PlaylistOptions` | optional | — | Constructor also loads `startIndex` if no `source` | `invalid-argument` |
| `image` | `ImageOptions` | optional | zoom/rotate on, 0.25–8 | UI-only image controls | — |
| `keyboard` | `boolean` | optional | `true` | **UI only** | — |
| `clickToPlay` | `boolean` | optional | `true` | **UI only** | — |
| `doubleClickFullscreen` | `boolean` | optional | `true` | **UI only** | — |
| `autoHideControls` | `boolean` | optional | `true` | **UI only** | — |
| `seekStep` | `number` | optional | `5` | **UI only**; J/L use 10 | — |
| `volumeStep` | `number` | optional | `0.1` | **UI only** | — |
| `resume` | `ResumeOptions` | optional | disabled; min 30 | Storage-backed position | — |
| `analytics` | `AnalyticsOptions` | optional | enabled, no-op without `onEvent` | Six event types | — |
| `onStateChange` | `(state) => void` | optional | — | Called after each `statechange` | Exceptions swallowed |
| `onEvent` | `(event) => void` | optional | — | Called for every event | Exceptions swallowed |

### Methods

| Method | Signature | Notes / errors |
| --- | --- | --- |
| `load` | `(input: PlayerSourceInput) => Promise<void>` | Cancels the previous load; emits `error` and rethrows on failure; `destroyed` after destroy |
| `play` | `() => Promise<void>` | `invalid-state` without media; restarts from 0 after `ended` |
| `pause` | `() => void` | No-op without an engine |
| `seek` | `(time: number) => void` | Clamps to ≥0; engine clamps to duration |
| `setVolume` | `(volume: number) => void` | Clamps 0–1 |
| `setMuted` / `toggleMute` | `(muted: boolean) => void` / `() => void` | — |
| `setPlaybackRate` | `(rate: number) => void` | Clamps 0.25–4 |
| `setQuality` | `(quality: string \| null) => void` | `null` = automatic |
| `setTextTrack` | `(id: string \| null) => void` | Persists the choice when captions persist |
| `setAudioTrack` | `(id: string \| null) => void` | `null` = browser default |
| `setCaptionsEnabled` | `(enabled: boolean) => void` | Enabling picks default/first track |
| `toggleCaptions` | `() => void` | Cycles off → tracks → off |
| `setCaptionStyle` | `(style: CaptionStyle) => void` | Merges into options; UI reads it |
| `setCaptions` | `(options: CaptionsOptions) => void` | Replaces the caption config |
| `setChapters` | `(chapters: readonly Chapter[]) => void` | Replaces and recomputes active chapter |
| `seekToChapter` | `(chapter: Chapter \| string) => void` | Unknown id is ignored |
| `setThumbnails` | `(track: ThumbnailTrack \| null) => void` | `null` clears |
| `setLoop` / `setAutoplay` | `(value: boolean) => void` | Mutates options and the media element where applicable |
| `setAutoAdvance` | `(value: boolean) => void` | No-op without a playlist |
| `setSurvey` | `(survey: SurveySource \| null) => void` | Closes the current overlay |
| `openSurvey` | `(force?: boolean) => Promise<boolean>` | `false` if absent/already shown |
| `submitSurvey` | `(answers) => SurveySubmission` | `invalid-state` without a survey; `invalid-argument` on validation failure |
| `skipSurvey` | `() => SurveySubmission \| null` | `null` when not open/not allowed |
| `closeSurvey` | `() => void` | Refuses when `required` |
| `retakeSurvey` | `() => Promise<boolean>` | Requires `allowRetake` |
| `setPlaylist` | `(options: PlaylistOptions \| null) => void` | Does not load an item |
| `playPlaylistItem` | `(index: number) => Promise<boolean>` | `false` out of range; `invalid-state` when gated/disabled |
| `next` / `previous` | `() => Promise<PlaylistItem \| null>` | `null` at the edge without loop; `invalid-state` when next is gated |
| `cancelAutoAdvance` | `() => void` | Clears the pending timer |
| `syncTime` | `() => void` | Asks embeds for an immediate time/duration refresh |
| `retry` | `() => Promise<void>` | Reloads the current source; `invalid-state` if none |
| `requestFullscreen` / `exitFullscreen` | `() => Promise<void>` | `unsupported-environment` |
| `requestPictureInPicture` / `exitPictureInPicture` | `() => Promise<void>` | `unsupported-source` (not video) / `unsupported-environment` |
| `setControls` / `setTheme` / `setLocale` | setters | Update options; UI may not react unless it re-renders |
| `setStrings` | `(strings: Partial<PlayerStrings>) => void` | Merges overrides |
| `restoreResume` / `saveResume` | `() => void` | Manual resume control |
| `destroy` | `() => void` | Idempotent; emits `destroy`; later calls throw `destroyed` |

### Getters

`destroyed`, `state`, `options`, `source`, `mediaElement`, `capabilities`, `activeSurvey`, `playlistStatus`, `playlistItems`, `playlistItem`, `currentChapter`, `thumbnails`.

### Subscriptions

```ts
const off = player.on("play", () => {});
const offOnce = player.once("ended", () => {});
const sub = player.observe("statechange").subscribe({ next: (state) => console.log(state) });
off(); offOnce(); sub.unsubscribe();
```

### Source helpers

| Helper | Signature | Notes |
| --- | --- | --- |
| `normalizeSource` | `(input) => NormalizedSource` | Throws `invalid-argument` for arrays/empty/unsupported |
| `revokeSource` | `(source \| null) => void` | Revokes only player-created object URLs |
| `sourceToken` | `(input) => string` | Stable change-detection token |
| `detectMediaKind` | `(extension, mimeType, url) => MediaKind` | Host → MIME → extension → video |
| `extensionOf` | `(pathname) => string \| null` | Lowercase, no dot |
| `inferMimeType` | `(extension) => string \| null` | Internal MIME table |
| `isYouTubeHost` / `isVimeoHost` | `(hostname) => boolean` | Host matching |
| `capabilitiesForKind` | `(kind) => PlayerCapabilities` | Best-effort before load |
| `createInitialState` | `(options?) => PlayerState` | Used by adapters |
| `formatTime` / `formatTimecode` | `(seconds, reference?) => string` | UI formatting |
| `clamp` / `finiteOr` | numeric helpers | — |

**Next:** [Format API](./api-formats.md)

---

← Previous: [Reference index](./README.md) · Next: [Format and engine API](./api-formats.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
