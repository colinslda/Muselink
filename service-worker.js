// service-worker.js

const CACHE_NAME = 'music-connect-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/components.css',
    '/js/app.js',
    '/images/logo.png',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png'
    // ... Ajoutez ici tous les assets statiques que vous voulez mettre en cache ...
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Stratégie de récupération depuis le cache d'abord, puis le réseau (cache-first)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la ressource est dans le cache, la retourner
                if (response) {
                    return response;
                }
                // Sinon, aller chercher sur le réseau
                return fetch(event.request);
            })
    );
});

// Activation du Service Worker (nettoyage de l'ancien cache si nécessaire)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Supprimer les anciens caches
                    }
                })
            );
        })
    );
});
