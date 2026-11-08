// src/adapters/shared/dom.ts
function createMediaElement(kind, options) {
	const element = kind === "audio" ? document.createElement("audio") : document.createElement("video");
	element.className = "up-media";
	element.setAttribute("part", "media");
	element.preload = options.preload ?? "metadata";
	element.autoplay = options.autoplay ?? false;
	element.loop = options.loop ?? false;
	element.muted = options.muted ?? false;
	element.controls = options.controls === "native";
	element.setAttribute("aria-label", options.label ?? "Media");
	if (options.crossOrigin !== void 0) element.crossOrigin = options.crossOrigin;
	if (element instanceof HTMLVideoElement) {
		element.playsInline = options.playsInline ?? true;
		if (options.poster !== void 0) element.poster = options.poster;
	}
	return element;
}
/** Removes an element from the DOM, if present. */
function removeElement(element) {
	element?.remove();
}
/** Creates a sandboxed iframe for third-party players. */
function createIframe(className, title, allow) {
	const iframe = document.createElement("iframe");
	iframe.className = className;
	iframe.setAttribute("part", "media");
	iframe.setAttribute("allow", allow);
	iframe.setAttribute("allowfullscreen", "");
	iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
	iframe.setAttribute("loading", "eager");
	iframe.allowFullscreen = true;
	iframe.title = title;
	return iframe;
}
/** Resolves when an iframe's document has loaded. */
function waitForIframe(iframe) {
	return new Promise((resolve) => {
		iframe.addEventListener("load", () => resolve(), { once: true });
	});
}
export { createIframe, createMediaElement, removeElement, waitForIframe };

//# sourceMappingURL=dom.js.map