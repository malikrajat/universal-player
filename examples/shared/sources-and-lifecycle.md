# Sources and lifecycle

> [Examples home](../README.md) › [Shared reference](./README.md) › Sources and lifecycle

## Source kinds

| Kind | Accepted | Notes |
| --- | --- | --- |
| URL string | yes | Host → MIME → extension → video fallback |
| Structured source | yes | Explicit `kind` and optional `type` |
| `Blob`/`File` | yes | Object URL; type decides kind |
| `MediaStream` | yes | `srcObject`; tracks yours |
| `ChunkedSource` | yes | MSE or Blob |
| Array | yes | Playlist/gallery |

## Ownership rules

| Input | URL owner | Release |
| --- | --- | --- |
| URL string | you | — |
| Blob/File | player | replace/destroy |
| Chunked | player | engine destroy |
| MediaStream | you | stop tracks |
| Array | player playlist | destroy |

## Load lifecycle

```text
load(input)
  ├─ increment sequence
  ├─ destroy previous engine
  ├─ close survey, clear timers/overrides
  ├─ revoke previous object URL (if replaced)
  ├─ emit loadstart (status: loading)
  ├─ create engine → engine.load()
  ├─ stale? destroy and return
  ├─ apply volume/muted/rate/startTime
  └─ loadedmetadata → status: ready
```

A newer load wins. The stale result is discarded silently (no `aborted` event).

## Metadata and progress

`loadedmetadata` carries `duration`, `width`, `height`, `live`. `timeupdate` updates state without `statechange`; `progress` updates `buffered`. `buffered` is the end of the last buffered range.

## Reload and retry

```ts
await player.load(source);
await player.retry(); // reloads the current source
```

There is **no password retry** because there is no password/encryption API. Signed-URL refresh is your code.

## Read-only

There is no read-only mode. Media is not editable; hide UI controls or omit your own chrome if you need a viewing-only surface. Images have no playback controls at all.

## Cancellation

No public `abort()`. Start a new load to cancel. `destroy()` cancels everything.

## Events

29 events; see [api-matrix](../api-matrix.md#events). `statechange` accompanies state writes; `chapterchange` fires when the active id changes.

## Locations

There is no location/scene/bookmark API. Use `seek()` and your own data model.

## Zoom and render state

- Video: you control container size; the UI uses 16:9.
- Image: the built-in UI has zoom/rotate; headless consumers apply CSS transforms.
- Embed: provider-controlled; you cannot style inside.

## Destroy checklist

- [ ] `destroy()` called once.
- [ ] Object URLs released (player does it).
- [ ] MediaStream tracks stopped (you).
- [ ] Timers/listeners in your code cleared.
- [ ] No method calls after destroy.

## Concurrency

Each player owns one engine. Two players can coexist; only one can be fullscreen. A load on player A does not affect player B.

## Lifecycle invariants

1. `loadstart` precedes all load events.
2. `loadedmetadata` precedes `canplay`.
3. State is replaced, never mutated.
4. Listener exceptions never break playback.
5. `destroy()` is idempotent; methods after it throw `destroyed`.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
