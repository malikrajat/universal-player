# Component: UniversalPlayerElement

> [Docs home](../../README.md) › [API compatibility tree](./rm-ng-pdf-viewer.md) › Component: UniversalPlayerElement

> **Filename note:** this path comes from the author's PDF-viewer documentation layout. The component documented here is **`<universal-player>`**, not a PDF viewer. The filename is kept for cross-repository consistency.

## What it is

`UniversalPlayerElement` is a custom element that owns one `UniversalPlayer` core instance and the built-in control surface.

```ts
import { UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement } from "@codewithrajat/universal-player/ui";

defineUniversalPlayerElement();          // default tag
defineUniversalPlayerElement("my-player"); // custom tag
```

`defineUniversalPlayerElement()` returns `true` when the tag exists or was registered, and `false` when `customElements` is unavailable.

## Members

| Member | Type | Notes |
| --- | --- | --- |
| `player` | `UniversalPlayer \| null` | Live core instance |
| `strings` | `Partial<PlayerStrings>` | Get/set per-instance overrides |
| `load` | `(source) => Promise<void>` | Forwards to the core |
| `play` / `pause` / `seek` | methods | Forward to the core |
| `getEmbedCode` | `() => string \| null` | Uses share/embed options |
| `destroy` | `() => void` | Unmounts and destroys |

## Lifecycle

`connectedCallback` builds the UI and core; `disconnectedCallback` tears both down. `destroy()` is the explicit teardown. Attributes are observed; some reload the source, some are presentation-only.

## Minimal use

```html
<script type="module">
  import "@codewithrajat/universal-player/ui";
</script>
<universal-player src="/clip.mp4" controls="custom" theme="dark"></universal-player>
```

**Canonical guide:** [UI API](../../reference/api-ui-and-frameworks.md) · [Built-in UI](../../guides/ui.md)

---

← Previous: [Concepts: performance model](../../concepts/performance-model.md) · Next: [Events](../events/viewer-events.md) →

---

**Docs home** · [Documentation index](../../README.md) · [Summary](../../SUMMARY.md)
