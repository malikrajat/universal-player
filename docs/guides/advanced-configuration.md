# Configuration

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Configuration

## Precedence

1. Constructor options / attributes passed at mount.
2. Per-instance string overrides (`strings`).
3. Registered locale strings.
4. Built-in defaults.

Attributes and properties are applied by the element; the core stores `options` and some setters merge into it.

## UI options

```ts
const ui = {
  controls: ["play", "seek", "time", "volume", "captions", "settings", "pip", "fullscreen"],
  hide: ["cast"],
  order: ["play", "volume", "time", "settings", "fullscreen"],
  settings: { speed: true, quality: true, captions: true, sleepTimer: true, stats: false },
  speed: { rates: [0.5, 1, 1.5, 2], defaultRate: 1, keyboard: true },
  share: {
    enabled: true,
    title: "Watch this",
    embed: { mode: "player", width: 640, height: 360, poster: "/poster.jpg" },
  },
  time: { mode: "remaining", toggle: true, showTotal: true },
  download: { enabled: true, filename: "clip.mp4", kinds: ["video"] },
  gestures: { enabled: true, threshold: 48 },
  theme: { colors: { accent: "#7c3aed" }, radius: "0.5rem" },
  showTitle: true,
  showChapterLabel: true,
  showTime: true,
  showBuffered: true,
  showPreview: true,
  showBigPlay: true,
  autoHideControls: true,
  idleDelay: 3000,
} satisfies UIOptions;
```

On the element, pass the same object as JSON:

```html
<universal-player ui='{"settings":{"stats":false},"theme":{"colors":{"accent":"#7c3aed"}}}'>
</universal-player>
```

Invalid JSON is ignored.

## Download is opt-in

`ui.download` is hidden unless it is `true` or an object with `enabled !== false`. The action creates an `<a download>` link; it cannot bypass CORS or server `Content-Disposition`.

## Share and embed

Share is enabled by default. The embed snippet is generated only when the current source has a URL; it defaults to `iframe` when no poster exists and `player` when a poster is available. `mode: "player"` emits a `<universal-player>` snippet, which only works on a page that registered the element.

## Captions

```ts
captions: {
  enabled: true,
  defaultTrack: "en",
  persist: true,
  storageKey: "my-app:captions",
  tracks: [{ id: "en", src: "/en.vtt", label: "English", language: "en", default: true }],
  style: { fontSize: "1.25rem", color: "#fff", background: "#000", opacity: 0.8, edge: "outline" },
}
```

## Survey defaults

Normalised defaults: `kind: "survey"`, `trigger: "ended"`, `once: true`, `allowSkip: true` unless `required`, `submitMode: "manual"`, `instantFeedback` true only for quizzes, `allowRetake` false.

## Playlist defaults

`startIndex: 0`, `autoAdvance: false`, `loop: false`, `autoAdvanceDelay: 0`, `requireCompletion: false`, `allowNext: true`, `allowPrevious: true`.

## Validation

The core validates the container, empty strings/lists, URLs, playlist indices and survey answers. It does **not** validate that a file is really the claimed codec.

**Next:** [Best practices](./best-practices.md)

---

← Previous: [UI](./ui.md) · Next: [Best practices](./best-practices.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
