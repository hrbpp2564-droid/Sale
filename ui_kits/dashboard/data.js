/* BWP Vantage — EMPTY skeleton only.
   No real sales figures live in any static file. The real dashboard data is
   stored in Supabase and is released ONLY after a correct password via the
   gatekeeper RPC (see supabase-loader.js). This skeleton just lets the app
   boot to the login screen without errors. */
window.VDATA = {
  company: { name: "", en: "", abbr: "BWP" },
  TH_MONTHS: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
  MONTHS_ACT: [], NACT: 0, YEARS: [2568, 2569],
  valueByYear: { "2568": [], "2569": [] }, volumeByYear: { "2568": [], "2569": [] },
  price68: [], price69: [], PRODUCTS: [], CUSTOMERS: [], allCustomers: [],
  custTotalKg: 0, nCustomers: 0, nSizes: 0, KPIS: [],
  totals: { value: 0, volume: 0, avgPrice: 0, yoyKg: 0, yoyVal: 0, momKg: 0, momVal: 0, top3: 0, top5: 0 },
  forecast: { yearEndVal: 0, yearEndKg: 0, projVal: [], actualMonths: 0, confidence: 0 }
};
window.VDATA.sum = function (a) { return a.reduce(function (s, x) { return s + (x || 0); }, 0); };
