# Changelog

> [Docs home](./README.md) › Changelog

[← Docs](./README.md) · [Versioning](./versioning-and-breaking-changes.md) · [Roadmap](./roadmap.md)

The canonical release history is [`../CHANGELOG.md`](../CHANGELOG.md). This page
explains the format and the workflow.

This project follows [Semantic Versioning](https://semver.org/) and uses
[Changesets](https://github.com/changesets/changesets).

---

## Current release

### `0.0.1`

Initial experience release:

- Headless `UniversalPlayer` core with immutable state and three event styles.
- Native video/audio, image, HLS, DASH, YouTube, Vimeo and generic embed
  engines.
- `<universal-player>` custom element with custom/native controls, theming,
  i18n and WCAG 2.2 AA-oriented markup.
- React, Vue 2.7/3, Angular, Svelte 4 and Svelte 5 adapters.
- Captions, audio tracks, quality, speed, PiP, fullscreen, AirPlay, casting
  prompt, thumbnails, chapters, playlists, resume, live, ads contract,
  analytics, mini-player and VR contract.
- ESM-only packaging, strict TypeScript, Vitest + Playwright, publint, attw,
  tarball allowlist, Changesets and GitHub Actions release automation.

See [Features](./features.md) for the exact status of each area.

---

## Changelog format

Entries are grouped by change type:

| Group      | Meaning                                |
| ---------- | -------------------------------------- |
| Added      | New public capability.                 |
| Changed    | Behaviour change that is not breaking. |
| Deprecated | Still works; scheduled for removal.    |
| Removed    | Removed in a major release.            |
| Fixed      | Bug fix.                               |
| Security   | Security-relevant fix.                 |

Each entry names the affected surface (core, UI, adapter, packaging) so
consumers can assess impact.

---

## Adding a change

```bash
pnpm changeset
```

Select the package, choose `patch`, `minor` or `major`, and write a one-line
summary aimed at a consumer.

```bash
git add .changeset
git commit -m "feat: add chapter thumbnails"
```

Guidance:

- A user-visible fix is usually `patch`.
- A new option, method, event or adapter is `minor`.
- Removing/renaming a public export, option or event, or changing a documented
  default, is `major`.
- Documentation-only changes do not need a changeset.

The release workflow applies changesets, updates `CHANGELOG.md`, publishes with
npm provenance and tags the release.

---

## Version history

| Version | Date | Notes                       |
| ------- | ---- | --------------------------- |
| `0.0.1` | 2026 | Initial experience release. |

Future versions appear in [`../CHANGELOG.md`](../CHANGELOG.md) first. This table
is a summary, not the source of truth.

---

## Release channels

- `main` — releases.
- `develop` — integration.
- npm `latest` — stable releases.
- Pre-releases use npm dist-tags (for example `next`) when needed.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)