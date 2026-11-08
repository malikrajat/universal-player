/**
 * Small, framework-agnostic playlist/queue.
 *
 * It does not know how to load media; consumers call `player.load(playlist.current)`.
 */
export declare class Playlist<T> {
  #private;
  constructor(items?: readonly T[], index?: number);
  /** Snapshot of all items. */
  get items(): readonly T[];
  /** Current index. */
  get index(): number;
  /** Current item, or null when the playlist is empty. */
  get current(): T | null;
  /** Whether a next item exists. */
  get hasNext(): boolean;
  /** Whether a previous item exists. */
  get hasPrevious(): boolean;
  /** Advances to the next item and returns it. */
  next(): T | null;
  /** Moves to the previous item and returns it. */
  previous(): T | null;
  /** Selects an index, returning the item or null when out of range. */
  select(index: number): T | null;
  /** Appends an item. */
  add(item: T): void;
  /** Removes an item by index, returning it when present. */
  remove(index: number): T | null;
  /** Removes every item. */
  clear(): void;
}
//# sourceMappingURL=playlist.d.ts.map