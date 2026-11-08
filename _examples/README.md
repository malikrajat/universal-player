# Examples

Each example is a standalone Vite (or Angular CLI) app that links the package
from the repository root via `file:../..`.

```bash
cd examples/vanilla && pnpm install && pnpm dev
cd examples/react   && pnpm install && pnpm dev
cd examples/vue     && pnpm install && pnpm dev
cd examples/svelte  && pnpm install && pnpm dev
cd examples/angular && pnpm install && pnpm start
```

Build the package first (`pnpm run build` at the repository root) so the
`file:` dependency resolves `dist/`.

## Framework coverage

| Example | Entry point                             |
| ------- | --------------------------------------- |
| vanilla | root + `/ui` + `/styles.css`            |
| react   | `/react`                                |
| vue     | `/vue`                                  |
| svelte  | `/svelte5` (switch to `/svelte4` to test Svelte 4) |
| angular | `/angular` controller + standalone host |
