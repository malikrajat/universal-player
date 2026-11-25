# Breaking changes

> [Docs home](../README.md) › [Migration](./breaking-changes.md) › Breaking changes

## Current truth

`0.0.1` is published on npm. There are no runtime breaking changes between published versions.

## Pre-0.0.1 documentation corrections

| Area | Pre-release behaviour | Correct behaviour |
| --- | --- | --- |
| UI availability | Docs implied wrappers/mount render controls | Only `<universal-player>` renders the built-in UI |
| Installation | Registry commands shown without publication status | `0.0.1` is published; install from npm |
| Entry count | "Root + 9 subpaths" | 9 code entries total (root + 8 subpaths) |
| Engine count | "seven engines" | 8 providers |
| Accessibility | "survey traps focus" | No focus trap |
| Paths | Uppercase aliases | Lowercase canonical filenames |

These are documentation corrections, not code breaks.

## Policy

After `0.0.1`, removals and behavioural default changes require a major, with one minor of deprecation. See [Breaking-change policy](../breaking-change-policy.md).

**Canonical guide:** [Versioning](../versioning-and-breaking-changes.md)

---

← Previous: [v1 to v2](./v1-to-v2.md) · Next: [Deprecated APIs](./deprecated-apis.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
