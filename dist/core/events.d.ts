import { PlayerEvents, Unsubscribe } from "./types.js";
/** A minimal observer compatible with RxJS and other reactive libraries. */
export interface PlayerObserver<T> {
  next?(value: T): void;
  error?(error: unknown): void;
  complete?(): void;
}
/** The handle returned by {@link PlayerObservable.subscribe}. */
export interface Subscription {
  readonly closed: boolean;
  unsubscribe(): void;
}
/**
 * A tiny synchronous observable with RxJS-compatible interop.
 *
 * It intentionally avoids importing `rxjs`: the optional peer is only loaded
 * by {@link toRxjsObservable}. The `@@observable` method lets RxJS's `from()`
 * consume a player stream without an adapter.
 */
export declare class PlayerObservable<T> {
  #private;
  constructor(subscribe: (observer: PlayerObserver<T>) => Unsubscribe);
  subscribe(observerOrNext?: PlayerObserver<T> | ((value: T) => void), error?: (error: unknown) => void, complete?: () => void): Subscription;
  /** Interop hook understood by RxJS `from()`. */
  ["@@observable"](): this;
}
/**
 * Small typed event bus.
 *
 * Listener exceptions are isolated so a faulty subscriber can never break a
 * playback transition or another subscriber.
 */
export declare class PlayerEventBus {
  #private;
  on<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void): Unsubscribe;
  once<K extends keyof PlayerEvents>(type: K, listener: (event: PlayerEvents[K]) => void): Unsubscribe;
  emit<K extends keyof PlayerEvents>(type: K, event: PlayerEvents[K]): void;
  observe<K extends keyof PlayerEvents>(type: K): PlayerObservable<PlayerEvents[K]>;
  clear(): void;
}
/**
 * Lazily converts a player stream into an RxJS Observable.
 *
 * `rxjs` is an optional peer dependency. Importing this function is safe
 * without it; calling it without `rxjs` installed rejects with the original
 * module-resolution error.
 */
export declare function toRxjsObservable<T>(source: PlayerObservable<T>): Promise<import("rxjs").Observable<T>>;
//# sourceMappingURL=events.d.ts.map