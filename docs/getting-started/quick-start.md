# Quick start

> [Docs home](../README.md) › [Getting started](./introduction.md) › Quick start

Five paths. Pick the one that matches your surface; they all use the same options and state.

## 0. Install the published package from npm

```bash
npm install @codewithrajat/universal-player
```

Use `pnpm add`, `yarn add` or `bun add` instead if you prefer.

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
const el = document.querySelector("universal-player");
el.addEventListener("statechange", (event) => {
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

player.on("timeupdate", ({ currentTime, duration }) => {
  console.log(currentTime, duration);
});

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

`mountUniversalPlayer` accepts a selector or `HTMLElement` and throws `invalid-argument` when the selector matches nothing. It does not render controls.

## 4. React

Headless component:

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Demo() {
  return <UniversalPlayer source="/media/clip.mp4" controls="native" />;
}
```

Full UI: render the element after importing `/ui`:

```tsx
import { createElement, useEffect, useRef } from "react";
import "@codewithrajat/universal-player/ui";

export function FullPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onState = (event: Event) => console.log((event as CustomEvent).detail.status);
    el.addEventListener("statechange", onState);
    return () => el.removeEventListener("statechange", onState);
  }, []);
  return createElement("universal-player", { ref, src, controls: "custom" });
}
```

## 5. Vue

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
</script>

<template>
  <UniversalPlayer src="/media/clip.mp4" controls="native" />
</template>
```

For the full UI, register `/ui` and configure the compiler:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag === "universal-player" } } })],
});
```

## Angular and Svelte

Angular uses a controller you wrap in your own standalone component; Svelte uses the shipped source component. Full patterns: [Frameworks](../frameworks.md).

## What to do next

1. Pick a source shape: URL, `File`/`Blob`, `MediaStream`, chunked or array.
2. Decide full UI vs headless.
3. Add captions/chapters/playlist options.
4. Handle `error` events by `code`.
5. Call `destroy()` on teardown.

**Next:** [First example](./first-example.md) · [Usage](./usage.md)

---

← Previous: [Setup](./setup.md) · Next: [First example](./first-example.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
