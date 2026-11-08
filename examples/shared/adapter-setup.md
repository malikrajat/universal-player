# Adapter and engine setup

> [Examples home](../README.md) › [Shared reference](./README.md) › Adapter and engine setup

## Install

```bash
pnpm install
pnpm build
pnpm add file:/absolute/path/to/universal-player
```

Optional peers:

```bash
pnpm add hls.js dashjs
```

## There is no adapter module to write

The "adapter" is selected internally from the source. You create a player or render the element:

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

export function createMedia(host: HTMLElement, source: string) {
  return createPlayer({
    container: host,
    source,
    controls: "native",
  });
}
```

That module is the closest thing to an adapter: one place that owns options, error policy and teardown.

## Minimal registries

None. There is no engine, plugin or feature registry. The only global registration is the custom element:

```ts
import { defineUniversalPlayerElement } from "@codewithrajat/universal-player/ui";

defineUniversalPlayerElement();           // <universal-player>
defineUniversalPlayerElement("my-player"); // custom tag
```

## Player/engine options

| Option | Applies to | Default |
| --- | --- | --- |
| `source` | all | — |
| `controls` | media element | `"custom"` (no chrome) |
| `preload` | native/HLS/DASH/chunked | `"metadata"` |
| `crossOrigin` | native/HLS/DASH/chunked | not set |
| `playsInline` | video | `true` |
| `autoplay`, `muted`, `loop` | media | `false` |
| `volume`, `playbackRate` | media | `1`, `1` |
| `startTime` | timeline | — |
| `live` | HLS/UI | `false` |
| `qualities` | HLS/DASH/embed | `[]` |
| `captions` | native/HLS/DASH/chunked | enabled/persist |
| `resume` | timeline | disabled |
| `analytics` | all | no-op without `onEvent` |

## Worker and engine assets

The package ships **no** workers, WASM, fonts or language packs. hls.js enables its own worker; dash.js manages its own. You do not configure asset paths.

## Detection and explicit ids

```ts
normalizeSource("/a.ogg");                    // kind: "video" (extension trap)
normalizeSource({ kind: "audio", src: "/a.ogg" }); // kind: "audio"
normalizeSource("https://youtu.be/VIDEO_ID"); // provider: "youtube"
```

Use a structured source when the extension is wrong or missing. The provider is not user-selectable beyond the `EmbedSource.provider` field.

## Ownership and cleanup

- `Blob`/`File` object URLs are player-owned and revoked on replace/destroy.
- `MediaStream` tracks are yours; stop them.
- Chunk iterables are consumed once; pass a factory to reload.
- Always call `destroy()` for manual mounts.

## Conversion/provider seam

There is no converter seam. If you need transcoding, do it server-side before the player sees the URL. Embeds are provider-specific; generic embeds are display-only.

## Optional feature assets

| Asset | Needed for |
| --- | --- |
| WebVTT files | Captions |
| Chapter/thumbnail data | Chapters, seek previews |
| Poster/artwork | Poster, share preview |
| Signed URL service | Protected media |
| Survey/analytics endpoint | Persistence (your code) |

## Tree-shaking and bundle boundaries

The core statically imports all engine adapters. The optional SDKs are lazy. The root entry adds the UI and feature helpers. Do not claim a byte budget.

## SSR import check

`/core` imports safely. Constructing a player does not. `/ui` registration returns `false` without `customElements`.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
