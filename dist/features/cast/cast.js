// src/features/cast/cast.ts
/** Returns true when at least one cast provider is configured. */
function canCast(options = {}) {
	return (options.providers?.length ?? 0) > 0;
}
/** Connects to a cast provider. */
async function connectCast(provider) {
	await provider.connect();
}
/** Disconnects from a cast provider. */
async function disconnectCast(provider) {
	await provider.disconnect();
}
/** Returns the first available provider, or null. */
async function findAvailableCastProvider(options) {
	for (const provider of options.providers ?? []) if (await provider.isAvailable()) return provider;
	return null;
}
export { canCast, connectCast, disconnectCast, findAvailableCastProvider };

//# sourceMappingURL=cast.js.map