# Built-in UI

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Built-in UI

The UI only exists in `<universal-player>`. It is a shadow-DOM component with an optional light-DOM mode.

## Controls

`PlayerControl` values: `play`, `previous`, `next`, `rewind`, `forward`, `seek`, `time`, `volume`, `mute`, `captions`, `settings`, `quality`, `speed`, `audioTrack`, `chapters`, `chapterLabel`, `playlist`, `stats`, `share`, `cast`, `airplay`, `pip`, `fullscreen`, `zoom`, `rotate`, `download`, `title`, `live`.

Not every control exists as a standalone button; `rewind`, `forward`, `speed`, `quality` and `audioTrack` are menu/settings surfaces.

## Visibility

```ts
ui: {
  controls: ["play", "seek", "time", "volume", "settings", "fullscreen"],
  hide: ["cast"],
  order: ["play", "volume", "time", "settings", "fullscreen"],
}
```

- Array = allow-list.
- Object = per-control boolean overrides.
- `hide` is merged after `controls`.
- `order` only moves listed controls; omitted controls keep their slot.

Capabilities and available data still win: a captions button is hidden when there are no text tracks, and PiP is hidden for audio.

## Menus

Captions, settings, chapters, playlist, stats, shortcuts and share are in-player sheets. The settings sheet sections are `speed`, `quality`, `captions`, `captionStyle`, `audio`, `loop`, `autoplay`, `autoplayNext`, `sleepTimer`, `stats`, `shortcuts`.

Sleep timer presets are 5–60 minutes. The timer pauses playback and shows a toast.

## Gestures

Opt-in and pointer-only (mouse pointers are ignored):

```ts
ui: {
  gestures: {
    enabled: true,
    swipeSeek: true,
    swipeFullscreen: true,
    threshold: 48,
  },
}
```

Horizontal drag seeks by `max(seekStep, 5% of duration)`; vertical drag enters/exits fullscreen.

## Keyboard

Global shortcuts are active when the element has focus (or its subtree). See [Keyboard shortcuts](../keyboard-shortcuts.md). Shortcuts are suppressed in inputs, selects, textareas and contenteditable.

## Accessibility facts

Real controls, `aria-label`, `aria-pressed`, `aria-expanded`, `aria-valuetext`, `role="alert"`, `role="status"` toast, focus return for menus. The survey overlay uses `role="dialog"` and `aria-modal="true"`, but **there is no focus trap** and no automated axe audit. Do not claim WCAG conformance.

## Customization surface

CSS variables (`--up-*`), `::part()` names (`stage`, `root`, `viewport`, `media`, `controls`, `time`, `spinner`, `error`, `toast`, `big-play-button`), `accent-color`, `ui.theme`, and `strings`.

**Next:** [Configuration](./advanced-configuration.md)

---

← Previous: [Frameworks](./frameworks.md) · Next: [Configuration](./advanced-configuration.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
