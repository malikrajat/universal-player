# Contributing to documentation

> [Docs home](../README.md) › [Maintainers](./release.md) › Contributing

This page covers the **documentation** contribution rules. Code contribution rules are in [`../CONTRIBUTING.md`](../CONTRIBUTING.md) and [`../contributing.md`](../contributing.md).

## Ground rules

1. The source is the authority. Read `package.json`, `src/entries/*`, `src/core/types.ts`, the adapters and the tests before writing an API claim.
2. Do not document an API that is not exported.
3. Separate implemented, unit-tested, browser-executed, conditional, provider-only and absent.
4. Never claim WCAG conformance, DRM, SSR rendering or a browser matrix that the repository does not execute.
5. No source changes in a docs PR.

## Where pages go

| Page type | Folder | Canonical example |
| --- | --- | --- |
| Onboarding | `docs/getting-started/` | `first-example.md` |
| Task guidance | `docs/guides/` | `basic-usage.md` |
| Lookup | `docs/reference/` | `api-core.md` |
| Design explanation | `docs/concepts/` | `lifecycle.md` |
| Theming | `docs/theming/` | `design-tokens.md` |
| Failure help | `docs/troubleshooting/` | `common-errors.md` |
| Maintainer process | `docs/maintainers/` | `documentation-audit.md` |
| Lab examples | `examples/` | `<framework>/formats/<format>.md` |

Root filenames in `docs/` are kept for compatibility with the author's other documentation sets. Prefer linking to the canonical page rather than duplicating it.

## Required page shape

Every new page:

1. `# Title`
2. Breadcrumb line: Docs home → Category → Page, each segment linked.
3. One-paragraph purpose.
4. Real content: tables, code fences with a language, and specific values.
5. Footer line: Docs home · Documentation index · Summary, with relative links.
6. Previous/next links for canonical pages.

Compatibility pages must contain a genuine summary plus a "Canonical guide" link — never a bare "see other file".

## Style

- American or British spelling is acceptable, but be consistent within a page. The existing set mixes both ("licence/license", "colour/color") because it was migrated; prefer the spelling used by the API name when quoting code.
- Use backticks for identifiers, file paths and literal values.
- Use tables for options, defaults, status and limits.
- Code fences must declare a language: `ts`, `tsx`, `vue`, `svelte`, `html`, `bash`, `json`, `text`, `css`.
- Do not use "TODO", "coming soon" or lorem ipsum. If it is not done, write "not implemented" and link to the roadmap.

## Accuracy checklist

- [ ] Package name/version/status match `package.json` and the published npm version (`0.0.1`).
- [ ] Entry count and subpaths match the export map.
- [ ] Every option has type, required/optional, default, enforcement layer (core vs UI), related error and a short example.
- [ ] Defaults match source (not the README prose).
- [ ] Error codes match `PLAYER_ERROR_CODES`.
- [ ] Conditional features name the peer/browser/provider.
- [ ] No unsupported claim.
- [ ] Links are relative and resolve.
- [ ] Breadcrumb and footer present.
- [ ] `SUMMARY.md` updated.

## Verification commands

```bash
node scripts/check-docs.mjs   # when present
pnpm run check                # lint/format (docs are excluded by fmt/lint config)
```

The repository's lint/format configuration ignores `docs/` and `examples/`, so run the link checker explicitly.

## Review questions

1. What did you verify in source, and where?
2. Does the page distinguish core from built-in UI?
3. Did you add a claim that needs a browser test?
4. Does an existing canonical page already cover this?
5. Are the previous/next links correct?

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
