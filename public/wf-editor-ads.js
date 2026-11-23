(function () {
  'use strict';
  if (window.__wfEditorAds) return;
  window.__wfEditorAds = 1;

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

  function mountBanner(host, def, base) {
    if (!host || !def || !def.key) return;
    var wrap = document.createElement('div');
    wrap.className = 'wf-ad-slot';
    wrap.setAttribute('aria-label', 'Advertisement');
    wrap.setAttribute('data-ad-slot', def.width + 'x' + def.height);
    var f = document.createElement('iframe');
    f.title = 'Advertisement';
    f.width = def.width;
    f.height = def.height;
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms');
    f.style.cssText =
      'width:min(100%,' + def.width + 'px);height:' + def.height + 'px;border:0;display:block';
    f.srcdoc = bannerIframeDoc(def.key, def.width, def.height, base);
    wrap.appendChild(f);
    host.appendChild(wrap);
  }

  function run(cfg) {
    if (!cfg.enabled) return;
    var base = cfg.bannerScriptBase || 'https://bauval.org/22';
  var vw = window.innerWidth || 1024;
    var topKey = vw >= 768 ? 'banner728x90' : vw >= 480 ? 'banner468x60' : 'banner320x50';
    mountBanner(document.getElementById('wf-ad-top'), cfg.banners[topKey], base);
    mountBanner(document.getElementById('wf-ad-mobile'), cfg.banners['banner320x50'], base);
    if (vw >= 1400) {
      mountBanner(document.getElementById('wf-ad-rail-left'), cfg.banners['banner160x600'], base);
      mountBanner(document.getElementById('wf-ad-rail-right'), cfg.banners['banner160x300'], base);
    }
    var native = cfg.nativeBanner;
    if (native && native.src && native.containerId) {
      var nb = document.getElementById('wf-ad-native');
      if (nb) {
        var box = document.createElement('div');
        box.id = native.containerId;
        box.className = 'wf-ad-native';
        nb.appendChild(box);
        addScript(native.src, nb, 'native-banner');
      }
    }
    if (cfg.smartlink && cfg.smartlink.url) {
      var foot = document.getElementById('wf-site-footer');
      if (foot) {
        var sp = document.createElement('span');
        sp.innerHTML =
          '<a href="' +
          cfg.smartlink.url +
          '" target="_blank" rel="sponsored noopener noreferrer">' +
          (cfg.smartlink.label || 'Sponsored') +
          '</a>';
        foot.appendChild(sp);
      }
    }
    addScript(cfg.socialBar, document.body, 'social-bar');
    addScript(cfg.popunder, document.head, 'popunder');
  }

  fetch('/ads.json', { cache: 'no-store' })
    .then(function (r) {
      return r.json();
    })
    .then(run)
    .catch(function () {});
})();