# Advanced example

> [Docs home](../README.md) › [Examples](./advanced.md) › Advanced example

A production-shaped player with tracks, chapters, playlist, resume and error handling.

```ts
import { createPlayer, isPlayerError, type PlaylistItem } from "@codewithrajat/universal-player/core";

const items: PlaylistItem[] = [
  { source: "/media/one.mp4", title: "One", poster: "/media/one.jpg" },
  { source: "/media/two.mp4", title: "Two", poster: "/media/two.jpg" },
];

const player = createPlayer({
  container: document.querySelector("#app")!,
  controls: "custom", // only meaningful for the element; use "native" headless
  playlist: { items, autoAdvance: true, autoAdvanceDelay: 2, loop: false },
  chapters: [
    { id: "intro", title: "Introduction", startTime: 0 },
    { id: "body", title: "Body", startTime: 30 },
  ],
  captions: {
    defaultTrack: "en",
    persist: true,
    tracks: [{ id: "en", src: "/media/en.vtt", label: "English", language: "en" }],
  },
  resume: { enabled: true, minDuration: 45 },
  analytics: { onEvent: (event) => console.log(event.type, event.position) },
});

player.on("error", ({ error }) => {
  if (isPlayerError(error) && error.code === "network-error") {
    void player.retry();
  }
});

await player.playPlaylistItem(0);
```

## Note

`controls: "custom"` on a headless player removes browser controls without adding any. Use `controls: "native"` or mount `<universal-player>`.

**Canonical guide:** [Advanced usage](../guides/advanced-usage.md) · [Example book](../../examples/README.md)

---

← Previous: [Basic example](./basic.md) · Next: [Accessibility example](./accessibility.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
