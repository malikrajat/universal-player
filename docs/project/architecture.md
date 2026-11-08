# Architecture

> [Docs home](../README.md) › [Project](./architecture.md) › Architecture

## Layers

```text
┌─────────────────────────────────────────────────────────────┐
│ UI: <universal-player> (element.ts, styles.css, i18n, icons) │
├─────────────────────────────────────────────────────────────┤
│ Adapters: React · Vue · Angular · Svelte · vanilla           │
├─────────────────────────────────────────────────────────────┤
│ Core: UniversalPlayer · state · events · source · errors     │
├─────────────────────────────────────────────────────────────┤
│ Engines: native · image · chunked · hls · dash · embeds      │
├─────────────────────────────────────────────────────────────┤
│ Browser APIs: media elements, MSE, iframes, fullscreen, PiP  │
└─────────────────────────────────────────────────────────────┘
```

Dependencies point downward. `src/core` does not import the UI, a framework or a streaming SDK. `src/ui` imports the core and feature helpers, never an engine.

## Source normalisation

`normalizeSource()` decides kind and provider once. Every downstream branch uses `NormalizedSource`; no engine re-parses the URL.

## Engine selection

`src/core/engines.ts` switches on `provider`. It statically imports every adapter. Optional SDKs are lazy inside the adapter. There is no registry.

## State flow

```text
engine event → #emitEvent → #applyEventToState → #setState → statechange
                              └→ event bus → on/once/observe
                              └→ options.onEvent
                              └→ DOM CustomEvent
```

`timeupdate` and `progress` update state without emitting a second `statechange`.

## UI flow

The element subscribes to `statechange`, `timeupdate`, `progress` and `error`, then renders labels, visibility, time, buffered, chapters, menus, survey and error overlay. It never calls engine internals.

## Build

Vite+ `vp pack` emits unbundled ESM per entry with declarations and source maps; CSS and Svelte sources are copied. `sideEffects` is limited to CSS and the two registering entries.

## Constraints

- Browser-only at runtime.
- No SSR renderer.
- No plugin registry.
- No DRM.
- No dependency on a UI framework in the core.

**Next:** [Project structure](./project-structure.md)

---

← Previous: [Format matrix](../reference/formats-matrix.md) · Next: [Project structure](./project-structure.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
