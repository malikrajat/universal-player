# Contributing to the examples

> [Examples home](./README.md) › Contributing to the examples

## Where each page goes

| Page | Folder |
| --- | --- |
| A new framework | `<framework>/` with six core pages and `formats/` |
| A new format | `<framework>/formats/<format>.md` in **every** framework + `format-matrix.md` |
| A new feature | `<framework>/formats/features/<feature>.md` + `shared/features.md` |
| A task | `recipes/nn-task.md` + `recipes/README.md` + `SUMMARY.md` |
| A scenario | `use-cases/<slug>.md` + catalog + `SUMMARY.md` |
| A production concern | `guides/<slug>.md` + catalog + `SUMMARY.md` |

## Required shape for a format page

1. Breadcrumb.
2. One-paragraph description.
3. At a glance table: entry, adapter id, factory, extensions, MIME, unit, status, rendering, capabilities.
4. Basic: import/create, source variants (static, CDN, File/Blob, ArrayBuffer→File), full viewer, headless.
5. Advanced: options table, surface table, copy-paste calls.
6. Customization: full UI vs headless; framework note.
7. Edge cases: format-specific + MIME/extension mismatch + wrong adapter.
8. Failure cases: codes + recovery.
9. Limitations to communicate.
10. Checklist.
11. Related links (including all formats).

## Style rules

- TypeScript + ESM. Complete imports.
- `controls: "native"` for headless examples.
- Explicit source creation in every example.
- Cleanup in every session example.
- No secrets, private URLs or real personal data.
- No invented APIs.
- No claim of DRM/SSR/OCR/WCAG.

## Navigation rules

- Breadcrumb at top.
- Footer: Docs home · Documentation index · Summary.
- Previous/next on format/feature pages.
- Add every page to `SUMMARY.md`.
- Relative links only.

## Code rules

- React prop is `source`, not `src`.
- Vue/Svelte prop is `src`.
- Angular controller input is `source`.
- Custom element attribute is `src`.
- `setQuality(null)` = auto; `setTextTrack(null)` = off.
- `destroy()` is synchronous.

## Verification checklist

- [ ] All links resolve.
- [ ] Code fences balanced.
- [ ] Breadcrumb/footer present.
- [ ] Format exists in every framework.
- [ ] Summary includes the page.
- [ ] Defaults match `docs/defaults.md`.
- [ ] Error codes match `PLAYER_ERROR_CODES`.
- [ ] No unsupported claim.

## Versioning

Examples track the library version `0.0.1`. If the API changes, update all five framework variants in the same change.

## Review questions

1. Which source shape does this example use?
2. Is the UI track explicit?
3. What happens when the peer/browser API is missing?
4. Which error code will the reader see?
5. Is the example safe to copy into a multi-tenant app?

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
