# Accessibility

> [Examples home](../README.md) › [Production guides](./README.md) › Accessibility

## What you get

- Real buttons, range inputs, selects, media elements and images with `alt`.
- `aria-label`, `aria-pressed`, `aria-expanded`, `aria-valuetext`, `aria-busy`.
- `role="alert"` errors, `role="status"` toast.
- Keyboard shortcuts when focus is inside the element.
- Menu focus return.
- RTL logical properties, reduced-motion and forced-colors CSS.

## What you do not get

- **No focus trap** in the survey dialog.
- No axe audit in CI.
- No transcript panel.
- No NVDA/JAWS/VoiceOver regression suite.
- No guaranteed contrast for arbitrary brand accents.

## Keyboard contract

| Key | Action |
| --- | --- |
| Space / K | play/pause |
| M | mute |
| F | fullscreen |
| C | captions |
| S | settings |
| Q | quality |
| A | audio track |
| T | sleep timer |
| R | loop |
| ←/→ | seek 5 s |
| J/L | seek 10 s |
| ↑/↓ | volume |
| 0–9 | seek % |
| Home/End | start/end |
| < / > | speed |
| N/P | next/previous |
| I | stats |
| ? | shortcuts |
| Esc | close |

Shortcuts are suppressed in inputs/selects/textareas/contenteditable and when Ctrl/Meta/Alt is held.

## Checklist

- [ ] Accessible name matches the content.
- [ ] Captions provided and CORS-correct.
- [ ] Transcript link for audio.
- [ ] Visible focus in your CSS reset.
- [ ] Survey completable by keyboard.
- [ ] Accent contrast checked manually.
- [ ] Reduced-motion and forced-colors tested.
- [ ] One screen reader tested on your OS.

## Do not claim

WCAG 2.2 AA conformance, an axe-clean result, or screen-reader coverage.

## Related

[docs/guides/accessibility.md](../../docs/guides/accessibility.md) · [Keyboard shortcuts](../../docs/keyboard-shortcuts.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
