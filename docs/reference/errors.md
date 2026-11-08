# Error codes and recovery

> [Docs home](../README.md) › [Reference](./README.md) › Error codes and recovery

Errors are plain `Error` objects with a stable, enumerable `code` and a frozen `details` object. Branch on `code`, never on `message`.

```ts
interface PlayerError extends Error {
  readonly code: PlayerErrorCode;
  readonly details: Readonly<Record<string, unknown>>;
}
```

## The nine codes

| Code | Meaning | Typical cause | Recovery |
| --- | --- | --- | --- |
| `invalid-argument` | A required value is missing or malformed (container, URL, playlist index, survey answers) | Fix the call; check `error.details` | no |
| `invalid-state` | The operation cannot run in the current lifecycle state (no media, gated playlist advance, survey not active) | Load media first; check `state.playlist`; open a survey | sometimes (playlist gating) |
| `unsupported-source` | The requested operation does not fit the current media kind (for example PiP on audio) | Feature-detect / branch on `state.kind` | no |
| `unsupported-environment` | The browser lacks the API (fullscreen, PiP, object URLs) or HLS is unsupported | Provide a fallback UI | no |
| `network-error` | A fatal HLS error was reported by hls.js | Retry, check CORS/manifest | yes (`retry()`) only for load errors |
| `media-error` | The media element, image, chunk append or a lazily imported engine failed | Retry, verify codec/container/peer install | yes (`retry()`) for load errors |
| `aborted` | Reserved code; no public API emits it in 0.0.1 | Treat as cancelled if it appears from consumer code | n/a |
| `destroyed` | A method was called after `destroy()` | Stop using the instance; create a new player | no |
| `not-implemented` | A scaffolded contract was invoked (ad SDK adapter) | Do not call until an SDK adapter is wired | no |

## Where each code is raised

| Code | Raised by |
| --- | --- |
| `invalid-argument` | missing container, empty source string/list, invalid URL, empty playlist, bad survey answers, missing YouTube/Vimeo id, `mountUniversalPlayer` selector miss |
| `invalid-state` | `play()` without media, `retry()` without source, playlist advance gated/disabled, `submitSurvey()` without active survey |
| `unsupported-source` | PiP on non-video |
| `unsupported-environment` | fullscreen/PiP APIs absent, object URLs absent, HLS unsupported |
| `network-error` | fatal HLS error |
| `media-error` | media element error, image load error, chunk append error, failed lazy SDK import, non-player thrown values |
| `aborted` | reserved; no public emitter |
| `destroyed` | any method after `destroy()` |
| `not-implemented` | `createAdController` scheduled playback |

## Per-format failure table

| Format | Likely code | Why |
| --- | --- | --- |
| MP4/WebM | `media-error` | codec/container unsupported or 404 with media MIME |
| MOV/MKV | `media-error` | browser cannot demux |
| HLS | `network-error`, `unsupported-environment`, `media-error` | fatal manifest/segment, no HLS support, missing hls.js |
| DASH | `media-error` | missing dashjs or stream failure |
| MP3/M4A/WAV/FLAC/AAC | `media-error` | codec/NETWORK/404 |
| Ogg | `media-error` | wrong element kind or codec |
| Images | `media-error` | decode failure/404 |
| YouTube/Vimeo | `invalid-argument` | URL has no id |
| Generic embed | `media-error` | iframe load failure (not command failure) |
| Chunked | `media-error`, `unsupported-environment`, `invalid-argument` | empty/append failure, no object URL, missing type |

## Handling pattern

```ts
import { isPlayerError, toPlayerError } from "@codewithrajat/universal-player/core";

player.on("error", ({ error }) => {
  const failure = toPlayerError(error);
  if (!isPlayerError(failure)) return; // defensive; toPlayerError always returns one

  switch (failure.code) {
    case "network-error":
      showRetry(() => player.retry());
      break;
    case "unsupported-environment":
      showFallbackLink();
      break;
    case "destroyed":
      // teardown race; do not retry
      break;
    default:
      report(failure);
  }
});
```

## Important nuances

- `load()` both emits `error` and rejects. A listener plus a `catch` sees the same failure.
- Autoplay rejection is swallowed; it is **not** an error event.
- `error.details` is frozen at creation. Common keys: `field`, `source`, `selector`, `issues`, `code` (MediaError), `details` (hls.js detail).
- `aborted` is reserved; cancellation of an older `load()` is silent.

**Next:** [Browser support](./browser-support.md) · [Errors vs logs](../errors-vs-logs.md)

---

← Previous: [UI and framework APIs](./api-ui-and-frameworks.md) · Next: [Browser support](./browser-support.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
