# Learning paths

> [Examples home](./README.md) › Learning paths

## Beginner — first player (30 minutes)

1. [start-here.md](./start-here.md) — 10 min.
2. [vanilla/basic-usage.md](./vanilla/basic-usage.md) — 10 min.
3. [vanilla/formats/mp4.md](./vanilla/formats/mp4.md) — 5 min.
4. [errors.md](./errors.md) — 5 min.

You will be able to: mount the full UI, load an MP4, read state, handle a failure, destroy the player.

## Intermediate — production media (2–3 hours)

1. [shared/sources-and-lifecycle.md](./shared/sources-and-lifecycle.md)
2. Your framework README + advanced page.
3. [recipes/10-hls-dash.md](./recipes/10-hls-dash.md)
4. [shared/features.md](./shared/features.md) — captions, chapters, playlist.
5. [guides/configuration.md](./guides/configuration.md)

You will be able to: load URL/File/HLS, add captions and chapters, expose quality, persist resume.

## Production — multi-tenant (1 day)

1. [guides/security-and-deployment.md](./guides/security-and-deployment.md)
2. [guides/enterprise.md](./guides/enterprise.md)
3. [guides/ssr.md](./guides/ssr.md)
4. [guides/testing.md](./guides/testing.md)
5. [guides/compatibility.md](./guides/compatibility.md)
6. A use case: [compliance](./use-cases/compliance-archive.md) or [signed URL](./use-cases/signed-url-portal.md).

You will be able to: define trust boundaries, mount client-only, test your matrix, and document what is unverified.

## Path by role

| Role | Path |
| --- | --- |
| Frontend engineer | start-here → framework basic → format page → recipes |
| Design-system engineer | [custom chrome](./recipes/04-custom-chrome.md) → [theming](../docs/theming.md) → [capabilities](./guides/capabilities.md) |
| Platform engineer | [security](./guides/security-and-deployment.md) → [enterprise](./guides/enterprise.md) → [SSR](./guides/ssr.md) |
| QA engineer | [testing](./guides/testing.md) → [troubleshooting](./guides/troubleshooting.md) → [errors](./errors.md) |
| Content ops | [upload intake](./use-cases/upload-intake.md) → [image DAM](./use-cases/image-dam.md) → [format matrix](./format-matrix.md) |
| Compliance | [compliance archive](./use-cases/compliance-archive.md) → [privacy](../docs/privacy-gdpr.md) → [security](./guides/security-and-deployment.md) |

## Path by use case

| Use case | Start |
| --- | --- |
| Video review with chapters and notes | [media-review](./use-cases/media-review.md) |
| Multi-format upload inbox | [upload-intake](./use-cases/upload-intake.md) |
| Compliance media archive | [compliance-archive](./use-cases/compliance-archive.md) |
| Knowledge-base media browser | [knowledge-base](./use-cases/knowledge-base.md) |
| Executive briefing room with custom chrome | [briefing-room](./use-cases/briefing-room.md) |
| Audio course with resume and playlist | [audio-course](./use-cases/audio-course.md) |
| Webinar replay with HLS and captions | [webinar-replay](./use-cases/webinar-replay.md) |
| Image DAM inspection | [image-dam](./use-cases/image-dam.md) |
| Signed-URL media portal | [signed-url-portal](./use-cases/signed-url-portal.md) |
| Training video with a quiz gate | [training-quiz](./use-cases/training-quiz.md) |
| CMS embed preview | [cms-preview](./use-cases/cms-preview.md) |
| Offline-first local viewer | [offline-local-first](./use-cases/offline-local-first.md) |
| Live event with a live edge | [live-event](./use-cases/live-event.md) |

## 30-minute onboarding plan

| Minutes | Activity |
| --- | --- |
| 0–5 | Read the five-step model in [start-here](./start-here.md). |
| 5–10 | Build the package and install the folder. |
| 10–20 | Copy the full-UI vanilla example; load an MP4. |
| 20–25 | Add an `error` listener and force a 404. |
| 25–30 | Read [api-cheatsheet](./api-cheatsheet.md) and write down the five calls you will use. |

---

**Docs home** · [Documentation index](../docs/README.md) · [Summary](../docs/SUMMARY.md)
