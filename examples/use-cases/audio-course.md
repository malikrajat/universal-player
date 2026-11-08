# Audio course with resume and playlist

> [Examples home](../README.md) › [Use cases](./README.md) › Audio course with resume and playlist

## Problem

Learners pause mid-lesson and return days later.

## What you will build

An audio playlist with resume, speed control and per-lesson progress.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | MP3/M4A |
| Feature | Playlist + resume |
| Storage | localStorage or your API |

## Flow

```text
playlist → item → audio → resume key per URL
```

## Step by step

1. Build the playlist with one item per lesson.
2. Enable resume with a 60 s minimum.
3. Enable the speed menu.
4. Persist completion to your LMS from `ended`.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: host,
  source: "/audio/lesson-01.mp3",
  controls: "native",
  resume: { enabled: true, minDuration: 60 },
});

player.setPlaylist({
  items: [
    { source: "/audio/lesson-01.mp3", title: "Lesson 1" },
    { source: "/audio/lesson-02.mp3", title: "Lesson 2" },
  ],
  startIndex: 0,
});
```

Resume is not available as a custom-element attribute, so the headless surface is the honest choice here. Add your own chrome or use the element without resume.

## UX notes

Show progress per lesson and a resume toast.

## Security and limits

Lesson URLs may be signed. Do not store tokens in resume keys.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| resume jumps to end | n/a | Clear on ended |
| missing metadata | media-error | Check MIME |
| playlist gate | invalid-state | Wait for ended |

## Checklist

- [ ] Per-lesson resume
- [ ] Completion event
- [ ] Speed menu
- [ ] Captions/transcript

## Framework pages

[Vanilla](../vanilla/formats/mp3.md) · [React](../react/formats/mp3.md) · [Vue](../vue/formats/mp3.md) · [Angular](../angular/formats/mp3.md) · [Svelte](../svelte/formats/mp3.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
