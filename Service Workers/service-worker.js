var CACHE_NAME = "my-site-cache-v1";
var filetoCache = [
  "app.js",
  //   "style/main.css",
  //   "images/still_life_medium.jpg",
  //   "index.html",
  //   "pages/offline.html",
  //   "pages/404.html",
];

// install

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("opened cache");
      return cache.addAll(filetoCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("Service workers activated successfully");
});
