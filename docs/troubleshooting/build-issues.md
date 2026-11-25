# Build issues

> [Docs home](../README.md) › [Troubleshooting](./build-issues.md) › Build issues

## `Failed to resolve @codewithrajat/universal-player`

The package is not on the registry. Install from a folder or tarball.

```bash
pnpm build
pnpm add file:/absolute/path/to/universal-player
```

## `dist/entries/*.js` missing

Installing the source folder before building. Run `pnpm build` in the library, then reinstall/reload.

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
