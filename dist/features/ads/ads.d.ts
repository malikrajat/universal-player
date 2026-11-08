/** A scheduled ad break. */
export interface AdBreak {
  readonly id: string;
  readonly time: number;
  readonly duration: number;
  readonly label?: string;
}
/** An ad schedule. */
export interface AdSchedule {
  readonly breaks: readonly AdBreak[];
  readonly preRoll?: boolean;
  readonly postRoll?: boolean;
}
/** Controls ad playback. Implementations are supplied by an ad SDK. */
export interface AdController {
  readonly schedule: AdSchedule;
  playPreRoll(): Promise<void>;
  playMidRoll(breakId: string): Promise<void>;
  playPostRoll(): Promise<void>;
  destroy(): void;
}
/** Finds the ad break covering a timestamp. */
export declare function findAdBreakAt(schedule: AdSchedule, time: number): AdBreak | null;
/**
 * Creates a placeholder ad controller.
 *
 * The skeleton reserves the contract; wire a VAST/IMA SDK by replacing the
 * three `play*` methods.
 */
export declare function createAdController(schedule: AdSchedule): AdController;
//# sourceMappingURL=ads.d.ts.map