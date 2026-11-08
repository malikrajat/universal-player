# Basic usage

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Basic usage

## Full UI

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="system"
  label="Clip"
></universal-player>
```

That is the only path that renders the built-in controls.

## Headless with native controls

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "/media/clip.mp4",
  controls: "native",
});
```

## Video

```ts
const player = createPlayer({
  container: host,
  source: { kind: "video", src: "/clip.mp4", type: "video/mp4" },
  poster: "/poster.jpg",
  captions: {
    tracks: [{ id: "en", src: "/captions/en.vtt", label: "English", language: "en", default: true }],
  },
});
```

## Audio

```ts
const player = createPlayer({
  container: host,
  source: { kind: "audio", src: "/episode.mp3" },
  poster: "/artwork.jpg",
  controls: "native",
});
```

PiP is not available; the built-in UI shows an animated audio visual.

## Image

```ts
const player = createPlayer({
  container: host,
  source: { kind: "image", src: "/photo.jpg", alt: "Product photo" },
  image: { zoom: true, rotate: true, download: false, minZoom: 0.5, maxZoom: 4 },
});
```

There is no play/seek/volume. Zoom and rotate are rendered by the built-in UI; headless consumers must apply their own transform.

## Embed

```ts
const player = createPlayer({
  container: host,
  source: { kind: "embed", src: "https://www.youtube.com/watch?v=VIDEO_ID", provider: "youtube" },
  controls: "native",
});
```

YouTube/Vimeo support commands and time sync. A generic embed is display-only.

## Playlist

```ts
player.setPlaylist({
  items: [
    { source: "/one.mp4", title: "One" },
    { source: "/two.mp4", title: "Two" },
  ],
  autoAdvance: true,
});
await player.playPlaylistItem(0);
```

## Cleanup

```ts
player.destroy();
```

**Next:** [Advanced usage](./advanced-usage.md)

---

← Previous: [Core concepts](./core-concepts.md) · Next: [Advanced usage](./advanced-usage.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
