# SSR and hydration

> [Docs home](../README.md) › [Guides](./core-concepts.md) › SSR and hydration

The player is **browser-only**. `/core` is import-safe in Node, but constructing `UniversalPlayer` needs `HTMLElement`, `document` and browser media APIs. The custom element needs `customElements`.

## What fails on the server

| Operation | Result |
| --- | --- |
| `import { createPlayer } from ".../core"` | Safe |
| `new UniversalPlayer({ container })` | Needs a DOM container |
| `import "@codewithrajat/universal-player"` on the server | `defineUniversalPlayerElement()` returns `false` when `customElements` is undefined |
| Rendering `<universal-player>` to HTML | Markup can be emitted, but no player exists until hydration |
| Importing `/react`, `/vue`, `/angular` on the server | Framework may render the host div; the effect/mount does not run |

## Pattern: client-only boundary

```tsx
"use client";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("./Player"), { ssr: false, loading: () => <div className="skeleton" /> });
```

```vue
<ClientOnly>
  <UniversalPlayer src="/clip.mp4" controls="native" />
</ClientOnly>
```

## Sizing placeholder

Reserve layout to avoid CLS:

```css
.player-slot { aspect-ratio: 16 / 9; background: #0b0b0b; }
```

## SvelteKit

```svelte
<script lang="ts">
  import { onMount } from "svelte";
  let Player: typeof import("@codewithrajat/universal-player/svelte5").default | null = null;
  onMount(async () => { Player = (await import("@codewithrajat/universal-player/svelte5")).default; });
</script>

{#if Player}<Player src="/clip.mp4" controls="native" />{/if}
```

## Angular Universal

Guard the controller creation with `isPlatformBrowser`; do not call `ngAfterViewInit()` during server rendering.

## Hydration mismatch

The custom element renders its surface after connection, not in SSR markup. If you server-render the tag, expect an empty element until the client script runs. Do not assert on control markup during hydration.

## Teardown

Abort listeners and destroy the player on route change. Object URLs created for uploads leak until destroyed.

**Canonical guide:** [SSR issues](../troubleshooting/ssr-issues.md)

---

← Previous: [Security](./security.md) · Next: [Debugging](./debugging.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
