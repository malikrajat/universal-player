# Design tokens

> [Docs home](../README.md) › [Theming](./design-tokens.md) › Design tokens

A token map you can copy. These are the source defaults from `src/ui/styles.css`.

| Token | Default |
| --- | --- |
| `--up-font-family` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| `--up-color-bg` | `#050505` |
| `--up-color-surface` | `rgba(15, 15, 15, 0.9)` |
| `--up-color-surface-strong` | `rgba(12, 12, 12, 0.98)` |
| `--up-color-menu` | `rgba(10, 10, 10, 0.38)` |
| `--up-color-fg` | `#f8fafc` |
| `--up-color-muted` | `rgba(248, 250, 252, 0.72)` |
| `--up-color-accent` | `#ffffff` (dark) / `#0f172a` (light) |
| `--up-color-accent-contrast` | `#0b0b0b` (dark) / `#ffffff` (light) |
| `--up-color-border` | `rgba(248, 250, 252, 0.14)` |
| `--up-color-danger` | `#f87171` |
| `--up-color-overlay` | `rgba(0, 0, 0, 0.72)` |
| `--up-menu-blur` | `24px` |
| `--up-radius` | `0.75rem` |
| `--up-control-radius` | `0.5rem` |
| `--up-control-size` | `2.5rem` (responsive: 2.35rem / 2.1rem) |
| `--up-caption-size` | `100%` |
| `--up-caption-color` | `#ffffff` |
| `--up-caption-background` | `rgba(0, 0, 0, 0.72)` |
| `--up-caption-opacity` | `1` |
| `--up-caption-edge` | `"outline"` |
| `--up-focus-ring` | `0 0 0 3px color-mix(in srgb, var(--up-color-accent) 45%, transparent)` |
| `--up-transition` | `160ms ease` |

## Caution

Tokens are public; `.up-*` class names are not. Use `::part()` or tokens.

**Canonical guide:** [CSS variables](./css-variables.md)

---

← Previous: [CSS variables](./css-variables.md) · Next: [Custom themes](./custom-themes.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
