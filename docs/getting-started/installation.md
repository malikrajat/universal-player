# Installation

> [Docs home](../README.md) › [Getting started](./introduction.md) › Installation

> **The package is unreleased at 0.0.1.** `npm view @codewithrajat/universal-player` returns E404 on 2026-11-06. The registry command is **intended-only**; use a local path or tarball until a release is published.

## Option A — install from the repository folder

```bash
# from the repository root
pnpm install
pnpm build

# in your application
pnpm add file:/absolute/path/to/universal-player
```

The folder must contain `dist/`, because the export map points at built files. Re-run `pnpm build` after changing the library.

## Option B — pack a tarball

```bash
# from the repository root
pnpm build
pnpm pack --pack-destination ..

# in your application (use the exact filename printed by pnpm pack)
pnpm add ../codewithrajat-universal-player-0.0.1.tgz
```

A tarball is the closest equivalent to a registry install and is the right artifact for CI smoke tests.

## Option C — future registry install (intended only)

```bash
# Does not resolve today.
pnpm add @codewithrajat/universal-player
```

The package sets `publishConfig.access = "public"`, but no public version exists.

## Optional peers

Install only what you use. A missing optional peer fails only on the matching path.

```bash
pnpm add hls.js    # .m3u8
pnpm add dashjs    # .mpd
pnpm add rxjs      # toRxjsObservable()
```

Framework peers come from the framework app itself.

## Entry points

| Import | Gives you | Built-in UI |
| --- | --- | --- |
| `@codewithrajat/universal-player` | core + UI + vanilla helper + feature helpers | Yes (registers the element) |
| `@codewithrajat/universal-player/core` | headless player | No |
| `@codewithrajat/universal-player/ui` | element + i18n + registration | Yes |
| `@codewithrajat/universal-player/vanilla` | `mountUniversalPlayer()` | No |
| `@codewithrajat/universal-player/react` | React component + hook | No |
| `@codewithrajat/universal-player/vue` | Vue component + composable | No |
| `@codewithrajat/universal-player/angular` | Angular controller | No |
| `@codewithrajat/universal-player/svelte4` / `svelte5` | source component | No |
| `@codewithrajat/universal-player/styles.css` | stylesheet for light-DOM UI | n/a |

## Styles

- Shadow DOM is the default. The element injects its stylesheet into the shadow root; do not import `styles.css`.
- Light DOM (`shadow="light"`): import `@codewithrajat/universal-player/styles.css` once, or add the `inject-styles` attribute.
- Headless entries: `styles.css` does **not** create controls. Use `controls: "native"` or your own chrome.

## Verify the install

```ts
import { PLAYER_ERROR_CODES, createPlayer, isPlayerError } from "@codewithrajat/universal-player/core";

console.log(PLAYER_ERROR_CODES.length); // 9
console.log(typeof createPlayer, typeof isPlayerError);
```

If this resolves in a browser bundle, the export map is healthy.

## Common install mistakes

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Failed to resolve @codewithrajat/universal-player` | Trying the registry before publication | Use the folder or tarball. |
| `dist/entries/core.js` missing | Folder installed before build | Run `pnpm build` in the library. |
| `require() of ES Module` | CommonJS `require` | Use dynamic `import()`. |
| `<universal-player>` unknown | Imported only `/core` or a framework adapter | Import the root or `/ui`. |
| No controls visible | Headless entry with `controls: "custom"` | Use the custom element or `controls: "native"`. |
| `document is not defined` | SSR render | Mount client-side only. |

**Next:** [Setup](./setup.md)

---

← Previous: [Prerequisites](./prerequisites.md) · Next: [Setup](./setup.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
