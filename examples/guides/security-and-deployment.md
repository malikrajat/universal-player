# Security and deployment

> [Examples home](../README.md) › [Production guides](./README.md) › Security and deployment

## Trust boundaries

| Boundary | Control |
| --- | --- |
| Media URL | signed URLs, host allow-list, short TTL |
| Uploads | browser decode + server scan |
| SVG | rasterise untrusted uploads; `<img>` only |
| Embeds | provider allow-list + CSP `frame-src` |
| postMessage | source-window filter; outgoing `targetOrigin: "*"` |
| localStorage | disable resume on shared devices |
| Analytics | redact PII; server-side collector |

## CSP baseline

```text
default-src 'self';
media-src 'self' https://cdn.example.com blob: data:;
img-src 'self' https://cdn.example.com data: blob:;
frame-src https://www.youtube.com https://player.vimeo.com;
connect-src 'self' https://cdn.example.com https://api.example.com;
```

No `eval`. `inject-styles` may need `style-src 'unsafe-inline'`; prefer Shadow DOM.

## Deployment checklist

- [ ] Media served over HTTPS with range support.
- [ ] CORS configured for HLS/DASH/VTT.
- [ ] Signed URL TTL and refresh path.
- [ ] CSP matches your origins.
- [ ] No download for rights-managed content.
- [ ] Analytics payload reviewed for PII.
- [ ] Embed hosts allow-listed.
- [ ] Error UI does not leak URLs/tokens.
- [ ] Players destroyed on route change.

## What this library does not secure

DRM, password-protected containers, legal signatures, malware scanning, rate limiting, authorisation. Those belong to your platform.

## Related

[docs/security.md](../../docs/security.md) · [Privacy & GDPR](../../docs/privacy-gdpr.md) · [Shared security](../shared/security-and-testing.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
