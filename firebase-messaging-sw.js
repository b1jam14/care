const CACHE_NAME = "care-cache-v1";

const FILES_TO_CACHE = [
  "/care/",
  "/care/index.html",
  "/care/manifest.json",
  "/care/icon-192.png",
  "/care/icon-512.png"
];

// Installation + mise en cache
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activation + nettoyage anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// Mode hors-ligne
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

importScripts("https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAOlAIN2F0KZqNuvoh5ohlT66OdOhzz7P8",
  authDomain: "care-2cbc1.firebaseapp.com",
  projectId: "care-2cbc1",
  storageBucket: "care-2cbc1.firebasestorage.app",
  messagingSenderId: "102325538795",
  appId: "1:102325538795:web:51648a53db1cc0f1d093ae"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || "Care";
  const options = {
    body: payload.notification?.body || "Nouvelle notification",
    icon: "./icon-192.png",
    badge: "./icon-192.png"
  };

  self.registration.showNotification(title, options);
});
