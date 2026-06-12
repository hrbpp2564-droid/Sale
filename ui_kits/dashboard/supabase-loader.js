/* BWP Vantage — dashboard login gate + live-data loader.
   The app stays blocked (App.ready() requires window.BWP_AUTHED) until a correct
   shared password is entered. On success we fetch the real payload via the
   gatekeeper RPC, merge it into window.VDATA, flip BWP_AUTHED, and mount. */
(function () {
  window.__BWP_SOURCE = 'gated';
  var KEY = 'bwp_pass';

  function applyPayload(payload) {
    if (!payload || typeof payload !== 'object') return false;
    var cur = window.VDATA || {};
    Object.assign(cur, payload);
    if (typeof cur.sum !== 'function') cur.sum = function (a) { return a.reduce(function (s, x) { return s + (x || 0); }, 0); };
    window.VDATA = cur;
    window.BWP_AUTHED = true;
    window.__BWP_SOURCE = 'supabase';
    if (typeof window.__BWP_REMOUNT === 'function') window.__BWP_REMOUNT();
    return true;
  }

  function gate() {
    var ov = document.createElement('div');
    ov.id = 'bwp-login';
    ov.setAttribute('style', [
      'position:fixed', 'inset:0', 'z-index:99999', 'display:flex',
      'align-items:center', 'justify-content:center',
      'background:#0b1220', 'font-family:system-ui,-apple-system,Segoe UI,sans-serif'
    ].join(';'));
    ov.innerHTML =
      '<form id="bwp-login-form" style="width:340px;max-width:90vw;background:#141d2e;border:1px solid #243049;border-radius:16px;padding:28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.5)">' +
      '<div style="font-size:20px;font-weight:700;color:#fff;letter-spacing:.02em">BWP Vantage</div>' +
      '<div style="font-size:13px;color:#7c8aa5;margin:6px 0 20px">Sales Intelligence · กรุณาเข้าสู่ระบบ</div>' +
      '<input id="bwp-pass" type="password" placeholder="รหัสผ่าน" autocomplete="current-password" ' +
      'style="width:100%;box-sizing:border-box;background:#0b1220;border:1px solid #2a3650;border-radius:10px;color:#fff;font-size:15px;padding:11px 13px;outline:none" />' +
      '<div id="bwp-err" style="color:#f87171;font-size:12.5px;min-height:18px;margin:8px 2px 0"></div>' +
      '<button id="bwp-go" type="submit" style="width:100%;margin-top:10px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:600;padding:11px;cursor:pointer">เข้าสู่ระบบ</button>' +
      '</form>';
    document.body.appendChild(ov);

    var form = ov.querySelector('#bwp-login-form');
    var input = ov.querySelector('#bwp-pass');
    var err = ov.querySelector('#bwp-err');
    var btn = ov.querySelector('#bwp-go');
    input.focus();

    function tryPass(pass, fromStore) {
      btn.disabled = true; btn.textContent = 'กำลังตรวจสอบ…'; err.textContent = '';
      window.BWP_DB.getDashboard(pass).then(function (payload) {
        try { sessionStorage.setItem(KEY, pass); } catch (e) {}
        applyPayload(payload);
        ov.parentNode && ov.parentNode.removeChild(ov);
      }).catch(function (e) {
        if (fromStore) { try { sessionStorage.removeItem(KEY); } catch (_) {} }
        btn.disabled = false; btn.textContent = 'เข้าสู่ระบบ';
        err.textContent = (e && e.status === 400) || /unauthorized/i.test(e && e.message || '')
          ? 'รหัสผ่านไม่ถูกต้อง' : 'เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง';
        input.select();
      });
    }

    form.addEventListener('submit', function (ev) { ev.preventDefault(); var p = input.value.trim(); if (p) tryPass(p, false); });

    // auto-login if a password is already in this browser session
    var saved = null; try { saved = sessionStorage.getItem(KEY); } catch (e) {}
    if (saved) tryPass(saved, true);
  }

  function fatal(msg) {
    var d = document.createElement('div');
    d.setAttribute('style', 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#0b1220;color:#cbd5e1;font-family:system-ui,sans-serif;text-align:center;padding:24px');
    d.innerHTML = '<div><div style="font-size:16px;font-weight:600;color:#fff">โหลดไม่สำเร็จ</div><div style="font-size:13px;margin-top:8px;color:#94a3b8">' + msg + '</div><button onclick="location.reload()" style="margin-top:16px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:600;padding:10px 18px;cursor:pointer">ลองใหม่</button></div>';
    document.body.appendChild(d);
  }
  var tries = 0;
  function start() {
    if (window.BWP_DB) { gate(); return; }
    if (++tries > 120) { fatal('สคริปต์บางตัวโหลดไม่ครบ — กดลองใหม่ หรือ Ctrl+Shift+R เพื่อล้างแคช'); return; }
    setTimeout(start, 30);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // expose logout for completeness
  window.BWP_LOGOUT = function () { try { sessionStorage.removeItem('bwp_pass'); } catch (e) {} location.reload(); };
})();
