# Image DAM inspection

> [Examples home](../README.md) › [Use cases](./README.md) › Image DAM inspection

## Problem

Asset managers need to inspect large images with zoom and rotation.

## What you will build

A gallery with zoom, rotate and download controls, plus alt text.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | JPEG/PNG/WebP/AVIF |
| Feature | Image viewer |
| Storage | Your DAM |

## Flow

```text
asset list → image playlist → zoom/rotate
```

## Step by step

1. Load an array of image URLs.
2. Set `image.maxZoom`.
3. Provide `alt` via structured image sources.
4. Disable download for rights-managed assets.

## Copy-paste code

```html
<universal-player
  controls="custom"
  playlist='{"items":[
    {"source":{"kind":"image","src":"/assets/a.jpg","alt":"Campaign A"},"title":"A"},
    {"source":{"kind":"image","src":"/assets/b.png","alt":"Campaign B"},"title":"B"}
  ],"autoAdvance":true}'
  image='{"zoom":true,"rotate":true,"download":false,"minZoom":0.5,"maxZoom":4,"slideDuration":8}'
></universal-player>
```

For headless image inspection, apply your own CSS transform; the core has no image transform API.

## UX notes

Never rely on colour alone for selection. Show dimensions from `loadedmetadata`.

## Security and limits

Serve user SVG as raster previews; never inline untrusted SVG.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| AVIF unsupported | media-error | Provide JPEG fallback |
| huge image | slow decode | Serve a preview rendition |
| missing alt | a11y | Supply alt |

## Checklist

- [ ] Alt text
- [ ] Sized renditions
- [ ] Download policy
- [ ] Zoom bounds

## Framework pages

[Vanilla](../vanilla/formats/jpg.md) · [React](../react/formats/jpg.md) · [Vue](../vue/formats/jpg.md) · [Angular](../angular/formats/jpg.md) · [Svelte](../svelte/formats/jpg.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
