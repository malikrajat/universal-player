# Styling best practices

> [Docs home](../README.md) › [Theming](./styling-best-practices.md) › Styling best practices

1. Prefer tokens over `::part()` and `::part()` over internal classes.
2. Set the host size; never style `.up-viewport` directly.
3. Keep the accent-contrast pair explicit for brand colours.
4. Do not remove focus outlines; restyle `--up-focus-ring`.
5. Test both themes and forced-colors mode.
6. Do not target `.up-*` classes; they are implementation detail.
7. For light DOM, import `styles.css` once and scope overrides under your own selector.
8. Avoid `!important`; inline theme properties already win where they matter.
9. Test inside a narrow container, not only a full-width page.
10. Treat third-party embed styling as out of scope.

## Example

```css
.universal-player-host {
  --up-color-accent: #7c3aed;
  --up-radius: 0.5rem;
  max-inline-size: 72rem;
}

.universal-player-host::part(controls) {
  padding-block: 0.5rem;
}
```

**Canonical guide:** [Theming root](../theming.md) · [Troubleshooting styling](../troubleshooting/styling-issues.md)

---

← Previous: [Responsive design](./responsive-design.md) · Next: [Migration](../migration/v1-to-v2.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
