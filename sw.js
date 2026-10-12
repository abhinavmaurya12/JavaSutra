const CACHE_NAME = "javasutra-cache-v1";
const APP_ROOT = "/JavaSutra/";

const APP_FILES = [
  APP_ROOT,
  APP_ROOT + "index.html",
  APP_ROOT + "manifest.json",
  APP_ROOT + "icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("javasutra-cache-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (response.ok && url.pathname.startsWith(APP_ROOT)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }

        return response;
      }).catch(() => {
        if (request.mode === "navigate") {
          return caches.match(APP_ROOT + "index.html");
        }

        return new Response("You are offline and this resource is not cached.", {
          status: 503,
          statusText: "Offline"
        });
      });
    })
  );
});