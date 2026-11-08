# Core concepts

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Core concepts

## The pipeline

1. **Input** — URL, structured source, `Blob`/`File`, `MediaStream`, `ChunkedSource` or array.
2. **Normalisation** — `normalizeSource()` produces `NormalizedSource`: `url`, `kind`, `provider`, `mimeType`, `extension`, `objectUrl`, `title`, `stream`, `chunks`.
3. **Engine selection** — `createEngine()` maps the provider to an engine. Internal only.
4. **Lifecycle** — `load()` destroys the previous engine, emits `loadstart`, builds the engine, awaits metadata, then emits `loadedmetadata`.
5. **State** — the player merges every event into a new `PlayerState`.
6. **Subscribers** — typed listeners, observables, DOM events and `onEvent` callbacks.

## Media kinds and providers

| Kind | Providers |
| --- | --- |
| `video` | native, chunked, hls, dash |
| `audio` | native, chunked |
| `image` | image (also chunked images) |
| `embed` | youtube, vimeo, generic-embed |

## Capabilities

Each engine advertises `PlayerCapabilities`. Before a load, `capabilitiesForKind(null)` returns the native set. The UI hides controls based on capabilities, not assumptions.

```ts
if (state.capabilities.pictureInPicture && state.kind === "video") {
  await player.requestPictureInPicture();
}
```

## Controls are a UI concern

The core accepts `controls`, `keyboard`, `clickToPlay`, `doubleClickFullscreen`, `autoHideControls`, `seekStep`, `volumeStep` and `ui`, but **only the custom element consumes them**. In a headless surface, `controls: "custom"` simply sets `media.controls = false`.

## Source ownership

| Input | Owner of the URL | Released by |
| --- | --- | --- |
| URL string / structured URL | You | Nothing to release |
| `Blob` / `File` | Player creates an object URL | `load()` replacement or `destroy()` |
| `ChunkedSource` | Player (MSE or Blob URL) | Engine `destroy()` |
| `MediaStream` | You | You stop the tracks |
| Array | Player creates one playlist | `destroy()` |

## Errors versus state

Every failure is both an `error` event and `state.error`; `state.status` becomes `"error"`. Load failures are also rethrown from `load()`. See [Errors vs logs](../errors-vs-logs.md).

**Next:** [Lifecycle](../concepts/lifecycle.md) · [State management](../concepts/state-management.md)

---

← Previous: [Guides index](./basic-usage.md) · Next: [Basic usage](./basic-usage.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
