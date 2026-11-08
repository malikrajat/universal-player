# Executive briefing room with custom chrome

> [Examples home](../README.md) › [Use cases](./README.md) › Executive briefing room with custom chrome

## Problem

The design team wants its own controls around a reliable media surface.

## What you will build

A headless player with custom play/seek/mute buttons driven by state.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | MP4 |
| Feature | State + events |
| UI | Your design system |

## Flow

```text
createPlayer → statechange → render buttons → methods
```

## Step by step

1. Create with `controls: "custom"` (no chrome).
2. Render your buttons from `state.playing`, `state.currentTime`, `state.duration`.
3. Call `play()`, `pause()`, `seek()`.
4. Add keyboard handling yourself.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({ container: host, source: "/media/briefing.mp4" });
const play = document.querySelector<HTMLButtonElement>("#play")!;
const seek = document.querySelector<HTMLInputElement>("#seek")!;

player.on("statechange", (state) => {
  play.textContent = state.playing ? "Pause" : "Play";
  seek.max = String(state.duration);
});
player.on("timeupdate", ({ currentTime }) => {
  seek.value = String(currentTime);
});

play.addEventListener("click", () => {
  if (player.state.playing) player.pause();
  else void player.play();
});
seek.addEventListener("input", () => player.seek(Number(seek.value)));
```

## UX notes

Keep the control bar 44 px tall on touch. Show buffered progress.

## Security and limits

No special risk beyond the media URL. Do not inject untitled labels as HTML.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| no controls | n/a | Expected: headless |
| stale UI | n/a | Subscribe to statechange |
| destroyed | destroyed | Guard the unmount |

## Checklist

- [ ] Custom focus styles
- [ ] Keyboard support
- [ ] State-driven buttons
- [ ] Destroy

## Framework pages

[Vanilla](../vanilla/formats/mp4.md) · [React](../react/formats/mp4.md) · [Vue](../vue/formats/mp4.md) · [Angular](../angular/formats/mp4.md) · [Svelte](../svelte/formats/mp4.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
