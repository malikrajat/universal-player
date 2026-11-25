# Extending the project

> [Docs home](./README.md) › Extending the project

[← Docs](./README.md) · [Extending](./extending.md) · [Project structure](./project-structure.md)

A maintainer-focused guide to changing the library safely. It covers the files
to touch, the checks to run and the documentation that must move with the code.

---

## 1. Development loop

```bash
pnpm install
pnpm run check        # lint + format
pnpm run typecheck
pnpm run test
pnpm run test:browser
pnpm run build
pnpm run validate     # everything
```

Use `pnpm run test:watch` while iterating. Run `pnpm run validate` before a PR.

---

## 2. Change recipes

### Add a `PlayerOptions` field

**Files**

- `src/core/types.ts` — add `readonly field?: Type` to `PlayerOptions`.
- `src/core/player.ts` — default it in `#applyInitialOptions` or the relevant
  method; expose a setter if it must change at runtime.
- `src/ui/element.ts` — if it is an attribute, add it to `OBSERVED_ATTRIBUTES`
  and `#applyAttribute`/`#playerOptions`; if structured, parse JSON.
- `tests/unit/*` — cover default and explicit value.

**Docs**

- [API reference](./api-reference.md#playeroptions)
- [Options cheatsheet](./options-cheatsheet.md)
- [Defaults](./defaults.md)
- [_API facts](./_api-facts.md) if it is notable

### Add a method

**Files**

- `src/core/player.ts` — public method, `#assertAlive()`, typed error on invalid
  state.
- `src/entries/core.ts` — no change if it is a class method (already exported).
- Tests.

**Docs**

- [API reference](./api-reference.md#methods)
- [API source reference](./api-source-reference.md)

### Add an event

**Files**

- `src/core/types.ts` — add to `PlayerEvents`.
- `src/core/player.ts` — emit it via `#emitEvent`.
- `src/ui/element.ts` — update UI if needed.
- Tests.

**Docs**

- [API reference](./api-reference.md#events)
- [Errors vs logs](./errors-vs-logs.md) if it is diagnostic

### Add an engine

See [Extending → Add a new engine](./extending.md#21-add-a-new-engine).

**Files**

- `src/adapters/<name>/engine.ts`
- `src/core/engines.ts`
- `src/core/source.ts`
- `src/core/types.ts` (`MediaProvider`)
- `tests/unit/engines.test.ts`
- `package.json` if it needs a peer

### Change a default

**Files**

- the code that implements it
- tests that assert it

**Docs**

- [Defaults](./defaults.md) — mandatory
- [Options cheatsheet](./options-cheatsheet.md)
- [Feature status](./features.md) if relevant
- changeset marked **major** (see [Breaking change policy](./breaking-change-policy.md))

### Add a locale string

**Files**

- `src/ui/i18n.ts` — add to `PLAYER_STRINGS_EN` and `PlayerStrings`
  (`src/core/types.ts`).
- Tests for `getStrings`.

**Docs**

- [API reference](./api-reference.md#runtime-exports)

### Add a Svelte entry

**Files**

- `src/frameworks/svelteN/UniversalPlayer.svelte` + `.d.ts`
- `vite.config.ts` copy entries
- `package.json` export + peer
- `scripts/check-pack-contents.mjs` allowlist
- tests/build

---

## 3. Invariants and review gates

A PR is rejected if it:

- makes `core` import `ui`/`frameworks`;
- introduces a Node built-in into browser code;
- adds a runtime dependency;
- changes a documented default without a major changeset;
- adds a public export without an entry point;
- leaves docs/CHANGELOG out of sync;
- skips tests for new behaviour;
- breaks the tarball allowlist;
- triggers publint/attw errors.

---

## 4. Testing expectations

| Change        | Minimum tests                                  |
| ------------- | ---------------------------------------------- |
| Player method | Unit: happy path + invalid state               |
| Option        | Unit: default + explicit                       |
| Event         | Unit: payload + state effect                   |
| Engine        | Unit + browser (if it uses media)              |
| UI control    | Unit/element test + manual keyboard/a11y check |
| Survey type   | Unit validation + render                       |
| Packaging     | `check:pack`, `check:exports`, `check:types`   |

Coverage thresholds are enforced for core and selected features. New code in
those paths must not lower the gate.

---

## 5. Documentation contract

Every user-visible change updates, at minimum:

1. `docs/api-reference.md`
2. `docs/options-cheatsheet.md` and `docs/defaults.md` (if options/defaults)
3. `docs/features.md` (if status changes)
4. `CHANGELOG.md` + `docs/changelog.md`
5. A changeset

If the change affects architecture, also update
`docs/architecture.md`, `docs/project-structure.md` and
`docs/api-source-reference.md`.

---

## 6. Publishing checklist

- [ ] `pnpm run validate` passes.
- [ ] Changeset committed.
- [ ] Docs updated.
- [ ] Version bump applied by the release workflow.
- [ ] `CHANGELOG.md` generated.
- [ ] npm provenance enabled.
- [ ] Git tag created.
- [ ] GitHub release notes reviewed.

---

## 7. Deprecating something

1. Add `@deprecated` to the JSDoc and `.d.ts`.
2. Keep the implementation working.
3. Add a replacement and document it.
4. Add a changeset (`minor` for the deprecation).
5. Add the migration note.
6. Remove only in a major.

---

## 8. Where to ask

- Architecture decisions: open a discussion with the trade-offs.
- Packaging: include `pnpm run check:pack` output.
- Browser issues: include browser/OS, media URL shape and console output.
- Security: follow [SECURITY.md](../SECURITY.md), not a public issue.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)