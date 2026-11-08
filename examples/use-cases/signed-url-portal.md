# Signed-URL media portal

> [Examples home](../README.md) › [Use cases](./README.md) › Signed-URL media portal

## Problem

Media must not be hot-linkable and the portal needs graceful expiry handling.

## What you will build

A signed-URL player that refreshes tokens and explains expiry without exposing DRM claims.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | MP4/HLS |
| Feature | Error recovery |
| Auth | Your API |

## Flow

```text
session → signed URL (short TTL) → player → expiry → refresh → retry
```

## Step by step

1. Fetch a signed URL per playback session.
2. On `media-error` or `network-error`, refresh once and `retry()`.
3. Never log the signed URL.
4. Explain that this is access control, not DRM.

## Copy-paste code

```ts
import { createPlayer, isPlayerError } from "@codewithrajat/universal-player/core";

let attempts = 0;
const player = createPlayer({ container: host, controls: "native" });

async function load() {
  const url = await fetch("/api/assets/42/url").then((r) => r.json()).then((d) => d.url);
  await player.load(url);
}

player.on("error", async ({ error }) => {
  if (!isPlayerError(error)) return;
  if (attempts++ >= 2) return showExpired();
  if (error.code === "media-error" || error.code === "network-error") await load();
});

await load();
```

## UX notes

Show 'session expired' rather than a raw media error.

## Security and limits

URLs are bearer tokens. Short TTL, referrer policy, no analytics leakage.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| 403 | media-error | Refresh the URL |
| fatal HLS 403 | network-error | Refresh manifest URL |
| refresh loop | n/a | Cap retries |

## Checklist

- [ ] TTL
- [ ] Retry cap
- [ ] No URL logging
- [ ] No DRM claim

## Framework pages

[Vanilla](../vanilla/formats/mp4.md) · [React](../react/formats/mp4.md) · [Vue](../vue/formats/mp4.md) · [Angular](../angular/formats/mp4.md) · [Svelte](../svelte/formats/mp4.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
