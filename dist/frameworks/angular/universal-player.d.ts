import { UniversalPlayer } from "../../core/player.js";
import { PlayerEvent, PlayerOptions, PlayerSourceInput, PlayerState } from "../../core/types.js";
import { AfterViewInit, ChangeDetectorRef, ElementRef, NgZone, OnChanges, OnDestroy } from "@angular/core";
/** Inputs forwarded from an Angular component. */
export type AngularUniversalPlayerInputs = Omit<PlayerOptions, "container" | "onStateChange" | "onEvent">;
/** Output callbacks forwarded to Angular outputs. */
export interface AngularUniversalPlayerOutputs {
  readonly ready?: (state: PlayerState) => void;
  readonly stateChange?: (state: PlayerState) => void;
  readonly error?: (error: Error) => void;
  readonly event?: (event: PlayerEvent) => void;
  readonly player?: (player: UniversalPlayer | null) => void;
}
/** Construction options for {@link AngularUniversalPlayer}. */
export interface AngularUniversalPlayerOptions {
  readonly elementRef: Pick<ElementRef<Element>, "nativeElement">;
  readonly ngZone?: Pick<NgZone, "run" | "runOutsideAngular">;
  readonly changeDetector?: Pick<ChangeDetectorRef, "markForCheck">;
  readonly inputs?: AngularUniversalPlayerInputs;
  readonly outputs?: AngularUniversalPlayerOutputs;
}
/**
 * Framework-neutral Angular controller.
 *
 * Angular libraries built with a generic bundler cannot emit partial
 * compilation metadata, so a precompiled `@Component` would not be AOT-safe.
 * Consumers therefore own the decorated standalone component and forward
 * lifecycle calls to this controller (see `examples/angular`).
 */
export declare class AngularUniversalPlayer implements AfterViewInit, OnChanges, OnDestroy {
  #private;
  constructor(options: AngularUniversalPlayerOptions);
  /** Latest state snapshot. */
  get state(): PlayerState;
  /** Live player, or null before connection/after destruction. */
  get player(): UniversalPlayer | null;
  /** Whether `ngOnDestroy` has run. */
  get destroyed(): boolean;
  /** Replaces the outputs after construction. */
  setOutputs(outputs: AngularUniversalPlayerOutputs): void;
  /** Stores new inputs and applies them. */
  setInputs(inputs: AngularUniversalPlayerInputs): void;
  /** Angular lifecycle hook. */
  ngOnChanges(): void;
  /** Angular lifecycle hook; creates the player once. */
  ngAfterViewInit(): void;
  /** Angular lifecycle hook; terminal and idempotent. */
  ngOnDestroy(): void;
  /** Loads or replaces the source after connection. */
  load(source: PlayerSourceInput): Promise<void>;
  /** Starts playback. */
  play(): Promise<void>;
  /** Pauses playback. */
  pause(): void;
  /** Seeks to an absolute time in seconds. */
  seek(time: number): void;
  /** Sets the volume in the 0–1 range. */
  setVolume(volume: number): void;
  /** Mutes or unmutes playback. */
  setMuted(muted: boolean): void;
  /** Sets the playback rate. */
  setPlaybackRate(rate: number): void;
  /** Subscribes to state snapshots. */
  subscribe(listener: (state: PlayerState) => void): () => void;
  /** Resolves after queued load work settles. */
  whenIdle(): Promise<void>;
}
//# sourceMappingURL=universal-player.d.ts.map