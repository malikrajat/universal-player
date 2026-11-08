# Theme configuration (UIOptions.theme)

> [Docs home](../../README.md) › [API compatibility tree](./rm-ng-pdf-theme-config.md) › Theme configuration (UIOptions.theme)

> **Filename note:** inherited from the PDF-viewer layout. This page documents `UIThemeOptions`.

```ts
interface UIThemeOptions {
  variables?: Readonly<Record<`--up-${string}`, string>>;
  colors?: {
    accent?: string;
    accentContrast?: string;
    background?: string;
    surface?: string;
    foreground?: string;
    muted?: string;
    border?: string;
    overlay?: string;
  };
  radius?: string;
  controlRadius?: string;
  fontFamily?: string;
  menuBackground?: string;
  menuBlur?: string;
}
```

## Mapping

| Key | CSS custom property |
| --- | --- |
| `colors.accent` | `--up-color-accent` |
| `colors.accentContrast` | `--up-color-accent-contrast` |
| `colors.background` | `--up-color-bg` |
| `colors.surface` | `--up-color-surface` |
| `colors.foreground` | `--up-color-fg` |
| `colors.muted` | `--up-color-muted` |
| `colors.border` | `--up-color-border` |
| `colors.overlay` | `--up-color-overlay` |
| `radius` | `--up-radius` |
| `controlRadius` | `--up-control-radius` |
| `fontFamily` | `--up-font-family` |
| `menuBackground` | `--up-color-menu` |
| `menuBlur` | `--up-menu-blur` |

`variables` accepts any `--up-*` property. If `accent` is set without `accentContrast`, the element computes a black/white contrast colour.

## Example

```ts
ui: {
  theme: {
    colors: { accent: "#7c3aed", background: "#0b0b12" },
    radius: "0.5rem",
    variables: { "--up-control-size": "2.75rem" },
  },
}
```

This is UI-only. A headless player ignores it.

**Canonical guide:** [Design tokens](../../theming/design-tokens.md) · [Theming](../../theming.md)

---

← Previous: [Viewer config](./rm-ng-pdf-viewer-config.md) · Next: [Configuration service](../services/configuration.md) →

---

**Docs home** · [Documentation index](../../README.md) · [Summary](../../SUMMARY.md)
