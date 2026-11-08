// src/features/resume/resume.ts
/** Default key prefix for resume entries. */
const DEFAULT_RESUME_KEY_PREFIX = "universal-player:";
/**
* Creates a resume store.
*
* Storage failures (private mode, quota, disabled cookies) are swallowed and
* surfaced as `null`/no-op results.
*/
function createResumeStore(options = {}) {
	const storage = options.storage ?? (typeof localStorage === "undefined" ? null : localStorage);
	const prefix = options.key ?? "universal-player:";
	const storageKey = (key) => `${prefix}${key}`;
	return {
		read(key) {
			if (storage === null) return null;
			try {
				const raw = storage.getItem(storageKey(key));
				if (raw === null) return null;
				const value = Number(raw);
				return Number.isFinite(value) && value > 0 ? value : null;
			} catch {
				return null;
			}
		},
		write(key, time) {
			if (storage === null || !Number.isFinite(time) || time <= 0) return;
			try {
				storage.setItem(storageKey(key), String(time));
			} catch {}
		},
		clear(key) {
			if (storage === null) return;
			try {
				storage.removeItem(storageKey(key));
			} catch {}
		}
	};
}
export { DEFAULT_RESUME_KEY_PREFIX, createResumeStore };

//# sourceMappingURL=resume.js.map