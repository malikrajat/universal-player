import { createIframeEngine } from "../shared/iframe-engine.js";
// src/adapters/vimeo/engine.ts
/** Vimeo embed engine. */
function createVimeoEngine(context) {
	return createIframeEngine(context, "vimeo");
}
export { createVimeoEngine };

//# sourceMappingURL=engine.js.map