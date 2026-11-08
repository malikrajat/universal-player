# Browser support

> [Docs home](../README.md) › [Reference](./README.md) › Browser support

## Declared versus executed

| Claim | Status |
| --- | --- |
| Build target ES2023 | Verified in `vite.config.ts` |
| Chrome/Edge 125+ | **Declared** in README; not an automated matrix |
| Firefox 128+ | **Declared**; not executed by this repository |
| Safari 18+ | **Declared**; not executed by this repository |
| Mobile Safari/Chrome | **Not verified** |
| Chromium headless | **Executed** by `tests/browser/smoke.browser.test.ts` |
| jsdom | **Executed** by unit tests |

"Do not claim older browsers are tested" is a documentation rule in this repository. The same applies to the declared floor: it is a floor, not proof.

## Required APIs by feature

| Feature | API | Failure if absent |
| --- | --- | --- |
| Player core | DOM, `HTMLMediaElement` | cannot construct |
| `<universal-player>` | Custom Elements, Shadow DOM | registration returns `false`; no UI |
| Blob/File | `URL.createObjectURL` | `unsupported-environment` |
| Chunked video/audio | `MediaSource` (optional) | Blob fallback in `auto` mode |
| Fullscreen | `Element.requestFullscreen` | `unsupported-environment` |
| PiP | `HTMLVideoElement.requestPictureInPicture` | `unsupported-environment` |
| Native HLS | `canPlayType("application/vnd.apple.mpegurl")` | hls.js or `unsupported-environment` |
| Cast prompt | Remote Playback API | button hidden |
| AirPlay | `webkitShowPlaybackTargetPicker` | helper returns false |
| Resume/survey persistence | `localStorage` | best-effort no-op |

## Codec reality

The player delegates decoding to the browser. H.264/AAC in MP4 is the safest baseline. VP9/AV1/FLAC/ALAC/HEVC support varies by browser, OS and hardware. MOV and MKV are containers, not codecs; most browsers cannot demux them.

## SSR boundary

`/core` imports safely in Node; constructing a player does not. The custom element registration no-ops without `customElements`.

## Testing recommendation

Run your own matrix for the browsers you support. At minimum:

- [ ] Chromium desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Your HLS/DASH path on each

The repository cannot supply evidence for those runs.

**Next:** [Format matrix](./formats-matrix.md)

---

← Previous: [Errors](./errors.md) · Next: [Format matrix](./formats-matrix.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
