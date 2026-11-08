# Theming overview

> [Docs home](../README.md) › [Theming](./overview.md) › Theming overview

Theming applies to the **built-in UI only**. A headless player renders no chrome to theme.

## Three knobs

1. **Attributes** — `theme="light|dark|system"`, `accent-color`.
2. **CSS custom properties** — `--up-*` on the element or an ancestor (light DOM/Shadow host inheritance).
3. **`ui.theme`** — structured tokens applied inline by the element.

## Precedence

Inline `ui.theme` values and `accent-color` are applied to the root as inline styles, so they beat stylesheet declarations. Host CSS variables inherit into Shadow DOM.

## Parts

`::part(stage|root|viewport|media|controls|time|spinner|error|toast|big-play-button)`.

```css
universal-player::part(controls) {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
}
```

## Limits

- YouTube/Vimeo iframe content cannot be themed.
- Native controls cannot be themed.
- Survey internals are token-only (`--up-survey-*`).
- No SCSS/Less pipeline.

**Canonical guide:** [Theming root](../theming.md) · [Design tokens](./design-tokens.md)

---

← Previous: [Performance example](../examples/performance.md) · Next: [CSS variables](./css-variables.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
