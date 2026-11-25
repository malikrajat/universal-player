# Installation

> [Docs home](./README.md) › Installation

> **Published on npm:** `@codewithrajat/universal-player@0.0.1` is available from the public npm registry. Install it from the registry with any ESM-capable package manager. Verify the current version with `npm view @codewithrajat/universal-player version`.

## 1. Install from npm

```bash
npm install @codewithrajat/universal-player
# or
pnpm add @codewithrajat/universal-player
# or
yarn add @codewithrajat/universal-player
# or
bun add @codewithrajat/universal-player
```

The published package contains the built `dist/` files that every export points at. No build step is needed in your application. Each release is published from the repository with `publishConfig.access = "public"` and npm provenance.

## 2. Requirements

| Requirement | Value |
| --- | --- |
| Node.js (build/dev) | `>=24.0.0` |
| Package manager used by the repo | `pnpm@11.5.1` |
| Runtime | Evergreen browser, ESM only |
| TypeScript | 5.9+ recommended; declarations ship per entry |
| SSR | Not supported for the player or wrappers |

## 3. Optional peers

Every peer is optional. A missing peer fails only on the matching path.

| Feature | Install |
| --- | --- |
| HLS (`.m3u8`) | `pnpm add hls.js` |
| MPEG-DASH (`.mpd`) | `pnpm add dashjs` |
| RxJS bridge | `pnpm add rxjs` |
| React adapter | framework app already has `react` |
| Vue adapter | framework app already has `vue` |
| Angular adapter | framework app already has `@angular/core` |
| Svelte adapter | framework app already has `svelte` |

## 4. Choose an entry point

| Import | Gives you | Built-in UI |
| --- | --- | --- |
| `@codewithrajat/universal-player` | core + UI registration + vanilla helper + feature helpers | **Yes** |
| `@codewithrajat/universal-player/core` | headless player | No |
| `@codewithrajat/universal-player/ui` | element + i18n + registration | **Yes** |
| `@codewithrajat/universal-player/vanilla` | `mountUniversalPlayer()` | No |
| `@codewithrajat/universal-player/react` | React component + hook | No |
| `@codewithrajat/universal-player/vue` | Vue 2.7/3 component + composable | No |
| `@codewithrajat/universal-player/angular` | decorator-free controller | No |
| `@codewithrajat/universal-player/svelte4` | Svelte 4 source component | No |
| `@codewithrajat/universal-player/svelte5` | Svelte 5 source component | No |
| `@codewithrajat/universal-player/styles.css` | stylesheet for light-DOM UI | n/a |
| `@codewithrajat/universal-player/package.json` | metadata | n/a |

There are **9 code entry points** (root + 8 subpaths) and two non-code subpaths. There is no `/features` subpath; feature helpers are re-exported from the root.

## 5. First import

### Full UI

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player src="/media/clip.mp4" controls="custom"></universal-player>
```

Shadow DOM is the default and injects its own styles. For light DOM:

```html
<script type="module">
  import "@codewithrajat/universal-player/ui";
  import "@codewithrajat/universal-player/styles.css";
</script>

<universal-player src="/media/clip.mp4" shadow="light"></universal-player>
```

### Headless

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector<HTMLElement>("#app")!,
  source: "/media/clip.mp4",
  controls: "native", // otherwise this surface has no controls
});
```

### React (headless)

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Demo() {
  return <UniversalPlayer source="/media/clip.mp4" controls="native" />;
}
```

The React/Vue/Angular/Svelte adapters render a host element for the core. They do **not** render the built-in control bar. Importing `styles.css` does not change that; use the custom element or native controls.

## 6. TypeScript

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "strict": true
  }
}
```

`Node16`/`NodeNext` resolution works because each export has an explicit `types` condition.

## 7. Bundlers and CSP

- ESM, `unbundle: true`, browser platform, ES2023.
- `sideEffects` is limited to CSS and the two element-registering entries.
- No `eval` or dynamic code generation.
- CSP additions: `media-src`, `img-src`, `frame-src` (embeds), `connect-src` (HLS/DASH), optional `style-src 'unsafe-inline'` for `inject-styles`.

## 8. Verify

```ts
import { PLAYER_ERROR_CODES, createPlayer, isPlayerError } from "@codewithrajat/universal-player/core";

console.log(PLAYER_ERROR_CODES.length); // 9
console.log(typeof createPlayer, typeof isPlayerError);
```

## Common mistakes

| Symptom | Cause | Fix |
| --- | --- | --- |
| Cannot resolve the package | Wrong version pin, offline/mirror, or stale cache | Check `npm view @codewithrajat/universal-player version`, pin `0.0.1`, retry with a cleared cache |
| `dist/entries/*.js` missing | Corrupt or partially installed package | Reinstall `@codewithrajat/universal-player` and clear the package-manager cache |
| `require() of ES Module` | CommonJS | Dynamic `import()` |
| `<universal-player>` unknown | Imported only `/core` or an adapter | Import root or `/ui` |
| No controls | Headless entry with `controls: "custom"` | Custom element or `controls: "native"` |
| `document is not defined` | SSR render | Client-only mount |

**Next:** [Quick start](./quick-start.md) · [Getting started](./getting-started/introduction.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
