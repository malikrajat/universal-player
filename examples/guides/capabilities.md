# Capabilities and choosing the right API

> [Examples home](../README.md) › [Production guides](./README.md) › Capabilities and choosing the right API

## Decision tables

### Full UI vs headless

| Need | Choose |
| --- | --- |
| Finished controls | `<universal-player>` |
| Browser controls | headless + `controls: "native"` |
| Design-system chrome | headless + state/events |

### Wrapper vs core

| Need | Choose |
| --- | --- |
| Framework lifecycle | `/react`, `/vue`, `/angular`, `/svelte*` |
| No framework | `/core` or `/vanilla` |
| Custom element | root or `/ui` |

### Native vs feature

| Need | Choose |
| --- | --- |
| Play/pause/seek | native |
| Captions | native text tracks |
| Quality | HLS/DASH |
| Survey | core + UI panel |
| Resume | core option |
| Analytics | `analytics.onEvent` |

### Adapter vs converter

There is no converter. Transcode server-side.

## Do not use X for Y

- Do not use `mountUniversalPlayer()` for the built-in UI.
- Do not use `/react` and expect controls.
- Do not use a generic embed and expect commands.
- Do not use a survey for legal signatures.
- Do not use resume as cross-device progress.
- Do not use MOV/MKV as web delivery formats.
- Do not use the package as a DRM layer.
- Do not use the ad stub in production.

## Related

[API matrix](../api-matrix.md) · [Format matrix](../format-matrix.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
