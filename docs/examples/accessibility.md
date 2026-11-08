# Accessibility example

> [Docs home](../README.md) › [Examples](./accessibility.md) › Accessibility example

An integration that is keyboard-complete and respects reduced motion. This is not a conformance claim.

```html
<universal-player
  src="/media/clip.mp4"
  label="Quarterly briefing"
  controls="custom"
  ui='{"showBigPlay":true,"showTime":true,"gestures":{"enabled":false}}'
></universal-player>

<p id="transcript">
  <a href="/media/briefing-transcript.html">Read the transcript</a>
</p>
```

```ts
import { registerLocale } from "@codewithrajat/universal-player/ui";

registerLocale("en-GB", {
  play: "Play",
  pause: "Pause",
  captions: "Subtitles",
  fullscreen: "Enter full screen",
});
```

## What to add yourself

- A transcript link (the player has none).
- Captions with accurate cues.
- An accessible name that matches the content.
- A visible focus style that survives your CSS reset.
- Manual testing with a screen reader.

## Do not claim

WCAG conformance, an axe-clean audit, or screen-reader coverage. None is evidenced by this repository.

**Canonical guide:** [Accessibility](../guides/accessibility.md) · [Keyboard shortcuts](../keyboard-shortcuts.md)

---

← Previous: [Advanced example](./advanced.md) · Next: [Edge cases](./edge-cases.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
