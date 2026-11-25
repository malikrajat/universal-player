# Start here

> [Examples home](./README.md) › Start here

## The five-step mental model

1. **A source is normalised.** URL, structured object, `Blob`/`File`, `MediaStream`, chunked source or array.
2. **A provider is chosen internally.** `native`, `chunked`, `hls`, `dash`, `image`, `youtube`, `vimeo`, `generic-embed`.
3. **An engine mounts one surface.** `<video>`, `<audio>`, `<img>` or `<iframe>`.
4. **A player owns state and events.** `UniversalPlayer` exposes an immutable `PlayerState` and 29 events.
5. **A UI is optional.** `<universal-player>` is the only surface that draws the built-in control bar.

## Install

```bash
npm install @codewithrajat/universal-player
```

Equivalents: `pnpm add @codewithrajat/universal-player`, `yarn add @codewithrajat/universal-player`, `bun add @codewithrajat/universal-player`.

Published on npm as `@codewithrajat/universal-player@0.0.1`; `npm view @codewithrajat/universal-player version` returns `0.0.1`.

## Do I create an adapter or engine?

No. You create a **player** or render the **element**. Engine selection is internal and there is no public registry. "Adapter" in these docs means a framework wrapper (`/react`, `/vue`, etc.) or the internal engine adapter; neither is a plugin API.

## Pick a framework

| Framework | Full UI | Headless |
| --- | --- | --- |
| Vanilla | `<universal-player>` | `mountUniversalPlayer()` / `createPlayer()` |
| React | `<universal-player>` after `/ui` | `<UniversalPlayer source={...} />` |
| Vue | `<universal-player>` after `/ui` | `<UniversalPlayer src="..." />` |
| Angular | `<universal-player>` + `CUSTOM_ELEMENTS_SCHEMA` | `AngularUniversalPlayer` |
| Svelte | `<universal-player>` after `/ui` | `/svelte4` or `/svelte5` |

## Pick a rendering track

| Track | Result | Use when |
| --- | --- | --- |
| Full UI | Control bar, menus, gestures, captions UI, survey panel | You want a finished player |
| Native controls | Browser controls, no custom chrome | You want minimal code |
| Custom chrome | Your buttons + `player.state` + methods | You have a design system |

## Pick a source

```ts
await player.load("/media/clip.mp4");                  // URL
await player.load(file);                               // File/Blob
await player.load(stream);                             // MediaStream
await player.load({ kind: "video", type: "video/mp4", chunks: () => iterable }); // chunked
await player.load(["/a.jpg", "/b.jpg"]);               // array → playlist
```

## Pick a format path

| Input | Page |
| --- | --- |
| MP4/WebM | [vanilla/formats/mp4.md](./vanilla/formats/mp4.md) |
| HLS | [vanilla/formats/hls.md](./vanilla/formats/hls.md) |
| DASH | [vanilla/formats/dash.md](./vanilla/formats/dash.md) |
| Audio | [vanilla/formats/mp3.md](./vanilla/formats/mp3.md) |
| Images | [vanilla/formats/jpg.md](./vanilla/formats/jpg.md) |
| YouTube/Vimeo | [vanilla/formats/youtube.md](./vanilla/formats/youtube.md) |
| Chunked | [vanilla/formats/chunked.md](./vanilla/formats/chunked.md) |
| Full matrix | [format-matrix.md](./format-matrix.md) |

## Pick a feature

| Feature | Page |
| --- | --- |
| Captions | [shared/features.md#captions](./shared/features.md#captions) |
| Chapters | [shared/features.md#chapters](./shared/features.md#chapters) |
| Playlist | [shared/features.md#playlist](./shared/features.md#playlist) |
| Quality | [shared/features.md#quality](./shared/features.md#quality) |
| Survey/quiz | [shared/features.md#survey](./shared/features.md#survey) |
| Resume/analytics | [reference APIs](../docs/reference/api-features.md) |

## Handle failures

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";

player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  switch (error.code) {
    case "network-error":
    case "media-error":
      showRetry();
      break;
    case "unsupported-environment":
      showFallback();
      break;
    default:
      report(error);
  }
});
```

## Clean up

```ts
player.destroy();
```

Framework wrappers do it for you. Manual mounts do not.

## Three rules to remember

1. Only `<universal-player>` draws the built-in UI.
2. Errors are branched by `code`, never by message.
3. The player does not transcode, parse metadata or enforce DRM.

## What is not supported

PDF/Office/EPUB, OCR, DRM, SSR rendering, a plugin registry, a Chromecast SDK, VAST/IMA ads, WebXR rendering, CommonJS, embedded chapter/thumbnail extraction.

## Which path should I take?

| Goal | Path |
| --- | --- |
| Fastest demo | [vanilla/basic-usage.md](./vanilla/basic-usage.md) |
| React app | [react/README.md](./react/README.md) |
| HLS production | [recipes/10-hls-dash.md](./recipes/10-hls-dash.md) |
| Design-system chrome | [recipes/04-custom-chrome.md](./recipes/04-custom-chrome.md) |
| Upload intake | [use-cases/upload-intake.md](./use-cases/upload-intake.md) |
| Compliance | [use-cases/compliance-archive.md](./use-cases/compliance-archive.md) |

## Conventions used in examples

- TypeScript + ESM unless the file is HTML/Vue/Svelte.
- `host` is an `HTMLElement` you already resolved.
- `source` is a placeholder for a URL or structured source.
- `controls: "native"` marks a headless example that still has browser controls.
- Every session example calls `destroy()`.

## Next

[Learning paths](./learning-paths.md) · [Architecture](./architecture.md) · [API matrix](./api-matrix.md)

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
