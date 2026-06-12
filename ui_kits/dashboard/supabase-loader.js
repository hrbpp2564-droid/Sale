/* BWP Vantage — Supabase live-data loader.
   Fetches the dashboard snapshot from Supabase and refreshes window.VDATA in place
   (screens hold the same object reference, so a DB update flows through on re-render).
   Falls back silently to the bundled data.js if the key is unset or the request fails. */
(function () {
  var cfg = window.BWP_SUPABASE;
  window.__BWP_SOURCE = 'bundled';
  if (!cfg || !cfg.url || !cfg.anonKey || cfg.anonKey.indexOf('PASTE') === 0) {
    return; // no key yet → stay on bundled data.js
  }

  var endpoint = cfg.url.replace(/\/$/, '') +
    '/rest/v1/' + (cfg.table || 'dashboard_data') +
    '?id=eq.' + encodeURIComponent(cfg.id || 'bwp') + '&select=payload';

  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, 4000);

  fetch(endpoint, {
    headers: { apikey: cfg.anonKey, Authorization: 'Bearer ' + cfg.anonKey },
    signal: ctrl.signal,
  })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (rows) {
      clearTimeout(timer);
      // Guard: a copy of this loader is embedded in _ds_bundle.js too. Apply once
      // so we don't remount twice (the double-apply caused UI flicker).
      if (window.__BWP_SB_APPLIED) return;
      window.__BWP_SB_APPLIED = true;
      var payload = rows && rows[0] && rows[0].payload;
      if (!payload || typeof payload !== 'object') return;
      var cur = window.VDATA || {};
      // Overlay in place (no destructive delete-all first) so screens never see an
      // empty VDATA mid-render — that transient blank is what made the screen flicker.
      Object.assign(cur, payload);
      if (typeof cur.sum !== 'function') cur.sum = function (a) { return a.reduce(function (s, x) { return s + (x || 0); }, 0); };
      window.VDATA = cur;
      window.__BWP_SOURCE = 'supabase';
      if (typeof window.__BWP_REMOUNT === 'function') window.__BWP_REMOUNT();
      console.info('[BWP] live data loaded from Supabase');
    })
    .catch(function (e) {
      clearTimeout(timer);
      console.warn('[BWP] Supabase fetch failed — using bundled data. ', e);
    });
})();
