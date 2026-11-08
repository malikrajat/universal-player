import { PlayerStrings } from "../core/types.js";
import { formatTime, formatTimecode } from "../core/utils.js";
/** Default English UI strings. */
export declare const PLAYER_STRINGS_EN: PlayerStrings;
/** Registers or replaces the strings for a locale. */
export declare function registerLocale(locale: string, strings: Partial<PlayerStrings>): void;
/** Alias for {@link registerLocale}. */
export declare function setStrings(locale: string, strings: Partial<PlayerStrings>): void;
/** Resolves the strings for a locale, applying per-instance overrides. */
export declare function getStrings(locale?: string, overrides?: Partial<PlayerStrings>): PlayerStrings;
//# sourceMappingURL=i18n.d.ts.map