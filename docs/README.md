# @codewithrajat/universal-player — documentation

**Version:** `0.0.1` · **Status:** unreleased (not on npm) · **License:** MIT · **Runtime:** browser-only ESM
**Package identity:** `@codewithrajat/universal-player` · **Repository:** [malikrajat/universal-player](https://github.com/malikrajat/universal-player)

> **Publication status (2026-11-06):** `@codewithrajat/universal-player@0.0.1` is **not published on the public npm registry**. The registry command is shown as the intended command only; use the local folder or tarball install in [Installation](./installation.md).

Framework-agnostic media playback for **video, audio, still images and third-party embeds**. One headless TypeScript core, one `<universal-player>` web component that owns the built-in UI, and thin adapters for React, Vue, Angular and Svelte.

---

## The one distinction that explains this library

| Surface | Entry | What you get |
| --- | --- | --- |
| **Full UI** | `@codewithrajat/universal-player` or `@codewithrajat/universal-player/ui` | Registers `<universal-player>`: control bar, menus, gestures, captions UI, surveys, theming. |
| **Headless** | `/core`, `/vanilla`, `/react`, `/vue`, `/angular`, `/svelte4`, `/svelte5` | Media element, state, events, adapter lifecycle. **No control chrome is rendered.** |

The framework wrappers and `mountUniversalPlayer()` mount the core, not the web component. They give you a playback surface and state; they do not give you buttons. Use `controls: "native"` for browser controls, mount `<universal-player>` for the built-in UI, or build your own chrome from `state` + methods.

---

## Start here

| If you want to… | Read |
| --- | --- |
| Install without a registry package | [Installation](./installation.md) · [Prerequisites](./prerequisites.md) |
| Get pixels on screen in five minutes | [Quick start](./quick-start.md) · [First example](./getting-started/first-example.md) |
| Understand the headless/full-UI split | [Core concepts](./core-concepts.md) · [Frameworks](./frameworks.md) |
| Copy a complete option object | [Options cheatsheet](./options-cheatsheet.md) |
| Know the value in force when an option is omitted | [Defaults](./defaults.md) |
| Look up a method, event or type | [API reference](./api-reference.md) · [API index](./API.md) |
| Handle a failure | [Troubleshooting](./troubleshooting.md) · [Error codes](./reference/errors.md) |
| See exactly what is implemented | [Feature status](./features.md) · [Format matrix](./reference/formats-matrix.md) |
| Check a browser or version claim | [Browser support](./browser-support.md) · [Versioning support](./versioning-support.md) |
| Theme the built-in UI | [Theming](./theming.md) · [Design tokens](./theming/design-tokens.md) |
| Build a production integration | [Getting started](./getting-started/introduction.md) · [Guides](./guides/basic-usage.md) · [Examples](../examples/README.md) |

---

## 30-second example (full UI)

Build the package once, then point a bundler at the folder or tarball (the registry command does not resolve today):

```bash
pnpm install
pnpm build
pnpm add file:../universal-player
```

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="dark"
  label="Product tour"
></universal-player>
```

The element registers the built-in UI and exposes a live core instance as `element.player`. Because Shadow DOM is the default, the component ships its own styles; you do **not** need `styles.css` unless you opt into `shadow="light"`.

## 30-second example (headless)

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector<HTMLElement>("#app")!,
  source: "/media/clip.mp4",
  controls: "native", // otherwise this surface has no controls
});

player.on("timeupdate", ({ currentTime, duration }) => {
  console.log(currentTime, duration);
});

await player.play();
player.destroy();
```

---

## Complete documentation map

### Getting started

| Page | Contents |
| --- | --- |
| [Introduction](./getting-started/introduction.md) | What the library is, what it is not, mental model. |
| [Why this library](./getting-started/why-this-library.md) | Problems it solves versus a plain `<video>`. |
| [Prerequisites](./getting-started/prerequisites.md) | Node, browser, peer and TypeScript requirements. |
| [Installation](./getting-started/installation.md) | Local folder/tarball install, optional peers, entry points. |
| [Setup](./getting-started/setup.md) | Repository setup, consumer setup, first mount. |
| [Quick start](./getting-started/quick-start.md) | Five mount paths in one page. |
| [First example](./getting-started/first-example.md) | A complete, explained HTML file. |
| [Usage](./getting-started/usage.md) | Sources, state, events, playlists, theming. |
| [Project structure](./getting-started/project-structure.md) | What lives where in the repo. |

### Guides

[Basic usage](./guides/basic-usage.md) · [Advanced usage](./guides/advanced-usage.md) · [Core concepts](./guides/core-concepts.md) · [Features](./guides/features.md) · [Formats](./guides/formats.md) · [Frameworks](./guides/frameworks.md) · [UI](./guides/ui.md) · [Configuration](./guides/advanced-configuration.md) · [Best practices](./guides/best-practices.md) · [Performance](./guides/performance-optimization.md) · [Optimization](./guides/optimization.md) · [Lazy loading](./guides/lazy-loading.md) · [Security](./guides/security.md) · [Accessibility](./guides/accessibility.md) · [SSR](./guides/ssr.md) · [Debugging](./guides/debugging.md) · [Theming](./guides/theme-design.md) · [Troubleshooting](./guides/troubleshooting.md)

### Reference

| Page | Contents |
| --- | --- |
| [API index](./reference/README.md) | Every public subpath and export, in one table. |
| [Core API](./reference/api-core.md) | `UniversalPlayer`, source helpers, events, errors, capabilities. |
| [Format/engine API](./reference/api-formats.md) | Engine contract, native/HLS/DASH/image/embed/chunked behaviour. |
| [Universal formats](./reference/api-universal-formats.md) | Blob, File, MediaStream, data URLs, chunked sources, arrays. |
| [Feature APIs](./reference/api-features.md) | Captions, chapters, playlist, quality, survey, resume, analytics. |
| [UI and framework APIs](./reference/api-ui-and-frameworks.md) | Element attributes/methods, React, Vue, Angular, Svelte. |
| [Errors](./reference/errors.md) | Nine stable codes, causes, recovery. |
| [Browser support](./reference/browser-support.md) | Build floor versus executed browsers. |
| [Format matrix](./reference/formats-matrix.md) | Status, capabilities, verification level per format. |

### Project

[Architecture](./project/architecture.md) · [Changelog](./project/changelog.md) · [Roadmap](./project/roadmap.md) · [FAQ](./project/faq.md) · [License](./project/license.md) · [Peer dependencies](./project/peer-dependencies.md) · [Project structure](./project/project-structure.md) · [Versioning](./project/versioning.md) · [Breaking-change policy](./project/breaking-change-policy.md)

### Concepts

[Architecture](./concepts/architecture.md) · [Lifecycle](./concepts/lifecycle.md) · [Rendering](./concepts/rendering.md) · [State management](./concepts/state-management.md) · [Performance model](./concepts/performance-model.md)

### API compatibility tree

[Component](./api/components/rm-ng-pdf-viewer.md) · [Events](./api/events/viewer-events.md) · [Viewer config](./api/interfaces/rm-ng-pdf-viewer-config.md) · [Theme config](./api/interfaces/rm-ng-pdf-theme-config.md) · [Configuration service](./api/services/configuration.md)

### Examples

[Basic](./examples/basic.md) · [Advanced](./examples/advanced.md) · [Accessibility](./examples/accessibility.md) · [Edge cases](./examples/edge-cases.md) · [Enterprise](./examples/enterprise.md) · [Integrations](./examples/integrations.md) · [Performance](./examples/performance.md)

### Theming

[Overview](./theming/overview.md) · [CSS variables](./theming/css-variables.md) · [Design tokens](./theming/design-tokens.md) · [Custom themes](./theming/custom-themes.md) · [Dark mode](./theming/dark-mode.md) · [Responsive design](./theming/responsive-design.md) · [Styling best practices](./theming/styling-best-practices.md)

### Migration

[v1 → v2](./migration/v1-to-v2.md) · [Breaking changes](./migration/breaking-changes.md) · [Deprecated APIs](./migration/deprecated-apis.md)

### Troubleshooting

[Build issues](./troubleshooting/build-issues.md) · [Common errors](./troubleshooting/common-errors.md) · [Performance](./troubleshooting/performance-issues.md) · [SSR](./troubleshooting/ssr-issues.md) · [Styling](./troubleshooting/styling-issues.md)

### Maintainers

[Documentation audit](./maintainers/documentation-audit.md) · [Source docs mapping](./maintainers/source-docs-mapping.md) · [Contributing](./maintainers/contributing.md) · [Release](./maintainers/release.md)

### Feature guides

| Page | Contents |
| --- | --- |
| [Playlists](./playlists.md) | Queues, auto-advance, completion gating, image slideshows. |
| [Captions](./captions.md) | WebVTT tracks, default selection, persistence, styling. |
| [Surveys](./surveys.md) | Feedback, NPS, reviews, quizzes, triggers and presets. |
| [Analytics](./analytics.md) | Six vendor-neutral event types and a sink. |
| [Resume](./resume.md) | localStorage position restore, min duration, keys. |
| [Live](./live.md) | Live state, edge helpers and the missing DVR UI. |
| [Images](./images.md) | Still image engine, zoom/rotate, galleries. |
| [Service worker](./service-worker.md) | Caching and range-request guidance. |
| [Examples](./examples.md) | Runnable demo apps and the example book. |

### Task-oriented root pages

[Installation](./installation.md) · [Quick start](./quick-start.md) · [Usage](./usage.md) · [Configuration](./configuration.md) · [Advanced configuration](./advanced-configuration.md) · [Best practices](./best-practices.md) · [Troubleshooting](./troubleshooting.md) · [API reference](./api-reference.md) · [API source reference](./api-source-reference.md) · [Defaults](./defaults.md) · [Options cheatsheet](./options-cheatsheet.md) · [Features](./features.md) · [Keyboard shortcuts](./keyboard-shortcuts.md) · [Theming](./theming.md) · [Frameworks](./frameworks.md) · [Performance](./performance-optimization.md) · [Security](./security.md) · [Privacy & GDPR](./privacy-gdpr.md) · [Errors vs logs](./errors-vs-logs.md) · [REST contract](./rest-contract.md) · [Testing](./testing.md) · [Extending](./extending.md) · [Extending the project](./extending-the-project.md) · [Migration](./migration.md) · [FAQ](./faq.md) · [Roadmap](./roadmap.md) · [Changelog](./changelog.md) · [Contributing](./contributing.md) · [Versioning](./versioning-and-breaking-changes.md) · [Breaking-change policy](./breaking-change-policy.md) · [License](./license.md) · [Decisions](./decisions.md) · [Why this library](./why-this-library.md) · [Architecture](./architecture.md) · [Core concepts](./core-concepts.md) · [Project structure](./project-structure.md) · [Prerequisites](./prerequisites.md) · [Setup](./setup.md) · [Browser support](./browser-support.md) · [Accessibility](./accessibility.md) · [Peer dependencies](./peer-dependencies.md)

---

## Verified facts used by every page

| Fact | Value |
| --- | --- |
| Package | `@codewithrajat/universal-player` |
| Version | `0.0.1` |
| Publication | **Unreleased**; the npm registry returns 404 for the package |
| License | MIT |
| Module format | ESM only (`"type": "module"`) |
| Runtime dependencies | None |
| Node engine | `>=24.0.0` (build/development) |
| Package manager | `pnpm@11.5.1` |
| Public code entries | 9 (root + 8 subpaths) |
| Asset entries | `./styles.css`, `./package.json` |
| Error codes | 9 |
| Engine providers | 8: native, chunked, hls, dash, image, youtube, vimeo, generic-embed |
| Build target | ES2023, browser platform |
| Browser floor | Declared Chrome/Edge 125+, Firefox 128+, Safari 18+; **not an automated matrix** |
| Executed browser test | Chromium only (Playwright smoke test) |
| SSR | Not supported for player or wrappers |

The compact fact sheet is [`_api-facts.md`](./_api-facts.md); the audit trail is [`documentation-audit.md`](./maintainers/documentation-audit.md).

---

## How to read API pages

| Marker | Meaning |
| --- | --- |
| **required** | TypeScript requires it; omitting it is a compile error. |
| **optional** | The type has `?`; omission is supported. |
| **default** | Runtime value when the key is absent. |
| **UI only** | Accepted by the type and consumed by `<universal-player>`, not by the headless core. |
| **not supported** | Not implemented in `0.0.1`; do not assume behaviour. |
| **scaffolded** | Types/contracts exist; behaviour is not wired. |
| **provider-only** | Only the named provider (YouTube, Vimeo, hls.js, dashjs) supplies it. |

`readonly` appears because published state and option types are deeply readonly. You still pass ordinary object literals.

---

## Version and support policy

- SemVer with Changesets; one minor release of deprecation before removal.
- Public API = every export reachable from the export map in `package.json`.
- Peer versions are ranges, not tested matrices. See [Peer dependencies](./peer-dependencies.md).
- The package is browser-only. `/core` is import-safe in Node, but constructing a player requires a DOM.

---

## Documentation maintenance

- [Documentation audit](./maintainers/documentation-audit.md) records what was stale and what was corrected.
- [Source docs mapping](./maintainers/source-docs-mapping.md) maps every reference file from the six source repositories.
- [Summary](./SUMMARY.md) is the GitBook/Docsify/MkDocs table of contents.

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
