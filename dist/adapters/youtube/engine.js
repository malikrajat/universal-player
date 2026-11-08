import { createIframeEngine } from "../shared/iframe-engine.js";
// src/adapters/youtube/engine.ts
/** YouTube embed engine. */
function createYouTubeEngine(context) {
	return createIframeEngine(context, "youtube");
}
export { createYouTubeEngine };

//# sourceMappingURL=engine.js.map