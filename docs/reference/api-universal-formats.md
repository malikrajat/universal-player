# Universal formats and inputs

> [Docs home](../README.md) › [Reference](./README.md) › Universal formats and inputs

## Input types

```ts
type PlayerSourceItem = string | PlayerSource | Blob | File | MediaStream;
type PlayerSourceInput = PlayerSourceItem | readonly PlayerSourceItem[];
```

| Input | Detection | Provider | Ownership |
| --- | --- | --- | --- |
| `string` | YouTube/Vimeo host → MIME (data URL) → extension → video | as detected | caller |
| `VideoSource` `{ kind: "video", src }` | explicit kind | native/hls/dash from extension | caller |
| `AudioSource` | explicit kind | native | caller |
| `ImageSource` | explicit kind | image | caller |
| `EmbedSource` | explicit provider | youtube/vimeo/generic | caller |
| `ChunkedSource` | has `chunks` + `type` + allowed kind | chunked/image | player |
| `Blob` / `File` | `instanceof Blob` | from MIME | player (object URL) |
| `MediaStream` | `instanceof MediaStream` | native (`srcObject`) | caller |
| array | playlist/gallery | per item | player |

## `Blob` and `File`

```ts
await player.load(file);
```

- Creates an object URL via `URL.createObjectURL`.
- Type decides kind: `image/*`, `audio/*`, `video/*`; an empty type falls through to `video`.
- The URL is revoked on replacement or destroy.
- Missing `URL.createObjectURL` → `unsupported-environment`.

## `MediaStream`

```ts
const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
await player.load(stream);
// later
stream.getTracks().forEach((track) => track.stop());
player.destroy();
```

The engine sets `video.srcObject = stream`. The player does not stop the tracks.

## `data:` URLs

```ts
await player.load("data:image/png;base64,iVBORw0KGgo...");
```

The MIME parsed from the data URL is used for kind detection. Huge data URLs bloat the document and are a poor production choice.

## `ChunkedSource`

```ts
interface ChunkedSource {
  kind: "video" | "audio" | "image";
  chunks: ChunkIterable | (() => ChunkIterable);
  type: string;
  mode?: "auto" | "stream" | "blob";
  chunkDelay?: number;
  alt?: string;
  title?: string;
  captions?: readonly CaptionTrack[];
  chapters?: readonly Chapter[];
  thumbnails?: ThumbnailTrack;
  survey?: SurveySource;
}
```

`ChunkData = Blob | ArrayBuffer | ArrayBufferView | string`.
`ChunkIterable = Iterable | AsyncIterable | ReadableStream`.

Pass a function when you need reload/retry:

```ts
await player.load({
  kind: "video",
  type: "video/mp4",
  chunks: () => fetch("/api/upload/123").then((r) => r.body!),
});
```

The iterator is consumed once. `retry()` reuses the same source object; without a factory, a second read may be empty.

## Arrays

An array becomes a playlist with `autoAdvance: false`; the first item loads. `load([])` throws `invalid-argument`.

```ts
await player.load(["/1.jpg", "/2.jpg", "/3.jpg"]);
```

For a slideshow, pass `image.slideDuration` (seconds) and `playlist.loop` as needed.

## Normalised descriptor

```ts
interface NormalizedSource {
  source: PlayerSource;
  url: string;
  kind: MediaKind;
  provider: MediaProvider;
  mimeType: string | null;
  extension: string | null;
  objectUrl: boolean;
  title: string | null;
  stream: MediaStream | null;
  chunks: ChunkIterable | (() => ChunkIterable) | null;
}
```

**Next:** [Feature APIs](./api-features.md)

---

← Previous: [Format and engine API](./api-formats.md) · Next: [Feature APIs](./api-features.md) →

---

**Docs home** · [Documentation index](../README.md) · [Summary](../SUMMARY.md)
