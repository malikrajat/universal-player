# URL, auth and CORS

> [Examples home](../README.md) › [Recipes](./README.md) › URL, auth and CORS

## What it solves

Play a signed or cookie-protected URL and understand CORS failures.

## Setup

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
const player = createPlayer({
  container: host,
  source: "/media/clip.mp4",
  crossOrigin: "use-credentials",
  controls: "native",
});
```

## Why it works

Media fetches follow normal browser CORS/cookie rules. `crossOrigin` sets the attribute; it does not add headers.

## Edge cases

- CORS failures look like `media-error`.
- Signed URLs expire.
- HLS needs CORS on manifests and segments.

## Failure cases

| Failure | Code |
| --- | --- |
| 403/404 | `media-error` |
| fatal HLS | `network-error` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
