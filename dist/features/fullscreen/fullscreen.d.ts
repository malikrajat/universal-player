/** Returns true when the document is currently fullscreen. */
export declare function isFullscreen(): boolean;
/** Returns true when an element exposes the Fullscreen API. */
export declare function canFullscreen(element: HTMLElement): boolean;
/** Requests fullscreen for an element. */
export declare function requestFullscreen(element: HTMLElement): Promise<void>;
/** Exits fullscreen when active. */
export declare function exitFullscreen(): Promise<void>;
/** Subscribes to fullscreen changes. Returns an unsubscribe function. */
export declare function onFullscreenChange(listener: (fullscreen: boolean) => void): () => void;
//# sourceMappingURL=fullscreen.d.ts.map