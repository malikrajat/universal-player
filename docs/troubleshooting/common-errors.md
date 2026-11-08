# Common errors

> [Docs home](../README.md) › [Troubleshooting](./common-errors.md) › Common errors

| Message / symptom | Code | Cause | Fix |
| --- | --- | --- | --- |
| "The player requires a container element." | `invalid-argument` | `container` not an `HTMLElement` | Query the element first; check it exists |
| "The media source must not be empty." | `invalid-argument` | Empty string | Provide a URL or source object |
| "The source list must not be empty." | `invalid-argument` | `load([])` | Provide at least one item |
| "The source list must be loaded through the player." | `invalid-argument` | `normalizeSource([...])` | Call `player.load(array)` |
| "No element matches …" | `invalid-argument` | `mountUniversalPlayer` selector miss | Check the selector or pass an element |
| "No media is loaded." | `invalid-state` | `play()`/`retry()` before load | Load first |
| "Complete the current item before advancing." | `invalid-state` | Playlist gating | Wait for `ended` or disable gating |
| "Advancing to the next item is disabled." | `invalid-state` | `allowNext: false` | Enable it |
| "No survey is active." | `invalid-state` | `submitSurvey()` with none | Open one |
| "The survey answers are incomplete." | `invalid-argument` | Required question unanswered | Inspect `details.issues` |
| "Picture-in-Picture requires a video element." | `unsupported-source` | Audio/image | Branch on kind |
| "Fullscreen is not supported in this environment." | `unsupported-environment` | API absent | Fallback |
| "HLS playback is not supported in this browser." | `unsupported-environment` | No hls.js/native HLS | Install hls.js or change delivery |
| "The HLS stream could not be loaded." | `network-error` | Fatal manifest/segment | Check CORS/URLs |
| "The media could not be played." | `media-error` | Codec/container/404 | Remux or fix URL |
| "The image could not be loaded." | `media-error` | 404/decode | Fix URL/format |
| "A media chunk could not be appended." | `media-error` | Bad MSE data/mime | Verify codec and type |
| "The chunked source is empty." | `media-error` | Empty iterator | Provide chunks |
| "Object URLs are not available in this environment." | `unsupported-environment` | No `createObjectURL` | Use URL sources |
| "The player has been destroyed." | `destroyed` | Method after teardown | Stop using it |
| "Ad playback requires an ad SDK adapter." | `not-implemented` | Ad stub invoked | Do not call until wired |

Messages are illustrative; always branch on `code`.

**Canonical guide:** [Errors](../reference/errors.md)

---

← Previous: [Build issues](./build-issues.md) · Next: [Performance issues](./performance-issues.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
