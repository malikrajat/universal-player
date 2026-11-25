# Service worker

> [Docs home](./README.md) › Service worker

[← Docs](./README.md) · [Browser support](./browser-support.md) · [Security](./security.md)

The player does not ship a service worker. This page explains how to cache it
correctly when your app has one, and which request patterns break media
playback.

---

## 1. What to cache

| Asset                 | Strategy                                           |
| --------------------- | -------------------------------------------------- |
| App shell, JS/CSS     | Precache with a versioned cache.                   |
| Player package chunks | Precache or use stale-while-revalidate.            |
| `styles.css`          | Precache.                                          |
| Posters/thumbnails    | Cache-first with a size cap.                       |
| Small MP4/audio       | Cache-first only if files are small and immutable. |
| HLS/DASH manifests    | Network-first; they change.                        |
| HLS/DASH segments     | Cache-first if immutable; never hide 404/403.      |
| Byte-range responses  | Never synthesize from a full cached body.          |

Do not cache:

- authenticated media with per-request tokens unless you scope by user;
- live segments indefinitely;
- survey/analytics POST requests (let them fail or retry in app logic);
- opaque cross-origin responses you cannot inspect.

---

## 2. Range requests

Media seeking depends on HTTP range requests. If your worker intercepts a
`Range` request and returns a `200` full-body response, Safari and some
Chromium versions may fail to seek or may refuse playback.

Rules:

1. Pass `Range` requests through to the network unless you implement range
   slicing.
2. If you cache a full media file, implement `206 Partial Content` responses
   with correct `Content-Range`, `Accept-Ranges` and length.
3. Never strip `Accept-Ranges` headers.

Many apps avoid the problem entirely:

```js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.headers.has("range") || /\.(mp4|webm|m3u8|mpd|ts|m4s)$/.test(url.pathname)) {
    return; // let the browser handle media directly
  }

  // ...cache strategy for other assets
});
```

---

## 3. HLS and DASH

- Manifests change; use network-first or a short TTL.
- Segments are often immutable; cache-first is fine, with a bounded cache.
- Live playlists must not be served from a long-lived cache.
- CORS headers must be preserved in cached responses. A cached response without
  `Access-Control-Allow-Origin` fails exactly like a missing header.

---

## 4. Blob and chunked sources

Blob/File sources are local; a service worker is not involved. Chunked sources
fetch through your API:

- do not cache partial chunk responses unless your API marks them immutable;
- if you cache, key by the full request (including auth scope);
- ensure the response body is a stream, not a consumed buffer.

---

## 5. Embeds

YouTube/Vimeo iframes load cross-origin resources. Do not intercept them; the
provider's own service worker/HTTP cache handles them.

If you use a strict `frame-src` CSP, the worker does not change it.

---

## 6. Versioning

- Version the cache name with the app build.
- Delete old caches on `activate`.
- Do not cache `index.html` forever; use network-first or a short TTL.
- Precache only content-hashed assets.

```js
const CACHE = "app-v42";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["/", "/app.js", "/app.css"])));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      ),
  );
});
```

---

## 7. Offline behaviour

| Scenario                         | Expected                                          |
| -------------------------------- | ------------------------------------------------- |
| Media already cached             | Plays offline.                                    |
| Manifest cached but segments not | Fails on the first missing segment.               |
| Poster cached                    | Shows offline.                                    |
| Survey submission offline        | Your callback decides; the player does not retry. |
| Analytics offline                | Your sink decides; the player does not queue.     |

The player surfaces media failures through `state.error` and the `error` event.
It does not implement offline detection or retries.

---

## 8. Testing

1. DevTools → Application → Service Workers → Offline.
2. Hard reload with “Update on reload” to test new caches.
3. Check the Network panel for `206` responses while seeking.
4. Verify `Content-Range` on cached media.
5. Test on Safari/iOS; range handling is stricter there.

---

## 9. Checklist

- [ ] Worker does not intercept range requests.
- [ ] Media segments preserve CORS headers.
- [ ] Manifests are network-first.
- [ ] Cache names are versioned.
- [ ] Old caches are deleted.
- [ ] Auth-scoped media is not shared across users.
- [ ] Offline failure is visible to the app, not silent.
- [ ] Verified on Safari/iOS.

---

**Docs home** · [Documentation index](./README.md) · [Summary](./SUMMARY.md)