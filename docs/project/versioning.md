# Versioning

> [Docs home](../README.md) › [Project](./architecture.md) › Versioning

## Scheme

SemVer. The project uses Changesets; a release is cut from accumulated changesets. No public release exists yet.

| Change | Bump |
| --- | --- |
| Bug fix, docs, internal refactor | patch |
| Additive API/option/event | minor |
| Removal, renamed export, changed default with behavioural impact, dropped peer/browser | major |

## Before 1.0

The package is `0.0.1`. Pre-1.0 SemVer permits breaking changes in minors. The repository nonetheless documents a deprecation window of one minor for any public API, so consumers get warning before removal.

## What counts as public

Every export reachable from the export map, every documented option/event/error code, the custom-element attributes and `::part()` names, and the CSS custom properties.

Not public: `src/**` internals, `PlayerEngine`, adapter factories, the `.up-*` class names (use `::part`), and generated TypeDoc HTML.

## Deprecation process

1. JSDoc `@deprecated` + replacement.
2. Minor Changeset.
3. Changelog + [Deprecated APIs](../migration/deprecated-apis.md).
4. Removal in a major.

## Version support

Only the latest published version is supported. There is no LTS. Because nothing is published, the only supported version is the repository state at `0.0.1`.

## Peer version changes

Dropping a peer major or raising a floor is a **major** change for consumers who relied on it. Adding a new optional peer is minor.

**Next:** [Breaking-change policy](./breaking-change-policy.md)

---

← Previous: [Peer dependencies](./peer-dependencies.md) · Next: [Breaking-change policy](./breaking-change-policy.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
