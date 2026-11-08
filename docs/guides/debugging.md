# Debugging

> [Docs home](../README.md) › [Guides](./core-concepts.md) › Debugging

## Start with state

```ts
console.log(player.state);
```

| Field | Tells you |
| --- | --- |
| `status` | `idle`, `loading`, `ready`, `playing`, `paused`, `ended`, `error` |
| `kind` / `source` | What the player thinks it loaded |
| `capabilities` | Which controls/APIs the engine advertises |
| `error` | The last failure, with `code` |
| `playlist` | Index, gating, completion |
| `qualities` / `textTracks` | What the engine actually discovered |

## Then the source decision

```ts
import { normalizeSource } from "@codewithrajat/universal-player/core";

const normalized = normalizeSource("/media/clip.ogg");
console.log(normalized.kind, normalized.provider, normalized.mimeType, normalized.extension);
```

If `kind` is wrong, the engine is wrong. Use a structured source.

## Events

```ts
player.onEvent = undefined; // constructor-only option; subscribe instead
for (const type of ["loadstart", "loadedmetadata", "error", "stalled", "waiting"] as const) {
  player.on(type, (detail) => console.log(type, detail));
}
```

There is no `stalled` event. Use `waiting` and `progress` for buffer stalls.

## UI-specific

- Controls missing? You are on a headless entry, or capabilities hide them.
- Styles missing? Light DOM without `styles.css`/`inject-styles`.
- Menus not opening? Check `ui.controls`/`hide` and whether the section has data.
- Keyboard not working? Focus must be inside the element; shortcuts are off in form fields.

## Network

- HLS: inspect manifest + segment requests; a fatal hls.js error becomes `network-error`.
- DASH: inspect `.mpd` + segments; missing `dashjs` fails at import.
- Embeds: inspect iframe requests and console messages; third-party blocking looks like a blank frame.

## Stats for nerds

The built-in UI's stats sheet reads resolution, frames, buffer, quality, tracks and network values that the browser exposes. Missing values are omitted; it is not a packet analyser.

## Reproduce in the repo

```bash
pnpm test
pnpm run test:browser
```

Browser tests run Chromium only.

**Next:** [Theme design](./theme-design.md)

---

← Previous: [SSR](./ssr.md) · Next: [Theme design](./theme-design.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
