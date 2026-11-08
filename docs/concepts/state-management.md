# State management

> [Docs home](../README.md) › [Concepts](./state-management.md) › State management

`PlayerState` is an immutable snapshot. The player replaces it on every meaningful transition; `timeupdate` and `progress` update it without a second `statechange`.

## Reading state

```ts
const state = player.state;
state.status;        // idle | loading | ready | playing | paused | ended | error
state.kind;          // video | audio | image | embed | null
state.capabilities;  // booleans advertised by the engine
state.currentTime;   // seconds
state.buffered;      // end of the last buffered range, seconds
state.error;         // Error | null
```

## Subscribing

| Style | Use |
| --- | --- |
| `player.on("statechange", fn)` | Render UI |
| `player.on("timeupdate", fn)` | High-frequency progress (state is updated, no `statechange`) |
| `player.observe(...)` | RxJS interop |
| `onStateChange` option | One callback without a subscription |

## Framework adapters

- React: `useState` + `statechange`; `timeupdate` patches only time fields.
- Vue: `shallowRef`; same patch strategy.
- Angular: `#state` + listener set + coalesced `markForCheck()`.
- Svelte: local `state` variable updated in the event handler.

## Mutability

Never mutate a snapshot. To change playback, call methods. Options getters are readonly; setters merge a new options object internally.

**Canonical guide:** [Core concepts](../core-concepts.md) · [API core](../reference/api-core.md)

---

← Previous: [Rendering](./rendering.md) · Next: [Performance model](./performance-model.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
