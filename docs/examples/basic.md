# Basic example

> [Docs home](../README.md) › [Examples](./basic.md) › Basic example

A complete, minimal integration for the built-in UI.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      universal-player { display: block; inline-size: 100%; aspect-ratio: 16 / 9; }
    </style>
  </head>
  <body>
    <script type="module">
      import "@codewithrajat/universal-player";
    </script>
    <universal-player src="/media/clip.mp4" poster="/media/poster.jpg" controls="custom"></universal-player>
  </body>
</html>
```

## Headless variant

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "/media/clip.mp4",
  controls: "native",
});
```

## Checklist

- [ ] Installed the published package from npm (`npm install @codewithrajat/universal-player`).
- [ ] Imported the root or `/ui` for the UI.
- [ ] Served the media with a video MIME type.
- [ ] Sized the host.
- [ ] Added an `error` listener.

**Canonical guide:** [Quick start](../quick-start.md) · [Example book](../../examples/README.md)

---

← Previous: [Configuration service](../api/services/configuration.md) · Next: [Advanced example](./advanced.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
