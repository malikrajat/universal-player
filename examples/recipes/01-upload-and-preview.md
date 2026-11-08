# Upload and preview

> [Examples home](../README.md) › [Recipes](./README.md) › Upload and preview

## What it solves

Load a File and show a preview with the right kind.

## Copy-paste code

```ts
const input = document.querySelector<HTMLInputElement>("#file")!;
const player = createPlayer({ container: host, controls: "native" });

input.addEventListener("change", () => {
  const file = input.files?.[0];
  if (file) void player.load(file);
});
```

## Why it works

The player creates an object URL, detects the kind from `File.type`, and revokes the URL on replacement.

## Edge cases

- Empty `type` falls back to video.
- Huge files decode slowly.
- The player does not upload.

## Failure cases

| Failure | Code |
| --- | --- |
| unsupported container | `media-error` |
| object URL unavailable | `unsupported-environment` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
