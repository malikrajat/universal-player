# Performance issues

> [Docs home](../README.md) › [Troubleshooting](./performance-issues.md) › Performance issues

## Symptom: page feels sluggish with a player

Causes: multiple live players, a hidden player still decoding, an embed iframe on load, huge images.

Fixes:

1. Destroy off-screen players.
2. Lazy-load embeds on interaction.
3. Use `preload: "none"` for below-the-fold media.
4. Serve sized images.
5. Avoid re-creating the player on every framework render.

## Symptom: timeupdate-driven React renders are heavy

The hook already separates `timeupdate` from `statechange`, but every tick still calls `setState`. Throttle your own UI:

```ts
let last = 0;
player.on("timeupdate", ({ currentTime }) => {
  const now = performance.now();
  if (now - last < 250) return;
  last = now;
  setTime(currentTime);
});
```

## Symptom: HLS memory grows

hls.js keeps a 90-second back buffer by configuration. Long sessions with many quality switches still cost memory. Re-create the player on route change; do not keep it in a global.

## Symptom: first frame is slow

Use a poster, `preload: "metadata"`, and a fast manifest. The player does not pre-warm connections.

## Measurement

Measure in the browser; there are no package metrics. Do not claim a bundle budget.

**Canonical guide:** [Performance](../guides/performance-optimization.md)

---

← Previous: [Common errors](./common-errors.md) · Next: [SSR issues](./ssr-issues.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
