# Custom chrome

> [Examples home](../README.md) › [Recipes](./README.md) › Custom chrome

## What it solves

Build your own control bar from state.

## Setup

```ts
// `player` is an existing UniversalPlayer instance.
```

## Copy-paste code

```ts
player.on("statechange", (state) => {
  playButton.textContent = state.playing ? "Pause" : "Play";
  seek.value = String(state.currentTime);
  seek.max = String(state.duration);
});

playButton.addEventListener("click", () => {
  void (player.state.playing ? Promise.resolve(player.pause()) : player.play());
});
```

## Why it works

Headless players render media only. State and methods are the complete contract.

## Edge cases

- No keyboard shortcuts are included.
- No gestures.
- You must handle focus and ARIA.

## Failure cases

| Failure | Code |
| --- | --- |
| no media | `invalid-state` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
