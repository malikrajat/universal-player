# Styling issues

> [Docs home](../README.md) › [Troubleshooting](./styling-issues.md) › Styling issues

## Controls unstyled

You are in light DOM without the stylesheet. Either:

```html
<script type="module">
  import "@codewithrajat/universal-player/ui";
  import "@codewithrajat/universal-player/styles.css";
</script>
<universal-player shadow="light" src="/clip.mp4"></universal-player>
```

or add `inject-styles`. Shadow DOM needs neither.

## Host CSS does not reach internals

Expected. Use tokens and `::part()`. Classes inside the shadow root are not addressable.

## Player has no height

The element is block-level but its height comes from the viewport aspect ratio. If a parent has zero height or `display: contents`, the player collapses. Give the host a width and let the aspect ratio work, or set an explicit height.

## Theme ignored

- `theme` is a UI-only option. A headless player ignores it.
- Ensure the attribute is on the element, not a wrapper.
- Inline `ui.theme` beats stylesheet tokens.

## Images distorted

The image engine uses the image's intrinsic layout plus CSS. Set `object-fit` and a sized container; the player does not crop.

## Menus clipped

The player root has `overflow: hidden`. In very small containers, long menu labels clip. Shorten strings or increase the container size.

**Canonical guide:** [Theming](../theming.md) · [Styling best practices](../theming/styling-best-practices.md)

---

← Previous: [SSR issues](./ssr-issues.md) · Next: [FAQ](../faq/faq.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
