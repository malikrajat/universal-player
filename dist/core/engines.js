import { createChunkedMediaEngine } from "../adapters/chunked/engine.js";
import { createDashEngine } from "../adapters/dash/engine.js";
import { createEmbedEngine } from "../adapters/embed/engine.js";
import { createHlsEngine } from "../adapters/hls/engine.js";
import { createImageEngine } from "../adapters/image/engine.js";
import { createNativeEngine } from "../adapters/native/engine.js";
import { createVimeoEngine } from "../adapters/vimeo/engine.js";
import { createYouTubeEngine } from "../adapters/youtube/engine.js";
// src/core/engines.ts
/**
* Resolves the engine for a normalized source.
*
* Engine choice is internal: the public API does not expose a plugin registry.
*/
function createEngine(context) {
	switch (context.source.provider) {
		case "chunked": return createChunkedMediaEngine(context);
		case "hls": return createHlsEngine(context);
		case "dash": return createDashEngine(context);
		case "youtube": return createYouTubeEngine(context);
		case "vimeo": return createVimeoEngine(context);
		case "generic-embed": return createEmbedEngine(context);
		case "image": return createImageEngine(context);
		case "native": return createNativeEngine(context);
		default: return createNativeEngine(context);
	}
}
export { createEngine };

//# sourceMappingURL=engines.js.map