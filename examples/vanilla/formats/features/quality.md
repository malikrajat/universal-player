# Quality selection in Vanilla

> [Examples home](../../../README.md) › [Vanilla](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Quality selection

Quality is engine-driven. HLS exposes level indexes, DASH exposes representation indexes, and embeds pass the configured ids through.

## Entry point

`qualities` option, `setQuality`, `state.qualities`, `qualitychange`

## Basic example

```ts
player.on("loadedmetadata", () => console.log(player.state.qualities));
player.setQuality(null); // auto
player.setQuality(player.state.qualities[0]?.id ?? null);
```

## Vanilla integration

Quality depends on the engine, not the framework. Headless Vanilla surfaces can call `setQuality`; the built-in UI adds the menu.

Full UI wrapper: see [Vanilla README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- `setQuality(null)` means automatic. There is no ABR UI beyond the settings menu and `[`/`]`. Native MP4 has no quality ladder.
- Defaults: `[]`; auto quality is `null`
- The feature does not apply to embeds or images.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| invalid-argument | `invalid-argument` | Fix the config/data |

## Checklist

- [ ] Required data supplied.
- [ ] UI track chosen for the overlay/controls.
- [ ] Error path handled.
- [ ] Teardown/reload behaviour checked.

## Related

[Vanilla formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)
