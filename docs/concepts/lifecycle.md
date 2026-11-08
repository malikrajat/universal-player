# Lifecycle

> [Docs home](../README.md) › [Concepts](./lifecycle.md) › Lifecycle

## States

```text
idle ──load()──► loading ──metadata──► ready ──play──► playing
                                         │              │
                                         └──pause───────┘
                                                        │
                                                      ended
any ──failure──► error
any ──destroy()──► idle (destroyed)
```

`ready` is set when metadata arrives. `playing` follows the media `play` event. `paused` follows `pause` unless `ended` is already true.

## Event order (successful native load)

| Order | Event | Payload |
| --- | --- | --- |
| 1 | `loadstart` | `{ source, kind }` |
| 2 | `loadedmetadata` | `{ duration, width, height, live }` |
| 3 | `durationchange` | `{ duration, live }` (may repeat) |
| 4 | `canplay` | — |
| 5 | `play` | — |
| 6 | `playing` | — |
| 7 | `timeupdate` | `{ currentTime, duration, buffered }` (repeats) |
| 8 | `ended` | — |

`statechange` accompanies state writes. `chapterchange` fires when the active chapter id changes. Playlist auto-advance is scheduled on `ended` after the survey decision.

## Cancellation

A newer `load()` invalidates the older sequence. The stale engine is destroyed; its events are ignored. There is no public `abort()`.

## Teardown

`destroy()` saves resume, aborts document listeners, destroys the engine, revokes the object URL, removes the stage, emits `destroy`, clears the bus. Later calls throw `destroyed`.

**Canonical guide:** [Core concepts](../core-concepts.md) · [State management](./state-management.md)

---

← Previous: [Architecture](./architecture.md) · Next: [Rendering](./rendering.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
