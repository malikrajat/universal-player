# Migration

> [Docs home](./README.md) › Migration

[← Docs](./README.md) · [Versioning](./versioning-and-breaking-changes.md) · [Breaking change policy](./breaking-change-policy.md)

Guides for moving to `@codewithrajat/universal-player` from a native `<video>`
or another player, and for upgrading between versions.

---

## 1. From a native `<video>` element

### Before

```html
<video id="player" src="/clip.mp4" controls poster="/poster.jpg" preload="metadata"></video>
```

### After: custom element (smallest change)

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/clip.mp4"
  poster="/poster.jpg"
  controls="custom"
  preload="metadata"
></universal-player>
```

### After: headless (keep your own UI)

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#player")!,
  source: "/clip.mp4",
  poster: "/poster.jpg",
  controls: "native", // or "custom"
});
```

### Mapping native attributes and APIs

| Native                            | This library                                             |
| --------------------------------- | -------------------------------------------------------- |
| `src`                             | `src` / `source`                                         |
| `poster`                          | `poster` / `thumbnail`                                   |
| `controls`                        | `controls="native"` or `"custom"`                        |
| `autoplay`                        | `autoplay`                                               |
| `muted`                           | `muted`                                                  |
| `loop`                            | `loop`                                                   |
| `preload`                         | `preload`                                                |
| `playsinline`                     | `playsinline`                                            |
| `crossorigin`                     | `crossorigin`                                            |
| `video.play()`                    | `player.play()`                                          |
| `video.pause()`                   | `player.pause()`                                         |
| `video.currentTime`               | `player.state.currentTime` / `player.seek()`             |
| `video.volume`                    | `player.state.volume` / `player.setVolume()`             |
| `video.muted`                     | `player.state.muted` / `player.setMuted()`               |
| `video.playbackRate`              | `player.state.playbackRate` / `player.setPlaybackRate()` |
| `video.textTracks`                | `player.state.textTracks`                                |
| `video.requestFullscreen()`       | `player.requestFullscreen()`                             |
| `video.requestPictureInPicture()` | `player.requestPictureInPicture()`                       |
| `timeupdate` event                | `player.on("timeupdate", ...)`                           |
| `loadedmetadata`                  | `player.on("loadedmetadata", ...)`                       |
| `ended`                           | `player.on("ended", ...)`                                |

### What you gain

Captions menu, quality levels, chapters, playlists, surveys, resume, analytics,
theming, keyboard shortcuts, adaptive controls and a consistent API across
frameworks.

### What changes

- You no longer query the `<video>` first; use `player.mediaElement` if you need
  it.
- The player owns state; read `player.state` instead of element properties.
- `destroy()` is required for vanilla/core usage.

### What you can delete

- Custom caption menu code (built-in).
- Custom quality/speed menus for HLS/DASH.
- Playlist state machine.
- Keyboard shortcut handler (built-in).
- Fullscreen/PiP feature detection (capabilities).
- Ad-hoc theming CSS (tokens/parts).

### What to keep

- Your analytics pipeline (`analytics.onEvent`).
- Your survey/feedback backend (`survey.onSubmit`).
- Your auth/signed-URL layer (`load()` accepts the resolved URL).
- Your page layout and design system (tokens).

---

## 2. From Video.js / Plyr

There is no automatic importer. The mapping is conceptual:

| Video.js / Plyr concept | Here                                    |
| ----------------------- | --------------------------------------- |
| Player constructor      | `createPlayer()` / `<universal-player>` |
| `player.play()`         | `player.play()`                         |
| `player.currentTime()`  | `player.state.currentTime` / `seek()`   |
| `player.volume()`       | `state.volume` / `setVolume()`          |
| `player.on("event")`    | `player.on("event")`                    |
| Plugins                 | Feature modules / core APIs             |
| Skins                   | CSS tokens + parts                      |
| Tech order              | Automatic provider selection            |

If you rely on a plugin that has no equivalent (ads, DRM), keep the existing
player for that surface until the roadmap item ships.

---

## 3. From another internal player

1. Replace the wrapper component with the matching adapter or the element.
2. Map configuration to [PlayerOptions](./configuration.md).
3. Map events to [PlayerEvents](./api-reference.md#events).
4. Replace custom controls with `ui.controls` / `ui.hide`.
5. Move survey/feedback flows to `SurveyConfig`.
6. Move analytics to `analytics.onEvent`.

Keep the old player behind a flag until parity is verified.

---

## 4. Framework-specific migration

### React

```tsx
// Before: manual <video> ref + effects
// After:
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

<UniversalPlayer source={src} theme="dark" />;
```

The adapter owns creation/destruction and source reloads.

### Vue

```vue
<script setup>
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template><UniversalPlayer :src="src" theme="dark" /></template>
```

### Angular

Follow the controller pattern in [Frameworks](./frameworks.md#angular). The
controller replaces manual `ViewChild` + `video` plumbing.

### Svelte

Use `/svelte4` or `/svelte5` depending on your major.

---

## 5. Upgrading versions

### Within `0.0.x`

- Read [CHANGELOG.md](../CHANGELOG.md).
- Re-run typecheck/tests.
- Check [Defaults](./defaults.md) if you rely on omitted values.

### Pinning advice

- Applications: pin an exact version in the lockfile and upgrade deliberately.
- Libraries: use a compatible range and test the lowest supported peer.
- During `0.0.x`, treat every release as potentially breaking and read the
  changelog.

### Migration note template

```md
## X → Y

### Removed `foo()`

Before: `player.foo()`
After: `player.bar()`

Search for: `foo(`
```

### To a future major

1. Read [Breaking change policy](./breaking-change-policy.md).
2. Read the migration section for the version.
3. Search for removed APIs:

   ```bash
   grep -R "setCaptionsOff\|setSource\|togglePlay" src
   ```

4. Replace deprecated calls.
5. Re-check theming tokens and parts.
6. Re-test surveys, playlists and resume if defaults changed.
7. Pin the new version.

---

## 6. Migration checklist

- [ ] Entry point chosen.
- [ ] Source mapping verified (URL, structured, Blob, HLS/DASH).
- [ ] Poster and captions moved.
- [ ] Controls configured.
- [ ] Events rewired.
- [ ] Analytics moved.
- [ ] Survey/feedback moved.
- [ ] Playlist/chapters moved.
- [ ] Theming tokens applied.
- [ ] Cleanup/destroy wired.
- [ ] Accessibility re-tested.
- [ ] Old player removed.

---

## 7. Getting help

Open an issue with the “migration” label and include:

- the old player/library;
- the configuration you are porting;
- the behaviour you cannot reproduce;
- a minimal reproduction.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)