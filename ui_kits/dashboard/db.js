/* BWP Vantage — gatekeeper RPC client.
   All data access goes through password-checked Postgres functions; the anon
   key alone can read/write nothing (RLS denies direct table access).
   Requires window.BWP_SUPABASE (url + anonKey) to be set first. */
(function () {
  var cfg = window.BWP_SUPABASE || {};
  var base = (cfg.url || '').replace(/\/$/, '') + '/rest/v1/rpc/';
  function headers() {
    return { apikey: cfg.anonKey, Authorization: 'Bearer ' + cfg.anonKey, 'Content-Type': 'application/json' };
  }
  async function call(fn, body) {
    var r = await fetch(base + fn, { method: 'POST', headers: headers(), body: JSON.stringify(body || {}) });
    if (!r.ok) {
      var msg = await r.text().catch(function () { return ''; });
      var err = new Error(msg || ('HTTP ' + r.status));
      err.status = r.status;
      throw err;
    }
    var txt = await r.text();
    return txt ? JSON.parse(txt) : null;
  }
  window.BWP_DB = {
    // returns the dashboard payload, or throws if the password is wrong
    getDashboard: function (pass) { return call('get_dashboard', { pass: pass }); },
    // saves the payload (officer); throws if password wrong
    saveDashboard: function (pass, payload) { return call('save_dashboard', { pass: pass, new_payload: payload }); },
    // rotate the shared password
    setPass: function (oldPass, newPass) { return call('set_dashboard_pass', { old_pass: oldPass, new_pass: newPass }); }
  };
})();
