# Examples — @codewithrajat/universal-player

> [Examples home](./README.md)

A Markdown-only lab book for **`@codewithrajat/universal-player` 0.0.1**: five framework surfaces, 23 media formats/inputs, six features, 16 recipes and 13 use cases. Every page is written against the repository source, not against marketing copy.

> **Status:** published on npm as `@codewithrajat/universal-player@0.0.1`. Install the published package with `npm install @codewithrajat/universal-player`; `npm view @codewithrajat/universal-player version` returns `0.0.1`.

## What is in this folder

| Folder | Contents | Start here |
| --- | --- | --- |
| `shared/` | Cross-framework setup, sources, lifecycle, features, recipes, security/testing | [shared/README.md](./shared/README.md) |
| `guides/` | Production decisions: accessibility, performance, security, SSR, testing, compatibility, configuration, capabilities | [guides/README.md](./guides/README.md) |
| `use-cases/` | End-to-end product scenarios | [use-cases/README.md](./use-cases/README.md) |
| `recipes/` | Numbered copy-paste tasks | [recipes/README.md](./recipes/README.md) |
| `vanilla/` `react/` `vue/` `angular/` `svelte/` | Six core pages + format pages + feature pages per framework | [vanilla/README.md](./vanilla/README.md) |
| `assets/` | Fixture and asset conventions | [assets/README.md](./assets/README.md) |

## The one rule that prevents most bugs

**Only `<universal-player>` renders the built-in control bar.** The framework adapters, `mountUniversalPlayer()` and `createPlayer()` are headless: they mount a media element and expose state. Use `controls: "native"` for browser controls, mount the custom element for the full UI, or build custom chrome from `state`.

## Pick your framework

| Framework | Entry | Runtime | Start here | Basic | Advanced | Customization | Edge cases | Failures |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Vanilla | `/vanilla (headless helper) or /ui (custom element)` | Any evergreen browser with ESM + Custom Elements | [README](./vanilla/README.md) | [Basic](./vanilla/basic-usage.md) | [Advanced](./vanilla/advanced-usage.md) | [Customize](./vanilla/customization.md) | [Edge](./vanilla/edge-cases.md) | [Failures](./vanilla/failure-cases.md) |
| React | `/react (component + hook) or /ui (custom element)` | React 18/19 client rendering | [README](./react/README.md) | [Basic](./react/basic-usage.md) | [Advanced](./react/advanced-usage.md) | [Customize](./react/customization.md) | [Edge](./react/edge-cases.md) | [Failures](./react/failure-cases.md) |
| Vue | `/vue (component + composable) or /ui (custom element)` | Vue 2.7 Composition API or Vue 3 | [README](./vue/README.md) | [Basic](./vue/basic-usage.md) | [Advanced](./vue/advanced-usage.md) | [Customize](./vue/customization.md) | [Edge](./vue/edge-cases.md) | [Failures](./vue/failure-cases.md) |
| Angular | `/angular (controller) or /ui (custom element)` | Angular 17+ standalone components | [README](./angular/README.md) | [Basic](./angular/basic-usage.md) | [Advanced](./angular/advanced-usage.md) | [Customize](./angular/customization.md) | [Edge](./angular/edge-cases.md) | [Failures](./angular/failure-cases.md) |
| Svelte | `/svelte4 or /svelte5 (component) or /ui (custom element)` | Svelte 4 or Svelte 5 | [README](./svelte/README.md) | [Basic](./svelte/basic-usage.md) | [Advanced](./svelte/advanced-usage.md) | [Customize](./svelte/customization.md) | [Edge](./svelte/edge-cases.md) | [Failures](./svelte/failure-cases.md) |

## Pick a format

| Format | Extensions / input | Adapter id | Unit | Status | Start here |
| --- | --- | --- | --- | --- | --- |
| MP4 / M4V | .mp4, .m4v | `native` | `<video>` | Implemented; codec support is the browser's | [MP4 / M4V](./vanilla/formats/mp4.md) |
| WebM | .webm | `native` | `<video>` | Implemented; codec support is the browser's | [WebM](./vanilla/formats/webm.md) |
| QuickTime MOV | .mov | `native` | `<video>` | Detected and routed to native; playback is browser-dependent | [QuickTime MOV](./vanilla/formats/mov.md) |
| Matroska MKV | .mkv | `native` | `<video>` | Recognised, not decoded by mainstream browsers | [Matroska MKV](./vanilla/formats/mkv.md) |
| HLS (.m3u8) | .m3u8 | `hls` | `<video>` + hls.js or native HLS | Implemented; requires `hls.js` or native HLS | [HLS (.m3u8)](./vanilla/formats/hls.md) |
| MPEG-DASH (.mpd) | .mpd | `dash` | `<video>` + dash.js | Implemented; requires `dashjs` | [MPEG-DASH (.mpd)](./vanilla/formats/dash.md) |
| MP3 | .mp3 | `native` | `<audio>` | Implemented | [MP3](./vanilla/formats/mp3.md) |
| M4A / AAC audio | .m4a | `native` | `<audio>` | Implemented; codec support is the browser's | [M4A / AAC audio](./vanilla/formats/m4a.md) |
| WAV | .wav | `native` | `<audio>` | Implemented | [WAV](./vanilla/formats/wav.md) |
| FLAC | .flac | `native` | `<audio>` | Implemented; browser codec support varies | [FLAC](./vanilla/formats/flac.md) |
| Ogg / Oga | .ogg, .oga, .ogv | `native` | `<audio>` or `<video>` | Implemented with an extension-based kind trap | [Ogg / Oga](./vanilla/formats/ogg.md) |
| AAC (raw) | .aac | `native` | `<audio>` | Implemented where the browser decodes raw ADTS | [AAC (raw)](./vanilla/formats/aac.md) |
| JPEG | .jpg, .jpeg | `image` | `<img>` | Implemented | [JPEG](./vanilla/formats/jpg.md) |
| GIF | .gif | `image` | `<img>` | Implemented; animation is browser-controlled | [GIF](./vanilla/formats/gif.md) |
| PNG | .png | `image` | `<img>` | Implemented | [PNG](./vanilla/formats/png.md) |
| WebP | .webp | `image` | `<img>` | Implemented; browser decode support | [WebP](./vanilla/formats/webp.md) |
| SVG | .svg | `image` | `<img>` | Implemented with a security caveat | [SVG](./vanilla/formats/svg.md) |
| AVIF | .avif | `image` | `<img>` | Implemented; browser decode support | [AVIF](./vanilla/formats/avif.md) |
| YouTube | YouTube URL | `youtube` | `<iframe>` | Implemented with postMessage sync | [YouTube](./vanilla/formats/youtube.md) |
| Vimeo | Vimeo URL | `vimeo` | `<iframe>` | Implemented with postMessage sync | [Vimeo](./vanilla/formats/vimeo.md) |
| Generic iframe embed | Any non-YouTube/Vimeo URL passed as `{ kind: "embed" }` | `generic-embed` | `<iframe>` | Implemented; no command bridge | [Generic iframe embed](./vanilla/formats/embed.md) |
| Chunked / streamed media | No extension; `ChunkedSource` | `chunked` | `MediaSource` + `<video>`/`<audio>`, or Blob + `<img>` | Implemented | [Chunked / streamed media](./vanilla/formats/chunked.md) |
| Blob and File | No extension | `native or image` | Object URL + `<video>`/`<audio>`/`<img>` | Implemented | [Blob and File](./vanilla/formats/blob.md) |

All 23 formats exist in every framework folder, for example [React MP4](./react/formats/mp4.md) or [Angular HLS](./angular/formats/hls.md).

## Pick a task

| Task | Recipe |
| --- | --- |
| Upload and preview | [01-upload-and-preview](./recipes/01-upload-and-preview.md) |
| URL, auth and CORS | [02-url-auth-cors](./recipes/02-url-auth-cors.md) |
| Dynamic source swap | [03-dynamic-source-swap](./recipes/03-dynamic-source-swap.md) |
| Custom chrome | [04-custom-chrome](./recipes/04-custom-chrome.md) |
| Captions and chapter navigation | [05-captions-and-navigation](./recipes/05-captions-and-navigation.md) |
| Image intake | [06-image-intake](./recipes/06-image-intake.md) |
| Chapters and review notes | [07-chapters-and-review](./recipes/07-chapters-and-review.md) |
| Survey and quiz | [08-survey-and-quiz](./recipes/08-survey-and-quiz.md) |
| Quality and adaptation | [09-quality-and-adaptation](./recipes/09-quality-and-adaptation.md) |
| HLS and DASH | [10-hls-dash](./recipes/10-hls-dash.md) |
| SSR and teardown | [11-ssr-and-teardown](./recipes/11-ssr-and-teardown.md) |
| Testing | [12-testing](./recipes/12-testing.md) |
| Multiple players | [13-multiple-players](./recipes/13-multiple-players.md) |
| Download workaround | [14-download](./recipes/14-download.md) |
| Error recovery | [15-error-recovery](./recipes/15-error-recovery.md) |
| Large files and performance | [16-large-files-performance](./recipes/16-large-files-performance.md) |

## Which example should I start with?

| You are… | Start with | Then |
| --- | --- | --- |
| Evaluating the library | [start-here.md](./start-here.md) | [Vanilla basic](./vanilla/basic-usage.md) |
| A React developer | [React README](./react/README.md) | [React MP4](./react/formats/mp4.md) |
| A Vue developer | [Vue README](./vue/README.md) | [Vue HLS](./vue/formats/hls.md) |
| An Angular developer | [Angular README](./angular/README.md) | [Angular advanced](./angular/advanced-usage.md) |
| A Svelte developer | [Svelte README](./svelte/README.md) | [Svelte captions](./svelte/formats/features/captions.md) |
| Building a design-system player | [Custom chrome recipe](./recipes/04-custom-chrome.md) | [Capabilities guide](./guides/capabilities.md) |
| Shipping to production | [Security guide](./guides/security-and-deployment.md) | [Compatibility](./guides/compatibility.md) |
| Migrating from a plain `<video>` | [Migration guide](./guides/migration.md) | [API matrix](./api-matrix.md) |

## The five categories

| Category | Answers | Canonical page |
| --- | --- | --- |
| **Basic** | How do I get this format on screen? | `<framework>/basic-usage.md` |
| **Advanced** | How do I drive it from code? | `<framework>/advanced-usage.md` |
| **Customization** | How do I change the UI, labels and theme? | `<framework>/customization.md` |
| **Edge cases** | What framework/format trap will bite me? | `<framework>/edge-cases.md` |
| **Failure cases** | What breaks, with which code, and how do I recover? | `<framework>/failure-cases.md` |

## How the pages are structured

| Page type | Shape |
| --- | --- |
| Framework README | What you get/do not get, install, full UI, headless, API at a glance, format links |
| Format page | At a glance → basic (full UI + headless) → advanced (options, surface) → customization → edge → failure → limits → checklist → related |
| Feature page | Entry → basic → framework integration → edge → failure → checklist → related |
| Recipe | What it solves → code → why → edge → failures → related |
| Use case | Problem → build → stack → flow → steps → UX → security → failures → checklist → framework links |
| Guide | Decision/checklist-first, linking to shared/format pages |

## Three rules before you copy

1. **You do not create an adapter or engine.** Engine selection is internal and there is no registry. You create a player and choose a source; the provider is derived from the extension, MIME type or host.
2. **Wrappers are not renderers of chrome.** React/Vue/Angular/Svelte wrappers and `mountUniversalPlayer()` mount the core. Use the custom element for the built-in UI.
3. **You own the assets and the server.** HLS/DASH SDKs are optional peers; captions, chapters, thumbnails, posters and signed URLs are yours. The player does not transcode, parse metadata or enforce DRM.

## Directory map

```text
examples/
├─ README.md · SUMMARY.md · start-here.md · learning-paths.md
├─ architecture.md · format-matrix.md · api-matrix.md · api-cheatsheet.md · errors.md
├─ CONTRIBUTING.md · CHANGELOG.md
├─ assets/README.md
├─ shared/            README, adapter-setup, sources-and-lifecycle, features, recipes, security-and-testing
├─ guides/            README + 12 production guides
├─ use-cases/         README + 13 scenarios
├─ recipes/           README + 16 numbered recipes
├─ vanilla/           README, 5 category pages, formats/ (23 + index), features/ (6 + index)
├─ react/             same
├─ vue/               same
├─ angular/           same
└─ svelte/            same
```

## Reading order

1. [start-here.md](./start-here.md) — the mental model and the first integration.
2. [format-matrix.md](./format-matrix.md) — confirm your input is supported for what you expect.
3. Your framework README → basic → format page.
4. [api-cheatsheet.md](./api-cheatsheet.md) — the calls you will actually use.
5. [errors.md](./errors.md) — branch on codes.
6. A use case or recipe that matches your product.

## Version and support notes

- Version `0.0.1`, published on npm, ESM only, browser-only.
- 9 code entry points; 2 asset subpaths.
- 8 engine providers; 9 error codes.
- Declared browser floor: Chrome/Edge 125+, Firefox 128+, Safari 18+. Executed test: Chromium only.
- No DRM, SSR rendering, OCR, document rendering, transcoding or public plugin registry.

## Explicitly unsupported inputs

PDF, DOCX, XLSX, PPTX, EPUB, ZIP, RTF, Markdown documents, camera RAW (beyond browser image decode), DRM-protected media, and any container the browser cannot decode (notably MOV/MKV in most browsers).

## Support and contributing

- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to add or fix an example.
- [CHANGELOG.md](./CHANGELOG.md) — example-book changes.
- Repository docs: [docs/README.md](../docs/README.md).
- Security reports: follow `SECURITY.md`; do not open a public issue with exploit details.

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
