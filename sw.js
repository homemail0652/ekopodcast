const CACHE_NAME = 'ekopodcast-pwa-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './visitor-counter.js',
    './app-icon.png'
];

// Kurulum sırasında önbelleğe al
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Önbellek açıldı');
                return cache.addAll(urlsToCache);
            })
    );
});

// İstekleri yakala (Network First - Önce internete bak, yoksa belleğe bak)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Geçerli bir yanıt mı?
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Yanıtı kopyala ve önbelleğe at
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                // İnternet yoksa önbellekten dön
                return caches.match(event.request);
            })
    );
});

// Eski önbellekleri temizle
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
