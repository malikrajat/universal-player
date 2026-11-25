# Features

> [Examples home](../README.md) › [React](./README.md) › Features › Features

Optional features that sit on top of a format.

| Feature | Entry | Works with | Page |
| --- | --- | --- | --- |
| Captions and subtitles | `captions` option; `setTextTrack`, `setCaptions`, `setCaptionsEnabled`, `toggleCaptions`, `setCaptionStyle` | native video/audio, HLS, DASH, chunked; not embeds | [captions.md](./captions.md) |
| Chapters | `chapters` option, `setChapters`, `seekToChapter`, `currentChapter`, `chapterchange` | timeline media (native, HLS, DASH, chunked audio/video); ignored by images and embeds | [chapters.md](./chapters.md) |
| Playlist and queue | `playlist` option, `setPlaylist`, `playPlaylistItem`, `next`, `previous`, `setAutoAdvance`, `cancelAutoAdvance` | all media kinds, including images and embeds | [playlist.md](./playlist.md) |
| Quality selection | `qualities` option, `setQuality`, `state.qualities`, `qualitychange` | HLS and DASH natively; YouTube/Vimeo pass a command when `qualities` is configured; native media only shows configured levels | [quality.md](./quality.md) |
| Resume playback | `resume` option, `restoreResume`, `saveResume`; `createResumeStore` helper | timeline media (native, HLS, DASH, chunked audio/video) | [resume.md](./resume.md) |
| Survey, feedback, review and quiz | `survey` option, `setSurvey`, `openSurvey`, `submitSurvey`, `skipSurvey`, `closeSurvey`, `retakeSurvey`; presets from the root entry | any media kind; the overlay is UI-only | [survey.md](./survey.md) |

Features do not change the format engine. A survey still plays the same media; quality only exists on HLS/DASH; captions need native text tracks.

---

**Docs home** · [Documentation index](../../../../docs/README.md) · [Summary](../../../../docs/SUMMARY.md)
