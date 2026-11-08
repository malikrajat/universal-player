# Accessibility

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Accessibility

**This page is an implementation inventory, not a conformance claim.** No WCAG audit, axe run or screen-reader regression suite exists in this repository.

## What is implemented

| Area | Implementation |
| --- | --- |
| Native semantics | `<button>`, `<input type="range">`, `<select>`, `<video>`, `<audio>`, `<img alt>` |
| Labels | `aria-label` on icon buttons, sliders, time, player region |
| Toggle state | `aria-pressed` on play, mute, captions, PiP, fullscreen |
| Menu state | `aria-expanded` on menu triggers |
| Slider value | `aria-valuetext` with elapsed/total |
| Loading | `aria-busy="true"` while loading |
| Error | `role="alert"` error overlay |
| Toast | `role="status"` |
| Survey | `role="dialog"`, `aria-modal="true"`, labelled questions |
| Keyboard | Full shortcut set, suppressed in form fields |
| RTL | Logical CSS properties |
| Reduced motion | `prefers-reduced-motion` rules |
| Forced colors | `forced-colors` rules |
| Focus return | Menus restore focus to the trigger |

## What is missing

- **No focus trap** in the survey dialog. Tab can leave it.
- No automated axe audit in CI.
- No transcript panel.
- No audio-description authoring beyond native text tracks.
- No NVDA/JAWS/VoiceOver regression suite.
- No tested contrast guarantee for arbitrary accent colours.

## Keyboard

See [Keyboard shortcuts](../keyboard-shortcuts.md). Shortcuts require focus inside the element. `? ` opens the help overlay; `Esc` closes overlays.

## Captions

Native text tracks render the cues. The CC button toggles; Settings exposes language and caption style. Provide a transcript separately for audio-only content.

## Touch targets

`--up-control-size` defaults to `2.5rem`; the stylesheet reduces it on small screens. That exceeds the 24×24 CSS px WCAG 2.2 minimum but not the 44 px comfort target. If you need larger targets:

```css
universal-player { --up-control-size: 2.75rem; }
```

## Testing checklist for your app

- [ ] Tab through every control; focus is visible.
- [ ] Play/pause/mute announce state changes.
- [ ] Seek announces time.
- [ ] Errors are announced.
- [ ] Survey can be completed and closed by keyboard.
- [ ] Custom accent has 4.5:1 contrast for text and 3:1 for UI.
- [ ] Reduced-motion preference removes non-essential animation.
- [ ] Test with at least one screen reader on your target OS.

**Next:** [Security](./security.md)

---

← Previous: [Lazy loading](./lazy-loading.md) · Next: [Security](./security.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
