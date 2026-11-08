# Theming

> [Docs home](./README.md) õ Theming

[‚Üê Docs](./README.md) ¬∑ [Advanced configuration](./advanced-configuration.md) ¬∑ [Defaults](./defaults.md)

The built-in UI is neutral by default. Progress fills, slider thumbs, selected
menu items and focus rings use a white accent on dark themes (dark ink on light
themes). You can change the accent per instance, override any token, or style
structural parts.

---

## 1. Three levels of customisation

| Level  | Use it for                   | Mechanism                                           |
| ------ | ---------------------------- | --------------------------------------------------- |
| Accent | One brand colour             | `accent-color` attribute / `ui.theme.colors.accent` |
| Tokens | Colours, radius, font, menus | CSS custom properties / `ui.theme`                  |
| Parts  | Structural elements          | `::part()`                                          |

---

## 2. `accent-color`

```html
<universal-player src="/clip.mp4" accent-color="#22c55e"></universal-player>
```

```ts
createPlayer({
  container,
  source: "/clip.mp4",
  ui: { theme: { colors: { accent: "#22c55e" } } },
});
```

The component derives a readable contrast colour from the accent and sets
`--up-color-accent` and `--up-color-accent-contrast`. To control the contrast
yourself:

```ts
ui: {
  theme: {
    colors: {
      accent: "#22c55e",
      accentContrast: "#06240f",
    },
  },
}
```

---

## 3. Theme modes

```html
<universal-player theme="system"></universal-player>
<universal-player theme="dark"></universal-player>
<universal-player theme="light"></universal-player>
```

`system` follows `prefers-color-scheme` and re-evaluates when it changes. Runtime:
`player.setTheme("dark")`.

---

## 4. CSS custom properties

All tokens are set on `.up-root` and the host, so both of these work:

```css
universal-player {
  --up-color-accent: #22c55e;
  --up-radius: 1rem;
}
```

```css
universal-player::part(root) {
  --up-color-accent: #22c55e;
}
```

### Colour tokens

| Token                        | Dark default            | Light default           |
| ---------------------------- | ----------------------- | ----------------------- |
| `--up-color-bg`              | `#050505`               | `#f8fafc`               |
| `--up-color-surface`         | `rgba(15,15,15,.9)`     | `rgba(248,250,252,.95)` |
| `--up-color-surface-strong`  | `rgba(12,12,12,.98)`    | `rgba(255,255,255,.99)` |
| `--up-color-menu`            | `rgba(10,10,10,.38)`    | `rgba(255,255,255,.52)` |
| `--up-color-fg`              | `#f8fafc`               | `#0f172a`               |
| `--up-color-muted`           | `rgba(248,250,252,.72)` | `rgba(15,23,42,.68)`    |
| `--up-color-accent`          | `#ffffff`               | `#0f172a`               |
| `--up-color-accent-contrast` | `#0b0b0b`               | `#ffffff`               |
| `--up-color-border`          | `rgba(248,250,252,.14)` | `rgba(15,23,42,.12)`    |
| `--up-color-danger`          | `#f87171`               | `#f87171`               |
| `--up-color-overlay`         | `rgba(0,0,0,.72)`       | `rgba(15,23,42,.62)`    |
| `--up-control-hover`         | `rgba(0,0,0,.6)`        | `rgba(15,23,42,.12)`    |

### Shape and type tokens

| Token                 | Default                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `--up-font-family`    | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`              |
| `--up-radius`         | `0.75rem`                                                               |
| `--up-control-radius` | `0.5rem`                                                                |
| `--up-control-size`   | `2.5rem`                                                                |
| `--up-menu-blur`      | `24px`                                                                  |
| `--up-focus-ring`     | `0 0 0 3px color-mix(in srgb, var(--up-color-accent) 45%, transparent)` |
| `--up-transition`     | `160ms ease`                                                            |
| `--up-z-controls`     | `2`                                                                     |
| `--up-z-overlay`      | `3`                                                                     |
| `--up-z-menu`         | `6`                                                                     |

### Slider tokens

| Token                   | Default        |
| ----------------------- | -------------- |
| `--up-slider-thickness` | `0.2rem`       |
| `--up-slider-thumb`     | `0.85rem`      |
| `--up-volume`           | `0%` (runtime) |

### Caption tokens

| Token                     | Default           |
| ------------------------- | ----------------- |
| `--up-caption-size`       | `100%`            |
| `--up-caption-color`      | `#ffffff`         |
| `--up-caption-background` | `rgba(0,0,0,.72)` |
| `--up-caption-opacity`    | `1`               |
| `--up-caption-edge`       | `"outline"`       |
| `--up-caption-font`       | `inherit`         |

### Survey tokens

| Token                         | Default                                                |
| ----------------------------- | ------------------------------------------------------ |
| `--up-survey-button-radius`   | `var(--up-control-radius)`                             |
| `--up-survey-submit-bg`       | `var(--up-color-accent)`                               |
| `--up-survey-submit-color`    | `var(--up-color-accent-contrast)`                      |
| `--up-survey-submit-hover-bg` | `color-mix(in srgb, var(--up-color-accent) 84%, #000)` |
| `--up-survey-submit-border`   | `transparent`                                          |

Rounded survey actions:

```css
universal-player {
  --up-survey-button-radius: 999px;
  --up-survey-submit-bg: #22c55e;
  --up-survey-submit-color: #06240f;
  --up-survey-submit-hover-bg: #16a34a;
}
```

---

## 5. `ui.theme`

```ts
ui: {
  theme: {
    colors: {
      accent: "#22c55e",
      accentContrast: "#06240f",
      background: "#0a0a0a",
      surface: "rgba(20,20,20,.92)",
      foreground: "#f8fafc",
      muted: "rgba(248,250,252,.7)",
      border: "rgba(255,255,255,.16)",
      overlay: "rgba(0,0,0,.72)",
    },
    radius: "1rem",
    controlRadius: "0.5rem",
    fontFamily: "Inter, system-ui, sans-serif",
    menuBackground: "rgba(24,24,24,.82)",
    menuBlur: "16px",
    variables: {
      "--up-control-size": "2.75rem",
      "--up-survey-button-radius": "999px",
    },
  },
}
```

`variables` is the escape hatch for any `--up-*` token not covered by a
convenience field.

---

## 6. Parts

| Part              | Element                    |
| ----------------- | -------------------------- |
| `root`            | Outer `.up-root` container |
| `stage`           | Stage wrapper              |
| `viewport`        | Media viewport             |
| `audio-visual`    | Animated audio surface     |
| `controls`        | Control bar                |
| `play-button`     | Play/pause button          |
| `big-play-button` | Center play button         |
| `time`            | Timestamp                  |
| `menu`            | Floating menu/sheet        |
| `spinner`         | Loading spinner            |
| `error`           | Error overlay              |
| `toast`           | Toast                      |
| `range`           | Slider inputs              |

```css
universal-player::part(controls) {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding-block: 1rem;
}

universal-player::part(play-button) {
  border-radius: 999px;
}
```

Parts are only available in Shadow DOM mode. In light DOM, target the classes
inside the host (`.up-root`, `.up-controls`, ‚Ä¶), or use tokens.

---

## 7. Light DOM

```html
<script type="module">
  import "@codewithrajat/universal-player";
  import "@codewithrajat/universal-player/styles.css";
</script>

<universal-player src="/clip.mp4" shadow="light"></universal-player>
```

Or let the element inject the stylesheet once:

```html
<universal-player src="/clip.mp4" shadow="light" inject-styles></universal-player>
```

Light DOM is useful when your design system must style controls with normal
page CSS. Trade-off: no style isolation, and you must load the stylesheet.

---

## 8. Complete brand example

```html
<universal-player
  src="/clip.mp4"
  theme="dark"
  accent-color="#f97316"
  ui='{"theme":{"radius":"1.25rem","fontFamily":"Inter, system-ui, sans-serif","menuBackground":"rgba(20,20,20,.82)","menuBlur":"18px"}}'
></universal-player>
```

```css
universal-player {
  --up-color-accent: #f97316;
  --up-color-accent-contrast: #1a0a00;
  --up-radius: 1.25rem;
  --up-control-size: 2.75rem;
  --up-survey-button-radius: 999px;
}
```

---

## 9. Theme presets

Copy-paste starting points. Adjust the accent to your brand and check contrast.

### Neutral dark (default)

```css
universal-player[theme="dark"] {
  --up-color-accent: #ffffff;
  --up-color-accent-contrast: #0b0b0b;
}
```

### Emerald

```css
universal-player {
  --up-color-accent: #22c55e;
  --up-color-accent-contrast: #06240f;
  --up-survey-submit-bg: #22c55e;
  --up-survey-submit-color: #06240f;
  --up-survey-submit-hover-bg: #16a34a;
}
```

### Orange

```css
universal-player {
  --up-color-accent: #f97316;
  --up-color-accent-contrast: #1a0a00;
  --up-survey-submit-bg: #f97316;
  --up-survey-submit-color: #1a0a00;
}
```

### Violet

```css
universal-player {
  --up-color-accent: #8b5cf6;
  --up-color-accent-contrast: #ffffff;
  --up-survey-submit-bg: #8b5cf6;
  --up-survey-submit-color: #ffffff;
}
```

### Rounded / friendly

```css
universal-player {
  --up-radius: 1.25rem;
  --up-control-radius: 999px;
  --up-control-size: 2.75rem;
  --up-survey-button-radius: 999px;
  --up-font-family: "Inter", system-ui, sans-serif;
}
```

### Compact / kiosk

```css
universal-player {
  --up-control-size: 2.1rem;
  --up-radius: 0.25rem;
  --up-slider-thumb: 0.7rem;
}
```

```ts
ui: {
  controls: ["play", "fullscreen"],
  settings: false,
  download: false,
  share: false,
  gestures: false,
}
```

### Glassy menus

```ts
ui: {
  theme: {
    menuBackground: "rgba(20,20,20,.72)",
    menuBlur: "18px",
    radius: "1rem",
  },
}
```

### Light theme

```html
<universal-player theme="light"></universal-player>
```

```css
universal-player[theme="light"] {
  --up-color-accent: #0f172a;
  --up-color-accent-contrast: #ffffff;
}
```

---

## 10. Accessibility and contrast

- The auto-derived accent contrast uses luminance to choose near-black or white.
- Focus rings use a colour-mixed accent, so they remain visible on dark and
  light themes.
- `prefers-reduced-motion` removes non-essential animation.
- `forced-colors` mode replaces custom surfaces with system colours.
- Always test your brand accent against both themes; the player cannot guarantee
  WCAG contrast for arbitrary colours.

See [Accessibility](./accessibility.md).

---

**Docs home** ∑ [Documentation index](./README.md) ∑ [Summary](./SUMMARY.md)