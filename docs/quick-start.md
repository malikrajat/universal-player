# Quick start

> [Docs home](./README.md) › Quick start

> **Publication status:** the package is unreleased at `0.0.1`. Install from a folder or tarball; registry commands are intended-only.

## 0. Build and install locally

```bash
pnpm install
pnpm build
pnpm add file:/absolute/path/to/universal-player
```

## 1. Full UI — custom element

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>

<universal-player
  src="/media/clip.mp4"
  poster="/media/poster.jpg"
  controls="custom"
  theme="dark"
  label="Product tour"
></universal-player>
```

```js
const element = document.querySelector("universal-player");
element.addEventListener("statechange", (event) => {
  console.log(event.detail.status, event.detail.currentTime);
});
```

## 2. Headless core

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "/media/clip.mp4",
  controls: "native",
});

player.on("timeupdate", ({ currentTime, duration }) => console.log(currentTime, duration));
await player.play();
player.destroy();
```

## 3. Vanilla mount helper

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";

const player = mountUniversalPlayer("#app", {
  source: "/media/clip.mp4",
  controls: "native",
});
```

`mountUniversalPlayer` accepts a selector or `HTMLElement`, throws `invalid-argument` when the selector misses, and returns a `UniversalPlayer`. It does not render controls.

## 4. React

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Demo() {
  return <UniversalPlayer source="/media/clip.mp4" controls="native" />;
}
```

For the built-in UI, import `/ui` and render the custom element (full wrapper in [Frameworks](./frameworks.md#react)).

## 5. Vue

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer src="/media/clip.mp4" controls="native" />
</template>
```

## Angular and Svelte

Angular uses `AngularUniversalPlayer` inside a component you own; Svelte uses `/svelte4` or `/svelte5`. See [Frameworks](./frameworks.md).

## Choose a source

| Source | Code |
| --- | --- |
| URL | `player.load("/clip.mp4")` |
| File/Blob | `player.load(file)` |
| MediaStream | `player.load(stream)` |
| Chunked | `player.load({ kind: "video", type: "video/mp4", chunks: () => iterable })` |
| Array | `player.load(["/a.jpg", "/b.jpg"])` |

## Next

[First example](./getting-started/first-example.md) · [Usage](./usage.md) · [Configuration](./configuration.md) · [API reference](./api-reference.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
