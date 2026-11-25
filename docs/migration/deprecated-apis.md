# Deprecated APIs

> [Docs home](../README.md) › [Migration](../migration.md) › Deprecated APIs

## Deprecated in 0.0.1

**None.** No export carries `@deprecated` in this repository.

## Reserved locations

When deprecation starts, each item will list:

| Field | Meaning |
| --- | --- |
| API | Export/option/event |
| Since | Version that deprecated it |
| Replacement | What to use |
| Removal | Earliest major |
| Notes | Behavioural differences |

## Aliases that are not deprecations

- `blocking` is an alias for `required`.
- `allowResubmit` is an alias for `allowRetake`.
- `gateAdvance` is an alias for `requireCompletion`.
- `thumbnail` is a fallback attribute for `poster`.

Aliases are supported API, not deprecation warnings.

**Canonical guide:** [Versioning](../versioning-support.md) · [Breaking changes](./breaking-changes.md)

---

← Previous: [Breaking changes](./breaking-changes.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
