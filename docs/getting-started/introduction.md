# Introduction

> [Docs home](../README.md) › [Getting started](./introduction.md) › Introduction

`@codewithrajat/universal-player` is a browser media player with a deliberately split architecture.

## One core, two surfaces

```text
source input
   │
   ▼
normalizeSource() ──► NormalizedSource { kind, provider, url, mimeType, extension }
   │
   ▼
createEngine() (internal) ──► native | chunked | hls | dash | image | youtube | vimeo | generic-embed
   │
   ▼
UniversalPlayer ──► immutable PlayerState + 29 typed events
   │
   ├── headless consumers: /core, /vanilla, /react, /vue, /angular, /svelte4, /svelte5
   └── built-in UI: <universal-player> from the root entry or /ui
```

The core knows how to play media, not how to draw a control bar. The web component owns the control bar, menus, gestures, caption styling and survey overlay.

## What it is good at

- One API for native video/audio, still images, HLS, DASH, YouTube, Vimeo, generic iframes and chunked uploads.
- A complete built-in UI when you use the custom element.
- Headless control when you already have a design system.
- Typed state and events without adopting a framework.

## What it is not

- Not a transcoder, remuxer or DRM client.
- Not an SSR renderer.
- Not an Office/document viewer, despite some filenames inherited from the author's PDF viewer docs. The API tree under [`api/`](../api/components/rm-ng-pdf-viewer.md) is a compatibility layout; the content is rewritten for this media player.
- Not a plugin platform: engine selection is internal and there is no `registerEngine()`.

## Published on npm

`@codewithrajat/universal-player` is published at `0.0.1` on the public npm registry. Install it with `npm install @codewithrajat/universal-player`; see [Installation](./installation.md).

## The first decision

| You want… | Use |
| --- | --- |
| A finished player with controls | `<universal-player>` (root or `/ui`) |
| Browser-native controls only | `controls: "native"` on any surface |
| Your own React/Vue/Angular/Svelte chrome | The framework wrapper or `/core`, then render from `state` |
| No framework at all | `/vanilla` or `/core` |

**Next:** [Why this library](./why-this-library.md) · [Core concepts](../guides/core-concepts.md)

---

Next: [Why this library](./why-this-library.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
