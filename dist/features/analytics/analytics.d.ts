import { AnalyticsEvent, AnalyticsOptions, PlayerState } from "../../core/types.js";
/** Receives vendor-neutral analytics events. */
export type AnalyticsSink = (event: AnalyticsEvent) => void;
/** Creates a safe analytics sink from player options. */
export declare function createAnalyticsSink(options: AnalyticsOptions): AnalyticsSink;
/** Builds an analytics payload from a player state snapshot. */
export declare function toAnalyticsEvent(type: string, state: PlayerState, source: string | null, metadata?: Readonly<Record<string, unknown>>): AnalyticsEvent;
//# sourceMappingURL=analytics.d.ts.map