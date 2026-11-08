# Compliance media archive

> [Examples home](../README.md) › [Use cases](./README.md) › Compliance media archive

## Problem

Regulated teams need playback of archived recordings with audit trails and strict retention.

## What you will build

A read-only archive player with signed URLs, no download, resume disabled and analytics forwarded server-side.

## Recommended stack

| Layer | Choice |
| --- | --- |
| Surface | Custom element |
| Format | MP4 + HLS |
| Feature | Analytics |
| Audit | Your backend |

## Flow

```text
auth → signed URL → player → events → audit log
```

## Step by step

1. Disable share/download in `ui`.
2. Disable resume (shared devices).
3. Send only necessary analytics fields to your collector.
4. Log access with asset id and user id server-side.

## Copy-paste code

```html
<universal-player
  id="archive"
  src="SIGNED_URL"
  controls="custom"
  ui='{"download":false,"share":false}'
></universal-player>
<script type="module">
  import "@codewithrajat/universal-player";
  const element = document.querySelector("#archive");
  element.player?.on("ended", () => {
    navigator.sendBeacon("/api/audit", JSON.stringify({ asset: "ASSET_ID", event: "ended" }));
  });
</script>
```

Resume is disabled by default, which is the right choice for shared/kiosk devices. If you need analytics on every event, `element.player` is the core instance.

## UX notes

Make the retention policy visible. Avoid local position storage on kiosks.

## Security and limits

No DRM. URLs are bearer tokens; keep TTL short. Do not put PII in analytics payloads.

## Failure cases

| Failure | Code | Recovery |
| --- | --- | --- |
| expired token | media-error | Re-auth and reload |
| blocked download | n/a | Download is hidden, not enforced |
| storage disabled | no-op | Resume is best-effort |

## Checklist

- [ ] Signed URLs
- [ ] Download off
- [ ] Resume off for kiosks
- [ ] Audit server-side
- [ ] Retention documented

## Framework pages

[Vanilla](../vanilla/formats/hls.md) · [React](../react/formats/hls.md) · [Vue](../vue/formats/hls.md) · [Angular](../angular/formats/hls.md) · [Svelte](../svelte/formats/hls.md)

Framework basics: [Vanilla](../vanilla/basic-usage.md) · [React](../react/basic-usage.md) · [Vue](../vue/basic-usage.md) · [Angular](../angular/basic-usage.md) · [Svelte](../svelte/basic-usage.md)

## Related

[Format matrix](../format-matrix.md) · [Errors](../errors.md) · [Security guide](../guides/security-and-deployment.md) · [All use cases](./README.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
