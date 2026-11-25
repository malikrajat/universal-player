# Troubleshooting

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Troubleshooting

## 60-second triage

1. Is `0.0.1` installed from npm (`npm ls @codewithrajat/universal-player`)?
2. Did you import the root or `/ui` for the built-in UI?
3. Is `normalizeSource()` returning the kind/provider you expect?
4. Does the network panel show the media request and the right MIME type?
5. Is `state.error.code` one of the nine stable codes?
6. Is the browser able to decode the container/codec?

## Symptom → cause → fix

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Tag renders, no controls | Headless entry with `controls: "custom"` | Import root/`/ui`; or `controls: "native"` |
| Controls unstyled | Light DOM without CSS | Import `styles.css` or add `inject-styles` |
| `npm install` cannot find the package | Wrong version pin, registry mirror/offline, or stale cache | `npm view @codewithrajat/universal-player version` → `0.0.1`; clear cache; pin `0.0.1` |
| `Cannot find module .../core` | Missing install or stale cache | Reinstall `@codewithrajat/universal-player@0.0.1` from npm; clear cache |
| `hls.js` not found | Peer missing for `.m3u8` | `pnpm add hls.js` |
| `dashjs` not found | Peer missing for `.mpd` | `pnpm add dashjs` |
| `media-error` immediately | Container/codec unsupported (MOV/MKV) | Remux to MP4/WebM |
| `network-error` on HLS | Fatal manifest/segment failure | Check CORS, URLs, auth |
| Captions empty | Track CORS or wrong MIME | Serve `.vtt` as `text/vtt`, allow CORS |
| PiP throws `unsupported-source` | Audio or image | Branch on kind |
| Fullscreen throws | API blocked/absent | Fallback UI |
| Survey never opens | `once` already shown, or wrong trigger | Clear storage; check `trigger` |
| Playlist next throws | Gated or disabled | Inspect `state.playlist` |
| `destroyed` errors | Method after `destroy()` | Stop using the instance |
| SSR `document is not defined` | Rendering on the server | Client-only mount |

## Diagnostic snippet

```ts
player.on("error", ({ error }) => {
  console.error("code:", (error as { code?: string }).code, "details:", (error as { details?: unknown }).details, error);
});
console.table(player.state.capabilities);
console.log(player.state.kind, player.state.status, player.state.error);
```

## Still stuck?

Collect: version `0.0.1`, entry used, source shape, browser, `state`, `error.code`, and whether HLS/DASH peers are installed. See [Common errors](../troubleshooting/common-errors.md).

**Canonical guide:** [Troubleshooting root](../troubleshooting.md)

---

← Previous: [Theme design](./theme-design.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
