# Responsive design

> [Docs home](../README.md) › [Theming](./responsive-design.md) › Responsive design

## Sizing

The element is `display: block; width: 100%`. The video viewport uses `aspect-ratio: 16 / 9`. Audio uses `aspect-ratio: auto; min-height: 9rem`.

```css
.player-slot {
  inline-size: min(960px, 100%);
  margin-inline: auto;
}

.player-slot universal-player {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
}
```

## Small screens

The stylesheet reduces `--up-control-size` at breakpoints (2.5rem → 2.35rem → 2.1rem). If you need larger touch targets, raise the token.

## Menus

Sheets are positioned within the player root. Very narrow containers can clip long labels; provide short translated strings.

## RTL

Logical properties are used throughout. Set `dir="rtl"` on the host or an ancestor. The seek bar direction follows the document.

## Images

The image engine uses the original dimensions with CSS `object-fit`; provide a sized rendition rather than relying on the player.

**Canonical guide:** [Theming root](../theming.md) · [Accessibility](../guides/accessibility.md)

---

← Previous: [Dark mode](./dark-mode.md) · Next: [Styling best practices](./styling-best-practices.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
