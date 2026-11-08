# Chapters in Vanilla

> [Examples home](../../../README.md) › [Vanilla](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Chapters

Chapters are a consumer-supplied list. The UI adds a rail, a menu, and an active chapter label; the core emits `chapterchange` when the active id changes.

## Entry point

`chapters` option, `setChapters`, `seekToChapter`, `currentChapter`, `chapterchange`

## Basic example

```ts
player.setChapters([
  { id: "intro", title: "Intro", startTime: 0 },
  { id: "demo", title: "Demo", startTime: 24 },
]);
player.seekToChapter("demo");
```

## Vanilla integration

This feature is framework-neutral; the Vanilla wrapper only owns lifecycle.

Full UI wrapper: see [Vanilla README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- Chapters are data, not embedded metadata parsing. The player does not read chapter atoms from MP4 or HLS manifests.
- Defaults: `[]`
- The feature may work with embeds only as declared.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| invalid-argument | `invalid-argument` | Fix the config/data |

## Checklist

- [ ] Required data supplied.
- [ ] UI track chosen for the overlay/controls.
- [ ] Error path handled.
- [ ] Teardown/reload behaviour checked.

## Related

[Vanilla formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)
