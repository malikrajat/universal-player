# Error recovery

> [Examples home](../README.md) › [Recipes](./README.md) › Error recovery

## What it solves

Retry once and then show a fallback.

## Setup

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
let retried = false;
player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  if (!retried && (error.code === "network-error" || error.code === "media-error")) {
    retried = true;
    void player.retry().catch(console.error);
    return;
  }
  showFallback(error.code);
});
```

## Why it works

Branch on stable codes; `retry()` reloads the current source.

## Edge cases

- Autoplay rejection is not an error.
- `aborted` is reserved.
- Generic embed command failures are silent.

## Failure cases

| Failure | Code |
| --- | --- |
| retry loop | `n/a` |
| destroyed | `destroyed` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
