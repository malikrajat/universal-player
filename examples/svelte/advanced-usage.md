# Advanced usage

> [Examples home](../README.md) › [Svelte](./README.md) › Advanced usage

## Lifecycle and events

```text
loadstart → loadedmetadata → durationchange* → canplay → play → playing → timeupdate* → ended
```

`statechange` accompanies state writes. `timeupdate` updates state without a second `statechange`.

```ts
const off = player.on("loadedmetadata", () => console.log(player.state.qualities));
const sub = player.observe("error").subscribe(({ error }) => console.error(error));
// teardown
off(); sub.unsubscribe();
```

## Multiple sources and cancellation

```ts
await player.load("/a.mp4");
await player.load("/b.mp4"); // the first load is superseded
```

## Per-format surface

### MP4 / M4V

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.mp4");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/mp4.md)

### WebM

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.webm");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/webm.md)

### QuickTime MOV

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.mov");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/mov.md)

### Matroska MKV

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.mkv");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/mkv.md)

### HLS (.m3u8)

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate` and `setQuality`.

```ts
await player.load("/media/master.m3u8");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/hls.md)

### MPEG-DASH (.mpd)

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate` and `setQuality`.

```ts
await player.load("/media/manifest.mpd");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/dash.md)

### MP3

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.mp3");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/mp3.md)

### M4A / AAC audio

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.m4a");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/m4a.md)

### WAV

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.wav");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/wav.md)

### FLAC

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.flac");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/flac.md)

### Ogg / Oga

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load({ kind: "audio", src: "/media/sample.oga" });
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/ogg.md)

### AAC (raw)

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load("/media/sample.aac");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/aac.md)

### JPEG

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.jpg");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/jpg.md)

### GIF

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.gif");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/gif.md)

### PNG

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.png");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/png.md)

### WebP

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.webp");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/webp.md)

### SVG

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.svg");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/svg.md)

### AVIF

Images have no playback surface. Inspect `player.mediaElement`, use the `image` options for the UI, and apply your own CSS transform headlessly.

```ts
await player.load("/media/sample.avif");
const img = player.mediaElement;
if (img instanceof HTMLImageElement) {
  console.log(img.naturalWidth, img.naturalHeight);
}
```

[Details](./formats/avif.md)

### YouTube

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load({ kind: "embed", provider: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID" });
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/youtube.md)

### Vimeo

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load({ kind: "embed", provider: "vimeo", src: "https://vimeo.com/123456789" });
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/vimeo.md)

### Generic iframe embed

Generic embeds are display-only. Do not build controls that imply you can drive the page.

```ts
await player.load({ kind: "embed", provider: "generic", src: "https://example.com/embed/player" });
// Display only: these calls do not reach the embedded page.
player.play();
player.pause();
```

[Details](./formats/embed.md)

### Chunked / streamed media

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => makeFreshIterable(),
  mode: "auto",
});
await player.play();
// retry() reuses the source object; use a chunks factory for replay
```

[Details](./formats/chunked.md)

### Blob and File

Use the standard surface: `play/pause/seek/setVolume/setPlaybackRate`.

```ts
await player.load(file);
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

[Details](./formats/blob.md)


## Playlist, chapters and surveys

```ts
player.setPlaylist({ items, autoAdvance: true });
player.setChapters([{ id: "intro", title: "Intro", startTime: 0 }]);
player.setSurvey({ kind: "feedback", trigger: "ended", questions: [{ id: "s", type: "rating", label: "Score", max: 5 }] });
```

## Read-only and editable

No read-only mode and no editable media. Hide UI chrome or omit your own controls. Surveys are the only editable surface.

## Performance notes

See [performance guide](../guides/performance.md). Do not create a player per render.

## Next

[Customization](./customization.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
