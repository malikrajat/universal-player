# Versioning support

> [Docs home](./README.md) › Versioning support

This page states the support envelope for `0.0.1`. It is deliberately narrower than marketing copy elsewhere.

## Current release

| Item | Value |
| --- | --- |
| Version | `0.0.1` |
| Published | **Yes — 0.0.1 on npm** |
| Stability | Initial published scaffold / experience release |
| SemVer | Followed from `0.0.1`; Changesets configured for subsequent releases |
| Deprecation window | At least one minor before removal (policy, not yet exercised) |
| Node | `>=24.0.0` for development and build tooling |
| Browser | Declared floor Chrome/Edge 125, Firefox 128, Safari 18; executed test only Chromium |

## What "supported" means here

| Level | Meaning |
| --- | --- |
| **Implemented** | Code path exists and is covered by unit tests at least indirectly. |
| **Unit-tested** | Exercised by `tests/unit/**` in jsdom. |
| **Browser-executed** | Exercised by `tests/browser/smoke.browser.test.ts` in Chromium. |
| **Declared** | Declared in types/peer ranges/README; not verified across the range. |
| **Conditional** | Works only with a provider, browser API or asset present. |
| **Not supported** | Explicitly absent; do not file it as a bug. |

## Framework support

| Framework | Declared | Built/tested here | Notes |
| --- | --- | --- | --- |
| React | `>=18` | React 19.3.1 (types + example) | No React browser test |
| Vue | `^2.7 \|\| ^3` | Vue 3.5.44 | Vue 2.7 not executed |
| Angular | `>=17` | Angular 22.2.4 | Controller only; consumer owns the component |
| Svelte | `^4 \|\| ^5` | Svelte 5 dev dependency | Svelte 4 source shipped, not compiled here |
| RxJS | `^7.8` | 7.8.2 | Lazy interop only |

## Browser support boundary

The build targets ES2023 and uses modern APIs: Custom Elements, Shadow DOM, `AbortController`, `MediaSource`, optional Fullscreen/PiP/Remote Playback. Safari's native HLS path is coded but not executed in this repository's Chromium-only browser test.

## Deprecation policy

No APIs are deprecated in `0.0.1`. When deprecation starts:

1. Mark the JSDoc with `@deprecated` and name the replacement.
2. Add a Changeset with a minor bump.
3. Document it in [Deprecated APIs](./migration/deprecated-apis.md) and the changelog.
4. Remove only in a major.

## Related

[Versioning and breaking changes](./versioning-and-breaking-changes.md) · [Breaking-change policy](./breaking-change-policy.md) · [Browser support](./browser-support.md) · [Project versioning](./project/versioning.md)

---

← Previous: [Peer dependency](./peer-dependency.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
