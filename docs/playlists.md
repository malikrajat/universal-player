# Playlists and chapters

> [Docs home](./README.md) › Playlists and chapters

[â† Docs](./README.md) Â· [API reference](./api-reference.md#playlist-chapter-and-thumbnail-types)

---

## 1. Basics

```ts
const player = createPlayer({
  container,
  source: "/one.mp4",
  playlist: {
    items: [
      { id: "one", source: "/one.mp4", title: "One", poster: "/one.jpg" },
      { id: "two", source: "/two.mp4", title: "Two", poster: "/two.jpg" },
    ],
    startIndex: 0,
    autoAdvance: true,
    autoAdvanceDelay: 3,
  },
});
```

An array source is a shortcut:

```ts
await player.load(["/one.mp4", "/two.mp4"]); // autoAdvance: false
```

---

## 2. Navigation

```ts
await player.next();
await player.previous();
await player.playPlaylistItem(2);
player.cancelAutoAdvance();
```

`next()` returns the new item or `null` at the end. `previous()` returns `null`
at the start. Both wrap when `loop: true`.

---

## 3. Gating

```ts
playlist: {
  items,
  requireCompletion: true, // or gateAdvance: true
  allowNext: true,
  allowPrevious: false,
}
```

- `requireCompletion` blocks Next until the current item ends.
- Enforcement is in the core, so keyboard shortcuts and `next()` cannot bypass
  it.
- `allowNext: false` removes advancing entirely.
- `allowPrevious: false` makes `previous()` return `null`.

Check status:

```ts
player.playlistStatus; // { index, length, hasNext, canNext, nextLocked, ... }
```

---

## 4. Auto-advance

```ts
playlist: { items, autoAdvance: true, autoAdvanceDelay: 5 }
```

`autoAdvanceDelay` is in seconds. `setAutoAdvance(false)` cancels automatic
advancement without clearing the list. `cancelAutoAdvance()` cancels a scheduled
advance.

---

## 5. Chapters

```ts
chapters: [
  { id: "intro", title: "Introduction", startTime: 0 },
  { id: "demo", title: "Demo", startTime: 90, thumbnail: "/demo.jpg" },
];
```

```ts
player.seekToChapter("demo");
player.currentChapter;
player.on("chapterchange", ({ chapter }) => console.log(chapter?.title));
```

The UI shows timeline markers, a chapter menu and an active chapter label.

### End times

`endTime` is optional. If omitted, a chapter ends where the next begins. The
last chapter ends at the media duration.

---

## 6. Thumbnails

```ts
thumbnails: {
  cues: [
    { startTime: 0, endTime: 10, url: "/thumbs/0.jpg" },
    { startTime: 10, endTime: 20, url: "/thumbs/1.jpg" },
  ],
}
```

A sprite sheet:

```ts
thumbnails: { cues: [...], spriteUrl: "/thumbs/sprite.jpg" }
```

Thumbnails appear on seek-bar hover, in the share sheet (if used as a poster),
and in chapter/playlist rows when supplied.

---

## 7. Playlist UI behavior

- Previous/next controls appear when neighbours exist.
- Locked next shows as disabled, not hidden.
- The queue menu lists items and highlights the current one.
- Each item can override `poster`.

---

## 8. Complete example

```ts
const lessons = [
  { id: "l1", source: "/l1.mp4", title: "Lesson 1", poster: "/l1.jpg" },
  { id: "l2", source: "/l2.mp4", title: "Lesson 2", poster: "/l2.jpg" },
];

const player = createPlayer({
  container,
  source: lessons[0].source,
  playlist: {
    items: lessons,
    requireCompletion: true,
    allowPrevious: false,
    autoAdvance: true,
    autoAdvanceDelay: 3,
  },
  chapters: [
    { id: "intro", title: "Intro", startTime: 0 },
    { id: "practice", title: "Practice", startTime: 120 },
  ],
  thumbnails: {
    cues: [{ startTime: 0, endTime: 30, url: "/thumbs/l1-0.jpg" }],
  },
});
```

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)