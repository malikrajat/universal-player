# Migration

> [Examples home](../README.md) › [Production guides](./README.md) › Migration

## From a plain `<video>`

| Plain | This library |
| --- | --- |
| `<video src controls>` | `<universal-player src controls="native">` or `controls: "native"` |
| `video.play()` | `player.play()` |
| `video.currentTime` | `player.seek(t)` / `state.currentTime` |
| `addEventListener("timeupdate")` | `player.on("timeupdate")` |
| Media error | `error.code` |

## From another player

1. Replace the player instance with `createPlayer` or the element.
2. Map source/config to `PlayerOptions`.
3. Map events to the 29 typed events.
4. Replace plugin/DRM assumptions (absent).
5. Re-test HLS/DASH with peers.

## From an earlier copy of this docs set

- Install from folder/tarball, not registry.
- Framework wrappers are headless.
- React prop is `source`.
- Entry count is 9 code entries.
- No focus trap.
- `.ogg` is video.

## Checklist

- [ ] UI track decided.
- [ ] Source shape mapped.
- [ ] Error codes handled.
- [ ] Peers installed.
- [ ] Teardown implemented.
- [ ] Browser matrix executed.

## Related

[docs/migration.md](../../docs/migration.md) · [Migration tree](../../docs/migration/v1-to-v2.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
