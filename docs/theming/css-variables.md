# CSS variables

> [Docs home](../README.md) › [Theming](./css-variables.md) › CSS variables

## Token families

| Family | Examples | Purpose |
| --- | --- | --- |
| Colour | `--up-color-bg`, `--up-color-surface`, `--up-color-fg`, `--up-color-muted`, `--up-color-accent`, `--up-color-border`, `--up-color-danger`, `--up-color-overlay`, `--up-color-menu` | Surfaces and text |
| Geometry | `--up-radius`, `--up-control-radius`, `--up-control-size`, `--up-slider-thickness`, `--up-slider-thumb` | Shape and density |
| Type | `--up-font-family` | Typography |
| Motion | `--up-transition` | Transitions |
| Focus | `--up-focus-ring` | Keyboard focus |
| Layers | `--up-z-controls`, `--up-z-overlay`, `--up-z-menu` | Stacking |
| Menu | `--up-menu-blur`, `--up-color-menu` | Translucent sheets |
| Captions | `--up-caption-size`, `--up-caption-color`, `--up-caption-background`, `--up-caption-opacity`, `--up-caption-edge`, `--up-caption-font` | Native cue styling |
| Survey | `--up-survey-button-radius`, `--up-survey-submit-bg`, `--up-survey-submit-color`, `--up-survey-submit-hover-bg`, `--up-survey-submit-border` | Form buttons |

## Example

```css
universal-player {
  --up-color-accent: #7c3aed;
  --up-color-accent-contrast: #ffffff;
  --up-radius: 0.5rem;
  --up-control-size: 2.75rem;
  --up-font-family: Inter, system-ui, sans-serif;
}
```

## Shadow DOM inheritance

Custom properties inherit through the shadow boundary. Classes, IDs and element selectors do not. Set tokens on the host, not on internal class names.

**Canonical guide:** [Theming root](../theming.md)

---

← Previous: [Overview](./overview.md) · Next: [Design tokens](./design-tokens.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
