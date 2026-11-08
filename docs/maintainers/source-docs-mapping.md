# Source documentation mapping

> [Docs home](../README.md) › [Maintainers](./release.md) › Source docs mapping

**Mapped on:** 2026-11-06
**Method:** GitHub trees API for each repository/branch, filtered to `docs/**/*.md`. Live registry check for publication status.

## Source repositories inspected

| Repository | Branch | Markdown files in `docs/` | Access |
| --- | --- | --- | --- |
| [malikrajat/rm-ng-video-player](https://github.com/malikrajat/rm-ng-video-player) | `master` | 8 | accessible |
| [malikrajat/rm-ng-pdf-viewer](https://github.com/malikrajat/rm-ng-pdf-viewer) | `main` | 48 | accessible |
| [malikrajat/rm-ng-editor](https://github.com/malikrajat/rm-ng-editor) | `main` | 20 | accessible |
| [malikrajat/rm-pushnotify](https://github.com/malikrajat/rm-pushnotify) | `main` | 0 | accessible, no docs/ folder |
| [malikrajat/rm-logvault](https://github.com/malikrajat/rm-logvault) | `main` | 13 | accessible |
| [malikrajat/rm-toast-notification](https://github.com/malikrajat/rm-toast-notification) | `main` | 21 | accessible |

**Total source Markdown found:** 110 across six repositories. **Access failures:** none; `rm-pushnotify` simply has no `docs/` folder on `main` (the task note records the same for `v1.0.0` and `v-2.0.0`).

## Structure adopted

- Root compatibility filenames and single-page guides from `rm-ng-video-player`, `rm-ng-editor` and `rm-toast-notification`.
- Nested `getting-started/`, `guides/`, `reference/`, `concepts/`, `api/`, `examples/`, `theming/`, `migration/`, `troubleshooting/`, `faq/` from `rm-ng-pdf-viewer`.
- Uppercase alias handling from `rm-logvault`.

No content was copied; every page was rewritten for a media player. PDF/editor-specific concepts (documents, pages, OCR, annotations) were deliberately not carried over as features.

## File-by-file mapping

### [malikrajat/rm-ng-video-player](https://github.com/malikrajat/rm-ng-video-player/tree/master/docs)

**Files found:** 8

| Source path | Current path | Status |
| --- | --- | --- |
| `docs/api-reference.md` | `docs/api-reference.md` | present |
| `docs/best-practices.md` | `docs/best-practices.md` | present |
| `docs/browser-support.md` | `docs/browser-support.md` | present |
| `docs/features.md` | `docs/features.md` | present |
| `docs/keyboard-shortcuts.md` | `docs/keyboard-shortcuts.md` | present |
| `docs/setup.md` | `docs/setup.md` | present |
| `docs/theming.md` | `docs/theming.md` | present |
| `docs/usage.md` | `docs/usage.md` | present |

### [malikrajat/rm-ng-pdf-viewer](https://github.com/malikrajat/rm-ng-pdf-viewer/tree/main/docs)

**Files found:** 48

| Source path | Current path | Status |
| --- | --- | --- |
| `docs/api/components/rm-ng-pdf-viewer.md` | `docs/api/components/rm-ng-pdf-viewer.md` | present (rewritten for media; compatibility filenames) |
| `docs/api/events/viewer-events.md` | `docs/api/events/viewer-events.md` | present (rewritten for media; compatibility filenames) |
| `docs/api/interfaces/rm-ng-pdf-theme-config.md` | `docs/api/interfaces/rm-ng-pdf-theme-config.md` | present (rewritten for media; compatibility filenames) |
| `docs/api/interfaces/rm-ng-pdf-viewer-config.md` | `docs/api/interfaces/rm-ng-pdf-viewer-config.md` | present (rewritten for media; compatibility filenames) |
| `docs/api/services/configuration.md` | `docs/api/services/configuration.md` | present (rewritten for media; compatibility filenames) |
| `docs/concepts/architecture.md` | `docs/concepts/architecture.md` | present (rewritten for media; compatibility filenames) |
| `docs/concepts/lifecycle.md` | `docs/concepts/lifecycle.md` | present (rewritten for media; compatibility filenames) |
| `docs/concepts/performance-model.md` | `docs/concepts/performance-model.md` | present (rewritten for media; compatibility filenames) |
| `docs/concepts/rendering.md` | `docs/concepts/rendering.md` | present (rewritten for media; compatibility filenames) |
| `docs/concepts/state-management.md` | `docs/concepts/state-management.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/accessibility.md` | `docs/examples/accessibility.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/advanced.md` | `docs/examples/advanced.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/basic.md` | `docs/examples/basic.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/edge-cases.md` | `docs/examples/edge-cases.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/enterprise.md` | `docs/examples/enterprise.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/integrations.md` | `docs/examples/integrations.md` | present (rewritten for media; compatibility filenames) |
| `docs/examples/performance.md` | `docs/examples/performance.md` | present (rewritten for media; compatibility filenames) |
| `docs/faq/faq.md` | `docs/faq/faq.md` | present (rewritten for media; compatibility filenames) |
| `docs/getting-started/first-example.md` | `docs/getting-started/first-example.md` | present (rewritten for media; compatibility filenames) |
| `docs/getting-started/installation.md` | `docs/getting-started/installation.md` | present (rewritten for media; compatibility filenames) |
| `docs/getting-started/introduction.md` | `docs/getting-started/introduction.md` | present (rewritten for media; compatibility filenames) |
| `docs/getting-started/project-structure.md` | `docs/getting-started/project-structure.md` | present (rewritten for media; compatibility filenames) |
| `docs/getting-started/quick-start.md` | `docs/getting-started/quick-start.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/accessibility.md` | `docs/guides/accessibility.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/advanced-usage.md` | `docs/guides/advanced-usage.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/basic-usage.md` | `docs/guides/basic-usage.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/best-practices.md` | `docs/guides/best-practices.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/debugging.md` | `docs/guides/debugging.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/lazy-loading.md` | `docs/guides/lazy-loading.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/optimization.md` | `docs/guides/optimization.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/security.md` | `docs/guides/security.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/ssr.md` | `docs/guides/ssr.md` | present (rewritten for media; compatibility filenames) |
| `docs/guides/theme-design.md` | `docs/guides/theme-design.md` | present (rewritten for media; compatibility filenames) |
| `docs/migration/breaking-changes.md` | `docs/migration/breaking-changes.md` | present (rewritten for media; compatibility filenames) |
| `docs/migration/deprecated-apis.md` | `docs/migration/deprecated-apis.md` | present (rewritten for media; compatibility filenames) |
| `docs/migration/v1-to-v2.md` | `docs/migration/v1-to-v2.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/css-variables.md` | `docs/theming/css-variables.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/custom-themes.md` | `docs/theming/custom-themes.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/dark-mode.md` | `docs/theming/dark-mode.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/design-tokens.md` | `docs/theming/design-tokens.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/overview.md` | `docs/theming/overview.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/responsive-design.md` | `docs/theming/responsive-design.md` | present (rewritten for media; compatibility filenames) |
| `docs/theming/styling-best-practices.md` | `docs/theming/styling-best-practices.md` | present (rewritten for media; compatibility filenames) |
| `docs/troubleshooting/build-issues.md` | `docs/troubleshooting/build-issues.md` | present (rewritten for media; compatibility filenames) |
| `docs/troubleshooting/common-errors.md` | `docs/troubleshooting/common-errors.md` | present (rewritten for media; compatibility filenames) |
| `docs/troubleshooting/performance-issues.md` | `docs/troubleshooting/performance-issues.md` | present (rewritten for media; compatibility filenames) |
| `docs/troubleshooting/ssr-issues.md` | `docs/troubleshooting/ssr-issues.md` | present (rewritten for media; compatibility filenames) |
| `docs/troubleshooting/styling-issues.md` | `docs/troubleshooting/styling-issues.md` | present (rewritten for media; compatibility filenames) |

### [malikrajat/rm-ng-editor](https://github.com/malikrajat/rm-ng-editor/tree/main/docs)

**Files found:** 20

| Source path | Current path | Status |
| --- | --- | --- |
| `docs/README.md` | `docs/README.md` | present |
| `docs/_api-facts.md` | `docs/_api-facts.md` | present |
| `docs/accessibility.md` | `docs/accessibility.md` | present |
| `docs/advanced-configuration.md` | `docs/advanced-configuration.md` | present |
| `docs/api-reference.md` | `docs/api-reference.md` | present |
| `docs/api-source-reference.md` | `docs/api-source-reference.md` | present |
| `docs/architecture.md` | `docs/architecture.md` | present |
| `docs/best-practices.md` | `docs/best-practices.md` | present |
| `docs/browser-support.md` | `docs/browser-support.md` | present |
| `docs/changelog.md` | `docs/changelog.md` | present |
| `docs/core-concepts.md` | `docs/core-concepts.md` | present |
| `docs/extending-the-project.md` | `docs/extending-the-project.md` | present |
| `docs/faq.md` | `docs/faq.md` | present |
| `docs/installation.md` | `docs/installation.md` | present |
| `docs/peer-dependencies.md` | `docs/peer-dependencies.md` | present |
| `docs/performance-optimization.md` | `docs/performance-optimization.md` | present |
| `docs/project-structure.md` | `docs/project-structure.md` | present |
| `docs/troubleshooting.md` | `docs/troubleshooting.md` | present |
| `docs/usage.md` | `docs/usage.md` | present |
| `docs/versioning-and-breaking-changes.md` | `docs/versioning-and-breaking-changes.md` | present |

### [malikrajat/rm-pushnotify](https://github.com/malikrajat/rm-pushnotify/tree/main/docs)

**Files found:** 0. No `docs/` folder exists on `main` (and the task note records the same for `v1.0.0` and `v-2.0.0`). Nothing to map; the target documentation did not take structure from this repository.

### [malikrajat/rm-logvault](https://github.com/malikrajat/rm-logvault/tree/main/docs)

**Files found:** 13

| Source path | Current path | Status |
| --- | --- | --- |
| `docs/API.md` | `docs/api.md` | present (lowercase canonical) |
| `docs/ARCHITECTURE.md` | `docs/architecture.md` | present (lowercase canonical) |
| `docs/BROWSER-SUPPORT.md` | `docs/browser-support.md` | present (lowercase canonical) |
| `docs/CONFIGURATION.md` | `docs/configuration.md` | present (lowercase canonical) |
| `docs/DECISIONS.md` | `docs/decisions.md` | present (lowercase canonical) |
| `docs/DEFAULTS.md` | `docs/defaults.md` | present (lowercase canonical) |
| `docs/ERRORS-VS-LOGS.md` | `docs/errors-vs-logs.md` | present (lowercase canonical) |
| `docs/OPTIONS-CHEATSHEET.md` | `docs/options-cheatsheet.md` | present (lowercase canonical) |
| `docs/PRIVACY-GDPR.md` | `docs/privacy-gdpr.md` | present (lowercase canonical) |
| `docs/README.md` | `docs/readme.md` | present (lowercase canonical) |
| `docs/REST-CONTRACT.md` | `docs/rest-contract.md` | present (lowercase canonical) |
| `docs/SECURITY.md` | `docs/security.md` | present (lowercase canonical) |
| `docs/TROUBLESHOOTING.md` | `docs/troubleshooting.md` | present (lowercase canonical) |

### [malikrajat/rm-toast-notification](https://github.com/malikrajat/rm-toast-notification/tree/main/docs)

**Files found:** 21

| Source path | Current path | Status |
| --- | --- | --- |
| `docs/README.md` | `docs/README.md` | present |
| `docs/accessibility.md` | `docs/accessibility.md` | present |
| `docs/advanced-configuration.md` | `docs/advanced-configuration.md` | present |
| `docs/api-reference.md` | `docs/api-reference.md` | present |
| `docs/architecture.md` | `docs/architecture.md` | present |
| `docs/best-practices.md` | `docs/best-practices.md` | present |
| `docs/browser-support.md` | `docs/browser-support.md` | present |
| `docs/changelog.md` | `docs/changelog.md` | present |
| `docs/configuration.md` | `docs/configuration.md` | present |
| `docs/contributing.md` | `docs/contributing.md` | present |
| `docs/extending.md` | `docs/extending.md` | present |
| `docs/faq.md` | `docs/faq.md` | present |
| `docs/frameworks.md` | `docs/frameworks.md` | present |
| `docs/installation.md` | `docs/installation.md` | present |
| `docs/performance-optimization.md` | `docs/performance-optimization.md` | present |
| `docs/prerequisites.md` | `docs/prerequisites.md` | present |
| `docs/project-structure.md` | `docs/project-structure.md` | present |
| `docs/quick-start.md` | `docs/quick-start.md` | present |
| `docs/security.md` | `docs/security.md` | present |
| `docs/testing.md` | `docs/testing.md` | present |
| `docs/troubleshooting.md` | `docs/troubleshooting.md` | present |


## Examples trees (separate from docs/)

| Repository | Examples Markdown files | Mapping |
| --- | --- | --- |
| `rm-ng-video-player` | 9 | Use-case catalog patterns adapted into `examples/use-cases/` and `examples/recipes/`. |
| `rm-ng-pdf-viewer` | 1 | Tiered examples pattern adapted into `examples/<framework>/`. |
| `rm-ng-editor` | 7 | Start-here/learning-path/failure-case patterns adapted. |
| `rm-ng-logvault` | 89 | Framework-first, tiered-depth, recipe/configuration patterns adapted. |
| `rm-ng-toast-notification` | 11 | Numbered scenario/recipe patterns adapted. |
| `rm-pushnotify` | 0 | No `examples/` folder found. |

## Pages added because the target needs them

The source repositories do not contain these, but the target library does:

- `docs/reference/api-formats.md`, `api-universal-formats.md`, `formats-matrix.md`
- `docs/peer-dependency.md`, `versioning-support.md`
- `docs/API.md`
- `examples/` (the whole lab book: 247 files)
- `docs/maintainers/documentation-audit.md`, `source-docs-mapping.md`, `release.md`

## Case-insensitive collisions

`rm-logvault` uses uppercase names. The target keeps lowercase canonical files; on Windows/macOS the uppercase name resolves to the lowercase file, and Linux links must use lowercase. See [Documentation audit](./documentation-audit.md#6-case-insensitive-filename-collisions).

## Status definitions

| Status | Meaning |
| --- | --- |
| `present` | The path exists and carries target-specific content. |
| `present (rewritten for media; compatibility filenames)` | The filename is preserved for cross-repo consistency, but the content documents the media player. |
| `present (lowercase canonical)` | An uppercase source path maps to the lowercase canonical target. |
| `MISSING` | The target path was not found at audit time. |
| `no docs/ folder` | The source repository has nothing to map. |

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
