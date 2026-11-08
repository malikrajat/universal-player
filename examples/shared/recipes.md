# Framework-neutral recipes

> [Examples home](../README.md) › [Shared reference](./README.md) › Framework-neutral recipes

## File input and drag-and-drop

```ts
input.addEventListener("change", () => {
  const file = input.files?.[0];
  if (file) void player.load(file);
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) void player.load(file);
});
```

## Authenticated URL

```ts
const url = await fetchSignedUrl(assetId);
await player.load({ kind: "video", src: url, type: "video/mp4" });
```

CORS is server-side. `crossOrigin` sets the attribute, not headers.

## Multiple viewers

```ts
const players = hosts.map((host, i) => createPlayer({ container: host, source: sources[i], controls: "native" }));
// teardown
players.forEach((p) => p.destroy());
```

## Custom adapter

There is no public adapter API. If you mean a framework wrapper, write one around `UniversalPlayer`; if you mean an engine, it is a maintainer change.

## Custom UI/chrome

```ts
player.on("statechange", render);
player.on("timeupdate", renderTime);
```

## Labels, themes, prompts

- Built-in UI: `strings`, `registerLocale`, `theme`, `accent-color`, `ui.theme`.
- Headless: your own labels. There is no password prompt.

## Password retry

Not applicable: no password/encryption API. Retry signed URLs, not passwords.

## Download/print workaround

```ts
ui: { download: { enabled: true, filename: "clip.mp4" } }
```

There is no print API. The embed snippet from `getEmbedCode()` is the closest export.

## SSR/hydration

```ts
"use client";
useEffect(() => {
  const player = createPlayer({ container: ref.current!, source, controls: "native" });
  return () => player.destroy();
}, []);
```

## Testing

Test `normalizeSource`, `sourceToken`, error helpers and quality helpers in Node. Test playback in a browser. Do not assert embed internals.

## Memory/cleanup checklist

- [ ] `destroy()` on route change/unmount.
- [ ] Stop MediaStream tracks.
- [ ] Release your own image/thumbnail URLs.
- [ ] Remove global listeners.
- [ ] Cap analytics queues.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
