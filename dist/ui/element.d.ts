import { UniversalPlayer } from "../core/player.js";
import { PlayerSourceInput, PlayerStrings } from "../core/types.js";
/** Default custom-element tag name. */
export declare const UNIVERSAL_PLAYER_TAG = "universal-player";
/**
 * `<universal-player>` web component.
 *
 * Attributes:
 * - `src`, `type`, `poster`, `label`
 * - `autoplay`, `muted`, `loop`, `playsinline`
 * - `controls="custom|native"`, `theme="light|dark|system"`,
 *   `accent-color` (any CSS colour)
 * - `locale`, `preload`, `crossorigin`, `start-time`, `volume`, `rate`
 * - `chapters`, `thumbnails`, `captions`, `survey`, `playlist`, `image`, `ui` (JSON)
 * - `keyboard`, `click-to-play`, `double-click-fullscreen`,
 *   `auto-hide-controls`, `seek-step`, `volume-step`
 * - `shadow="shadow|light"` (read once), `inject-styles` (light DOM only)
 */
export declare class UniversalPlayerElement extends HTMLElement {
  #private;
  static get observedAttributes(): readonly string[];
  /** The live player instance, or null before connection. */
  get player(): UniversalPlayer | null;
  /** Per-instance string overrides. */
  set strings(value: Partial<PlayerStrings>);
  get strings(): Partial<PlayerStrings>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
  /** Loads a new source. */
  load(source: PlayerSourceInput): Promise<void>;
  /** Starts playback. */
  play(): Promise<void>;
  /** Pauses playback. */
  pause(): void;
  /** Seeks to an absolute time in seconds. */
  seek(time: number): void;
  /** Returns an iframe embed snippet for the current media, or null. */
  getEmbedCode(): string | null;
  /** Destroys the internal player. */
  destroy(): void;
}
/**
 * Registers `<universal-player>` once.
 *
 * Returns false when the Custom Elements API is unavailable.
 */
export declare function defineUniversalPlayerElement(tagName?: string): boolean;
//# sourceMappingURL=element.d.ts.map