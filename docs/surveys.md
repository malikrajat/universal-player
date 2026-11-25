# Surveys

> [Docs home](./README.md) › Surveys

[← Docs](./README.md) · [API reference](./api-reference.md#survey-api)

In-player feedback, NPS, reviews and quizzes with validation, triggers and
presets.

---

## 1. Minimal survey

```ts
const player = createPlayer({
  container,
  source: "/clip.mp4",
  survey: {
    id: "post-watch",
    title: "How was the video?",
    trigger: "ended",
    questions: [
      {
        id: "liked",
        type: "radio",
        label: "Did you like it?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
    ],
    onSubmit: async (result) => {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.answers),
      });
    },
  },
});
```

---

## 2. Triggers

| Trigger             | When                                        |
| ------------------- | ------------------------------------------- |
| `"ended"` (default) | Media ends.                                 |
| `"manual"`          | Only `openSurvey()` / `setSurvey()` + call. |
| `number`            | At that many seconds.                       |
| `{ at: number }`    | Same, explicit.                             |

```ts
trigger: {
  at: 120;
}
```

`once` defaults to `true`; a second play does not reopen it.

---

## 3. Question types

| Type       | Purpose       | Key options                             |
| ---------- | ------------- | --------------------------------------- |
| `radio`    | Single choice | `options`, `allowOther`                 |
| `checkbox` | Multi choice  | `minSelections`, `maxSelections`        |
| `select`   | Dropdown      | `options`, `allowOther`                 |
| `text`     | Single line   | `minLength`, `maxLength`, `placeholder` |
| `textarea` | Long text     | `minLength`, `maxLength`                |
| `rating`   | Stars         | `max`                                   |
| `scale`    | Range         | `min`, `max`, `step`                    |

Common: `id`, `label`, `description`, `required`, `correct`, `explanation`,
`autoSubmit`.

---

## 4. Submission modes

| Mode               | Behaviour                                        |
| ------------------ | ------------------------------------------------ |
| `manual` (default) | Submit button.                                   |
| `on-select`        | Submit when required answers are selected.       |
| `on-complete`      | Submit when all required questions are answered. |

```ts
submitMode: "on-complete",
autoSubmitDelay: 0,
```

`autoSubmit: true` is shorthand for `on-select`.

---

## 5. Blocking and retakes

```ts
required: true,          // or blocking: true
allowSkip: false,
allowRetake: true,       // or allowResubmit: true
maxAttempts: 3,
```

- `required`/`blocking` hides skip/close and makes `closeSurvey()` a no-op.
- `allowRetake` shows a completion screen with **Retake**/**Done**.
- `retakeSurvey()` reopens and clears the `once` marker.
- `maxAttempts` caps retakes.

---

## 6. Quiz feedback

```ts
kind: "quiz",
instantFeedback: true,
questions: [
  {
    id: "q1",
    type: "radio",
    label: "2 + 2?",
    required: true,
    correct: "4",
    explanation: "Four.",
    options: [
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
  },
],
```

`correct` can be a string or an array for multi-select.

---

## 7. Presets

```ts
import {
  endOfVideoFeedback,
  netPromoterScore,
  contentFeedback,
  blockingReview,
  quizFeedback,
} from "@codewithrajat/universal-player";
```

| Preset               | Use                                   |
| -------------------- | ------------------------------------- |
| `endOfVideoFeedback` | CSAT stars + topics + comment.        |
| `netPromoterScore`   | 0–10 NPS + reason.                    |
| `contentFeedback`    | “Was this helpful?” auto-submit.      |
| `blockingReview`     | Required review, retakes, 2 attempts. |
| `quizFeedback`       | Instant correct/incorrect.            |

Spread and override:

```ts
survey: endOfVideoFeedback({
  title: "Was lesson one useful?",
  onSubmit: (result) => save(result.answers),
});
```

---

## 8. Dynamic questions

```ts
player.setSurvey(async () => {
  const response = await fetch("/api/survey", { headers });
  return response.json();
});

await player.openSurvey();
```

If the provider rejects, `openSurvey()` rejects; handle it.

---

## 9. Validation

```ts
import { validateSurveyAnswers } from "@codewithrajat/universal-player";

const issues = validateSurveyAnswers(survey, answers);
if (issues.length > 0) display(issues);
```

`submitSurvey()` applies the same rules and throws `invalid-argument` with
`details.issues` when invalid.

Always validate server-side too.

---

## 10. Events

```ts
player.on("surveyopen", ({ survey }) => {});
player.on("surveysubmit", ({ survey, answers, result }) => {});
player.on("surveyskip", ({ survey, result }) => {});
player.on("surveyclose", ({ survey, reason }) => {});
```

`reason`: `"submitted"`, `"skipped"`, `"closed"`.

---

## 11. Data contract

Payload and server rules: [REST contract](./rest-contract.md). Privacy:
[Privacy & GDPR](./privacy-gdpr.md).

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)