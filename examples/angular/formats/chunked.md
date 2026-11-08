# Chunked / streamed media in Angular

> [Examples home](../../README.md) › [Angular](../README.md) › [Formats](./README.md) › Chunked / streamed media

A `ChunkedSource` carries an ordered `Iterable`, `AsyncIterable`, or `ReadableStream` of `Blob | ArrayBuffer | ArrayBufferView | string` chunks. The engine chooses MSE or Blob.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /angular (controller) or /ui (custom element) |
| Adapter id | `chunked` |
| Factory | `createChunkedMediaEngine` (internal) (internal, not exported) |
| Extensions / input | No extension; `ChunkedSource` |
| MIME | Caller supplies `type` |
| Unit | `MediaSource` + `<video>`/`<audio>`, or Blob + `<img>` |
| Status | Implemented |
| Rendering | video, audio or image |
| Capabilities | Native caps for video/audio; image caps for images |

## Basic usage

### Import and create

```ts
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";
```

There is no adapter to select. `chunked` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `{ kind: "video", type: "video/mp4", chunks: () => iterable }` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.chunked", { type: "Caller supplies `type`" })` |
| Structured | Required for this input |

### Full viewer (built-in UI)

```ts
// app.component.ts
import { Component } from "@angular/core";
import { FullPlayerComponent } from "./full-player.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FullPlayerComponent],
  template: `<app-full-player [source]="{ kind: "video", type: "video/mp4", chunks: () => iterable }"></app-full-player>`,
})
export class AppComponent {}
```

### Headless (native controls)

```ts
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";

@Component({
  selector: "app-headless-player",
  standalone: true,
  template: `<div #host></div>`,
})
export class HeadlessPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild("host", { static: true }) host!: ElementRef<HTMLElement>;
  #controller: AngularUniversalPlayer | null = null;

  ngAfterViewInit(): void {
    this.#controller = new AngularUniversalPlayer({
      elementRef: this.host,
      inputs: { source: { kind: "video", type: "video/mp4", chunks: () => iterable }, controls: "native" },
    });
    this.#controller.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.#controller?.ngOnDestroy();
  }
}
```

## Advanced usage

### Options

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `source` | `PlayerSourceInput` | required in practice | The URL/File/structured source |
| `controls` | `"custom" | "native"` | `"custom"` | Headless surfaces render no chrome |
| `preload` | `"none" | "metadata" | "auto"` | `"metadata"` | Native/HLS/DASH/chunked |
| `crossOrigin` | `"anonymous" | "use-credentials" | null` | not set | CORS mode |
| `poster` | `string` | — | Video/audio artwork |
| `mode` | `"auto" | "stream" | "blob"` | `"auto"` | MSE preference |

### Document surface

| Call | Behaviour |
| --- | --- |
| `play()`, `pause()`, `seek(t)` | Media element control |
| `setVolume(0–1)`, `setMuted` | Media element control |
| `setPlaybackRate(0.25–4)` | Media element control |
| `setQuality(id \| null)` | hls.js level / dash.js representation; `null` = auto |
| `setTextTrack(id \| null)`, `setAudioTrack(id \| null)` | Native track selection |
| `state.qualities`, `state.textTracks`, `state.audioTracks` | Discovered after metadata |
| `retry()` | Reloads the current source |

### Copy-paste calls

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => makeFreshIterable(),
  mode: "auto",
});
await player.play();
// retry() reuses the source object; use a chunks factory for replay
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Angular: add `CUSTOM_ELEMENTS_SCHEMA`; use `[attr.src]` for attributes.

## Edge cases

- `mode: "auto"` tries MediaSource when `MediaSource.isTypeSupported(type)` and falls back to buffering a Blob. The chunk iterable is consumed once; pass a function returning a fresh iterable to reload.
- Chunk order is the caller's responsibility. The engine appends sequentially and calls `endOfStream()` when the iterator finishes.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.


- The iterable is consumed once; use a factory for reload/retry.

## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `invalid-argument` | Bad source/id | Fix the input/fallback |
| `media-error` | Decode/load/SDK failure | Fix and `retry()` |
| `unsupported-environment` | Missing browser API or HLS support | Fix the input/fallback |

```ts
player.on("error", ({ error }) => console.error((error as { code?: string }).code));
```

## Limitations to communicate

- No transcoding; the browser must decode it.
- No DRM.
- No metadata extraction.
- Verification is unit routing plus browser reality, not a codec lab.

## Checklist

- [ ] Source is correct for this input.
- [ ] Peer installed if conditional.
- [ ] UI track chosen (full vs native vs custom).
- [ ] Error listener attached.
- [ ] Teardown implemented.
- [ ] Tested in your target browser.

## Related

[Angular basic](../basic-usage.md) · [Angular advanced](../advanced-usage.md) · [Adapter setup](../../shared/adapter-setup.md) · [Format matrix](../../format-matrix.md) · [API matrix](../../api-matrix.md) · [Errors](../../errors.md)

All formats: [MP4 / M4V](./mp4.md) · [WebM](./webm.md) · [QuickTime MOV](./mov.md) · [Matroska MKV](./mkv.md) · [HLS (.m3u8)](./hls.md) · [MPEG-DASH (.mpd)](./dash.md) · [MP3](./mp3.md) · [M4A / AAC audio](./m4a.md) · [WAV](./wav.md) · [FLAC](./flac.md) · [Ogg / Oga](./ogg.md) · [AAC (raw)](./aac.md) · [JPEG](./jpg.md) · [GIF](./gif.md) · [PNG](./png.md) · [WebP](./webp.md) · [SVG](./svg.md) · [AVIF](./avif.md) · [YouTube](./youtube.md) · [Vimeo](./vimeo.md) · [Generic iframe embed](./embed.md) · [Chunked / streamed media](./chunked.md) · [Blob and File](./blob.md)
