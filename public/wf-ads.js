/* Static/guide pages: load all Adsterra units from ads.json (iframe banners). */
(function () {
  'use strict';
  if (window.__wfAds) return;
  window.__wfAds = 1;

  function bannerIframeDoc(key, w, h, base) {
    var at = JSON.stringify({ key: key, format: 'iframe', height: h, width: w, params: {} });
    var src = base.replace(/\/$/, '') + '/' + key;
    return (
      '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
      '<body style="margin:0;overflow:hidden;background:transparent">' +
      '<script>var atOptions = ' +
      at +
      ';</script><script src="' +
      src +
      '"></script></body></html>'
    );
  }

  function addScript(url, where, marker) {
    if (!url || document.querySelector('script[data-ad="' + marker + '"]')) return;
    var s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-ad', marker);
    (where || document.body).appendChild(s);
  }

  function mount(sizeKey, cfg, root, after) {
    var def = cfg.banners[sizeKey];
    if (!def) return;
    var box = document.createElement('aside');
    box.className = 'wf-ad-slot';
    box.setAttribute('aria-label', 'Advertisement');
    var f = document.createElement('iframe');
    f.title = 'Advertisement';
    f.width = def.width;
    f.height = def.height;
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms');
    f.style.cssText = 'max-width:100%;border:0;display:block;margin:1rem auto';
    f.srcdoc = bannerIframeDoc(def.key, def.width, def.height, cfg.bannerScriptBase || 'https://bauval.org/22');
    box.appendChild(f);
    if (after && after.parentNode) after.parentNode.insertBefore(box, after.nextSibling);
    else root.appendChild(box);
  }

  function run(cfg) {
    if (!cfg.enabled) return;
    var main = document.querySelector('main') || document.body;
    var h1 = main.querySelector('h1');
    var vw = window.innerWidth || 1024;
    var top = vw >= 768 ? 'banner728x90' : vw >= 480 ? 'banner468x60' : 'banner320x50';
    mount(top, cfg, main, h1);
    var native = cfg.nativeBanner;
    if (native && native.src && native.containerId) {
      var nb = document.createElement('div');
      nb.id = native.containerId;
      main.appendChild(nb);
      addScript(native.src, main, 'native');
    }
    mount('banner300x250', cfg, main, null);
    mount('banner468x60', cfg, main, null);
    if (cfg.smartlink && cfg.smartlink.url) {
      var p = document.createElement('p');
      p.style.cssText = 'text-align:center;font-size:.85rem;opacity:.8';
      p.innerHTML =
        '<a href="' +
        cfg.smartlink.url +
        '" rel="sponsored noopener noreferrer" target="_blank">' +
        (cfg.smartlink.label || 'Sponsored') +
        '</a>';
      main.appendChild(p);
    }
    addScript(cfg.socialBar, document.body, 'social');
    addScript(cfg.popunder, document.head, 'pop');
  }

  fetch('/ads.json', { cache: 'no-store' })
    .then(function (r) {
      return r.json();
    })
    .then(run)
    .catch(function () {});
})();