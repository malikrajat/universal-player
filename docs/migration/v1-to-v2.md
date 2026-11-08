# v1 to v2

> [Docs home](../README.md) › [Migration](./v1-to-v2.md) › v1 to v2

There is no published v1, so there is no real v1 → v2 migration. This page exists to prevent a false history and to give the upgrade path for the **first public release**.

## If you used a pre-release folder copy

| Old shape | New shape |
| --- | --- |
| `import { createPlayer } from "universal-player"` | `import { createPlayer } from "@codewithrajat/universal-player/core"` |
| Assuming `mountUniversalPlayer()` draws controls | It is headless; mount `<universal-player>` or use `controls: "native"` |
| `setQuality("auto")` | `setQuality(null)` |
| `setTextTrack("off")` | `setTextTrack(null)` |
| `player.setSource(url)` | `player.load(url)` |
| `player.on("ready")` | `player.on("loadedmetadata")` |
| Importing `/styles` | Import `/styles.css` |
| Importing `/features` | Feature helpers come from the root entry |

## First-release checklist

- [ ] Install from folder/tarball; do not use the registry command yet.
- [ ] Replace any custom adapter registry assumption.
- [ ] Branch errors on `code`.
- [ ] Use `controls: "native"` or the custom element.
- [ ] Remove SSR assumptions.
- [ ] Re-test HLS/DASH with peers installed.

## Future migrations

When a real major ships, this page will carry the deprecation table. Today it must not claim that a v1 exists.

**Canonical guide:** [Migration root](../migration.md) · [Breaking changes](./breaking-changes.md)

---

← Previous: [Styling best practices](../theming/styling-best-practices.md) · Next: [Breaking changes](./breaking-changes.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
