# Feature APIs

> [Docs home](../README.md) › [Reference](./README.md) › Feature APIs

Feature helpers are exported from the **root entry only** (there is no `/features` subpath).

## Captions

| API | Signature | Default / notes |
| --- | --- | --- |
| `captions.enabled` | `boolean` | treated as enabled unless `false` |
| `captions.defaultTrack` | `string \| null` | `undefined` = stored preference, then track marked default |
| `captions.tracks` | `readonly CaptionTrack[]` | applied to the media element |
| `captions.style` | `CaptionStyle` | `fontSize`, `color`, `background`, `opacity` 0–1, `edge`, `fontFamily` |
| `captions.persist` | `boolean` | `true`; key `universal-player:captions:<url>` |
| `captions.storageKey` | `string` | overrides the key |
| `player.setTextTrack` | `(id \| null)` | `null` disables |
| `player.toggleCaptions` | `()` | cycles |
| `player.setCaptionStyle` | `(style)` | merges |
| `player.setCaptions` | `(options)` | replaces |

Helpers: `toTextTrackInfos`, `selectTextTrack`, `findTextTrack`, `nextTextTrackId`, `captionMenuItems`, `toCaptionTrackElements`, `captionStyleDeclarations`.

## Chapters and thumbnails

| API | Signature |
| --- | --- |
| `chapters` | `readonly Chapter[]` |
| `setChapters` | `(chapters) => void` |
| `seekToChapter` | `(chapter \| id) => void` |
| `currentChapter` | `Chapter \| null` |
| `chapterchange` | event `{ chapter }` |
| `thumbnails` | `ThumbnailTrack` |
| `setThumbnails` | `(track \| null) => void` |

Helpers: `sortChapters`, `findChapterAt`, `chapterProgress`, `activeChapterAt`, `nextChapter`, `previousChapter`, `chapterMarkers`, `findThumbnailAt`, `thumbnailUrlAt`, `thumbnailWidth`.

## Playlist

| API | Signature | Notes |
| --- | --- | --- |
| `playlist.items` | `readonly PlaylistItem[]` | required |
| `playlist.startIndex` | `number` | `0` |
| `playlist.autoAdvance` | `boolean` | `false` |
| `playlist.loop` | `boolean` | `false` |
| `playlist.autoAdvanceDelay` | `number` seconds | `0` |
| `playlist.requireCompletion` / `gateAdvance` | `boolean` | aliases; `false` |
| `playlist.allowNext` / `allowPrevious` | `boolean` | `true` |

`Playlist<T>` is also exported as a standalone helper (add/remove/select/next/previous); it does not load media.

## Quality

| API | Behaviour |
| --- | --- |
| `qualities` | fallback/configured levels |
| `setQuality(id \| null)` | `null` = auto; HLS sets `currentLevel = -1`; DASH toggles ABR |
| `state.quality` / `qualities` | current/last ladder |
| `qualitychange` | `{ quality }` |

Helpers: `normalizeQualityLevels` (highest first), `findQuality`, `stepQuality`, `qualityLabel`.

## Speed

`PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`.
`clampPlaybackRate` clamps 0.25–4; `formatPlaybackRate` returns `"1.25x"`. The settings slider can reach values outside the preset chips up to 4.

## Surveys

`normalizeSurvey` fills: `kind: "survey"`, title per kind, `trigger: "ended"`, `once: true`, `allowSkip: !required`, `submitMode` from `autoSubmit`, `instantFeedback` for quizzes, `allowRetake` from `allowResubmit`.

Submission modes: `manual`, `on-select`, `on-complete`. Question types: `radio`, `checkbox`, `select`, `text`, `textarea`, `rating`, `scale`.

Presets: `endOfVideoFeedback`, `netPromoterScore`, `contentFeedback`, `blockingReview`, `quizFeedback`, plus `SURVEY_PRESETS`.

Helpers: `isChoiceQuestion`, `isRequiredQuestion`, `surveyId`, `normalizeSurvey`, `surveyTriggerTime`, `emptySurveyAnswer`, `createSurveyAnswers`, `normalizeSurveyAnswers`, `isSurveyAnswerEmpty`, `validateSurveyAnswers`, `isSurveyComplete`, `evaluateSurveyAnswer`, `createSurveySubmission`, `createSurveyStore`.

## Resume

```ts
resume: { enabled: true, key: "my-app:resume", storage: sessionStorage, minDuration: 30 }
```

The core key is `resume.key ?? "universal-player:<url>"` and it reads/writes that key directly. The standalone `createResumeStore` helper applies its own prefix (`DEFAULT_RESUME_KEY_PREFIX = "universal-player:"`) to the key you pass. The two schemes are different; do not assume a value written by one will be read by the other.

## Analytics

```ts
analytics: { enabled: true, onEvent: (event) => send(event) }
```

`AnalyticsEvent = { type, at, position, duration, source, metadata? }`. Emitted for `loadedmetadata`, `play`, `pause`, `seeked`, `ended` and `error`. `enabled: false` or no `onEvent` disables it.

## Fullscreen, PiP, AirPlay, Cast, Mini-player

| Helper | Reality |
| --- | --- |
| `isFullscreen`, `canFullscreen`, `requestFullscreen`, `exitFullscreen`, `onFullscreenChange` | Browser API wrappers |
| `canPictureInPicture`, `requestPictureInPicture`, `exitPictureInPicture` | Video only |
| `canAirPlay`, `showAirPlayPicker` | Safari Remote Playback path |
| `canCast`, `connectCast`, `disconnectCast`, `findAvailableCastProvider` | Provider contract only; no Chromecast SDK |
| `canUseMiniPlayer`, `enterMiniPlayer`, `exitMiniPlayer` | PiP-based |

## Ads, VR

- `createAdController(schedule)` throws `not-implemented` when a scheduled break is played. `findAdBreakAt` is a pure helper that works.
- `isVrSupported`, `setVrMode`, `clearVrMode` write `data-up-vr*` attributes only. No WebXR renderer.

**Next:** [UI and frameworks](./api-ui-and-frameworks.md)

---

← Previous: [Universal formats](./api-universal-formats.md) · Next: [UI and framework APIs](./api-ui-and-frameworks.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
