# CMS embed preview

> [Examples home](../README.md) › [Use cases](./README.md) › CMS embed preview

## Problem

Editors paste YouTube, Vimeo or generic embed URLs and need a safe preview.

## What you will build

A preview panel that classifies the URL, loads the right provider and refuses unknown hosts.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Headless core |
| Format | Embeds |
| Feature | Provider detection |
| CMS | Your editor |

## Flow

```text
URL → host allow-list → embed source → preview
```

## Step by step

1. Parse the host in your app.
2. Allow only YouTube/Vimeo or an explicit generic host.
3. Build a structured embed source.
4. Show that generic embeds are not controllable.

## Copy-paste code

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const allowed = new Set(["www.youtube.com", "youtube.com", "youtu.be", "player.vimeo.com", "vimeo.com"]);
const url = new URL(input.value);

if (!allowed.has(url.hostname)) {
  throw new Error("Host is not allowed in the preview");
}

const provider = url.hostname.includes("youtu") ? "youtube" : "vimeo";
await player.load({ kind: "embed", provider, src: url.href });
```

## UX notes

Label provider and privacy implications. Do not autoplay in the editor.

## Security and limits

Generic embeds are arbitrary third-party pages. Allow-list hosts; keep CSP frame-src tight.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| missing video id | invalid-argument | Ask for a full watch URL |
| blocked iframe | blank frame | Check CSP/X-Frame-Options |
| generic commands | no-op | Expected |

## Checklist

- [ ] Host allow-list
- [ ] CSP frame-src
- [ ] No autoplay
- [ ] Provider label

## Framework pages

[Vanilla](../vanilla/formats/youtube.md) · [React](../react/formats/youtube.md) · [Vue](../vue/formats/youtube.md) · [Angular](../angular/formats/youtube.md) · [Svelte](../svelte/formats/youtube.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
