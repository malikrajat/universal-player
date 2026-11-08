# Edge cases

> [Docs home](../README.md) › [Examples](./edge-cases.md) › Edge cases

## Source ambiguities

```ts
// .ogg is classified as video; force audio
await player.load({ kind: "audio", src: "/voice.ogg" });

// A type-less Blob falls back to video
await player.load(new Blob([bytes])); // likely wrong
await player.load(new File([bytes], "clip.mp4", { type: "video/mp4" }));
```

## Reloading a chunked source

```ts
// Wrong: a one-shot iterator is consumed after the first load
await player.load({ kind: "video", type: "video/mp4", chunks: iterator });

// Right: a factory returns a fresh iterator each time
await player.load({ kind: "video", type: "video/mp4", chunks: () => makeIterator() });
```

## Load races

```ts
void player.load("/slow.mp4").catch(() => {});
await player.load("/fast.mp4"); // the slow result is discarded
```

## Playlist gating

```ts
player.setPlaylist({ items, requireCompletion: true });
await player.next(); // throws invalid-state until the current item ends
```

## Destroy races

```ts
player.destroy();
player.play(); // throws { code: "destroyed" }
```

## Image as playlist

```ts
player.setPlaylist({ items: images, autoAdvance: true });
// Only advances when image.slideDuration is set on the player options.
```

**Canonical guide:** [Troubleshooting](../troubleshooting.md) · [Example book](../../examples/README.md)

---

← Previous: [Accessibility example](./accessibility.md) · Next: [Enterprise example](./enterprise.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
