# HLS and DASH

> [Examples home](../README.md) › [Recipes](./README.md) › HLS and DASH

## What it solves

Install the SDKs and load manifests.

## Setup

```ts
// `player` is an existing UniversalPlayer instance. Install hls.js/dashjs first.
```

## Copy-paste code

```ts
import "hls.js"; // install; the engine imports it lazily
await player.load("https://cdn.example.com/master.m3u8");
```

## Why it works

The adapters lazily import their SDKs and expose qualities.

## Edge cases

- Missing peers fail at load.
- No DRM.
- CORS on segments.

## Failure cases

| Failure | Code |
| --- | --- |
| missing peer | `media-error` |
| fatal HLS | `network-error` |
| HLS unsupported | `unsupported-environment` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
