const CACHE_NAME ="aryan-enterprises-cache-v1";
const urlsToCache =["/","index.html"];

//Install the srvice worker 
self.addEventListener("install",(event)=>{
    event.waitUntil(caches.open(CACHE_NAME).then((cache)=>{
        return cache.addAll(urlsToCache);
    }));

});

//Fetch cached resorces 
self.addEventListener("fetch",(event)=>{
    event.respondWith(caches.match(event.request).then((response)=>{
        return response || fetch(event.request);
    }));

});