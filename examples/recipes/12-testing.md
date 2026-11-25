# Testing

> [Examples home](../README.md) › [Recipes](./README.md) › Testing

## What it solves

Test routing, state and error recovery.

## Setup

```ts
import { normalizeSource } from "@codewithrajat/universal-player/core";
```

## Copy-paste code

```ts
import { normalizeSource } from "@codewithrajat/universal-player/core";

expect(normalizeSource("/a.m3u8").provider).toBe("hls");
expect(normalizeSource("/a.ogg").kind).toBe("video");
```

## Why it works

Pure helpers (normalise, errors, quality) test well in Node/jsdom. Media playback needs a browser.

## Edge cases

- jsdom does not decode media.
- Playwright can test Chromium.
- Do not assert third-party embed internals.

## Failure cases

| Failure | Code |
| --- | --- |
| flaky media | `timeouts` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
