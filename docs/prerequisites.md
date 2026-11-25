# Prerequisites

> [Docs home](./README.md) › Prerequisites

[← Docs](./README.md) · [Installation →](./installation.md)

Everything you need before installing the player, and why each requirement
exists.

---

## Runtime requirements

| Requirement             | Minimum                                 | Notes                                                                        |
| ----------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| Browser                 | Chrome/Edge 125, Firefox 128, Safari 18 | ES2023 output; evergreen only.                                               |
| JavaScript              | ESM                                     | The package is `type: "module"` and exports ESM only.                        |
| DOM                     | Required                                | Playback, object URLs, fullscreen, PiP and Custom Elements are browser APIs. |
| `HTMLMediaElement`      | Required for video/audio                | Native, HLS and DASH engines.                                                |
| `CustomElementRegistry` | Required for `<universal-player>`       | Headless core works without it.                                              |
| `URL.createObjectURL`   | Required for `Blob`/`File` sources      | Not available in some workers.                                               |
| `MediaSource`           | Optional                                | Chunked streaming; falls back to a Blob.                                     |
| `ResizeObserver`        | Recommended                             | Responsive control layout.                                                   |
| `IntersectionObserver`  | Optional                                | Used by UI helpers.                                                          |

The library is **browser-only by decision**. Server rendering of the player or
framework wrappers is not supported. `core` can be imported in a non-browser
process, but constructing a player requires an `HTMLElement`.

---

## Development requirements

| Requirement | Version     | Why                                                                                              |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------ |
| Node.js     | `>= 24.0.0` | `package.json` → `engines`; CI and `.nvmrc`.                                                     |
| pnpm        | `11.5.1`    | Pinned via `packageManager`; workspace lockfile.                                                 |
| TypeScript  | 5.9+        | Source uses `verbatimModuleSyntax`, `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`. |
| Git         | Any recent  | Changesets and contribution workflow.                                                            |

The published library does not require Node at runtime. Node is only for
building, testing and releasing.

---

## Peer dependency ranges

| Peer            | Declared range       | Required?                             |
| --------------- | -------------------- | ------------------------------------- |
| `hls.js`        | `^1.5.0`             | Optional — HLS sources only.          |
| `dashjs`        | `^5.0.0`             | Optional — DASH sources only.         |
| `rxjs`          | `^7.8.0`             | Optional — `toRxjsObservable()` only. |
| `react`         | `>=18.0.0`           | Optional — React adapter.             |
| `vue`           | `^2.7.0 \|\| ^3.0.0` | Optional — Vue adapter.               |
| `@angular/core` | `>=17.0.0`           | Optional — Angular adapter.           |
| `svelte`        | `^4.0.0 \|\| ^5.0.0` | Optional — Svelte adapter.            |

All peers are `optional: true`. A missing peer is not an install error; it is a
runtime error only when the matching code path is used.

Details and failure modes: [Peer dependencies](./peer-dependencies.md).

---

## Stream and media requirements

| Source        | Prerequisite                                                               |
| ------------- | -------------------------------------------------------------------------- |
| MP4/WebM/MOV  | Browser codec support; correct `Content-Type`; range requests for seeking. |
| HLS           | `hls.js` on non-Safari browsers; CORS on playlist **and segments**.        |
| DASH          | `dashjs`; CORS on manifest and segments.                                   |
| YouTube/Vimeo | Network access to the provider; embedding allowed by the video owner.      |
| Images        | Valid image MIME; CORS if you need pixel access.                           |
| `Blob`/`File` | `URL.createObjectURL` support; object URLs are revoked on replace/destroy. |
| Chunked       | MIME type that `MediaSource` accepts, or use `mode: "blob"`.               |
| `MediaStream` | `getUserMedia`/`getDisplayMedia` permission granted by the user.           |

---

## CSP prerequisites

At minimum, allow the media origins:

```text
media-src 'self' https://cdn.example.com blob: data:;
img-src 'self' https://cdn.example.com data: blob:;
frame-src https://www.youtube.com https://player.vimeo.com;
connect-src 'self' https://cdn.example.com https://api.example.com;
```

`style-src 'unsafe-inline'` is only needed for the light-DOM `inject-styles`
path in browsers that do not support constructable stylesheets. Shadow DOM
injection uses a `<style>` element inside the shadow root.

See [Security](./security.md) for the full threat model.

---

## Optional tooling

| Tool           | Why you might add it                                |
| -------------- | --------------------------------------------------- |
| Playwright     | Browser-mode tests and visual checks.               |
| Vitest         | Unit tests around player state and feature helpers. |
| TypeDoc        | API HTML from the published `.d.ts`.                |
| Changesets     | Release notes and version bumps.                    |
| publint / attw | Validate the package export map and types.          |

---

## What is _not_ required

- No runtime framework.
- No CSS preprocessor.
- No icon library.
- No analytics SDK.
- No backend.
- No DRM/EME stack (DRM is out of scope in `0.0.1`).
- No ad SDK (the ad contract is a stub).
- No service worker.

**Next:** [Installation](./installation.md) · [Quick start](./quick-start.md)

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)