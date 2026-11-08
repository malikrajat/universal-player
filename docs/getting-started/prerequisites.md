# Prerequisites

> [Docs home](../README.md) › [Getting started](./introduction.md) › Prerequisites

## Runtime

| Requirement | Value | Notes |
| --- | --- | --- |
| Browser | Declared Chrome/Edge 125+, Firefox 128+, Safari 18+ | Declared floor, not an automated matrix. The only executed browser test is Chromium. |
| Module system | ESM | `"type": "module"`; no CommonJS entry. |
| Custom Elements | Required for `<universal-player>` | `defineUniversalPlayerElement()` returns `false` when unavailable. |
| Media APIs | `HTMLMediaElement`, `URL.createObjectURL` | Object URLs are required for `Blob`/`File` and chunked fallback. |
| Optional APIs | Fullscreen, Picture-in-Picture, Remote Playback, MediaSource | Feature-detect; the player emits typed errors when absent. |

## Development

| Requirement | Value |
| --- | --- |
| Node.js | `>=24.0.0` |
| Package manager | `pnpm@11.5.1` (repo); the published package works with any ESM package manager |
| TypeScript | 5.9.x in the repo; declarations ship with the package |
| Test runner | Vitest 5.1.0 + jsdom; Playwright Chromium for browser tests |

## Framework peers

| Framework | Declared range | Built/tested here |
| --- | --- | --- |
| React | `>=18` | React 19.3.1 |
| Vue | `^2.7 \|\| ^3` | Vue 3.5.44 |
| Angular | `>=17` | Angular 22.2.4 |
| Svelte | `^4 \|\| ^5` | Svelte 5 |

Vue 2.7 and Svelte 4 are declared but not executed by this repository's tests. Do not infer verification from the range.

## Optional streaming peers

`hls.js ^1.5.0` for HLS and `dashjs ^5.0.0` for DASH. Both are optional and lazily imported.

## TypeScript configuration

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

`Node16`/`NodeNext` resolution also works because every export has an explicit `types` condition.

**Next:** [Installation](./installation.md)

---

← Previous: [Why this library](./why-this-library.md) · Next: [Installation](./installation.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
