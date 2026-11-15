const V='fp-v1',FILES=['footprints.html','footprints-world.js','footprints.webmanifest','footprints-icon-192.png','footprints-icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;const base=location.pathname.replace(/[^/]*$/,'');const name=u.pathname.slice(base.length);if(!u.pathname.startsWith(base)||!FILES.includes(name))return;
 e.respondWith(caches.open(V).then(async c=>{const key=base+name;const hit=await c.match(key);const net=fetch(key).then(r=>{if(r.ok)c.put(key,r.clone());return r;}).catch(()=>null);return hit||(await net)||new Response('오프라인이에요. 인터넷에 연결한 뒤 한 번 열어 주세요.',{status:503});}));});
