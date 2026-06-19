/* BWP Vantage — central computation engine.
   Single source of truth that turns raw monthly sales entries into the full
   VDATA payload the dashboard renders. Used by BOTH the data-entry editor and
   the offline seed script, so the numbers are always derived identically.

   RAW INPUT SHAPE (what an officer types):
   {
     monthly:  { value: [12 · ลบ.], volume: [12 · พัน Kg] },   // ปีปัจจุบัน (2569) · null = ยังไม่กรอก
     products: [ { name, monthlyKg: [12 · Kg] }, ... ],
     customers:[ { name,        monthlyKg: [12 · Kg] }, ... ],
     history:  { "2565": { value:[12], volume:[12] }, ... }    // ข้อมูลย้อนหลังรายปี (ไม่บังคับ)
   }
   Output: a VDATA-shaped object (same keys the screens already read). */
(function (root) {
  // ---- static history (ปี 2568) & constants — do not change month-to-month ----
  var BASE = {
    company: { name: 'บริษัทเบสท์เวิลด์ อินเตอร์พลาส จำกัด', en: 'BEST WORLD INTERPLAS CO., LTD.', abbr: 'BWP' },
    TH_MONTHS: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    YEARS: [2568, 2569],
    value68: [34.7, 36.8, 45.3, 38.1, 40.5, 35.3, 36.5, 31.9, 33.8, 29.9, 30.4, 35.7],
    volume68: [490, 538.5, 656.1, 571.8, 609.1, 518.1, 598.5, 537.8, 569.5, 516.6, 508.4, 595.3],
    price68: [70.8, 68.3, 69, 66.6, 66.5]
  };

  function num(x) { var n = parseFloat(x); return isFinite(n) ? n : 0; }
  function r2(x) { return Math.round(x * 100) / 100; }
  function sum(a) { return a.reduce(function (s, x) { return s + (x || 0); }, 0); }

  // number of months actually entered (value present & > 0, contiguous from month 0)
  function activeMonths(mv) {
    var n = 0;
    for (var i = 0; i < 12; i++) { if (mv[i] != null && mv[i] !== '' && num(mv[i]) > 0) n = i + 1; else break; }
    return n;
  }

  function compute(raw) {
    raw = raw || {};
    var mVal = (raw.monthly && raw.monthly.value || []).slice(0, 12);
    var mVol = (raw.monthly && raw.monthly.volume || []).slice(0, 12);
    while (mVal.length < 12) mVal.push(null);
    while (mVol.length < 12) mVol.push(null);

    var NACT = activeMonths(mVal) || 0;
    if (NACT === 0) NACT = activeMonths(mVol);
    var MONTHS_ACT = BASE.TH_MONTHS.slice(0, NACT);

    // ---- monthly arrays (ลบ. / พัน Kg) ----
    var val69 = mVal.map(function (v) { return v == null || v === '' ? null : r2(num(v)); });
    var vol69 = mVol.map(function (v) { return v == null || v === '' ? null : r2(num(v)); });

    var targets = ((raw.targets || [])).slice(0, 12).map(function(v){ return v == null ? null : num(v); });
    while (targets.length < 12) targets.push(null);
    var targetsKg = ((raw.targetsKg || [])).slice(0, 12).map(function(v){ return v == null ? null : num(v); });
    while (targetsKg.length < 12) targetsKg.push(null);

    // price per month ฿/Kg  = value(บาท) / volume(Kg) = value / (vol(พัน Kg) * 1000)
    var price69 = [];
    for (var m = 0; m < NACT; m++) {
      var vv = num(val69[m]), kk = num(vol69[m]);
      price69.push(kk > 0 ? r2(vv / (kk * 1000)) : 0);  // บาท / (พัน Kg × 1000) = ฿/Kg
    }

    var totalValueBaht = 0, totalVolKKg = 0; // บาท / พัน Kg
    for (var i = 0; i < NACT; i++) { totalValueBaht += num(val69[i]); totalVolKKg += num(vol69[i]); }
    var totalValueLbn = totalValueBaht / 1e6;
    var totalVolKg = totalVolKKg * 1000;
    var avgPrice = totalVolKg > 0 ? r2(totalValueBaht / totalVolKg) : 0;

    var totalTarget = 0, hasTarget = false;
    for (var ti = 0; ti < NACT; ti++) { if (targets[ti] != null) { totalTarget += targets[ti]; hasTarget = true; } }
    var totalTargetKg = 0, hasTargetKg = false;
    for (var ti2 = 0; ti2 < NACT; ti2++) { if (targetsKg[ti2] != null) { totalTargetKg += targetsKg[ti2]; hasTargetKg = true; } }
    // respect the mode chosen in the editor; fall back to whichever target exists
    var _tgtMode = raw.targetMode === 'kg' ? 'kg' : 'value';
    var achievementPct;
    if (_tgtMode === 'kg') {
      achievementPct = (hasTargetKg && totalTargetKg > 0) ? r2(totalVolKg / totalTargetKg * 100)
        : (hasTarget && totalTarget > 0) ? r2(totalValueBaht / totalTarget * 100) : null;
    } else {
      achievementPct = (hasTarget && totalTarget > 0) ? r2(totalValueBaht / totalTarget * 100)
        : (hasTargetKg && totalTargetKg > 0) ? r2(totalVolKg / totalTargetKg * 100) : null;
    }

    // ---- products ----
    var _prodByName = {};
    (raw.products || []).forEach(function (p) {
      var mk = (p.monthlyKg || []).slice(0, 12).map(num);
      while (mk.length < 12) mk.push(0);
      var key = (p.name || '').trim();
      if (!_prodByName[key]) { _prodByName[key] = { name: p.name, monthlyKg: mk }; }
      else { var t = _prodByName[key].monthlyKg; for (var z = 0; z < 12; z++) t[z] += mk[z]; }
    });
    var rprods = Object.keys(_prodByName).map(function (k) { return _prodByName[k]; });
    // monthly sum of product kg (for proportional value allocation)
    var SK = [];
    for (var mm = 0; mm < NACT; mm++) { var s = 0; rprods.forEach(function (p) { s += p.monthlyKg[mm]; }); SK.push(s); }
    var totalProdKg = rprods.reduce(function (s, p) { return s + sum(p.monthlyKg.slice(0, NACT)); }, 0);

    var PRODUCTS = rprods.map(function (p, idx) {
      // monthlyVal/val are stored in ลบ. (the dashboard bundle multiplies by 1e6
      // when displaying baht). priceMonthly/avgPrice stay in ฿/Kg (computed from baht).
      var monthlyVal = [], priceMonthly = [], valTotBaht = 0;
      for (var mo = 0; mo < NACT; mo++) {
        var kg = p.monthlyKg[mo];
        var vBaht = SK[mo] > 0 ? num(val69[mo]) * (kg / SK[mo]) : 0;  // บาท
        valTotBaht += vBaht;
        monthlyVal.push(vBaht / 1e6);  // → ลบ. (full precision)
        priceMonthly.push(kg > 0 ? r2(vBaht / kg) : 0);  // ฿/Kg
      }
      var kgTot = sum(p.monthlyKg.slice(0, NACT));
      var valTot = sum(monthlyVal);
      return {
        id: 'p' + (idx + 1), name: p.name,
        val: r2(valTot), kg: Math.round(kgTot),
        avgPrice: kgTot > 0 ? r2(valTotBaht / kgTot) : 0,
        share: totalProdKg > 0 ? r2(kgTot / totalProdKg * 100) : null,
        monthly: monthlyVal, priceMonthly: priceMonthly
      };
    }).sort(function (a, b) { return b.val - a.val; });
    var nProducts = PRODUCTS.filter(function (p) { return p.kg > 0; }).length;

    // ---- customers ----
    var _custByName = {};
    (raw.customers || []).forEach(function (c) {
      // Accept both shapes: monthlyKg[12] (legacy/compute output) or
      // monthlyProd[12] = [{p0..p4, value}, ...] (data-editor native format).
      var mk;
      if (c.monthlyKg) {
        mk = c.monthlyKg.slice(0, 12).map(num);
      } else if (c.monthlyProd) {
        mk = c.monthlyProd.slice(0, 12).map(function (mp) {
          if (!mp || typeof mp !== 'object') return 0;
          var s = 0;
          Object.keys(mp).forEach(function (k) { if (k !== 'value') s += num(mp[k]); });
          return s;
        });
      } else {
        mk = [];
      }
      while (mk.length < 12) mk.push(0);
      var key = (c.name || '').trim();
      if (!_custByName[key]) { _custByName[key] = { name: c.name, monthlyKg: mk }; }
      else { var t = _custByName[key].monthlyKg; for (var z = 0; z < 12; z++) t[z] += mk[z]; }
    });
    var rcust = Object.keys(_custByName).map(function (k) { return _custByName[k]; });
    var totalCustKg = rcust.reduce(function (s, c) { return s + sum(c.monthlyKg.slice(0, NACT)); }, 0);
    var allCustomers = rcust.map(function (c) {
      var kgTot = sum(c.monthlyKg.slice(0, NACT));
      var last = NACT >= 1 ? c.monthlyKg[NACT - 1] : 0;
      var prev = NACT >= 2 ? c.monthlyKg[NACT - 2] : 0;
      var mom = prev > 0 ? r2((last / prev - 1) * 100) : (last > 0 ? 0 : 0);
      return { name: c.name, kg: Math.round(kgTot), share: totalCustKg > 0 ? r2(kgTot / totalCustKg * 100) : null, monthly: c.monthlyKg.slice(0, NACT), mom: mom };
    }).filter(function (c) { return c.kg > 0; })
      .sort(function (a, b) { return b.kg - a.kg; });
    var nCustomers = allCustomers.length;
    var CUSTOMERS = allCustomers.slice(0, 10).map(function (c, i) { return Object.assign({ id: 'c' + (i + 1) }, c); });

    // contribution (Pareto) top3 / top5 share
    var cum = 0, top3 = 0, top5 = 0;
    allCustomers.forEach(function (c, i) { cum += c.share; if (i === 2) top3 = r2(cum); if (i === 4) top5 = r2(cum); });
    if (allCustomers.length < 3) top3 = r2(cum);
    if (allCustomers.length < 5) top5 = r2(cum);

    // ---- KPIs (with MoM & YoY) ----
    function momPct(arr) { return NACT >= 2 && num(arr[NACT - 2]) ? r2((num(arr[NACT - 1]) / num(arr[NACT - 2]) - 1) * 100) : 0; }
    var v68p = sum(BASE.value68.slice(0, NACT)), vol68p = sum(BASE.volume68.slice(0, NACT));
    var yoyVal = v68p ? r2((totalValueLbn / v68p - 1) * 100) : 0;
    var yoyKg = vol68p ? r2((totalVolKKg / vol68p - 1) * 100) : 0;
    var price68avg = vol68p ? (v68p * 1e6) / (vol68p * 1000) : 0;
    var yoyPrice = price68avg ? r2((avgPrice / price68avg - 1) * 100) : 0;

    var KPIS = [
      { id: 'value', label: 'มูลค่าขายรวม', value: totalValueBaht.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}), unit: 'บาท', delta: momPct(val69), yoy: yoyVal, accent: true, spark: val69.slice(0, NACT), color: 'var(--accent)' },
      { id: 'volume', label: 'ปริมาณขายรวม', value: totalVolKg.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}), unit: 'Kg', delta: momPct(vol69), yoy: yoyKg, spark: vol69.slice(0, NACT), color: 'var(--viz-2)' },
      { id: 'price', label: 'ราคาเฉลี่ย/Kg', value: avgPrice.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}), unit: '฿/Kg', delta: momPct(price69), yoy: yoyPrice, spark: price69.slice(0, NACT), color: 'var(--viz-3)' },
      { id: 'customers', label: 'จำนวนลูกค้า', value: String(nCustomers), unit: 'ราย', delta: 0, yoy: 0, spark: monthlyCustCounts(rcust, NACT), color: 'var(--viz-4)' },
      { id: 'products', label: 'จำนวนผลิตภัณฑ์', value: String(nProducts), unit: 'ประเภท', delta: 0, yoy: 0, spark: new Array(NACT).fill(nProducts), color: 'var(--viz-5)' },
      { id: 'target', label: 'Achievement', value: achievementPct != null ? achievementPct.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}) : '—', unit: achievementPct != null ? '%' : 'ไม่มีเป้า', delta: 0, yoy: 0, spark: [], color: 'var(--viz-6,#a78bfa)' }
    ];

    // ---- forecast: project remaining months at average of actuals ----
    var avgMonthVal = NACT ? totalValueLbn / NACT : 0;
    var avgMonthKg = NACT ? totalVolKKg / NACT : 0;
    var projVal = [];
    for (var f = 0; f < 12; f++) projVal.push(f < NACT ? r2(num(val69[f]) / 1e6) : r2(avgMonthVal));
    var yearEndVal = Math.round(sum(projVal));
    var yearEndKg = r2((totalVolKKg + avgMonthKg * (12 - NACT)) / 1000);

    // ---- multi-year series (history years 2565–2568 are optional & editable) ----
    var hist = raw.history || {};
    var valueByYear = {}, volumeByYear = {};
    // hist[y].value is stored in บาท (from customer entry); valueByYear must be in ลบ. (viewFor ×1e6 → บาท)
    function histValLbn(y, fallback) {
      var hv = hist[y] && hist[y].value;
      if (hv && hv.some(function(v){ return v != null && v > 0; })) {
        return padTo12(hv.map(function(v){ return v == null ? null : num(v) / 1e6; }));
      }
      return padTo12(fallback || []);
    }
    valueByYear['2568'] = histValLbn('2568', BASE.value68);
    volumeByYear['2568'] = padTo12((hist['2568'] && hist['2568'].volume) || BASE.volume68);
    var val69Lbn = val69.map(function (v) { return v == null ? null : num(v) / 1e6; });
    valueByYear['2569'] = padTo12(val69Lbn);
    volumeByYear['2569'] = padTo12(vol69);
    Object.keys(hist).forEach(function (y) {
      if (y === '2568' || y === '2569') return;
      valueByYear[y] = histValLbn(y);
      volumeByYear[y] = padTo12((hist[y] && hist[y].volume) || []);
    });
    // YEARS = every year with ≥1 actual value, plus 2568/2569 always
    var yset = {};
    Object.keys(valueByYear).forEach(function (y) {
      var has = (valueByYear[y] || []).some(function (v) { return v != null && num(v) > 0; });
      if (has || y === '2568' || y === '2569') yset[y] = true;
    });
    var YEARS = Object.keys(yset).map(Number).sort(function (a, b) { return a - b; });

    var out = {
      company: BASE.company,
      TH_MONTHS: BASE.TH_MONTHS,
      MONTHS_ACT: MONTHS_ACT,
      NACT: NACT,
      YEARS: YEARS,
      valueByYear: valueByYear,
      volumeByYear: volumeByYear,
      price68: BASE.price68,
      price69: price69,
      PRODUCTS: PRODUCTS,
      CUSTOMERS: CUSTOMERS,
      allCustomers: allCustomers,
      custTotalKg: Math.round(totalCustKg),
      nCustomers: nCustomers,
      nSizes: nProducts,
      KPIS: KPIS,
      totals: {
        value: Math.round(totalValueBaht), volume: Math.round(totalVolKg), avgPrice: avgPrice,
        yoyKg: yoyKg, yoyVal: yoyVal, momKg: momPct(vol69), momVal: momPct(val69),
        top3: top3, top5: top5
      },
      forecast: { yearEndVal: yearEndVal, yearEndKg: yearEndKg, projVal: projVal, actualMonths: NACT, confidence: Math.min(95, Math.round(50 + NACT * 8)) },
      targets: targets,
      targetsKg: targetsKg,
      achievementPct: achievementPct,
      _raw: { monthly: { value: val69, volume: vol69 }, products: rprods, customers: rcust, history: hist }
    };
    return out;
  }

  function monthlyCustCounts(rcust, NACT) {
    var out = [];
    for (var m = 0; m < NACT; m++) { var c = 0; rcust.forEach(function (x) { if (num(x.monthlyKg[m]) > 0) c++; }); out.push(c); }
    return out;
  }
  function padTo12(a) { var b = a.slice(0, 12); while (b.length < 12) b.push(null); return b; }

  var api = { compute: compute, BASE: BASE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.BWP_compute = compute;
})(typeof window !== 'undefined' ? window : null);
