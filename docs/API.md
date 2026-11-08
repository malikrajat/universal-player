# API index

> [Docs home](./README.md) › API index

This page is the exhaustive index of **public exports**. The narrative reference is [`api-reference.md`](./api-reference.md); the source-to-symbol map is [`api-source-reference.md`](./api-source-reference.md).

> **Publication status:** the package is unreleased at `0.0.1`. Imports below work after a local folder/tarball install, not from the npm registry.

## Public subpaths and exports

| Subpath | Entry file | Runtime exports | Type exports |
| --- | --- | --- | --- |
| `@codewithrajat/universal-player` | `dist/entries/index.js` | Re-exports `/core`, `/ui`, `/vanilla` and every feature helper; registers the element | All types from those entries |
| `@codewithrajat/universal-player/core` | `dist/entries/core.js` | `UniversalPlayer`, `createPlayer`, `PlayerEventBus`, `PlayerObservable`, `toRxjsObservable`, `PLAYER_ERROR_CODES`, `createPlayerError`, `isPlayerError`, `toPlayerError`, `detectMediaKind`, `extensionOf`, `inferMimeType`, `isYouTubeHost`, `isVimeoHost`, `normalizeSource`, `revokeSource`, `sourceToken`, `createInitialState`, `clamp`, `finiteOr`, `formatTime`, `formatTimecode`, `EMBED_CAPABILITIES`, `IMAGE_CAPABILITIES`, `NATIVE_CAPABILITIES`, `capabilitiesForKind` | `PlayerOptions`, `PlayerState`, `PlayerEvent`, `PlayerEvents`, `PlayerError`, `PlayerErrorCode`, `PlayerSource`, `PlayerSourceInput`, `PlayerSourceItem`, `ChunkedSource`, `ChunkData`, `ChunkIterable`, `QualityLevel`, `TextTrackInfo`, `AudioTrackInfo`, `Chapter`, `ThumbnailTrack`, `PlaylistOptions`, `SurveyConfig`, `UIOptions`, and the rest of the exported type list |
| `@codewithrajat/universal-player/ui` | `dist/entries/ui.js` | `UNIVERSAL_PLAYER_TAG`, `UniversalPlayerElement`, `defineUniversalPlayerElement`, `PLAYER_STRINGS_EN`, `getStrings`, `registerLocale`, `setStrings` | Element and string types |
| `@codewithrajat/universal-player/vanilla` | `dist/entries/vanilla.js` | `mountUniversalPlayer` | `MountOptions` |
| `@codewithrajat/universal-player/react` | `dist/entries/react.js` | `UniversalPlayer`, `useUniversalPlayer` | `UniversalPlayerHandle`, `UniversalPlayerProps`, `UseUniversalPlayerOptions`, `UseUniversalPlayerResult` |
| `@codewithrajat/universal-player/vue` | `dist/entries/vue.js` | `UniversalPlayer`, `useUniversalPlayer` | `MaybeRef`, `PlayerOptionKey`, `UseUniversalPlayerOptions`, `UseUniversalPlayerResult` |
| `@codewithrajat/universal-player/angular` | `dist/entries/angular.js` | `AngularUniversalPlayer` | `AngularUniversalPlayerInputs`, `AngularUniversalPlayerOptions`, `AngularUniversalPlayerOutputs` |
| `@codewithrajat/universal-player/svelte4` | `dist/frameworks/svelte4/UniversalPlayer.svelte` | default component | Component prop types in the shipped `.d.ts` |
| `@codewithrajat/universal-player/svelte5` | `dist/frameworks/svelte5/UniversalPlayer.svelte` | default component | Component prop types in the shipped `.d.ts` |
| `@codewithrajat/universal-player/styles.css` | `dist/ui/styles.css` | n/a | n/a |
| `@codewithrajat/universal-player/package.json` | `package.json` | n/a | n/a |

## Core class surface

| Member | Kind | Signature / type |
| --- | --- | --- |
| `destroyed` | getter | `boolean` |
| `state` | getter | `PlayerState` |
| `options` | getter | `Readonly<PlayerOptions>` |
| `source` | getter | `NormalizedSource \| null` |
| `mediaElement` | getter | `HTMLElement \| null` |
| `capabilities` | getter | `PlayerCapabilities \| null` |
| `activeSurvey` | getter | `SurveyConfig \| null` |
| `playlistStatus` | getter | `PlaylistStatus \| null` |
| `playlistItems` | getter | `readonly PlaylistItem[]` |
| `playlistItem` | getter | `PlaylistItem \| null` |
| `currentChapter` | getter | `Chapter \| null` |
| `thumbnails` | getter | `ThumbnailTrack \| null` |
| `on` / `once` / `observe` | methods | Typed subscription / observable |
| `load` | method | `(input: PlayerSourceInput) => Promise<void>` |
| `play` / `pause` / `seek` | methods | Playback |
| `setVolume` / `setMuted` / `toggleMute` / `setPlaybackRate` | methods | Audio/rate |
| `setQuality` / `setTextTrack` / `setAudioTrack` | methods | Track selection |
| `setCaptions` / `setCaptionsEnabled` / `toggleCaptions` / `setCaptionStyle` | methods | Captions |
| `setChapters` / `seekToChapter` / `setThumbnails` | methods | Timeline metadata |
| `setLoop` / `setAutoplay` / `setAutoAdvance` | methods | Playback policy |
| `setSurvey` / `openSurvey` / `submitSurvey` / `skipSurvey` / `closeSurvey` / `retakeSurvey` | methods | Surveys |
| `setPlaylist` / `playPlaylistItem` / `next` / `previous` / `cancelAutoAdvance` | methods | Playlist |
| `retry` / `syncTime` | methods | Recovery / embed time sync |
| `requestFullscreen` / `exitFullscreen` / `requestPictureInPicture` / `exitPictureInPicture` | methods | Platform APIs |
| `setControls` / `setTheme` / `setLocale` / `setStrings` | methods | Presentation preferences |
| `restoreResume` / `saveResume` | methods | Resume storage |
| `destroy` | method | `() => void` |

## Events

`statechange`, `loadstart`, `loadedmetadata`, `durationchange`, `play`, `playing`, `pause`, `timeupdate`, `progress`, `seeking`, `seeked`, `waiting`, `canplay`, `ended`, `volumechange`, `ratechange`, `qualitychange`, `texttrackchange`, `audiotrackchange`, `chapterchange`, `playlistchange`, `surveyopen`, `surveysubmit`, `surveyskip`, `surveyclose`, `fullscreenchange`, `pictureinpicturechange`, `error`, `destroy`.

## Stable error codes

`invalid-argument`, `invalid-state`, `unsupported-source`, `unsupported-environment`, `network-error`, `media-error`, `aborted`, `destroyed`, `not-implemented`. Details: [reference/errors.md](./reference/errors.md).

## Element surface

`<universal-player>` exposes `player`, `strings`, `load()`, `play()`, `pause()`, `seek()`, `getEmbedCode()` and `destroy()`. It forwards 28 player events as DOM `CustomEvent`s (all except `destroy`), plus its own DOM lifecycle.

**Next:** [Core API](./reference/api-core.md) · [UI API](./reference/api-ui-and-frameworks.md)

---

Next: [API reference](./api-reference.md) →

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
