# Frameworks

> [Docs home](./README.md) � Frameworks

[← Docs](./README.md) · [Usage](./usage.md) · [API reference](./api-reference.md)

The library has one framework-neutral core. Every adapter renders a host element and forwards lifecycle calls. It does **not** render the built-in control bar: only `<universal-player>` does. For native controls set `controls: "native"`; for the full UI mount the custom element.

| Adapter     | Entry      | Exports                                                            |
| ----------- | ---------- | ------------------------------------------------------------------ |
| Vanilla     | `/vanilla` | `mountUniversalPlayer()`                                           |
| React       | `/react`   | `UniversalPlayer`, `useUniversalPlayer()`, `UniversalPlayerHandle` |
| Vue 2.7/3   | `/vue`     | `UniversalPlayer`, `useUniversalPlayer()`                          |
| Angular 17+ | `/angular` | `AngularUniversalPlayer` controller                                |
| Svelte 4    | `/svelte4` | default `UniversalPlayer` component                                |
| Svelte 5    | `/svelte5` | default `UniversalPlayer` component                                |

All adapters are optional peers — importing an adapter is the only thing that
pulls the framework into the module graph.

---

## Vanilla

```ts
import { mountUniversalPlayer } from "@codewithrajat/universal-player/vanilla";
import "@codewithrajat/universal-player/styles.css";

const player = mountUniversalPlayer("#app", {
  source: "/clip.mp4",
  theme: "dark",
});

player.on("play", () => console.log("playing"));
player.destroy();
```

`MountOptions` is `PlayerOptions` without `container`, plus `source`. The helper
accepts a selector or `HTMLElement` and throws `invalid-argument` if the selector
matches nothing.

If you only need the headless core, import `createPlayer` from `/core` instead.

---

## React

### Component

```tsx
import { useRef } from "react";
import { UniversalPlayer, type UniversalPlayerHandle } from "@codewithrajat/universal-player/react";

export function Player() {
  const ref = useRef<UniversalPlayerHandle>(null);

  return (
    <UniversalPlayer
      ref={ref}
      source="/clip.mp4"
      poster="/poster.jpg"
      theme="dark"
      onEvent={(event) => console.log(event.type)}
    />
  );
}
```

Props are `UseUniversalPlayerOptions` plus `className`, `style` and `children`.
`UseUniversalPlayerOptions` is `PlayerOptions` without `container`.

The component:

- Creates one core player per mount.
- Loads a new source when `source` changes, keyed by `sourceToken()` so
  equivalent URLs do not reload.
- Destroys the player on unmount, including React Strict Mode's simulated
  unmount.
- Renders a `div` with `data-up-framework="react"` and `data-up-status`.

### Imperative handle

| Member   | Signature                                      |
| -------- | ---------------------------------------------- |
| `player` | `UniversalPlayer \| null`                      |
| `play`   | `() => Promise<void>`                          |
| `pause`  | `() => void`                                   |
| `seek`   | `(time: number) => void`                       |
| `load`   | `(source: PlayerSourceInput) => Promise<void>` |

### Hook

```tsx
import { useUniversalPlayer } from "@codewithrajat/universal-player/react";

function Custom() {
  const { hostRef, player, state, play, pause, seek, load } = useUniversalPlayer({
    source: "/clip.mp4",
  });

  return <div ref={hostRef} />;
}
```

`UseUniversalPlayerResult`:

| Member    | Type                                           |
| --------- | ---------------------------------------------- |
| `hostRef` | `RefObject<HTMLDivElement \| null>`            |
| `player`  | `UniversalPlayer \| null`                      |
| `state`   | `PlayerState`                                  |
| `play`    | `() => Promise<void>`                          |
| `pause`   | `() => void`                                   |
| `seek`    | `(time: number) => void`                       |
| `load`    | `(source: PlayerSourceInput) => Promise<void>` |

The hook subscribes to `statechange` and patches `currentTime`, `duration` and
`buffered` from `timeupdate`, so high-frequency updates do not force a full
state replacement.

### React notes

- `source` accepts a URL, `Blob`, `File`, `MediaStream`, structured source,
  chunked source or array.
- The component does not register `<universal-player>`; it uses the core.
- The adapter is headless: it renders a host `div` and the core mounts media. It does not render the built-in control bar.
- React 18+ is required.

---

## Vue

One entry supports Vue 2.7 and Vue 3 through the Composition API.

### Component

```vue
<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
import "@codewithrajat/universal-player/styles.css";
</script>

<template>
  <UniversalPlayer src="/clip.mp4" theme="dark" />
</template>
```

### Composable

```ts
import { ref } from "vue";
import { useUniversalPlayer } from "@codewithrajat/universal-player/vue";

const host = ref<HTMLElement | null>(null);
const { state, player, play, pause, seek, load, destroy } = useUniversalPlayer({
  host,
  source: "/clip.mp4",
});
```

`UseUniversalPlayerOptions` maps every `PlayerOptions` key (except `container`)
to `MaybeRef<T>`, plus `host: MaybeRef<HTMLElement | null>`. Reading a ref is
unwrapped automatically.

`UseUniversalPlayerResult`:

| Member    | Type                                           |
| --------- | ---------------------------------------------- |
| `state`   | `{ readonly value: PlayerState }`              |
| `player`  | `{ readonly value: UniversalPlayer \| null }`  |
| `play`    | `() => Promise<void>`                          |
| `pause`   | `() => void`                                   |
| `seek`    | `(time: number) => void`                       |
| `load`    | `(source: PlayerSourceInput) => Promise<void>` |
| `destroy` | `() => void`                                   |

### Vue notes

- Vue 2.7 is the minimum for Vue 2 because it provides the Composition API.
- Vue 2.6 and lower are not supported.
- Vue 2 is end-of-life; the range exists for enterprise migrations.
- The adapter is headless: no built-in control bar. Use the custom element for the full UI.

---

## Angular

Angular libraries built by a generic bundler cannot emit partial-compilation
metadata, so a precompiled `@Component` would not be AOT-safe. The package
therefore ships a decorator-free controller. You own the standalone component.

```ts
import {
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";

@Component({
  selector: "app-player",
  standalone: true,
  template: `<div #host class="host"></div>`,
  styles: [
    `
      .host {
        inline-size: 100%;
        aspect-ratio: 16 / 9;
      }
    `,
  ],
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild("host", { static: true }) host!: ElementRef<HTMLElement>;
  private controller: AngularUniversalPlayer | null = null;

  ngAfterViewInit(): void {
    this.controller = new AngularUniversalPlayer({
      elementRef: this.host,
      inputs: {
        source: "/clip.mp4",
        theme: "dark",
        volume: 0.8,
      },
      outputs: {
        ready: (state) => console.log("ready", state.duration),
        stateChange: (state) => console.log(state.status),
        error: (error) => console.error(error),
        event: (event) => console.log(event.type),
        player: (player) => console.log("player", player),
      },
    });

    this.controller.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.controller?.ngOnDestroy();
    this.controller = null;
  }
}
```

### Controller API

| Member            | Signature                                                |
| ----------------- | -------------------------------------------------------- |
| `constructor`     | `(options: AngularUniversalPlayerOptions)`               |
| `state`           | `PlayerState` (getter)                                   |
| `player`          | `UniversalPlayer \| null` (getter)                       |
| `destroyed`       | `boolean` (getter)                                       |
| `setInputs`       | `(inputs: AngularUniversalPlayerInputs) => void`         |
| `setOutputs`      | `(outputs: AngularUniversalPlayerOutputs) => void`       |
| `ngOnChanges`     | `() => void`                                             |
| `ngAfterViewInit` | `() => void`                                             |
| `ngOnDestroy`     | `() => void`                                             |
| `load`            | `(source: PlayerSourceInput) => Promise<void>`           |
| `play`            | `() => Promise<void>`                                    |
| `pause`           | `() => void`                                             |
| `seek`            | `(time: number) => void`                                 |
| `setVolume`       | `(volume: number) => void`                               |
| `setMuted`        | `(muted: boolean) => void`                               |
| `setPlaybackRate` | `(rate: number) => void`                                 |
| `subscribe`       | `(listener: (state: PlayerState) => void) => () => void` |
| `whenIdle`        | `() => Promise<void>`                                    |

`AngularUniversalPlayerInputs` is `PlayerOptions` without `container`,
`onStateChange` and `onEvent`. Outputs are `ready`, `stateChange`, `error`,
`event` and `player`.

`ngZone` and `changeDetector` are optional; without them the controller runs
outside Angular's zone and schedules change detection with `markForCheck()`.

### Angular notes

- Angular 17+ is the declared minimum.
- The controller requires an `ElementRef` with an `HTMLElement` host.
- Call `ngAfterViewInit()` after the host exists and `ngOnDestroy()` on teardown.
- The controller is headless: no built-in control bar. Use the custom element for the full UI.

---

## Svelte

The package ships two source components because Svelte 4 (stores) and Svelte 5
(runes) have different authoring models.

```svelte
<!-- Svelte 5 -->
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
  import "@codewithrajat/universal-player/styles.css";
</script>

<UniversalPlayer src="/clip.mp4" theme="dark" />
```

```svelte
<!-- Svelte 4 -->
<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte4";
</script>

<UniversalPlayer src="/clip.mp4" theme="dark" />
```

Both are exposed through the `svelte` export condition. Svelte tooling compiles
the component inside the consumer app, which is why source components are
shipped instead of precompiled output.

### Svelte notes

- Use the entry that matches your Svelte major. Using `/svelte5` on Svelte 4
  will not compile.
- Svelte 4.0+ and Svelte 5.0+ are supported.
- The component is headless: no built-in control bar. Use the custom element for the full UI.

---

## Framework comparison

| Concern                        | Vanilla | React         | Vue                  | Angular         | Svelte      |
| ------------------------------ | ------- | ------------- | -------------------- | --------------- | ----------- |
| Registers `<universal-player>` | No      | No            | No                   | No              | No          |
| Owns core lifecycle            | You     | Component     | Component/composable | Controller      | Component   |
| Source change detection        | Manual  | `sourceToken` | `watch`              | `sourceToken`   | Component   |
| SSR                            | No      | Client only   | Client only          | Client only     | Client only |
| Peer required                  | None    | `react`       | `vue`                | `@angular/core` | `svelte`    |

The custom element entry is the only one that registers the tag; it can be used
alongside any framework.

---

## SSR and hydration

The player is browser-only. For Next.js, Nuxt, Angular Universal, SvelteKit or
Remix:

1. Render a sized placeholder on the server.
2. Import the adapter dynamically on the client.
3. Mount after hydration.

```tsx
// Next.js App Router example
"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@codewithrajat/universal-player/react").then((m) => m.UniversalPlayer),
  { ssr: false },
);

export function ClientPlayer() {
  return (
    <div style={{ aspectRatio: "16 / 9" }}>
      <Player src="/clip.mp4" />
    </div>
  );
}
```

`core` is import-safe in Node, but constructing `UniversalPlayer` needs a DOM
container and browser APIs.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)