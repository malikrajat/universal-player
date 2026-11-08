# Performance optimization

> [Docs home](./README.md) › Performance optimization

[â† Docs](./README.md) Â· [Best practices](./best-practices.md) Â· [Architecture](./architecture.md)

The player is designed to stay out of the hot path: zero runtime dependencies,
lazy engines, silent time updates and a tree-shakeable module graph. This page
explains how to keep it fast in your app.

---

## 1. What the library already does

| Optimisation              | Effect                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| Zero runtime dependencies | Nothing extra ships in the core.                                    |
| `unbundle: true`          | Bundlers can tree-shake unused adapters/features.                   |
| Lazy HLS/DASH imports     | Streaming SDKs load only for matching sources.                      |
| One engine per player     | Replacing a source destroys the old engine first.                   |
| Silent time patches       | `timeupdate`/`progress` do not replace state or emit `statechange`. |
| Capability-driven UI      | Unsupported controls are not rendered.                              |
| Object URL ownership      | URLs are revoked on replace/destroy.                                |
| Listener isolation        | A throwing subscriber cannot disrupt playback.                      |
| Document listener abort   | `destroy()` aborts document-level listeners.                        |

---

## 2. Keep the import surface small

```ts
// Good: headless core only
import { createPlayer } from "@codewithrajat/universal-player/core";

// Also good: UI only when you need it
import "@codewithrajat/universal-player/ui";
```

Avoid importing the root when you only need playback; the root also pulls in the
custom element, i18n and feature helpers (still tree-shakeable, but explicit is
better).

Framework adapters import only the framework you use. A React app never imports
Vue.

---

## 3. Do not recreate players

Creating a player builds a stage, engine and listeners. Recreating on every
render is expensive and loses playback position.

```ts
// Good
const player = useMemo(() => createPlayer({ container, source }), []);
useEffect(() => () => player.destroy(), [player]);

// Bad
const player = createPlayer({ container, source }); // every render
```

Framework adapters already own this lifecycle.

---

## 4. Throttle high-frequency work

`timeupdate` typically fires 4â€“10 times per second; `progress` can be similar.

```ts
import { throttle } from "lodash-es";

player.on(
  "timeupdate",
  throttle(({ currentTime }) => updateProgress(currentTime), 250),
);
```

Do not call `setState` in React/Vue on every `timeupdate` if the UI does not need
it. Prefer a ref or a throttled update.

`statechange` is safe to subscribe to for full re-renders.

---

## 5. Avoid expensive DOM in callbacks

Analytics, logging and network calls should be queued or batched. A synchronous
`fetch`-heavy callback in `onEvent` blocks the media pipeline.

```ts
const queue: AnalyticsEvent[] = [];

const player = createPlayer({
  container,
  source,
  analytics: { onEvent: (event) => queue.push(event) },
});

setInterval(() => flush(queue.splice(0)), 5_000);
```

Analytics callbacks are isolated, but they still run on the main thread.

---

## 6. Choose the right source strategy

| Scenario                  | Recommendation                                              |
| ------------------------- | ----------------------------------------------------------- |
| Short clips               | Direct MP4 URL.                                             |
| Long videos               | MP4 with range requests, or HLS/DASH.                       |
| Live                      | HLS/DASH.                                                   |
| User upload before server | Chunked with `MediaSource` (`mode: "auto"`).                |
| Small images              | Direct URLs.                                                |
| Large galleries           | Lazy-load images; the player does not virtualise playlists. |

Blob buffering holds the entire file in memory. Use `MediaSource` for large
files when the codec/MIME is supported.

---

## 7. Preload deliberately

```ts
createPlayer({ container, source, preload: "metadata" });
```

- `metadata` loads dimensions/duration without the full file.
- `none` avoids network until play.
- `auto` may download aggressively.

For a page with many players, `none` or `metadata` avoids bandwidth spikes.

---

## 8. One player per surface

Do not mount the same source in five hidden players. Each owns an engine and
decoder. Use a single player and change `source`.

---

## 9. Destroy on route change

```ts
useEffect(() => {
  const player = createPlayer({ container, source });
  return () => player.destroy();
}, []);
```

Leaked players keep timers, document listeners and decoders alive. In a SPA this
shows up as memory growth after navigation.

---

## 10. Avoid re-loading equivalent sources

`sourceToken()` treats equivalent URLs as the same source. Framework adapters use
it to avoid reloads when a parent re-renders with a new string instance.

If you call `load()` yourself, only call it when the source actually changes.

---

## 11. Captions and thumbnails

- Thumbnail cues are metadata; hundreds of cues are cheap. Thousands of image
  requests are not.
- Use a sprite sheet (`spriteUrl`) for dense previews.
- Captions are fetched by the browser only when selected; do not preload every
  language if bandwidth matters.

---

## 12. Theming cost

CSS custom properties are cheap. Avoid:

- Very large `backdrop-filter` blurs on low-end devices.
- Animating layout properties in host CSS.
- Overriding every token with `!important`.

The built-in stylesheet respects `prefers-reduced-motion`.

---

## 13. Bundle measurement

```bash
pnpm run build
pnpm run check:pack
```

Inspect `dist/entries/core.js` and its imports. Because output is unbundled, you
can see exactly which modules a consumer pulls in. A bundle budget is not
enforced yet (see [Roadmap](./roadmap.md)).

---

## 14. Profiling tips

1. Use Chrome DevTools Performance while playing.
2. Look for long tasks during `load()` (engine creation) and `play()`.
3. Check memory after 10 route changes; leaked players show as detached nodes.
4. Use the browser's media internals for decode/dropped-frame issues.
5. Test on a mid-range Android device, not only desktop.

---

## 15. Performance checklist

- [ ] Import only the entry points you need.
- [ ] One player per surface.
- [ ] Destroy on unmount.
- [ ] Throttle `timeupdate` consumers.
- [ ] Batch analytics/network work.
- [ ] Use `preload: "metadata"` or `"none"` for many players.
- [ ] Prefer HLS/DASH for long/live content.
- [ ] Avoid Blob buffering for large files.
- [ ] Lazy-load gallery images.
- [ ] Measure on a low-end device.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)