# Multi-format upload inbox

> [Examples home](../README.md) › [Use cases](./README.md) › Multi-format upload inbox

## Problem

Operators drop video, audio and image files and need immediate preview without a server round-trip.

## What you will build

A drag-and-drop inbox that loads the File directly, shows kind-specific controls and rejects unsupported containers before upload.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | Blob/File |
| Feature | Kind detection |
| Server | Your upload API |

## Flow

```text
drop → File → player.load(file) → preview → upload
```

## Step by step

1. Read `file.type` and reject `video/x-matroska` early.
2. `player.load(file)`.
3. Branch on `player.state.kind` for copy.
4. Upload only after the user confirms.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({ container: host, controls: "native" });
const input = document.querySelector<HTMLInputElement>("#file")!;

input.addEventListener("change", () => {
  const file = input.files?.[0];
  if (!file) return;
  if (file.type === "video/x-matroska") {
    status.textContent = "MKV preview is not supported; upload will be remuxed.";
    return;
  }
  void player.load(file);
});

player.on("loadedmetadata", () => {
  status.textContent = `${player.state.kind} · ${player.state.duration.toFixed(1)}s`;
});
```

## UX notes

Show the detected kind and a clear 'preview only' label. Do not claim every codec plays.

## Security and limits

Never trust the extension; the browser decoder is the boundary. Scan server-side.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| empty MIME | media-error on playback | Fall back to extension or reject |
| huge file | slow decode | Warn and offer metadata-only preview |
| unsupported container | media-error | Remux server-side |

## Checklist

- [ ] Client and server MIME checks
- [ ] Object URL released
- [ ] No auto-upload on drop
- [ ] Progress UI

## Framework pages

[Vanilla](../vanilla/formats/blob.md) · [React](../react/formats/blob.md) · [Vue](../vue/formats/blob.md) · [Angular](../angular/formats/blob.md) · [Svelte](../svelte/formats/blob.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
