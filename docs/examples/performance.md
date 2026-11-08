# Performance example

> [Docs home](../README.md) › [Examples](./performance.md) › Performance example

## One player, many sources

```ts
const player = createPlayer({ container: host, controls: "native" });
await player.load("/a.mp4");
await player.load("/b.mp4"); // reuses the instance, replaces the engine
```

## Deferred embed

```ts
const player = createPlayer({ container: host, controls: "native" });

const observer = new IntersectionObserver(async ([entry]) => {
  if (entry?.isIntersecting) {
    observer.disconnect();
    await player.load({ kind: "embed", provider: "youtube", src: youtubeUrl });
  }
});
observer.observe(host);
```

## Preload policy

```ts
createPlayer({ container: host, source, preload: "none", poster: "/poster.jpg" });
```

## Teardown

```ts
window.addEventListener("pagehide", () => player.destroy(), { once: true });
```

## What not to do

- Do not create a player per render.
- Do not keep hidden players alive in a long SPA.
- Do not assume a numeric bundle budget; none is enforced.

**Canonical guide:** [Performance](../performance-optimization.md) · [Performance issues](../troubleshooting/performance-issues.md)

---

← Previous: [Integrations](./integrations.md) · Next: [Theming overview](../theming/overview.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
