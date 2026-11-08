# Peer dependencies

> [Docs home](../README.md) › [Project](./architecture.md) › Peer dependencies

All seven peers are optional. This is a deliberate packaging choice: a native MP4 player installs nothing extra.

| Peer | Range | Loaded when | Missing-peer behaviour |
| --- | --- | --- | --- |
| `hls.js` | `^1.5.0` | HLS engine `load()` | load fails; `media-error` with resolution cause |
| `dashjs` | `^5.0.0` | DASH engine `load()` | load fails; `media-error` |
| `rxjs` | `^7.8.0` | `toRxjsObservable()` | returned promise rejects |
| `react` | `>=18.0.0` | `/react` import | import resolution fails |
| `vue` | `^2.7.0 \|\| ^3.0.0` | `/vue` import | import resolution fails |
| `@angular/core` | `>=17.0.0` | `/angular` import | import resolution fails |
| `svelte` | `^4.0.0 \|\| ^5.0.0` | Svelte component compile | compile fails |

## Install matrix

```bash
pnpm add hls.js     # only .m3u8
pnpm add dashjs     # only .mpd
pnpm add rxjs       # only toRxjsObservable
```

Do not add React/Vue/Angular/Svelte twice; use the app's existing copy.

## Verified versions

The repo builds with React 19.3.1, Vue 3.5.44, Angular 22.2.4, Svelte 5, RxJS 7.8.2, hls.js 1.5, dashjs 5.3. The ranges are support declarations, not tested matrices.

## Why dashjs is ^5 but 4.x works

The adapter probes both `getBitrateInfoListFor` (4.x) and `getRepresentationsByType` (5.x). The declared range remains `^5.0.0`; 4.x compatibility is implementation-level, not a promise.

**Next:** [Versioning](./versioning.md)

---

← Previous: [License](./license.md) · Next: [Versioning](./versioning.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
