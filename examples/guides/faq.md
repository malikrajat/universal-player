# FAQ

> [Examples home](../README.md) › [Production guides](./README.md) › FAQ

**Is the package published?** Yes. It is published on npm as `@codewithrajat/universal-player@0.0.1`; install with `npm install @codewithrajat/universal-player`.

**Do I need the UI entry?** Only if you want the built-in controls. Headless entries render media only.

**Why is React's prop `source`?** The React component takes `PlayerOptions` minus `container`; the option is `source`. Vue/Svelte use `src` as a component prop; the element attribute is `src`.

**Do framework wrappers render controls?** No.

**Why is `.ogg` video?** The extension table puts `.ogg` in the video set. Use `.oga` or a structured source.

**Does it support MOV/MKV?** It recognises them; browsers usually cannot demux them.

**HLS/DASH?** Yes, with optional peers; no DRM.

**Can I add an engine?** No public registry.

**Is there OCR/search/annotations?** No.

**Is there a transcript?** No.

**Does it work offline?** Yes for local File/Blob; the player has no cache layer.

**Can I download?** Only with `ui.download`; it does not bypass rights.

**Why did autoplay fail silently?** Browser policy; autoplay rejection is swallowed.

**Is SSR supported?** No; client-only.

**WCAG?** No conformance claim; see [Accessibility](./accessibility.md).

**Bundle size?** No numeric budget is enforced.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
