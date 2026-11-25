# Troubleshooting

> [Docs home](./README.md) › Troubleshooting

[← Docs](./README.md) · [Errors vs logs](./errors-vs-logs.md) · [FAQ](./faq.md)

Symptoms, causes, diagnosis and fixes. Start with the error code if you have
one.

---

## 60-second triage

1. **Is the element registered?**

   ```js
   customElements.get("universal-player");
   ```

2. **Is the host sized?**

   ```css
   universal-player {
     display: block;
     aspect-ratio: 16 / 9;
   }
   ```

3. **Is there an error?**

   ```js
   const player = document.querySelector("universal-player").player;
   player.state.status;
   player.state.error;
   player.on("error", ({ error }) => console.error(error));
   ```

4. **Is the media URL valid and CORS-enabled?** Open it directly and check the
   Network panel for the manifest **and every segment**.

5. **Is the needed peer installed?** `hls.js` for `.m3u8`, `dashjs` for `.mpd`.

6. **Is it autoplay?** Try `muted: true`; autoplay may be blocked.

7. **Are styles missing?** Import `styles.css` for light DOM, or use Shadow DOM.

---

## Quick triage

| Symptom                    | Jump to                                       |
| -------------------------- | --------------------------------------------- |
| Nothing renders            | [1](#1-nothing-renders)                       |
| Player is 0px tall         | [2](#2-player-has-zero-height)                |
| Black screen / no playback | [3](#3-black-screen-or-no-playback)           |
| HLS/DASH fails             | [4](#4-hlsdash-fails)                         |
| Controls look unstyled     | [5](#5-controls-unstyled)                     |
| Autoplay does not start    | [6](#6-autoplay-does-not-start)               |
| Captions missing           | [7](#7-captions-missing)                      |
| Seeking jumps              | [8](#8-seek-is-ignored-or-jumps)              |
| Method throws              | [9](#9-method-throws-a-playererror)           |
| Memory grows in a SPA      | [10](#10-memory-grows-after-navigation)       |
| Survey does not open       | [11](#11-survey-does-not-open)                |
| Playlist next is blocked   | [12](#12-next-is-blocked)                     |
| Type errors on import      | [13](#13-typescript-cannot-resolve-the-entry) |
| SSR crash                  | [14](#14-document-is-not-defined-during-ssr)  |

---

## 1. Nothing renders

**Cause:** the container has no size, the element is not registered, or the
source failed before any UI existed.

**Diagnose:**

```js
console.log(customElements.get("universal-player")); // undefined => not registered
console.log(document.querySelector("universal-player")?.player); // null => not connected
```

**Fix:**

- Import the root or `/ui`, or call `defineUniversalPlayerElement()`.
- Ensure the element is connected to the DOM.
- Give the host a height/aspect ratio.
- Check the console for a `PlayerError`.

---

## 2. Player has zero height

**Cause:** percentage-height children need a sized parent.

**Fix:**

```css
universal-player,
.player-host {
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
}
```

For audio, set a fixed `block-size` or `min-height`.

---

## 3. Black screen or no playback

**Cause:** unsupported codec, CORS, wrong MIME, 404, or a browser autoplay block.

**Diagnose:**

```ts
player.on("error", ({ error }) => console.error(error));
console.log(player.state.status, player.state.error);
console.log(player.state.capabilities);
```

**Fix:**

- Open the media URL directly in a tab; if it fails there, it is not the player.
- Verify `Content-Type`.
- Check CORS headers (including `Range`).
- Try `muted: true` for autoplay.
- For HLS/DASH, install the peer.

---

## 4. HLS/DASH fails

**Cause:** missing peer, missing CORS on segments, or an unsupported manifest.

**Diagnose:** the network panel shows the manifest 200 but segments blocked or 404.

**Fix:**

```bash
pnpm add hls.js
pnpm add dashjs
```

- Add CORS to **every** segment, not just the manifest.
- Use the correct MIME (`application/vnd.apple.mpegurl`, `application/dash+xml`).
- Check that the manifest URLs are absolute or correctly relative.

---

## 5. Controls unstyled

**Cause:** light DOM without the stylesheet.

**Fix:**

```html
<script type="module">
  import "@codewithrajat/universal-player";
  import "@codewithrajat/universal-player/styles.css";
</script>

<universal-player shadow="light" ...></universal-player>
```

Or add the `inject-styles` attribute. In Shadow DOM mode this should not happen.

---

## 6. Autoplay does not start

**Cause:** browser autoplay policy.

**Fix:**

```ts
createPlayer({ container, source, autoplay: true, muted: true });
```

Or wait for a user gesture and call `player.play()`. A rejected autoplay is not
reported as an error.

---

## 7. Captions missing

**Cause:** wrong track URL, CORS, wrong language id, or captions disabled.

**Diagnose:**

```ts
console.log(player.state.textTracks);
console.log(player.state.textTrack);
```

**Fix:**

- Put `default: true` on one track or call `setTextTrack(id)`.
- Ensure the VTT is served as `text/vtt` with CORS.
- For cross-origin media, set `crossorigin`/`crossOrigin`.

---

## 8. Seek is ignored or jumps

**Cause:** the server does not support range requests, or the media is live.

**Fix:**

- Enable `Accept-Ranges: bytes` and `206 Partial Content`.
- For live, use `seekableRange()` and seek within it.
- `seek()` clamps negative values to `0`.

---

## 9. Method throws a `PlayerError`

Every error has a stable `code`:

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";

try {
  await player.play();
} catch (error) {
  if (isPlayerError(error)) {
    console.log(error.code, error.details);
  }
}
```

| Code                      | Likely fix                                           |
| ------------------------- | ---------------------------------------------------- |
| `invalid-state`           | Load a source first; check playlist gating.          |
| `invalid-argument`        | Bad container, empty source/list, or survey answers. |
| `unsupported-source`      | PiP on non-video, unsupported provider.              |
| `unsupported-environment` | Fullscreen/PiP/object URLs unavailable.              |
| `network-error`           | CORS, 404, offline.                                  |
| `media-error`             | Codec/decoder failure.                               |
| `aborted`                 | A newer load superseded the old one.                 |
| `destroyed`               | You called a method after `destroy()`.               |
| `not-implemented`         | Ad stub used without an SDK.                         |

---

## 10. Memory grows after navigation

**Cause:** players not destroyed.

**Fix:** call `player.destroy()` on unmount. Framework adapters do it
automatically; vanilla/core users must do it manually.

Check for detached `<video>` nodes in DevTools → Memory.

---

## 11. Survey does not open

**Cause:** wrong trigger, `once` already consumed, no questions, or
`maxAttempts` reached.

**Diagnose:**

```ts
console.log(player.activeSurvey);
console.log(player.state.survey, player.state.surveyOpen);
await player.openSurvey(true); // force
```

**Fix:**

- `trigger: "manual"` requires `openSurvey()`.
- `once: true` + same `id` suppresses repeat opens.
- Unknown source + survey provider may reject; handle the promise.
- `required: true` prevents closing, not opening.

---

## 12. Next is blocked

**Cause:** `requireCompletion`, `allowNext: false`, or no next item.

**Diagnose:**

```ts
console.log(player.playlistStatus);
```

**Fix:** set `requireCompletion: false`, or wait for `ended`, or call
`playPlaylistItem(index)` after completion. With `loop: false`, the last item
returns `null`.

---

## 13. TypeScript cannot resolve the entry

**Cause:** older `moduleResolution`, missing `types` condition, or a stale
install.

**Fix:**

- Use `moduleResolution: "Bundler"`, `"Node16"` or `"NodeNext"`.
- Reinstall and clear the bundler cache.
- Do not deep-import `dist/`.

---

## 14. `document is not defined` during SSR

**Cause:** constructing the player on the server.

**Fix:** use a client-only boundary (`dynamic(..., { ssr: false })`,
`<ClientOnly>`, `onMount`, `isPlatformBrowser`). See
[Browser support](./browser-support.md#8-ssr-frameworks).

---

## 15. Element attributes do not update

**Cause:** `shadow` is read at mount; structured JSON attributes are parsed at
mount/change but invalid JSON is ignored.

**Fix:** re-create the element for `shadow` changes. Validate JSON.

---

## 16. Multiple players interfere

**Cause:** one `UniversalPlayer` shared by two containers, or duplicate element
registration from two bundles.

**Fix:** one player per container. Registration is idempotent, but two copies of
the package can still create two definitions; deduplicate dependencies.

---

## 17. Themes do not apply

**Cause:** Shadow DOM isolation, or styling the wrong selector.

**Fix:** use CSS custom properties on the host or `::part()`. In light DOM, load
the stylesheet. Do not target internal classes from host CSS in shadow mode.

---

## 18. Analytics callback is not called

**Cause:** no `onEvent` supplied, or `enabled: false`.

**Fix:**

```ts
analytics: { enabled: true, onEvent: (event) => console.log(event) }
```

Remember only `loadedmetadata`, `play`, `pause`, `seeked`, `ended` and `error`
are tracked. Use `player.on("timeupdate")` for continuous progress.

---

## 19. Resume does not restore

**Cause:** `resume.enabled` not `true`, storage blocked, or media shorter than
`minDuration`.

**Fix:** enable it, use a custom `storage` if private mode blocks
`localStorage`, and lower `minDuration`.

---

## 20. Getting help

Include:

- package version
- browser/OS
- entry point (`/core`, `/react`, …)
- minimal reproduction
- `player.state.status`, `player.state.error`, `player.state.capabilities`
- network panel details for streaming

Open an issue with the template in `.github/`. See [Contributing](./contributing.md).

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)