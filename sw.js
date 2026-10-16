const V = "treino-v19";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const isDoc = req => req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
const cacheable = res =>
  res && res.ok && !res.redirected && (res.headers.get("content-type") || "").includes("text/html");

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  // HTML: rede primeiro (ignorando a cache HTTP), com a copia local como reserva offline.
  // Respostas redirecionadas nao sao guardadas: sao paginas de autenticacao, nao a app.
  if (isDoc(req)) {
    e.respondWith(
      fetch(new Request(req.url, { cache: "no-cache", redirect: "follow" }))
        .then(res => {
          if (cacheable(res)) {
            const c = res.clone();
            caches.open(V).then(k => k.put("./index.html", c));
          }
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // restantes ficheiros: cache primeiro, com atualizacao em segundo plano
  e.respondWith(caches.open(V).then(async cache => {
    const hit = await cache.match(req);
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque") && !res.redirected) cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
