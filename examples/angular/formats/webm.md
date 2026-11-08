# WebM in Angular

> [Examples home](../../README.md) › [Angular](../README.md) › [Formats](./README.md) › WebM

WebM resolves to the native video engine and is a good fit for open-codec delivery when every target browser supports VP9 or AV1.

## At a glance

| Field | Value |
| --- | --- |
| Entry | /angular (controller) or /ui (custom element) |
| Adapter id | `native` |
| Factory | `createNativeEngine` (internal) (internal, not exported) |
| Extensions / input | .webm |
| MIME | video/webm |
| Unit | `<video>` |
| Status | Implemented; codec support is the browser's |
| Rendering | video |
| Capabilities | play, pause, seek, volume, rate, fullscreen, PiP, text tracks, audio tracks, live |

## Basic usage

### Import and create

```ts
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";
```

There is no adapter to select. `native` is chosen from the extension, MIME type or host.

### Source variants

| Variant | Code |
| --- | --- |
| Static asset | `"/media/sample.webm"` |
| CDN URL | Replace the origin; keep the extension |
| Uploaded File/Blob | `player.load(file)` |
| ArrayBuffer | `new File([buffer], "sample.webm", { type: "video/webm" })` |
| Structured | Optional; overrides detection |

### Full viewer (built-in UI)

```ts
// app.component.ts
import { Component } from "@angular/core";
import { FullPlayerComponent } from "./full-player.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FullPlayerComponent],
  template: `<app-full-player [source]=""/media/sample.webm""></app-full-player>`,
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
      inputs: { source: "/media/sample.webm", controls: "native" },
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
await player.load("/media/sample.webm");
await player.play();
player.seek(12);
player.setVolume(0.7);
player.setPlaybackRate(1.25);
```

## Customization

- Full UI: `theme`, `accent-color`, `ui` JSON, CSS variables.
- Headless: no chrome; render from `state` and style the media element yourself.
- Angular: add `CUSTOM_ELEMENTS_SCHEMA`; use `[attr.src]` for attributes.

## Edge cases

- VP8/VP9/Opus support varies; Safari support is version-dependent. No transcoding.
- Do not assume WebM plays in every Safari build. Feature-detect with `document.createElement("video").canPlayType("video/webm")`.
- MIME/extension mismatch: pass a structured source with explicit `kind` and `type`.
- Wrong adapter: there is no adapter choice; a misdetected source is corrected with a structured source.




## Failure cases

| Code | Why | Recovery |
| --- | --- | --- |
| `media-error` | Decode/load/SDK failure | Fix and `retry()` |

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
