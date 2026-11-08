# Recipes

> [Examples home](../README.md) › Recipes

Numbered, single-task recipes. Each is framework-neutral; the framework pages show the same task in context.

| # | Task | Solves |
| --- | --- | --- |
| 01 | [Upload and preview](./01-upload-and-preview.md) | Load a File and show a preview with the right kind. |
| 02 | [URL, auth and CORS](./02-url-auth-cors.md) | Play a signed or cookie-protected URL and understand CORS failures. |
| 03 | [Dynamic source swap](./03-dynamic-source-swap.md) | Replace media without recreating the player. |
| 04 | [Custom chrome](./04-custom-chrome.md) | Build your own control bar from state. |
| 05 | [Captions and chapter navigation](./05-captions-and-navigation.md) | Provide captions and chapters, then navigate by chapter. |
| 06 | [Image intake](./06-image-intake.md) | Preview and inspect an uploaded image. |
| 07 | [Chapters and review notes](./07-chapters-and-review.md) | Capture a note at the current time and seek back. |
| 08 | [Survey and quiz](./08-survey-and-quiz.md) | Open a feedback form at the end and submit to your API. |
| 09 | [Quality and adaptation](./09-quality-and-adaptation.md) | Expose a quality menu for HLS/DASH. |
| 10 | [HLS and DASH](./10-hls-dash.md) | Install the SDKs and load manifests. |
| 11 | [SSR and teardown](./11-ssr-and-teardown.md) | Mount client-side and clean up on route change. |
| 12 | [Testing](./12-testing.md) | Test routing, state and error recovery. |
| 13 | [Multiple players](./13-multiple-players.md) | Run independent players on one page. |
| 14 | [Download workaround](./14-download.md) | Offer a download action only when allowed. |
| 15 | [Error recovery](./15-error-recovery.md) | Retry once and then show a fallback. |
| 16 | [Large files and performance](./16-large-files-performance.md) | Reduce startup cost for long media. |

## Conventions

- `host` is a resolved `HTMLElement`.
- `source` / `URL` are placeholders.
- Headless examples set `controls: "native"`.
- Every session calls `destroy()`.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
