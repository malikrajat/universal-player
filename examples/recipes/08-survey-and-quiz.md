# Survey and quiz

> [Examples home](../README.md) › [Recipes](./README.md) › Survey and quiz

## What it solves

Open a feedback form at the end and submit to your API.

## Copy-paste code

```ts
player.setSurvey({
  kind: "feedback",
  trigger: "ended",
  questions: [{ id: "score", type: "rating", label: "Score", max: 5, required: true }],
  onSubmit: async (result) => {
    await fetch("/api/feedback", { method: "POST", body: JSON.stringify(result) });
  },
});
```

## Why it works

Survey callbacks are isolated; validation happens before submit.

## Edge cases

- Callbacks are fire-and-forget.
- `once` uses localStorage.
- No backend is included.

## Failure cases

| Failure | Code |
| --- | --- |
| validation | `invalid-argument` |
| no survey | `invalid-state` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
