# SSR issues

> [Docs home](../README.md) › [Troubleshooting](./ssr-issues.md) › SSR issues

## `ReferenceError: document is not defined`

You constructed the player or imported the element on the server.

```ts
// Bad on the server
import { createPlayer } from "@codewithrajat/universal-player/core";
const player = createPlayer({ container: document.body });
```

Fix: move construction into a client-only effect/dynamic import.

## `HTMLElement is not defined`

`isElement()` checks `typeof HTMLElement !== "undefined"`, but constructing still needs a real element. The core's `container` validation throws `invalid-argument` on the server rather than a ReferenceError in most paths.

## `customElements is not defined`

`defineUniversalPlayerElement()` returns `false`. The element will not upgrade on the client unless the module is imported there.

## Hydration mismatch

The custom element's interior is built after connection. Server HTML will not contain the control bar. Do not compare that markup.

## Angular Universal

Guard with `isPlatformBrowser`; skip `ngAfterViewInit()` on the server.

## SvelteKit

Import the component inside `onMount` or guard with `browser`.

## Next.js

Use `dynamic(..., { ssr: false })` or a `"use client"` component that mounts after hydration.

**Canonical guide:** [SSR](../guides/ssr.md)

---

← Previous: [Performance issues](./performance-issues.md) · Next: [Styling issues](./styling-issues.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
