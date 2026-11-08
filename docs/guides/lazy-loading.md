# Lazy loading

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Lazy loading

## Lazy SDKs (built in)

HLS and DASH SDKs are loaded by their engines:

```ts
// inside the HLS adapter
const module = await import("hls.js");
```

You do not configure this. A missing peer fails at that point.

## Lazy the framework adapter

```tsx
const Player = lazy(() => import("./Player"));
```

```ts
// Next.js App Router
"use client";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("./Player"), { ssr: false });
```

## Lazy the custom element

```ts
let loaded = false;
async function ensurePlayer(): Promise<void> {
  if (!loaded) {
    await import("@codewithrajat/universal-player/ui");
    loaded = true;
  }
}
```

The import is idempotent: `defineUniversalPlayerElement()` returns `true` if the tag is already defined.

## Lazy an embed

```ts
const player = createPlayer({ container: host, controls: "native" });

observeOnce(host, async () => {
  await player.load({ kind: "embed", src: youtubeUrl, provider: "youtube" });
});
```

## Do not lazy the core per source

`/core` is one module graph. Import it once; switch sources with `load()`.

**Next:** [Accessibility](./accessibility.md)

---

← Previous: [Optimization](./optimization.md) · Next: [Accessibility](./accessibility.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
