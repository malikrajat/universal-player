// src/features/playlist/playlist.ts
/**
* Small, framework-agnostic playlist/queue.
*
* It does not know how to load media; consumers call `player.load(playlist.current)`.
*/
var Playlist = class {
	#items;
	#index;
	constructor(items = [], index = 0) {
		this.#items = [...items];
		this.#index = this.#normalizeIndex(index);
	}
	/** Snapshot of all items. */
	get items() {
		return [...this.#items];
	}
	/** Current index. */
	get index() {
		return this.#index;
	}
	/** Current item, or null when the playlist is empty. */
	get current() {
		return this.#items[this.#index] ?? null;
	}
	/** Whether a next item exists. */
	get hasNext() {
		return this.#index + 1 < this.#items.length;
	}
	/** Whether a previous item exists. */
	get hasPrevious() {
		return this.#index > 0;
	}
	/** Advances to the next item and returns it. */
	next() {
		if (!this.hasNext) return null;
		this.#index += 1;
		return this.current;
	}
	/** Moves to the previous item and returns it. */
	previous() {
		if (!this.hasPrevious) return null;
		this.#index -= 1;
		return this.current;
	}
	/** Selects an index, returning the item or null when out of range. */
	select(index) {
		if (!Number.isInteger(index) || index < 0 || index >= this.#items.length) return null;
		this.#index = index;
		return this.current;
	}
	/** Appends an item. */
	add(item) {
		this.#items.push(item);
	}
	/** Removes an item by index, returning it when present. */
	remove(index) {
		if (!Number.isInteger(index) || index < 0 || index >= this.#items.length) return null;
		const removed = this.#items.splice(index, 1)[0] ?? null;
		if (this.#items.length === 0) this.#index = 0;
		else if (this.#index >= this.#items.length) this.#index = this.#items.length - 1;
		else if (index < this.#index) this.#index -= 1;
		return removed;
	}
	/** Removes every item. */
	clear() {
		this.#items = [];
		this.#index = 0;
	}
	#normalizeIndex(index) {
		if (this.#items.length === 0) return 0;
		if (!Number.isInteger(index) || index < 0) return 0;
		return Math.min(index, this.#items.length - 1);
	}
};
export { Playlist };

//# sourceMappingURL=playlist.js.map