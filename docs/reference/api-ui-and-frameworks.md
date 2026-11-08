# UI and framework APIs

> [Docs home](../README.md) › [Reference](./README.md) › UI and framework APIs

## `<universal-player>`

### Attributes

| Attribute | Type | Default | Notes |
| --- | --- | --- | --- |
| `src` | string | — | Loads on change |
| `type` | string | — | Reloads the source |
| `poster`, `thumbnail` | URL | — | `thumbnail` is a fallback for `poster` |
| `autoplay`, `muted`, `loop` | boolean presence | false | |
| `controls` | `custom`/`native` | `custom` | `native` shows browser controls |
| `theme` | `light`/`dark`/`system` | `system` | |
| `accent-color` | CSS colour | token default | Auto contrast heuristic |
| `ui` | JSON | — | `UIOptions` |
| `locale` | BCP 47 | `en` | |
| `preload` | `none`/`metadata`/`auto` | `metadata` | Reloads |
| `crossorigin` | `anonymous`/`use-credentials`/`null` | — | Reloads |
| `playsinline` | boolean, `"false"` disables | true | Reloads |
| `start-time` | number | — | Reloads |
| `shadow` | `shadow`/`light` | shadow | Remounts |
| `inject-styles` | presence | — | Light DOM only |
| `volume`, `rate` | number | 1 / 1 | |
| `label` | string | `Media player` | |
| `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image` | JSON | — | Invalid JSON ignored |
| `keyboard`, `click-to-play`, `double-click-fullscreen`, `auto-hide-controls` | boolean, `"false"` disables | true | |
| `seek-step`, `volume-step` | number | 5 / 0.1 | |

### Instance members

`player` (getter), `strings` (get/set), `load()`, `play()`, `pause()`, `seek()`, `getEmbedCode()`, `destroy()`.

### DOM events

The element re-dispatches 28 core events as `CustomEvent` with `detail` equal to the typed payload. `destroy` is not forwarded.

```ts
element.addEventListener("statechange", (event) => {
  const state = (event as CustomEvent<PlayerState>).detail;
});
```

## i18n

```ts
import { getStrings, registerLocale, setStrings, PLAYER_STRINGS_EN } from "@codewithrajat/universal-player/ui";

registerLocale("fr", { play: "Lire", pause: "Pause" });
const strings = getStrings("fr");
element.strings = { play: "Lecture" }; // per instance
```

`registerLocale` merges over English; it does not require a complete string set.

## React

Exports: `UniversalPlayer`, `useUniversalPlayer`, types.

`UniversalPlayerProps` = `Omit<PlayerOptions, "container">` + `className`, `style`, `children`.

`UniversalPlayerHandle`: `player`, `play`, `pause`, `seek`, `load`.

`UseUniversalPlayerResult`: `hostRef`, `player`, `state`, `play`, `pause`, `seek`, `load`.

Reactivity: source (via `sourceToken`), volume, muted, playbackRate. Other props are initial-only. The component renders `<div data-up-framework="react" data-up-status="…">`.

## Vue

Exports: `UniversalPlayer`, `useUniversalPlayer`, `MaybeRef`, `PlayerOptionKey`, types.

`UseUniversalPlayerOptions` maps each `PlayerOptions` key (except `container`) to `MaybeRef<T>`, plus `host: MaybeRef<HTMLElement | null>`.

`UseUniversalPlayerResult`: `state` and `player` are refs; `play`, `pause`, `seek`, `load`, `destroy`.

Component props: `src`, `controls`, `theme`, `locale`, `autoplay`, `muted`, `loop`, `poster`, `volume`, `playbackRate`, `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `keyboard`, `clickToPlay`, `autoHideControls`, `seekStep`, `volumeStep`. Emits: `ready`, `play`, `pause`, `timeupdate`, `ended`, `error`, `statechange`.

## Angular

`AngularUniversalPlayer` implements `AfterViewInit`, `OnChanges`, `OnDestroy`.

| Member | Signature |
| --- | --- |
| `constructor` | `(options: AngularUniversalPlayerOptions)` |
| `state`, `player`, `destroyed` | getters |
| `setInputs` | `(inputs) => void`; throws after destroy |
| `setOutputs` | `(outputs) => void` |
| `ngOnChanges`, `ngAfterViewInit`, `ngOnDestroy` | lifecycle |
| `load`, `play`, `pause`, `seek`, `setVolume`, `setMuted`, `setPlaybackRate` | forwarding |
| `subscribe` | `(listener) => unsubscribe` |
| `whenIdle` | `() => Promise<void>` |

`AngularUniversalPlayerOptions` = `elementRef`, optional `ngZone`, optional `changeDetector`, optional `inputs`, optional `outputs`.

## Svelte

Default export from `/svelte4` or `/svelte5`. Props as listed in [Frameworks](../guides/frameworks.md#svelte). Dispatches `ready`, `play`, `pause`, `timeupdate`, `ended`, `error`, `statechange`.

**Next:** [Errors](./errors.md)

---

← Previous: [Feature APIs](./api-features.md) · Next: [Errors](./errors.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
