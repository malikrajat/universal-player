# Captions

> [Docs home](./README.md) › Captions

[← Docs](./README.md) · [API reference](./api-reference.md#captionsoptions)

External WebVTT captions with a language menu, styling and per-source
persistence.

---

## 1. Add tracks

Player-level:

```ts
const player = createPlayer({
  container,
  source: "/lecture.mp4",
  captions: {
    enabled: true,
    defaultTrack: "en",
    tracks: [
      { src: "/captions/en.vtt", label: "English", language: "en", default: true },
      { src: "/captions/hi.vtt", label: "हिन्दी", language: "hi" },
    ],
  },
});
```

Source-level:

```ts
source: {
  kind: "video",
  src: "/lecture.mp4",
  captions: [{ src: "/en.vtt", label: "English", language: "en", default: true }],
}
```

Source-level metadata overrides player-level metadata.

---

## 2. Control

```ts
player.setTextTrack("hi"); // select
player.setTextTrack(null); // off
player.toggleCaptions(); // cycle off → track 1 → …
player.setCaptionsEnabled(true);
player.setCaptionStyle({ fontSize: "140%" });
player.setCaptions({ enabled: true, defaultTrack: "hi", tracks });
```

The CC button in the control bar toggles on/off. Language, off and size live in
**Settings → Subtitles/CC**.

---

## 3. Styling

```ts
captions: {
  style: {
    fontSize: "120%",
    color: "#ffffff",
    background: "rgba(0,0,0,.72)",
    opacity: 1,
    edge: "outline",
    fontFamily: "Inter, system-ui, sans-serif",
  },
}
```

Or CSS tokens:

```css
universal-player {
  --up-caption-size: 120%;
  --up-caption-color: #fff;
  --up-caption-background: rgba(0, 0, 0, 0.72);
  --up-caption-edge: "outline";
}
```

`edge`: `none`, `outline`, `drop-shadow`, `raised`, `depressed`.

---

## 4. Persistence

- `persist: true` (default) remembers the selected track per source.
- `persist: false` resets to `defaultTrack` on each load.
- `storageKey` scopes the storage namespace.

Storage failures are ignored (private mode, quota).

---

## 5. Track shape

```ts
interface CaptionTrack {
  id?: string;
  src: string;
  label: string;
  language: string;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  default?: boolean;
}
```

`kind` defaults to subtitles for external tracks.

---

## 6. CORS and MIME

- Serve WebVTT as `text/vtt`.
- Cross-origin captions need CORS headers (`Access-Control-Allow-Origin`).
- For cross-origin media, set `crossorigin="anonymous"` / `crossOrigin`.
- A 404 or blocked VTT results in no cues, not a player error.

---

## 7. Events and state

```ts
player.on("texttrackchange", ({ track }) => {
  console.log(track?.language ?? "off");
});

player.state.textTrack; // active track or null
player.state.textTracks; // available tracks
```

---

## 8. Common issues

| Symptom                | Fix                                                |
| ---------------------- | -------------------------------------------------- |
| Menu shows no tracks   | Check `tracks`/`source.captions`, and CORS.        |
| Captions do not appear | `setTextTrack(id)` or `default: true`.             |
| Styling has no effect  | Native fullscreen may override cue styling on iOS. |
| Wrong language id      | Use BCP 47 tags (`en`, `hi`, `pt-BR`).             |

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)