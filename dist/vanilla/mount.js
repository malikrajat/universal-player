import { createPlayerError } from "../core/errors.js";
import { UniversalPlayer } from "../core/player.js";
// src/vanilla/mount.ts
/**
* Creates a player inside an element (or the first element matching a selector).
*/
function mountUniversalPlayer(target, options = {}) {
	const container = typeof target === "string" ? document.querySelector(target) : target;
	if (container === null) {
		const selector = typeof target === "string" ? target : "<element>";
		throw createPlayerError(`No element matches "${selector}".`, {
			code: "invalid-argument",
			details: { selector }
		});
	}
	const { source, ...rest } = options;
	return new UniversalPlayer({
		container,
		...source === void 0 ? {} : { source },
		...rest
	});
}
export { mountUniversalPlayer };

//# sourceMappingURL=mount.js.map