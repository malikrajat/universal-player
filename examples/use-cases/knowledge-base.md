# Knowledge-base media browser

> [Examples home](../README.md) › [Use cases](./README.md) › Knowledge-base media browser

## Problem

A docs site mixes tutorial videos, audio clips and diagrams in one article.

## What you will build

A lazy-mounted player per block, each with its own poster and captions.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | MP4, images |
| Feature | Captions |
| Framework | Any |

## Flow

```text
article → intersection observer → mount player → load → destroy when removed
```

## Step by step

1. Render a poster placeholder.
2. Mount on intersection.
3. Load the source.
4. Destroy when the block is removed.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const host = document.querySelector<HTMLElement>("#media-slot")!;
let player: ReturnType<typeof createPlayer> | null = null;

const observer = new IntersectionObserver(async ([entry]) => {
  if (!entry?.isIntersecting) return;
  observer.disconnect();
  player = createPlayer({ container: host, source: "/media/tutorial.mp4", controls: "native" });
  await player.play().catch(() => {});
});

observer.observe(host);
window.addEventListener("pagehide", () => player?.destroy(), { once: true });
```

## UX notes

Never autoplay with sound. Keep the transcript link next to audio.

## Security and limits

Captions are cross-origin assets; configure CORS. Images may be user-uploaded.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| CORS on VTT | no captions | Allow the docs origin |
| autoplay blocked | no error | Start on user gesture |
| many players | memory | Lazy mount + destroy |

## Checklist

- [ ] Poster for every block
- [ ] Captions CORS
- [ ] Transcript link
- [ ] Lazy mount

## Framework pages

[Vanilla](../vanilla/formats/mp4.md) · [React](../react/formats/mp4.md) · [Vue](../vue/formats/mp4.md) · [Angular](../angular/formats/mp4.md) · [Svelte](../svelte/formats/mp4.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
