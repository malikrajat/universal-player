# Live event with a live edge

> [Examples home](../README.md) › [Use cases](./README.md) › Live event with a live edge

## Problem

A live HLS stream needs a live badge and a way back to the edge.

## What you will build

A live player with the live indicator and go-live button, without pretending to offer DVR.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | HLS live |
| Feature | Live (partial) |
| Peer | hls.js |

## Flow

```text
live manifest → state.live → go-live → seekable range
```

## Step by step

1. Install `hls.js`.
2. Pass `live: true` so hls.js uses low-latency mode.
3. Show the live badge when `state.live`.
4. Use `liveEdge(media)` from the feature helper to seek to the edge.

## Copy-paste code

```html
<universal-player src="/live/master.m3u8" controls="custom" label="Live keynote"></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  import { liveEdge } from "@codewithrajat/universal-player";
  const element = document.querySelector("universal-player");
  element.player?.on("statechange", (state) => {
    document.querySelector("#badge").hidden = !state.live;
  });
  document.querySelector("#go-live").addEventListener("click", () => {
    const media = element.player?.mediaElement;
    if (media instanceof HTMLMediaElement) {
      const edge = liveEdge(media);
      if (edge !== null) element.player?.seek(edge);
    }
  });
</script>
```

## UX notes

Say 'live' only when the manifest is live. Do not advertise a DVR window the UI does not have.

## Security and limits

Live manifests may require tokens; refresh before expiry.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| not live | n/a | Check duration is non-finite |
| behind edge | n/a | Seek to `liveEdge()` |
| DVR UI expected | n/a | Not implemented |

## Checklist

- [ ] Live badge condition
- [ ] Go-live control
- [ ] No DVR claim
- [ ] Token refresh

## Framework pages

[Vanilla](../vanilla/formats/hls.md) · [React](../react/formats/hls.md) · [Vue](../vue/formats/hls.md) · [Angular](../angular/formats/hls.md) · [Svelte](../svelte/formats/hls.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
