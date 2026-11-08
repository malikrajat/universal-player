# Webinar replay with HLS and captions

> [Examples home](../README.md) › [Use cases](./README.md) › Webinar replay with HLS and captions

## Problem

Replays are delivered as HLS with multiple bitrates and WebVTT captions.

## What you will build

An HLS player with a quality menu, captions and a poster.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | HLS |
| Feature | Quality + captions |
| Peer | hls.js |

## Flow

```text
manifest → hls.js → levels → captions
```

## Step by step

1. Install `hls.js`.
2. Load the manifest.
3. Read `state.qualities` after metadata.
4. Set `captions.defaultTrack`.

## Copy-paste code

```bash
pnpm add hls.js
```

```html
<universal-player
  src="/media/webinar/master.m3u8"
  poster="/media/webinar/poster.jpg"
  controls="custom"
  captions='{"defaultTrack":"en","tracks":[{"id":"en","src":"/media/webinar/en.vtt","label":"English","language":"en"}]}'
></universal-player>
```

## UX notes

Default to auto quality. Remember the caption choice.

## Security and limits

CORS on manifest, segments and VTT. Token-protected manifests need signed URLs.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| fatal HLS | network-error | Retry / check CORS |
| no hls.js | media-error | Install peer |
| no qualities | n/a | Manifest may be single-bitrate |

## Checklist

- [ ] hls.js installed
- [ ] CORS on all segments
- [ ] Captions CORS
- [ ] Poster

## Framework pages

[Vanilla](../vanilla/formats/hls.md) · [React](../react/formats/hls.md) · [Vue](../vue/formats/hls.md) · [Angular](../angular/formats/hls.md) · [Svelte](../svelte/formats/hls.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
