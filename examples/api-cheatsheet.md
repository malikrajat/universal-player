# API cheatsheet

> [Examples home](./README.md) › API cheatsheet

## Imports

```ts
import { createPlayer, isPlayerError, normalizeSource, PLAYER_ERROR_CODES } from "@codewithrajat/universal-player/core";
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";
import "@codewithrajat/universal-player/ui"; // registers <universal-player>
import { UniversalPlayer } from "@codewithrajat/universal-player/react"; // source={...}
import { UniversalPlayer as VuePlayer } from "@codewithrajat/universal-player/vue"; // src="..."
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";
import SveltePlayer from "@codewithrajat/universal-player/svelte5";
```

## Minimal core

```ts
const player = createPlayer({ container: host, source: URL, controls: "native" });
await player.play();
player.destroy();
```

## Sources

```ts
await player.load(URL);
await player.load(file);
await player.load({ kind: "audio", src: URL });
await player.load({ kind: "embed", provider: "youtube", src: URL });
await player.load({ kind: "video", type: "video/mp4", chunks: () => iterable });
await player.load([URL, URL]);
```

## Load options

```ts
createPlayer({
  container: host,
  source,
  controls: "custom",
  autoplay: false,
  muted: true,
  loop: false,
  preload: "metadata",
  poster: "/poster.jpg",
  volume: 0.8,
  playbackRate: 1,
  startTime: 0,
  crossOrigin: "anonymous",
  playsInline: true,
  resume: { enabled: true, minDuration: 30 },
  analytics: { onEvent: (event) => console.log(event.type) },
});
```

## State and events

```ts
player.state.status;
player.state.currentTime;
player.state.duration;
player.state.capabilities.pictureInPicture;
player.on("timeupdate", ({ currentTime, duration }) => {});
player.on("error", ({ error }) => {});
player.observe("statechange").subscribe((state) => {});
```

## Playback

```ts
await player.play();
player.pause();
player.seek(30);
player.setVolume(0.5);
player.setMuted(true);
player.setPlaybackRate(1.5);
```

## Read-only

There is no read-only mode. To prevent editing, there is nothing to edit; playback controls are always available unless you hide them in the UI. Images have no playback.

## Adapter document calls

```ts
player.setTextTrack("en");
player.setAudioTrack(null);
player.setQuality(null);
player.setChapters([{ id: "a", title: "A", startTime: 0 }]);
player.seekToChapter("a");
player.setThumbnails({ cues: [{ startTime: 0, endTime: 5, url: "/t.jpg" }] });
```

## UI

```html
<universal-player src="URL" controls="custom" theme="dark" label="Clip"></universal-player>
```

```ts
element.getEmbedCode();
element.strings = { play: "Start" };
element.load(URL);
```

## Framework one-liners

```tsx
<UniversalPlayer source={URL} controls="native" />
```

```vue
<UniversalPlayer :src="URL" controls="native" />
```

```ts
new AngularUniversalPlayer({ elementRef, inputs: { source: URL, controls: "native" } });
```

```svelte
<UniversalPlayer src={URL} controls="native" />
```

## Errors

```ts
if (isPlayerError(error)) {
  console.log(error.code, error.details);
}
```

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
