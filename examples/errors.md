# Errors

> [Examples home](./README.md) › Errors

Every failure is a plain `Error` with a stable `code` and frozen `details`. Do not match on `message`.

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";

player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  console.log(error.code, error.details);
});
```

## The nine codes

| Code | Meaning | Common causes | Recovery | Retry? |
| --- | --- | --- | --- | --- |
| `invalid-argument` | Bad input | container, empty URL/list, bad URL, playlist index, survey answers, missing embed id, selector miss | Fix the call; read `details` | no |
| `invalid-state` | Wrong lifecycle state | `play()` without media, gated playlist, no active survey | Load first; check `state.playlist` | no |
| `unsupported-source` | Operation does not fit the kind | PiP on audio/image | Branch on kind | no |
| `unsupported-environment` | Browser API missing | fullscreen/PiP/object URLs/HLS support | Fallback | no |
| `network-error` | Fatal HLS failure | manifest/segment/CORS | Fix network; retry | yes |
| `media-error` | Media/image/chunk/SDK failure | codec, 404, MSE append, missing peer | Remux/fix/install; retry | yes |
| `aborted` | Reserved | no public emitter in 0.0.1 | treat as cancel | n/a |
| `destroyed` | Method after teardown | stale timer/route | stop using instance | no |
| `not-implemented` | Scaffolded feature | ad SDK adapter absent | do not call | no |

## Code example

```ts
let tried = false;
player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  if (!tried && (error.code === "network-error" || error.code === "media-error")) {
    tried = true;
    void player.retry().catch(() => showFallback(error.code));
    return;
  }
  showFallback(error.code);
});
```

## Per-format failure table

| Format | Likely code | Why |
| --- | --- | --- |
| MP4/WebM | `media-error` | codec/container/404 |
| MOV/MKV | `media-error` | browser cannot demux |
| HLS | `network-error`, `unsupported-environment`, `media-error` | fatal stream, no HLS, missing hls.js |
| DASH | `media-error` | missing dashjs/stream failure |
| MP3/M4A/WAV/FLAC/AAC | `media-error` | codec/404 |
| Ogg | `media-error` | wrong element kind |
| Images | `media-error` | decode/404 |
| YouTube/Vimeo | `invalid-argument` | no id in URL |
| Generic embed | `media-error` | iframe load failure |
| Chunked | `media-error`, `unsupported-environment`, `invalid-argument` | empty/append/no object URL/missing type |

## Error-handling checklist

- [ ] Branch on `code`.
- [ ] Log `details` without secrets or signed URLs.
- [ ] Cap retries.
- [ ] Distinguish autoplay rejection (silent) from failure.
- [ ] Treat `destroyed` as a teardown race, not a user error.
- [ ] Do not retry `invalid-argument` or `unsupported-source`.
- [ ] Show a fallback for `unsupported-environment`.

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
