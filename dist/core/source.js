import { createPlayerError } from "./errors.js";
// src/core/source.ts
const VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([
	"mp4",
	"m4v",
	"webm",
	"ogv",
	"ogg",
	"mov",
	"mkv",
	"m3u8",
	"mpd"
]);
const AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([
	"mp3",
	"m4a",
	"aac",
	"wav",
	"oga",
	"flac",
	"opus",
	"weba"
]);
const IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
	"jpg",
	"jpeg",
	"png",
	"gif",
	"webp",
	"avif",
	"svg",
	"bmp",
	"ico"
]);
const MIME_BY_EXTENSION = {
	mp4: "video/mp4",
	m4v: "video/mp4",
	webm: "video/webm",
	ogv: "video/ogg",
	ogg: "video/ogg",
	mov: "video/quicktime",
	mkv: "video/x-matroska",
	m3u8: "application/vnd.apple.mpegurl",
	mpd: "application/dash+xml",
	mp3: "audio/mpeg",
	m4a: "audio/mp4",
	aac: "audio/aac",
	wav: "audio/wav",
	oga: "audio/ogg",
	flac: "audio/flac",
	opus: "audio/opus",
	weba: "audio/webm",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	webp: "image/webp",
	avif: "image/avif",
	svg: "image/svg+xml",
	bmp: "image/bmp",
	ico: "image/x-icon"
};
const objectIds = /* @__PURE__ */ new WeakMap();
let nextObjectId = 1;
function baseUrl() {
	if (typeof document !== "undefined" && typeof document.baseURI === "string") return document.baseURI;
	if (typeof location !== "undefined" && typeof location.href === "string") return location.href;
	return "http://localhost/";
}
function toUrl(value) {
	try {
		return new URL(value, baseUrl());
	} catch (cause) {
		throw createPlayerError("The media source is not a valid URL.", {
			code: "invalid-argument",
			cause,
			details: { source: value }
		});
	}
}
/** Returns the lowercase extension of a URL path, without the dot. */
function extensionOf(pathname) {
	const lastSegment = pathname.split("/").pop() ?? "";
	const dot = lastSegment.lastIndexOf(".");
	if (dot < 1 || dot === lastSegment.length - 1) return null;
	return lastSegment.slice(dot + 1).toLowerCase();
}
/** Infers a media kind from an extension, MIME type and URL. */
function detectMediaKind(extension, mimeType, url) {
	if (isYouTubeHost(url.hostname) || isVimeoHost(url.hostname)) return "embed";
	if (mimeType !== null) {
		if (mimeType.startsWith("image/")) return "image";
		if (mimeType.startsWith("audio/")) return "audio";
		if (mimeType.startsWith("video/") || mimeType.includes("mpegurl") || mimeType.includes("dash")) return "video";
	}
	if (extension !== null) {
		if (IMAGE_EXTENSIONS.has(extension)) return "image";
		if (AUDIO_EXTENSIONS.has(extension)) return "audio";
		if (VIDEO_EXTENSIONS.has(extension)) return "video";
	}
	return "video";
}
/** Infers a MIME type from an extension. */
function inferMimeType(extension) {
	return extension === null ? null : MIME_BY_EXTENSION[extension] ?? null;
}
/** Returns true for YouTube URLs. */
function isYouTubeHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "youtu.be" || host.endsWith(".youtube.com") || host === "youtube.com";
}
/** Returns true for Vimeo URLs. */
function isVimeoHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "vimeo.com" || host.endsWith(".vimeo.com");
}
function providerFor(kind, url, extension) {
	if (kind === "image") return "image";
	if (kind === "embed") {
		if (isYouTubeHost(url.hostname)) return "youtube";
		if (isVimeoHost(url.hostname)) return "vimeo";
		return "generic-embed";
	}
	if (extension === "m3u8") return "hls";
	if (extension === "mpd") return "dash";
	return "native";
}
function isBlob(value) {
	return typeof Blob !== "undefined" && value instanceof Blob;
}
function isMediaStream(value) {
	return typeof MediaStream !== "undefined" && value instanceof MediaStream;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isStructuredSource(value) {
	return isRecord(value) && typeof value["src"] === "string" && value["src"].length > 0 && (value["kind"] === "video" || value["kind"] === "audio" || value["kind"] === "image" || value["kind"] === "embed");
}
function isChunkedSource(value) {
	return isRecord(value) && "chunks" in value && typeof value["type"] === "string" && value["type"].length > 0 && (value["kind"] === "video" || value["kind"] === "audio" || value["kind"] === "image");
}
function chunkedSource(input) {
	return Object.freeze({
		source: input,
		url: "",
		kind: input.kind,
		provider: input.kind === "image" ? "image" : "chunked",
		mimeType: input.type,
		extension: null,
		objectUrl: false,
		title: input.title ?? null,
		stream: null,
		chunks: input.chunks
	});
}
function mimeTypeFromDataUrl(value) {
	if (!value.startsWith("data:")) return null;
	const comma = value.indexOf(",");
	if (comma <= 5) return null;
	const mime = value.slice(5, comma).split(";")[0]?.trim().toLowerCase() ?? "";
	return mime.length === 0 ? null : mime;
}
function structuredSource(input, url, extension) {
	const mimeType = input.type ?? inferMimeType(extension);
	return Object.freeze({
		source: input,
		url: url.href,
		kind: input.kind,
		provider: input.kind === "embed" ? input.provider === "youtube" ? "youtube" : input.provider === "vimeo" ? "vimeo" : "generic-embed" : providerFor(input.kind, url, extension),
		mimeType,
		extension,
		objectUrl: false,
		title: input.kind === "embed" ? input.title ?? null : null,
		stream: null,
		chunks: null
	});
}
/**
* Normalizes any supported input into a URL plus engine decision.
*
* Object URLs created for `Blob`/`File` inputs are owned by the returned
* descriptor and must be released with {@link revokeSource}.
*/
function normalizeSource(input) {
	if (Array.isArray(input)) throw createPlayerError("A source list must be loaded through the player.", { code: "invalid-argument" });
	if (isMediaStream(input)) return Object.freeze({
		source: {
			kind: "video",
			src: ""
		},
		url: "",
		kind: "video",
		provider: "native",
		mimeType: null,
		extension: null,
		objectUrl: false,
		title: null,
		stream: input,
		chunks: null
	});
	if (isBlob(input)) {
		if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function") throw createPlayerError("Object URLs are not available in this environment.", { code: "unsupported-environment" });
		const url = URL.createObjectURL(input);
		const type = typeof input.type === "string" && input.type.length > 0 ? input.type : null;
		const kind = detectMediaKind(null, type, new URL(url));
		const source = kind === "image" ? {
			kind: "image",
			src: url,
			...type === null ? {} : { type }
		} : kind === "audio" ? {
			kind: "audio",
			src: url,
			...type === null ? {} : { type }
		} : {
			kind: "video",
			src: url,
			...type === null ? {} : { type }
		};
		return Object.freeze({
			source,
			url,
			kind,
			provider: providerFor(kind, new URL(url), null),
			mimeType: type,
			extension: null,
			objectUrl: true,
			title: null,
			stream: null,
			chunks: null
		});
	}
	if (isChunkedSource(input)) return chunkedSource(input);
	if (typeof input === "string") {
		if (input.trim().length === 0) throw createPlayerError("The media source must not be empty.", { code: "invalid-argument" });
		const url = toUrl(input);
		const extension = extensionOf(url.pathname);
		const mimeType = mimeTypeFromDataUrl(input) ?? inferMimeType(extension);
		const kind = detectMediaKind(extension, mimeType, url);
		const source = kind === "embed" ? {
			kind: "embed",
			src: url.href,
			provider: isYouTubeHost(url.hostname) ? "youtube" : isVimeoHost(url.hostname) ? "vimeo" : "generic"
		} : kind === "image" ? {
			kind: "image",
			src: url.href
		} : kind === "audio" ? {
			kind: "audio",
			src: url.href
		} : {
			kind: "video",
			src: url.href
		};
		return Object.freeze({
			source,
			url: url.href,
			kind,
			provider: providerFor(kind, url, extension),
			mimeType,
			extension,
			objectUrl: false,
			title: null,
			stream: null,
			chunks: null
		});
	}
	if (isStructuredSource(input)) {
		const url = toUrl(input.src);
		return structuredSource(input, url, extensionOf(url.pathname));
	}
	throw createPlayerError("Unsupported media source.", {
		code: "invalid-argument",
		details: { value: typeof input }
	});
}
/** Returns a stable string token for change detection. */
function sourceToken(input) {
	if (input === null || input === void 0) return "none";
	if (Array.isArray(input)) return `list:[${input.map((entry) => sourceToken(entry)).join(",")}]`;
	if (typeof input === "string") return `s:${input}`;
	if (isBlob(input) || isMediaStream(input)) {
		let id = objectIds.get(input);
		if (id === void 0) {
			id = nextObjectId;
			nextObjectId += 1;
			objectIds.set(input, id);
		}
		return `${isBlob(input) ? "b" : "m"}:${id}`;
	}
	if (isChunkedSource(input)) {
		let id = objectIds.get(input);
		if (id === void 0) {
			id = nextObjectId;
			nextObjectId += 1;
			objectIds.set(input, id);
		}
		return `c:${id}:${input.type}`;
	}
	if (isStructuredSource(input)) return `o:${input.kind}:${input.src}:${input.type ?? ""}`;
	return "unknown";
}
/** Releases an object URL created by {@link normalizeSource}. */
function revokeSource(source) {
	if (source === null || !source.objectUrl) return;
	if (typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") URL.revokeObjectURL(source.url);
}
export { detectMediaKind, extensionOf, inferMimeType, isVimeoHost, isYouTubeHost, normalizeSource, revokeSource, sourceToken };

//# sourceMappingURL=source.js.map