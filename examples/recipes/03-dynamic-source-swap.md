# Dynamic source swap

> [Examples home](../README.md) › [Recipes](./README.md) › Dynamic source swap

## What it solves

Replace media without recreating the player.

## Copy-paste code

```ts
await player.load("/a.mp4");
await player.load("/b.mp4");
```

## Why it works

A newer `load()` invalidates the older sequence and destroys the old engine.

## Edge cases

- Use `sourceToken` in frameworks.
- Object URLs are revoked on replace.
- The playlist index does not change on plain `load()`.

## Failure cases

| Failure | Code |
| --- | --- |
| load after destroy | `destroyed` |
| empty list | `invalid-argument` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
