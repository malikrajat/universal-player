# Testing

> [Docs home](./README.md) › Testing

[← Docs](./README.md) · [Contributing](./contributing.md) · [Performance](./performance-optimization.md)

The project uses Vitest for unit tests in jsdom and Vitest browser mode with
Playwright for APIs jsdom cannot model.

---

## 1. Commands

```bash
pnpm run test            # unit, jsdom
pnpm run test:watch      # watch
pnpm run test:coverage   # coverage + thresholds
pnpm run test:browser    # Chromium via Playwright
```

Coverage is scoped to `src/core`, `src/features/quality`,
`src/features/speed` and `src/features/chapters`:

| Metric     | Threshold |
| ---------- | --------- |
| Lines      | 90%       |
| Functions  | 90%       |
| Statements | 90%       |
| Branches   | 80%       |

---

## 2. Test layout

```
tests/
├── setup.ts
├── unit/
│   ├── player.test.ts
│   ├── state.test.ts
│   ├── events.test.ts
│   ├── source.test.ts
│   ├── engines.test.ts
│   ├── features.test.ts
│   ├── element.test.ts
│   ├── experience.test.ts
│   └── ...
└── browser/
    └── ...
```

`tests/setup.ts` installs jsdom shims (for example `matchMedia`,
`ResizeObserver`) before the suite.

---

## 3. What to test

### Core

- `createInitialState()` defaults.
- `load()` with each source shape and provider detection.
- Load races (a newer load wins).
- `play`/`pause`/`seek`/volume/rate clamping.
- `destroy()` idempotence and post-destroy errors.
- Error codes and `details`.
- Object URL revocation.

### Events

- Each event's payload.
- `on`/`once`/`observe` equivalence.
- Listener isolation (a throwing subscriber does not break playback).
- `statechange` not emitted for `timeupdate`.

### Features

- Playlist gating (`requireCompletion`, `allowNext`, `allowPrevious`, loop).
- Survey validation, submission, skip, retake, `once`.
- Captions persistence and default-track resolution.
- Resume read/write/clear with a fake `Storage`.
- Speed/quality/chapter helpers.

### UI element

- Registration idempotence.
- Attribute application.
- Shadow vs light mount.
- Keyboard shortcut mapping.
- Menu open/close and outside-click dismissal.
- Error overlay and retry.

### Browser-only

- Native media metadata/playback.
- Fullscreen/PiP availability paths.
- HLS/DASH loading with real manifests.
- Captions rendering.
- Drag gestures.

---

## 4. Writing a test

```ts
import { describe, expect, it, vi } from "vitest";
import { createPlayer } from "../../src/entries/core.js";

describe("player", () => {
  it("starts idle", () => {
    const container = document.createElement("div");
    const player = createPlayer({ container });

    expect(player.state.status).toBe("idle");
    expect(player.state.volume).toBe(1);

    player.destroy();
  });

  it("rejects play without media", async () => {
    const container = document.createElement("div");
    const player = createPlayer({ container });

    await expect(player.play()).rejects.toMatchObject({ code: "invalid-state" });

    player.destroy();
  });
});
```

Rules:

- Always destroy players you create.
- Use real timers where possible; fake timers only for delays.
- Assert behaviour, not private fields.
- Use `toMatchObject({ code })` for `PlayerError`.
- Keep tests deterministic; no network.

---

## 5. Fakes and shims

| API                     | Approach                                                   |
| ----------------------- | ---------------------------------------------------------- |
| `localStorage`          | In-memory `Storage` object.                                |
| `matchMedia`            | Stub in `tests/setup.ts`.                                  |
| `ResizeObserver`        | Stub.                                                      |
| `HTMLMediaElement.play` | `vi.spyOn` returning a resolved promise.                   |
| `URL.createObjectURL`   | Stub with a counter; assert `revokeObjectURL`.             |
| Fullscreen/PiP          | Define property/method on the element.                     |
| `postMessage` embeds    | Simulate provider messages with the expected origin/shape. |

---

## 6. Browser tests

Use browser mode when the behaviour depends on:

- actual media decoding;
- fullscreen/PiP;
- `srcObject`;
- `MediaSource`/`SourceBuffer`;
- CSS layout or focus;
- HLS/DASH.

Keep browser scenarios small and independent. Do not rely on external networks
in CI; use local fixtures or a controlled server.

---

## 7. Coverage strategy

Coverage is a floor, not a goal. Prefer meaningful assertions over hitting
lines. Avoid testing implementation details that make refactors painful.

When adding a public method, cover:

1. happy path;
2. invalid state;
3. teardown.

---

## 8. Package validation

```bash
pnpm run build
pnpm run check:pack
pnpm run check:imports
pnpm run check:exports
pnpm run check:types
```

These catch:

- missing export targets;
- source/test files leaking into the tarball;
- Node built-ins in browser code;
- invalid `exports`/`types` maps;
- ESM/CJS type mismatches.

---

## 9. Debugging tests

- Use `pnpm run test -- --reporter=verbose`.
- Use `screen.debug()`-style DOM dumps or `console.log(container.innerHTML)`.
- For jsdom media limits, move the assertion to browser mode.
- For flaky timers, prefer `vi.useFakeTimers()` and advance explicitly.

---

## 10. Test checklist

- [ ] Public behaviour covered.
- [ ] Invalid states covered.
- [ ] Destroy/cleanup covered.
- [ ] No leaked listeners/timers.
- [ ] Deterministic.
- [ ] No network.
- [ ] Coverage gate passes.
- [ ] Browser test added when jsdom cannot model it.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)