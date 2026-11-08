# Features

> [Examples home](../README.md) › [Shared reference](./README.md) › Features

## Captions

- **Entry:** `captions` option; `setTextTrack`, `setCaptions`, `setCaptionsEnabled`, `toggleCaptions`, `setCaptionStyle`.
- **Works with:** native, HLS, DASH, chunked. Not embeds/images.
- **Requires:** WebVTT (or browser-supported tracks), CORS on cross-origin tracks.
- **Basic:**

```ts
player.setCaptions({
  defaultTrack: "en",
  persist: true,
  tracks: [{ id: "en", src: "/en.vtt", label: "English", language: "en" }],
});
```

- **Result:** `state.textTracks`, `state.textTrack`, `texttrackchange`.
- **Limits:** No transcript panel, no caption authoring, no OCR. Native cue rendering.
- **Safety:** VTT is fetched cross-origin; treat cue text as untrusted.
- **Pages:** [captions feature](../vanilla/formats/features/captions.md).

## Chapters

- **Entry:** `chapters`, `setChapters`, `seekToChapter`, `currentChapter`.
- **Works with:** timeline media.
- **Requires:** `Chapter[]` with unique ids and `startTime`.
- **Basic:**

```ts
player.setChapters([
  { id: "intro", title: "Intro", startTime: 0 },
  { id: "demo", title: "Demo", startTime: 24 },
]);
player.seekToChapter("demo");
```

- **Result:** `state.activeChapter`, `chapterchange`.
- **Limits:** Not parsed from files.
- **Pages:** [chapters feature](../vanilla/formats/features/chapters.md).

## Playlist

- **Entry:** `playlist`, `setPlaylist`, `playPlaylistItem`, `next`, `previous`, `setAutoAdvance`.
- **Works with:** all kinds.
- **Requires:** `PlaylistItem[]` with `source`.
- **Basic:**

```ts
player.setPlaylist({
  items: [{ source: "/a.mp4" }, { source: "/b.mp4" }],
  autoAdvance: true,
});
await player.playPlaylistItem(0);
```

- **Result:** `state.playlist` (`PlaylistStatus`), `playlistchange`.
- **Limits:** No server sync; gating uses `ended` or duration − 0.25 s.
- **Pages:** [playlist feature](../vanilla/formats/features/playlist.md).

## Quality

- **Entry:** `qualities`, `setQuality`, `state.qualities`.
- **Works with:** HLS, DASH; configured embeds.
- **Requires:** an engine ladder or configured levels.
- **Basic:**

```ts
player.setQuality(null); // auto
player.setQuality(player.state.qualities[0]?.id ?? null);
```

- **Result:** `state.quality`, `qualitychange`.
- **Limits:** Native MP4 has no ladder.
- **Pages:** [quality feature](../vanilla/formats/features/quality.md).

## Survey

- **Entry:** `survey`, `setSurvey`, `openSurvey`, `submitSurvey`, `skipSurvey`, `closeSurvey`, `retakeSurvey`.
- **Works with:** all kinds; the overlay is built-in UI only.
- **Requires:** `SurveyConfig` with `questions`.
- **Basic:**

```ts
player.setSurvey({
  kind: "feedback",
  trigger: "ended",
  questions: [{ id: "score", type: "rating", label: "Score", max: 5, required: true }],
});
```

- **Result:** `surveysubmit`, `surveyskip`, `surveyclose`.
- **Limits:** No backend; localStorage for `once`; no focus trap.
- **Safety:** Validate and score server-side.
- **Pages:** [survey feature](../vanilla/formats/features/survey.md).

## Resume

- **Entry:** `resume`, `restoreResume`, `saveResume`.
- **Works with:** timeline media.
- **Requires:** Storage (localStorage default).
- **Basic:**

```ts
createPlayer({ container: host, source, resume: { enabled: true, minDuration: 60 } });
```

- **Result:** position restored after metadata; no event of its own.
- **Limits:** Best-effort, per-browser, disabled by default.
- **Pages:** [resume feature](../vanilla/formats/features/resume.md).

## Analytics

```ts
analytics: { onEvent: (event) => console.log(event.type, event.position) }
```

Emits `loadedmetadata`, `play`, `pause`, `seeked`, `ended`, `error`. No clickstream, no batching, no vendor SDK.

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
