# Training video with a quiz gate

> [Examples home](../README.md) › [Use cases](./README.md) › Training video with a quiz gate

## Problem

Compliance training must record a quiz attempt after the video ends.

## What you will build

A course player that opens a required quiz on end and prevents auto-advance until submitted.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | MP4 |
| Feature | Survey/quiz + playlist |
| Backend | Your LMS |

## Flow

```text
ended → surveyopen → submit → API → next item
```

## Step by step

1. Use the `quizFeedback` preset or a custom quiz.
2. Set `required: true` and `once: false` for retakes if needed.
3. Submit answers server-side.
4. Advance the playlist only after the API confirms.

## Copy-paste code

```ts
import { quizFeedback } from "@codewithrajat/universal-player";

const player = document.querySelector("universal-player")!.player!;
player.setSurvey({
  ...quizFeedback({ id: "safety-2026", required: true }),
  onSubmit: async (result) => {
    await fetch("/api/training/attempts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(result),
    });
  },
});
```

Score the quiz server-side. The client-side `correct` field is a learning aid, not an authority.

## UX notes

State the passing rule before playback. Do not imply legal certification.

## Security and limits

The quiz is client-side; validate and score server-side. Do not trust `correct` in the browser for high-stakes tests.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| required blocks close | n/a | Expected |
| validation | invalid-argument | Show field issues |
| retake disabled | n/a | Enable allowRetake |

## Checklist

- [ ] Server-side scoring
- [ ] Retake policy
- [ ] Accessibility of the form
- [ ] Completion record

## Framework pages

[Vanilla](../vanilla/formats/mp4.md) · [React](../react/formats/mp4.md) · [Vue](../vue/formats/mp4.md) · [Angular](../angular/formats/mp4.md) · [Svelte](../svelte/formats/mp4.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
