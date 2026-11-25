# Large files and performance

> [Examples home](../README.md) › [Recipes](./README.md) › Large files and performance

## What it solves

Reduce startup cost for long media.

## Setup

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
createPlayer({
  container: host,
  source,
  preload: "none",
  poster: "/poster.jpg",
  controls: "native",
});

// later, on intent
await player.play();
```

## Why it works

`preload: "none"` avoids fetching until needed.

## Edge cases

- The player does not transcode.
- HLS keeps a 90 s back buffer.
- Object URLs hold the blob.

## Failure cases

| Failure | Code |
| --- | --- |
| slow start | `n/a` |
| memory | `n/a` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
