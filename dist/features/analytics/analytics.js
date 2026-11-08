// src/features/analytics/analytics.ts
/** Creates a safe analytics sink from player options. */
function createAnalyticsSink(options) {
	return (event) => {
		if (options.enabled === false) return;
		try {
			options.onEvent?.(event);
		} catch {}
	};
}
/** Builds an analytics payload from a player state snapshot. */
function toAnalyticsEvent(type, state, source, metadata) {
	return {
		type,
		at: Date.now(),
		position: state.currentTime,
		duration: state.duration,
		source,
		...metadata === void 0 ? {} : { metadata }
	};
}
export { createAnalyticsSink, toAnalyticsEvent };

//# sourceMappingURL=analytics.js.map