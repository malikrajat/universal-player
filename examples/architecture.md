# How this book is organised

> [Examples home](./README.md) › How this book is organised

## One picture

```text
examples/
├─ root pages      vocabulary, matrices, cheatsheets, errors
├─ shared/         framework-neutral setup, sources, features, recipes, security
├─ guides/         production decisions
├─ use-cases/      product-shaped flows
├─ recipes/        single-task copy-paste
└─ <framework>/    README + basic + advanced + customization + edge + failure
                   └─ formats/<format>.md
                   └─ formats/features/<feature>.md
```

## Documentation layers

| Layer | Depth | Changes when |
| --- | --- | --- |
| Root | Orientation | API surface or support status changes |
| Shared | Cross-framework mechanics | Source/feature semantics change |
| Guides | Decisions and checklists | Process/support policy changes |
| Use cases | Product flows | Reference architecture changes |
| Recipes | One task | API usage changes |
| Framework | Idioms and lifecycle | Adapter changes |
| Format | Per-input behaviour | Engine/detection changes |
| Feature | Per-feature behaviour | Feature API changes |

## Category definitions

- **Basic** — the shortest path to a working surface for this format.
- **Advanced** — state, events, tracks, playlist, surveys, conversion of inputs.
- **Customization** — UI, theme, labels, chrome, adapter wrapping.
- **Edge cases** — identity, lifecycle, MIME/extension mismatch, framework traps.
- **Failure cases** — codes, causes, recovery, cancellation.

## Naming and snippets

- `<framework>/formats/<format>.md`: `mp4`, `hls`, `dash`, `mp3`, `jpg`, `youtube`, `chunked`, `blob`.
- Feature files: `captions`, `chapters`, `playlist`, `quality`, `survey`, `resume`.
- Code is TypeScript + ESM; `.vue` and `.svelte` for single-file components.
- Placeholders: `URL`, `source`, `host`, `VIDEO_ID`. Replace them.
- Every headless example sets `controls: "native"` unless it is deliberately chrome-free.

## Load pipeline

```text
source → normalizeSource → provider → engine.load → loadedmetadata → state
```

## Ownership rules

| Asset | Owner |
| --- | --- |
| Media URL | You |
| Object URL from File/Blob | Player (revoked on replace/destroy) |
| MediaStream tracks | You |
| HLS/DASH SDK | Optional peer, installed by you |
| Captions/chapters/thumbnails/posters | You |
| Survey/analytics backend | You |
| Player instance | You (or the framework wrapper) |

## SSR and browser-only boundaries

Everything that constructs a player is browser-only. `/core` is import-safe. The custom element's registration no-ops without `customElements`.

## How the book stays honest

- The status vocabulary is fixed: implemented, conditional, provider-only, display-only, not decodable, scaffolded, absent.
- Format pages state codec/container limits instead of promising playback.
- No WCAG conformance, DRM, OCR or browser-matrix claims.
- The published npm status (`0.0.1`) is repeated wherever installation matters.

## How to add an example

1. Pick the layer (root/shared/guide/use-case/recipe/framework/format/feature).
2. Follow the required section shape.
3. Use real exports only.
4. Add breadcrumb, related links, previous/next.
5. Add it to [SUMMARY.md](./SUMMARY.md).
6. Run the link checker.

## Navigation conventions

- Breadcrumb on every page.
- "Docs home · Documentation index · Summary" footer.
- Previous/next on framework and format pages.
- Format pages link to all sibling formats and the matrix.

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
