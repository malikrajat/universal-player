# Captions and subtitles in React

> [Examples home](../../../README.md) › [React](../../README.md) › [Formats](../README.md) › [Features](./README.md) › Captions and subtitles

Captions are native text tracks. The player can list, select, persist and style them; the browser renders the cues.

## Entry point

`captions` option; `setTextTrack`, `setCaptions`, `setCaptionsEnabled`, `toggleCaptions`, `setCaptionStyle`

## Basic example

```ts
player.setCaptions({
  defaultTrack: "en",
  persist: true,
  tracks: [{ id: "en", src: "/media/en.vtt", label: "English", language: "en" }],
});
```

## React integration

Captions are native text tracks, so they work in headless React surfaces. The built-in UI adds the CC button and style controls.

Full UI wrapper: see [React README](../../README.md). Headless: use the framework adapter or core.

## Edge cases

- No transcript panel, no OCR, no caption authoring. Track lists come from the media element or `captions.tracks`.
- Defaults: `persist: true`, `enabled` treated as true unless `false`, no default track
- The feature may work with embeds only as declared.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| media-error | `media-error` | Check peer/browser support |
| unsupported-environment | `unsupported-environment` | Check peer/browser support |

## Checklist

- [ ] Required data supplied.
- [ ] UI track chosen for the overlay/controls.
- [ ] Error path handled.
- [ ] Teardown/reload behaviour checked.

## Related

[React formats](../README.md) · [Shared features](../../../shared/features.md) · [API matrix](../../../api-matrix.md) · [Errors](../../../errors.md)

---

**Docs home** · [Documentation index](../../../../docs/README.md) · [Summary](../../../../docs/SUMMARY.md)
