# Viewer configuration (PlayerOptions)

> [Docs home](../../README.md) › [API compatibility tree](./rm-ng-pdf-viewer-config.md) › Viewer configuration (PlayerOptions)

> **Filename note:** inherited from the PDF-viewer layout. This page documents `PlayerOptions`.

## Required

`container: HTMLElement`.

## Presentation and policy

`source`, `label`, `controls`, `theme`, `ui`, `locale`, `strings`, `autoplay`, `muted`, `loop`, `preload`, `poster`, `crossOrigin`, `playsInline`, `volume`, `playbackRate`, `startTime`, `live`, `qualities`, `textTracks`, `audioTracks`, `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image`, `keyboard`, `clickToPlay`, `doubleClickFullscreen`, `autoHideControls`, `seekStep`, `volumeStep`, `resume`, `analytics`, `onStateChange`, `onEvent`.

Every field is optional except `container`. Defaults and enforcement layer (core vs UI) are listed in [Defaults](../../defaults.md) and [Core API](../../reference/api-core.md).

## Example

```ts
const options: PlayerOptions = {
  container: host,
  source: "/clip.mp4",
  controls: "custom",
  theme: "dark",
  captions: { defaultTrack: "en", persist: true },
  playlist: { items: [], autoAdvance: false },
  resume: { enabled: true, minDuration: 30 },
};
```

## Common mistake

`ui`, `keyboard`, `seekStep`, `volumeStep`, `clickToPlay`, `doubleClickFullscreen` and `autoHideControls` are accepted by the core type but consumed only by the custom element. See [the UI boundary](../../_api-facts.md#4-the-ui-boundary-most-common-documentation-error).

**Canonical guide:** [Core API](../../reference/api-core.md) · [Options cheatsheet](../../options-cheatsheet.md)

---

← Previous: [Events](../events/viewer-events.md) · Next: [Theme config](./rm-ng-pdf-theme-config.md) →

---

**Docs home** · [Documentation index](../../README.md) · [Summary](../../SUMMARY.md)
