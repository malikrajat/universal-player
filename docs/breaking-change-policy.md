# Breaking change policy

> [Docs home](./README.md) � Breaking change policy

[← Docs](./README.md) · [Versioning](./versioning-and-breaking-changes.md) · [Changelog](./changelog.md)

A breaking change is any change that can make existing consumer code fail to
compile, fail at runtime, or behave differently without the consumer changing
their code.

This page defines what counts, how it is shipped, and how consumers are warned.

---

## 1. What counts as breaking

### Definitely breaking

- Removing or renaming a public export.
- Removing or renaming an option, method, event or event field.
- Changing a parameter type in a way that rejects previously valid calls.
- Changing a return type to something incompatible.
- Changing a documented default that alters behaviour.
- Removing a subpath export or changing its target.
- Raising a peer minimum or dropping a browser.
- Changing `PlayerState` field semantics (for example, `buffered` meaning
  “percent” instead of “seconds”).
- Removing a CSS token or renaming a `::part()`.
- Changing the meaning of an error code.
- Making an optional peer required.

### Usually not breaking

- Adding an optional option with a safe default.
- Adding a new event.
- Adding a new export.
- Adding a new adapter or entry point.
- Adding a new error code (consumers should handle unknown codes).
- Internal refactors with no public surface change.
- Documentation changes.
- Widening a peer range without changing behaviour.
- Performance improvements.

### Judgment calls

| Change                                      | Verdict                                           |
| ------------------------------------------- | ------------------------------------------------- |
| New required field on an existing interface | Breaking.                                         |
| New optional field on an existing interface | Not breaking.                                     |
| Stricter runtime validation                 | Breaking if previously accepted input now throws. |
| More accurate `duration` for live           | Breaking if consumers relied on `Infinity`.       |
| New default control appearing               | Breaking if it changes the visible surface.       |
| Removing a `data-up-*` attribute            | Internal, but treat as breaking if documented.    |

---

## 2. How a breaking change ships

1. **Proposal** in an issue or PR, with the affected surface and migration.
2. **Deprecation** (when possible) for at least one minor release.
3. **Changeset** marked `major`.
4. **Migration guide** in `docs/migration.md`.
5. **Changelog** entry under **Removed** or **Changed**, with replacement.
6. **Release** as a major version.
7. **Alias** kept for the window when feasible.

No breaking change ships in a `patch` or `minor` without an explicit, documented
`0.x` exception.

---

## 3. Deprecation rules

- The old API keeps working for the full window.
- `.d.ts` carries `@deprecated` with a replacement.
- Docs mark the API and link to the replacement.
- Changelog lists it under **Deprecated**.
- Runtime warnings are avoided in hot paths; the type/doc marker is the primary
  signal.

Minimum window: **one minor release**, and at least 30 days for widely used
surfaces.

---

## 4. Breaking changes in `0.x`

Before `1.0.0`, the project still aims to avoid breaking changes. If one is
unavoidable:

- It is released as a `minor` with a **BREAKING** section at the top of the
  changelog and migration notes.
- It is never hidden in a patch.
- It is called out in the release notes and GitHub release.

Consumers should pin `0.0.x` exactly if they need absolute stability.

---

## 5. Migration guide template

Every breaking change gets a section with:

````md
## Version X → Y

### Removed `setCaptionsOff()`

Before:

```ts
player.setCaptionsOff();
```

After:

```ts
player.setTextTrack(null);
```

Why: one code path for all caption states.

Search for: `setCaptionsOff(`
````

Include:

- the old code;
- the new code;
- the reason;
- a grep/codemod hint;
- any edge cases.

---

## 6. Compatibility commitments

| Area                    | Commitment                                     |
| ----------------------- | ---------------------------------------------- |
| Public exports          | SemVer                                         |
| Options/events/state    | SemVer                                         |
| Documented defaults     | SemVer                                         |
| Error codes             | Additive; existing codes keep meaning          |
| CSS tokens/parts        | SemVer for documented names                    |
| `data-up-*`             | Best-effort; documented ones treated as public |
| Internal `PlayerEngine` | Not public                                     |
| `src/*` deep imports    | Not supported                                  |
| Peer ranges             | SemVer, major on minimum raise                 |
| Browser matrix          | Major on removal                               |

---

## 7. Consumer checklist for a major upgrade

- [ ] Read the migration guide and changelog.
- [ ] Search for removed APIs.
- [ ] Re-run typecheck and tests.
- [ ] Check defaults you relied on by omission.
- [ ] Re-check theming tokens and parts.
- [ ] Re-test surveys, playlists and resume if their defaults changed.
- [ ] Verify peers and browser targets.
- [ ] Pin the new version in your lockfile.

---

## 8. Reporting an unintentional break

If a release breaks code that the docs said was public, open an issue with:

- version before/after;
- minimal reproduction;
- the documented contract you relied on.

Unintentional breaks are treated as bugs and fixed in a patch when possible.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)