/* ZOORO Hospitality service worker — offline fallback */
const CACHE = "zooro-offline-v2";
const OFFLINE_URL = "/offline";

async function precache() {
  const cache = await caches.open(CACHE);

  // The offline page plus the app manifest and icons.
  const basics = [OFFLINE_URL, "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];
  await Promise.all(basics.map((url) => cache.add(url).catch(() => {})));

  // Cache the offline page's own scripts/styles so it renders styled offline.
  try {
    const res = await fetch(OFFLINE_URL, { cache: "reload" });
    const html = await res.text();
    const assets = [...html.matchAll(/(?:src|href)="(\/_next\/[^"]+)"/g)].map((m) => m[1]);
    await Promise.all([...new Set(assets)].map((url) => cache.add(url).catch(() => {})));
  } catch {
    // Ignore — we still have the offline page itself.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network first, offline page as the fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE);
          const offline = await cache.match(OFFLINE_URL);
          if (offline) return offline;
          return new Response("You are offline.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }
      })(),
    );
    return;
  }

  // Static assets: cache-first so the offline page keeps its styling.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const res = await fetch(request);
        if (res.ok && url.pathname.startsWith("/_next/")) {
          cache.put(request, res.clone());
        }
        return res;
      } catch {
        return new Response("", { status: 504 });
      }
    })(),
  );
});
