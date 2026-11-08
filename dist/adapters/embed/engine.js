import { createIframeEngine } from "../shared/iframe-engine.js";
// src/adapters/embed/engine.ts
/** Generic iframe embed engine. */
function createEmbedEngine(context) {
	return createIframeEngine(context, "generic");
}
export { createEmbedEngine };

//# sourceMappingURL=engine.js.map