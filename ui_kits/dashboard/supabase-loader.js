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
        // last month carrying a figure — counting non-null entries undercounts
        // whenever a month in the middle was left blank
        var v69 = cur.volumeByYear['2569'];
        nA = 0;
        for (var i = 0; i < v69.length && i < 12; i++) { if (v69[i] != null && +v69[i] > 0) nA = i + 1; }
      }
      cur.MONTHS_ACT = cur.TH_MONTHS.slice(0, nA || 0);
      if (!cur.NACT) cur.NACT = cur.MONTHS_ACT.length;
    }
    // recompute from _raw if available so KPIs always reflect latest formula
    if (cur._raw && typeof window.BWP_compute === 'function') {
      try {
        var recomputed = window.BWP_compute(cur._raw);
        Object.assign(cur, recomputed);
      } catch (e) {}
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
        /* Mode toggle: แอดมิน (ล็อกอิน) | ผู้บริหาร (PIN ดูอย่างเดียว) */
        '<div style="display:flex;gap:6px;background:#0a1525;border:1px solid #1e3052;border-radius:10px;padding:4px;margin-bottom:20px">',
          '<button id="bwp-mode-admin" type="button" style="flex:1;border:none;border-radius:7px;padding:9px;font-size:13px;font-weight:600;cursor:pointer;background:#2563eb;color:#fff;transition:background .2s">แอดมิน</button>',
          '<button id="bwp-mode-exec" type="button" style="flex:1;border:none;border-radius:7px;padding:9px;font-size:13px;font-weight:600;cursor:pointer;background:transparent;color:#8fa4c0;transition:background .2s">ผู้บริหาร</button>',
        '</div>',
        /* Title */
        '<div id="bwp-subtitle" style="font-size:15px;color:#8fa4c0;margin-bottom:24px">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</div>',
        /* Admin block (username + password) */
        '<div id="bwp-admin-block">',
          '<label style="display:block;font-size:12px;font-weight:600;color:#6b7fa3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">ชื่อผู้ใช้</label>',
          '<input id="bwp-user" type="text" placeholder="กรอกชื่อผู้ใช้" autocomplete="username" ',
            'style="width:100%;box-sizing:border-box;background:#0a1525;border:1px solid #1e3052;border-radius:10px;color:#e2e8f0;font-size:14px;padding:11px 14px;margin-bottom:14px;transition:border .2s"/>',
          '<label style="display:block;font-size:12px;font-weight:600;color:#6b7fa3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">รหัสผ่าน</label>',
          '<div style="position:relative">',
            '<input id="bwp-pass" type="password" placeholder="กรอกรหัสผ่าน" autocomplete="current-password" ',
              'style="width:100%;box-sizing:border-box;background:#0a1525;border:1px solid #1e3052;border-radius:10px;color:#e2e8f0;font-size:14px;padding:11px 40px 11px 14px;transition:border .2s"/>',
            '<button id="bwp-eye" type="button" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#4a5d7a;font-size:16px;padding:0;line-height:1" title="แสดง/ซ่อนรหัสผ่าน">👁</button>',
          '</div>',
        '</div>',
        /* Executive block (PIN only, read-only access) */
        '<div id="bwp-exec-block" style="display:none">',
          '<label style="display:block;font-size:12px;font-weight:600;color:#6b7fa3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">รหัส PIN สำหรับผู้บริหาร</label>',
          '<input id="bwp-pin" type="password" inputmode="numeric" placeholder="กรอก PIN" autocomplete="off" ',
            'style="width:100%;box-sizing:border-box;background:#0a1525;border:1px solid #1e3052;border-radius:10px;color:#e2e8f0;font-size:18px;letter-spacing:.3em;text-align:center;padding:12px 14px;transition:border .2s"/>',
          '<div style="font-size:11.5px;color:#4a5d7a;margin-top:10px;line-height:1.5">เข้าดูข้อมูลทั้งหมดได้แบบอ่านอย่างเดียว · ไม่สามารถแก้ไขข้อมูลได้</div>',
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
    var pinInput  = ov.querySelector('#bwp-pin');
    var errEl    = ov.querySelector('#bwp-err');
    var btn      = ov.querySelector('#bwp-go');
    var btnTxt   = ov.querySelector('#bwp-btn-txt');
    var eyeBtn   = ov.querySelector('#bwp-eye');
    var adminBlock = ov.querySelector('#bwp-admin-block');
    var execBlock  = ov.querySelector('#bwp-exec-block');
    var subtitle   = ov.querySelector('#bwp-subtitle');
    var modeAdminBtn = ov.querySelector('#bwp-mode-admin');
    var modeExecBtn  = ov.querySelector('#bwp-mode-exec');

    var mode = 'admin'; // 'admin' | 'exec'

    userInput.focus();

    function setMode(m) {
      mode = m;
      errEl.textContent = '';
      var isExec = m === 'exec';
      adminBlock.style.display = isExec ? 'none' : '';
      execBlock.style.display = isExec ? '' : 'none';
      subtitle.textContent = isExec ? 'สำหรับผู้บริหาร — ดูข้อมูลอย่างเดียว' : 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ';
      btnTxt.textContent = isExec ? 'เข้าดูข้อมูล' : 'เข้าสู่ระบบ';
      modeAdminBtn.style.background = isExec ? 'transparent' : '#2563eb';
      modeAdminBtn.style.color = isExec ? '#8fa4c0' : '#fff';
      modeExecBtn.style.background = isExec ? '#2563eb' : 'transparent';
      modeExecBtn.style.color = isExec ? '#fff' : '#8fa4c0';
      setTimeout(function () { (isExec ? pinInput : userInput).focus(); }, 0);
    }
    modeAdminBtn.addEventListener('click', function () { setMode('admin'); });
    modeExecBtn.addEventListener('click', function () { setMode('exec'); });

    // Show/hide password toggle
    eyeBtn.addEventListener('click', function () {
      if (passInput.type === 'password') { passInput.type = 'text'; eyeBtn.textContent = '🙈'; }
      else { passInput.type = 'password'; eyeBtn.textContent = '👁'; }
    });

    // Enter key submits
    [userInput, passInput, pinInput].forEach(function (el) {
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
    });
    btn.addEventListener('click', doLogin);

    function setLoading(on) {
      btn.disabled = on;
      btnTxt.textContent = on ? 'กำลังตรวจสอบ…' : (mode === 'exec' ? 'เข้าดูข้อมูล' : 'เข้าสู่ระบบ');
    }

    // Executive PIN flow — read-only RPC that no write path accepts.
    // The PIN is never persisted: it lives only in this closure for the request.
    function tryPin(pin) {
      setLoading(true);
      errEl.textContent = '';
      window.BWP_DB.getDashboardRo(pin).then(function (payload) {
        window.BWP_USER = { username: 'ผู้บริหาร', role: 'executive', displayName: 'ผู้บริหาร', readOnly: true };
        applyPayload(payload);
        ov.parentNode && ov.parentNode.removeChild(ov);
      }).catch(function (e) {
        setLoading(false);
        var msg = (e && e.message) || '';
        if (/ro_not_configured/i.test(msg)) {
          errEl.textContent = 'ยังไม่ได้ตั้ง PIN ผู้บริหาร — ให้แอดมินตั้งที่หน้าแก้ไขข้อมูล (ปุ่ม 🔑)';
        } else if ((e && e.status === 400) || /unauthorized/i.test(msg)) {
          errEl.textContent = 'PIN ไม่ถูกต้อง';
        } else {
          errEl.textContent = 'เชื่อมต่อไม่สำเร็จ — ลองใหม่อีกครั้ง';
        }
        pinInput.select();
      });
    }

    // Admin login issues a session token; the data editor and customer database
    // then open without asking again. The password itself is never stored.
    function tryLogin(username, pass) {
      setLoading(true);
      errEl.textContent = '';
      window.BWP_DB.loginSession(username, pass).then(function (result) {
        window.BWP_SESSION.save(result);
        enter(result);
      }).catch(function (e) {
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

    function enter(result) {
      window.BWP_USER = {
        username: result.username,
        role: result.role || 'viewer',
        displayName: result.username,
        readOnly: !result.canWrite,
      };
      try { sessionStorage.setItem(CREDS_KEY, JSON.stringify({ mode: 'admin', username: result.username })); } catch (e) {}
      applyPayload(result.payload);
      ov.parentNode && ov.parentNode.removeChild(ov);
    }

    // Resume an existing session without a password prompt (e.g. coming back
    // from the data editor). An invalid or expired token just leaves the gate up.
    function tryResume() {
      var tok = window.BWP_SESSION.token();
      if (!tok) return false;
      var stored = window.BWP_SESSION.get() || {};
      setLoading(true);
      window.BWP_DB.getDashboardS(tok).then(function (payload) {
        enter({ username: stored.username, role: stored.role, canWrite: stored.canWrite, payload: payload });
      }).catch(function () {
        window.BWP_SESSION.clear();
        setLoading(false);
      });
      return true;
    }

    function doLogin() {
      if (mode === 'exec') {
        var pin = pinInput.value.trim();
        if (!pin) { errEl.textContent = 'กรุณากรอก PIN'; pinInput.focus(); return; }
        try { sessionStorage.setItem(CREDS_KEY, JSON.stringify({ mode: 'exec' })); } catch (e) {}
        tryPin(pin);
        return;
      }
      var u = userInput.value.trim();
      var p = passInput.value.trim();
      if (!u) { errEl.textContent = 'กรุณากรอกชื่อผู้ใช้'; userInput.focus(); return; }
      if (!p) { errEl.textContent = 'กรุณากรอกรหัสผ่าน'; passInput.focus(); return; }
      tryLogin(u, p);
    }

    // Resume: only the non-secret parts (username / last mode) are remembered.
    // No password or PIN is ever written to storage, so a shared or stolen
    // browser session cannot be replayed into the dashboard.
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(CREDS_KEY)); } catch (e) {}
    if (saved && saved.pin) { try { sessionStorage.removeItem(CREDS_KEY); } catch (_) {} saved = null; }  // ล้างของเก่าที่เคยเก็บ PIN ไว้
    if (saved && saved.mode === 'exec') setMode('exec');
    else if (saved && saved.username) userInput.value = saved.username;
    tryResume();   // มี session อยู่แล้ว → เข้าเลย ไม่ต้องถามรหัสซ้ำ
  }

  function fatal(msg) {
    var d = document.createElement('div');
    d.setAttribute('style', 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#07101f;color:#cbd5e1;font-family:system-ui,sans-serif;text-align:center;padding:24px');
    var wrap = document.createElement('div');
    var title = document.createElement('div');
    title.setAttribute('style', 'font-size:16px;font-weight:600;color:#fff');
    title.textContent = 'โหลดไม่สำเร็จ';
    var detail = document.createElement('div');
    detail.setAttribute('style', 'font-size:13px;margin-top:8px;color:#94a3b8');
    detail.textContent = msg;
    var btn = document.createElement('button');
    btn.setAttribute('style', 'margin-top:16px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:600;padding:10px 18px;cursor:pointer');
    btn.textContent = 'ลองใหม่';
    btn.onclick = function () { location.reload(); };
    wrap.appendChild(title); wrap.appendChild(detail); wrap.appendChild(btn);
    d.appendChild(wrap);
    document.body.appendChild(d);
  }

  var tries = 0;
  function start() {
    if (window.BWP_DB) { gate(); return; }
    if (++tries > 120) { fatal('สคริปต์บางตัวโหลดไม่ครบ — กด Ctrl+Shift+R เพื่อล้างแคช'); return; }
    setTimeout(start, 30);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // ---- ปุ่ม "ส่งออก" ----
  // The button ships inside the compiled bundle with no handler, so it is wired
  // here by delegation: that survives every remount without touching the bundle.
  function csvEscape(cell) {
    var s = cell == null ? '' : String(cell);
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  window.BWP_EXPORT_CSV = function () {
    var D = window.VDATA || {};
    var M = D.MONTHS_ACT || [];
    var v = (D.valueByYear && D.valueByYear['2569']) || [];
    var k = (D.volumeByYear && D.volumeByYear['2569']) || [];
    var rows = [];
    rows.push(['BWP Vantage — สรุปยอดขาย 2569']);
    rows.push(['ส่งออกเมื่อ', new Date().toLocaleString('th-TH')]);
    rows.push([]);
    rows.push(['สรุปรายเดือน']);
    rows.push(['เดือน', 'มูลค่า (บาท)', 'ปริมาณ (Kg)', 'ราคาเฉลี่ย (฿/Kg)']);
    for (var i = 0; i < M.length; i++) {
      rows.push([M[i], v[i] == null ? '' : v[i], k[i] == null ? '' : k[i] * 1000, (D.price69 && D.price69[i]) || '']);
    }
    rows.push([]);
    rows.push(['ยอดตามสินค้า']);
    rows.push(['สินค้า', 'ปริมาณ (Kg)', 'มูลค่า (บาท)', 'ราคาเฉลี่ย (฿/Kg)', 'ส่วนแบ่ง (%)']);
    (D.PRODUCTS || []).forEach(function (p) { rows.push([p.name, p.kg, p.val, p.avgPrice, p.share]); });
    rows.push([]);
    rows.push(['ยอดตามลูกค้า']);
    rows.push(['อันดับ', 'ลูกค้า', 'ปริมาณ (Kg)', 'ส่วนแบ่ง (%)', 'MoM (%)']);
    (D.allCustomers || []).forEach(function (c, i) { rows.push([i + 1, c.name, c.kg, c.share, c.mom]); });

    var csv = rows.map(function (r) { return r.map(csvEscape).join(','); }).join('\r\n');
    // BOM so Excel opens Thai text in UTF-8 instead of mojibake
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'BWP_dashboard_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  };
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest('button');
    if (!el || (el.textContent || '').trim() !== 'ส่งออก') return;
    if (!window.BWP_AUTHED) return;
    e.preventDefault();
    window.BWP_EXPORT_CSV();
  });

  window.BWP_LOGOUT = function () {
    var tok = window.BWP_SESSION && window.BWP_SESSION.token();
    var done = function () {
      try { sessionStorage.removeItem(CREDS_KEY); } catch (e) {}
      window.BWP_SESSION && window.BWP_SESSION.clear();
      window.BWP_USER = null;
      location.reload();
    };
    // revoke server-side too, so the token is dead even if a copy leaked
    if (tok && window.BWP_DB.logoutSession) window.BWP_DB.logoutSession(tok).then(done, done);
    else done();
  };
})();
