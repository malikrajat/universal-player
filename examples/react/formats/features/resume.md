# Resume playback in React

> [Examples home](../../../README.md) › [React](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Resume playback

Resume stores the current position and restores it after metadata. Storage failures are swallowed by design.

## Entry point

`resume` option, `restoreResume`, `saveResume`; `createResumeStore` helper

## Basic example

```ts
createPlayer({
  container: host,
  source: "/media/sample.mp4",
  controls: "native",
  resume: { enabled: true, minDuration: 60 },
});
```

## React integration

This feature is framework-neutral; the React wrapper only owns lifecycle.

Full UI wrapper: see [React README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- Best-effort. Disabled by default. Positions shorter than `minDuration` are not saved. It is not a cross-device progress service.
- Defaults: `enabled: false`, `minDuration: 30`, key `universal-player:<url>`
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

[React formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)

---

**Docs home** · [Documentation index](../../../../docs/README.md) · [Summary](../../../../docs/SUMMARY.md)
