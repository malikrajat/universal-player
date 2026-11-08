# Captions and chapter navigation

> [Examples home](../README.md) › [Recipes](./README.md) › Captions and chapter navigation

## What it solves

Provide captions and chapters, then navigate by chapter.

## Copy-paste code

```ts
createPlayer({
  container: host,
  source: "/clip.mp4",
  captions: {
    defaultTrack: "en",
    tracks: [{ id: "en", src: "/en.vtt", label: "English", language: "en" }],
  },
  chapters: [
    { id: "intro", title: "Intro", startTime: 0 },
    { id: "demo", title: "Demo", startTime: 20 },
  ],
});

player.seekToChapter("demo");
```

## Why it works

Captions use native text tracks; chapters are consumer-supplied data.

## Edge cases

- VTT needs CORS.
- Chapters are not parsed from media.
- `persist` is localStorage-based.

## Failure cases

| Failure | Code |
| --- | --- |
| CORS | `no captions (silent)` |
| unknown chapter | `no-op` |

## Related

[Errors](../errors.md) · [Shared sources](../shared/sources-and-lifecycle.md) · [All recipes](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
