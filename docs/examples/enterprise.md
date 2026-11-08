# Enterprise example

> [Docs home](../README.md) › [Examples](./enterprise.md) › Enterprise example

A multi-tenant pattern built from the real API surface.

## Reference flow

```text
tenant config ──► signed media URL ──► player
      │                 │
      ├─ allow-list hosts
      ├─ captions policy
      └─ analytics endpoint (server-side)
```

## Code

```ts
import { createPlayer, isPlayerError } from "@codewithrajat/universal-player/core";

type TenantConfig = {
  mediaUrl: string;
  captionsUrl: string;
  analyticsEndpoint: string;
};

export function mountTenantPlayer(host: HTMLElement, config: TenantConfig) {
  const player = createPlayer({
    container: host,
    source: { kind: "video", src: config.mediaUrl, type: "video/mp4" },
    controls: "native",
    captions: {
      defaultTrack: "en",
      tracks: [{ id: "en", src: config.captionsUrl, label: "English", language: "en" }],
    },
    analytics: {
      onEvent: (event) => {
        if (event.type === "ended" || event.type === "error") {
          navigator.sendBeacon(config.analyticsEndpoint, JSON.stringify(event));
        }
      },
    },
    resume: { enabled: true, minDuration: 60 },
  });

  player.on("error", ({ error }) => {
    if (!isPlayerError(error)) return;
    if (error.code === "network-error" || error.code === "media-error") {
      void player.retry();
    }
  });

  return player;
}
```

## Controls you must supply

- Server-side URL signing and host allow-listing.
- Audit logging and retention.
- Annotation persistence (the player has none).
- Signature/trust verification (none).
- Tenant isolation (one player instance per host).

## Deployment checklist

- [ ] CSP includes media/connect origins.
- [ ] Analytics payload contains no PII.
- [ ] Resume storage is per-tenant or disabled.
- [ ] Captions served with CORS.
- [ ] Players destroyed on route change.

**Canonical guide:** [Security](../guides/security.md) · [Privacy & GDPR](../privacy-gdpr.md)

---

← Previous: [Edge cases](./edge-cases.md) · Next: [Integrations](./integrations.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
