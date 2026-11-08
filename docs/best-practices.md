# Best practices

> [Docs home](./README.md) � Best practices

[← Docs](./README.md) · [Performance](./performance-optimization.md) · [Troubleshooting](./troubleshooting.md)

Patterns that hold up in production. Each recommendation explains the failure
mode it prevents.

---

## 1. Give the host a size

The player fills its container. A percentage-height child inside an auto-height
parent collapses to zero.

```css
.player {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
```

Use `aspect-ratio` for video, a fixed height for audio, and `min-height` for
images.

---

## 2. Choose the lowest API level that fits

| Need                                        | Use                           |
| ------------------------------------------- | ----------------------------- |
| Complete UI, any page                       | `<universal-player>`          |
| Complete UI inside React/Vue/Angular/Svelte | `<universal-player>` after `/ui` |
| Headless playback in a framework            | Framework adapter             |
| Your own buttons                            | `/core` or the framework hook |
| No UI at all                                | `/core`                       |

Do not re-implement the built-in custom-element surface unless you need a fundamentally different interaction model. It already handles adaptive controls, captions menus, gestures, surveys, sleep timer and ARIA. Framework adapters do not include it.

---

## 3. Always destroy

```ts
useEffect(() => {
  const player = createPlayer({ container, source });
  return () => player.destroy();
}, []);
```

`destroy()` releases the engine, timers, document listeners and object URLs.
Skipping it leaks memory on route changes and in tests.

Framework adapters already do this. If you use the vanilla mount or core
directly, you own it.

---

## 4. Do not recreate on every render

```ts
// Bad: new player every render
return <UniversalPlayer key={Math.random()} source={src} />;

// Good: stable key, adapter reloads on source change
return <UniversalPlayer source={src} />;
```

The React adapter keys source changes through `sourceToken()`, so equivalent
URLs do not reload. Recreating the component destroys the engine and loses
playback position.

---

## 5. Keep hot callbacks cheap

`onEvent` fires for `timeupdate` and `progress`. Do not do expensive work there.

```ts
// Good
player.on(
  "timeupdate",
  throttle(({ currentTime }) => updateBar(currentTime), 250),
);

// Also good: use analytics for product telemetry
analytics: {
  onEvent: (event) => queue.push(event);
}
```

`statechange` is the right hook for full re-renders; it fires only on meaningful
transitions.

---

## 6. Load optional peers only where used

HLS/DASH are dynamically imported. Keep streaming sources on routes that need
them so the SDK is not fetched on every page.

```ts
// Only the live route imports hls.js at runtime
const player = createPlayer({ container, source: "/live/index.m3u8" });
```

Do not import `hls.js` yourself just to pass it in; the adapter owns the lazy
import.

---

## 7. Prefer same-origin or CORS-complete media

The most common production failure is a manifest that loads while segments do
not. Verify:

- `Access-Control-Allow-Origin` on the manifest **and** every segment.
- Correct `Content-Type` for `.m3u8` (`application/vnd.apple.mpegurl`) and
  `.mpd` (`application/dash+xml`).
- Range requests enabled for MP4 seeking.

---

## 8. Gate navigation in the core, not just in CSS

```ts
playlist: { requireCompletion: true, allowPrevious: false }
```

Hiding buttons is not enforcement. The core checks the same rules for keyboard
shortcuts and programmatic `next()` calls.

---

## 9. Validate survey answers on both sides

```ts
import { validateSurveyAnswers } from "@codewithrajat/universal-player";

player.on("surveysubmit", ({ survey, answers, result }) => {
  const issues = validateSurveyAnswers(survey, answers);
  if (issues.length > 0) return;
  void send(result);
});
```

Server-side validation is still required. The client-side rules prevent bad UX,
not malicious clients.

---

## 10. Make analytics privacy-safe

- Do not send raw URLs containing tokens; strip query strings.
- Do not send survey free-text without consent.
- `analytics: { enabled: false }` is the runtime kill switch.
- `resume` and `captions.persist` write to local storage; document it.

See [Privacy & GDPR](./privacy-gdpr.md).

---

## 11. Pin peer ranges in your app

The package declares wide ranges. Your lockfile should pin exact versions of
`hls.js`, `dashjs`, React/Vue/Angular/Svelte. Test upgrades in CI.

---

## 12. Use `controls="native"` deliberately

Native controls are a good fallback for constrained environments and embedding.
But they do not expose surveys, chapters, playlist gating, stats or the share
sheet. Do not mix expectations.

---

## 13. Theme with tokens, not overrides

```css
/* Good: token */
universal-player {
  --up-color-accent: #22c55e;
}

/* Fragile: reaching into shadow internals */
```

Use `::part()` for structure and tokens for colour/shape. Avoid `!important`
rules against internal classes.

---

## 14. Choose the right DOM mode

- Shadow DOM (default): isolation, built-in styles, `::part()`.
- Light DOM: integrate with an existing design system, but you must load
  `styles.css`.

Do not toggle `shadow` at runtime; it is read at mount.

---

## 15. Test the actual states

Write tests for:

- `idle` before load
- `loading`/`ready`
- play/pause/seek
- `ended` → replay
- error → retry
- destroy → methods throw `destroyed`
- playlist gating
- survey validation

See [Testing](./testing.md).

---

## 16. Accessibility is not optional

- Keep visible focus.
- Do not remove labels.
- Test with keyboard only.
- Respect `prefers-reduced-motion`.
- Check contrast after changing the accent.

See [Accessibility](./accessibility.md).

---

## 17. Prefer declarative config for content teams

JSON attributes let CMS authors configure chapters, playlists and surveys
without a code change. Validate the JSON in your CMS or tests; the player
ignores malformed JSON silently.

---

## 18. Handle autoplay rejection

```ts
const player = createPlayer({ container, source, autoplay: true, muted: true });

player.on("play", () => hidePlayOverlay());
```

If autoplay is blocked, the player stays paused and the UI shows the play
button. Do not treat this as an error.

---

## 19. Keep one player per surface

Multiple players on one page are supported, but each owns an engine and its own
state. Do not share one `UniversalPlayer` across two containers.

---

## 20. Version and changelog discipline

- Add a changeset for every user-visible change.
- Update docs in the same PR.
- Treat a removed export, option or event as breaking.
- Follow [Versioning](./versioning-and-breaking-changes.md).

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)