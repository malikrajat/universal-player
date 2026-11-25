# Setup

> [Docs home](../README.md) › [Getting started](./introduction.md) › Setup

> **Consumers:** install the published package with `npm install @codewithrajat/universal-player` and start with the application setup below. The repository commands further down are for contributors working on the library itself.

## Install the published package

```bash
npm install @codewithrajat/universal-player
```

## Repository setup (maintainers and contributors)

```bash
pnpm install
pnpm build
pnpm test
```

Useful scripts:

| Script | Purpose |
| --- | --- |
| `pnpm run build` | `vp pack` → `dist/entries/*`, `dist/frameworks/*`, `dist/ui/styles.css` |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm test` | Unit tests in jsdom |
| `pnpm run test:browser` | Playwright Chromium smoke test |
| `pnpm run check:pack` | Verify the tarball allowlist |
| `pnpm run check:imports` | Scan browser bundles for Node built-ins |
| `pnpm run check:exports` | `publint --strict` |
| `pnpm run check:types` | `attw` ESM-only profile |

## Application setup — full UI

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      universal-player {
        display: block;
        inline-size: min(960px, 100%);
        margin-inline: auto;
        aspect-ratio: 16 / 9;
      }
    </style>
  </head>
  <body>
    <script type="module">
      import "@codewithrajat/universal-player";
    </script>
    <universal-player src="/media/clip.mp4" controls="custom"></universal-player>
  </body>
</html>
```

## Application setup — headless

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#app", {
  source: "/media/clip.mp4",
  controls: "native",
});

window.addEventListener("pagehide", () => player.destroy(), { once: true });
```

## Shadow or light DOM

| Mode | How | Styling |
| --- | --- | --- |
| Shadow (default) | No attribute | Injected automatically; host page CSS cannot reach internals. Use `::part()` and CSS variables. |
| Light | `shadow="light"` | Global CSS applies. Import `styles.css` or add `inject-styles`. |

`shadow` is read at mount and can be changed by re-creating the element. The element's attribute callback remounts on `shadow` change, but a fresh element is simpler.

## Content Security Policy

| Directive | Needed for |
| --- | --- |
| `media-src` | Media origins, `blob:`, `data:` |
| `img-src` | Posters, thumbnails, sprites, image sources |
| `frame-src` | YouTube, Vimeo, generic embeds |
| `connect-src` | HLS/DASH manifests and segments, survey/analytics endpoints |
| `style-src 'unsafe-inline'` | Only for `inject-styles` in some browsers |

The player does not use `eval` or dynamic code generation.

**Next:** [Quick start](./quick-start.md) · [First example](./first-example.md)

---

← Previous: [Installation](./installation.md) · Next: [Quick start](./quick-start.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
