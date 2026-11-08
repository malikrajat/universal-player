# API matrix

> [Examples home](./README.md) › API matrix

## Public entry points

| Entry | Exports | UI |
| --- | --- | --- |
| `@codewithrajat/universal-player` | core + UI + vanilla + feature helpers | yes |
| `@codewithrajat/universal-player/core` | player, source, events, errors, capabilities | no |
| `@codewithrajat/universal-player/ui` | element, i18n, registration | yes |
| `@codewithrajat/universal-player/vanilla` | `mountUniversalPlayer`, `MountOptions` | no |
| `@codewithrajat/universal-player/react` | `UniversalPlayer`, `useUniversalPlayer`, 4 types | no |
| `@codewithrajat/universal-player/vue` | `UniversalPlayer`, `useUniversalPlayer`, 4 types | no |
| `@codewithrajat/universal-player/angular` | `AngularUniversalPlayer`, 3 types | no |
| `@codewithrajat/universal-player/svelte4` | default component | no |
| `@codewithrajat/universal-player/svelte5` | default component | no |

## Core viewer API

`UniversalPlayer` getters: `destroyed`, `state`, `options`, `source`, `mediaElement`, `capabilities`, `activeSurvey`, `playlistStatus`, `playlistItems`, `playlistItem`, `currentChapter`, `thumbnails`.

Methods: `on`, `once`, `observe`, `load`, `play`, `pause`, `seek`, `setVolume`, `setMuted`, `toggleMute`, `setPlaybackRate`, `setQuality`, `setTextTrack`, `setAudioTrack`, `setCaptions`, `setCaptionsEnabled`, `toggleCaptions`, `setCaptionStyle`, `setChapters`, `seekToChapter`, `setThumbnails`, `setLoop`, `setAutoplay`, `setAutoAdvance`, `setSurvey`, `openSurvey`, `submitSurvey`, `skipSurvey`, `closeSurvey`, `retakeSurvey`, `setPlaylist`, `playPlaylistItem`, `next`, `previous`, `cancelAutoAdvance`, `syncTime`, `retry`, `requestFullscreen`, `exitFullscreen`, `requestPictureInPicture`, `exitPictureInPicture`, `setControls`, `setTheme`, `setLocale`, `setStrings`, `restoreResume`, `saveResume`, `destroy`.

## Events

`statechange`, `loadstart`, `loadedmetadata`, `durationchange`, `play`, `playing`, `pause`, `timeupdate`, `progress`, `seeking`, `seeked`, `waiting`, `canplay`, `ended`, `volumechange`, `ratechange`, `qualitychange`, `texttrackchange`, `audiotrackchange`, `chapterchange`, `playlistchange`, `surveyopen`, `surveysubmit`, `surveyskip`, `surveyclose`, `fullscreenchange`, `pictureinpicturechange`, `error`, `destroy`.

## Sources

| Shape | Accepted |
| --- | --- |
| URL string | yes |
| Structured video/audio/image/embed | yes |
| `Blob` / `File` | yes |
| `MediaStream` | yes |
| `ChunkedSource` | yes |
| Array of the above | yes (playlist) |

## Load and reload

`load(input)` cancels older work, replaces the engine, resets chapter/thumbnail overrides, and rethrows failures. `retry()` reloads the current source. There is no `setSource()`.

## Registry

None. `createEngine()` is internal; the provider union is closed. Do not document `registerEngine`.

## Format catalog (internal factories)

`createNativeEngine`, `createImageEngine`, `createChunkedMediaEngine`, `createHlsEngine`, `createDashEngine`, `createYouTubeEngine`, `createVimeoEngine`, `createEmbedEngine`.

## Adapter contract (internal)

`PlayerEngine`: `kind`, `element`, `capabilities`, `load`, `play`, `pause`, `seek`, `setVolume`, `setMuted`, `setPlaybackRate`, optional quality/track methods/getters, `getCurrentTime`, `getDuration`, `getBuffered`, optional `requestTimeSync`, `destroy`.

## Feature APIs

Captions, chapters, thumbnails, playlist, quality, speed, survey, resume, analytics, fullscreen, PiP, AirPlay, cast contract, mini-player, ads contract, VR contract. Full table: [docs/reference/api-features.md](../docs/reference/api-features.md).

## Framework APIs

| Framework | Component/hook | Reactive after mount |
| --- | --- | --- |
| React | `UniversalPlayer`, `useUniversalPlayer` | source, volume, muted, rate |
| Vue | `UniversalPlayer`, `useUniversalPlayer` | source, volume, muted, rate |
| Angular | `AngularUniversalPlayer` | source, volume, muted, rate |
| Svelte | component | source |

## UI API

Element: `player`, `strings`, `load`, `play`, `pause`, `seek`, `getEmbedCode`, `destroy`. 33 observed attributes; see [docs/reference/api-ui-and-frameworks.md](../docs/reference/api-ui-and-frameworks.md).

## Error table

| Code | Typical trigger |
| --- | --- |
| `invalid-argument` | bad container/URL/list/index/answers |
| `invalid-state` | no media, gated playlist, no survey |
| `unsupported-source` | PiP on non-video |
| `unsupported-environment` | missing browser API / HLS support |
| `network-error` | fatal HLS |
| `media-error` | decode/append/SDK load failure |
| `aborted` | reserved |
| `destroyed` | method after destroy |
| `not-implemented` | ad stub |

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
