# Installation

> [Docs home](../README.md) › [Getting started](./introduction.md) › Installation

> **`@codewithrajat/universal-player@0.0.1` is published on the public npm registry.** Install it from npm; no local build or repository copy is needed.

## Install from npm

```bash
npm install @codewithrajat/universal-player
```

Equivalent commands for other package managers:

```bash
pnpm add @codewithrajat/universal-player
yarn add @codewithrajat/universal-player
bun add @codewithrajat/universal-player
```

Imports via `@codewithrajat/universal-player/...` resolve from the installed package.

## Optional peers

Install only what you use. A missing optional peer fails only on the matching path.

```bash
npm install hls.js    # .m3u8
npm install dashjs    # .mpd
npm install rxjs      # toRxjsObservable()
```

Use `pnpm add`, `yarn add` or `bun add` instead if you prefer. Framework peers come from the framework app itself.

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
| `Failed to resolve @codewithrajat/universal-player` | Installed in a different project, or a stale lockfile/cache | Run `npm install @codewithrajat/universal-player` in the app directory and refresh the lockfile. |
| `dist/entries/core.js` missing | Stale install from an older version | Reinstall the published package (`npm install @codewithrajat/universal-player`) or clear the package-manager cache. |
| `require() of ES Module` | CommonJS `require` | Use dynamic `import()`. |
| `<universal-player>` unknown | Imported only `/core` or a framework adapter | Import the root or `/ui`. |
| No controls visible | Headless entry with `controls: "custom"` | Use the custom element or `controls: "native"`. |
| `document is not defined` | SSR render | Mount client-side only. |

**Next:** [Setup](./setup.md)

---

← Previous: [Prerequisites](./prerequisites.md) · Next: [Setup](./setup.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
