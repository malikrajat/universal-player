# Build issues

> [Docs home](../README.md) › [Troubleshooting](./build-issues.md) › Build issues

## `Failed to resolve @codewithrajat/universal-player`

`0.0.1` is published on npm. If resolution fails, the usual causes are a wrong
version pin, a registry mirror or offline setting, or a stale cache:

```bash
npm view @codewithrajat/universal-player version   # expect 0.0.1
npm cache clean --force
npm install @codewithrajat/universal-player@0.0.1
```

## `dist/entries/*.js` missing

Consumers should install `0.0.1` from npm; the published package ships `dist/`.

Maintainers: this happens when installing the source folder before building. Run
`pnpm build` in the library, then reinstall/reload.

## `require() of ES Module`

The package is ESM-only. Use `import` or dynamic `import()`. Do not add a CJS shim.

## TypeScript cannot find subpath types

Check `moduleResolution`. `Bundler`, `Node16` and `NodeNext` work because each export has a `types` condition. If you use a custom resolver, preserve conditions.

## `attw`/publint failures

Maintainers: run the full validation:

```bash
pnpm run check
pnpm run typecheck
pnpm run build
pnpm run check:pack
pnpm run check:imports
pnpm run check:exports
pnpm run check:types
```

## Angular AOT

Do not import a decorated component from the package; it ships a controller. Declare your own standalone component.

## Svelte compile failure

Use `/svelte5` with Svelte 5 and `/svelte4` with Svelte 4. The components are shipped as source.

**Canonical guide:** [Build issues root](../troubleshooting.md) · [Installation](../installation.md)

---

← Previous: [Deprecated APIs](../migration/deprecated-apis.md) · Next: [Common errors](./common-errors.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
