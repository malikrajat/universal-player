# Reference index

> [Docs home](../README.md) › [Reference](./README.md) › Reference index

This is the lookup section. Every table is derived from source, not from aspiration.

| Page | What it answers |
| --- | --- |
| [Core API](./api-core.md) | `UniversalPlayer`, options, methods, state, events, source helpers, errors |
| [Format and engine API](./api-formats.md) | The internal engine contract and each provider's behaviour |
| [Universal formats](./api-universal-formats.md) | Blob/File, MediaStream, data URLs, chunked sources, arrays |
| [Feature APIs](./api-features.md) | Captions, chapters, playlist, quality, survey, resume, analytics |
| [UI and framework APIs](./api-ui-and-frameworks.md) | Element attributes/methods and the four framework adapters |
| [Errors](./errors.md) | The nine stable codes, causes, recovery |
| [Browser support](./browser-support.md) | Build floor versus actually executed browsers |
| [Format matrix](./formats-matrix.md) | Per-format status, capabilities, verification level |

## Public subpaths

| Subpath | Runtime exports | Built-in UI |
| --- | --- | --- |
| `@codewithrajat/universal-player` | see [API index](../API.md) | yes (side effect) |
| `@codewithrajat/universal-player/core` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/ui` | see [API index](../API.md) | yes (side effect) |
| `@codewithrajat/universal-player/vanilla` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/react` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/vue` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/angular` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/svelte4` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/svelte5` | see [API index](../API.md) | no |
| `@codewithrajat/universal-player/styles.css` | see [API index](../API.md) | n/a |
| `@codewithrajat/universal-player/package.json` | see [API index](../API.md) | n/a |

## Source ownership rules

| Source | Owner | Release |
| --- | --- | --- |
| URL string / structured URL | Caller | Nothing |
| `Blob` / `File` | Player-created object URL | Replace/destroy |
| `ChunkedSource` | Player (MSE or Blob URL) | Engine destroy |
| `MediaStream` | Caller | Stop tracks yourself |
| Array | Player playlist | Destroy |

## Lifecycle states

`idle → loading → ready → playing → paused → ended` and `error` from any load/playback failure. `ready` is set after metadata; `playing` after the `play` event.

## Adapter capabilities

| Provider | play | seek | volume | rate | PiP | text tracks | audio tracks | quality | live |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| native | yes | yes | yes | yes | yes | yes | yes | no | yes |
| chunked | yes | yes | yes | yes | yes | yes | yes | no | yes |
| hls | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| dash | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| image | no | no | no | no | no | no | no | no | no |
| youtube | yes | yes | yes | yes | no | no | no | configured | yes |
| vimeo | yes | yes | yes | yes | no | no | no | configured | yes |
| generic-embed | declared | declared | declared | declared | no | no | no | no | yes |

"Declared" for generic embeds means the capability object says yes while the provider bridge posts nothing.

## Defaults and limits

The full table is [Defaults](../defaults.md). The most consequential limits: volume 0–1, rate 0.25–4, image zoom 0.25–8, resume minimum duration 30 s, UI idle delay minimum 500 ms, HLS back buffer 90 s.

## Errors

Nine codes: `invalid-argument`, `invalid-state`, `unsupported-source`, `unsupported-environment`, `network-error`, `media-error`, `aborted`, `destroyed`, `not-implemented`. See [Errors](./errors.md).

## Peer dependencies

All optional: `hls.js`, `dashjs`, `rxjs`, `react`, `vue`, `@angular/core`, `svelte`. See [Peer dependencies](../peer-dependencies.md).

## Browser build floor versus executed browsers

Build target ES2023. Declared floor Chrome/Edge 125+, Firefox 128+, Safari 18+. Executed test: Chromium (Playwright) only. See [Browser support](./browser-support.md).

**Next:** [Core API](./api-core.md)

---

Next: [Core API](./api-core.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
