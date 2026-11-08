/** A pluggable cast backend (Google Cast, AirPlay bridge, etc.). */
export interface CastProvider {
  readonly id: string;
  readonly name: string;
  isAvailable(): Promise<boolean>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
/** Cast configuration. */
export interface CastOptions {
  readonly providers?: readonly CastProvider[];
}
/** Returns true when at least one cast provider is configured. */
export declare function canCast(options?: CastOptions): boolean;
/** Connects to a cast provider. */
export declare function connectCast(provider: CastProvider): Promise<void>;
/** Disconnects from a cast provider. */
export declare function disconnectCast(provider: CastProvider): Promise<void>;
/** Returns the first available provider, or null. */
export declare function findAvailableCastProvider(options: CastOptions): Promise<CastProvider | null>;
//# sourceMappingURL=cast.d.ts.map