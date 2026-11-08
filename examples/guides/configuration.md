# Configuration

> [Examples home](../README.md) › [Production guides](./README.md) › Configuration

## Every option and what omission does

| Option | Default | Omitted behaviour |
| --- | --- | --- |
| `container` | required | throws `invalid-argument` |
| `source` | — | idle until `load()` |
| `label` | `"Media"` / `"Media player"` | generic label |
| `controls` | `"custom"` | no chrome unless element |
| `theme` | system (UI) | follows OS |
| `ui` | — | all default UI |
| `locale` | `"en"` | English |
| `strings` | `{}` | locale strings |
| `autoplay`/`muted`/`loop` | `false` | off |
| `preload` | `"metadata"` | metadata only |
| `poster` | — | black surface |
| `crossOrigin` | not set | browser default |
| `playsInline` | `true` | inline video |
| `volume` | `1` | full |
| `playbackRate` | `1` | normal |
| `startTime` | — | 0 |
| `live` | `false` | treated as VOD |
| `qualities` | `[]` | engine ladder only |
| `captions` | — | enabled; persist |
| `resume` | disabled | no storage |
| `analytics` | enabled/no-op | nothing sent |
| `keyboard` etc. | `true` | UI only |
| `seekStep`/`volumeStep` | `5`/`0.1` | UI only |
| `playlist.startIndex` | `0` | first item |
| `playlist.autoAdvance` | `false` | stops at end |
| `image.minZoom`/`maxZoom` | `0.25`/`8` | UI limits |
| `ui.idleDelay` | `3000` (min 500) | 3 s |
| `ui.gestures.enabled` | `false` | no gestures |

Full table: [docs/defaults.md](../../docs/defaults.md).

## Example

```ts
createPlayer({
  container: host,
  source,
  controls: "native",
  preload: "none",
  resume: { enabled: true, minDuration: 60 },
  captions: { defaultTrack: "en", persist: true },
  analytics: { onEvent: (event) => queue.push(event) },
});
```

## Related

[Options cheatsheet](../../docs/options-cheatsheet.md) · [Advanced configuration](../../docs/advanced-configuration.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
