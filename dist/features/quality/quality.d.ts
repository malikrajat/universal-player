import { QualityLevel } from "../../core/types.js";
/** Returns quality levels sorted from highest to lowest. */
export declare function normalizeQualityLevels(levels: readonly QualityLevel[]): readonly QualityLevel[];
/** Finds a quality level by id. */
export declare function findQuality(levels: readonly QualityLevel[], id: string | null): QualityLevel | null;
/**
 * Steps through the quality ladder.
 *
 * Levels are ordered highest first. A positive `direction` moves to a higher
 * quality, a negative one to a lower quality. Passing the edge of the ladder
 * selects automatic quality (`null`). When automatic quality is active, the
 * first step picks the highest or lowest level in that direction.
 */
export declare function stepQuality(levels: readonly QualityLevel[], currentId: string | null, direction: number): string | null;
/** Human-readable label for a quality level. */
export declare function qualityLabel(level: QualityLevel): string;
//# sourceMappingURL=quality.d.ts.map