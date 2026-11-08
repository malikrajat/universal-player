# Offline-first local viewer

> [Examples home](../README.md) › [Use cases](./README.md) › Offline-first local viewer

## Problem

Field staff need to review downloaded media without a network.

## What you will build

A local-first viewer that plays File/Blob sources and stores only small preferences.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | Blob/File |
| Feature | Resume (optional) |
| Storage | IndexedDB (your code) |

## Flow

```text
download → IndexedDB/File → object URL → player
```

## Step by step

1. Store the media in IndexedDB or the File System Access API.
2. Wrap bytes in a `File` with an explicit type.
3. Load the File.
4. Disable analytics and remote captions when offline.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

// bytes come from IndexedDB or the File System Access API
const file = new File([bytes], "briefing.mp4", { type: "video/mp4" });
const player = createPlayer({ container: host, source: file, controls: "native", preload: "metadata" });
```

Set `File.type` explicitly. A type-less Blob is classified as video, which may be wrong.

## UX notes

Show offline status and storage usage. Do not promise background sync.

## Security and limits

Local files are untrusted input. Clear object URLs on teardown.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| type-less Blob | wrong kind | Set `File.type` |
| quota | n/a | Handle storage errors |
| no network | captions missing | Bundle VTT locally |

## Checklist

- [ ] Explicit MIME
- [ ] Object URL cleanup
- [ ] Offline captions
- [ ] No analytics

## Framework pages

[Vanilla](../vanilla/formats/blob.md) · [React](../react/formats/blob.md) · [Vue](../vue/formats/blob.md) · [Angular](../angular/formats/blob.md) · [Svelte](../svelte/formats/blob.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
