# Customization

> [Examples home](../README.md) › [React](./README.md) › Customization

## Configure the built-in UI

The full-UI wrapper renders `<universal-player>`. Set attributes or pass `ui` JSON:

```html
<universal-player
  controls="custom"
  theme="dark"
  accent-color="#7c3aed"
  ui='{"settings":{"stats":false},"showTitle":true}'
></universal-player>
```

## Option reference

| Option | Values | Default |
| --- | --- | --- |
| `controls` | `custom`/`native` | `custom` |
| `theme` | `light`/`dark`/`system` | `system` |
| `accent-color` | CSS colour | token |
| `ui.controls` | allow-list/object | all |
| `ui.hide` | control names | `[]` |
| `ui.order` | control names | default |
| `ui.settings` | sections | all |
| `ui.time.mode` | `elapsed`/`remaining` | `elapsed` |
| `ui.download` | boolean/object | hidden |
| `ui.gestures` | object/false | disabled |
| `showBigPlay`, `showTime`, `showBuffered` | boolean | `true` |
| `idleDelay` | ms | `3000` (min 500) |

## Theme and CSS tokens

```css
universal-player {
  --up-color-accent: #7c3aed;
  --up-radius: 0.5rem;
  --up-control-size: 2.75rem;
}
```

Full token list: [docs/theming/design-tokens.md](../../docs/theming/design-tokens.md).

## Labels and localization

```ts
import { registerLocale, setStrings } from "@codewithrajat/universal-player/ui";

registerLocale("fr", { play: "Lire", pause: "Pause" });
setStrings("fr", { settings: "Réglages" });
```

Per instance: `element.strings = { play: "Start" }`.

## Password prompt

None. The package has no password/encryption API.

## Statistics

The stats sheet is built in. There is no public stats API; read `state` and the media element yourself for custom stats.

## Editable surfaces

None. This is a media player, not an editor.

## Custom chrome

Use the headless surface:

```tsx
import { UniversalPlayer } from "@codewithrajat/universal-player/react";

export function Headless() {
  return <UniversalPlayer source={"/media/sample.mp4"} controls="native" />;
}
```

Then render from `state` and call methods. Add your own keyboard handling and focus styles.

## Custom adapter or converter

Neither is a public API. Framework wrappers are the adapter layer; transcoding happens server-side.

## Error UI

```ts
player.on("error", ({ error }) => {
  if (!isPlayerError(error)) return;
  banner.textContent = `${error.code}: ${error.message}`;
});
```

The built-in UI has an error overlay with retry.

## Lazy loading

Import the UI or framework adapter only when the player is needed. See [lazy loading](../docs/guides/lazy-loading.md).

## Layout and accessibility

Size the host; reserve `aspect-ratio: 16/9`. Do not remove focus outlines. See [accessibility](../guides/accessibility.md).

## Next

[Edge cases](./edge-cases.md)

---

**Docs home** · [Documentation index](../../docs/README.md) · [Summary](../../docs/SUMMARY.md)
