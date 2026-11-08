# Features

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Features

Status vocabulary: **implemented** (wired through core/UI), **partial** (a documented piece is missing), **scaffolded** (contract only), **out of scope**.

## Media

| Feature | Status | Notes |
| --- | --- | --- |
| Native video/audio | Implemented | Browser codecs only. |
| Still images | Implemented | Zoom/rotate/download in the built-in UI. |
| HLS | Implemented, conditional | `hls.js` peer or native HLS. |
| DASH | Implemented, conditional | `dashjs` peer. |
| YouTube / Vimeo | Implemented, provider-only | Commands + time/duration/progress sync. |
| Generic iframe | Implemented, display-only | No command bridge. |
| Blob/File | Implemented | Object URL owned and revoked. |
| Chunked sources | Implemented | MSE or Blob fallback. |
| Source arrays | Implemented | Playlist/gallery. |
| MediaStream | Implemented | Native `srcObject`. |
| DRM | Out of scope | No EME. |

## Playback and experience

| Feature | Status | Notes |
| --- | --- | --- |
| Play/pause/seek/volume/rate | Implemented | Core + UI. |
| Fullscreen | Implemented, conditional | Browser API. |
| Picture-in-Picture | Implemented, conditional | Video only. |
| Captions | Implemented | WebVTT via native text tracks. |
| Audio tracks | Implemented | Native switching. |
| Quality | Implemented, conditional | HLS/DASH ladders; configured levels for embeds. |
| Live | Partial | Live state/seekable helpers; no DVR scrubber UI. |
| Resume | Implemented | localStorage, opt-in. |
| Chapters | Implemented | Supplied data. |
| Thumbnails | Implemented | Supplied cues/sprite. |
| Playlist | Implemented | Auto-advance, loop, gating. |
| Surveys | Implemented | Forms, presets, events, once-persistence. |
| Analytics | Implemented | Six event types. |
| Keyboard shortcuts | Implemented, UI only | Full set + help overlay. |
| Share/embed | Implemented, UI only | Link/social + embed snippet. |
| Stats for nerds | Implemented, UI only | Reads available media/network values. |
| Theming | Implemented, UI only | Tokens, accent, light/dark/system. |
| i18n | Implemented, UI only | English built in; register more. |
| AirPlay/cast prompt | Implemented, conditional | Remote Playback API. |
| Chromecast SDK | Scaffolded | `CastProvider` contract. |
| Ads (VAST/IMA) | Scaffolded | `createAdController` throws `not-implemented`. |
| 360/VR | Scaffolded | Data attributes only. |
| WCAG audit | Not done | Target-oriented markup; no conformance claim. |

## Absent

DRM, SSR rendering, public engine registry, transcript panel, OCR, embedded metadata parsing, transcoding, CommonJS.

**Next:** [Frameworks](./frameworks.md)

---

← Previous: [Formats](./formats.md) · Next: [Frameworks](./frameworks.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
