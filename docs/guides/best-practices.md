# Best practices

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Best practices

## Choose the surface deliberately

- Full UI: custom element, no extra chrome.
- Native controls: `controls: "native"` with any headless entry.
- Custom chrome: headless + render from `state`.

Do not assume a framework wrapper gives you the built-in UI.

## Always clean up

```ts
const player = createPlayer({ container, source });
return () => player.destroy();
```

Framework wrappers do this for you; manual mounts do not.

## Use structured sources for ambiguous files

```ts
player.load({ kind: "audio", src: "/voice.ogg" });
```

`.ogg` is classified as video. Explicit `kind` removes the trap.

## Put captions next to the media

Ship WebVTT, set CORS for cross-origin tracks, and set `captions.defaultTrack` rather than mutating the DOM after load.

## Do not download by default

`ui.download` is hidden unless enabled. Keep it that way for rights-managed content; the player cannot enforce DRM.

## Treat embeds as untrusted

- YouTube/Vimeo load third-party code in an iframe.
- Generic embeds are display-only.
- Incoming messages are filtered by source window, not origin.
- Never put secrets in an embed URL.

## Error handling by code

```ts
player.on("error", ({ error }) => {
  if (isPlayerError(error) && error.code === "network-error") showRetry();
});
```

Branch on `code`, never on `message`.

## Test with the browser you ship to

The repository executes a Chromium smoke test. That is not evidence for Safari, Firefox or mobile. Add your own Playwright coverage for the browsers in your support policy.

## Performance

- Lazy-load HLS/DASH only where those formats are possible.
- Prefer one player per page; destroy hidden players.
- Avoid re-creating a player on every render; key source changes through `sourceToken` or a stable value.
- Use `poster` and `preload: "none"` for below-the-fold media.

**Next:** [Performance](./performance-optimization.md)

---

← Previous: [Configuration](./advanced-configuration.md) · Next: [Performance](./performance-optimization.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
