import { UniversalPlayer } from "../../core/player.js";
import { sourceToken } from "../../core/source.js";
import { createInitialState } from "../../core/state.js";
// src/frameworks/angular/universal-player.ts
/**
* Framework-neutral Angular controller.
*
* Angular libraries built with a generic bundler cannot emit partial
* compilation metadata, so a precompiled `@Component` would not be AOT-safe.
* Consumers therefore own the decorated standalone component and forward
* lifecycle calls to this controller (see `examples/angular`).
*/
var AngularUniversalPlayer = class {
	#elementRef;
	#ngZone;
	#changeDetector;
	#listeners = /* @__PURE__ */ new Set();
	#unsubscribes = [];
	#inputs;
	#outputs;
	#player = null;
	#state = createInitialState();
	#connected = false;
	#destroyed = false;
	#changeScheduled = false;
	#sourceTokenValue;
	#pending = Promise.resolve();
	constructor(options) {
		if (typeof options !== "object" || options === null || options.elementRef === void 0 || options.elementRef.nativeElement === void 0) throw new Error("AngularUniversalPlayer requires an ElementRef with a nativeElement.");
		this.#elementRef = options.elementRef;
		this.#ngZone = options.ngZone ?? null;
		this.#changeDetector = options.changeDetector ?? null;
		this.#inputs = options.inputs ?? {};
		this.#outputs = options.outputs ?? {};
		this.#sourceTokenValue = sourceToken(this.#inputs.source);
	}
	/** Latest state snapshot. */
	get state() {
		return this.#state;
	}
	/** Live player, or null before connection/after destruction. */
	get player() {
		return this.#player;
	}
	/** Whether `ngOnDestroy` has run. */
	get destroyed() {
		return this.#destroyed;
	}
	/** Replaces the outputs after construction. */
	setOutputs(outputs) {
		this.#outputs = outputs;
	}
	/** Stores new inputs and applies them. */
	setInputs(inputs) {
		if (this.#destroyed) throw new Error("Cannot set inputs: the Angular player has been destroyed.");
		this.#inputs = inputs;
		this.#applyInputs();
	}
	/** Angular lifecycle hook. */
	ngOnChanges() {
		this.#applyInputs();
	}
	/** Angular lifecycle hook; creates the player once. */
	ngAfterViewInit() {
		if (this.#destroyed || this.#connected) return;
		this.#connected = true;
		this.#connect();
	}
	/** Angular lifecycle hook; terminal and idempotent. */
	ngOnDestroy() {
		if (this.#destroyed) return;
		this.#destroyed = true;
		for (const unsubscribe of this.#unsubscribes) unsubscribe();
		this.#unsubscribes.length = 0;
		const player = this.#player;
		this.#player = null;
		player?.destroy();
		this.#emit(() => this.#outputs.player?.(null));
		this.#listeners.clear();
	}
	/** Loads or replaces the source after connection. */
	load(source) {
		if (this.#destroyed) return Promise.reject(/* @__PURE__ */ new Error("Cannot load: the Angular player has been destroyed."));
		if (this.#player === null) return Promise.reject(/* @__PURE__ */ new Error("Cannot load before ngAfterViewInit connects the player."));
		return this.#player.load(source);
	}
	/** Starts playback. */
	play() {
		return this.#player?.play() ?? Promise.resolve();
	}
	/** Pauses playback. */
	pause() {
		this.#player?.pause();
	}
	/** Seeks to an absolute time in seconds. */
	seek(time) {
		this.#player?.seek(time);
	}
	/** Sets the volume in the 0–1 range. */
	setVolume(volume) {
		this.#player?.setVolume(volume);
	}
	/** Mutes or unmutes playback. */
	setMuted(muted) {
		this.#player?.setMuted(muted);
	}
	/** Sets the playback rate. */
	setPlaybackRate(rate) {
		this.#player?.setPlaybackRate(rate);
	}
	/** Subscribes to state snapshots. */
	subscribe(listener) {
		this.#listeners.add(listener);
		return () => {
			this.#listeners.delete(listener);
		};
	}
	/** Resolves after queued load work settles. */
	whenIdle() {
		return this.#pending;
	}
	#connect() {
		const element = this.#elementRef.nativeElement;
		if (typeof HTMLElement === "undefined" || !(element instanceof HTMLElement)) throw new Error("AngularUniversalPlayer requires an HTMLElement host.");
		const { source: initialSource, ...rest } = this.#inputs;
		const instance = this.#runOutsideAngular(() => new UniversalPlayer({
			...rest,
			container: element,
			onEvent: (event) => this.#emit(() => this.#outputs.event?.(event))
		}));
		this.#player = instance;
		this.#state = instance.state;
		this.#unsubscribes.push(instance.on("statechange", (next) => {
			this.#publish(next);
		}), instance.on("timeupdate", (event) => {
			this.#state = {
				...this.#state,
				currentTime: event.currentTime,
				duration: event.duration,
				buffered: event.buffered
			};
			this.#scheduleChangeDetection();
		}), instance.on("loadedmetadata", () => {
			this.#emit(() => this.#outputs.ready?.(this.#state));
		}), instance.on("error", (event) => {
			this.#emit(() => this.#outputs.error?.(event.error));
		}), instance.on("statechange", (next) => {
			this.#emit(() => this.#outputs.stateChange?.(next));
		}));
		this.#emit(() => this.#outputs.player?.(instance));
		this.#loadSource();
	}
	#loadSource() {
		const source = this.#inputs.source;
		if (source === void 0 || this.#player === null) return;
		this.#pending = this.#player.load(source).catch(() => {});
	}
	#applyInputs() {
		const nextToken = sourceToken(this.#inputs.source);
		const sourceChanged = nextToken !== this.#sourceTokenValue;
		this.#sourceTokenValue = nextToken;
		if (!this.#connected || this.#destroyed || this.#player === null) return;
		if (sourceChanged) {
			this.#loadSource();
			return;
		}
		const { volume, muted, playbackRate } = this.#inputs;
		if (volume !== void 0) this.#player.setVolume(volume);
		if (muted !== void 0) this.#player.setMuted(muted);
		if (playbackRate !== void 0) this.#player.setPlaybackRate(playbackRate);
	}
	#publish(next) {
		this.#state = next;
		for (const listener of Array.from(this.#listeners)) try {
			listener(next);
		} catch {}
		this.#scheduleChangeDetection();
	}
	#scheduleChangeDetection() {
		if (this.#changeDetector === null || this.#destroyed || this.#changeScheduled) return;
		this.#changeScheduled = true;
		queueMicrotask(() => {
			this.#changeScheduled = false;
			if (this.#destroyed || this.#changeDetector === null) return;
			const notify = () => {
				this.#changeDetector?.markForCheck();
			};
			if (this.#ngZone === null) notify();
			else this.#ngZone.run(notify);
		});
	}
	#runOutsideAngular(operation) {
		return this.#ngZone === null ? operation() : this.#ngZone.runOutsideAngular(operation);
	}
	#emit(callback) {
		try {
			callback();
		} catch {}
	}
};
export { AngularUniversalPlayer };

//# sourceMappingURL=universal-player.js.map