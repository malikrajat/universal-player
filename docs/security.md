# Security

> [Docs home](./README.md) › Security

[← Docs](./README.md) · [Privacy & GDPR](./privacy-gdpr.md) · [Contributing](./contributing.md)

The library plays untrusted media and renders configuration-controlled UI. The
security model is therefore about **what the player will execute, fetch and
render**, and what it deliberately will not do.

The canonical disclosure policy is in [`../SECURITY.md`](../SECURITY.md).

---

## 1. Threat model

| Asset         | Threat                        | Mitigation                                                                                  |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| Host page DOM | XSS through config strings    | Text is rendered with `textContent`/attributes, never `innerHTML` for user strings.         |
| User session  | Token leakage in media URLs   | The player does not log URLs by default; analytics receives `source` only if you enable it. |
| Network       | Arbitrary egress              | The player only fetches the source you give it plus optional peers.                         |
| Embeds        | Over-broad iframe permissions | `allow`-scoped attributes and `referrerpolicy`.                                             |
| Supply chain  | Compromised dependency        | Zero runtime deps; optional peers are explicit.                                             |
| Storage       | Sensitive resume data         | Best-effort local storage; you control keys and can disable.                                |
| CSP           | Inline script/style bypass    | No `eval`, no dynamic code; style injection is scoped.                                      |

---

## 2. No dynamic code execution

The library does not use:

- `eval`
- `new Function`
- `setTimeout("string")`
- dynamic `<script>` injection
- `javascript:` URLs

Configuration is data, not code. JSON attributes are parsed with `JSON.parse`
and invalid values are ignored.

---

## 3. DOM rendering

- Control labels and strings are assigned with `textContent` or attributes.
- `innerHTML` is not used for consumer-supplied strings.
- Icons are bundled SVG/HTML, not fetched.
- URLs are passed to `src`/`href` after normalization; the player does not
  sanitize scheme for arbitrary embed URLs beyond what the browser allows.
- If you accept arbitrary user-supplied URLs, validate the scheme yourself
  (allow `https:`, relative; reject `javascript:`).

---

## 4. Iframes and embeds

- YouTube/Vimeo iframes use `allow` scoping for playback/PiP/fullscreen where
  needed.
- `referrerpolicy` limits referrer leakage.
- Generic embeds render the URL as-is. They are **your trust decision**.
- The command bridge uses `postMessage` to the provider origin; it does not
  accept arbitrary inbound messages as commands.

Recommended CSP:

```text
frame-src https://www.youtube.com https://player.vimeo.com;
```

Do not allow `frame-src *` if you accept user URLs.

---

## 5. CSP guidance

```text
default-src 'self';
media-src 'self' https://cdn.example.com blob: data:;
img-src 'self' https://cdn.example.com data: blob:;
frame-src https://www.youtube.com https://player.vimeo.com;
connect-src 'self' https://cdn.example.com https://api.example.com;
style-src 'self' 'unsafe-inline';
```

Notes:

- `style-src 'unsafe-inline'` is only needed for light-DOM `inject-styles` in
  browsers without constructable stylesheets. Shadow DOM injection uses a
  scoped `<style>`.
- `blob:` is needed for Blob/File/chunked sources.
- `data:` is needed only if you load data URLs for media/images.
- `connect-src` must include every HLS/DASH manifest and segment origin.

---

## 6. Supply chain

- Zero runtime dependencies in the core.
- Optional peers are declared and installed by the consumer.
- Streaming SDKs are imported dynamically, only for matching sources.
- Build validation includes publint, attw, tarball allowlist and a
  browser-import scan.
- Releases use npm provenance.
- An SBOM can be generated with `pnpm run sbom`.

---

## 7. Storage

| Feature              | Default | Data                                             |
| -------------------- | ------- | ------------------------------------------------ |
| Resume               | Off     | Playback position per source key.                |
| Captions persistence | On      | Selected track id per source.                    |
| Survey `once`        | On      | A shown/completed marker per source + survey id. |

- Storage is `localStorage` by default; you can pass a different `Storage`.
- Failures (private mode, quota) are swallowed.
- Disable with `resume.enabled: false`, `captions.persist: false`, or a survey
  `storageKey` strategy.

See [Privacy & GDPR](./privacy-gdpr.md).

---

## 8. Analytics and survey data

- `analytics.onEvent` is only called if you supply it; `enabled: false`
  disables it.
- Survey `onSubmit` receives answers including free text.
- The player never sends network requests itself for analytics or surveys; your
  callbacks do.
- Do not include tokens or PII in `source` URLs sent to third parties.

See [REST contract](./rest-contract.md).

---

## 9. Error messages

`PlayerError.message` is human-readable and may include a source URL in
`details`. Do not display raw error details to end users in a way that leaks
signed URLs. Log them to your own telemetry with redaction.

---

## 10. Reporting a vulnerability

**Do not open a public issue.**

Follow [`../SECURITY.md`](../SECURITY.md):

- email/private advisory as instructed there;
- include a reproduction and affected version;
- allow time for a fix before disclosure.

The maintainers will acknowledge, assess and coordinate a release.

---

## 11. Security checklist for integrators

- [ ] Validate user-supplied URLs (scheme allow-list).
- [ ] Keep CSP strict; allow only required media/frame/connect origins.
- [ ] Do not put tokens in query strings sent to analytics.
- [ ] Disable resume/caption persistence for sensitive content if needed.
- [ ] Review survey free-text before storing/sending.
- [ ] Treat generic iframes as untrusted.
- [ ] Keep peers updated.
- [ ] Do not expose raw `PlayerError.details` to end users.
- [ ] Use HTTPS for media and API endpoints.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)