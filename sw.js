const CACHE_NAME = 'paranjape-pwa-v1';
const DYNAMIC_CACHE = 'paranjape-dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.min.css',
    '/script.min.js',
    '/manifest.json',
    '/assets/branding/logo-white.svg',
    '/assets/branding/favicon.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    // Stale-While-Revalidate Strategy
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // If network fails and no cache exists, fallback
                return cachedResponse;
            });
            
            return cachedResponse || fetchPromise;
        })
    );
});
