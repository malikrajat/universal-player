import { UniversalPlayer } from "../core/player.js";
import { PlayerOptions, PlayerSourceInput } from "../core/types.js";
/** Options accepted by {@link mountUniversalPlayer}. */
export interface MountOptions extends Omit<PlayerOptions, "container"> {
  readonly source?: PlayerSourceInput;
}
/**
 * Creates a player inside an element (or the first element matching a selector).
 */
export declare function mountUniversalPlayer(target: string | HTMLElement, options?: MountOptions): UniversalPlayer;
//# sourceMappingURL=mount.d.ts.map