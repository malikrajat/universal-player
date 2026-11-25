# Contributing

Thanks for helping improve `@codewithrajat/universal-player`.

> **Consumers:** install the published package from npm with `npm install @codewithrajat/universal-player`. The steps in this file are for contributors working on the library itself.

## Requirements

- Node.js **24+**
- pnpm **11.5.1** (`corepack enable` then `corepack prepare pnpm@11.5.1 --activate`)

## Setup

```bash
pnpm install
pnpm run validate
```

`validate` runs lint/format, typecheck, unit tests, build, tarball checks,
browser-import checks, publint and attw.

> `pnpm peers check` may report an unmet `vite` peer from Vitest because Vite+
> bundles its own patched Vite package. The `vp` commands and test suite use the
> bundled runtime; the warning is expected.

## Repository rules

1. **Core stays headless.** `src/core` must not import `src/ui`, `src/frameworks`
   or any framework package.
2. **Browser-only.** Do not import Node built-ins (`node:*`), `process`, or
   `Buffer` in `src`. `pnpm run check:imports` enforces this.
3. **ESM-only.** Relative imports use explicit `.js` extensions.
4. **Optional peers stay lazy.** `hls.js`, `dashjs` and `rxjs` are loaded only
   from the feature that needs them.
5. **No public plugin registry.** Media engines are internal. New engines are
   added to `src/core/engines.ts` behind an internal adapter.
6. **Public API changes need a changeset.**
7. **Strict TypeScript.** Do not weaken `tsconfig.json` to make code compile.

## Adding a media engine

1. Create `src/adapters/<engine>/engine.ts` exporting a `create<Engine>Engine`
   factory that returns a `PlayerEngine`.
2. Keep optional SDK imports dynamic.
3. Add the provider to `MediaProvider` in `src/core/types.ts`.
4. Route it in `src/core/engines.ts`.
5. Extend `detectMediaKind`/`providerFor` in `src/core/source.ts`.
6. Add unit tests and a fixture/example when possible.
7. Run `pnpm run validate`.

## Adding a feature

1. Create `src/features/<feature>/<feature>.ts`.
2. Export it from `src/features/index.ts`.
3. Add types to `src/core/types.ts` only when the state machine needs them.
4. Wire UI controls only in `src/ui`; the core remains headless.
5. Add tests and update `docs/features.md`.

## Testing

```bash
pnpm run test            # unit tests (jsdom)
pnpm run test:coverage   # 90% lines/functions on core + selected features
pnpm run test:browser    # real Chromium via Playwright
```

Coverage thresholds apply to `src/core` and the quality/speed/chapters features.
Adapters and UI are covered by integration tests.

## Changesets

Every user-visible change needs a changeset:

```bash
pnpm changeset
```

Choose `patch`, `minor` or `major`, write a concise summary, and commit the
generated `.changeset/*.md` file with the change.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(core): add DASH quality selection
fix(ui): keep controls visible while seeking
docs(readme): document Svelte entries
chore(deps): update vite-plus
```

There are no local Git hooks by decision; CI enforces the quality gate.

## Branching and releases

- `main`: released code.
- `develop`: integration branch.
- Short-lived feature branches merge into `develop`; release PRs merge into
  `main`.
- Pushing to `main` triggers the Changesets release workflow with npm
  provenance.

## Pull requests

- Keep changes focused and explain the user-visible behavior.
- Add tests for new behavior.
- Update docs and `docs/features.md` when the feature matrix changes.
- Include a changeset.
- Ensure `pnpm run validate` passes locally.
