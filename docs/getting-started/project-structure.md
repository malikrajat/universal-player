# Project structure

> [Docs home](../README.md) › [Getting started](./introduction.md) › Project structure

```text
universal-player/
├─ src/
│  ├─ core/            player, source, state, events, errors, engine contract
│  ├─ adapters/        native, image, chunked, hls, dash, youtube, vimeo, embed
│  ├─ entries/         public entry files (core, ui, vanilla, react, vue, angular)
│  ├─ features/        captions, chapters, playlist, quality, survey, resume, …
│  ├─ frameworks/      react, vue, angular, svelte4, svelte5 wrappers
│  ├─ ui/              element.ts, styles.css, i18n, icons, survey panel
│  └─ vanilla/         mountUniversalPlayer()
├─ tests/
│  ├─ unit/            Vitest + jsdom
│  └─ browser/         Chromium smoke test
├─ scripts/            pack allowlist + browser-import checks
├─ docs/               canonical Markdown documentation
├─ examples/           Markdown example book (this task)
├─ _examples/          runnable Vite/Angular demo apps
└─ _docs/api/          generated TypeDoc HTML (not a Markdown tree)
```

## Entry → source map

| Entry | Source |
| --- | --- |
| `.` | `src/entries/index.ts` |
| `./core` | `src/entries/core.ts` |
| `./ui` | `src/entries/ui.ts` |
| `./vanilla` | `src/entries/vanilla.ts` |
| `./react` | `src/entries/react.ts` |
| `./vue` | `src/entries/vue.ts` |
| `./angular` | `src/entries/angular.ts` |
| `./svelte4` | `src/frameworks/svelte4/UniversalPlayer.svelte` |
| `./svelte5` | `src/frameworks/svelte5/UniversalPlayer.svelte` |
| `./styles.css` | `src/ui/styles.css` |

## Rules of the codebase

1. `src/core` never imports the UI, a framework or a streaming SDK.
2. Streaming SDKs are imported with `await import()` inside their adapter.
3. The UI reads core state; it never reaches into an engine.
4. Engine selection is internal; adding one means editing `src/core/engines.ts`.
5. Every public type lives in `src/core/types.ts` or beside its feature.

**Canonical guide:** [Project structure](../project/project-structure.md)

---

← Previous: [Usage](./usage.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
