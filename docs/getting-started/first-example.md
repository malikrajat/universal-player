# First example

> [Docs home](../README.md) › [Getting started](./introduction.md) › First example

A complete page with the built-in UI. Save it as `index.html` next to your built package.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Universal Player — first example</title>
    <style>
      :root { color-scheme: dark; }
      body { margin: 0; font-family: system-ui, sans-serif; background: #0b0b0b; color: #f8fafc; }
      main { max-width: 960px; margin: 0 auto; padding: 2rem 1rem; }
      universal-player {
        display: block;
        inline-size: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 12px;
        overflow: hidden;
      }
      #status { font-variant-numeric: tabular-nums; }
    </style>
  </head>
  <body>
    <main>
      <h1>First example</h1>
      <universal-player
        id="player"
        src="/media/clip.mp4"
        poster="/media/poster.jpg"
        label="Sample clip"
        controls="custom"
        theme="dark"
        locale="en"
      ></universal-player>
      <p id="status">idle</p>
    </main>

    <script type="module">
      import "@codewithrajat/universal-player";

      const element = document.querySelector("#player");
      const status = document.querySelector("#status");

      element.addEventListener("statechange", (event) => {
        const state = event.detail;
        status.textContent = `${state.status} · ${state.currentTime.toFixed(1)}s / ${state.duration.toFixed(1)}s`;
      });

      element.addEventListener("error", (event) => {
        const error = event.detail.error;
        status.textContent = `${error.code}: ${error.message}`;
        console.error(error.code, error.details);
      });
    </script>
  </body>
</html>
```

## Why each part exists

| Part | Reason |
| --- | --- |
| `import "@codewithrajat/universal-player"` | Registers `<universal-player>` and loads the built-in UI. |
| `src` | A URL string is normalised to a video source by extension/MIME. |
| `poster` | Shown before metadata is available. |
| `controls="custom"` | Uses the built-in control bar; `"native"` would use browser controls. |
| `label` | Accessible label for the player region. |
| `statechange` listener | The element forwards the core event as a `CustomEvent`; `detail` is `PlayerState`. |
| `error` listener | `detail.error` is a plain `Error` with a stable `code` and `details`. |

## If the media does not play

1. Open DevTools → Network and confirm the request for `/media/clip.mp4` returns 200 and a video MIME type.
2. Check the console for `media-error`; inspect `error.details` and the underlying `<video>.error`.
3. Try a known-good H.264/AAC MP4. MOV/MKV containers often fail in browsers.
4. If the tag renders but has no controls, confirm you imported the root or `/ui`, not `/core`.

## Next: make it useful

- Add [captions](../guides/features.md), [chapters](../guides/features.md) and a [playlist](../guides/features.md).
- Replace the source with an upload: `element.load(file)`.
- Add [resume](../reference/api-features.md) and [analytics](../reference/api-features.md).
- Move to a framework with the [framework guides](../guides/frameworks.md).

**Next:** [Usage](./usage.md)

---

← Previous: [Quick start](./quick-start.md) · Next: [Usage](./usage.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
