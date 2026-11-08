// src/core/events.ts
/**
* A tiny synchronous observable with RxJS-compatible interop.
*
* It intentionally avoids importing `rxjs`: the optional peer is only loaded
* by {@link toRxjsObservable}. The `@@observable` method lets RxJS's `from()`
* consume a player stream without an adapter.
*/
var PlayerObservable = class {
	#subscribe;
	constructor(subscribe) {
		this.#subscribe = subscribe;
	}
	subscribe(observerOrNext, error, complete) {
		const observer = typeof observerOrNext === "function" ? {
			next: observerOrNext,
			...error === void 0 ? {} : { error },
			...complete === void 0 ? {} : { complete }
		} : { ...observerOrNext };
		let closed = false;
		let teardown = () => {};
		teardown = this.#subscribe({
			next: (value) => {
				if (!closed) observer.next?.(value);
			},
			error: (failure) => {
				if (closed) return;
				closed = true;
				observer.error?.(failure);
			},
			complete: () => {
				if (closed) return;
				closed = true;
				observer.complete?.();
			}
		});
		return {
			get closed() {
				return closed;
			},
			unsubscribe() {
				if (closed) return;
				closed = true;
				teardown();
			}
		};
	}
	/** Interop hook understood by RxJS `from()`. */
	["@@observable"]() {
		return this;
	}
};
/**
* Small typed event bus.
*
* Listener exceptions are isolated so a faulty subscriber can never break a
* playback transition or another subscriber.
*/
var PlayerEventBus = class {
	#listeners = /* @__PURE__ */ new Map();
	on(type, listener) {
		let listeners = this.#listeners.get(type);
		if (listeners === void 0) {
			listeners = /* @__PURE__ */ new Set();
			this.#listeners.set(type, listeners);
		}
		const stored = listener;
		listeners.add(stored);
		let subscribed = true;
		return () => {
			if (!subscribed) return;
			subscribed = false;
			const current = this.#listeners.get(type);
			current?.delete(stored);
			if (current !== void 0 && current.size === 0) this.#listeners.delete(type);
		};
	}
	once(type, listener) {
		const unsubscribe = this.on(type, (event) => {
			unsubscribe();
			listener(event);
		});
		return unsubscribe;
	}
	emit(type, event) {
		const listeners = this.#listeners.get(type);
		if (listeners === void 0) return;
		for (const listener of Array.from(listeners)) try {
			listener(event);
		} catch {}
	}
	observe(type) {
		return new PlayerObservable((observer) => this.on(type, (event) => {
			observer.next?.(event);
		}));
	}
	clear() {
		this.#listeners.clear();
	}
};
/**
* Lazily converts a player stream into an RxJS Observable.
*
* `rxjs` is an optional peer dependency. Importing this function is safe
* without it; calling it without `rxjs` installed rejects with the original
* module-resolution error.
*/
async function toRxjsObservable(source) {
	const { Observable } = await import("rxjs");
	return new Observable((subscriber) => {
		const subscription = source.subscribe({
			next: (value) => subscriber.next(value),
			error: (error) => subscriber.error(error),
			complete: () => subscriber.complete()
		});
		return () => subscription.unsubscribe();
	});
}
export { PlayerEventBus, PlayerObservable, toRxjsObservable };

//# sourceMappingURL=events.js.map