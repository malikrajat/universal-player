# Dark mode

> [Docs home](../README.md) › [Theming](./dark-mode.md) › Dark mode

## Built-in modes

| Attribute | Behaviour |
| --- | --- |
| `theme="dark"` | Dark tokens |
| `theme="light"` | Light tokens |
| `theme="system"` | `prefers-color-scheme` in CSS; default |

```html
<universal-player theme="system"></universal-player>
```

## App-controlled mode

```ts
player.setTheme("dark");       // updates options; the element re-renders on state
element.setAttribute("theme", "dark"); // declarative path
```

For the element, changing the attribute is the reliable path. In headless mode, `theme` has no rendering effect.

## Avoiding a flash

Set `theme` in the initial markup. Do not wait for JavaScript to choose the mode.

```html
<universal-player theme="dark" src="/clip.mp4"></universal-player>
```

## Host page integration

If your app toggles `html.dark`, also set the attribute or provide matching tokens; Shadow DOM does not inherit `color-scheme` semantics automatically.

**Canonical guide:** [Theming root](../theming.md)

---

← Previous: [Custom themes](./custom-themes.md) · Next: [Responsive design](./responsive-design.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
