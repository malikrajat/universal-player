# Troubleshooting

> [Examples home](../README.md) › [Production guides](./README.md) › Troubleshooting

## Diagnostic sequence

1. Is the published package installed from npm?
2. Which entry did you import?
3. What does `normalizeSource(source)` return?
4. What is `player.state.kind` / `provider`?
5. What is `state.status` and `state.error.code`?
6. Does the network panel show the media request and MIME?
7. Can the browser decode the codec/container?

## Symptom table

| Symptom | Fix |
| --- | --- |
| No controls | Use custom element or `controls: "native"` |
| Unstyled light DOM | Import `styles.css` or `inject-styles` |
| Cannot resolve package | Install the published package from npm |
| Missing hls.js/dashjs | Install the peer |
| Immediately `media-error` | Remux MOV/MKV; check codec |
| HLS `network-error` | CORS/manifest/segment |
| Captions absent | CORS + `text/vtt` |
| PiP throws | Audio/image; branch on kind |
| Survey absent | `once` stored or wrong trigger |
| Playlist next throws | Gating/allowNext |
| `destroyed` | Stop using instance |
| SSR `document` | Client-only mount |

## Diagnostic snippet

```ts
player.on("error", ({ error }) => console.error((error as any).code, (error as any).details));
console.table(player.state.capabilities);
console.log(player.state.kind, player.state.status, player.state.error);
```

## Related

[Errors](../errors.md) · [docs/troubleshooting.md](../../docs/troubleshooting.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
