# Privacy & GDPR

> [Docs home](./README.md) � Privacy & GDPR

[← Docs](./README.md) · [Security](./security.md) · [Errors vs logs](./errors-vs-logs.md)

The player is a client-side library. It does not have a backend, does not send
telemetry on its own and does not require a user account. Privacy obligations
come from **what you enable** and **what your callbacks send**.

---

## 1. Default data behaviour

With no options set:

| Activity           | Default                                                             |
| ------------------ | ------------------------------------------------------------------- |
| Network requests   | Only the media you load, plus optional peers (HLS/DASH/embed).      |
| Local storage      | Nothing (resume off, captions persist only when a track is chosen). |
| Survey persistence | `once` markers when a survey is configured and shown.               |
| Analytics          | No callback → nothing leaves the browser.                           |
| Cookies            | None set by the player.                                             |
| Fingerprinting     | None.                                                               |

The player sets no cookies and does not read browser identifiers.

---

## 2. Local storage written

| Feature       | Key (default)                   | Value                       | Disable                                |
| ------------- | ------------------------------- | --------------------------- | -------------------------------------- |
| Resume        | `universal-player:<source-url>` | Playback position (seconds) | `resume.enabled: false`                |
| Captions      | derived from source             | Selected track id           | `captions.persist: false`              |
| Survey `once` | derived from survey id + source | Shown/completed marker      | `once: false` or a custom `storageKey` |

All storage is best-effort. Failures (private mode, quota, blocked storage) are
swallowed.

### Custom storage

```ts
resume: {
  enabled: true,
  storage: window.sessionStorage,
  key: "course:",
}
```

Use `sessionStorage` for session-only resume. Use an in-memory adapter for
strict privacy.

---

## 3. Analytics

```ts
analytics: {
  enabled: true,
  onEvent: (event) => {
    // This is your network call, not the player's.
  },
}
```

Paylaod fields:

| Field                  | May contain personal data?                             |
| ---------------------- | ------------------------------------------------------ |
| `type`                 | No                                                     |
| `at`                   | Timestamp                                              |
| `position`, `duration` | No                                                     |
| `source`               | **Yes** if the URL contains tokens, user ids or emails |
| `metadata`             | Your responsibility                                    |

Recommendations:

- Redact `source` to origin + pathname.
- Do not send query strings with tokens.
- Disclose analytics in your privacy policy.
- Provide a consent gate before enabling analytics.
- Use `enabled: false` as a runtime kill switch.

### Consent gate

```ts
const consent = await getUserConsent();

const player = createPlayer({
  container,
  source,
  analytics: {
    enabled: consent.analytics,
    onEvent: consent.analytics ? send : undefined,
  },
});
```

The player does not evaluate consent; your app does.

---

## 4. Surveys and free text

Survey answers can contain personal data (names, emails, free-text comments).

- `onSubmit`/`onSkip` receive the full answers.
- The player does not store answers except the `once` shown marker.
- If you persist answers, define retention and deletion.
- Do not send free text to analytics; send a submission id instead.
- Show a privacy notice next to the survey if required by your jurisdiction.

---

## 5. Media URLs

Signed URLs and tokens can be personal data or secrets. The player may put the
URL in:

- `state.source` / `NormalizedSource.url`
- analytics `source`
- error `details`

Redact before logging or transmitting. Do not render raw error details to end
users.

---

## 6. GDPR checklist

### Lawful basis

- Analytics: consent or legitimate interest, depending on jurisdiction.
- Survey feedback: consent or contract necessity.
- Resume/captions: functional storage; often exempt, but disclose it.

### Data minimisation

- Send only event type/time/position.
- Do not send raw URLs with tokens.
- Do not send survey free text to third parties without necessity.

### Retention

- Local storage persists until cleared or overwritten.
- Provide a “clear playback data” action:

```ts
player.destroy();
localStorage.removeItem("universal-player:https://example.com/clip.mp4");
```

- Server-side analytics retention is your policy.

### Access and erasure

- Local data is on the user's device; clearing site data removes it.
- Server-side records must be deleted per your process.
- Survey submissions and analytics events must be identifiable to delete.

### Processors

If you send analytics/survey data to a vendor, list them in your privacy policy
and sign DPAs as required.

### International transfers

The player does not transfer data. Your callbacks decide destinations.

---

## 7. Consent banner example

```html
<div id="consent" hidden>
  <p>We use analytics to improve our videos.</p>
  <button id="accept">Accept</button>
  <button id="reject">Reject</button>
</div>

<script type="module">
  import { createPlayer } from "@codewithrajat/universal-player/core";

  const consent = localStorage.getItem("analytics-consent") === "yes";

  const player = createPlayer({
    container: document.querySelector("#player"),
    source: "/clip.mp4",
    analytics: consent
      ? { onEvent: (event) => send({ type: event.type, at: event.at }) }
      : { enabled: false },
  });
</script>
```

---

## 8. Data subject request playbook

1. Identify the storage keys and server records associated with the user.
2. Clear local keys for that user (site data or a dedicated adapter).
3. Delete server-side analytics/survey records by id.
4. Confirm deletion in writing where required.

The player has no built-in subject-access export; your app owns the records.

---

## 9. Children and sensitive content

- Do not enable free-text surveys for services aimed at children without
  appropriate controls.
- Do not send URLs that reveal sensitive content to third parties.
- Consider disabling resume and captions persistence on shared devices.

---

## 10. Summary

| Question                        | Answer                                             |
| ------------------------------- | -------------------------------------------------- |
| Does the player send telemetry? | No.                                                |
| Does it use cookies?            | No.                                                |
| Does it write local storage?    | Only for enabled resume/captions/survey-once.      |
| Can analytics be disabled?      | Yes, `analytics.enabled: false` or omit `onEvent`. |
| Who owns survey data?           | Your `onSubmit` callback and backend.              |
| Is there a GDPR export?         | No; it is an app responsibility.                   |

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)