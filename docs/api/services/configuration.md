# Configuration service

> [Docs home](../../README.md) › [API compatibility tree](./configuration.md) › Configuration service

> **Filename note:** inherited from the PDF-viewer layout. This library has no injectable configuration service.

## What exists instead

| Concern | Mechanism |
| --- | --- |
| Construction | `PlayerOptions` |
| Runtime changes | Setters on `UniversalPlayer` |
| Declarative UI config | Attributes + JSON on `<universal-player>` |
| Locale strings | `registerLocale()`, `setStrings()`, `element.strings` |
| Defaults | Hard-coded in core/UI |

There is no `ConfigurationService`, no DI token and no global config singleton. This is deliberate: multiple players on one page must be independently configurable.

## Precedence

1. Per-instance string overrides.
2. Registered locale strings.
3. English defaults.
4. For options: constructor → setters → UI attributes.

## Pattern for app-wide defaults

```ts
const defaults = {
  theme: "dark",
  captions: { persist: true },
} satisfies Partial<PlayerOptions>;

const player = createPlayer({ ...defaults, container, source });
```

Do not mutate imported module state to share config.

**Canonical guide:** [Configuration](../../configuration.md) · [Advanced configuration](../../advanced-configuration.md)

---

← Previous: [Theme config](../interfaces/rm-ng-pdf-theme-config.md) · Next: [Examples: basic](../../examples/basic.md) →

---

**Docs home** · [Documentation index](../../README.md) · [Summary](../../SUMMARY.md)
