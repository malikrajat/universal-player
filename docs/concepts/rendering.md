# Rendering

> [Docs home](../README.md) › [Concepts](./rendering.md) › Rendering

Rendering differs by media kind, not by framework.

| Kind | Engine output | Layout |
| --- | --- | --- |
| video | `<video class="up-media">` | 16:9 viewport in the built-in UI |
| audio | `<audio class="up-media">` | Audio visual + artwork; no aspect ratio |
| image | `<img class="up-media up-image">` | Contained; CSS transform for zoom/rotate |
| embed | `<iframe class="up-media up-embed">` | 16:9 viewport; cross-origin content |
| chunked | media element via MSE or Blob | same as its kind |

## Headless rendering

The core always creates a `.up-stage` div inside your container and appends the engine element. There is no portal, no wrapper component and no control DOM.

```ts
const player = createPlayer({ container, source, controls: "native" });
console.log(player.mediaElement?.tagName); // VIDEO | AUDIO | IMG | IFRAME
```

## Built-in UI rendering

The element builds a shadow root (or light DOM), then a `.up-root` with a viewport, control bar, menus, spinner, error overlay, toast and survey panel. It renders from state; it does not own media state.

## Styling boundary

Shadow DOM isolates the UI. Use CSS custom properties and `::part()`. Light DOM exposes `.up-*` classes, but those are not a stable public API.

**Canonical guide:** [Architecture](../architecture.md) · [Theming overview](../theming/overview.md)

---

← Previous: [Lifecycle](./lifecycle.md) · Next: [State management](./state-management.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
