# Quality and adaptation

> [Examples home](../README.md) › [Recipes](./README.md) › Quality and adaptation

## What it solves

Expose a quality menu for HLS/DASH.

## Copy-paste code

```ts
player.on("loadedmetadata", () => {
  console.log(player.state.qualities);
});
player.setQuality(null); // auto
player.setQuality(player.state.qualities[0]?.id ?? null);
```

## Why it works

HLS/DASH expose ladders; `null` means automatic.

## Edge cases

- Native MP4 has no ladder.
- Embeds only show configured qualities.

## Failure cases

| Failure | Code |
| --- | --- |
| unknown id | `no-op` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
