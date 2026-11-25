# v1 to v2

> [Docs home](../README.md) › [Migration](./v1-to-v2.md) › v1 to v2

There is no published v1, so there is no real v1 → v2 migration. `0.0.1` **is published** on npm — this page exists to prevent a false history and to give upgrade guidance for consumers starting from the published `0.0.1` package.

## Patterns corrected in the published `0.0.1`

These are the shapes found in older drafts or folder copies. The published `0.0.1` package installed from npm already uses the right-hand column.

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

## Checklist for consumers on `0.0.1`

- [ ] Install `0.0.1` from npm (`npm install @codewithrajat/universal-player@0.0.1`).
- [ ] Replace any custom adapter registry assumption.
- [ ] Branch errors on `code`.
- [ ] Use `controls: "native"` or the custom element.
- [ ] Remove SSR assumptions.
- [ ] Re-test HLS/DASH with peers installed.

## Future migrations

When a real major ships, this page will carry the deprecation table. Today it must not claim that a v1 exists; `0.0.1` is the published starting point.

**Canonical guide:** [Migration root](../migration.md) · [Breaking changes](./breaking-changes.md)

---

← Previous: [Styling best practices](../theming/styling-best-practices.md) · Next: [Breaking changes](./breaking-changes.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
