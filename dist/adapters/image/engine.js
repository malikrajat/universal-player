import { IMAGE_CAPABILITIES } from "../../core/engine.js";
import { createPlayerError } from "../../core/errors.js";
import { collectChunks } from "../shared/chunks.js";
import { removeElement } from "../shared/dom.js";
// src/adapters/image/engine.ts
/** Still-image engine. */
function createImageEngine(context) {
	const { source, emit } = context;
	let image = null;
	let objectUrl = null;
	return {
		kind: "image",
		get element() {
			return image;
		},
		capabilities: IMAGE_CAPABILITIES,
		async load() {
			const element = document.createElement("img");
			element.className = "up-media up-image";
			element.setAttribute("part", "media");
			element.decoding = "async";
			element.loading = "eager";
			element.alt = "alt" in source.source ? source.source.alt ?? "" : "";
			image = element;
			context.host.append(element);
			let url = source.url;
			if (source.chunks !== null) {
				const blob = await collectChunks(source.chunks, source.mimeType ?? "image/*", "chunkDelay" in source.source ? source.source.chunkDelay : 0);
				if (typeof URL.createObjectURL === "function") {
					objectUrl = URL.createObjectURL(blob);
					url = objectUrl;
				}
			}
			await new Promise((resolve, reject) => {
				element.addEventListener("load", () => resolve(), { once: true });
				element.addEventListener("error", () => reject(createPlayerError("The image could not be loaded.", {
					code: "media-error",
					details: { source: url }
				})), { once: true });
				element.src = url;
			});
			emit("loadedmetadata", {
				duration: 0,
				width: element.naturalWidth,
				height: element.naturalHeight,
				live: false
			});
		},
		async play() {},
		pause() {},
		seek() {},
		setVolume() {},
		setMuted() {},
		setPlaybackRate() {},
		getQualities() {
			return [];
		},
		getTextTracks() {
			return [];
		},
		getAudioTracks() {
			return [];
		},
		getCurrentTime() {
			return 0;
		},
		getDuration() {
			return 0;
		},
		getBuffered() {
			return 0;
		},
		destroy() {
			removeElement(image);
			image = null;
			if (objectUrl !== null && typeof URL.revokeObjectURL === "function") {
				URL.revokeObjectURL(objectUrl);
				objectUrl = null;
			}
		}
	};
}
export { createImageEngine };

//# sourceMappingURL=engine.js.map