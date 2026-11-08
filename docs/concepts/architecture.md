# Architecture

> [Docs home](../README.md) › [Concepts](./architecture.md) › Architecture

The architecture is a strict dependency ladder: UI → adapters → core → engines → browser APIs. Nothing points upward.

## Responsibilities

| Layer | Owns | Must not own |
| --- | --- | --- |
| Core | Source normalisation, state, events, playlist, survey, resume | DOM chrome, framework code, SDK imports |
| Engines | Media element/iframe, native events, quality/track discovery | UI, global state |
| UI | Control bar, menus, survey panel, theming | Engine internals |
| Adapters | Mount/unmount, source change, framework reactivity | Playback logic |

## Why the UI is separate

Headless consumers need a stable playback contract without inheriting a design system. The custom element is an optional layer that consumes the same public state.

## Provider selection is not extensible

`createEngine()` switches on a closed union. There is no registry. Adding a provider is a maintainer change, not a consumer plugin.

**Canonical guide:** [Architecture (root)](../architecture.md) · [Project architecture](../project/architecture.md)

---

← Previous: [Concepts index](./lifecycle.md) · Next: [Lifecycle](./lifecycle.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
