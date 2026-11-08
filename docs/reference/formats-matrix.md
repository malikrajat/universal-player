# Format and feature matrix

> [Docs home](../README.md) › [Reference](./README.md) › Format and feature matrix

## Status legend

| Status | Meaning |
| --- | --- |
| **Implemented** | Engine path exists and is routed; unit tests cover normalisation/routing. |
| **Conditional** | Works only with a peer, browser API or provider. |
| **Provider-only** | The provider supplies the feature; the package only bridges it. |
| **Display-only** | Renders, but cannot be controlled. |
| **Not decodable** | Recognised by extension, but mainstream browsers cannot play it. |
| **Scaffolded** | Contract only. |

## Format matrix

| Format | Kind | Provider | Engine path | Status | Verification |
| --- | --- | --- | --- | --- | --- |
| .mp4, .m4v | video | `native` | `createNativeEngine` (internal) | Implemented; codec support is the browser's | Unit routing; codec playback not verified |
| .webm | video | `native` | `createNativeEngine` (internal) | Implemented; codec support is the browser's | Unit routing; codec playback not verified |
| .mov | video | `native` | `createNativeEngine` (internal) | Detected and routed to native; playback is browser-dependent | Unit routing; codec playback not verified |
| .mkv | video | `native` | `createNativeEngine` (internal) | Recognised, not decoded by mainstream browsers | Unit routing; codec playback not verified |
| .m3u8 | video | `hls` | `createHlsEngine` (internal) | Implemented; requires `hls.js` or native HLS | Unit routing; codec playback not verified |
| .mpd | video | `dash` | `createDashEngine` (internal) | Implemented; requires `dashjs` | Unit routing; codec playback not verified |
| .mp3 | audio | `native` | `createNativeEngine` (internal) | Implemented | Unit routing; codec playback not verified |
| .m4a | audio | `native` | `createNativeEngine` (internal) | Implemented; codec support is the browser's | Unit routing; codec playback not verified |
| .wav | audio | `native` | `createNativeEngine` (internal) | Implemented | Unit routing; codec playback not verified |
| .flac | audio | `native` | `createNativeEngine` (internal) | Implemented; browser codec support varies | Unit routing; codec playback not verified |
| .ogg, .oga, .ogv | audio (`.oga`) or video (`.ogg`) | `native` | `createNativeEngine` (internal) | Implemented with an extension-based kind trap | Unit routing; codec playback not verified |
| .aac | audio | `native` | `createNativeEngine` (internal) | Implemented where the browser decodes raw ADTS | Unit routing; codec playback not verified |
| .jpg, .jpeg | image | `image` | `createImageEngine` (internal) | Implemented | Unit routing; codec playback not verified |
| .png | image | `image` | `createImageEngine` (internal) | Implemented | Unit routing; codec playback not verified |
| .webp | image | `image` | `createImageEngine` (internal) | Implemented; browser decode support | Unit routing; codec playback not verified |
| .svg | image | `image` | `createImageEngine` (internal) | Implemented with a security caveat | Unit routing; codec playback not verified |
| .avif | image | `image` | `createImageEngine` (internal) | Implemented; browser decode support | Unit routing; codec playback not verified |
| YouTube URL | embed | `youtube` | `createYouTubeEngine` (internal) | Implemented with postMessage sync | Unit routing; codec playback not verified |
| Vimeo URL | embed | `vimeo` | `createVimeoEngine` (internal) | Implemented with postMessage sync | Unit routing; codec playback not verified |
| Any non-YouTube/Vimeo URL passed as `{ kind: "embed" }` | embed | `generic-embed` | `createEmbedEngine` (internal) | Implemented; no command bridge | Unit routing; codec playback not verified |
| No extension; `ChunkedSource` | video, audio or image | `chunked` | `createChunkedMediaEngine` (internal) | Implemented | Unit routing; codec playback not verified |
| No extension | video, audio or image (from MIME) | `native or image` | native/image engine (internal) | Implemented | Unit routing; codec playback not verified |

## Capability matrix

| Format | seek | volume | rate | PiP | captions | quality | live |
| --- | --- | --- | --- | --- | --- | --- | --- |
| native video | yes | yes | yes | yes | yes | no | yes |
| native audio | yes | yes | yes | no | limited | no | yes |
| image | no | no | no | no | no | no | no |
| HLS | yes | yes | yes | yes | yes | yes | yes |
| DASH | yes | yes | yes | yes | yes | yes | yes |
| YouTube | yes | yes | yes | no | no | configured | yes |
| Vimeo | yes | yes | yes | no | no | configured | yes |
| generic embed | declared | declared | declared | no | no | no | yes |
| chunked | yes | yes | yes | yes | yes | no | yes |

## Feature matrix

| Feature | Core | Built-in UI | Headless consumers |
| --- | --- | --- | --- |
| Captions selection | yes | yes | yes (native rendering) |
| Caption styling | option only | yes | apply CSS yourself |
| Chapters | yes | yes | data + events |
| Playlist | yes | yes | yes |
| Quality | yes | yes | yes |
| Surveys | yes | yes | no overlay; you must render |
| Resume | yes | n/a | yes |
| Analytics | yes | n/a | yes |
| Keyboard shortcuts | no | yes | you implement |
| Gestures | no | yes | you implement |
| Share/embed | no (element method) | yes | use `getEmbedCode()` |
| Theming | no | yes | your CSS |
| PiP/fullscreen | methods | buttons | you call methods |

## Framework coverage

| Framework | Headless adapter | Full UI via element | Browser test in repo |
| --- | --- | --- | --- |
| Vanilla | /vanilla (headless helper) or /ui (custom element) | `<universal-player>` after importing the root or `/ui` | Unit tests in jsdom; custom-element tests in jsdom; Chromium smoke test |
| React | /react (component + hook) or /ui (custom element) | `<universal-player>` via `/ui` (React does not register it) | React 19.3.1 in devDependencies; no React-specific browser test |
| Vue | /vue (component + composable) or /ui (custom element) | `<universal-player>` via `/ui` (configure `isCustomElement`) | Vue 3.5.44 in devDependencies; Vue 2.7 not exercised in this repo |
| Angular | /angular (controller) or /ui (custom element) | `<universal-player>` via `/ui` with `CUSTOM_ELEMENTS_SCHEMA` | Angular 22.2.4 in devDependencies; no Angular-specific browser test |
| Svelte | /svelte4 or /svelte5 (component) or /ui (custom element) | `<universal-player>` via `/ui` | Svelte 5 in devDependencies; Svelte 4 component source is shipped but not built |

## Explicitly unsupported

DRM/EME, transcoding/remuxing, embedded chapter/thumbnail extraction, OCR, transcript authoring, Office/document formats, server-side rendering, CommonJS, plugin registries, Chromecast SDK, VAST/IMA playback, WebXR rendering.

## Fidelity warnings

- No claim of universal codec support.
- No claim of HLS/DASH feature parity with dedicated players (no DRM, no low-latency UI, no subtitle rendition switching beyond native text tracks).
- Embeds depend on third-party policy, availability and network.
- Generic embeds are not controllable.

**Next:** [Project](../project/architecture.md)

---

← Previous: [Browser support](./browser-support.md) · Next: [Project architecture](../project/architecture.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
