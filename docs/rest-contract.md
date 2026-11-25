# Data contract

> [Docs home](./README.md) › Data contract

[← Docs](./README.md) · [Analytics guide](./analytics.md) · [Surveys guide](./surveys.md)

The player does not ship a backend. This page defines the shape of the data
your callbacks send when you connect analytics and surveys to an API, so your
client and server agree on a stable contract.

---

## 1. Two payloads

| Payload           | Source                       | Purpose                    |
| ----------------- | ---------------------------- | -------------------------- |
| Analytics event   | `analytics.onEvent`          | Product metrics            |
| Survey submission | `survey.onSubmit` / `onSkip` | Feedback, reviews, quizzes |

Both are plain JSON-serializable objects. The player never posts them; your
callback does.

---

## 2. Analytics event

```ts
interface AnalyticsEvent {
  type: string;
  at: number; // Unix epoch milliseconds
  position: number; // seconds
  duration: number; // seconds
  source: string | null;
  metadata?: Record<string, unknown>;
}
```

Tracked `type` values:

`loadedmetadata`, `play`, `pause`, `seeked`, `ended`, `error`.

### Example request

```http
POST /api/player-events
Content-Type: application/json
Idempotency-Key: 8f14e45f-ea6b-4c2f-9a1e-6b2f0f0e9a11

{
  "type": "play",
  "at": 1760000000000,
  "position": 12.4,
  "duration": 300,
  "source": "https://cdn.example.com/lesson-1.mp4",
  "sessionId": "s_123",
  "userId": "u_456"
}
```

Add `sessionId`/`userId` in your callback; the player does not know them.

### Server rules

- Accept events idempotently; a retry may duplicate.
- Validate `type` against the allow-list.
- Clamp `position`/`duration` to non-negative numbers.
- Do not require `metadata`.
- Store `at` as the event time, not the receipt time.
- Reject or redact `source` if it contains tokens.

---

## 3. Survey submission

```ts
interface SurveySubmission {
  survey: SurveyConfig;
  answers: SurveyAnswers;
  submittedAt: number;
  source: string | null;
  position: number;
  duration: number;
  skipped: boolean;
  attempt: number;
}
```

`answers` is keyed by question id:

```json
{
  "survey": { "id": "post-watch", "kind": "feedback" },
  "answers": {
    "rating": 5,
    "topics": ["api", "ui"],
    "comment": "Clear and practical."
  },
  "submittedAt": 1760000000123,
  "source": "https://cdn.example.com/lesson-1.mp4",
  "position": 300,
  "duration": 300,
  "skipped": false,
  "attempt": 0
}
```

### Server rules

- Validate required questions and types server-side.
- Accept `skipped: true` as a valid record.
- Treat `attempt` as zero-based.
- Store `survey.id`; it is stable for a given form.
- Do not trust client validation alone.

### Example handler

```ts
app.post("/api/feedback", async (request, response) => {
  const body = request.body;

  if (typeof body?.survey?.id !== "string") {
    return response.status(400).json({ error: "invalid survey" });
  }

  await db.feedback.insert({
    surveyId: body.survey.id,
    answers: body.answers,
    submittedAt: body.submittedAt,
    position: body.position,
    duration: body.duration,
    skipped: body.skipped,
    attempt: body.attempt,
    userId: request.user?.id ?? null,
  });

  return response.status(202).json({ ok: true });
});
```

---

## 4. Status codes

| Code        | Meaning                                             |
| ----------- | --------------------------------------------------- |
| `200`/`202` | Accepted.                                           |
| `204`       | Accepted, no body.                                  |
| `400`       | Invalid payload.                                    |
| `401`/`403` | Auth failure.                                       |
| `409`       | Duplicate idempotency key with a different payload. |
| `413`       | Payload too large (cap free text).                  |
| `429`       | Rate limited; honour `Retry-After`.                 |
| `5xx`       | Retry with backoff.                                 |

---

## 5. Idempotency

Generate a key per submission/event:

```ts
const key = crypto.randomUUID();
await fetch("/api/feedback", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "idempotency-key": key,
  },
  body: JSON.stringify(result),
});
```

The server should store the key for a bounded window and return the original
result for repeats.

---

## 6. Retries and offline

The player does not retry. Implement retry in your callback or queue:

```ts
const queue: SurveySubmission[] = [];

survey: {
  onSubmit: async (result) => {
    try {
      await post(result);
    } catch {
      queue.push(result);
    }
  },
}
```

Flush the queue on reconnect. Do not retry `4xx` except `429`.

---

## 7. Payload limits

| Field             | Limit                                 |
| ----------------- | ------------------------------------- |
| `source`          | 2048 characters; redact query strings |
| `metadata`        | Keep under 4 KB                       |
| Free-text answers | Enforce `maxLength` in the question   |
| Total body        | 64 KB recommended                     |

---

## 8. Privacy

- Do not send tokens in `source`.
- Do not send survey free text to third parties without disclosure.
- Use a consent gate before analytics.
- Delete records on request.

See [Privacy & GDPR](./privacy-gdpr.md).

---

## 9. Contract checklist

- [ ] `type` allow-list on the server.
- [ ] `answers` validated by question type.
- [ ] `skipped` accepted.
- [ ] Idempotency key supported.
- [ ] `source` redacted.
- [ ] Payload limits enforced.
- [ ] `429` honours `Retry-After`.
- [ ] Retention/deletion defined.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)