# Frameworks

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Frameworks

## The reality table

| Framework | Official entry | Renders built-in controls? | Full UI path |
| --- | --- | --- | --- |
| Vanilla | `/vanilla`, `/core` | No | Root or `/ui` custom element |
| React | `/react` | No | Root or `/ui` custom element |
| Vue | `/vue` | No | Root or `/ui` custom element |
| Angular | `/angular` | No | Root or `/ui` custom element |
| Svelte | `/svelte4`, `/svelte5` | No | Root or `/ui` custom element |

This is the most important table in the docs. The wrappers are headless renderers of a host `div`; the core mounts a `<video>`/`<audio>`/`<img>`/`<iframe>`. No control bar exists unless you use the element or `controls: "native"`.

## React

```tsx
import { UniversalPlayer, useUniversalPlayer } from "@codewithrajat/universal-player/react";

<UniversalPlayer source="/clip.mp4" controls="native" onEvent={(e) => console.log(e.type)} />;
```

The component creates one player per mount, loads on `sourceToken` change, and destroys on unmount (including Strict Mode's simulated unmount). The hook returns `hostRef`, `player`, `state`, `play`, `pause`, `seek`, `load`.

Limitation: only `source`, `volume`, `muted` and `playbackRate` are reacted to after mount. Other option changes are ignored until remount.

## Vue

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer src="/clip.mp4" controls="native" />
</template>
```

The composable accepts `MaybeRef` values for every option plus `host`. It connects on `onMounted` and destroys on `onBeforeUnmount`. Post-mount reactions: source, volume, muted, playbackRate.

Vue 2.7 requires the Composition API; Vue 2.6 is not supported.

## Angular

The package ships `AngularUniversalPlayer`, a decorator-free controller. You own the standalone component. See [Angular API](../reference/api-ui-and-frameworks.md#angular) for the full pattern.

Limitations: `setInputs()` reacts to source, volume, muted and playbackRate. `load()` before `ngAfterViewInit()` rejects. `setInputs()` after destroy throws.

## Svelte

```svelte
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
</script>

<UniversalPlayer src="/clip.mp4" controls="native" />
```

Use `/svelte4` for Svelte 4. The component imports the core, not the UI. Props are a subset of `PlayerOptions`: source, controls, theme, locale, autoplay, muted, loop, poster, volume, playbackRate, label, chapters, thumbnails, captions, survey, playlist, keyboard, clickToPlay, autoHideControls, seekStep, volumeStep.

## Full UI in a framework

Register the element once (`import "@codewithrajat/universal-player/ui"`) and render the tag. Framework-specific notes:

- **React**: use a ref + `createElement` or add JSX intrinsic types; attach DOM listeners with `addEventListener` because React's synthetic events do not type custom-element payloads.
- **Vue**: configure `isCustomElement` for the template compiler.
- **Angular**: add `CUSTOM_ELEMENTS_SCHEMA`; use `[attr.src]` for attributes and `(statechange)` or `addEventListener`.
- **Svelte**: unknown elements render as-is; use `on:statechange` (Svelte 4) or `onstatechange` (Svelte 5).

**Next:** [UI](./ui.md)

---

← Previous: [Features](./features.md) · Next: [UI](./ui.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
