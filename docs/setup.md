# Setup

> [Docs home](./README.md) › Setup

[← Docs](./README.md) · [Installation](./installation.md) · [Quick start →](./quick-start.md)

This page covers both sides of setup: installing the package into an
application, and running the library repository locally.

---

## Part 1 — Application setup

### 1. Pick a rendering mode

| Mode              | What you import                                      | When to use it                                            |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Custom element    | `@codewithrajat/universal-player` or `/ui`           | Plain HTML, CMS, server-rendered shells, micro-frontends. |
| Vanilla mount     | `/vanilla`                                           | A JS entry point without a framework.                     |
| Headless core     | `/core`                                              | You own the complete UI.                                  |
| Framework adapter | `/react`, `/vue`, `/angular`, `/svelte4`, `/svelte5` | Your app already owns the component tree.                 |

The custom element gives you the built-in controls, menus, surveys, shortcuts,
theming and i18n. The headless core gives you playback and state only.

### 2. Provide a sized host

The player fills its container. Give the host an explicit aspect ratio or
height, otherwise a percentage-height child can collapse to zero.

```css
.player-host {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
```

```html
<div id="app" class="player-host"></div>
```

### 3. Lock down media sources

Use same-origin media where possible. For cross-origin media:

- The server must allow the origin in `Access-Control-Allow-Origin`.
- Set `crossorigin="anonymous"` on `<universal-player>` or
  `crossOrigin: "anonymous"` in `PlayerOptions` when you need canvas,
  captions, or cross-origin track access.
- HLS/DASH manifests and every segment must be CORS-enabled. A manifest that
  loads but whose segments do not is the most common "black screen" cause.

### 4. Register the element once

The root and `/ui` entries register `<universal-player>` idempotently on import.
In a micro-frontend, import `/core` in shared code and register once at the
shell:

```ts
import { defineUniversalPlayerElement } from "@codewithrajat/universal-player/ui";

defineUniversalPlayerElement(); // safe to call more than once
```

### 5. Decide shadow or light DOM

| Mode             | How                                                | Trade-off                                             |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Shadow (default) | No attribute                                       | Style isolation; built-in CSS injected automatically. |
| Light            | `shadow="light"` + `styles.css` or `inject-styles` | Host page CSS applies; you must load styles.          |

`shadow` is read when the element mounts. Changing it later requires
re-creating the element (or calling `destroy()` then reconnecting).

### 6. Choose a theme mode

```html
<universal-player src="/clip.mp4" theme="system"></universal-player>
```

`theme` accepts `light`, `dark` or `system` (default). `system` follows
`prefers-color-scheme`. Set a brand accent with `accent-color`:

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

### 7. Configure declarative options

Simple options are attributes. Structured options are JSON attributes:

```html
<universal-player
  src="/clip.mp4"
  poster="/poster.jpg"
  controls="custom"
  theme="dark"
  locale="en"
  ui='{"download":false,"settings":{"stats":false}}'
  chapters='[{"id":"intro","title":"Intro","startTime":0}]'
  playlist='{"items":[{"source":"/one.mp4","title":"One"}],"autoAdvance":true}'
  captions='{"enabled":true,"tracks":[{"src":"/en.vtt","label":"English","language":"en"}]}'
></universal-player>
```

Malformed JSON is ignored rather than thrown, so validate configuration in
your own tests. See [Configuration](./configuration.md) for the precedence
rules.

### 8. Set up lifecycle cleanup

For the headless core and vanilla mount, always destroy the player when the
route or component unmounts. Framework adapters do it for you.

```ts
const player = createPlayer({ container, source });

router.afterEach(() => player.destroy());
```

---

## Part 2 — Repository setup

### 1. Clone and install

```bash
git clone https://github.com/malikrajat/universal-player.git
cd universal-player
pnpm install
```

The repository pins `pnpm@11.5.1` through `packageManager` and Node `>= 24`
through `.nvmrc` and `engines`. `corepack enable` is the simplest way to get the
right pnpm.

### 2. Run the checks

```bash
pnpm run check        # lint + format (Vite+ / oxlint / oxfmt)
pnpm run typecheck    # tsc --noEmit
pnpm run test         # Vitest, jsdom
pnpm run test:browser # Vitest browser mode, Playwright, Chromium
pnpm run build        # ESM + d.ts
pnpm run docs         # TypeDoc
pnpm run validate     # full local gate
```

`validate` chains lint, typecheck, tests, build, tarball allowlist,
browser-import scan, publint and attw. Run it before opening a pull request.

### 3. Understand the build

| Script          | What it does                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `build`         | `vp pack` → `dist/entries/*`, `dist/frameworks/*`, `dist/ui/styles.css`, source maps, bundled `.d.ts`. |
| `check:pack`    | Verifies the tarball allowlist and that every export target exists.                                    |
| `check:imports` | Fails if a browser-facing module imports a Node built-in or global.                                    |
| `check:exports` | `publint --strict`.                                                                                    |
| `check:types`   | `attw --pack . --profile esm-only`.                                                                    |
| `sbom`          | CycloneDX SBOM at `sbom.json`.                                                                         |

### 4. Work on docs locally

The docs are plain Markdown with relative links. There is no docs build step.
Open `docs/README.md` on GitHub, in VS Code preview, or in any Markdown viewer.

When adding a feature:

1. Update [API reference](./api-reference.md) and [Options cheatsheet](./options-cheatsheet.md).
2. Update [Defaults](./defaults.md) if a default changed.
3. Update [Features](./features.md) if the status changed.
4. Add a changeset and update [Changelog](./changelog.md).
5. Add or update a page under `docs/` if the feature needs a workflow.

---

## Configuration checklist

- [ ] Package installed and entry point chosen.
- [ ] Host element has a height/aspect ratio.
- [ ] CORS configured for media and every streaming segment.
- [ ] Element registered exactly once.
- [ ] Shadow or light DOM chosen deliberately.
- [ ] Theme and accent set.
- [ ] Structured options validated as JSON.
- [ ] `destroy()` called on teardown.
- [ ] Optional peers installed only for features in use.
- [ ] CSP allows media, images, frames and connect endpoints.

**Next:** [Quick start](./quick-start.md) · [Configuration](./configuration.md)

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)