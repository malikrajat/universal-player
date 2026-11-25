# Images

> [Docs home](./README.md) › Images

[← Docs](./README.md) · [Usage → Images](./usage.md#images-and-slideshows)

The image engine renders stills with zoom, rotate, pan, download, share and
fullscreen, and supports galleries/slideshows.

---

## 1. Single image

```ts
createPlayer({
  container,
  source: { kind: "image", src: "/photo.jpg", alt: "Product photo" },
  image: { zoom: true, rotate: true, download: true },
});
```

A plain URL also works; the extension decides the kind.

---

## 2. Gallery / slideshow

```ts
createPlayer({
  container,
  source: ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"],
  image: {
    slideDuration: 5, // seconds; omit to disable auto-advance
    zoom: true,
    rotate: true,
    download: false,
  },
  playlist: { loop: true },
});
```

An array creates a playlist. `image.slideDuration` advances automatically.

---

## 3. Transform helpers

```ts
import {
  IMAGE_TRANSFORM_DEFAULT,
  zoomImage,
  rotateImage,
  resetImageTransform,
  clampImageZoom,
  imageTransformCss,
  isImageTransformed,
} from "@codewithrajat/universal-player";

let transform = { ...IMAGE_TRANSFORM_DEFAULT };
transform = zoomImage(transform, 1, 0.5, 4);
transform = rotateImage(transform, 1);
element.style.transform = imageTransformCss(transform);
```

| Helper                                      | Purpose                                      |
| ------------------------------------------- | -------------------------------------------- |
| `zoomImage(transform, 1 \| -1, min?, max?)` | Next zoom step (`0.25`, `0.5` at high zoom). |
| `rotateImage(transform, 1 \| -1)`           | Quarter turn.                                |
| `resetImageTransform()`                     | Neutral state.                               |
| `clampImageZoom(zoom, min?, max?)`          | Bounds.                                      |
| `imageTransformCss(transform)`              | CSS string.                                  |
| `isImageTransformed(transform)`             | Whether anything changed.                    |

Defaults: `minZoom` `0.25`, `maxZoom` `8`.

---

## 4. Controls

Images show:

- zoom in / out
- reset zoom
- rotate
- download (opt-in)
- share
- fullscreen

They do not show a timeline, volume or PiP. This is capability-driven.

---

## 5. Chunked images

```ts
source: {
  kind: "image",
  type: "image/png",
  chunks: async function* () { /* yield chunks */ },
}
```

Chunks are assembled into a Blob/object URL. `chunkDelay` adds a delay per
chunk.

---

## 6. Accessibility

- Provide `alt` on image sources.
- Zoom/rotate controls are buttons with labels.
- Images are decorative inside the player? No — the `alt` is the content
  description, keep it meaningful.
- Test keyboard focus on the image control group.

---

## 7. Common issues

| Symptom                    | Fix                                 |
| -------------------------- | ----------------------------------- |
| Image not shown            | Check MIME/CORS and the extension.  |
| Slideshow does not advance | Set `image.slideDuration`.          |
| Download missing           | `image.download: true`.             |
| Zoom feels too strong      | Lower `maxZoom` or raise `minZoom`. |

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)