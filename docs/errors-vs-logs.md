# Errors vs. logs

> [Docs home](./README.md) › Errors vs. logs

[← Docs](./README.md) · [Troubleshooting](./troubleshooting.md) · [REST contract](./rest-contract.md)

The player emits several different kinds of diagnostic data. Mixing them up
leads to noisy dashboards and missed failures. This page separates them.

---

## 1. The four channels

| Channel                | What it is                         | Who consumes it               |
| ---------------------- | ---------------------------------- | ----------------------------- |
| `state.error`          | Last failure in the state snapshot | UI, retry logic               |
| `error` event          | `{ error }` payload on failure     | App telemetry, error boundary |
| `analytics.onEvent`    | Vendor-neutral product events      | Analytics pipeline            |
| `onEvent` / DOM events | Every player event                 | Integration glue, debugging   |

There is no built-in log store. The player does not write to the console on
success or failure by default.

---

## 2. `state.error`

```ts
if (player.state.status === "error") {
  console.error(player.state.error);
}
```

- Set when a load/engine failure is published.
- Cleared on a successful load.
- The value is a `PlayerError` when produced by the player (plain `Error`
  otherwise).
- Use it to render the overlay and decide whether `retry()` makes sense.

---

## 3. `error` event

```ts
player.on("error", ({ error }) => {
  report(error);
});
```

- Fires for load and engine failures.
- Also reachable through `addEventListener("error", ...)`.
- Does **not** fire for autoplay rejection (that is silently ignored).
- Does **not** fire for invalid API usage that throws synchronously (for
  example `play()` with no media). Catch the thrown `PlayerError` instead.

### When to use which

| Need                  | Use                           |
| --------------------- | ----------------------------- |
| Render an error state | `state.error`                 |
| Send to Sentry        | `error` event                 |
| Retry                 | `state.error` + `retry()`     |
| Validate a call       | `try/catch` around the method |

---

## 4. Analytics events

Only these types are tracked:

`loadedmetadata`, `play`, `pause`, `seeked`, `ended`, `error`.

Payload:

```ts
{
  type: "play",
  at: 1760000000000,
  position: 12.4,
  duration: 300,
  source: "https://cdn.example.com/clip.mp4",
  metadata?: { message?: string } // on error
}
```

Rules:

- `enabled: false` disables all events.
- No `onEvent` callback means no events are produced.
- Callback exceptions are swallowed.
- No network is performed by the player.

Use analytics for product metrics, not for error monitoring. Use the `error`
event for failures.

---

## 5. `onEvent` and DOM events

`onEvent` receives `{ type, detail }` for **every** event, including
`timeupdate` and `progress`.

```ts
createPlayer({
  container,
  source,
  onEvent: (event) => {
    if (event.type !== "timeupdate") devLog(event);
  },
});
```

This is for integration/debugging, not production telemetry. It is hot.

---

## 6. Error codes

| Code                      | Meaning                 | Retry?                 |
| ------------------------- | ----------------------- | ---------------------- |
| `invalid-argument`        | Bad input               | Fix the call.          |
| `invalid-state`           | Wrong lifecycle state   | Load/await first.      |
| `unsupported-source`      | Engine cannot do this   | Change source/feature. |
| `unsupported-environment` | Browser API missing     | Feature-detect.        |
| `network-error`           | Fetch/network failure   | Maybe.                 |
| `media-error`             | Decode/playback failure | Maybe.                 |
| `aborted`                 | Superseded operation    | No.                    |
| `destroyed`               | Used after destroy      | No.                    |
| `not-implemented`         | Stub used               | No.                    |

---

## 7. Logging strategy

Recommended:

| Environment | Strategy                                                                              |
| ----------- | ------------------------------------------------------------------------------------- |
| Development | Log all non-`timeupdate` events.                                                      |
| Staging     | Log errors + warnings; sample analytics.                                              |
| Production  | Send `error` events to monitoring; send analytics to your pipeline; no console noise. |

Never log:

- signed media URLs with tokens;
- survey free text;
- full `PlayerState` snapshots on every tick.

Redact source URLs to origin + pathname before sending.

---

## 8. What the player logs

By default: **nothing**.

- No `console.log` on load/play/pause.
- No network requests for telemetry.
- No stack traces written to storage.

This is deliberate: the host app owns observability.

---

## 9. Debugging recipe

```ts
const player = createPlayer({
  container,
  source,
  onEvent: (event) => {
    if (event.type !== "timeupdate") {
      console.log("[player]", event.type, event.detail);
    }
  },
  analytics: {
    onEvent: (event) => console.log("[analytics]", event.type, event.position),
  },
});

player.on("error", ({ error }) => console.error("[error]", error));
```

Open DevTools → Network for media, and Console for the event trail. Use
[Stats for nerds](./features.md) for resolution/buffer/track details.

---

## 10. Checklist

- [ ] Errors go to monitoring via the `error` event.
- [ ] Product metrics go through `analytics`.
- [ ] `onEvent` is not used as a production logger.
- [ ] URLs are redacted before logging.
- [ ] Survey free text is handled per privacy policy.
- [ ] Retry is only offered for retryable codes.
- [ ] Autoplay rejection is not reported as an error.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)