# Angular example

```bash
pnpm install
pnpm start
```

Angular libraries built by a generic bundler cannot safely ship a precompiled
`@Component` (AOT needs partial-compilation metadata). This package therefore
ships `AngularUniversalPlayer`, a decorator-free controller. The example owns
the standalone `@Component` and forwards `ngAfterViewInit` / `ngOnChanges` /
`ngOnDestroy` to the controller.
