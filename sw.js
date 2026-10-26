// Paranjape Forest Trails — Sovereign Service Worker v3.0
// Next-Gen Edge PWA & Performance Engine (0ms Cache-First + Stale-While-Revalidate)

const CACHE_VERSION = 'forest-trails-cache-v3.0.1';
const CORE_SHELL_ASSETS = [
  '/',
  '/style-home.min.css',
  '/style.min.css',
  '/script.min.js',
  '/manifest.json',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/images/drone-aerial.webp'
];

// 1. Install: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CORE_SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate: Purge Old Caches & Claim Clients Immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Strategy: Hybrid Cache-First & Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests from the same origin
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // Bypass APIs, Thank You pages, and admin routes
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/thank-you')) {
    return;
  }

  // A. Static Immutable Assets (Fonts, Images, CSS, JS): Cache-First / SWR
  if (
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // B. HTML Navigation Requests: Network-First with Cache Fallback
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/');
        })
    );
  }
});
