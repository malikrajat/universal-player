# Custom themes

> [Docs home](../README.md) › [Theming](./custom-themes.md) › Custom themes

## Brand theme

```ts
const ui = {
  theme: {
    colors: {
      accent: "#7c3aed",
      accentContrast: "#ffffff",
      background: "#0b0b12",
      surface: "rgba(21, 21, 31, 0.92)",
      foreground: "#f5f3ff",
      muted: "rgba(245, 243, 255, 0.7)",
      border: "rgba(245, 243, 255, 0.16)",
      overlay: "rgba(5, 5, 10, 0.75)",
    },
    radius: "0.5rem",
    controlRadius: "0.375rem",
    menuBackground: "rgba(10, 10, 16, 0.55)",
    menuBlur: "20px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
} satisfies UIOptions;
```

```html
<universal-player ui='{"theme":{"colors":{"accent":"#7c3aed"}}}'></universal-player>
```

## Light theme

```html
<universal-player theme="light" accent-color="#0f172a"></universal-player>
```

## Contrast

The accent contrast helper uses relative luminance with a 0.45 threshold. It is not a WCAG validator. Check any brand colour against the text/icon usage you actually have.

## Which layer wins?

`accent-color` and `ui.theme` write inline properties on `.up-root`; inline beats a stylesheet rule. Host CSS variables still inherit when no inline value exists.

**Canonical guide:** [Theming root](../theming.md) · [Dark mode](./dark-mode.md)

---

← Previous: [Design tokens](./design-tokens.md) · Next: [Dark mode](./dark-mode.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
