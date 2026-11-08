# Optimization

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Optimization

## Choose the smallest entry

```ts
// Smallest: core only
import { createPlayer } from "@codewithrajat/universal-player/core";

// Full UI
import "@codewithrajat/universal-player";
```

The root entry registers the element and re-exports every feature helper. Import it only when you want the built-in UI plus helpers.

## Tree-shaking

`sideEffects` is limited to CSS and the two element-registering entries. Feature helpers are plain exports. The core's engine adapters are statically imported, so "unused engine" elimination depends on the bundler's ability to drop unused switch branches — do not rely on it.

## Reuse one player for a playlist

```ts
player.setPlaylist({ items, autoAdvance: true });
await player.playPlaylistItem(0);
```

This avoids re-creating DOM, listeners and engines per item.

## Source identity

React/Vue/Angular use `sourceToken()`. Equivalent strings do not reload; equivalent object literals with the same fields do not reload; new `Blob`/`File` objects get new tokens.

## Images

Use correctly sized renditions. The image engine loads the original; the UI only applies CSS transforms.

## Embeds

An iframe is expensive. Load it on interaction if the embed is below the fold:

```ts
button.addEventListener("click", () => player.load(youtubeUrl), { once: true });
```

## Do not optimise what you have not measured

There are no numeric performance claims in this documentation. Measure your own page.

**Next:** [Lazy loading](./lazy-loading.md)

---

← Previous: [Performance](./performance-optimization.md) · Next: [Lazy loading](./lazy-loading.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
