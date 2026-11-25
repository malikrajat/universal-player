# Multiple players

> [Examples home](../README.md) › [Recipes](./README.md) › Multiple players

## What it solves

Run independent players on one page.

## Setup

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
const a = createPlayer({ container: hostA, source: aSrc, controls: "native" });
const b = createPlayer({ container: hostB, source: bSrc, controls: "native" });
```

## Why it works

Each instance owns its state, engine and listeners.

## Edge cases

- Destroy each one.
- Do not share options objects that you mutate.
- Only one can own fullscreen at a time.

## Failure cases

| Failure | Code |
| --- | --- |
| leak | `n/a` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
