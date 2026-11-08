# Survey, feedback, review and quiz in Vanilla

> [Examples home](../../../README.md) › [Vanilla](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Survey, feedback, review and quiz

Surveys are a core feature with a built-in panel. They can be triggered at the end, at a timestamp, or manually, and can gate playlist auto-advance.

## Entry point

`survey` option, `setSurvey`, `openSurvey`, `submitSurvey`, `skipSurvey`, `closeSurvey`, `retakeSurvey`; presets from the root entry

## Basic example

```ts
player.setSurvey({
  kind: "feedback",
  trigger: "ended",
  questions: [{ id: "score", type: "rating", label: "Score", max: 5, required: true }],
});
```

## Vanilla integration

The survey **overlay** is built-in UI only. In a headless Vanilla surface, the core can still run surveys (`openSurvey`, `submitSurvey`), but you must render the form yourself. The element has the panel.

Full UI wrapper: see [Vanilla README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- No built-in backend. Persistence is localStorage for `once`; callbacks are fire-and-forget and isolated. The headless core can run surveys, but there is no UI without the custom element.
- Defaults: `trigger: "ended"`, `once: true`, `submitMode: "manual"`, `required: false`
- The feature does not apply to embeds or images.

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

[Vanilla formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)
