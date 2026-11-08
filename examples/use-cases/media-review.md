# Video review with chapters and notes

> [Examples home](../README.md) › [Use cases](./README.md) › Video review with chapters and notes

## Problem

Reviewers need to jump to labelled sections, leave time-coded feedback and resume later.

## What you will build

A review room that loads a proxy MP4, exposes chapters, persists the position and shows a time-coded note form.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | MP4 |
| Feature | Chapters + resume |
| Storage | Your API |

## Flow

```text
signed proxy URL → player → chapter menu → note form reads state.currentTime → POST /notes
```

## Step by step

1. Create the player with chapters and resume.
2. Render a note form next to it.
3. Read `player.state.currentTime` when the note is saved.
4. Seek back to a note with `player.seek(note.time)`.

## Copy-paste code

```html
<universal-player id="review" src="/media/proxy.mp4" controls="custom" label="Cut 3 review"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#review");
  element.player?.setChapters([
    { id: "hook", title: "Hook", startTime: 0 },
    { id: "demo", title: "Demo", startTime: 18 },
  ]);
  element.addEventListener("statechange", (event) => {
    const state = event.detail;
    document.querySelector("#clock").textContent = state.currentTime.toFixed(1);
  });
</script>
```

## UX notes

Show the active chapter label; disable note submission while the player is idle.

## Security and limits

Proxy URLs are signed and short-lived. Notes are untrusted text; sanitise on render.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| expired URL | media-error | Refresh the signed URL and reload |
| bad chapter id | invalid-argument (none thrown) | seekToChapter ignores unknown ids |
| destroyed player | destroyed | Recreate on route change |

## Checklist

- [ ] Chapters have stable ids
- [ ] Resume is per-asset
- [ ] Notes include asset id + seconds
- [ ] Destroy on unmount

## Framework pages

[Vanilla](../vanilla/formats/mp4.md) · [React](../react/formats/mp4.md) · [Vue](../vue/formats/mp4.md) · [Angular](../angular/formats/mp4.md) · [Svelte](../svelte/formats/mp4.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
