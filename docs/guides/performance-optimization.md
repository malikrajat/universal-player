# Performance

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Performance

## Bundle boundaries

| Import | Pulls in |
| --- | --- |
| `/core` | Core + all engine adapters (static imports in `engines.ts`) |
| `/ui` | Core + UI element + CSS |
| `/react` | Core + React wrapper (React is a peer) |
| `/vanilla` | Core only |
| root | Core + UI + vanilla + every feature helper |

Important: the **engine adapters are statically imported** by `src/core/engines.ts`. The optional *SDKs* (`hls.js`, `dashjs`) are lazy; the adapter modules themselves are not. There is no documented byte budget and no bundle-size test.

## Lazy SDKs

`hls.js` and `dashjs` are imported only inside their `load()`. An MP4-only bundle never fetches them, but the adapter wrapper code is already in the graph.

## Re-render traps

- React: the hook replaces state on every `statechange`; `timeupdate` patches only currentTime/duration/buffered. Do not create a new player per render.
- Vue: `shallowRef` avoids deep reactivity over the state snapshot.
- Angular: change detection is coalesced with `queueMicrotask` and `markForCheck()`.
- Svelte: the component assigns local state and lets Svelte update.

## Media cost

- `preload: "metadata"` is the default; use `"none"` for off-screen players.
- Object URLs for large `File`s keep the blob alive until replace/destroy.
- A chunked MediaSource append loop runs until the iterator ends; there is no abort API beyond `destroy()`.
- HLS uses `backBufferLength: 90` and `enableWorker: true`.

## Measurement

There is no instrumentation in the package. Measure with:

- PerformanceObserver / Long Tasks in your app.
- Chrome DevTools network panel for manifests/segments.
- `player.state.buffered` vs `duration` for buffer health.
- Your own analytics sink (six event types only).

Do not claim numeric bundle budgets from this repository; none are enforced.

**Next:** [Optimization](./optimization.md)

---

← Previous: [Best practices](./best-practices.md) · Next: [Optimization](./optimization.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
