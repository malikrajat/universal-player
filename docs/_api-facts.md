# Verified API and project facts

> [Docs home](./README.md) › Verified API facts

A maintainer's fact sheet. Every value was read from `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.browser.config.ts`, the source tree or the live npm registry on 2026-11-06. Where prose elsewhere disagrees, this page and the source win.

## 1. Package identity

| Item | Verified value |
| --- | --- |
| npm package | `@codewithrajat/universal-player` |
| Version | `0.0.1` |
| Publication | **Unreleased** — `npm view` returns E404 on 2026-11-06 |
| Description | Framework-agnostic universal media player for video, audio, images and embeds |
| License | MIT |
| Author | Rajat Malik |
| Repository | `https://github.com/malikrajat/universal-player` |
| Module format | ESM only (`"type": "module"`) |
| Runtime dependencies | **none** |
| Node engine | `>=24.0.0` |
| Package manager | `pnpm@11.5.1` |
| Side effects | `**/*.css`, `./dist/entries/index.js`, `./dist/entries/ui.js` |
| Build | Vite+ `vp pack`: ESM, `unbundle: true`, browser platform, `es2023`, declarations, source maps |
| Tests | Vitest 5.1.0 + jsdom; browser mode with Playwright Chromium |
| Coverage gate | 90% lines/functions/statements, 80% branches, scoped to core + quality + speed + chapters |
| Release tooling | Changesets, publint, attw (esm-only), tarball allowlist, browser-import scan |

## 2. Entry points

There are **9 code entry points** (root plus 8 subpaths) and **2 non-code subpaths**.

| Subpath | Target | Registers `<universal-player>` |
| --- | --- | --- |
| `.` | `./dist/entries/index.js` | Yes (import side effect) |
| `./core` | `./dist/entries/core.js` | No |
| `./ui` | `./dist/entries/ui.js` | Yes (import side effect) |
| `./vanilla` | `./dist/entries/vanilla.js` | No |
| `./react` | `./dist/entries/react.js` | No |
| `./vue` | `./dist/entries/vue.js` | No |
| `./angular` | `./dist/entries/angular.js` | No |
| `./svelte4` | `./dist/frameworks/svelte4/UniversalPlayer.svelte` | No |
| `./svelte5` | `./dist/frameworks/svelte5/UniversalPlayer.svelte` | No |
| `./styles.css` | `./dist/ui/styles.css` | n/a |
| `./package.json` | `./package.json` | n/a |

There is no `/features`, `/dist`, `/src`, `/styles` or `/ui/styles` subpath. Feature helpers are re-exported from the root entry.

## 3. Peer dependencies (all optional)

```json
{
  "@angular/core": ">=17.0.0",
  "dashjs": "^5.0.0",
  "hls.js": "^1.5.0",
  "react": ">=18.0.0",
  "rxjs": "^7.8.0",
  "svelte": "^4.0.0 || ^5.0.0",
  "vue": "^2.7.0 || ^3.0.0"
}
```

Every one is `optional: true` in `peerDependenciesMeta`. Do not describe a peer as required.

## 4. The UI boundary (most common documentation error)

| Surface | Renders built-in controls? | Why |
| --- | --- | --- |
| `<universal-player>` (root or `/ui`) | **Yes** | `UniversalPlayerElement` builds the control bar and menus. |
| `/core` `UniversalPlayer` | **No** | It creates `.up-stage` and the engine's media element only. `controls: "custom"` sets `element.controls = false`. |
| `/vanilla` `mountUniversalPlayer()` | **No** | It is a thin wrapper around `new UniversalPlayer`. |
| `/react` `<UniversalPlayer>` | **No** | Renders a host `div`; the core mounts the media element. |
| `/vue` `<UniversalPlayer>` | **No** | Same host-div pattern. |
| `/angular` controller | **No** | Same host-div pattern. |
| `/svelte4`, `/svelte5` | **No** | Same host-div pattern. |

`styles.css` styles the built-in UI. Importing it into a headless app does not create controls. For headless surfaces use `controls: "native"`, mount the custom element, or write custom chrome.

## 5. Engine providers (8)

`native`, `chunked`, `hls`, `dash`, `image`, `youtube`, `vimeo`, `generic-embed`.

Engine selection is internal (`src/core/engines.ts`). There is **no public plugin/engine registry**.

## 6. Real defaults (summary)

| Option | Default |
| --- | --- |
| `controls` | `"custom"` (no chrome in headless) |
| `theme` | Built-in UI resolves `"system"` |
| `locale` | `"en"` |
| `autoplay` / `muted` / `loop` | `false` |
| `preload` | `"metadata"` |
| `playsInline` | `true` for video |
| `volume` | `1` (clamped 0–1) |
| `playbackRate` | `1` (clamped 0.25–4) |
| `startTime` | `undefined` |
| `live` | `false` |
| `keyboard`, `clickToPlay`, `doubleClickFullscreen`, `autoHideControls` | `true` (**UI only**) |
| `seekStep` / `volumeStep` | `5` / `0.1` (**UI only**) |
| `resume.enabled` / `minDuration` | `false` / `30` |
| `analytics.enabled` | `true`, but no `onEvent` means no-op |
| `ui.idleDelay` | `3000` ms, minimum `500` |
| `ui.gestures.enabled` | `false`; threshold `48` |
| `survey.trigger / once / submitMode` | `"ended"` / `true` / `"manual"` |
| `playlist.startIndex / autoAdvance / loop` | `0` / `false` / `false` |
| `image.minZoom / maxZoom` | `0.25` / `8` |
| `captions.persist` | `true` |

Full table: [Defaults](./defaults.md).

## 7. Stable error codes (9)

`invalid-argument`, `invalid-state`, `unsupported-source`, `unsupported-environment`, `network-error`, `media-error`, `aborted`, `destroyed`, `not-implemented`.

`aborted` is reserved; no public API emits it in `0.0.1`. `not-implemented` is emitted by the ad-controller stub.

## 8. Implemented, conditional and absent

| State | Items |
| --- | --- |
| Implemented + unit-tested | Core player, source normalisation, events, errors, native/image/HLS/DASH/embed/chunked engines (unit tests), UI element (jsdom), i18n, feature helpers, React/Vue/Angular controller logic |
| Browser-executed | A Chromium smoke test; not Firefox, Safari or mobile |
| Conditional | HLS (hls.js or native HLS), DASH (dashjs), Captions (browser text tracks), Fullscreen/PiP (browser APIs), Resume/survey persistence (localStorage) |
| Provider-only | YouTube/Vimeo commands and time sync; HLS level ladder; DASH representations |
| Scaffolded / contract-only | Google Cast SDK (`CastProvider`), VAST/IMA ads (`createAdController` throws), 360/VR (`setVrMode` writes data attributes only) |
| Not supported | DRM/EME, SSR rendering, public engine registry, CommonJS `require`, transcript panel, embedded metadata parsing (chapters/thumbnails must be supplied), transcoding/remuxing |

## 9. Browser support claim

Declared floor: Chrome/Edge 125+, Firefox 128+, Safari 18+, ES2023, ESM only. Executed browser: **Chromium only** (Playwright, headless). Do not claim Safari or mobile verification.

## 10. Test and release facts

- Unit: `tests/unit/**/*.test.ts` in jsdom, setup `tests/setup.ts`.
- Browser: `tests/browser/smoke.browser.test.ts`, Chromium.
- Validation: `pnpm run check`, `typecheck`, `test`, `build`, `check:pack`, `check:imports`, `check:exports`, `check:types`.
- Release: Changesets; no public release has been published.
- Branch model documented in [Release](./maintainers/release.md).

## 11. Documentation facts

- Canonical folder: `docs/` (lowercase, singular).
- Generated TypeDoc output: `_docs/api` (HTML, not a parallel Markdown tree).
- Lowercase filenames are canonical. Uppercase aliases from other doc sets resolve to them on case-insensitive filesystems.
- The separate lab book lives in `examples/` (Markdown only), while runnable Vite/Angular apps live in `_examples/`.

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
