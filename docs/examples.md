# Examples

> [Docs home](./README.md) › Examples

There are two example trees:

| Tree | What it is | Best for |
| --- | --- | --- |
| [`examples/`](../examples/README.md) | A Markdown-only lab book: 5 frameworks, 22 formats, 6 features, recipes and use cases | Learning and copy-paste |
| [`_examples/`](../_examples/README.md) | Runnable Vite/Angular demo apps linked with `file:../..` | Running the repository locally (maintainers) |

## Run the demo apps

```bash
pnpm build
cd _examples/vanilla && pnpm install && pnpm dev
cd _examples/react && pnpm install && pnpm dev
cd _examples/vue && pnpm install && pnpm dev
cd _examples/svelte && pnpm install && pnpm dev
cd _examples/angular && pnpm install && pnpm start
```

Consumers do **not** need these steps: install the published package from npm with `npm install @codewithrajat/universal-player`. The `file:../..` links above are workspace links for maintainers running the in-repo demos; build the library first only for those demos, which resolve `dist/` through the `file:` dependency.

## Full UI in one file

```html
<script type="module">
  import "@codewithrajat/universal-player";
</script>
<universal-player src="/clip.mp4" controls="custom" theme="dark"></universal-player>
```

## Headless in one file

```ts
import { createPlayer } from "@codewithrajat/universal-player/core";

const player = createPlayer({
  container: document.querySelector("#app")!,
  source: "/clip.mp4",
  controls: "native",
});
```

`controls: "custom"` removes browser controls without adding any. The framework wrappers and `mountUniversalPlayer()` are headless too.

## Where to go next

| Need | Page |
| --- | --- |
| Framework-specific basics | [Example book](../examples/README.md) |
| Format-specific caveats | [Format matrix](./reference/formats-matrix.md) |
| A complete option object | [Options cheatsheet](./options-cheatsheet.md) |
| Production patterns | [Enterprise example](./examples/enterprise.md) |

**Next:** [Migration](./migration.md) · [FAQ](./faq.md)

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)
