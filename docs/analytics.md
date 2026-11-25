# Analytics

> [Docs home](./README.md) › Analytics

[← Docs](./README.md) · [REST contract](./rest-contract.md) · [Privacy](./privacy-gdpr.md)

The player exposes a vendor-neutral event stream. It does not send data itself.

---

## 1. Enable

```ts
const player = createPlayer({
  container,
  source: "/clip.mp4",
  analytics: {
    enabled: true,
    onEvent: (event) => {
      // { type, at, position, duration, source, metadata? }
      console.log(event);
    },
  },
});
```

Without `onEvent`, no events are produced. `enabled: false` is a runtime kill
switch.

---

## 2. Tracked types

`loadedmetadata`, `play`, `pause`, `seeked`, `ended`, `error`.

`error` events include `metadata.message`.

For continuous progress, use `player.on("timeupdate")` and throttle it. Do not
expect per-second analytics events.

---

## 3. Payload

```ts
interface AnalyticsEvent {
  type: string;
  at: number; // epoch ms
  position: number; // seconds
  duration: number;
  source: string | null;
  metadata?: Record<string, unknown>;
}
```

Add your own dimensions in the callback:

```ts
analytics: {
  onEvent: (event) => {
    queue.push({
      ...event,
      sessionId,
      userId,
      lessonId: currentLesson,
    });
  },
}
```

---

## 4. Batching

```ts
const queue: unknown[] = [];

const player = createPlayer({
  container,
  source,
  analytics: { onEvent: (event) => queue.push(event) },
});

setInterval(async () => {
  if (queue.length === 0) return;
  const batch = queue.splice(0, 50);
  await fetch("/api/player-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(batch),
  });
}, 10_000);
```

The callback is isolated, but it runs on the main thread; keep it cheap.

---

## 5. Error monitoring

Analytics is not an error tracker. Use the `error` event:

```ts
player.on("error", ({ error }) => errorTracker.capture(error));
```

See [Errors vs logs](./errors-vs-logs.md).

---

## 6. Privacy

- Redact `source` to origin + pathname.
- Do not send tokens.
- Gate on consent.
- Disclose analytics.

```ts
analytics: {
  enabled: consent,
  onEvent: consent ? (event) => send(redact(event)) : undefined,
}
```

---

## 7. Sampling

```ts
const sampled = Math.random() < 0.1;

analytics: {
  enabled: sampled,
  onEvent: (event) => send(event),
}
```

Sampling at the event level is better than sampling sessions for funnel
analysis.

---

## 8. Server contract

See [REST contract](./rest-contract.md) for payload validation, status codes,
idempotency and retries.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)