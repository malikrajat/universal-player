# Live

> [Docs home](./README.md) � Live

[← Docs](./README.md) · [Browser support](./browser-support.md)

Live streams work through HLS/DASH, but the DVR UI is not complete in `0.0.1`.
This guide covers what exists and what to build yourself.

---

## 1. Load a live stream

```ts
const player = createPlayer({
  container,
  source: "/live/index.m3u8",
  live: true,
  ui: { controls: ["play", "volume", "settings", "fullscreen"] },
});
```

- Install `hls.js` for non-Safari browsers.
- CORS is required on the playlist and every segment.
- `live: true` marks the source before metadata; the core also infers live from
  an unbounded duration.

---

## 2. State

```ts
player.state.live; // boolean
player.state.duration; // may be Infinity / non-finite
player.state.currentTime;
player.state.buffered;
```

The UI shows a LIVE label and can jump to the live edge.

---

## 3. Helpers

```ts
import {
  isLiveDuration,
  seekableRange,
  liveEdge,
  isAtLiveEdge,
} from "@codewithrajat/universal-player";

const media = player.mediaElement as HTMLVideoElement;

if (isLiveDuration(player.state.duration)) {
  const range = seekableRange(media); // { start, end } | null
  const edge = liveEdge(media); // number | null
  const atEdge = isAtLiveEdge(media, 10);
}
```

`seekableRange` uses the browser's `seekable` ranges. It returns `null` when
nothing is seekable.

---

## 4. Jump to live

```ts
const edge = liveEdge(media);
if (edge !== null) player.seek(edge);
```

Or use the UI's live button when present.

---

## 5. DVR limitations

What is missing:

- A dedicated DVR window scrubber.
- A visual “behind live” indicator beyond the live state.
- Segment-level catch-up UI.

Workarounds:

- Use `seekableRange()` to render your own scrubber.
- Clamp seeks to the seekable window.
- Show a “Go live” button when `!isAtLiveEdge()`.

---

## 6. DASH

```bash
pnpm add dashjs
```

```ts
source: "/live/manifest.mpd";
```

CORS on the manifest and segments is required.

---

## 7. Testing

- Use a real low-latency stream in browser mode.
- Assert `state.live`.
- Assert `seekableRange` returns a finite window.
- Simulate going offline and verify the error path.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)