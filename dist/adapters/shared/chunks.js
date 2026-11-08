// src/adapters/shared/chunks.ts
function isAsyncIterable(value) {
	return typeof value === "object" && value !== null && Symbol.asyncIterator in value;
}
function isIterable(value) {
	return typeof value === "object" && value !== null && Symbol.iterator in value;
}
function isReadableStream(value) {
	return typeof value === "object" && value !== null && typeof value.getReader === "function";
}
/** Resolves arrays, iterables, async iterables, streams and factories. */
async function* iterateChunks(input) {
	const source = typeof input === "function" ? input() : input;
	if (isReadableStream(source)) {
		const reader = source.getReader();
		try {
			while (true) {
				const result = await reader.read();
				if (result.done) return;
				if (result.value !== void 0) yield result.value;
			}
		} finally {
			reader.releaseLock?.();
		}
	}
	if (isAsyncIterable(source)) {
		for await (const chunk of source) yield chunk;
		return;
	}
	if (isIterable(source)) for (const chunk of source) yield chunk;
}
/** Buffers an entire chunk source into one Blob. */
async function collectChunks(input, type, delay = 0) {
	const parts = [];
	for await (const chunk of iterateChunks(input)) {
		if (typeof chunk === "string" || chunk instanceof Blob || chunk instanceof ArrayBuffer) parts.push(chunk);
		else {
			const view = chunk;
			const copy = new Uint8Array(view.byteLength);
			copy.set(new Uint8Array(view.buffer, view.byteOffset, view.byteLength));
			parts.push(copy);
		}
		if (delay > 0) await new Promise((resolve) => {
			setTimeout(resolve, delay);
		});
	}
	return new Blob(parts, { type });
}
/** Converts a chunk to a BufferSource for MediaSource. */
async function chunkToBufferSource(chunk) {
	if (typeof chunk === "string") return new TextEncoder().encode(chunk);
	if (chunk instanceof Blob) return chunk.arrayBuffer();
	if (chunk instanceof ArrayBuffer) return chunk;
	if (ArrayBuffer.isView(chunk)) {
		const copy = new Uint8Array(chunk.byteLength);
		copy.set(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
		return copy;
	}
	return /* @__PURE__ */ new Uint8Array(0);
}
export { chunkToBufferSource, collectChunks, iterateChunks };

//# sourceMappingURL=chunks.js.map