# Advanced usage

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Advanced usage

## Lifecycle and load cancellation

`load()` increments an internal sequence. If a newer load starts, the older engine is discarded and its result ignored.

```ts
void player.load("/a.mp4").catch(() => {});
await player.load("/b.mp4"); // wins
```

## Event ordering

For a successful native load:

```text
loadstart → loadedmetadata → durationchange* → canplay → play → playing → timeupdate* → ended
```

`*` events repeat. `statechange` accompanies state mutations. See [Lifecycle](../concepts/lifecycle.md) for the full table.

## Tracks and quality

```ts
player.on("loadedmetadata", () => {
  console.log(player.state.qualities);
  console.log(player.state.textTracks);
  console.log(player.state.audioTracks);
});

player.setQuality(null);       // auto
player.setQuality("2");        // HLS level / DASH representation id
player.setTextTrack("en");
player.setAudioTrack(null);    // browser default
```

## Captions lifecycle

```ts
player.setCaptions({
  tracks: [{ id: "en", src: "/en.vtt", label: "English", language: "en" }],
  defaultTrack: "en",
  persist: true,
  style: { fontSize: "1.25rem", background: "rgba(0,0,0,.8)", opacity: 0.9 },
});
```

`persist` stores the selected track id in localStorage under `universal-player:captions:<url>` unless `storageKey` is supplied.

## Chapters and thumbnails

```ts
player.setChapters([
  { id: "intro", title: "Intro", startTime: 0, endTime: 12 },
  { id: "demo", title: "Demo", startTime: 12 },
]);

player.seekToChapter("demo");
console.log(player.currentChapter);

player.setThumbnails({
  cues: [{ startTime: 0, endTime: 10, url: "/thumb-0.jpg" }],
});
```

Chapters are not parsed from media files. Supply them.

## Surveys

```ts
player.setSurvey({
  kind: "feedback",
  trigger: "ended",
  once: true,
  questions: [
    { id: "score", type: "rating", label: "How was it?", max: 5, required: true },
    { id: "comment", type: "textarea", label: "Anything else?" },
  ],
  onSubmit: async (result) => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(result),
    });
  },
});

await player.openSurvey(); // manual trigger
```

Survey callbacks are fire-and-forget; a rejected promise is swallowed so playback is never broken.

## Resume and analytics

```ts
const player = createPlayer({
  container: host,
  source,
  resume: { enabled: true, minDuration: 60 },
  analytics: {
    onEvent: (event) => {
      navigator.sendBeacon("/api/analytics", JSON.stringify(event));
    },
  },
});
```

Analytics emits `play`, `pause`, `ended`, `seeked`, `loadedmetadata` and `error`; it is not a full clickstream.

## Error branching

```ts
try {
  await player.load(source);
} catch (error) {
  if (isPlayerError(error)) {
    switch (error.code) {
      case "network-error": /* retry */ break;
      case "unsupported-environment": /* fallback */ break;
      default: /* surface */ break;
    }
  }
}
```

**Next:** [Formats](./formats.md)

---

← Previous: [Basic usage](./basic-usage.md) · Next: [Formats](./formats.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
