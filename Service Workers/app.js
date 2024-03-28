// Service workers essentially act as proxy servers that sit between web applications, the browser, and the
//  network (when available). They are intended, among other things, to enable the creation of effective offline
//  experiences, intercept network requests and take appropriate action based on whether the network is available,
//   and update assets residing on the server. They will also allow access to push notifications and background
//   sync APIs.

// Points to Note :
// 1. service workers are not blocking it is purely asynchronous
// 2. synchronous XHR and localstorage can not be accessed in a
//    service workers .
// 3. the service workers can not access the DOM directly .
// 4. service workers runs over https over only

// #If we want to apply offline support then activate , push notification push event and sync event do the sync
// functionlity
// register;
if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    function () {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function (register) {
          console.log("Service Wokers registered successfull", register.scope);
        });
    },
    function (error) {
      console.log("Error in loading service workers", error);
    }
  );
}
