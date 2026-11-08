# Feature status

> [Docs home](./README.md) � Feature status

[← Docs](./README.md) · [Roadmap](./roadmap.md) · [Usage](./usage.md)

This matrix is the contract for what `0.0.1` actually does.

- **Implemented** — wired through core + UI.
- **Partial** — works, but a documented piece is missing.
- **Scaffolded** — types/contracts exist; behaviour is not wired.
- **Out of scope** — deliberately not supported in this release.

---

## Media

| Feature               | Status       | Notes                                                            |
| --------------------- | ------------ | ---------------------------------------------------------------- |
| Native `<video>`      | Implemented  | MP4/WebM/MOV and browser-supported codecs.                       |
| Native `<audio>`      | Implemented  | MP3/WAV/M4A; animated audio visual or poster artwork.            |
| Stills (`<img>`)      | Implemented  | JPG/PNG/WebP/AVIF/SVG + zoom/rotate/download.                    |
| HLS (`.m3u8`)         | Implemented  | Lazy `hls.js`; native HLS in Safari.                             |
| DASH (`.mpd`)         | Implemented  | Lazy `dashjs`; native fallback where available.                  |
| YouTube               | Implemented  | Commands + state/time/duration/progress sync over `postMessage`. |
| Vimeo                 | Implemented  | Commands + state/time/duration/progress sync over `postMessage`. |
| Generic iframe        | Implemented  | Renders the URL; no command bridge.                              |
| `Blob`/`File` sources | Implemented  | Object URLs owned and revoked.                                   |
| `data:` URLs          | Implemented  | MIME detects image/audio/video.                                  |
| Chunked sources       | Implemented  | Array, iterable, async iterable, `ReadableStream`.               |
| Chunked video/audio   | Implemented  | `MediaSource` when supported, Blob fallback.                     |
| Chunked images        | Implemented  | Assembled into a Blob/object URL.                                |
| Source arrays         | Implemented  | Playlist/gallery; image slideshow supported.                     |
| `MediaStream` sources | Implemented  | Native engine uses `srcObject`.                                  |
| DRM                   | Out of scope | No EME/license-server support.                                   |

---

## Playback

| Feature               | Status      | Notes                                                            |
| --------------------- | ----------- | ---------------------------------------------------------------- |
| Play / pause          | Implemented | Core + UI + click-to-play + big play.                            |
| Seek                  | Implemented | Core + buffered rail + chapter markers + hover previews.         |
| Volume / mute         | Implemented | Core + UI + keyboard.                                            |
| Playback rate         | Implemented | `0.25`–`4`; slider + preset chips.                               |
| Fullscreen            | Implemented | Core + UI + double-click.                                        |
| Picture-in-Picture    | Implemented | Core + UI.                                                       |
| Captions (WebVTT)     | Implemented | CC quick toggle, Off + language menu, size, persistence.         |
| Multiple audio tracks | Implemented | Native switching + settings menu.                                |
| Quality selection     | Implemented | HLS/DASH levels, `−`/`+`, `[`/`]`.                               |
| Live / DVR            | Partial     | Live label/state + seekable helpers; dedicated DVR UI not built. |
| Resume                | Implemented | Storage-backed, opt-in.                                          |
| Loop                  | Implemented | Option + settings toggle + keyboard.                             |
| Autoplay              | Implemented | Settings toggle + `setAutoplay()` for later loads.               |
| Autoplay next         | Implemented | Settings toggle + `setAutoAdvance()` for playlists.              |
| Sleep timer           | Implemented | 5–60 minute presets; pauses playback and shows a toast.          |
| Error recovery        | Implemented | Error overlay + retry.                                           |

---

## Extended

| Feature               | Status      | Notes                                                       |
| --------------------- | ----------- | ----------------------------------------------------------- |
| AirPlay / Cast prompt | Implemented | Remote Playback API button.                                 |
| Chromecast SDK        | Scaffolded  | Typed `CastProvider` contract.                              |
| Thumbnails/preview    | Implemented | Poster, seek hover, share preview, playlist/chapter images. |
| Chapters              | Implemented | Markers, menu, active chapter label.                        |
| Playlist/queue        | Implemented | Auto-advance, loop, next/previous, completion gating.       |
| Surveys/feedback      | Implemented | In-player forms, dynamic providers, events, persistence.    |
| Mini-player           | Implemented | PiP-based helper.                                           |
| Ads (VAST/IMA)        | Scaffolded  | Contract + stub controller.                                 |
| Analytics             | Implemented | Player hooks + vendor-neutral sink.                         |
| Stats for nerds       | Implemented | Resolution, frames, buffer, quality, tracks, network.       |
| 360/VR                | Scaffolded  | Data-attribute contract only.                               |

---

## Experience

| Feature                  | Status      | Notes                                                          |
| ------------------------ | ----------- | -------------------------------------------------------------- |
| Custom controls          | Implemented | YouTube-style bar, translucent submenus, adaptive visibility.  |
| Control configuration    | Implemented | Allow-list/hide/order, menu sections, speed, download.         |
| Timestamp                | Implemented | Auto h/m/s precision, click toggles remaining, tooltip.        |
| Settings sheet           | Implemented | Icon rows, switches, speed slider/chips, sleep timer.          |
| Outside-click dismissal  | Implemented | Open sheets close on any page interaction outside the player.  |
| Gesture configuration    | Implemented | Opt-in swipe seek/fullscreen; directions disable individually. |
| Adaptive controls        | Implemented | Driven by `state.kind` + `state.capabilities`.                 |
| Native controls fallback | Implemented | `controls="native"`.                                           |
| Shadow DOM               | Implemented | Default; configurable at mount.                                |
| Light DOM                | Implemented | `shadow="light"` + `styles.css` or `inject-styles`.            |
| Theming                  | Implemented | CSS variables + light/dark/system.                             |
| i18n                     | Implemented | English + locale registration + per-instance overrides.        |
| Keyboard shortcuts       | Implemented | Full YouTube-style set + help overlay.                         |
| Shortcut help            | Implemented | `?` overlay; hints beside Settings rows.                       |
| Share and embed          | Implemented | Link/social share + iframe or player snippet + poster preview. |
| ARIA state               | Implemented | `aria-label`, `aria-pressed`, `aria-expanded`, `aria-busy`.    |
| RTL                      | Implemented | Logical CSS properties.                                        |
| Reduced motion           | Implemented | `prefers-reduced-motion`.                                      |
| Forced colors            | Implemented | `forced-colors` adjustments.                                   |
| Formal WCAG audit        | Not done    | Target-oriented markup only; no automated axe audit.                  |

---

## Survey question types

| Type       | Single/Multi | Notes                                    |
| ---------- | ------------ | ---------------------------------------- |
| `radio`    | Single       | Optional free-text "Other".              |
| `checkbox` | Multi        | `minSelections` / `maxSelections`.       |
| `select`   | Single       | Dropdown, optional "Other".              |
| `text`     | Single       | `minLength` / `maxLength` / placeholder. |
| `textarea` | Single       | `minLength` / `maxLength` / placeholder. |
| `rating`   | Single       | Star buttons, configurable max.          |
| `scale`    | Single       | Range input with `min` / `max` / `step`. |

Triggers: `"ended"`, `"manual"`, a number of seconds, or `{ at: seconds }`.
`once`, persistence, skip/close rules and callbacks are configurable.

### Submission modes

| Mode          | Behaviour                                                        |
| ------------- | ---------------------------------------------------------------- |
| `manual`      | User presses Submit.                                             |
| `on-select`   | Submits when required answers are selected (`autoSubmit: true`). |
| `on-complete` | Submits when every required question has an answer.              |

`autoSubmitDelay` controls the delay. `instantFeedback` + `correct` +
`explanation` provide quiz correctness. `blocking`/`required` prevents closing or
skipping. `allowRetake` shows Retake/Done and enables `player.retakeSurvey()`.
`maxAttempts` limits retakes.

---

## Framework adapters

| Adapter  | Status        | Notes                                                           |
| -------- | ------------- | --------------------------------------------------------------- |
| Vanilla  | Implemented   | `mountUniversalPlayer()`.                                       |
| React    | Implemented   | Hook + `forwardRef` component.                                  |
| Vue 3    | Implemented   | Component + composable.                                         |
| Vue 2.7  | Implemented   | Same entry; Composition API required.                           |
| Angular  | Implemented   | Decorator-free controller; consumer-owned standalone component. |
| Svelte 4 | Implemented   | Source component.                                               |
| Svelte 5 | Implemented   | Runes component.                                                |
| SSR      | Not supported | Browser-only by decision.                                       |

---

## Packaging

| Feature           | Status       | Notes                                              |
| ----------------- | ------------ | -------------------------------------------------- |
| ESM output        | Implemented  | `type: module`, explicit `.js` imports.            |
| Type declarations | Implemented  | Bundled `.d.ts` per entry.                         |
| Source maps       | Implemented  | `.js.map` files.                                   |
| Tree-shaking      | Implemented  | `unbundle: true` + `sideEffects` allowlist.        |
| Subpath exports   | Implemented  | 9 code entry points (root + 8 subpaths).                          |
| Optional peers    | Implemented  | hls.js, dashjs, rxjs, React, Vue, Angular, Svelte. |
| publint           | Implemented  | Build + CI.                                        |
| attw              | Implemented  | ESM-only profile.                                  |
| Tarball allowlist | Implemented  | `scripts/check-pack-contents.mjs`.                 |
| Node-builtin scan | Implemented  | `scripts/check-browser-imports.mjs`.               |
| SBOM              | Implemented  | `pnpm run sbom` → CycloneDX JSON.                  |
| Bundle budget     | Not enforced | Deliberately deferred.                             |

---

## Summary

```text
Implemented   native, image, HLS, DASH, embeds, chunked, captions,
              quality, speed, PiP, fullscreen, chapters, thumbnails,
              playlists, surveys, resume, analytics, shortcuts, theming,
              i18n, share/embed, stats, adaptive controls, 6 adapters

Partial       live/DVR UI
Scaffolded    ads, Chromecast SDK, 360/VR, formal WCAG audit
Out of scope  DRM, SSR, public plugin registry
```

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)