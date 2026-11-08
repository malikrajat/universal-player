# Chapters and review notes

> [Examples home](../README.md) › [Recipes](./README.md) › Chapters and review notes

## What it solves

Capture a note at the current time and seek back.

## Copy-paste code

```ts
const at = player.state.currentTime;
notes.push({ at, text });
// later
player.seek(note.at);
```

## Why it works

State is the source of truth for the current position.

## Edge cases

- `timeupdate` drives state but not `statechange`.
- Clamp on load.

## Failure cases

| Failure | Code |
| --- | --- |
| no media | `invalid-state` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
