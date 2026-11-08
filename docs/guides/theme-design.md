# Theme design

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Theme design

The built-in UI is themed through CSS custom properties. There is no Sass build step.

## Three layers

1. **Design tokens** — `--up-color-*`, `--up-radius`, `--up-font-family`, `--up-control-size`.
2. **Component states** — `.up-root[data-up-theme="dark|light"]`, `[data-up-status]`, `[data-up-kind]`.
3. **Parts** — `::part(stage|root|viewport|media|controls|time|spinner|error|toast|big-play-button)`.

## Accent

```html
<universal-player accent-color="#7c3aed"></universal-player>
```

The element computes a black/white contrast colour for the accent. That is a luminance heuristic, not a WCAG proof. Test 4.5:1 for text.

## Theme object

```ts
{
  theme: "dark",
  ui: {
    theme: {
      colors: { accent: "#7c3aed", background: "#0b0b12", surface: "#15151f" },
      radius: "0.5rem",
      controlRadius: "0.375rem",
      fontFamily: "Inter, system-ui, sans-serif",
      menuBackground: "rgba(10,10,16,0.6)",
      menuBlur: "16px",
      variables: { "--up-control-size": "2.75rem" },
    },
  },
}
```

## Light/dark/system

`theme="system"` follows `prefers-color-scheme`. The root gets `data-up-theme`. Host-page dark mode does not automatically reach Shadow DOM; use the attribute or tokens.

## Responsive

The viewport uses `aspect-ratio: 16 / 9` for video; audio switches to a min-height layout. Set the host width; do not hard-code pixel sizes inside.

## What you cannot theme

- Survey markup internals beyond the exposed `--up-survey-*` tokens.
- The iframe content of YouTube/Vimeo.
- Native media controls when `controls="native"`.

**Canonical guide:** [Theming](../theming.md) · [Design tokens](../theming/design-tokens.md)

---

← Previous: [Debugging](./debugging.md) · Next: [Troubleshooting](./troubleshooting.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
