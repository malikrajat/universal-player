# Download workaround

> [Examples home](../README.md) › [Recipes](./README.md) › Download workaround

## What it solves

Offer a download action only when allowed.

## Copy-paste code

```ts
createPlayer({
  container: host,
  source,
  ui: { download: { enabled: true, filename: "briefing.mp4", kinds: ["video"] } },
});
```

## Why it works

The built-in UI creates an `<a download>` link.

## Edge cases

- It cannot bypass CORS or rights.
- It is UI-only; headless consumers must implement it.
- `saveAs` defaults to a new tab.

## Failure cases

| Failure | Code |
| --- | --- |
| download hidden | `n/a` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
