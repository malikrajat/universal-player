# Image intake

> [Examples home](../README.md) › [Recipes](./README.md) › Image intake

## What it solves

Preview and inspect an uploaded image.

## Copy-paste code

```ts
await player.load(new File([bytes], "photo.png", { type: "image/png" }));
```

## Why it works

The image engine renders an `<img>` and emits `loadedmetadata` with natural size.

## Edge cases

- No play/seek.
- AVIF/WebP support varies.
- SVG is not inlined.

## Failure cases

| Failure | Code |
| --- | --- |
| decode failure | `media-error` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
