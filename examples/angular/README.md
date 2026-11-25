# Angular

> [Examples home](../README.md) › [Angular](./README.md) › Angular

## What this integration gives you

- One core player mounted into a host element.
- State and 29 events.
- Source-change detection and teardown handled by the wrapper (or by you for vanilla).
- All media kinds: video, audio, images, embeds, chunked.

## What it does not give you

- **No built-in control bar.** `<universal-player>` via `/ui` with `CUSTOM_ELEMENTS_SCHEMA` is the path to the full UI.
- No framework-specific theming. The UI uses CSS variables.
- No extra features beyond the core API.

## Install

```bash
pnpm add file:/absolute/path/to/universal-player
pnpm add @angular/core
```

## Quick start — full UI

```ts
// full-player.component.ts
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from "@angular/core";
import "@codewithrajat/universal-player/ui";
import type { PlayerSourceInput } from "@codewithrajat/universal-player/core";
import type { UniversalPlayerElement } from "@codewithrajat/universal-player/ui";

@Component({
  selector: "app-full-player",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<universal-player #element controls="custom"></universal-player>`,
})
export class FullPlayerComponent implements AfterViewInit {
  @Input({ required: true }) source!: PlayerSourceInput;
  @ViewChild("element", { static: true }) element!: ElementRef<UniversalPlayerElement>;

  ngAfterViewInit(): void {
    void this.element.nativeElement.load(this.source);
  }
}
```

```ts
// app.component.ts
import { Component } from "@angular/core";
import { FullPlayerComponent } from "./full-player.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FullPlayerComponent],
  template: `<app-full-player [source]="source"></app-full-player>`,
})
export class AppComponent {
  readonly source = "/media/sample.mp4";
}
```

## Quick start — headless

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
      inputs: { source: "/media/sample.mp4", controls: "native" },
    });
    this.#controller.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.#controller?.ngOnDestroy();
  }
}
```

## Identity and lifecycle rules

- Consumer owns the decorated component; controller is AOT-safe
- Create one player per mount; never per render.
- Destroy on unmount. 
- Keep source objects referentially stable where the adapter uses `sourceToken`.

## Reactivity after mount

| Change | React | Vue | Angular | Svelte |
| --- | --- | --- | --- | --- |
| source | yes (`sourceToken`) | yes | yes (`sourceToken`) | yes |
| volume | yes | yes | yes | no |
| muted | yes | yes | yes | no |
| playbackRate | yes | yes | yes | no |
| other options | no | no | no | no |

If you need a different option later, recreate the player or use the core setters.

## API at a glance

| Type | Members |
| --- | --- |
| Options | `src/source`, controls, theme, locale, autoplay, muted, loop, poster, volume, playbackRate, chapters, thumbnails, captions, survey, playlist, keyboard, clickToPlay, autoHideControls, seekStep, volumeStep |
| Methods | play, pause, seek, load |
| Events | ready/loadedmetadata, play, pause, timeupdate, ended, error, statechange |
| Teardown | wrapper-owned (or `destroy()`) |

## Formats

[MP4 / M4V](./formats/mp4.md) · [WebM](./formats/webm.md) · [QuickTime MOV](./formats/mov.md) · [Matroska MKV](./formats/mkv.md) · [HLS (.m3u8)](./formats/hls.md) · [MPEG-DASH (.mpd)](./formats/dash.md) · [MP3](./formats/mp3.md) · [M4A / AAC audio](./formats/m4a.md) · [WAV](./formats/wav.md) · [FLAC](./formats/flac.md) · [Ogg / Oga](./formats/ogg.md) · [AAC (raw)](./formats/aac.md) · [JPEG](./formats/jpg.md) · [GIF](./formats/gif.md) · [PNG](./formats/png.md) · [WebP](./formats/webp.md) · [SVG](./formats/svg.md) · [AVIF](./formats/avif.md) · [YouTube](./formats/youtube.md) · [Vimeo](./formats/vimeo.md) · [Generic iframe embed](./formats/embed.md) · [Chunked / streamed media](./formats/chunked.md) · [Blob and File](./formats/blob.md)

## Features

[Captions and subtitles](./formats/features/captions.md) · [Chapters](./formats/features/chapters.md) · [Playlist and queue](./formats/features/playlist.md) · [Quality selection](./formats/features/quality.md) · [Resume playback](./formats/features/resume.md) · [Survey, feedback, review and quiz](./formats/features/survey.md)

## Known limitations

- Angular 22.2.4 in devDependencies; no Angular-specific browser test
- No built-in controls on this entry.
- No SSR rendering; see [SSR](../guides/ssr.md).
- No DRM, OCR, document rendering or plugin registry.

## Next

[Basic usage](./basic-usage.md) · [Advanced usage](./advanced-usage.md) · [Customization](./customization.md) · [Edge cases](./edge-cases.md) · [Failure cases](./failure-cases.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
