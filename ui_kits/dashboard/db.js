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
    // Executive PIN — read-only by construction: no write RPC accepts this secret.
    getDashboardRo: function (pass) { return call('get_dashboard_ro', { pass: pass }); },

    // The password-taking data RPCs (get_dashboard, save_dashboard,
    // set_dashboard_pass, get_dashboard_user, save_dashboard_user, save_upload,
    // list_uploads, get_upload) were removed from this client and revoked from
    // anon in backend/retire_password_rpcs.sql. They bypassed the session and
    // role checks entirely: anyone still holding the old shared password could
    // overwrite the whole payload. Use the session-token calls below.

    addUser: function (adminUser, adminPass, newUsername, displayName, role, newPass) {
      return call('add_bwp_user', { p_admin_user: adminUser, p_admin_pass: adminPass, p_new_username: newUsername, p_display_name: displayName, p_role: role, p_new_pass: newPass });
    },
    deactivateUser: function (adminUser, adminPass, targetUsername) {
      return call('deactivate_bwp_user', { p_admin_user: adminUser, p_admin_pass: adminPass, p_target_username: targetUsername });
    },
    changePassword: function (username, oldPass, newPass) {
      return call('change_bwp_password', { p_username: username, p_old_pass: oldPass, p_new_pass: newPass });
    },

    // ---- Session-token API (single sign-on across the three pages) ----
    // login_session checks bwp_users and returns { token, role, canWrite, payload }.
    // Every *_s call below carries the token instead of a password, so no secret
    // ever has to be handed from one page to the next.
    loginSession: function (username, pass) { return call('login_session', { p_username: username, p_pass: pass }); },
    logoutSession: function (token) { return call('logout_session', { p_token: token }); },
    getDashboardS: function (token) { return call('get_dashboard_s', { p_token: token }); },
    saveDashboardS: function (token, payload) { return call('save_dashboard_s', { p_token: token, new_payload: payload }); },
    saveUploadS: function (token, filename, mime, size, contentB64, kind) {
      return call('save_upload_s', { p_token: token, p_filename: filename, p_mime: mime, p_size: size, p_content_b64: contentB64, p_kind: kind || 'current' });
    },
    listUploadsS: function (token) { return call('list_uploads_s', { p_token: token }); },
    getUploadS: function (token, id) { return call('get_upload_s', { p_token: token, p_id: id }); },
    setPassRoS: function (token, newRoPass) { return call('set_pass_ro_s', { p_token: token, new_ro_pass: newRoPass }); },
    changeOwnPasswordS: function (token, oldPass, newPass) {
      return call('change_own_password_s', { p_token: token, old_pass: oldPass, new_pass: newPass });
    },
  };
})();
