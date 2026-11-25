# Contributing

> [Docs home](./README.md) › Contributing

[← Docs](./README.md) · [Project structure](./project-structure.md) · [Testing](./testing.md)

> **Consumers:** install the published package from npm with `npm install @codewithrajat/universal-player`. The steps in this guide are for contributors working on the library itself.

Thanks for contributing. This project values small, focused changes, strict
typing, browser-first correctness and documentation that matches the code.

The canonical contribution rules are in [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
This page is the docs-oriented summary.

---

## 1. Setup

```bash
git clone https://github.com/malikrajat/universal-player.git
cd universal-player
corepack enable
pnpm install
```

Requirements: Node `>=24`, pnpm `11.5.1`.

---

## 2. Scripts

| Script                   | Purpose                                 |
| ------------------------ | --------------------------------------- |
| `pnpm run check`         | Lint + format (Vite+ / oxlint / oxfmt). |
| `pnpm run typecheck`     | `tsc --noEmit`.                         |
| `pnpm run test`          | Unit tests (Vitest, jsdom).             |
| `pnpm run test:watch`    | Watch mode.                             |
| `pnpm run test:coverage` | Coverage with thresholds.               |
| `pnpm run test:browser`  | Playwright browser mode.                |
| `pnpm run build`         | ESM + `.d.ts` + source maps.            |
| `pnpm run check:pack`    | Tarball allowlist + export targets.     |
| `pnpm run check:imports` | No Node built-ins in browser code.      |
| `pnpm run check:exports` | `publint --strict`.                     |
| `pnpm run check:types`   | `attw --profile esm-only`.              |
| `pnpm run docs`          | TypeDoc.                                |
| `pnpm run sbom`          | CycloneDX SBOM.                         |
| `pnpm run validate`      | Full gate.                              |

Run `pnpm run validate` before opening a PR.

---

## 3. Branches and commits

- `main` — releases.
- `develop` — integration.
- Feature branches off `develop`.

Commit messages follow Conventional Commits:

```text
feat: add chapter thumbnails to the menu
fix: keep captions selected after reload
docs: clarify survey trigger defaults
test: cover playlist gating in the core
chore: bump hls.js
```

Scopes are optional but useful: `core`, `ui`, `react`, `vue`, `angular`,
`svelte`, `survey`, `playlist`, `docs`, `packaging`.

---

## 4. Changesets

Every user-visible change needs a changeset:

```bash
pnpm changeset
```

- `patch` — fix, docs-only runtime change.
- `minor` — new option/method/event/adapter.
- `major` — removal, rename, default change.

Commit `.changeset/*.md`.

---

## 5. Code style

- TypeScript strict; no `any` without justification.
- Prefer immutable data and pure helpers.
- Keep `core` free of UI/framework imports.
- Use explicit `.js` extensions in relative imports (ESM output).
- Isolate consumer callbacks in `try/catch`.
- Release resources in `destroy()`.
- Do not add runtime dependencies.
- Do not add Node built-ins to browser paths.

Formatting and linting are enforced by `pnpm run check`.

---

## 6. Tests

- Add a unit test for every behaviour change.
- Use browser tests for media APIs that jsdom cannot model.
- Do not lower coverage thresholds.
- Prefer behaviour assertions over implementation details.
- Include an invalid-state test for new methods.

See [Testing](./testing.md).

---

## 7. Documentation

Docs live in `docs/`. For any public change:

1. Update [API reference](./api-reference.md).
2. Update [Options cheatsheet](./options-cheatsheet.md) and
   [Defaults](./defaults.md) if options/defaults changed.
3. Update [Features](./features.md) if status changed.
4. Update [CHANGELOG.md](../CHANGELOG.md) via a changeset.
5. Update [API source reference](./api-source-reference.md) if exports changed.
6. Add/refresh a guide when the feature has a workflow.

Relative links only. No build step.

---

## 8. Pull request checklist

- [ ] The change is focused.
- [ ] Tests added/updated.
- [ ] `pnpm run validate` passes.
- [ ] Docs updated.
- [ ] Changeset added.
- [ ] No runtime dependencies added.
- [ ] No `core` → `ui`/`frameworks` import.
- [ ] Public API documented.
- [ ] Accessibility considered for UI changes.
- [ ] Browser impact considered.

---

## 9. Review expectations

Reviewers check:

1. Contract and SemVer impact.
2. Core/UI boundary.
3. Error handling and teardown.
4. Accessibility and keyboard.
5. Tests and docs.
6. Packaging (tarball, exports, types).

Expect questions about defaults and whether a change is breaking.

---

## 10. Reporting bugs

Include:

- version;
- entry point;
- browser/OS;
- minimal reproduction;
- `state.status`, `state.error`, `state.capabilities`;
- network details for streaming.

---

## 11. Security

Do not open a public issue for a vulnerability. Follow
[SECURITY.md](../SECURITY.md) and [Security](./security.md).

---

## 12. Code of conduct

By participating you agree to the
[Code of Conduct](../CODE_OF_CONDUCT.md).

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)