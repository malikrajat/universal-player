# Performance

> [Examples home](../README.md) › [Production guides](./README.md) › Performance

## Bundle

| Import | Adds |
| --- | --- |
| `/core` | core + all engine adapters |
| `/ui` | core + element + CSS |
| `/react` | core + React wrapper |
| root | core + UI + vanilla + feature helpers |

Optional SDKs are lazy; adapter modules are static. No byte budget is enforced.

## Network

- Native: browser range requests.
- HLS: manifest + segments; 90 s back buffer; worker enabled.
- DASH: manifest + segments; dash.js ABR.
- Chunked: your iterator; sequential appends.
- Embed: full third-party document.

## Render

- `timeupdate` does not emit `statechange`.
- React/Vue patch time fields separately.
- Angular coalesces change detection.
- Do not create a player per render.

## Levers

1. Lazy-mount below-the-fold players.
2. `preload: "none"` + poster.
3. Destroy off-screen players.
4. Lazy-load embeds on interaction.
5. Serve sized images.
6. Reuse one player for a playlist.

## Measure

```ts
player.on("timeupdate", ({ currentTime, duration, buffered }) => {
  console.log({ currentTime, duration, bufferHealth: buffered - currentTime });
});
```

Use PerformanceObserver/Long Tasks and the network panel for the rest.

## Related

[Concepts: performance model](../../docs/concepts/performance-model.md) · [Performance issues](../troubleshooting/performance-issues.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
