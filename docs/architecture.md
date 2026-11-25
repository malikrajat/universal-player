# Architecture

> [Docs home](./README.md) › Architecture

[← Docs](./README.md) · [Core concepts](./core-concepts.md) · [Project structure](./project-structure.md)

## Goals

- One framework-agnostic playback core for video, audio, images and embeds.
- A headless API any framework can wrap.
- A batteries-included `<universal-player>` for plain HTML.
- Strict enterprise packaging: ESM-only, typed, tree-shakeable, validated.

## Non-goals (0.0.1)

- Server-side rendering of the player or wrappers.
- A public engine/plugin registry.
- DRM (Widevine/FairPlay/PlayReady).
- Bundling streaming SDKs into the package.
- A working ads or Chromecast SDK integration.

---

## Layers

```
┌─────────────────────────────────────────────────────────────┐
│ entries/          public subpath entry points               │
├─────────────────────────────────────────────────────────────┤
│ frameworks/       react · vue · angular · svelte4 · svelte5 │
├─────────────────────────────────────────────────────────────┤
│ ui/               <universal-player>, controls, i18n, CSS   │
├─────────────────────────────────────────────────────────────┤
│ vanilla/          mountUniversalPlayer()                    │
├─────────────────────────────────────────────────────────────┤
│ core/             player, state, events, source, engines    │
├─────────────────────────────────────────────────────────────┤
│ adapters/         native · image · hls · dash · embeds      │
├─────────────────────────────────────────────────────────────┤
│ features/         quality · speed · chapters · resume · ... │
└─────────────────────────────────────────────────────────────┘
```

Dependency direction is strictly downward:

- `core` never imports `ui`, `frameworks` or a framework package.
- `ui` imports `core` and `features`.
- `frameworks` import `core` and the framework runtime only.
- `adapters` implement the internal `PlayerEngine` contract.
- `features` are framework- and DOM-light helpers.
- `entries` are the only modules that decide what becomes public.

This is what allows the `/core` entry to be small and tree-shakeable, and why a
React app never pulls in the custom element or Angular.

---

## Source normalization

`normalizeSource(input)` is the single entry point for every media input. It
accepts:

- a URL string (resolved against `document.baseURI`)
- a structured `PlayerSource`
- a `Blob` or `File` (creates and owns an object URL)
- a `MediaStream`
- a chunked source with an iterable/stream
- an array (handled by `load()` as a playlist)

It returns a frozen `NormalizedSource` containing:

- resolved `url` (`""` for chunked/stream)
- `kind` (`video`, `audio`, `image`, `embed`)
- `provider` (`native`, `chunked`, `hls`, `dash`, `image`, `youtube`,
  `vimeo`, `generic-embed`)
- inferred MIME type and extension
- object-URL ownership flag
- optional stream or chunks

Object URLs are revoked when the player replaces the source or is destroyed.

---

## Engine selection

`src/core/engines.ts` maps the provider to an internal engine:

| Provider        | Engine                         |
| --------------- | ------------------------------ |
| `native`        | `<video>` / `<audio>`          |
| `image`         | `<img>`                        |
| `chunked`       | `MediaSource` or a Blob        |
| `hls`           | `hls.js` (lazy, optional peer) |
| `dash`          | `dashjs` (lazy, optional peer) |
| `youtube`       | iframe + `postMessage`         |
| `vimeo`         | iframe + `postMessage`         |
| `generic-embed` | iframe                         |

Every engine implements the internal `PlayerEngine` contract:

```ts
interface PlayerEngine {
  readonly kind: MediaKind;
  readonly element: HTMLElement | null;
  readonly capabilities: PlayerCapabilities;
  load(): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  setMuted(muted: boolean): void;
  setPlaybackRate(rate: number): void;
  setQuality?(quality: string | null): void;
  setTextTrack?(id: string | null): void;
  setAudioTrack?(id: string | null): void;
  getQualities?(): readonly QualityLevel[];
  getTextTracks?(): readonly TextTrackInfo[];
  getAudioTracks?(): readonly AudioTrackInfo[];
  getCurrentTime(): number;
  getDuration(): number;
  getBuffered(): number;
  requestTimeSync?(): void;
  destroy(): void;
}
```

The contract is **not** exported from a public entry. It is an internal
extension point; see [Extending](./extending.md).

---

## Playback flow

```
load(input)
  ├─ normalizeSource(input)
  ├─ destroy previous engine (and revoke its object URL)
  ├─ emit loadstart → status "loading"
  ├─ createEngine(provider)
  ├─ engine.load()
  ├─ apply volume/muted/rate/startTime
  ├─ emit loadedmetadata → status "ready"
  └─ optional autoplay
```

A newer `load()` call increments a sequence number; an older in-flight load
detects the change and destroys its engine instead of mutating state.

Native media events are bridged by `bindMediaElement()` into the player event
schema. The player is the single source of truth for state; engines never own
application state.

---

## State machine

```
idle → loading → ready → playing ⇄ paused → ended
                   └──────────────→ error
```

`PlayerState` is replaced (never mutated) on every meaningful transition.

High-frequency `timeupdate` and `progress` updates are silent state patches:
they do not emit `statechange`. This keeps React/Vue re-renders predictable and
avoids a full state replacement 4–60 times per second.

Errors move the state to `error` and are also published through the `error`
event. `retry()` reloads the current source.

---

## Events

Three equivalent styles are backed by one bus:

1. `addEventListener()` — standard DOM `CustomEvent`, `detail` carries the
   payload.
2. `on()` / `once()` — typed subscriptions returning an unsubscribe function.
3. `observe()` — a small RxJS-compatible observable (`@@observable` interop).

`toRxjsObservable()` lazily imports the optional `rxjs` peer. Listener
exceptions are isolated so a faulty subscriber cannot break playback.

---

## UI layer

`<universal-player>`:

- Creates a `UniversalPlayer` inside a viewport.
- Renders custom controls (play, seek, time, mute, volume, captions, quality,
  speed, PiP, fullscreen, chapters, playlist, share, stats).
- Defaults to Shadow DOM with the bundled stylesheet injected into the shadow
  root.
- Supports `shadow="light"` plus `styles.css` or `inject-styles`.
- Reflects state to `data-up-*` attributes for host-page styling.
- Handles keyboard shortcuts, gestures and ARIA state.
- Renders surveys, menus, toasts and the error overlay.

The core remains headless; all presentation lives in `src/ui`.

---

## Framework wrappers

- **React:** `useUniversalPlayer()` plus a `forwardRef` component.
- **Vue:** one Composition API implementation that runs on Vue 2.7 and Vue 3.
- **Angular:** a decorator-free controller. A generic bundler cannot emit
  Angular partial-compilation metadata, so consumers own the standalone
  `@Component` and forward lifecycle hooks. This keeps AOT builds safe.
- **Svelte 4/5:** `.svelte` source components are copied verbatim into `dist`
  and exposed through the `svelte` export condition. Svelte tooling compiles
  them in the consumer app.

Every wrapper renders a host element only. Media and state live in the core.

---

## Packaging

- `type: module`, ESM-only.
- `unbundle: true` to preserve module structure and tree-shaking.
- Explicit `.js` extensions in relative imports.
- Bundled `.d.ts` per entry.
- Source maps.
- `sideEffects` limited to CSS and the two element-registering entries.
- Subpath exports for every public surface.
- `publint` and `@arethetypeswrong/cli` run in build and CI.
- A tarball allowlist script verifies exports and prevents source/test leaks.

---

## Dependency policy

- Zero runtime dependencies.
- `hls.js`, `dashjs`, `rxjs`, React, Vue, Angular and Svelte are optional
  peers.
- Framework packages are imported only from their wrapper files.
- Streaming SDKs are imported only through dynamic `import()` inside their
  adapters.
- No Node built-ins in browser-facing modules; `check:imports` enforces this.

---

## Testing

- **Unit:** Vitest in jsdom. Covers core state/events/source, features, i18n,
  the element and the player lifecycle.
- **Browser:** Vitest browser mode with the Playwright provider, Chromium.
- **Coverage:** 90% lines/functions/statements on core and selected features;
  80% branches.
- **Package:** `publint`, `attw`, tarball allowlist, browser-import scan.

Details: [Testing](./testing.md).

---

## Security

- No `eval`, no dynamic code generation.
- Embed iframes are `allow`-scoped and use `referrerpolicy`.
- No network requests at module load.
- Optional peer imports happen only on explicit user action (loading a
  matching source, calling the RxJS bridge).
- Consumer callbacks are isolated so a faulty logger cannot break playback.

Details: [Security](./security.md).

---

## Performance

- `timeupdate` does not trigger full `statechange` renders.
- Engines are created lazily after `load()`.
- HLS/DASH are fetched only when a matching source is loaded.
- The core entry has no UI or framework imports.
- One player owns one engine; replacing a source destroys the old engine first.
- Object URLs and listeners are released on replacement/destroy.

Details: [Performance optimization](./performance-optimization.md).

---

## Data flow, end to end

```
User gesture
  → UI button / keyboard / API method
  → UniversalPlayer method
  → engine method
  → browser media event
  → bindMediaElement / engine bridge
  → PlayerEventBus.emit
  → #applyEventToState (state patch)
  → UI render + observables + DOM events + analytics
```

The arrow always returns through the player. No engine writes state directly
and no framework wrapper owns playback.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)