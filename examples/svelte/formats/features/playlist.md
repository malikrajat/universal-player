# Playlist and queue in Svelte

> [Examples home](../../../README.md) › [Svelte](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Playlist and queue

The playlist is owned by the core player. Setting it does not load an item by itself unless you use the constructor's playlist fallback or call `playPlaylistItem()`.

## Entry point

`playlist` option, `setPlaylist`, `playPlaylistItem`, `next`, `previous`, `setAutoAdvance`, `cancelAutoAdvance`

## Basic example

```ts
player.setPlaylist({
  items: [{ source: "/a.mp4", title: "A" }, { source: "/b.mp4", title: "B" }],
  autoAdvance: true,
  autoAdvanceDelay: 2,
});
await player.playPlaylistItem(0);
```

## Svelte integration

This feature is framework-neutral; the Svelte wrapper only owns lifecycle.

Full UI wrapper: see [Svelte README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- `autoAdvance` defaults to false. Completion gating uses `ended` or `currentTime >= duration - 0.25`. There is no server-side queue sync.
- Defaults: `startIndex: 0`, `autoAdvance: false`, `loop: false`, `allowNext/Previous: true`
- The feature may work with embeds only as declared.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| invalid-argument | `invalid-argument` | Fix the config/data |
| invalid-state | `invalid-state` | Check lifecycle/open state |

## Checklist

- [ ] Required data supplied.
- [ ] UI track chosen for the overlay/controls.
- [ ] Error path handled.
- [ ] Teardown/reload behaviour checked.

## Related

[Svelte formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)

---

**Docs home** · [Documentation index](../../../../docs/README.md) · [Summary](../../../../docs/SUMMARY.md)
