# API source reference

> [Docs home](./README.md) � API source reference

[← Docs](./README.md) · [_API facts](./_api-facts.md) · [API reference](./api-reference.md)

A maintainer's map from each public entry point to the source file that
implements it, and from each exported symbol to its origin. Use this when you
change code and need to update the docs, or when you suspect the docs and the
source disagree.

**Rule of precedence:** source > `package.json` > `_api-facts.md` >
`api-reference.md` > prose pages. If this page is stale, fix it in the same pull
request as the code.

---

## 1. Entry point → source

| Entry (`package.json`)        | Source                                          | Side effects                           |
| ----------------------------- | ----------------------------------------------- | -------------------------------------- |
| `.` → `dist/entries/index.js` | `src/entries/index.ts`                          | Calls `defineUniversalPlayerElement()` |
| `./core`                      | `src/entries/core.ts`                           | None                                   |
| `./ui`                        | `src/entries/ui.ts`                             | Calls `defineUniversalPlayerElement()` |
| `./vanilla`                   | `src/entries/vanilla.ts`                        | None                                   |
| `./react`                     | `src/entries/react.ts`                          | None                                   |
| `./vue`                       | `src/entries/vue.ts`                            | None                                   |
| `./angular`                   | `src/entries/angular.ts`                        | None                                   |
| `./svelte4`                   | `src/frameworks/svelte4/UniversalPlayer.svelte` | Svelte compiler                        |
| `./svelte5`                   | `src/frameworks/svelte5/UniversalPlayer.svelte` | Svelte compiler                        |
| `./styles.css`                | `src/ui/styles.css` → `dist/ui/styles.css`      | CSS only                               |

`sideEffects` in `package.json` lists only `**/*.css`,
`./dist/entries/index.js` and `./dist/entries/ui.js`.

---

## 2. `src/entries/core.ts` → symbols

| Export                                                                                                                              | Defined in           |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `UniversalPlayer`, `createPlayer`                                                                                                   | `src/core/player.ts` |
| `PlayerEventBus`, `PlayerObservable`, `toRxjsObservable`                                                                            | `src/core/events.ts` |
| `PlayerObserver`, `Subscription` (types)                                                                                            | `src/core/events.ts` |
| `PLAYER_ERROR_CODES`, `createPlayerError`, `isPlayerError`, `toPlayerError`                                                         | `src/core/errors.ts` |
| `PlayerError`, `PlayerErrorCode`, `PlayerErrorOptions`                                                                              | `src/core/errors.ts` |
| `detectMediaKind`, `extensionOf`, `inferMimeType`, `isVimeoHost`, `isYouTubeHost`, `normalizeSource`, `revokeSource`, `sourceToken` | `src/core/source.ts` |
| `createInitialState`, `InitialStateOptions`                                                                                         | `src/core/state.ts`  |
| `clamp`, `finiteOr`, `formatTime`, `formatTimecode`                                                                                 | `src/core/utils.ts`  |
| `EMBED_CAPABILITIES`, `IMAGE_CAPABILITIES`, `NATIVE_CAPABILITIES`, `capabilitiesForKind`                                            | `src/core/engine.ts` |
| All public option/state/event types                                                                                                 | `src/core/types.ts`  |

---

## 3. `src/entries/ui.ts` → symbols

| Export                                                                           | Defined in               |
| -------------------------------------------------------------------------------- | ------------------------ |
| `UNIVERSAL_PLAYER_TAG`, `UniversalPlayerElement`, `defineUniversalPlayerElement` | `src/ui/element.ts`      |
| `PLAYER_STRINGS_EN`, `getStrings`, `registerLocale`, `setStrings`                | `src/ui/i18n.ts`         |
| Survey overlay rendering                                                         | `src/ui/survey-panel.ts` |
| Icons                                                                            | `src/ui/icons.ts`        |
| Styles                                                                           | `src/ui/styles.css`      |

---

## 4. `src/entries/index.ts` → symbols

```ts
import { defineUniversalPlayerElement } from "./ui.js";

defineUniversalPlayerElement();

export * from "./core.js";
export * from "./ui.js";
export * from "./vanilla.js";
export * from "../features/index.js";
```

This is why importing the root registers the element and also exposes feature
helpers that the core does not need.

---

## 5. Feature module map

| Feature        | Source                                      | Public exports                                                                                                                                              |
| -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ads            | `src/features/ads/ads.ts`                   | `AdBreak`, `AdSchedule`, `AdController`, `findAdBreakAt`, `createAdController`                                                                              |
| AirPlay        | `src/features/airplay/airplay.ts`           | availability/prompt helpers                                                                                                                                 |
| Analytics      | `src/features/analytics/analytics.ts`       | `AnalyticsSink`, `createAnalyticsSink`, `toAnalyticsEvent`                                                                                                  |
| Audio tracks   | `src/features/audio-tracks/audio-tracks.ts` | track helpers                                                                                                                                               |
| Captions       | `src/features/captions/captions.ts`         | caption helpers                                                                                                                                             |
| Cast           | `src/features/cast/cast.ts`                 | `CastProvider`, `CastOptions`, `canCast`, `connectCast`, `disconnectCast`, `findAvailableCastProvider`                                                      |
| Chapters       | `src/features/chapters/chapters.ts`         | `findChapterAt` and helpers                                                                                                                                 |
| Fullscreen     | `src/features/fullscreen/fullscreen.ts`     | availability helpers                                                                                                                                        |
| Image viewer   | `src/features/image-viewer/image-viewer.ts` | `ImageTransform`, `IMAGE_TRANSFORM_DEFAULT`, `clampImageZoom`, `zoomImage`, `rotateImage`, `resetImageTransform`, `imageTransformCss`, `isImageTransformed` |
| Live           | `src/features/live/live.ts`                 | `isLiveDuration`, `seekableRange`, `liveEdge`, `isAtLiveEdge`                                                                                               |
| Mini-player    | `src/features/mini-player/mini-player.ts`   | PiP-based helpers                                                                                                                                           |
| PiP            | `src/features/pip/pip.ts`                   | availability helpers                                                                                                                                        |
| Playlist       | `src/features/playlist/playlist.ts`         | playlist helpers                                                                                                                                            |
| Quality        | `src/features/quality/quality.ts`           | quality helpers                                                                                                                                             |
| Resume         | `src/features/resume/resume.ts`             | `DEFAULT_RESUME_KEY_PREFIX`, `ResumeStore`, `createResumeStore`                                                                                             |
| Shortcuts      | `src/features/shortcuts/shortcuts.ts`       | `PlayerShortcutAction`, `ShortcutOptions`, `shortcutForEvent`, `PLAYER_SHORTCUTS`                                                                           |
| Speed          | `src/features/speed/speed.ts`               | `PLAYBACK_RATES`, `clampPlaybackRate`, `formatPlaybackRate`                                                                                                 |
| Survey         | `src/features/survey/survey.ts`             | survey state machine, validation, storage                                                                                                                   |
| Survey presets | `src/features/survey/presets.ts`            | `endOfVideoFeedback`, `netPromoterScore`, `contentFeedback`, `blockingReview`, `quizFeedback`, `SURVEY_PRESETS`                                             |
| Thumbnails     | `src/features/thumbnails/thumbnails.ts`     | thumbnail lookup helpers                                                                                                                                    |
| VR             | `src/features/vr/vr.ts`                     | `VrProjection`, `VrOptions`, `isVrSupported`, `setVrMode`, `clearVrMode`                                                                                    |

---

## 6. Engine map

| Provider        | Engine factory             | Adapter                          |
| --------------- | -------------------------- | -------------------------------- |
| `native`        | `createNativeEngine`       | `src/adapters/native/engine.ts`  |
| `image`         | `createImageEngine`        | `src/adapters/image/engine.ts`   |
| `chunked`       | `createChunkedMediaEngine` | `src/adapters/chunked/engine.ts` |
| `hls`           | `createHlsEngine`          | `src/adapters/hls/engine.ts`     |
| `dash`          | `createDashEngine`         | `src/adapters/dash/engine.ts`    |
| `youtube`       | `createYouTubeEngine`      | `src/adapters/youtube/engine.ts` |
| `vimeo`         | `createVimeoEngine`        | `src/adapters/vimeo/engine.ts`   |
| `generic-embed` | `createEmbedEngine`        | `src/adapters/embed/engine.ts`   |

The switch lives in `src/core/engines.ts`. There is no public registry. See
[Extending](./extending.md).

---

## 7. Framework wrappers

| Framework | Source                                                    | Public entry             |
| --------- | --------------------------------------------------------- | ------------------------ |
| React     | `src/frameworks/react/universal-player.ts`                | `src/entries/react.ts`   |
| Vue       | `src/frameworks/vue/universal-player.ts`                  | `src/entries/vue.ts`     |
| Angular   | `src/frameworks/angular/universal-player.ts`              | `src/entries/angular.ts` |
| Svelte 4  | `src/frameworks/svelte4/UniversalPlayer.svelte` + `.d.ts` | package export           |
| Svelte 5  | `src/frameworks/svelte5/UniversalPlayer.svelte` + `.d.ts` | package export           |

---

## 8. Core class internals

| Concern                       | Location in `src/core/player.ts`                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| Construction and initial load | `constructor`, `#applyInitialOptions`                                                  |
| Source replacement            | `load`                                                                                 |
| Playback                      | `play`, `pause`, `seek`, `retry`, `syncTime`                                           |
| Volume/rate                   | `setVolume`, `setMuted`, `toggleMute`, `setPlaybackRate`                               |
| Tracks                        | `setQuality`, `setTextTrack`, `setAudioTrack`, `setCaptions*`                          |
| Chapters/thumbnails           | `setChapters`, `seekToChapter`, `setThumbnails`                                        |
| Playlist                      | `setPlaylist`, `playPlaylistItem`, `next`, `previous`                                  |
| Survey                        | `setSurvey`, `openSurvey`, `retakeSurvey`, `submitSurvey`, `skipSurvey`, `closeSurvey` |
| Presentation                  | `setControls`, `setTheme`, `setLocale`, `setStrings`                                   |
| Lifecycle                     | `destroy`, `saveResume`, `restoreResume`                                               |
| State                         | `#setState`, `#applyEventToState`                                                      |
| Events                        | `#emitEvent`, `#bus`                                                                   |
| Analytics                     | `track`                                                                                |

---

## 9. Documentation synchronization checklist

When a symbol is added, removed or renamed:

- [ ] `src/entries/*.ts` export updated.
- [ ] `package.json` export map unchanged or updated.
- [ ] `docs/api-reference.md` and `docs/_api-facts.md` updated.
- [ ] `docs/options-cheatsheet.md` and `docs/defaults.md` updated if options.
- [ ] `docs/features.md` status updated.
- [ ] `CHANGELOG.md` + changeset added.
- [ ] `docs/changelog.md` links remain valid.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)