# Integrations

> [Docs home](../README.md) › [Examples](./integrations.md) › Integrations

## HLS

```bash
pnpm add hls.js
```

```ts
player.load("https://cdn.example.com/master.m3u8");
player.on("loadedmetadata", () => console.log(player.state.qualities));
```

## DASH

```bash
pnpm add dashjs
```

```ts
player.load("https://cdn.example.com/manifest.mpd");
```

## YouTube / Vimeo

```ts
player.load({
  kind: "embed",
  provider: "youtube",
  src: "https://www.youtube.com/watch?v=VIDEO_ID",
});
```

## Uploads

```ts
input.addEventListener("change", () => {
  const file = input.files?.[0];
  if (file) void player.load(file);
});
```

## RxJS

```ts
import { toRxjsObservable } from "@codewithrajat/universal-player/core";

const state$ = await toRxjsObservable(player.observe("statechange"));
state$.subscribe((state) => console.log(state.status));
```

## Server-driven chunk stream

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => fetch("/api/asset/42").then((r) => r.body!),
});
```

**Canonical guide:** [Installation](../installation.md) · [Example book](../../examples/README.md)

---

← Previous: [Enterprise example](./enterprise.md) · Next: [Performance example](./performance.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
