# Browser support

> [Docs home](./README.md) › Browser support

[← Docs](./README.md) · [Prerequisites](./prerequisites.md) · [Troubleshooting](./troubleshooting.md)

The package ships ES2023 and is ESM-only. It targets evergreen browsers; there
are no legacy bundles or polyfills.

---

## 1. Minimum versions

| Browser           | Minimum                     | Notes                  |
| ----------------- | --------------------------- | ---------------------- |
| Chrome            | 125+                        | Desktop and Android.   |
| Edge              | 125+                        | Chromium-based.        |
| Firefox           | 128+                        | Desktop and Android.   |
| Safari            | 18+                         | macOS, iOS, iPadOS.    |
| Opera             | Current Chromium equivalent | Not explicitly tested. |
| Samsung Internet  | Current Chromium equivalent | Not explicitly tested. |
| Internet Explorer | Not supported               | No legacy output.      |

These are **declared minimums**, not a formal test matrix. The build emits
`es2023`; older engines can parse some of it but are not supported.

---

## 2. Why ES2023?

- Modern syntax reduces shipped code.
- All target browsers support the required APIs (Custom Elements, ESM,
  `AbortController`, `ResizeObserver`, `MediaSource`).
- The package avoids transpilation bloat and the dual-package hazard.

---

## 3. Feature support by API

| API                       | Used for                | Fallback                               |
| ------------------------- | ----------------------- | -------------------------------------- |
| Custom Elements v1        | `<universal-player>`    | Headless core still works.             |
| Shadow DOM                | Default style isolation | `shadow="light"`.                      |
| `HTMLMediaElement`        | Native video/audio      | —                                      |
| `MediaSource`             | Chunked streaming       | Blob buffering.                        |
| `URL.createObjectURL`     | Blob/File/data sources  | Not supported where absent.            |
| Fullscreen API            | Fullscreen              | Typed `unsupported-environment` error. |
| Picture-in-Picture        | PiP                     | Hidden by capabilities.                |
| Remote Playback API       | Cast/AirPlay prompt     | Cast button hidden/unavailable.        |
| `ResizeObserver`          | Responsive UI           | Layout degrades gracefully.            |
| `postMessage`             | YouTube/Vimeo sync      | Commands may be ignored by provider.   |
| `AbortController`         | Listener cleanup        | Required.                              |
| `localStorage`            | Resume/captions         | Best-effort, ignored on failure.       |
| Constructable stylesheets | Shadow styles           | `<style>` injection fallback.          |

---

## 4. Media format support

| Format                     | Browser support                       | Engine |
| -------------------------- | ------------------------------------- | ------ |
| MP4 (H.264/AAC)            | All targets                           | native |
| WebM (VP8/VP9/Opus)        | Chrome, Edge, Firefox                 | native |
| MOV                        | Safari; Chromium varies               | native |
| MP3, AAC, WAV, FLAC        | All targets (FLAC varies in Safari)   | native |
| HLS                        | Safari native; others via `hls.js`    | hls    |
| DASH                       | via `dashjs`                          | dash   |
| JPEG/PNG/WebP/AVIF/SVG/GIF | All targets (AVIF depends on version) | image  |
| YouTube/Vimeo              | All targets with network access       | embed  |

Codec support is the browser's responsibility. The player does not transcode.

---

## 5. Streaming specifics

### HLS

- Safari and iOS play HLS natively.
- Chrome/Edge/Firefox use `hls.js` (optional peer, lazy import).
- The manifest **and every segment** must be CORS-enabled.
- Low-latency HLS support depends on `hls.js` and the server.

### DASH

- Requires `dashjs` (optional peer, lazy import).
- Safari has limited native DASH support; `dashjs` uses MediaSource.
- CORS is required on the manifest and segments.

### Chunked

- `MediaSource` support determines streaming.
- `mode: "auto"` falls back to buffering into a Blob.
- Blob buffering needs enough memory for the whole file.

---

## 6. Embed specifics

| Provider       | Sync                                                         | Limitations                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| YouTube        | Time, duration, buffered, play/pause/ended via `postMessage` | Provider may show its own UI; some videos disallow embedding. |
| Vimeo          | Time, duration, buffered, play/pause/ended via `postMessage` | Same.                                                         |
| Generic iframe | None                                                         | Rendered as-is; no command bridge.                            |

Embeds cannot expose captions, audio tracks or quality levels unless the
provider posts them. The core does not scrape iframe content.

---

## 7. ESM and CommonJS

The package is ESM-only:

```js
// ESM
import { createPlayer } from "@codewithrajat/universal-player/core";

// CommonJS
const { createPlayer } = await import("@codewithrajat/universal-player/core");
```

There is no `require()` entry. Bundlers that understand `exports` resolve the
correct file.

---

## 8. SSR frameworks

| Framework         | Approach                                                |
| ----------------- | ------------------------------------------------------- |
| Next.js           | `dynamic(..., { ssr: false })` or mount in `useEffect`. |
| Nuxt              | `<ClientOnly>` + dynamic import.                        |
| SvelteKit         | `onMount` + `browser` guard.                            |
| Remix             | `useEffect` / `ClientOnly`.                             |
| Angular Universal | `isPlatformBrowser` guard.                              |

`core` imports safely in Node, but constructing a player needs a DOM container.

---

## 9. Mobile

- `playsInline` is `true` by default on the element, so iPhone playback stays
  inline.
- Fullscreen on iOS uses the native video fullscreen path.
- PiP support varies; the UI hides the button when unavailable.
- Touch gestures are opt-in (`ui.gestures.enabled`).
- Autoplay generally requires `muted: true`.

---

## 10. Testing your target

```ts
const video = document.createElement("video");
const canPlayH264 = video.canPlayType('video/mp4; codecs="avc1.42E01E"');
const canPlayHls = video.canPlayType("application/vnd.apple.mpegurl");

console.log({ canPlayH264, canPlayHls });
```

Use `player.state.capabilities` at runtime and feature-detect before promising
PiP, fullscreen or cast.

---

## 11. Known browser constraints

| Constraint            | Effect                                                                      |
| --------------------- | --------------------------------------------------------------------------- |
| Autoplay policy       | Playback may require a user gesture; muted autoplay is more likely allowed. |
| iOS fullscreen        | Uses the native player; custom controls may be replaced.                    |
| Safari HLS            | Native; quality levels may not be enumerable.                               |
| Cross-origin captions | Need `crossorigin` and CORS headers.                                        |
| Private mode          | `localStorage` may throw; resume/caption persistence silently fails.        |
| Memory                | Large Blob-buffered videos can exhaust mobile memory; prefer `MediaSource`. |

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)