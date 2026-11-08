# Use cases

> [Examples home](../README.md) › Use cases

Product-shaped flows built from the real API. Each page states its limits and which format page to open next.

| Use case | Problem solved | Key features | Guide |
| --- | --- | --- | --- |
| Video review with chapters and notes | Reviewers need to jump to labelled sections, leave time-coded feedback and resume later. | Custom element, MP4, Chapters + resume, Your API | [media-review](./media-review.md) |
| Multi-format upload inbox | Operators drop video, audio and image files and need immediate preview without a server round-trip. | Headless core, Blob/File, Kind detection, Your upload API | [upload-intake](./upload-intake.md) |
| Compliance media archive | Regulated teams need playback of archived recordings with audit trails and strict retention. | Custom element, MP4 + HLS, Analytics, Your backend | [compliance-archive](./compliance-archive.md) |
| Knowledge-base media browser | A docs site mixes tutorial videos, audio clips and diagrams in one article. | Custom element, MP4, images, Captions, Any | [knowledge-base](./knowledge-base.md) |
| Executive briefing room with custom chrome | The design team wants its own controls around a reliable media surface. | Headless core, MP4, State + events, Your design system | [briefing-room](./briefing-room.md) |
| Audio course with resume and playlist | Learners pause mid-lesson and return days later. | Headless core, MP3/M4A, Playlist + resume, localStorage or your API | [audio-course](./audio-course.md) |
| Webinar replay with HLS and captions | Replays are delivered as HLS with multiple bitrates and WebVTT captions. | Custom element, HLS, Quality + captions, hls.js | [webinar-replay](./webinar-replay.md) |
| Image DAM inspection | Asset managers need to inspect large images with zoom and rotation. | Custom element, JPEG/PNG/WebP/AVIF, Image viewer, Your DAM | [image-dam](./image-dam.md) |
| Signed-URL media portal | Media must not be hot-linkable and the portal needs graceful expiry handling. | Headless core, MP4/HLS, Error recovery, Your API | [signed-url-portal](./signed-url-portal.md) |
| Training video with a quiz gate | Compliance training must record a quiz attempt after the video ends. | Custom element, MP4, Survey/quiz + playlist, Your LMS | [training-quiz](./training-quiz.md) |
| CMS embed preview | Editors paste YouTube, Vimeo or generic embed URLs and need a safe preview. | Headless core, Embeds, Provider detection, Your editor | [cms-preview](./cms-preview.md) |
| Offline-first local viewer | Field staff need to review downloaded media without a network. | Headless core, Blob/File, Resume (optional), IndexedDB (your code) | [offline-local-first](./offline-local-first.md) |
| Live event with a live edge | A live HLS stream needs a live badge and a way back to the edge. | Custom element, HLS live, Live (partial), hls.js | [live-event](./live-event.md) |

## How to choose

- Reviewing media with time-coded notes → [media-review](./media-review.md)
- Accepting arbitrary uploads → [upload-intake](./upload-intake.md)
- Regulated playback → [compliance-archive](./compliance-archive.md)
- Learning content → [knowledge-base](./knowledge-base.md) or [audio-course](./audio-course.md)
- Design-system chrome → [briefing-room](./briefing-room.md)
- Live/HLS → [webinar-replay](./webinar-replay.md) or [live-event](./live-event.md)
- Images → [image-dam](./image-dam.md)
- Access control → [signed-url-portal](./signed-url-portal.md)
- Quizzes → [training-quiz](./training-quiz.md)
- CMS embeds → [cms-preview](./cms-preview.md)
- Offline → [offline-local-first](./offline-local-first.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
