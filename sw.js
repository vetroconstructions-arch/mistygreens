const CACHE_NAME = 'forest-trails-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './images/misty-greens-gate.jpg',
  './images/cove-duet.jpg',
  './images/cascade-villas.jpg',
  './images/master-plan.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
