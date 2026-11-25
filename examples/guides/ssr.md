# SSR and hydration

> [Examples home](../README.md) › [Production guides](./README.md) › SSR and hydration

## Import-safe vs browser-only

| Operation | Server |
| --- | --- |
| `import .../core` | safe |
| `new UniversalPlayer` | needs DOM |
| `import .../ui` | registration no-ops without `customElements` |
| Render `<universal-player>` markup | possible, but empty until hydration |
| Framework wrapper render | host div may render; mount effect does not |

## React / Next.js

```tsx
"use client";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("./Player"), { ssr: false });
```

## Vue / Nuxt

```vue
<ClientOnly>
  <UniversalPlayer src="/clip.mp4" controls="native" />
</ClientOnly>
```

## Angular Universal

Guard controller creation with `isPlatformBrowser`; do not call `ngAfterViewInit()` on the server.

## SvelteKit

Import the component in `onMount` or guard with `browser`.

## Hydration

Do not assert on control markup. The element builds its interior after connection. Reserve space with `aspect-ratio`.

## Teardown

```ts
return () => player.destroy();
```

## Related

[docs/guides/ssr.md](../../docs/guides/ssr.md) · [SSR issues](../../docs/troubleshooting/ssr-issues.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
