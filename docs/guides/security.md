# Security

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Security

## Trust boundaries

| Boundary | Risk | Mitigation |
| --- | --- | --- |
| Media URL | SSRF is server-side; the browser fetches whatever you pass | Allow-list hosts; sign URLs |
| `File`/`Blob` | Malicious container/codec | Browser decoder is the boundary; do not trust file names |
| SVG image | Scripts/external refs | Loaded through `<img>`, not inlined; still sanitise uploads server-side |
| YouTube/Vimeo | Third-party code in iframe | `allow` is limited to autoplay/fullscreen/PiP/encrypted-media; `referrerpolicy` set |
| Generic embed | Arbitrary page in iframe | Treat as untrusted; do not enable for user-supplied URLs without an allow-list |
| postMessage | Spoofed messages | Incoming messages filtered by `event.source === iframe.contentWindow`; **outgoing uses `targetOrigin: "*"`** |
| localStorage | Resume/survey/caption data | Do not store sensitive positions on shared devices; provide `storage` or disable |
| Analytics | PII leakage | The payload is caller-defined; redact before sending |

## CSP

```text
media-src 'self' https://cdn.example.com blob: data:;
img-src 'self' https://cdn.example.com data: blob:;
frame-src https://www.youtube.com https://player.vimeo.com;
connect-src 'self' https://cdn.example.com https://api.example.com;
```

No `eval` or dynamic code generation is used. `inject-styles` may require `style-src 'unsafe-inline'` in some browsers; prefer Shadow DOM.

## Passwords and DRM

There is no password/encryption API and no DRM. Signed URLs, cookies and CDN tokens are your responsibility. The player does not attach credentials except through the browser's normal media request behaviour and `crossOrigin`.

## XSS

- String options are rendered with `textContent` for labels and messages.
- JSON attributes are parsed and discarded on error.
- Thumbnail URLs become `<img src>`; validate them.
- The share menu opens `https:` targets from a fixed list; the embed snippet escapes attributes.

## Reporting

See `SECURITY.md` in the repository. Do not put exploit details in a public issue.

**Canonical guide:** [Privacy & GDPR](../privacy-gdpr.md) · [REST contract](../rest-contract.md)

---

← Previous: [Accessibility](./accessibility.md) · Next: [SSR](./ssr.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
