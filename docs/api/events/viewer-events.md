# Events

> [Docs home](../../README.md) › [API compatibility tree](./viewer-events.md) › Events

> **Filename note:** inherited from the PDF-viewer layout. These are media-player events.

Every event is available in three styles: typed subscription, observable, and DOM `CustomEvent` on the element. The core also accepts `onEvent` in options.

## Event table

| Event | Payload |
| --- | --- |
| `statechange` | `PlayerState` |
| `loadstart` | `{ source, kind }` |
| `loadedmetadata` | `{ duration, width, height, live }` |
| `durationchange` | `{ duration, live }` |
| `timeupdate` | `{ currentTime, duration, buffered }` |
| `progress` | `{ buffered }` |
| `seeking` / `seeked` | `{ currentTime }` |
| `volumechange` | `{ volume, muted }` |
| `ratechange` | `{ playbackRate }` |
| `qualitychange` | `{ quality: string \| null }` |
| `texttrackchange` | `{ track: TextTrackInfo \| null }` |
| `audiotrackchange` | `{ track: AudioTrackInfo \| null }` |
| `chapterchange` | `{ chapter: Chapter \| null }` |
| `playlistchange` | `{ index, item, status }` |
| `surveyopen` | `{ survey }` |
| `surveysubmit` | `{ survey, answers, result }` |
| `surveyskip` | `{ survey, result }` |
| `surveyclose` | `{ survey, reason }` |
| `fullscreenchange` | `{ fullscreen }` |
| `pictureinpicturechange` | `{ pictureInPicture }` |
| `error` | `{ error }` |
| `destroy` | `void` |

`play`, `playing`, `pause`, `waiting`, `canplay`, `ended` have `void` payloads.

## Ordering and guarantees

- `loadstart` precedes all load-related events.
- `loadedmetadata` precedes `canplay`.
- `statechange` follows the state mutation caused by an event.
- Listener exceptions are swallowed.
- The element forwards all except `destroy`.

**Canonical guide:** [API core](../../reference/api-core.md) · [Errors vs logs](../../errors-vs-logs.md)

---

← Previous: [Component](../components/rm-ng-pdf-viewer.md) · Next: [Viewer config](../interfaces/rm-ng-pdf-viewer-config.md) →

---

**Docs home** · [Documentation index](../../README.md) · [Summary](../../SUMMARY.md)
