# Failure cases

> [Examples home](../README.md) › [Vanilla](./README.md) › Failure cases

## Failure sources

| Source | Example | Code |
| --- | --- | --- |
| Bad construction | container missing | `invalid-argument` |
| Bad source | empty string, bad URL, empty list | `invalid-argument` |
| Missing media | play before load | `invalid-state` |
| Unsupported operation | PiP on audio | `unsupported-source` |
| Missing browser API | fullscreen/PiP/object URL | `unsupported-environment` |
| Decode/transport | codec, 404, fatal HLS | `media-error`, `network-error` |
| Lifecycle | method after destroy | `destroyed` |
| Scaffolded | ad playback | `not-implemented` |

## Error-handling pattern

```ts
import { isPlayerError } from "@codewithrajat/universal-player/core";

player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  switch (error.code) {
    case "network-error":
    case "media-error":
      showRetry(() => player.retry());
      break;
    case "unsupported-environment":
      showFallback();
      break;
    case "destroyed":
      break;
    default:
      report(error);
  }
});
```

## Per-code recovery

| Code | Do | Do not |
| --- | --- | --- |
| `invalid-argument` | Fix the input and retry manually | Auto-retry |
| `invalid-state` | Load first / check playlist | Ignore |
| `unsupported-source` | Branch on `state.kind` | Force the call |
| `unsupported-environment` | Fallback UI | Promise the API |
| `network-error` | Retry with a cap | Loop |
| `media-error` | Remux/fix URL/install peer | Retry forever |
| `destroyed` | Stop using the instance | Recreate silently in a stale handler |
| `not-implemented` | Remove the call | Ship it |

## Per-format failure table

| Format | Codes |
| --- | --- |
| MP4 / M4V | `media-error`, `unsupported-environment` |
| WebM | `media-error` |
| QuickTime MOV | `media-error` |
| Matroska MKV | `media-error` |
| HLS (.m3u8) | `network-error`, `unsupported-environment`, `media-error` |
| MPEG-DASH (.mpd) | `media-error`, `unsupported-environment` |
| MP3 | `media-error` |
| M4A / AAC audio | `media-error` |
| WAV | `media-error` |
| FLAC | `media-error` |
| Ogg / Oga | `media-error` |
| AAC (raw) | `media-error` |
| JPEG | `media-error` |
| GIF | `media-error` |
| PNG | `media-error` |
| WebP | `media-error` |
| SVG | `media-error` |
| AVIF | `media-error` |
| YouTube | `invalid-argument`, `media-error` |
| Vimeo | `invalid-argument`, `media-error` |
| Generic iframe embed | `media-error` |
| Chunked / streamed media | `invalid-argument`, `media-error`, `unsupported-environment` |
| Blob and File | `invalid-argument`, `unsupported-environment`, `media-error` |

## UI and feature failures

- No controls → headless entry.
- Unstyled → light DOM without CSS.
- Captions absent → CORS/MIME.
- Survey absent → `once`/trigger.
- Playlist next throws → gating.

## Framework error boundary

Wrap mount/load calls in try/catch and attach an `error` listener.

## Cancellation

No `abort()`. Start a new load or destroy.

## Debug checklist

- [ ] `error.code` captured.
- [ ] `state` printed.
- [ ] Source shape checked with `normalizeSource`.
- [ ] Peers installed.
- [ ] Network/CORS checked.
- [ ] Entry/UI track correct.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
