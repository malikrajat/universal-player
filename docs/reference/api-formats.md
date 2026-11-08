# Format and engine API

> [Docs home](../README.md) › [Reference](./README.md) › Format and engine API

The engine contract is **internal**. `PlayerEngine` is exported from the source module but not from any public entry, and there is no registry. Documenting it here explains behaviour and extension work; it is not a consumer API.

## The internal contract

```ts
interface PlayerEngine {
  readonly kind: MediaKind;
  readonly element: HTMLElement | null;
  readonly capabilities: PlayerCapabilities;
  load(): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  setMuted(muted: boolean): void;
  setPlaybackRate(rate: number): void;
  setQuality?(quality: string | null): void;
  setTextTrack?(id: string | null): void;
  setAudioTrack?(id: string | null): void;
  getQualities?(): readonly QualityLevel[];
  getTextTracks?(): readonly TextTrackInfo[];
  getAudioTracks?(): readonly AudioTrackInfo[];
  getCurrentTime(): number;
  getDuration(): number;
  getBuffered(): number;
  requestTimeSync?(): void;
  destroy(): void;
}
```

## Engine resolution

| Provider | Factory (internal) | Unit | Quality ladder | SDK |
| --- | --- | --- | --- | --- |
| `native` | `createNativeEngine` | `<video>`/`<audio>` | none | — |
| `chunked` | `createChunkedMediaEngine` | MSE + media element / Blob | none | — |
| `hls` | `createHlsEngine` | media element | hls.js levels | `hls.js` (lazy) |
| `dash` | `createDashEngine` | media element | dash.js representations | `dashjs` (lazy) |
| `image` | `createImageEngine` | `<img>` | none | — |
| `youtube` | `createYouTubeEngine` | `<iframe>` | configured | YouTube IFrame API |
| `vimeo` | `createVimeoEngine` | `<iframe>` | configured | Vimeo player API |
| `generic-embed` | `createEmbedEngine` | `<iframe>` | none | — |

## Native

Creates a media element with `preload`, `autoplay`, `loop`, `muted`, `controls` (native only), `crossOrigin`, `playsInline`, `poster`, `aria-label`. Binds every media event, waits for metadata, then applies captions.

Failure: a media element error becomes `media-error` with `details.code` from `MediaError`.

## HLS

Lazily imports `hls.js`. Configuration is fixed: `enableWorker: true`, `lowLatencyMode: options.live`, `backBufferLength: 90`. Level ladder becomes `QualityLevel[]` with ids as string indexes and labels like `720p`.

- Fatal hls.js error → `network-error` with `details.details` and `details.source`.
- `Hls.isSupported() === false` and no native HLS → `unsupported-environment`.
- Native HLS fallback sets `video.src` directly.

## DASH

Lazily imports `dashjs`. Supports `getBitrateInfoListFor` (4.x) and `getRepresentationsByType[Unfiltered]` (5.x). Auto quality toggles `streaming.abr.autoSwitchBitrate.video`. If `MediaPlayer` is absent, it attempts native playback.

## Image

Creates `<img decoding="async" loading="eager">` with `alt` from the source. Emits `loadedmetadata` with natural width/height and `duration: 0`. All playback methods are no-ops. Chunked images are assembled into a Blob/object URL.

## Chunked

- `mode: "auto"` uses MediaSource when `MediaSource.isTypeSupported(type)`; otherwise Blob.
- `mode: "stream"` throws if MSE appending fails.
- `mode: "blob"` always buffers.
- Empty iterator → `media-error`.
- Object URL unavailable → `unsupported-environment`.
- `chunkDelay` delays collection for images (and is read by the image engine).

## Embeds

YouTube and Vimeo use `postMessage`; incoming messages are accepted only when `event.source === iframe.contentWindow`. Outgoing messages use `targetOrigin: "*"`. Generic embeds return early from every `post()`, so commands are no-ops.

Quality for embeds is only advertised when `options.qualities` is non-empty.

## Adding an engine (maintainers)

1. Add a `MediaProvider` value in `src/core/types.ts`.
2. Implement `PlayerEngine` in `src/adapters/<name>/engine.ts`.
3. Map it in `src/core/engines.ts`.
4. Add source detection in `src/core/source.ts` if needed.
5. Add unit tests for routing and lifecycle.
6. Update the format matrix and this page.

There is no consumer-facing extension hook.

**Next:** [Universal formats](./api-universal-formats.md)

---

← Previous: [Core API](./api-core.md) · Next: [Universal formats](./api-universal-formats.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
