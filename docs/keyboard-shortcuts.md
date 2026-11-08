# Keyboard shortcuts

> [Docs home](./README.md) � Keyboard shortcuts

[← Docs](./README.md) · [Accessibility](./accessibility.md) · [Usage](./usage.md)

The built-in UI includes a YouTube-style keyboard map and a `?` help overlay.
Shortcuts are on by default (`keyboard: true`) and can be disabled per player.

---

## 1. Full key map

| Key              | Action                           |
| ---------------- | -------------------------------- |
| `Space` / `K`    | Play or pause                    |
| `M`              | Mute / unmute                    |
| `F`              | Fullscreen                       |
| `C`              | Captions on/off                  |
| `S`              | Open Settings                    |
| `Q`              | Open the Quality menu            |
| `[` / `]`        | Lower / raise quality            |
| `A`              | Open the audio track menu        |
| `T`              | Open the sleep timer             |
| `R`              | Toggle loop                      |
| `↑` / `↓`        | Volume up / down                 |
| `←` / `→`        | Seek backward / forward          |
| `J` / `L`        | Seek 10 s backward / forward     |
| `0`–`9`          | Seek to 0%–90%                   |
| `Home` / `End`   | Jump to start / end              |
| `<` / `>`        | Playback speed down / up         |
| `,` / `.`        | Playback speed down / up (alias) |
| `N` / `PageDown` | Next playlist item               |
| `P` / `PageUp`   | Previous playlist item           |
| `I`              | Stats for nerds                  |
| `?`              | Keyboard shortcuts help          |
| `Esc`            | Close overlays/menus             |

The help overlay is generated from `PLAYER_SHORTCUTS`, so the UI and the docs
stay aligned.

---

## 2. Focus and typing behaviour

Shortcuts are suppressed when:

- the event target is an `<input>`, `<select>`, `<textarea>` or
  `contenteditable` element;
- the event has already been handled (`defaultPrevented`);
- `Ctrl`, `Meta` or `Alt` is held (so browser shortcuts still work).

This means typing in a survey text field never pauses the video or seeks.

The player region is focusable. Keyboard events are handled while focus is
inside the player; they do not hijack page-wide keys when focus is elsewhere.

---

## 3. Disabling shortcuts

```ts
createPlayer({
  container,
  source,
  keyboard: false,
});
```

```html
<universal-player src="/clip.mp4" keyboard="false"></universal-player>
```

Disabling shortcuts removes the key handler and the `?` overlay. The Settings
hints can also be hidden with `ui.settings.shortcuts: false`.

---

## 4. Custom step sizes

```ts
createPlayer({
  container,
  source,
  seekStep: 10,
  volumeStep: 0.05,
});
```

- `←`/`→` move by `seekStep` (default `5`).
- `J`/`L` move by `2 × seekStep` (default `10`).
- `↑`/`↓` change volume by `volumeStep` (default `0.1`).

Speed changes by `0.25×` per `<`/`>` press and clamp at `0.25`–`4`.

---

## 5. Playlist gating

`N` and `P` call the same `next()`/`previous()` methods as the UI. Therefore:

- `allowNext: false` prevents `N`.
- `requireCompletion: true` prevents `N` until the item ends.
- `allowPrevious: false` makes `P` a no-op.
- `loop: true` wraps at the ends.

Shortcuts cannot bypass course/kiosk rules.

---

## 6. Element commands

The element also exposes data actions used by the UI. These are internal but
stable enough for integration tests:

`toggle-play`, `toggle-mute`, `toggle-fullscreen`, `toggle-captions`,
`toggle-pip`, `toggle-settings`, `open-quality`, `open-audio`, `open-sleep`,
`toggle-stats`, `quality-relative`, `toggle-shortcuts`, `toggle-loop`,
`seek-relative`, `seek-percent`, `seek-start`, `seek-end`, `volume-relative`,
`speed-relative`, `next-item`, `previous-item`, `escape`.

They are triggered through `data-up-action` on controls and are not part of the
typed public API.

---

## 7. Screen readers

Every shortcut has an accessible control equivalent:

| Shortcut                     | Equivalent control            |
| ---------------------------- | ----------------------------- |
| Play/pause                   | Play button                   |
| Mute                         | Mute button                   |
| Fullscreen                   | Fullscreen button             |
| Captions                     | CC button                     |
| Settings/quality/audio/sleep | Settings menu rows            |
| Seek/volume                  | Sliders                       |
| Next/previous                | Playlist controls             |
| Stats                        | Settings → Stats for nerds    |
| Help                         | Settings → Keyboard shortcuts |

No functionality is keyboard-only. See [Accessibility](./accessibility.md).

---

## 8. Custom UI

If you build your own controls, reuse the mapping:

```ts
import { shortcutForEvent, PLAYER_SHORTCUTS } from "@codewithrajat/universal-player";

window.addEventListener("keydown", (event) => {
  const action = shortcutForEvent(event, { seekStep: 5, volumeStep: 0.1 });
  if (action === null) return;

  event.preventDefault();

  switch (action.type) {
    case "toggle-play":
      void (player.state.playing ? player.pause() : player.play());
      break;
    case "seek-relative":
      player.seek(player.state.currentTime + action.delta);
      break;
    case "volume-relative":
      player.setVolume(player.state.volume + action.delta);
      break;
    case "escape":
      closeOverlays();
      break;
    // ...
  }
});
```

`PLAYER_SHORTCUTS` is a readonly array of `{ keys, action }` for rendering help.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)