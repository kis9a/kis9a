// https://raw.githubusercontent.com/yyx990803/register-service-worker/master/src/index.js
const isLocalhost = () =>
  Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
let waitWindowLoad;
if (typeof window !== "undefined") {
  if (typeof Promise !== "undefined") {
    waitWindowLoad = new Promise((resolve) =>
      window.addEventListener("load", resolve)
    );
  } else {
    waitWindowLoad = { then: (cb) => window.addEventListener("load", cb) };
  }
}
function register(swUrl, hooks = {}) {
  const { registrationOptions = {} } = hooks;
  delete hooks.registrationOptions;
  const emit = (hook, ...args) => {
    if (hooks && hooks[hook]) {
      hooks[hook](...args);
    }
  };
  if ("serviceWorker" in navigator) {
    waitWindowLoad.then(() => {
      if (isLocalhost()) {
        checkValidServiceWorker(swUrl, emit, registrationOptions);
        navigator.serviceWorker.ready
          .then((registration) => {
            emit("ready", registration);
          })
          .catch((error) => handleError(emit, error));
      } else {
        registerValidSW(swUrl, emit, registrationOptions);
        navigator.serviceWorker.ready
          .then((registration) => {
            emit("ready", registration);
          })
          .catch((error) => handleError(emit, error));
      }
    });
  }
}
function handleError(emit, error) {
  if (!navigator.onLine) {
    emit("offline");
  }
  emit("error", error);
}
function registerValidSW(swUrl, emit, registrationOptions) {
  navigator.serviceWorker
    .register(swUrl, registrationOptions)
    .then((registration) => {
      emit("registered", registration);
      if (registration.waiting) {
        emit("updated", registration);
        return;
      }
      registration.onupdatefound = () => {
        emit("updatefound", registration);
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              emit("updated", registration);
            } else {
              emit("cached", registration);
            }
          }
        };
      };
    })
    .catch((error) => handleError(emit, error));
}
function checkValidServiceWorker(swUrl, emit, registrationOptions) {
  fetch(swUrl)
    .then((response) => {
      if (response.status === 404) {
        emit("error", new Error(`Service worker not found at ${swUrl}`));
        unregister();
      } else if (
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        emit(
          "error",
          new Error(
            `Expected ${swUrl} to have javascript content-type, ` +
              `but received ${response.headers.get("content-type")}`
          )
        );
        unregister();
      } else {
        registerValidSW(swUrl, emit, registrationOptions);
      }
    })
    .catch((error) => handleError(emit, error));
}
function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => handleError(emit, error));
  }
}
register("./service-worker.js", {
  registrationOptions: { scope: "./" },
  ready(registration) {
    console.log("Service worker is active.");
  },
  registered(registration) {
    console.log("Service worker has been registered.");
  },
  cached(registration) {
    console.log("Content has been cached for offline use.");
  },
  updatefound(registration) {
    console.log("New content is downloading.");
  },
  updated(registration) {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1.0.11'
const RUNTIME = 'runtime'

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './',
  'index.html',
  './js/',
  './css/',
  './lib',
  './assets'
]

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  )
})

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete)
      }))
    }).then(() => self.clients.claim())
  )
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => response)
          })
        })
      })
    )
  }
})
