# Decisions

> [Docs home](./README.md) � Decisions

[← Docs](./README.md) · [Architecture](./architecture.md) · [Why this library](./why-this-library.md)

An ADR-style record of the decisions that shaped the library, with context,
alternatives and consequences. The canonical internal copy also exists in
`_docs/decisions.md`; this page is the public, expanded version.

---

## 1. Product identity

| Decision        | Choice                                                  |
| --------------- | ------------------------------------------------------- |
| Package name    | `@codewithrajat/universal-player`                       |
| Version         | `0.0.1`                                                 |
| License         | MIT                                                     |
| Scope           | Video, audio, images and embeds                         |
| Engines         | Native + image + chunked + HLS + DASH + embeds (no DRM) |
| Runtime format  | ESM only                                                |
| Source strategy | TypeScript source → JavaScript + `.d.ts`                |
| Node minimum    | 24                                                      |
| Package manager | pnpm 11.5.1                                             |

“Universal” means **media types**, not just `<video>`.

### Why no DRM?

DRM requires per-platform EME/license-server work and vendor agreements. It is
explicitly out of scope for `0.0.1`.

### Why browser-only?

Media playback, object URLs, fullscreen, PiP and Custom Elements are browser
concepts. Instead of pretending SSR works, the package states that it does not.
`core` happens to be import-safe, but no SSR guarantees are documented.

---

## 2. Product surface

| Area                 | Choice                                                                |
| -------------------- | --------------------------------------------------------------------- |
| Core playback        | Captions, multi-audio, quality, speed, PiP, fullscreen                |
| Extended             | AirPlay, casting prompt, thumbnails, chapters, playlist, resume, live |
| Extras               | Ads contract, analytics, mini-player, VR contract                     |
| Controls             | Custom with native fallback                                           |
| DOM                  | Configurable Shadow/light DOM                                         |
| Theming              | CSS variables + light/dark/system                                     |
| i18n                 | English + locale registry + per-instance overrides                    |
| Accessibility target | WCAG 2.2 AA                                                           |
| Plugin system        | **None** (internal engines only)                                      |
| SSR                  | **Not supported**                                                     |
| Browsers             | Evergreen, ES2023                                                     |
| Bundle budget        | Not enforced yet                                                      |
| Runtime deps         | Zero core; optional peers                                             |
| Event styles         | DOM + typed emitter + observables                                     |
| Error model          | Plain `Error` with stable `code`                                      |
| Public API           | Class + factory + custom element + adapters                           |
| Element tag          | `<universal-player>`                                                  |

### Why no public plugin registry?

The product needs a small, predictable engine set. Internal adapters keep the
public surface stable and prevent third-party engines from becoming an
unmaintained compatibility burden. New engines are added in-repo through
`PlayerEngine`. This can evolve into a public registry in a major release.

---

## 3. Architecture and tooling

| Area               | Choice                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Repository         | Single package                                                                             |
| Folder layout      | `core/adapters/entries/features/frameworks/ui/vanilla`                                     |
| Build              | Vite+ (`vp pack`)                                                                          |
| Bundling           | `unbundle: true`, ESM, source maps, bundled `.d.ts`                                        |
| TypeScript target  | ES2023 + DOM                                                                               |
| Strictness         | `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` |
| Exports            | 9 code entry points (root + 8 subpaths) + `styles.css`                                                           |
| CSS                | Separate `styles.css` + optional injection + shadow adoption                               |
| Tests              | Vitest + jsdom + Playwright browser mode                                                   |
| Coverage           | 90% lines/functions/statements, 80% branches                                               |
| Examples           | Vanilla, React, Vue, Angular, Svelte                                                       |
| Lint/format        | Vite+ `vp check`                                                                           |
| CI                 | Full gate + browser job                                                                    |
| Package validation | publint + attw + tarball allowlist + browser-import scan                                   |

### Why `unbundle: true`?

It preserves the module graph so consumers can tree-shake unused adapters and
features, and it makes the published output easier to audit.

### Why ESM-only?

The package targets modern browsers and bundlers. It avoids the dual-package
hazard and keeps the export map small. CommonJS consumers can use dynamic
`import()`.

### Why optional peers?

`hls.js` and `dashjs` are large and only useful for streaming. `rxjs` is only
needed by the explicit RxJS bridge. Framework packages are provided by the host
application. Making them peers keeps the core dependency-free.

---

## 4. Framework decisions

| Area    | Choice                                                                  |
| ------- | ----------------------------------------------------------------------- |
| React   | `>=18`, hook + `forwardRef` component                                   |
| Vue     | `^2.7                                                                   |     | ^3`, one entry using the Composition API |
| Angular | `>=17`, decorator-free controller + consumer-owned standalone component |
| Svelte  | Separate `/svelte4` and `/svelte5` entries                              |

### Why Vue 2.7 + Vue 3 in one entry?

Vue 2.7 backports the Composition API, so a single implementation is possible.
Vue 2.6 is not supported. Vue 2 is end-of-life; the range exists for enterprise
consumers who have not migrated yet.

### Why an Angular controller instead of a component?

Angular AOT requires partial-compilation metadata or fully compiled output.
Vite+ pack is not an Angular compiler, so shipping a decorated component would
break AOT consumers. The controller pattern lets the consumer own a small
standalone component and forward lifecycle hooks.

### Why separate Svelte entries?

Svelte 4 and Svelte 5 have different component authoring models (stores vs
runes). Shipping two source components avoids legacy-mode surprises.

---

## 5. Playback decisions

### Why one engine per player?

Simpler state, predictable teardown, no hidden crossfades. Replacing a source
destroys the old engine first.

### Why immutable state?

Consumers can compare snapshots, framework adapters can rely on reference
changes, and engines cannot accidentally mutate shared state.

### Why silent `timeupdate`?

Replacing state 4–60 times per second would re-render every consumer. Silent
patches let a progress bar subscribe cheaply while full state changes remain
rare.

### Why plain errors with codes?

A custom error subclass complicates cross-bundle `instanceof`. A stable,
enumerable `code` is easy to branch on and survives serialization.

### Why three event styles?

Different consumers: DOM integration, typed app code, reactive pipelines. One
bus keeps ordering and isolation consistent.

---

## 6. UI decisions

### Adaptive controls

Every engine advertises `PlayerCapabilities`. The UI uses that plus media `kind`
instead of guessing from the URL. Adding an engine automatically removes
unsupported controls.

### Configurable surface

Consumers can override the surface through one optional `ui` bag: allow-list,
hide, order, menu sections, speed/download, gestures and tokens. The Settings
menu uses subviews rather than one long list.

### Playlist gating in the core

`requireCompletion`, `gateAdvance`, `allowNext` and `allowPrevious` are enforced
by `next()`/`playPlaylistItem()`, not just hidden in the UI, so keyboard and
programmatic calls cannot bypass a course/kiosk rule.

### Surveys in the core

Surveys need the same lifecycle knowledge as playback (`ended`, current time,
source, duration). The core owns the state machine, validation, persistence,
events and callbacks; the UI only renders questions. A survey can come from
options, source metadata, `setSurvey()`, or a JSON attribute, and providers may
be async.

---

## 7. Release and governance

| Area            | Choice                                        |
| --------------- | --------------------------------------------- |
| Release tooling | Changesets + GitHub Actions                   |
| Provenance      | npm provenance enabled                        |
| Branch model    | `main` + `develop`                            |
| API policy      | Strict SemVer + documented deprecation window |
| npm access      | Public                                        |
| Governance      | Full enterprise set                           |
| Docs language   | English                                       |
| License headers | None; `LICENSE` only                          |

Full governance set: `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
`CODEOWNERS`, `SUPPORT.md`, issue templates, PR template, Dependabot, CodeQL,
SBOM/package validation, editor configs and Changesets.

---

## 8. Known open items

1. Cast SDK integration (contract only; Remote Playback prompt works).
2. Ads VAST/IMA (contract + stub).
3. Live DVR UI (state/helpers exist).
4. 360/VR rendering (contract only).
5. Formal a11y audit (markup targets AA; axe not wired).
6. Bundle budget.
7. Vue 2.7 CI fixture.

---

## 9. Alternatives considered

| Alternative                | Rejected because                                                   |
| -------------------------- | ------------------------------------------------------------------ |
| Wrap Video.js              | Large dependency, plugin ecosystem we cannot guarantee.            |
| Wrap Shaka                 | Strong DRM but different scope; no surveys/images/embeds.          |
| Framework-specific players | Duplicated behaviour and inconsistent UX.                          |
| Public plugin registry now | Support and security burden before the core is stable.             |
| SSR-first architecture     | Media APIs are browser-only; pretending otherwise adds complexity. |
| CSS-in-JS theming          | Host apps need plain CSS tokens and parts.                         |

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)