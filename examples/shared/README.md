# Shared reference

> [Examples home](../README.md) › Shared

Framework-neutral mechanics. Read these once, then use the framework pages for idioms.

| Page | Answers |
| --- | --- |
| [Adapter setup](./adapter-setup.md) | How do I install, initialise and configure the player/engine? |
| [Sources and lifecycle](./sources-and-lifecycle.md) | What can I load, who owns it, and what happens on load/destroy? |
| [Features](./features.md) | Captions, chapters, playlist, quality, survey, resume |
| [Recipes](./recipes.md) | Framework-neutral patterns for common tasks |
| [Security and testing](./security-and-testing.md) | Trust boundaries, CSP, test strategy |

## The mental model in one paragraph

A source is normalised into a kind and provider. The player creates one internal engine for that provider, mounts one media surface, and translates native events into an immutable `PlayerState` plus 29 typed events. Every framework wrapper and the vanilla helper own the player lifecycle but do not render the built-in UI. Only `<universal-player>` draws controls.

## What "adapter" means here

| Term | Meaning |
| --- | --- |
| Framework adapter | `/react`, `/vue`, `/angular`, `/svelte4`, `/svelte5`, `/vanilla` |
| Engine adapter | Internal provider implementation (native, hls, dash, image, …) |
| Registry | **None.** There is no consumer plugin API. |

## Version and status

`@codewithrajat/universal-player@0.0.1` is unreleased. Local folder/tarball install only.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
