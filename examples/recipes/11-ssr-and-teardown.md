# SSR and teardown

> [Examples home](../README.md) › [Recipes](./README.md) › SSR and teardown

## What it solves

Mount client-side and clean up on route change.

## Setup

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
"use client";
useEffect(() => {
  const player = createPlayer({ container: hostRef.current!, source, controls: "native" });
  return () => player.destroy();
}, []);
```

## Why it works

Construction needs a DOM; teardown releases engine, listeners and object URLs.

## Edge cases

- Do not import the element for its side effect on the server.
- Guard `document`.
- Avoid hydration assertions.

## Failure cases

| Failure | Code |
| --- | --- |
| document undefined | `ReferenceError` |
| destroyed | `destroyed` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
