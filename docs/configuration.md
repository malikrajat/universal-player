# Configuration

> [Docs home](./README.md) � Configuration

[← Docs](./README.md) · [Advanced configuration](./advanced-configuration.md) · [Defaults →](./defaults.md)

Configuration is one object: `PlayerOptions`. The custom element exposes the
same fields as attributes, with JSON for structured values. Every field is
optional except `container` (core) — the element supplies its own container.

---

## 1. The shape

```ts
interface PlayerOptions {
  // Required
  container: HTMLElement;

  // Source and identity
  source?: PlayerSourceInput;
  label?: string;

  // Presentation
  controls?: "custom" | "native";
  theme?: "light" | "dark" | "system";
  ui?: UIOptions;
  locale?: string;
  strings?: Partial<PlayerStrings>;

  // Playback
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
  poster?: string;
  crossOrigin?: "anonymous" | "use-credentials" | null;
  playsInline?: boolean;
  volume?: number;
  playbackRate?: number;
  startTime?: number;
  live?: boolean;

  // Tracks and metadata
  qualities?: readonly QualityLevel[];
  textTracks?: readonly TextTrackInfo[];
  audioTracks?: readonly AudioTrackInfo[];
  chapters?: readonly Chapter[];
  thumbnails?: ThumbnailTrack;
  captions?: CaptionsOptions;

  // Feature bags
  survey?: SurveySource;
  playlist?: PlaylistOptions;
  image?: ImageOptions;
  resume?: ResumeOptions;
  analytics?: AnalyticsOptions;

  // Interaction
  keyboard?: boolean;
  clickToPlay?: boolean;
  doubleClickFullscreen?: boolean;
  autoHideControls?: boolean;
  seekStep?: number;
  volumeStep?: number;

  // Callbacks
  onStateChange?: (state: PlayerState) => void;
  onEvent?: (event: PlayerEvent) => void;
}
```

Anything not listed is not a supported option. See
[_API facts § 8](./_api-facts.md#8-apis-and-claims-that-do-not-exist).

---

## 2. Precedence

When the same behaviour can be set in more than one place, the most specific
wins:

```text
per-call method argument
  > per-instance option (PlayerOptions)
    > registered locale / registered strings
      > built-in default
```

Examples:

| Behaviour     | Most specific              | Then                                          |
| ------------- | -------------------------- | --------------------------------------------- |
| Caption track | `player.setTextTrack(id)`  | `captions.defaultTrack` → first track         |
| Caption size  | `player.setCaptionStyle()` | `captions.style` → CSS token                  |
| Speed         | `player.setPlaybackRate()` | `playbackRate` → `ui.speed.defaultRate` → `1` |
| Volume        | `player.setVolume()`       | `volume` → `1`                                |
| Theme         | `player.setTheme()`        | `theme` → `"system"`                          |
| Strings       | `strings` prop             | `registerLocale()` → English                  |

For the element, changing an attribute applies the corresponding runtime
setter. Changing `src` reloads; changing `shadow` does not (it is read at mount).

---

## 3. Option groups

### Source and identity

```ts
createPlayer({
  container,
  source: "/clip.mp4",
  label: "Product demo",
});
```

`source` accepts a URL, structured source, `Blob`, `File`, `MediaStream`,
chunked source or array. `label` sets the accessible region name.

### Presentation

> `theme`, `ui`, `locale`, `strings`, `keyboard`, `clickToPlay`, `doubleClickFullscreen`, `autoHideControls`, `seekStep` and `volumeStep` are consumed by `<universal-player>`. A headless `createPlayer()` stores them but renders no chrome and applies no theme.

```ts
createPlayer({
  container,
  controls: "custom",
  theme: "dark",
  ui: {
    controls: ["play", "seek", "time", "volume", "settings", "fullscreen"],
    theme: { colors: { accent: "#22c55e" } },
  },
  locale: "en",
  strings: { play: "Start" },
});
```

### Playback

```ts
createPlayer({
  container,
  source,
  autoplay: false,
  muted: true,
  loop: false,
  preload: "metadata",
  poster: "/poster.jpg",
  crossOrigin: "anonymous",
  playsInline: true,
  volume: 0.8,
  playbackRate: 1,
  startTime: 30,
  live: false,
});
```

`autoplay` may be rejected by browser policy; the player ignores that
rejection. `startTime` is applied after metadata.

### Tracks and metadata

```ts
createPlayer({
  container,
  source,
  captions: {
    enabled: true,
    defaultTrack: "en",
    tracks: [{ src: "/en.vtt", label: "English", language: "en" }],
    style: { fontSize: "120%", color: "#fff" },
    persist: true,
  },
  chapters: [{ id: "intro", title: "Intro", startTime: 0 }],
  thumbnails: { cues: [{ startTime: 0, endTime: 10, url: "/t0.jpg" }] },
  qualities: [{ id: "720p", label: "720p", height: 720 }],
  textTracks: [],
  audioTracks: [],
});
```

Per-source metadata (`source.captions`, `source.chapters`,
`source.thumbnails`, `source.survey`) overrides the corresponding player-level
value when present.

### Feature bags

```ts
createPlayer({
  container,
  source,
  playlist: { items: [...], autoAdvance: true },
  survey: endOfVideoFeedback(),
  image: { zoom: true, rotate: true, slideDuration: 5 },
  resume: { enabled: true, minDuration: 30 },
  analytics: { onEvent: (event) => send(event) },
});
```

### Interaction

```ts
createPlayer({
  container,
  source,
  keyboard: true,
  clickToPlay: true,
  doubleClickFullscreen: true,
  autoHideControls: true,
  seekStep: 5,
  volumeStep: 0.1,
});
```

The UI reads these; the headless core does not attach its own keyboard
listeners.

### Callbacks

```ts
createPlayer({
  container,
  source,
  onStateChange: (state) => render(state),
  onEvent: (event) => log(event.type),
});
```

Both callbacks are isolated: an exception is swallowed so it cannot break
playback. `onEvent` fires for high-frequency `timeupdate` and `progress` too.

---

## 4. Declarative JSON attributes

The custom element parses these structured attributes as JSON:

| Attribute    | Type                 |
| ------------ | -------------------- |
| `ui`         | `UIOptions`          |
| `chapters`   | `readonly Chapter[]` |
| `thumbnails` | `ThumbnailTrack`     |
| `captions`   | `CaptionsOptions`    |
| `survey`     | `SurveyConfig`       |
| `playlist`   | `PlaylistOptions`    |
| `image`      | `ImageOptions`       |

Example:

```html
<universal-player
  src="/clip.mp4"
  ui='{"download":false,"settings":{"stats":false},"controls":{"cast":false}}'
  playlist='{"items":[{"source":"/one.mp4","title":"One"}],"autoAdvance":true}'
></universal-player>
```

Invalid JSON is ignored. There is no schema validation at runtime; validate
your own JSON in tests or with TypeScript when building it.

---

## 5. Runtime changes

Some options have dedicated setters because changing them must re-render or
reload:

| Change                        | Use                                                      |
| ----------------------------- | -------------------------------------------------------- |
| Source                        | `load(source)`                                           |
| Playback                      | `play()`, `pause()`, `seek()`                            |
| Volume/mute/rate              | `setVolume`, `setMuted`, `toggleMute`, `setPlaybackRate` |
| Quality/tracks                | `setQuality`, `setTextTrack`, `setAudioTrack`            |
| Captions                      | `setCaptions`, `setCaptionStyle`, `setCaptionsEnabled`   |
| Chapters/thumbnails           | `setChapters`, `setThumbnails`                           |
| Playlist                      | `setPlaylist`, `setAutoAdvance`                          |
| Survey                        | `setSurvey`                                              |
| Controls/theme/locale/strings | `setControls`, `setTheme`, `setLocale`, `setStrings`     |
| Loop/autoplay                 | `setLoop`, `setAutoplay`                                 |

For everything else, construct a new player or re-create the element.

---

## 6. Validation rules

| Field                 | Rule                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| `container`           | Must be an `HTMLElement`; otherwise `invalid-argument`.                             |
| `source`              | Non-empty string; array must not be empty; unsupported object → `invalid-argument`. |
| `volume`              | Clamped to `0`–`1`.                                                                 |
| `playbackRate`        | Clamped to `0.25`–`4`.                                                              |
| `seek`                | Negative → `0`; non-finite → `0`.                                                   |
| `startTime`           | Any number; applied after metadata.                                                 |
| `playlist.startIndex` | Integer in range; otherwise `0`.                                                    |
| `playlist` items      | Readonly array; empty clears on `setPlaylist`.                                      |
| Survey answers        | Validated; `submitSurvey` throws with `details.issues`.                             |
| JSON attributes       | Invalid JSON is ignored, not thrown.                                                |

`PlayerState` is deeply readonly at the type level. Runtime values are frozen
where it matters (`NormalizedSource`, capability constants, presets).

---

## 7. Configuration recipes

### Minimal

```ts
createPlayer({ container, source });
```

### Course player (no skipping ahead)

```ts
createPlayer({
  container,
  source: playlist.items[0].source,
  playlist: {
    items: playlist.items,
    requireCompletion: true,
    allowNext: true,
    allowPrevious: false,
  },
  ui: { controls: ["play", "seek", "time", "volume", "captions", "settings", "fullscreen"] },
});
```

### No downloads, no cast, no stats

```ts
createPlayer({
  container,
  source,
  ui: {
    download: false,
    controls: { cast: false, share: false },
    settings: { stats: false },
  },
});
```

### Brand colours only

```ts
createPlayer({
  container,
  source,
  ui: { theme: { colors: { accent: "#22c55e" }, radius: "1rem" } },
});
```

### Feedback on end

```ts
createPlayer({
  container,
  source,
  survey: {
    ...endOfVideoFeedback(),
    onSubmit: (result) =>
      fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(result.answers),
      }),
  },
});
```

More: [Options cheatsheet](./options-cheatsheet.md) and
[Advanced configuration](./advanced-configuration.md).

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)