# Extending

> [Docs home](./README.md) › Extending

[â† Docs](./README.md) Â· [Architecture](./architecture.md) Â· [Extending the project](./extending-the-project.md)

The public API deliberately has **no plugin/engine registry**. Extensibility
happens in-repo through the internal `PlayerEngine` contract, and in consuming
apps through composition: custom UI, custom feature helpers, custom sources and
framework wrappers.

This page covers both paths.

---

## 1. Extend in the consumer app (public API)

### 1.1 Custom controls on the headless core

You do not need an engine. Build your UI against `state` and methods:

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({ container, source: "/clip.mp4" });

const unsubscribe = player.on("statechange", (state) => {
  playButton.textContent = state.playing ? "Pause" : "Play";
  seekInput.max = String(state.duration);
  seekInput.value = String(state.currentTime);
});

playButton.addEventListener("click", () => {
  void (player.state.playing ? player.pause() : player.play());
});

seekInput.addEventListener("input", () => {
  player.seek(Number(seekInput.value));
});
```

Everything the built-in UI does is reachable through methods.

### 1.2 Custom source pre-processing

Resolve your own signed URL or chunk stream, then pass it in:

```ts
async function loadSigned(path: string) {
  const { url } = await fetch(`/api/sign?path=${encodeURIComponent(path)}`).then((r) => r.json());
  await player.load(url);
}
```

For a stream:

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => response.body!,
});
```

### 1.3 Custom feature helpers

Features are plain functions. Wrap them:

```ts
import { createResumeStore } from "@codewithrajat/universal-player";

const store = createResumeStore({ key: "course:" });
const position = store.read(lessonId);
if (position !== null) player.seek(position);

player.on("pause", () => store.write(lessonId, player.state.currentTime));
```

### 1.4 Custom postMessage providers

Generic embeds have no command bridge. If your provider supports `postMessage`,
wrap it outside the player and keep the player on a generic embed source, or add
a proper adapter in a fork (see below).

### 1.5 Custom survey submission

```ts
survey: {
  trigger: "ended",
  questions: [/* ... */],
  onSubmit: async (result) => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        survey: result.survey.id,
        answers: result.answers,
        position: result.position,
        duration: result.duration,
      }),
    });
  },
}
```

### 1.6 Custom framework wrapper

You can wrap `/core` in any framework, including one we do not ship:

```ts
// pseudo-code
function usePlayer(options) {
  let player;
  onMount(() => {
    player = createPlayer({ ...options, container });
  });
  onDestroy(() => player?.destroy());
  return { state: () => player?.state };
}
```

The React/Vue/Angular/Svelte adapters in `src/frameworks` are reference
implementations.

---

## 2. Extend in-repo (maintainers)

### 2.1 Add a new engine

1. Create `src/adapters/<name>/engine.ts`.
2. Implement `PlayerEngine` from `src/core/engine.ts`.
3. Export a factory `create<Name>Engine(context): Promise<PlayerEngine> | PlayerEngine`.
4. Add the provider to `MediaProvider` in `src/core/types.ts`.
5. Add detection logic to `providerFor()` / `detectMediaKind()` in
   `src/core/source.ts`.
6. Add a case to `createEngine()` in `src/core/engines.ts`.
7. Add capabilities (extend `capabilitiesForKind` if needed).
8. Add tests and a feature-status row.
9. Update [Architecture](./architecture.md), [Features](./features.md) and
   [API source reference](./api-source-reference.md).

Minimal engine shape:

```ts
import type { EngineContext, PlayerEngine } from "../../core/engine.js";

export function createExampleEngine(context: EngineContext): PlayerEngine {
  const element = document.createElement("div");

  return {
    kind: context.source.kind,
    element,
    capabilities: {
      play: true,
      pause: true,
      seek: true,
      volume: true,
      playbackRate: true,
      fullscreen: true,
      pictureInPicture: false,
      textTracks: false,
      audioTracks: false,
      quality: false,
      live: false,
    },
    async load() {
      // mount/fetch
    },
    async play() {},
    pause() {},
    seek() {},
    setVolume() {},
    setMuted() {},
    setPlaybackRate() {},
    getCurrentTime() {
      return 0;
    },
    getDuration() {
      return 0;
    },
    getBuffered() {
      return 0;
    },
    destroy() {
      element.remove();
    },
  };
}
```

The engine must not own application state. Emit through `context.emit`.

### 2.2 Add a feature helper

1. Create `src/features/<name>/<name>.ts`.
2. Keep it framework-free and DOM-light.
3. Export from `src/features/index.ts`.
4. Add types to `src/entries/core.ts` if public.
5. Add tests.
6. Document in [API reference](./api-reference.md#feature-helper-exports).

### 2.3 Add a framework adapter

1. Create `src/frameworks/<name>/universal-player.ts`.
2. Split exports in `src/entries/<name>.ts`.
3. Add `exports["./<name>"]` in `package.json`.
4. Add the peer and `peerDependenciesMeta` entry.
5. Add build entry if needed (Svelte needs a copy, others compile).
6. Add docs and a peer row.

### 2.4 Add a UI control

1. Add the name to `PlayerControl` in `src/core/types.ts`.
2. Render it in `src/ui/element.ts`.
3. Respect `#controlAllowed()` and capabilities.
4. Add CSS in `src/ui/styles.css` and a `::part()` if structural.
5. Add a shortcut if appropriate.
6. Document in [API reference](./api-reference.md#uioptions) and
   [Theming](./theming.md).

### 2.5 Add a survey question type

1. Add the literal to `SurveyQuestionType`.
2. Normalize and validate in `src/features/survey/survey.ts`.
3. Render in `src/ui/survey-panel.ts`.
4. Add a preset/example only if it is generally useful.
5. Document in [Surveys](./surveys.md).

---

## 3. Why no public plugin registry?

- A small, predictable engine set is easier to support.
- Third-party engines become an unmaintained compatibility burden.
- Security and packaging guarantees are harder with arbitrary plugins.
- The internal contract can evolve without SemVer constraints on third parties.

A public registry may be reconsidered in a major release. The current extension
path is a pull request to this repository.

---

## 4. Invariants you must keep

1. `core` never imports `ui`, `frameworks` or a framework package.
2. Engines never write application state.
3. Public state is immutable.
4. Every public symbol is reachable from an entry point.
5. Side effects are limited to element registration and CSS.
6. Streaming SDKs are imported dynamically inside their adapter.
7. No Node built-ins in browser paths.
8. Consumer callbacks are isolated.
9. `destroy()` releases everything.
10. Defaults are documented and changes are treated as breaking.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)