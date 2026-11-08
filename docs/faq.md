# FAQ

> [Docs home](./README.md) � FAQ

[← Docs](./README.md) · [Troubleshooting](./troubleshooting.md) · [Why this library](./why-this-library.md)

---

## General

### What is `@codewithrajat/universal-player`?

A framework-agnostic media player with a headless TypeScript core, a
`<universal-player>` custom element and adapters for React, Vue, Angular,
Svelte 4 and Svelte 5.

### What does “universal” mean?

It plays **video, audio, images and embeds** through one API. It is not limited
to `<video>`.

### Is it a wrapper around Video.js/Plyr/Shaka?

No. It has its own core and adapters. It optionally uses `hls.js` and `dashjs`
for streaming.

### Does it support React/Vue/Angular/Svelte?

Yes, through separate optional entries. None of them is required to use the
core or the custom element.

### Is it TypeScript-first?

Yes. The source is strict TypeScript and every entry ships bundled `.d.ts`.

### Is it production-ready?

Version `0.0.1` is an **experience release**. Core playback and the documented
features are implemented; ads, Chromecast SDK and VR are contract-only. Read
[Features](./features.md) before committing to those areas.

---

## Installation

### Does it work with CommonJS?

No `require()` entry. Use dynamic `import()`.

### Do I have to install `hls.js` and `dashjs`?

Only if you load HLS/DASH sources. Both are optional peers, lazily imported.

### Do I have to install React/Vue/Angular/Svelte?

Only if you use that adapter. The custom element and core do not need a
framework.

### Why is the package ESM-only?

It targets modern browsers and bundlers, avoids the dual-package hazard and
keeps the export map small.

### Can I use it without a bundler?

Yes. Import the ESM entry from a `<script type="module">` or a CDN that serves
the package. Light DOM users should also import `styles.css`.

---

## Usage

### How do I show a poster?

```html
<universal-player src="/clip.mp4" poster="/poster.jpg"></universal-player>
```

`thumbnail` is an alias. Playlist items can override it.

### How do I start muted?

```ts
createPlayer({ container, source, muted: true });
```

### How do I autoplay reliably?

Muted autoplay is the most reliable. Browsers may still require a gesture.

### How do I switch sources?

```ts
await player.load("/next.mp4");
```

Do not create a new player for a new source unless you need a new container.

### How do I replay a finished video?

Call `play()`; it seeks to `0` first. Or `seek(0)` then `play()`.

### How do I show custom controls?

Use `/core` or a framework hook and render your own. The built-in surface is available only through `<universal-player>`; the framework adapters and `mountUniversalPlayer()` are headless.

### How do I remove the download button?

It is hidden by default. If you enabled it, set `ui.download: false`.

### How do I remove the settings menu?

```ts
ui: {
  settings: false;
}
```

### How do I prevent skipping ahead in a course?

```ts
playlist: {
  requireCompletion: true;
}
```

This is enforced in the core, including keyboard and programmatic calls.

### How do I show a playlist?

```ts
playlist: {
  items: [{ source: "/one.mp4", title: "One" }],
  autoAdvance: true,
}
```

An array source is a shortcut with `autoAdvance: false`.

### How do I add chapters?

```ts
chapters: [{ id: "intro", title: "Intro", startTime: 0 }];
```

### How do I add seek-bar previews?

```ts
thumbnails: {
  cues: [{ startTime: 0, endTime: 10, url: "/t0.jpg" }];
}
```

A sprite sheet can be supplied with `spriteUrl`.

### How do I load a user-selected file?

```ts
await player.load(file); // Blob/File
```

The player owns and revokes the object URL.

### How do I play a stream from an API?

Use a chunked source with `chunks` (async iterable or `ReadableStream`) and the
correct `type`. See [Usage → Sources](./usage.md#sources).

### Can I play YouTube/Vimeo?

Yes, by URL or structured embed source. Time/duration/play state sync over
`postMessage`. Provider restrictions still apply.

### Can I play a generic iframe?

Yes, with `kind: "embed"` and `provider: "generic"`. There is no command bridge.

### Does it support DRM?

No. DRM is out of scope in `0.0.1`.

---

## API and state

### How do I listen to events?

```ts
player.on("timeupdate", handler);
player.observe("statechange").subscribe(handler);
player.addEventListener("play", handler);
```

### Why does `statechange` not fire on every tick?

High-frequency `timeupdate`/`progress` are silent patches. Subscribe to
`timeupdate` for progress.

### How do I get the current time?

`player.state.currentTime` or the `timeupdate` payload.

### How do I know when metadata is ready?

Listen for `loadedmetadata` or wait for `state.status === "ready"`.

### What is a `PlayerError`?

A plain `Error` with a stable `code` and `details`. Use `isPlayerError()`.

### Why did `play()` throw `invalid-state`?

No source is loaded, or you called it after `destroy()`.

### How do I clean up?

`player.destroy()`. Framework adapters do it on unmount.

### Can I reuse a player after `destroy()`?

No. Create a new one.

### What is `state.capabilities` for?

It tells you which controls the active engine supports. Use it for custom UI.

---

## Captions

### Why are captions missing?

Usually a wrong track URL, missing CORS headers, no `default: true` on any track,
or captions are disabled. Check `player.state.textTracks` and `player.state.textTrack`.

### How do I turn captions off?

```ts
player.setTextTrack(null);
// or
player.toggleCaptions();
```

### How do I style captions?

Use `captions.style` or the `--up-caption-*` CSS tokens. See
[Theming](./theming.md#caption-tokens).

### Do you remember the selected language?

Yes, per source, by default. Set `captions.persist: false` to reset on each load.

---

## Surveys

### How do I show a survey at the end?

```ts
survey: { trigger: "ended", questions: [...] }
```

Or spread a preset such as `endOfVideoFeedback()`.

### Why did my survey not open a second time?

`once` defaults to `true`. Set `once: false` or use a new `id`, or call
`openSurvey(true)`.

### How do I make a survey blocking?

`required: true` or `blocking: true`. `closeSurvey()` becomes a no-op and skip
is hidden.

### Can questions come from an API?

Yes. Pass an async provider to `survey` or `player.setSurvey()`.

### Can I validate without the UI?

Yes: `validateSurveyAnswers(survey, answers)`.

### How do retakes work?

Set `allowRetake: true` (or `allowResubmit`) and optionally `maxAttempts`. Use
`player.retakeSurvey()`.

### Are quiz answers shown immediately?

Only with `instantFeedback: true` and `correct`/`explanation` on questions.

---

## Theming and i18n

### How do I change the brand colour?

`accent-color="#22c55e"` or `ui.theme.colors.accent`.

### How do I style the controls?

Use `::part(...)` in shadow mode, or CSS custom properties. Full list in
[Theming](./theming.md).

### Why are my host CSS rules not applying?

Shadow DOM isolates styles. Use tokens/parts, or switch to `shadow="light"` and
load `styles.css`.

### How do I add a language?

```ts
import { registerLocale } from "@codewithrajat/universal-player/ui";
registerLocale("hi", { play: "चलाएँ", pause: "रोकें" });
```

Then set `locale: "hi"`.

### Does it support RTL?

Yes, through logical CSS properties.

---

## Frameworks and SSR

### Why does the Angular adapter use a controller, not a component?

Angular AOT needs partial-compilation metadata that a generic bundler cannot
emit. The controller keeps AOT builds safe; you own the small standalone
component.

### Why are there two Svelte entries?

Svelte 4 and 5 have different authoring models. Shipping two source components
avoids compatibility shims.

### Does it support SSR?

No. `core` imports safely, but the player needs a browser DOM. Use client-only
mounting.

### Can I use it in Next.js/Nuxt/SvelteKit?

Yes, client-side. See [Browser support](./browser-support.md#8-ssr-frameworks).

---

## Packaging and policy

### What is the minimum Node version?

`>=24.0.0` for development/build. The browser runtime does not use Node.

### Which browsers are supported?

Chrome/Edge 125+, Firefox 128+, Safari 18+, ES2023.

### Is there a plugin system?

No public registry. Engines are internal and added in-repo.

### How are breaking changes handled?

Strict SemVer with a documented deprecation window. See
[Versioning](./versioning-and-breaking-changes.md) and
[Breaking change policy](./breaking-change-policy.md).

### Is there a changelog?

Yes: [CHANGELOG.md](../CHANGELOG.md) and [docs/changelog.md](./changelog.md).

### What license is it under?

MIT. See [License](./license.md).

### How do I report a bug or a security issue?

Bugs: GitHub issues. Security: follow [SECURITY.md](../SECURITY.md) and
[Security](./security.md); do not open a public issue for a vulnerability.

---

**Docs home** � [Documentation index](./README.md) � [Summary](./SUMMARY.md)