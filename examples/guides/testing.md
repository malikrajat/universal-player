# Testing

> [Examples home](../README.md) › [Production guides](./README.md) › Testing

## Layers

| Layer | Tools | What to test |
| --- | --- | --- |
| Pure helpers | Vitest/Node | `normalizeSource`, `sourceToken`, errors, quality |
| Component | jsdom/Vitest | mount/unmount, source swap, destroyed guard |
| Browser | Playwright | play/pause/seek, captions, fullscreen (where available) |
| Framework | your framework test runner | prop/reactivity/lifecycle |
| Accessibility | manual + axe (your choice) | labels, focus, keyboard |
| Security | review | CSP, URL handling, embed allow-list |

## Unit examples

```ts
import { normalizeSource, sourceToken, isPlayerError } from "@codewithrajat/universal-player/core";

expect(normalizeSource("/a.m3u8").provider).toBe("hls");
expect(normalizeSource({ kind: "audio", src: "/a.ogg" }).kind).toBe("audio");
expect(sourceToken("a")).toBe(sourceToken("a"));
```

## Browser example

```ts
test("plays", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play" }).click();
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
});
```

## What not to assert

- Third-party embed internals.
- Exact pixel layout.
- Codec support across browsers.
- A11y conformance from one axe run.

## CI checklist

- [ ] `pnpm run check`
- [ ] `pnpm run typecheck`
- [ ] `pnpm test`
- [ ] `pnpm run build`
- [ ] `pnpm run test:browser`
- [ ] Link checker for docs/examples
- [ ] Your app's browser matrix

## Related

[docs/testing.md](../../docs/testing.md) · [Shared security/testing](../shared/security-and-testing.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
