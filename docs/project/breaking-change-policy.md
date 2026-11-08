# Breaking-change policy

> [Docs home](../README.md) › [Project](./architecture.md) › Breaking-change policy

## Definition

A change is breaking when existing correct consumer code can stop compiling or behaving correctly without edits.

Examples:

- Renaming/removing an export, option, method, event, error code or element attribute.
- Changing a default that alters observable behaviour.
- Narrowing an accepted type or peer range.
- Changing event payload shape.
- Changing `::part()` names or CSS variable names.
- Raising the browser floor.
- Changing engine selection for an existing source shape.

Not breaking: adding an optional option, adding an event, adding a new entry, internal refactors, docs, performance work that preserves semantics.

## Process

1. Open a change with a rationale and migration path.
2. Add a Changeset marked `major` (or `minor` pre-1.0 with a breaking note).
3. Document old → new in [Breaking changes](../migration/breaking-changes.md).
4. Keep an alias/deprecated path for one minor where feasible.
5. Update the docs, defaults and API facts in the same PR.

## Defaults

Changing a default is breaking even if the type is unchanged. The exception is a default that only affects a scaffolded/absent feature.

## Migration windows

At least one minor. For security fixes, the window may be shortened; the changelog must say so.

## Communication

Changelog entry, migration page, and a note in the README if the change affects installation or the UI boundary.

**Canonical guide:** [Versioning](./versioning.md) · [Root policy](../breaking-change-policy.md)

---

← Previous: [Versioning](./versioning.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
