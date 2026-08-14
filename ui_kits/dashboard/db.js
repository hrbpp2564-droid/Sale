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
    // Single-password (legacy)
    getDashboard: function (pass) { return call('get_dashboard', { pass: pass }); },
    saveDashboard: function (pass, payload) { return call('save_dashboard', { pass: pass, new_payload: payload }); },
    setPass: function (oldPass, newPass) { return call('set_dashboard_pass', { old_pass: oldPass, new_pass: newPass }); },
    // Multi-user
    getDashboardUser: function (username, pass) { return call('get_dashboard_user', { p_username: username, p_pass: pass }); },
    saveDashboardUser: function (username, pass, payload) { return call('save_dashboard_user', { p_username: username, p_pass: pass, new_payload: payload }); },
    addUser: function (adminUser, adminPass, newUsername, displayName, role, newPass) {
      return call('add_bwp_user', { p_admin_user: adminUser, p_admin_pass: adminPass, p_new_username: newUsername, p_display_name: displayName, p_role: role, p_new_pass: newPass });
    },
    deactivateUser: function (adminUser, adminPass, targetUsername) {
      return call('deactivate_bwp_user', { p_admin_user: adminUser, p_admin_pass: adminPass, p_target_username: targetUsername });
    },
    // คลังไฟล์ Excel ต้นฉบับ (ต้องรัน backend/upload_archive.sql ก่อน)
    saveUpload: function (pass, filename, mime, size, contentB64, kind) {
      return call('save_upload', { pass: pass, p_filename: filename, p_mime: mime, p_size: size, p_content_b64: contentB64, p_kind: kind || 'current' });
    },
    listUploads: function (pass) { return call('list_uploads', { pass: pass }); },
    getUpload: function (pass, id) { return call('get_upload', { pass: pass, p_id: id }); },
    changePassword: function (username, oldPass, newPass) {
      return call('change_bwp_password', { p_username: username, p_old_pass: oldPass, p_new_pass: newPass });
    },
  };
})();
