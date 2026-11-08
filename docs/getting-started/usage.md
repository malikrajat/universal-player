# Usage

> [Docs home](../README.md) › [Getting started](./introduction.md) › Usage

## Sources

`PlayerSourceInput` is any of:

```ts
type PlayerSourceItem = string | PlayerSource | Blob | File | MediaStream;
type PlayerSourceInput = PlayerSourceItem | readonly PlayerSourceItem[];
```

### URL string

```ts
await player.load("/media/clip.mp4");
await player.load("https://cdn.example.com/live.m3u8");
await player.load("https://youtu.be/dQw4w9WgXcQ");
```

Detection order: YouTube/Vimeo host → MIME → extension → fallback `"video"`.

### Structured source

```ts
await player.load({
  kind: "video",
  src: "/media/clip.mp4",
  type: "video/mp4",
  poster: "/media/poster.jpg",
  title: "Clip",
  chapters: [{ id: "intro", title: "Intro", startTime: 0 }],
});
```

Use a structured source when the extension lies, when you need an explicit `kind`, or when you want to travel metadata with the source.

### File / Blob

```ts
fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (file) await player.load(file);
});
```

The player creates and later revokes the object URL. The MIME type decides video/audio/image; an empty type falls back to video.

### MediaStream

```ts
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
await player.load(stream);
```

### Chunked source

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => uploadChunks, // function so reload works
  mode: "auto",
});
```

### Array = playlist

```ts
await player.load(["/a.jpg", "/b.jpg", "/c.jpg"]);
```

An array is turned into a playlist with `autoAdvance: false` and the first item loaded. For image galleries, set `image.slideDuration` to auto-advance.

## State

`player.state` is an immutable snapshot. It is replaced, never mutated.

```ts
const unsubscribe = player.on("statechange", (state) => {
  console.log(state.status, state.currentTime, state.duration);
});
unsubscribe();
```

Key fields: `status`, `source`, `kind`, `capabilities`, `currentTime`, `duration`, `buffered`, `volume`, `muted`, `playbackRate`, `playing`, `ended`, `seeking`, `live`, `fullscreen`, `pictureInPicture`, `quality`, `qualities`, `textTrack`, `textTracks`, `audioTrack`, `audioTracks`, `chapters`, `activeChapter`, `playlist`, `survey`, `surveyOpen`, `error`.

## Events

Three equivalent styles:

```ts
player.addEventListener("play", () => {});
player.on("play", () => {});
player.observe("play").subscribe(() => {});
```

All 29 event names are listed in [API index](../API.md#events). Listener exceptions are isolated and never break playback.

## Playback controls

```ts
await player.play();
player.pause();
player.seek(42);
player.setVolume(0.6);
player.setMuted(true);
player.setPlaybackRate(1.25);
```

Volume clamps to 0–1; rate clamps to 0.25–4.

## Tracks

```ts
player.setTextTrack("en");
player.setAudioTrack("commentary");
player.setQuality(null); // automatic
```

## Playlist

```ts
player.setPlaylist({
  items: [
    { source: "/a.mp4", title: "A" },
    { source: "/b.mp4", title: "B" },
  ],
  autoAdvance: true,
  autoAdvanceDelay: 2,
});

await player.playPlaylistItem(1);
await player.next();
```

`setPlaylist` does not load an item by itself. Use `playPlaylistItem()`, or pass `playlist` to the constructor and the constructor loads `startIndex`.

## Full UI attributes

`<universal-player>` adds declarative attributes: `src`, `poster`, `thumbnail`, `autoplay`, `muted`, `loop`, `controls`, `theme`, `accent-color`, `ui`, `locale`, `preload`, `crossorigin`, `playsinline`, `start-time`, `shadow`, `inject-styles`, `volume`, `rate`, `label`, `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image`, `keyboard`, `click-to-play`, `double-click-fullscreen`, `auto-hide-controls`, `seek-step`, `volume-step`.

JSON attributes (`ui`, `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image`) are parsed with `JSON.parse`; invalid JSON is ignored.

## Teardown

```ts
player.destroy();
```

`destroy()` saves resume state, aborts listeners, destroys the engine, revokes the object URL, removes the surface and marks the instance destroyed. Later method calls throw `destroyed`.

**Next:** [Project structure](./project-structure.md) · [Configuration](../configuration.md)

---

← Previous: [First example](./first-example.md) · Next: [Project structure](./project-structure.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
