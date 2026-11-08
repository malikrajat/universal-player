import { UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement } from "../ui/element.js";
import { PLAYER_STRINGS_EN, getStrings, registerLocale, setStrings } from "../ui/i18n.js";
// src/entries/ui.ts
/**
* Public entry: `@codewithrajat/universal-player/ui`.
*
* Importing this entry registers `<universal-player>`. The registration is
* idempotent and skipped when the Custom Elements API is unavailable.
*/
defineUniversalPlayerElement();
export { PLAYER_STRINGS_EN, UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement, getStrings, registerLocale, setStrings };

//# sourceMappingURL=ui.js.map