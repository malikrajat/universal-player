# Breaking changes

> [Docs home](../README.md) › [Migration](./breaking-changes.md) › Breaking changes

## Current truth

No public release has been made. There are no runtime breaking changes between published versions.

## Pre-release corrections that would be breaking after launch

| Area | Pre-release behaviour | Correct behaviour |
| --- | --- | --- |
| UI availability | Docs implied wrappers/mount render controls | Only `<universal-player>` renders the built-in UI |
| Installation | Registry commands shown as working | Package is unreleased; use folder/tarball |
| Entry count | "Root + 9 subpaths" | 9 code entries total (root + 8 subpaths) |
| Engine count | "seven engines" | 8 providers |
| Accessibility | "survey traps focus" | No focus trap |
| Paths | Uppercase aliases | Lowercase canonical filenames |

These are documentation corrections, not code breaks.

## Policy

After the first publication, removals and behavioural default changes require a major, with one minor of deprecation. See [Breaking-change policy](../breaking-change-policy.md).

**Canonical guide:** [Versioning](../versioning-and-breaking-changes.md)

---

← Previous: [v1 to v2](./v1-to-v2.md) · Next: [Deprecated APIs](./deprecated-apis.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
