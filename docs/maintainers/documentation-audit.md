# Documentation audit

> [Docs home](../README.md) › [Maintainers](./release.md) › Documentation audit

**Audit date:** 2026-11-06
**Method:** read `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.browser.config.ts`, every `src/entries/*`, `src/core/*`, the adapter and feature modules, the unit/browser tests, the existing `docs/` tree, the repository-level Markdown, the live npm registry, and the six source documentation repositories through the GitHub trees API. Where prose and source disagreed, source won.

## 1. Executive result

| Finding | Detail |
| --- | --- |
| Package | `@codewithrajat/universal-player@0.0.1` |
| Publication | **Unreleased** — `npm view` returns E404 on 2026-11-06 |
| Original Markdown files in `docs/` | 51 |
| Rewritten | 6 (README, _api-facts, installation, quick-start, examples, defaults) |
| Updated | 12 (frameworks, options-cheatsheet, api-reference, peer-dependencies, accessibility, features, decisions, usage, best-practices, faq, why-this-library, configuration) |
| Renamed to lowercase canonical | 5 (defaults, options-cheatsheet, privacy-gdpr, rest-contract, errors-vs-logs) |
| Spot-checked and unchanged | 34 |
| Missing inventory pages created | 80 (getting-started, guides, reference, project, maintainers, concepts, api tree, examples, theming, migration, troubleshooting, faq) |
| Example book | 247 Markdown files under `examples/` |
| Duplicate Markdown trees | **None.** `_docs/api` is generated HTML, `_examples` is runnable apps, `examples` is this Markdown book. |

## 2. Original `docs/` files

| File | Available | Freshness | Findings | Action |
| --- | --- | --- | --- | --- |
| `docs/README.md` | yes | Rewritten | Stale install commands, stale entry/engine counts, no publication status, no full map | Replaced with status/version, install truth, UI boundary, complete map |
| `docs/_api-facts.md` | yes | Rewritten | Said 'root + 9 subpaths'; counted 7 engines; omitted the headless UI boundary and unpublished status | Recomputed from package.json, exports, source; added boundary and registry 404 |
| `docs/installation.md` | yes | Rewritten | Registry install presented as working; React/Vue examples implied built-in UI | Folder/tarball install, intended-only registry command, entry/UI table |
| `docs/quick-start.md` | yes | Rewritten | Registry install; vanilla mount implied controls; React used `src` | Local install, UI track split, React `source`, native-controls note |
| `docs/examples.md` | yes | Rewritten | Claimed styles.css gives the built-in surface for headless examples | Two example trees, real UI boundary, headless note |
| `docs/frameworks.md` | yes | Updated | React example used `src`; blanket stylesheet advice implied UI in wrappers | React `source`; per-adapter headless callouts; intro rewritten |
| `docs/defaults.md` | yes | Rewritten | `preload` documented as undefined (actually `metadata`); `label` omitted core value; UI-only options not separated | Split core/UI defaults; corrected preload, label, controls, analytics, survey, playlist |
| `docs/options-cheatsheet.md` | yes | Updated | `custom` claimed to use the built-in surface; interaction options not marked UI-only | UI boundary callout; corrected controls text |
| `docs/api-reference.md` | yes | Updated | `controls` row said 'built-in controls'; PlayerOptions table did not flag UI-only fields | Boundary note; corrected row |
| `docs/peer-dependencies.md` | yes | Updated | Registry install commands without publication status | Status note; ranges unchanged |
| `docs/accessibility.md` | yes | Updated | Claimed the survey overlay traps focus; implied stronger audit position | Corrected: focus moves in but is not trapped; no axe audit |
| `docs/features.md` | yes | Updated | Entry count 'root + 9 public subpaths'; 'automated axe audit TODO' | Corrected counts; replaced TODO wording |
| `docs/decisions.md` | yes | Updated | Entry count 'Root + 9 subpaths' | Corrected to 9 code entries (root + 8 subpaths) |
| `docs/usage.md` | yes | Updated | Said `controls: "custom"` renders the built-in surface | Corrected: it removes browser controls; only the element renders UI |
| `docs/best-practices.md` | yes | Updated | Table said framework adapters provide 'complete UI' | Replaced with custom-element path + headless adapter row |
| `docs/faq.md` | yes | Updated | Said the built-in surface is available through adapters | Corrected: element only |
| `docs/why-this-library.md` | yes | Updated | Unqualified 'built-in surface' claim | Clarified custom-element-only surface |
| `docs/configuration.md` | yes | Updated | Presentation example implied theme/ui work in headless `createPlayer` | Added UI-only callout |
| `docs/architecture.md` | yes | Current (spot-checked) | Layer/engine description matches source; no stale counts found | No change |
| `docs/core-concepts.md` | yes | Current (spot-checked) | Adapter table is accurate; no UI claim | No change |
| `docs/advanced-configuration.md` | yes | Current (spot-checked) | Explicitly UI configuration; defaults match source | No change |
| `docs/setup.md` | yes | Current (spot-checked) | Correctly distinguishes custom element from headless; light-DOM CSS advice is correct | No change |
| `docs/prerequisites.md` | yes | Current (spot-checked) | Node/peers/browser floor match package.json | No change |
| `docs/browser-support.md` | yes | Current (spot-checked) | Explicitly says declared minimums, not a test matrix | No change |
| `docs/roadmap.md` | yes | Current (spot-checked) | Scaffolded/out-of-scope lists match source | No change |
| `docs/changelog.md` | yes | Current (spot-checked) | Matches CHANGELOG.md 0.0.1 | No change |
| `docs/contributing.md` | yes | Current (spot-checked) | Code-focused rules; no stale API claims | No change |
| `docs/testing.md` | yes | Current (spot-checked) | Chromium-only browser test correctly described | No change |
| `docs/security.md` | yes | Current (spot-checked) | Threat model and CSP match implementation | No change |
| `docs/theming.md` | yes | Current (spot-checked) | Tokens and parts match styles.css | No change |
| `docs/migration.md` | yes | Current (spot-checked) | No published v1 claimed; guidance is conditional | No change |
| `docs/extending.md` | yes | Current (spot-checked) | Correctly says engine selection is internal | No change |
| `docs/extending-the-project.md` | yes | Current (spot-checked) | Maintainer invariants match source layout | No change |
| `docs/project-structure.md` | yes | Current (spot-checked) | Layout matches src/ | No change |
| `docs/performance-optimization.md` | yes | Current (spot-checked) | No numeric bundle claims; lazy SDK statement correct | No change |
| `docs/license.md` | yes | Current (spot-checked) | MIT, matches LICENSE | No change |
| `docs/breaking-change-policy.md` | yes | Current (spot-checked) | Policy only; no release claims | No change |
| `docs/versioning-and-breaking-changes.md` | yes | Current (spot-checked) | Pre-1.0 policy; no false version history | No change |
| `docs/analytics.md` | yes | Current (spot-checked) | Event names/payload match source | No change |
| `docs/captions.md` | yes | Current (spot-checked) | Track/default/persist behaviour matches source | No change |
| `docs/surveys.md` | yes | Current (spot-checked) | Defaults/normalisation match survey.ts | No change |
| `docs/playlists.md` | yes | Current (spot-checked) | Gating/auto-advance matches player.ts | No change |
| `docs/resume.md` | yes | Current (spot-checked) | Defaults and key shape match player.ts | No change |
| `docs/live.md` | yes | Current (spot-checked) | Partial DVR status is honest | No change |
| `docs/images.md` | yes | Current (spot-checked) | Image engine/UI split matches source | No change |
| `docs/troubleshooting.md` | yes | Current (spot-checked) | Symptom/fix table has no contradicted claims | No change |
| `docs/keyboard-shortcuts.md` | yes | Current (spot-checked) | Key map matches shortcuts.ts | No change |
| `docs/service-worker.md` | yes | Current (spot-checked) | Caching guidance; no false offline API | No change |
| `docs/privacy-gdpr.md` | yes | Renamed + current | Content matches storage behaviour; uppercase alias removed | Renamed PRIVACY-GDPR.md → privacy-gdpr.md |
| `docs/rest-contract.md` | yes | Renamed + current | Payload examples match AnalyticsEvent/SurveySubmission; uppercase alias removed | Renamed REST-CONTRACT.md → rest-contract.md |
| `docs/errors-vs-logs.md` | yes | Renamed + current | Error/event separation matches source; uppercase alias removed | Renamed ERRORS-VS-LOGS.md → errors-vs-logs.md |

## 3. Repository-level Markdown

| File | Available | Freshness | Findings | Action |
| --- | --- | --- | --- | --- |
| `README.md` | yes | Updated | Claimed seven engines; React used `src`; registry install had no status; vanilla mount implied UI | Eight providers, React `source`, local install, native-controls note |
| `CHANGELOG.md` | yes | Current | Initial 0.0.1 entry matches package version | No change |
| `CONTRIBUTING.md` | yes | Current | Code contribution rules only | No change |
| `SECURITY.md` | yes | Current | Disclosure policy only | No change |
| `SUPPORT.md` | yes | Current | Support channels only | No change |
| `CODE_OF_CONDUCT.md` | yes | Current | Standard policy | No change |

## 4. Claims corrected

| Claim found | Reality | Where corrected |
| --- | --- | --- |
| `pnpm add @codewithrajat/universal-player` works | Package is unpublished; registry 404 | Root README, installation, quick-start, examples, status notes |
| `mountUniversalPlayer()` gives the built-in UI | It mounts the headless core; no chrome | README, installation, quick-start, frameworks, examples, guides |
| React/Vue/Angular/Svelte adapters render controls | They render a host element; no chrome | Frameworks, best-practices, faq, usage, example book |
| "Root + 9 subpaths" | 9 code entry points total (root + 8 subpaths) + 2 assets | _api-facts, features, decisions, project pages |
| "seven engines" | 8 providers (native, chunked, hls, dash, image, youtube, vimeo, generic-embed) | README, _api-facts, project pages |
| Survey traps focus | It moves focus in and restores it; no trap | Accessibility, migration, example guides |
| `preload` default is undefined/browser | `"metadata"` | Defaults |
| `label` default only on the element | Core media element uses `"Media"`; element uses `"Media player"` | Defaults |
| `controls: "custom"` renders a surface | Removes browser controls; no chrome | Usage, options cheatsheet, api-reference, guides |
| Arbitrary iframe URL → generic embed | Bare URLs fall back to video; generic embed requires a structured source | README, format matrix, example pages |
| `.ogg` is audio | It is classified as video; use `.oga` or a structured source | Example book, guides |
| MOV/MKV are supported formats | Recognised but usually not decodable | Format matrix, example format pages |
| React prop is `src` | React prop is `source` (Vue/Svelte use `src`; element uses `src`) | README, frameworks, installation, quick-start, example book |
| WCAG 2.2 AA conformance implied | Target-oriented markup only; no audit | Accessibility, features, example guides |

## 5. Duplicate and stale trees

| Tree | Verdict |
| --- | --- |
| `docs/` | Canonical Markdown. |
| `_docs/api/` | Generated TypeDoc HTML; not a second Markdown tree. Do not treat as docs source. |
| `_examples/` | Runnable Vite/Angular demo apps; not duplicates of the Markdown book. |
| `examples/` | New Markdown lab book. Does not duplicate canonical `docs/`; it is task-oriented. |
| Uppercase aliases | Removed in favour of lowercase canonical files. |

No Markdown tree was deleted. No source file was modified.

## 6. Case-insensitive filename collisions

The source repositories use uppercase names (`DEFAULTS.md`, `OPTIONS-CHEATSHEET.md`, `PRIVACY-GDPR.md`, `REST-CONTRACT.md`, `ERRORS-VS-LOGS.md`, `ARCHITECTURE.md`). This repository keeps the **lowercase canonical** file:

- `defaults.md` ← `DEFAULTS.md`
- `options-cheatsheet.md` ← `OPTIONS-CHEATSHEET.md`
- `privacy-gdpr.md` ← `PRIVACY-GDPR.md`
- `rest-contract.md` ← `REST-CONTRACT.md`
- `errors-vs-logs.md` ← `ERRORS-VS-LOGS.md`
- `architecture.md` ← `ARCHITECTURE.md`

On Windows/macOS the uppercase name resolves to the lowercase file; on Linux, links must use the lowercase name. All internal links were rewritten to lowercase.

## 7. Recommended next actions

1. Publish a first version or keep the unreleased warning everywhere. Do not re-enable registry-first docs before npm returns 200.
2. Add an automated link/anchor/fence checker to CI.
3. Run a real browser matrix (Firefox, Safari, iOS) before widening the support claim.
4. Add an axe run and a keyboard/screen-reader pass; only then revisit accessibility language.
5. Test Vue 2.7 and Svelte 4 explicitly; today they are declared, not executed.
6. Add real HLS/DASH fixtures to the browser test.
7. Decide whether `_examples` should be in the npm `files` allowlist; it currently is not, while `examples` is.
8. Keep the example book in sync when an API changes; it has five framework variants per format.

**Canonical guides:** [Source docs mapping](./source-docs-mapping.md) · [Contributing](./contributing.md) · [Release](./release.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
