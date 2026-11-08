# Accessibility

> [Docs home](./README.md) � Accessibility

[← Docs](./README.md) · [Keyboard shortcuts](./keyboard-shortcuts.md) · [Theming](./theming.md)

**Target: WCAG 2.2 AA.**

The built-in UI is designed around native controls, visible focus, keyboard
operation and reduced-motion support. A formal automated axe/Playwright audit is
on the roadmap; the markup and behaviour below are implemented today.

---

## 1. Native semantics

Every interactive element is a real control:

- `<button>` for play, mute, fullscreen, PiP, captions, settings, share, cast.
- `<input type="range">` for seek and volume.
- `<select>` for language/track selection where appropriate.
- `<img>` with `alt` for images.
- `<video>`/`<audio>` for media.

No `div` acts as a button. This gives screen readers, keyboard focus and
platform conventions for free.

---

## 2. Labels and state

| Attribute        | Used on                                           |
| ---------------- | ------------------------------------------------- |
| `aria-label`     | Player region, icon-only buttons, sliders         |
| `aria-pressed`   | Toggle controls (play, mute, captions, loop, PiP) |
| `aria-expanded`  | Menus/sheets                                      |
| `aria-valuetext` | Seek/volume ranges                                |
| `aria-busy`      | Loading state                                     |
| `role="alert"`   | Error overlay                                     |
| `role="dialog"`  | Survey overlay (where applicable)                 |
| `aria-live`      | Toasts and status messages                        |

Strings come from `PlayerStrings`, so localized labels follow the selected
locale.

---

## 3. Keyboard

| Key                 | Action                       |
| ------------------- | ---------------------------- |
| `Tab` / `Shift+Tab` | Move through controls        |
| `Space` / `Enter`   | Activate the focused control |
| `Space` / `K`       | Play/pause                   |
| `M`                 | Mute                         |
| `F`                 | Fullscreen                   |
| `C`                 | Captions                     |
| `S`                 | Settings                     |
| `Esc`               | Close overlay                |
| Arrows              | Seek / volume                |
| `?`                 | Shortcut help                |

Shortcuts are suppressed in text fields and when a modifier key is held. See
[Keyboard shortcuts](./keyboard-shortcuts.md).

---

## 4. Focus

- Visible focus rings use `--up-focus-ring`, derived from the accent.
- Menus return focus to the triggering control when closed.
- The survey overlay moves focus into the dialog when it opens and restores it to the trigger on close. It does **not** trap focus; Tab can leave the dialog.
- The player region is focusable and labelled.

Do not remove focus outlines in host-page CSS. If you restyle, keep a visible
indicator with at least 3:1 contrast against the adjacent colour.

---

## 5. Reduced motion and forced colors

```css
@media (prefers-reduced-motion: reduce) {
  /* the built-in stylesheet removes non-essential animation */
}
```

- Animated audio bars stop.
- Transitions are shortened or removed.
- Menu open/close does not rely on motion.

`forced-colors` mode replaces custom surfaces with system colours so controls
remain visible in Windows High Contrast.

---

## 6. Captions and transcripts

- Captions are rendered by the native media element for native sources.
- The CC button toggles on/off; language and size are in Settings.
- `captions.style` can increase size and contrast.
- There is no built-in transcript panel in `0.0.1`.

Provide captions for prerecorded media and a transcript for audio-only content
to meet WCAG 1.2.x.

---

## 7. Touch targets

Controls use `--up-control-size` (default `2.5rem`). On small screens the
stylesheet reduces it to `2.1rem`/`2.35rem`, which is above the WCAG 2.2 minimum
target size (24 × 24 CSS px) but below the 44 px comfort target. If your
audience is primarily mobile, raise it:

```css
universal-player {
  --up-control-size: 2.75rem;
}
```

---

## 8. Colour and contrast

- Default dark theme uses near-white text on near-black surfaces.
- Default light theme uses near-black text on near-white surfaces.
- Accent contrast is auto-derived, but arbitrary brand colours can still fail.
- Test your accent with a contrast checker in both themes.

---

## 9. i18n and RTL

- Strings are resolved per locale.
- The layout uses logical properties (`margin-inline`, `inset-inline`), so RTL
  works without a separate stylesheet.
- `dir="rtl"` on the host or an ancestor is respected.

---

## 10. Screen-reader checklist

- [ ] Player region has a meaningful `label`.
- [ ] Play/pause announces state (`aria-pressed`).
- [ ] Seek announces `aria-valuetext` with elapsed/total.
- [ ] Volume announces percentage.
- [ ] Menus announce expanded/collapsed.
- [ ] Errors are announced (`role="alert"`).
- [ ] Survey questions have labels and required state.
- [ ] Toasts are announced politely.
- [ ] Focus returns after closing overlays.

---

## 11. What is not done yet

- Automated axe audit in CI.
- A dedicated transcript panel.
- Audio description track UI beyond native text tracks.
- Screen-reader regression suite across NVDA/JAWS/VoiceOver.

These are tracked in the [roadmap](./roadmap.md) and
[feature status](./features.md).

---

## 12. Reporting an accessibility issue

Open an issue with:

1. Browser + assistive technology + version.
2. The exact control and expected announcement.
3. A minimal reproduction (HTML or framework snippet).
4. Whether the issue is in the player or in host-page CSS.

See [Contributing](./contributing.md) and [Security](./security.md) for
sensitive reports.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)