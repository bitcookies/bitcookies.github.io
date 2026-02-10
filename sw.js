const CACHE_VERSION = '1.2.1';

const BASE_CACHE_FILES = [
    '/favicon.ico',
    '/favicon.png',
    '/apple-touch-icon.png',
    '/assets/css/fontawesome-all.min.css',
    '/assets/css/main.css',
    '/assets/js/breakpoints.min.js',
    '/assets/js/browser.min.js',
    '/assets/js/jquery.min.js',
    '/assets/js/main.js',
    '/assets/js/util.js',
    '/assets/webfonts/fa-brands-400.eot',
    '/assets/webfonts/fa-brands-400.svg',
    '/assets/webfonts/fa-brands-400.ttf',
    '/assets/webfonts/fa-brands-400.woff',
    '/assets/webfonts/fa-brands-400.woff2',
    '/assets/webfonts/fa-regular-400.eot',
    '/assets/webfonts/fa-regular-400.svg',
    '/assets/webfonts/fa-regular-400.ttf',
    '/assets/webfonts/fa-regular-400.woff',
    '/assets/webfonts/fa-regular-400.woff2',
    '/assets/webfonts/fa-solid-900.eot',
    '/assets/webfonts/fa-solid-900.svg',
    '/assets/webfonts/fa-solid-900.ttf',
    '/assets/webfonts/fa-solid-900.woff',
    '/assets/webfonts/fa-solid-900.woff2',
    '/assets/images/logo.svg',
    '/assets/images/logo-words.svg',
    '/pwa/pwa@192.png',
    '/pwa/pwa@512.png',
    '/404.html',
    '/offline.html',

];

const OFFLINE_CACHE_FILES = [
    '/offline.html',
    '/favicon.ico',
    '/favicon.png',
    '/apple-touch-icon.png',
    '/images/logo.svg',
];

const NOT_FOUND_CACHE_FILES = [
    '/404.html',
    '/favicon.ico',
    '/favicon.png',
    '/apple-touch-icon.png',
];

const OFFLINE_PAGE = '/offline.html';
const NOT_FOUND_PAGE = '/404.html';

const CACHE_VERSIONS = {
    content: 'content-v' + CACHE_VERSION,
    notFound: '404-v' + CACHE_VERSION,
    offline: 'offline-v' + CACHE_VERSION,
};

// Define MAX_TTL's in SECONDS for specific file extensions
const MAX_TTL = {
    '/': 3600,       // 1 Hour
    html: 3600,      // 1 Hour
    json: 86400,     // 1 Day
    js: 86400,      // 1 Day
    css: 86400,     // 1 Day
    scss: 86400,     // 1 Day
    png: 604800,     // 7 Days
    jpg: 604800,     // 7 Days
    svg: 604800,     // 7 Days
    ttf: 604800,     // 7 Days
    eot: 604800,     // 7 Days
    woff: 604800,    // 7 Days
    woff2: 604800,   // 7 Days
};

const CACHE_STRATEGY = {
    default: 'cacheFirst',
    css_js: 'cacheFirst',
    images: 'cacheFirst',
    fonts: 'cacheFirst',
}

const CACHE_BLACKLIST = [
    '/sw.js',
    '/\.mp4$',
];

const neverCacheUrls = [
    '/sw.js',
    '/preview=true/',
    '/api/',
    '/\.mp4$',
];

const SUPPORTED_METHODS = [
    'GET',
];

// Check if current url is in the neverCacheUrls list
function pwaForWpcheckNeverCacheList(url) {
    if (this.match(url)) {
        return false;
    }
    return true;
}

/**
 * pwaForWpisBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function pwaForWpisBlackListed(url) {
    return (CACHE_BLACKLIST.length > 0) ? !CACHE_BLACKLIST.filter((rule) => {
        if (typeof rule === 'function') {
            return !rule(url);
        } else {
            return false;
        }
    }).length : false
}

/**
 * pwaForWpgetFileExtension
 * @param {string} url
 * @returns {string}
 */
function pwaForWpgetFileExtension(url) {
    if (typeof url === 'string') {
        let split_two = url.split('?');
        let split_url = split_two[0];
        let extension = split_url.split('.').reverse()[0].split('?')[0];
        return (extension.endsWith('/')) ? '/' : extension;
    } else {
        return null;
    }
}

/**
 * pwaForWpgetTTL
 * @param {string} url
 */
function pwaForWpgetTTL(url) {
    if (typeof url === 'string') {
        let extension = pwaForWpgetFileExtension(url);
        if (typeof MAX_TTL[extension] === 'number') {
            return MAX_TTL[extension];
        } else {
            return MAX_TTL["/"];
        }
    } else {
        return MAX_TTL["/"];
    }
}

/**
 * pwaForWpinstallServiceWorker
 * @returns {Promise}
 */
function pwaForWpinstallServiceWorker() {
    return Promise.all(
        [
            caches.open(CACHE_VERSIONS.content)
                .then(
                    (cache) => {
                        if (BASE_CACHE_FILES.length > 0) {
                            for (var i = 0; i < BASE_CACHE_FILES.length; i++) {
                                pwaForWpprecacheUrl(BASE_CACHE_FILES[i])
                            }
                        }
                        //return cache.addAll(BASE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.offline)
                .then(
                    (cache) => {
                        return cache.addAll(OFFLINE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.notFound)
                .then(
                    (cache) => {
                        return cache.addAll(NOT_FOUND_CACHE_FILES);
                    }
                )
        ]
    )
        .then(() => {
            return self.skipWaiting();
        });
}

/**
 * pwaForWpcleanupLegacyCache
 * @returns {Promise}
 */
function pwaForWpcleanupLegacyCache() {
    let currentCaches = Object.keys(CACHE_VERSIONS).map((key) => {
        return CACHE_VERSIONS[key];
    });

    return new Promise((resolve, reject) => {
        caches.keys()
            .then((keys) => {
                return legacyKeys = keys.filter((key) => {
                    return !~currentCaches.indexOf(key);
                });
            })
            .then((legacy) => {
                if (legacy.length) {
                    Promise.all(
                        legacy.map((legacyKey) => {
                            return caches.delete(legacyKey)
                        })
                    )
                        .then(() => {
                            resolve()
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            })
            .catch(() => {
                reject();
            });
    });
}

function pwaForWpprecacheUrl(url) {
    if (!pwaForWpisBlackListed(url)) {
        caches.open(CACHE_VERSIONS.content)
            .then((cache) => {
                cache.match(url)
                    .then((response) => {
                        if (!response) {
                            return fetch(url)
                        } else {
                            // already in cache, nothing to do.
                            return null
                        }
                    })
                    .then((response) => {
                        if (response) {
                            fetch(url).then(dataWrappedByPromise => dataWrappedByPromise.text())
                                .then(data => {
                                    if (data) {
                                        const regex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
                                        let m;
                                        while ((m = regex.exec(data)) !== null) {
                                            if (m.index === regex.lastIndex) {
                                                regex.lastIndex++;
                                            }
                                            m.forEach((match, groupIndex) => {
                                                if (groupIndex == 1) {
                                                    if (new URL(match).origin == location.origin) {
                                                        fetch(match)
                                                            .then((imagedata) => {
                                                                cache.put(match, imagedata.clone());
                                                            });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            return cache.put(url, response.clone());
                        } else {
                            return null;
                        }
                    });
            })
    }
}

var fetchRengeData = function (event) {
    var pos = Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);
    console.log('Range request for', event.request.url, ', starting position:', pos);
    event.respondWith(
        caches.open(CACHE_VERSIONS.content)
            .then(function (cache) {
                return cache.match(event.request.url);
            })
            .then(function (res) {
                if (!res) {
                    return fetch(event.request)
                        .then(res => {
                            return res.arrayBuffer();
                        });
                }
                return res.arrayBuffer();
            })
            .then(function (ab) {
                return new Response(
                    ab.slice(pos),
                    {
                        status: 206,
                        statusText: 'Partial Content',
                        headers: [
                            ['Content-Range', 'bytes ' + pos + '-' +
                                (ab.byteLength - 1) + '/' + ab.byteLength]
                        ]
                    }
                );
            })
    );
}

let cachingStrategy = {
    notGetMethods: function (event) {
        // If non-GET request, try the network first, fall back to the offline page
        if (event.request.method !== 'GET') {
            event.respondWith(
                fetch(event.request)
                    .catch(error => {
                        return caches.match(offlinePage);
                    })
            );
            return false;
        }
    },

    fetchFromCache: function (event) {
        return caches.open(CACHE_VERSIONS.content)
            .then((cache) => {
                return cache.match(event.request)
                    .then((response) => {
                        if (response) {
                            let headers = response.headers.entries();
                            let date = null;
                            for (let pair of headers) {
                                if (pair[0] === 'date') {
                                    date = new Date(pair[1]);
                                }
                            }
                            if (date) {
                                let age = parseInt((new Date().getTime() - date.getTime()) / 1000);
                                let ttl = pwaForWpgetTTL(event.request.url);
                                if (age > ttl) {
                                    return new Promise((resolve) => {
                                        return fetch(event.request.clone())
                                            .then((updatedResponse) => {
                                                if (updatedResponse) {
                                                    cache.put(event.request, updatedResponse.clone());
                                                    resolve(updatedResponse);
                                                } else {
                                                    resolve(response)
                                                }
                                            })
                                            .catch(() => {
                                                resolve(response);
                                            });
                                    })
                                        .catch((err) => {
                                            return response;
                                        });
                                } else {
                                    return response;
                                }
                            } else {
                                return response;
                            }
                        } else {
                            return null;
                        }
                    })
                    .then((response) => {
                        if (response) {
                            return response;
                        } else {
                            return fetch(event.request.clone())
                                .then((response) => {
                                    if (response.status < 300) {
                                        if (~SUPPORTED_METHODS.indexOf(event.request.method) && pwaForWpprecacheUrl(event.request.url)) {
                                            pwaForWpprecacheUrl(event.request.url);
                                        }
                                        return response;
                                    } else {
                                        if (response.status === 404) {
                                            return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                                return cache.match(NOT_FOUND_PAGE);
                                            });
                                        }
                                        return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                            return cache.match(OFFLINE_PAGE);
                                        });
                                    }
                                })
                                .catch(() => {
                                    return caches.open(CACHE_VERSIONS.offline).then((offlineCache) => {
                                        return offlineCache.match(OFFLINE_PAGE);
                                    });
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('  Error in fetch handler:', error);
                        throw error;
                    });
            });
    },

    fetchFromNetwork: function (event) {
        return fetch(event.request.clone())
            .then((response) => {
                if (!response) {
                    return caches.open(CACHE_VERSIONS.offline).then((offlineCache) => {
                        return offlineCache.match(OFFLINE_PAGE);
                    });
                } else {
                    if (response.status < 300) {
                        if (~SUPPORTED_METHODS.indexOf(event.request.method) && pwaForWpprecacheUrl(event.request.url)) {
                            pwaForWpprecacheUrl(event.request.url);
                        }
                        return response;
                    } else {
                        if (response.status === 404) {
                            return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                return cache.match(NOT_FOUND_PAGE);
                            });
                        }
                        return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                            return cache.match(OFFLINE_PAGE);
                        });
                    }
                }
            })
            .catch((error) => {
                return caches.open(CACHE_VERSIONS.offline).then((offlineCache) => {
                    return offlineCache.match(OFFLINE_PAGE);
                });
            });
    },

    handleRangeRequest: function (event) {
        if (event.request.headers.has('range')) {
            fetchRengeData(event);
            return false;
        }
    }
}

/**
 * The install handler takes care of precaching the resources we always need.
 */
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([pwaForWpinstallServiceWorker(), self.skipWaiting()])
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([pwaForWpcleanupLegacyCache(), self.clients.claim()])
    );
});

// This fetch handler serves responses for same-origin resources from a cache.
self.addEventListener('fetch', event => {
    // If this is a range request, let fetchRengeData handle it
    if (cachingStrategy.handleRangeRequest(event) === false) return;

    // Handle non-GET requests
    if (cachingStrategy.notGetMethods(event) === false) return;

    // Use cache-first strategy for images
    if (event.request.url.match(/\.(?:png|jpg|jpeg|svg|gif)$/)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
        return;
    }

    // Use network-first strategy for all other requests
    event.respondWith(
        cachingStrategy.fetchFromNetwork(event)
            .catch(() => cachingStrategy.fetchFromCache(event))
    );
});
