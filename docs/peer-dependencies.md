# Peer dependencies

> [Docs home](./README.md) � Peer dependencies

> **Publication status:** this package is unreleased at `0.0.1` and is not on the public npm registry. Registry install commands on this page are **intended-only**; use the folder or tarball path in [Installation](./installation.md).

[← Docs](./README.md) · [Installation](./installation.md) · [Frameworks](./frameworks.md)

The core is dependency-free. Everything else is an **optional peer**: declared
so the package manager can warn about version mismatches, but never installed
automatically and never required unless you use that path.

---

## Matrix

| Peer            | Declared range       | Needed for                                     | Installed by |
| --------------- | -------------------- | ---------------------------------------------- | ------------ |
| `hls.js`        | `^1.5.0`             | `.m3u8` sources on browsers without native HLS | You          |
| `dashjs`        | `^5.0.0`             | `.mpd` sources                                 | You          |
| `rxjs`          | `^7.8.0`             | `toRxjsObservable()`                           | You          |
| `react`         | `>=18.0.0`           | `/react` entry                                 | You          |
| `vue`           | `^2.7.0 \|\| ^3.0.0` | `/vue` entry                                   | You          |
| `@angular/core` | `>=17.0.0`           | `/angular` entry                               | You          |
| `svelte`        | `^4.0.0 \|\| ^5.0.0` | `/svelte4`, `/svelte5`                         | You          |

All seven are listed under `peerDependenciesMeta` with `optional: true`. The package is unreleased, so install the folder/tarball first; the registry commands below are shown as intended usage.

---

## Why optional?

1. **Bundle size.** `hls.js` and `dashjs` are large. A page that plays MP4
   should not download a streaming SDK.
2. **Framework neutrality.** The package cannot know whether you use React,
   Vue, Angular, Svelte or none of them.
3. **No dual-runtime hazard.** The host app owns the framework runtime and its
   version; the adapter only imports it.
4. **Lazy loading.** Streaming SDKs are imported with dynamic `import()` inside
   their adapter, so a missing peer is only discovered when a matching source is
   loaded.

The core entry has **zero runtime dependencies**. The published tarball ships
no `node_modules`.

---

## Install recipes

### Video only (MP4/WebM/MOV)

```bash
pnpm add @codewithrajat/universal-player
```

No peers needed.

### HLS

```bash
pnpm add @codewithrajat/universal-player hls.js
```

Safari can play HLS natively; the adapter prefers native support and falls back
to `hls.js` where needed.

### DASH

```bash
pnpm add @codewithrajat/universal-player dashjs
```

### React

```bash
pnpm add @codewithrajat/universal-player react react-dom
```

### Vue 3

```bash
pnpm add @codewithrajat/universal-player vue
```

### Vue 2.7

```bash
pnpm add @codewithrajat/universal-player vue@2.7
```

### Angular

```bash
pnpm add @codewithrajat/universal-player @angular/core
```

`@angular/core` usually already exists in an Angular app.

### Svelte

```bash
pnpm add @codewithrajat/universal-player svelte
```

Use the entry matching the installed major.

### RxJS interop

```bash
pnpm add @codewithrajat/universal-player rxjs
```

The native observable already works with `for await` and `subscribe()`; `rxjs`
is only needed for `toRxjsObservable()`.

---

## What happens when a peer is missing

| Missing peer    | Trigger                            | Result                                                                                            |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `hls.js`        | Loading `.m3u8` without native HLS | Load rejects with a `media-error`/`unsupported-source` shaped `PlayerError`; `error` event fires. |
| `dashjs`        | Loading `.mpd`                     | Same as above.                                                                                    |
| `rxjs`          | Calling `toRxjsObservable()`       | The dynamic import rejects; the promise rejects.                                                  |
| `react`         | Importing `/react`                 | Module resolution error at build time.                                                            |
| `vue`           | Importing `/vue`                   | Module resolution error at build time.                                                            |
| `@angular/core` | Importing `/angular`               | Module resolution error at build time.                                                            |
| `svelte`        | Importing `/svelte4` or `/svelte5` | Svelte compiler error.                                                                            |

The install itself does not fail because every peer is optional.

---

## Version policy

- Peer ranges are intentionally wide enough for the supported majors but not so
  wide that untested combinations are implied.
- The workspace builds and tests against the versions in
  [_API facts](./_api-facts.md).
- A peer **major** bump is treated as a breaking change only when the adapter's
  public API changes. Otherwise the range is widened in a minor release.
- Dropping a peer version is a breaking change and follows
  [the breaking-change policy](./breaking-change-policy.md).

---

## Deduplication and monorepos

In a pnpm workspace, the adapter resolves the peer from the application that
imports it. If you see two copies of React/Vue, check:

```bash
pnpm why react
pnpm dedupe
```

For Angular, the controller imports only types from `@angular/core`; it is
erased at build time except for `queueMicrotask` and DOM calls. That keeps the
adapter safe across Angular versions.

---

## Do not install these

The following are **not** dependencies and are not needed:

- `video.js`, `plyr`, `shaka-player`, `hls.js` wrappers, `dashjs` wrappers.
- Any icon pack, CSS framework or polyfill.
- A DOM shim for SSR. The library does not support SSR rendering.
- `@types/hls.js` or `@types/dashjs` — both ship their own types.

---

**Next:** [Versioning](./versioning-and-breaking-changes.md) ·
[Browser support](./browser-support.md)

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)