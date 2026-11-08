/** Actions understood by the built-in keyboard shortcut handler. */
export type PlayerShortcutAction = {
  readonly type: "toggle-play";
} | {
  readonly type: "toggle-mute";
} | {
  readonly type: "toggle-fullscreen";
} | {
  readonly type: "toggle-captions";
} | {
  readonly type: "toggle-pip";
} | {
  readonly type: "toggle-settings";
} | {
  readonly type: "open-quality";
} | {
  readonly type: "open-audio";
} | {
  readonly type: "open-sleep";
} | {
  readonly type: "toggle-stats";
} | {
  readonly type: "toggle-shortcuts";
} | {
  readonly type: "toggle-loop";
} | {
  readonly type: "quality-relative";
  readonly delta: number;
} | {
  readonly type: "seek-relative";
  readonly delta: number;
} | {
  readonly type: "seek-percent";
  readonly percent: number;
} | {
  readonly type: "seek-start";
} | {
  readonly type: "seek-end";
} | {
  readonly type: "volume-relative";
  readonly delta: number;
} | {
  readonly type: "speed-relative";
  readonly delta: number;
} | {
  readonly type: "next-item";
} | {
  readonly type: "previous-item";
} | {
  readonly type: "escape";
};
/** Options used when translating a keyboard event. */
export interface ShortcutOptions {
  readonly seekStep?: number;
  readonly volumeStep?: number;
}
/**
 * Maps a keyboard event to a player action.
 *
 * Returns null for keys that should be left to the browser or for events that
 * originate inside a text field/select.
 */
export declare function shortcutForEvent(event: KeyboardEvent, options?: ShortcutOptions): PlayerShortcutAction | null;
/** The shortcut list rendered by the help overlay. */
export declare const PLAYER_SHORTCUTS: readonly {
  readonly keys: string;
  readonly action: string;
}[];
//# sourceMappingURL=shortcuts.d.ts.map