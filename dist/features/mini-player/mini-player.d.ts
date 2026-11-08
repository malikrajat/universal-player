/** Mini-player sizing options. */
export interface MiniPlayerOptions {
  readonly width?: number;
  readonly height?: number;
}
/** Returns true when the Picture-in-Picture mini-player is available. */
export declare function canUseMiniPlayer(): boolean;
/** Enters the browser mini-player. */
export declare function enterMiniPlayer(media: HTMLVideoElement, options?: MiniPlayerOptions): Promise<void>;
/** Exits the browser mini-player. */
export declare function exitMiniPlayer(): Promise<void>;
//# sourceMappingURL=mini-player.d.ts.map