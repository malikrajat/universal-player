# Performance model

> [Docs home](../README.md) › [Concepts](./performance-model.md) › Performance model

The cost model has four buckets: bundle, media fetch, decode, and framework renders.

## Bundle

- All engine adapters are statically imported by `src/core/engines.ts`.
- Optional SDKs (`hls.js`, `dashjs`) are lazy inside engines.
- The root entry adds the UI, CSS and feature helpers.
- There is no byte budget in the repo.

## Media fetch

- Native: browser-controlled range requests.
- HLS: manifest + segments; `backBufferLength: 90`.
- DASH: manifest + segments; ABR controlled by dash.js.
- Chunked: your iterator controls pacing; MSE appends sequentially.
- Embeds: full third-party player document.

## Decode

Browser/hardware. The player never transcode.

## Framework renders

`statechange` is not emitted for `timeupdate`/`progress`, but the player updates its internal state. Adapters subscribe to `timeupdate` separately because a full state replacement on every tick would be expensive.

## Levers

1. Use `/core` or a single adapter entry.
2. Lazy-load embeds on interaction.
3. Destroy off-screen players.
4. Use `preload: "none"` for below-the-fold.
5. Serve correctly sized images.

**Canonical guide:** [Performance](../performance-optimization.md) · [Optimization](../guides/optimization.md)

---

← Previous: [State management](./state-management.md) · Next: [API index](../api/components/rm-ng-pdf-viewer.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
