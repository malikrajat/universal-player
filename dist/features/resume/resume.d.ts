import { ResumeOptions } from "../../core/types.js";
/** Default key prefix for resume entries. */
export declare const DEFAULT_RESUME_KEY_PREFIX = "universal-player:";
/** Storage adapter used by resume helpers. */
export interface ResumeStore {
  read(key: string): number | null;
  write(key: string, time: number): void;
  clear(key: string): void;
}
/**
 * Creates a resume store.
 *
 * Storage failures (private mode, quota, disabled cookies) are swallowed and
 * surfaced as `null`/no-op results.
 */
export declare function createResumeStore(options?: ResumeOptions): ResumeStore;
//# sourceMappingURL=resume.d.ts.map