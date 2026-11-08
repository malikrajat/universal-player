# FAQ (nested index)

> [Docs home](../README.md) › [FAQ](./README.md) › FAQ (nested index)

The canonical FAQ is [`../faq.md`](../faq.md) and the project FAQ is [`../project/faq.md`](../project/faq.md). This nested page answers the questions that most often come from the other documentation sets.

## "Is this the PDF viewer?"

No. The package is a media player. The paths under `docs/api/` use the PDF viewer's filenames for cross-repository consistency, but every page documents `<universal-player>`, `UniversalPlayer` and media formats.

## "Why does the demo show a video with no controls?"

If you use `/react`, `/vue`, `/angular`, `/svelte*`, `/vanilla` or `/core`, you get the headless surface. Import the root or `/ui` and render `<universal-player>`, or set `controls: "native"`.

## "Why is the npm install failing?"

The package is unreleased at `0.0.1`. Install from the folder or a tarball.

## "Can I use it with documents?"

No. It plays video, audio, images and iframes. It does not render PDF, Office, EPUB or archives.

## "Can I add my own engine?"

Not through a public API. `createEngine()` is internal and the provider union is closed. Fork/patch if you need a new engine.

## "Does it support HLS on Safari?"

The HLS engine falls back to native HLS when `hls.js` reports no support. Safari's native path is coded but not executed by this repository's Chromium-only test. Verify on your target Safari.

## "Is there a React Native version?"

No.

## "Where are the runnable apps?"

`_examples/` contains Vite and Angular apps. `examples/` is the Markdown example book.

## "What should I read first?"

[Getting started](../getting-started/introduction.md) → [First example](../getting-started/first-example.md) → [Framework guide](../guides/frameworks.md).

**Canonical guide:** [FAQ root](../faq.md) · [Troubleshooting](../troubleshooting.md)

---

← Previous: [Styling issues](../troubleshooting/styling-issues.md)

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
