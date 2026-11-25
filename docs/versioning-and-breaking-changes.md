# Versioning and breaking changes

> [Docs home](./README.md) › Versioning and breaking changes

[← Docs](./README.md) · [Breaking change policy](./breaking-change-policy.md) · [Changelog](./changelog.md)

The project follows **strict Semantic Versioning** for the public API and uses
Changesets to generate release notes and version bumps.

---

## 1. What the public API includes

The public API is every symbol reachable from a documented entry point in
`package.json`:

| Surface                                                          | Public?                          |
| ---------------------------------------------------------------- | -------------------------------- |
| `@codewithrajat/universal-player` exports                        | Yes                              |
| `/core`, `/ui`, `/vanilla`, `/react`, `/vue`, `/angular` exports | Yes                              |
| `/svelte4`, `/svelte5` components                                | Yes                              |
| `styles.css` tokens and `::part()` names                         | Yes                              |
| `PlayerOptions`, `PlayerState`, `PlayerEvents` shapes            | Yes                              |
| Exported error codes and capability constants                    | Yes                              |
| Documented defaults                                              | Yes (changing one is breaking)   |
| `src/*` deep imports                                             | No                               |
| Internal `PlayerEngine` contract                                 | No                               |
| `data-up-*` attributes                                           | Internal, but stable for styling |
| `data-up-action` values                                          | Internal, documented for tests   |

If it is not exported from an entry or documented here, it is not covered by
SemVer.

---

## 2. Version semantics

| Change                                                   | Bump                                      |
| -------------------------------------------------------- | ----------------------------------------- |
| Bug fix, docs, internal refactor                         | `patch`                                   |
| New option, method, event, adapter, non-breaking default | `minor`                                   |
| Removed/renamed export, option or event                  | `major`                                   |
| Changed default that alters observable behaviour         | `major`                                   |
| Dropped browser or peer major                            | `major`                                   |
| New optional peer                                        | `minor`                                   |
| New required peer                                        | `major`                                   |
| Security fix                                             | `patch`, unless it requires an API change |

During `0.x`, the project still treats the public API as a contract. Breaking
changes are batched into a `minor` while `0.0.x` is unstable only if they are
documented as pre-1.0; the preferred path is a `major` once `1.0.0` lands.

---

## 3. Deprecation window

A deprecated public API:

1. is marked `@deprecated` in the `.d.ts` and docs;
2. keeps working for at least one minor release;
3. is listed under **Deprecated** in the changelog with a replacement;
4. is removed only in a major release.

Example:

```ts
/**
 * @deprecated Use `setTextTrack(null)` instead. Removed in 1.0.0.
 */
setCaptionsOff(): void;
```

There is no silent removal.

---

## 4. Changesets workflow

```bash
pnpm changeset
```

- Select the affected package.
- Choose `patch`, `minor` or `major`.
- Write a consumer-facing summary.
- Commit `.changeset/*.md` with the code.

On `main`, the release workflow:

1. applies changesets;
2. updates `CHANGELOG.md` and `package.json`;
3. publishes to npm with provenance;
4. creates a git tag.

---

## 5. Peer and browser support

| Change                                   | Bump               |
| ---------------------------------------- | ------------------ |
| Widen a peer range without changing code | `patch` or `minor` |
| Raise a peer minimum                     | `major`            |
| Drop a browser from the supported list   | `major`            |
| Add a new optional peer                  | `minor`            |

Peer ranges are listed in [Peer dependencies](./peer-dependencies.md) and
verified in [_API facts](./_api-facts.md).

---

## 6. Defaults are contract

Changing a documented default is a breaking change even if the type is
unchanged, because consumers rely on behaviour. Examples:

- `ui.download` becoming visible by default.
- `survey.once` becoming `false`.
- `playlist.autoAdvance` becoming `true`.
- `resume.enabled` becoming `true`.

If a default must change, document it in **Changed** and treat it as a major
(or a clearly flagged `0.x` breaking change).

---

## 7. Migration support

For every major:

- A migration section is added to [Migration](./migration.md).
- A codemod or grep list is provided when mechanical.
- Old names remain as deprecated aliases for the window when possible.
- The changelog lists each removal with its replacement.

---

## 8. Upgrade checklist

- [ ] Read the changelog for `Deprecated`, `Removed` and `Changed`.
- [ ] Pin peer versions before upgrading.
- [ ] Run `pnpm run typecheck` and `pnpm run test`.
- [ ] Check the browser matrix if you support older Safari/Firefox.
- [ ] Verify theming tokens and `::part()` names if you customized deeply.
- [ ] Verify survey/playlist defaults if you rely on omission.

---

## 9. Current version

`0.0.1` — experience release. There is no prior public version to migrate from.
Future releases follow the policy above.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)