import { UniversalPlayer as UniversalPlayer$1 } from "../../core/player.js";
import { PlayerOptions, PlayerSourceInput, PlayerState } from "../../core/types.js";
import { CSSProperties, ReactNode, RefObject } from "react";
/** Inputs accepted by the React hook and component. */
export interface UseUniversalPlayerOptions extends Omit<PlayerOptions, "container"> {}
/** Imperative handle exposed by the React component. */
export interface UniversalPlayerHandle {
  readonly player: UniversalPlayer$1 | null;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  load(source: PlayerSourceInput): Promise<void>;
}
/** Result returned by {@link useUniversalPlayer}. */
export interface UseUniversalPlayerResult {
  readonly hostRef: RefObject<HTMLDivElement | null>;
  readonly player: UniversalPlayer$1 | null;
  readonly state: PlayerState;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  load(source: PlayerSourceInput): Promise<void>;
}
/** Props accepted by the React component. */
export interface UniversalPlayerProps extends UseUniversalPlayerOptions {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children?: ReactNode;
}
/**
 * Creates and maintains one player for the lifetime of a component.
 *
 * Source changes are keyed through `sourceToken`, so equivalent URL values do
 * not reload. The player is destroyed on unmount (including Strict Mode's
 * simulated unmount).
 */
export declare function useUniversalPlayer(options: UseUniversalPlayerOptions): UseUniversalPlayerResult;
/**
 * React host component.
 *
 * It renders only the host element; media, engine and controls live in the
 * framework-neutral core.
 */
export declare const UniversalPlayer: import("react").ForwardRefExoticComponent<UniversalPlayerProps & import("react").RefAttributes<UniversalPlayerHandle>>;
//# sourceMappingURL=universal-player.d.ts.map