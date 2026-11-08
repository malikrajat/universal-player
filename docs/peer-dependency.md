# Peer dependency (compatibility alias)

> [Docs home](./README.md) › Peer dependency

This filename is kept because some source documentation sets use the singular `peer-dependency.md`. The canonical page is [Peer dependencies](./peer-dependencies.md); this page carries the decision summary so the alias is useful on its own.

## Are peers required?

**No.** Every declared peer is marked `optional: true` in `peerDependenciesMeta`. Installation succeeds without any of them. A missing peer fails only when the matching code path runs.

| Peer | Range | When it is loaded | Failure if missing |
| --- | --- | --- | --- |
| `hls.js` | `^1.5.0` | Lazily inside the HLS engine, only for `.m3u8` | Load fails; wrapped as `media-error` with the module-resolution cause |
| `dashjs` | `^5.0.0` | Lazily inside the DASH engine, only for `.mpd` | Load fails; wrapped as `media-error` |
| `rxjs` | `^7.8.0` | Only when `toRxjsObservable()` is called | The returned promise rejects with the resolution error |
| `react` | `>=18.0.0` | Only when importing `/react` | Module resolution fails at import |
| `vue` | `^2.7.0 \|\| ^3.0.0` | Only when importing `/vue` | Module resolution fails at import |
| `@angular/core` | `>=17.0.0` | Only when importing `/angular` | Module resolution fails at import |
| `svelte` | `^4.0.0 \|\| ^5.0.0` | Peer for the shipped Svelte components | Component will not compile |

## Version claims

The repository builds and tests with React 19.3.1, Vue 3.5.44, Angular 22.2.4, Svelte 5, RxJS 7.8.2, hls.js 1.5 and dashjs 5.3. That is **not** a test matrix for every version in the ranges. Vue 2.7 and Svelte 4 are declared but not exercised by this repository's tests.

## What to install

```bash
# Only if you use HLS
pnpm add hls.js

# Only if you use DASH
pnpm add dashjs
```

Framework peers are already present in a framework app. Do not add a second copy.

**Canonical guide:** [Peer dependencies](./peer-dependencies.md) · [Installation](./installation.md)

---

← Previous: [Peer dependencies](./peer-dependencies.md) · Next: [Versioning support](./versioning-support.md) →

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
