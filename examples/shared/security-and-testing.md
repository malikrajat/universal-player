# Security and testing

> [Examples home](../README.md) › [Shared reference](./README.md) › Security and testing

## Security model

| Boundary | Risk | Control |
| --- | --- | --- |
| Media URL | token leakage, SSRF (server) | signed URLs, allow-list |
| File/Blob | malicious container | browser decoder + server scan |
| SVG | scripts/external refs | loaded via `<img>`; rasterise untrusted uploads |
| Embeds | third-party code | iframe allow-list, CSP `frame-src` |
| postMessage | spoofing | filter by source window; outgoing `targetOrigin: "*"` |
| localStorage | shared-device leakage | disable resume or use `sessionStorage` |
| Analytics | PII | redact before sending |

## Sanitisation and sandbox

- No `eval`, no dynamic code generation.
- Labels use `textContent`.
- JSON attributes are parsed and discarded on failure.
- The iframe uses `allow="autoplay; fullscreen; picture-in-picture; encrypted-media"` and `referrerpolicy="strict-origin-when-cross-origin"`.
- The player does not sandbox generic embeds beyond iframe permissions; allow-list hosts.

## CSP

```text
media-src 'self' https://cdn.example.com blob: data:;
img-src 'self' https://cdn.example.com data: blob:;
frame-src https://www.youtube.com https://player.vimeo.com;
connect-src 'self' https://cdn.example.com https://api.example.com;
```

## URL and source safety

- Only `https://` in production.
- Do not put secrets in query strings that you log.
- Validate image/thumbnail URLs before rendering.

## Password handling

There is no password API and no DRM. Do not describe signed URLs as DRM.

## Provider trust

YouTube/Vimeo are third parties. Their availability, privacy policy and embed rules apply. A generic embed is arbitrary third-party content.

## Feature safety

- Surveys: never trust client-side scoring for high-stakes tests.
- Ads: the stub throws; do not wire it to production by accident.
- VR: data attributes only.
- Captions: cue text is untrusted content; native rendering escapes it.

## Signature caveats

No signature verification, timestamping or revocation. Not applicable to this library.

## Accessibility notes

No conformance claim. No focus trap, no axe audit, no screen-reader suite. Test your own UI.

## Browser/runtime floor

Declared Chrome/Edge 125+, Firefox 128+, Safari 18+, ES2023. Executed: Chromium only.

## Testing checklist

- [ ] Unit: `normalizeSource` routing, `sourceToken`, errors, quality.
- [ ] Component: mount/unmount, source swap, destroyed guard.
- [ ] Browser: play/pause/seek with a real fixture.
- [ ] Network failure: 404 and CORS.
- [ ] HLS/DASH with peers installed.
- [ ] SSR import does not construct.
- [ ] Accessibility: keyboard and labels.

## Packaging checks

```bash
pnpm run check:pack
pnpm run check:imports
pnpm run check:exports
pnpm run check:types
```

These verify the tarball, browser imports, export map and types. They do not test playback.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
