# Project structure

> [Docs home](../README.md) › [Project](./architecture.md) › Project structure

The repository layout and the rules that keep it coherent.

| Path | Responsibility |
| --- | --- |
| `src/core/player.ts` | `UniversalPlayer`, playlist, surveys, resume, analytics, lifecycle |
| `src/core/source.ts` | Normalisation, MIME/extension tables, object URLs, tokens |
| `src/core/types.ts` | Every public type |
| `src/core/events.ts` | Event bus, observable, RxJS bridge |
| `src/core/errors.ts` | Nine codes, `createPlayerError`, `toPlayerError` |
| `src/core/engine.ts` | Engine contract and capability constants |
| `src/core/engines.ts` | Internal provider → factory switch |
| `src/core/media-events.ts` | Media element → player event bridge |
| `src/adapters/*` | One directory per provider |
| `src/features/*` | Pure helpers and feature contracts |
| `src/entries/*` | Public entry files |
| `src/frameworks/*` | React/Vue/Angular/Svelte wrappers |
| `src/ui/*` | Element, styles, i18n, icons, survey panel |
| `src/vanilla/mount.ts` | DOM mount helper |
| `tests/unit` | jsdom tests |
| `tests/browser` | Chromium smoke test |
| `scripts` | Pack allowlist and browser-import checks |
| `docs` | Canonical Markdown docs |
| `examples` | Markdown example book |
| `_examples` | Runnable demo apps |

## Invariants

1. No UI/framework imports in core.
2. No static SDK import in adapters.
3. No engine access from the UI.
4. Public types stay in `src/core/types.ts` or beside the feature.
5. Every entry is declared in `package.json` and `vite.config.ts`.
6. Tests cover core, quality, speed and chapters at the coverage gate.

## Adding files

| Change | Files |
| --- | --- |
| New entry | `src/entries/*.ts`, `package.json` exports, `vite.config.ts` entries |
| New engine | `src/adapters/<name>`, `types.ts`, `engines.ts`, `source.ts` |
| New UI control | `PlayerControl`, `element.ts`, `styles.css` |
| New feature | `src/features/<name>`, re-export from `src/features/index.ts` |
| New framework adapter | `src/frameworks/<name>`, entry, package export |

**Next:** [Changelog](./changelog.md)

---

← Previous: [Architecture](./architecture.md) · Next: [Changelog](./changelog.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
