# Resume

> [Docs home](./README.md) › Resume

[← Docs](./README.md) · [API reference](./api-reference.md#resumeoptions)

Restore the last playback position across visits. Resume is opt-in and
best-effort.

---

## 1. Enable

```ts
const player = createPlayer({
  container,
  source: "/course/lesson-1.mp4",
  resume: {
    enabled: true,
    minDuration: 30,
  },
});
```

- `enabled` must be exactly `true`.
- `minDuration` (default `30`) skips short media.
- The position is saved on `destroy()` and read by `restoreResume()`.

---

## 2. Manual control

```ts
player.saveResume();
player.restoreResume();
```

Use this when you control navigation outside the player.

---

## 3. Custom keys and storage

```ts
resume: {
  enabled: true,
  key: "course:lesson-1",
  storage: window.sessionStorage,
}
```

- `key` is a prefix; the source URL is appended unless you provide a full key.
- `storage` is any `Storage`-compatible object.
- Use `sessionStorage` for a session-only resume.
- Use an in-memory adapter for strict privacy.

```ts
const memory = new Map<string, string>();

const storage: Storage = {
  get length() {
    return memory.size;
  },
  clear: () => memory.clear(),
  getItem: (key) => memory.get(key) ?? null,
  key: (index) => Array.from(memory.keys())[index] ?? null,
  removeItem: (key) => void memory.delete(key),
  setItem: (key, value) => void memory.set(key, value),
};
```

---

## 4. Override with `startTime`

`startTime` wins at load time if both are set. If you need resume to win, call
`restoreResume()` after load or avoid `startTime`.

---

## 5. Clearing

```ts
import { createResumeStore } from "@codewithrajat/universal-player";

const store = createResumeStore({ key: "course:" });
store.clear("lesson-1");
```

Or remove the storage key directly.

---

## 6. Behavior details

| Concern                 | Behavior                                |
| ----------------------- | --------------------------------------- |
| Storage failures        | Swallowed; resume silently unavailable. |
| Invalid stored values   | Ignored (`null`).                       |
| Negative/zero positions | Not written.                            |
| Short media             | Skipped when below `minDuration`.       |
| Source replacement      | New source uses its own key.            |

---

## 7. Privacy

Resume writes the playback position to local storage. Disclose it or disable it
for sensitive content. See [Privacy & GDPR](./privacy-gdpr.md).

---

## 8. Testing

```ts
const store = createResumeStore({ storage: fakeStorage, key: "test:" });
store.write("a", 42);
expect(store.read("a")).toBe(42);
store.clear("a");
expect(store.read("a")).toBeNull();
```

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)