/* BWP Vantage — dashboard login gate + live-data loader (multi-user).
   The app stays blocked until valid credentials are entered.
   On success: fetch dashboard payload, set window.VDATA, flip BWP_AUTHED. */
(function () {
  window.__BWP_SOURCE = 'gated';
  var CREDS_KEY = 'bwp_creds';

  function applyPayload(payload) {
    if (!payload || typeof payload !== 'object') return false;
    var cur = window.VDATA || {};
    Object.assign(cur, payload);
    if (typeof cur.sum !== 'function') cur.sum = function (a) { return a.reduce(function (s, x) { return s + (x || 0); }, 0); };
    // The stored payload often omits MONTHS_ACT (only TH_MONTHS + NACT + data
    // arrays are persisted), leaving the skeleton's empty []. Screens that read
    // window.VDATA directly (e.g. Customer Analysis) then render charts with no
    // x-axis month labels. Rebuild it from TH_MONTHS so labels always show.
    if ((!cur.MONTHS_ACT || !cur.MONTHS_ACT.length) && cur.TH_MONTHS && cur.TH_MONTHS.length) {
      var nA = cur.NACT;
      if (!nA && cur.volumeByYear && cur.volumeByYear['2569']) {
        nA = cur.volumeByYear['2569'].filter(function (v) { return v != null; }).length;
      }
      cur.MONTHS_ACT = cur.TH_MONTHS.slice(0, nA || 0);
      if (!cur.NACT) cur.NACT = cur.MONTHS_ACT.length;
    }
    window.VDATA = cur;
    window.BWP_AUTHED = true;
    window.__BWP_SOURCE = 'supabase';
    if (typeof window.__BWP_REMOUNT === 'function') window.__BWP_REMOUNT();
    return true;
  }

  function gate() {
    // Inject animation keyframes + mobile style
    var style = document.createElement('style');
    style.textContent = [
      '@keyframes bwpFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}',
      '@keyframes bwpSpin{to{transform:rotate(360deg)}}',
      '#bwp-login input:focus{border-color:#3b82f6!important;outline:none}',
      '#bwp-login .bwp-btn:hover:not(:disabled){background:#1d4ed8!important}',
      '#bwp-login .bwp-btn:disabled{opacity:.6;cursor:not-allowed}',
    ].join('');
    document.head.appendChild(style);

    var ov = document.createElement('div');
    ov.id = 'bwp-login';
    ov.setAttribute('style', 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#07101f;font-family:system-ui,-apple-system,Segoe UI,sans-serif;padding:16px');

    ov.innerHTML = [
      '<div style="width:400px;max-width:100%;background:linear-gradient(160deg,#141d2e,#0f1929);border:1px solid #1e3052;border-radius:20px;padding:40px 36px;box-shadow:0 24px 80px rgba(0,0,0,.6);animation:bwpFadeIn .4s ease">',
        /* Logo */
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">',
          '<img src="/assets/bwp-logo.svg" width="44" height="44" alt="BWP" style="display:block"/>',
          '<div>',
            '<div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-.02em">BWP <span style="color:#6b7fa3;font-weight:500">Vantage</span></div>',
            '<div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#4a5d7a;margin-top:1px">Sales Intelligence</div>',
          '</div>',
        '</div>',
        /* Title */
        '<div style="font-size:15px;color:#8fa4c0;margin-bottom:24px">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</div>',
        /* Username */
        '<label style="display:block;font-size:12px;font-weight:600;color:#6b7fa3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">ชื่อผู้ใช้</label>',
        '<input id="bwp-user" type="text" placeholder="กรอกชื่อผู้ใช้" autocomplete="username" ',
          'style="width:100%;box-sizing:border-box;background:#0a1525;border:1px solid #1e3052;border-radius:10px;color:#e2e8f0;font-size:14px;padding:11px 14px;margin-bottom:14px;transition:border .2s"/>',
        /* Password */
        '<label style="display:block;font-size:12px;font-weight:600;color:#6b7fa3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">รหัสผ่าน</label>',
        '<div style="position:relative">',
          '<input id="bwp-pass" type="password" placeholder="กรอกรหัสผ่าน" autocomplete="current-password" ',
            'style="width:100%;box-sizing:border-box;background:#0a1525;border:1px solid #1e3052;border-radius:10px;color:#e2e8f0;font-size:14px;padding:11px 40px 11px 14px;transition:border .2s"/>',
          '<button id="bwp-eye" type="button" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#4a5d7a;font-size:16px;padding:0;line-height:1" title="แสดง/ซ่อนรหัสผ่าน">👁</button>',
        '</div>',
        /* Error */
        '<div id="bwp-err" style="color:#f87171;font-size:12.5px;min-height:20px;margin:10px 2px 0"></div>',
        /* Submit */
        '<button id="bwp-go" type="button" class="bwp-btn" ',
          'style="width:100%;margin-top:10px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:600;padding:12px;cursor:pointer;transition:background .2s;display:flex;align-items:center;justify-content:center;gap:8px">',
          '<span id="bwp-btn-txt">เข้าสู่ระบบ</span>',
        '</button>',
        /* Footer */
        '<div style="margin-top:24px;text-align:center;font-size:11px;color:#2e4060">Best World Interplas Co., Ltd. · ข้อมูลภายในองค์กรเท่านั้น</div>',
      '</div>',
    ].join('');

    document.body.appendChild(ov);

    var userInput = ov.querySelector('#bwp-user');
    var passInput = ov.querySelector('#bwp-pass');
    var errEl    = ov.querySelector('#bwp-err');
    var btn      = ov.querySelector('#bwp-go');
    var btnTxt   = ov.querySelector('#bwp-btn-txt');
    var eyeBtn   = ov.querySelector('#bwp-eye');

    userInput.focus();

    // Show/hide password toggle
    eyeBtn.addEventListener('click', function () {
      if (passInput.type === 'password') { passInput.type = 'text'; eyeBtn.textContent = '🙈'; }
      else { passInput.type = 'password'; eyeBtn.textContent = '👁'; }
    });

    // Enter key submits
    [userInput, passInput].forEach(function (el) {
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
    });
    btn.addEventListener('click', doLogin);

    function setLoading(on) {
      btn.disabled = on;
      btnTxt.textContent = on ? 'กำลังตรวจสอบ…' : 'เข้าสู่ระบบ';
    }

    function tryLogin(username, pass, fromStore) {
      setLoading(true);
      errEl.textContent = '';
      window.BWP_DB.getDashboardUser(username, pass).then(function (result) {
        var creds = { username: result.username || username, role: result.role || 'viewer', displayName: result.username || username };
        try { sessionStorage.setItem(CREDS_KEY, JSON.stringify({ username: creds.username, role: creds.role, displayName: creds.displayName })); } catch (e) {}
        window.BWP_USER = { username: creds.username, role: creds.role, displayName: creds.displayName };
        applyPayload(result.payload);
        ov.parentNode && ov.parentNode.removeChild(ov);
      }).catch(function (e) {
        if (fromStore) { try { sessionStorage.removeItem(CREDS_KEY); } catch (_) {} }
        setLoading(false);
        var msg = (e && e.message) || '';
        if ((e && e.status === 400) || /unauthorized/i.test(msg)) {
          errEl.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        } else {
          errEl.textContent = 'เชื่อมต่อไม่สำเร็จ — ลองใหม่อีกครั้ง';
        }
        passInput.select();
      });
    }

    function doLogin() {
      var u = userInput.value.trim();
      var p = passInput.value.trim();
      if (!u) { errEl.textContent = 'กรุณากรอกชื่อผู้ใช้'; userInput.focus(); return; }
      if (!p) { errEl.textContent = 'กรุณากรอกรหัสผ่าน'; passInput.focus(); return; }
      tryLogin(u, p, false);
    }

    // Auto-login from session
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(CREDS_KEY)); } catch (e) {}
    if (saved && saved.username && saved.pass) {
      userInput.value = saved.username;
      tryLogin(saved.username, saved.pass, true);
    }
  }

  function fatal(msg) {
    var d = document.createElement('div');
    d.setAttribute('style', 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#07101f;color:#cbd5e1;font-family:system-ui,sans-serif;text-align:center;padding:24px');
    d.innerHTML = '<div><div style="font-size:16px;font-weight:600;color:#fff">โหลดไม่สำเร็จ</div><div style="font-size:13px;margin-top:8px;color:#94a3b8">' + msg + '</div><button onclick="location.reload()" style="margin-top:16px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:600;padding:10px 18px;cursor:pointer">ลองใหม่</button></div>';
    document.body.appendChild(d);
  }

  var tries = 0;
  function start() {
    if (window.BWP_DB) { gate(); return; }
    if (++tries > 120) { fatal('สคริปต์บางตัวโหลดไม่ครบ — กด Ctrl+Shift+R เพื่อล้างแคช'); return; }
    setTimeout(start, 30);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.BWP_LOGOUT = function () {
    try { sessionStorage.removeItem(CREDS_KEY); } catch (e) {}
    window.BWP_USER = null;
    location.reload();
  };
})();
