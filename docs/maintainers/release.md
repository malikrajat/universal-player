# Release process

> [Docs home](../README.md) › [Maintainers](./release.md) › Release

## Current status

`@codewithrajat/universal-player@0.0.1` is **unreleased**. `npm view` returns 404 on 2026-11-06. `publishConfig.access` is `public`, and Changesets is configured, but no publish has happened.

## Pre-release checklist

1. `pnpm install` with the pinned `pnpm@11.5.1`.
2. `pnpm run validate` — lint/format, typecheck, unit tests, build, pack allowlist, browser-import scan, publint, attw.
3. `pnpm run test:browser` — Chromium smoke test (not a full matrix).
4. Review [`documentation-audit.md`](./documentation-audit.md) and [`_api-facts.md`](../_api-facts.md).
5. Confirm `CHANGELOG.md` and the version in `package.json`.
6. Confirm the tarball contents:

```bash
pnpm pack --pack-destination ..
tar -tf ../codewithrajat-universal-player-0.0.1.tgz
```

The `files` allowlist is `dist`, `README.md`, `LICENSE`, `CHANGELOG.md`, `examples`, `docs`, `_docs`. Note that `_examples` is not in the allowlist even though the runnable demos live there.

## Versioning with Changesets

```bash
pnpm changeset          # describe the change and bump type
pnpm version            # consume changesets, update versions/changelog
pnpm release            # changeset publish (requires registry auth)
```

`pnpm release` is **intended-only** until the first publish is approved.

## First publish (when approved)

1. Authenticate to npm with an account that owns `@codewithrajat`.
2. Run `pnpm run validate`.
3. Run `pnpm version`.
4. Run `pnpm release`.
5. Verify `npm view @codewithrajat/universal-player version` returns `0.0.1`.
6. Update [Installation](../installation.md) and [`_api-facts.md`](../_api-facts.md) to remove the unreleased warning.

Do not publish from a dirty tree. Do not publish docs that still say "unreleased".

## Provenance and CI

The repository describes GitHub Actions on `main` with npm provenance and a `develop` integration branch. Verify the workflow files before relying on the claim; the workflow contents are outside this documentation set.

## Rollback

npm does not allow deleting a version after 72 hours. Prefer:

1. Deprecate the bad version: `npm deprecate @codewithrajat/universal-player@<version> "reason"`.
2. Publish a patch.
3. Add a changelog note and a migration entry if behaviour changed.

## Docs release checklist

- [ ] `docs/SUMMARY.md` includes new pages.
- [ ] `docs/_api-facts.md` version/status updated.
- [ ] `docs/maintainers/source-docs-mapping.md` status updated.
- [ ] Installation reflects publication reality.
- [ ] Link checker passes.

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
