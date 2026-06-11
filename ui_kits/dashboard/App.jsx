/* Vantage dashboard app root → renders into #root.
   Load-order resilient: references shell/screen globals lazily and waits for
   all dependencies before mounting, so it works regardless of script order
   (e.g. when inlined/bundled into a single file). */
(function () {
  const SCREENS = {
    overview: { title: 'ภาพรวมผู้บริหาร', subtitle: 'Executive Sales Overview', comp: () => window.OverviewScreen, withProps: true },
    sales: { title: 'Sales Overview', subtitle: 'ยอดขายรวมต่อเดือน · เทียบ 2568', comp: () => window.SalesScreen },
    product: { title: 'Product Analysis', subtitle: 'วิเคราะห์สินค้าทั้งหมด', comp: () => window.ProductScreen },
    customer: { title: 'Customer Analysis', subtitle: 'วิเคราะห์ลูกค้าทั้งหมด', comp: () => window.CustomerScreen },
    contribution: { title: 'Customer Contribution', subtitle: 'Pareto Analysis · ความเสี่ยงการพึ่งพา', comp: () => window.ContributionScreen },
    mix: { title: 'Product Mix', subtitle: 'สัดส่วนยอดขายแต่ละสินค้า', comp: () => window.MixScreen },
    price: { title: 'Price Analysis', subtitle: 'Average Selling Price', comp: () => window.PriceScreen },
    year: { title: 'Year Comparison', subtitle: 'เปรียบเทียบ 2568 vs 2569 · YoY', comp: () => window.YearScreen },
    forecast: { title: 'Forecast', subtitle: 'AI Forecasting · คาดการณ์สิ้นปี', comp: () => window.ForecastScreen },
  };

  function App() {
    const Sidebar = window.Sidebar, TopBar = window.TopBar, FilterBar = window.FilterBar;
    const [active, setActive] = React.useState(() => localStorage.getItem('vantage.screen') || 'overview');
    const [theme, setTheme] = React.useState(() => localStorage.getItem('vantage.theme') || 'dark');
    const [collapsed, setCollapsed] = React.useState(false);
    const [filters, setFilters] = React.useState({ year: '2569', month: 'all', customerGroup: 'all', productGroup: 'all', granularity: 'month' });
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('vantage.theme', theme);
    }, [theme]);

    const nav = (id) => { setActive(id); localStorage.setItem('vantage.screen', id); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
    const screen = SCREENS[active] || SCREENS.overview;
    const ScreenComp = screen.comp();

    // Defensive: never hand React an undefined element type (keeps console clean even
    // if a dependency is momentarily missing during a hot-reload re-evaluation).
    if (!Sidebar || !TopBar || !FilterBar || !ScreenComp) return null;

    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
        <Sidebar active={active} onNav={nav} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          <TopBar title={screen.title} subtitle={screen.subtitle} theme={theme} onTheme={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')} />
          <FilterBar filters={filters} setFilters={setFilters} />
          <main ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '22px', scrollBehavior: 'smooth' }}>
            <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
              {screen.withProps ? <ScreenComp onDrill={nav} /> : <ScreenComp />}
              <div style={{ height: 24 }} />
              <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 2px', borderTop: '1px solid var(--border-subtle)', fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
                <span>BWP · Best World Interplas — ข้อมูลจริง ม.ค.–พ.ค. 2569 (เทียบ 2568)</span>
                <span>ที่มา: ยอดขาย 69.xlsx</span>
              </footer>
            </div>
          </main>
        </div>
      </div>
    );
  }
  window.VantageApp = App;

  // Mount once, only after every dependency global is ready (load-order safe).
  function ready() {
    return window.VDATA && window.VantageSalesIntelligenceDesignSystem_a75d0a && window.Icon &&
      window.Sidebar && window.TopBar && window.FilterBar &&
      window.OverviewScreen && window.SalesScreen && window.ProductScreen && window.CustomerScreen &&
      window.ContributionScreen && window.MixScreen && window.PriceScreen && window.YearScreen && window.ForecastScreen;
  }
  function mount() {
    if (!ready()) { return setTimeout(mount, 25); }
    const el = document.getElementById('root');
    if (!el) { return setTimeout(mount, 25); }
    if (!el.__vroot) el.__vroot = ReactDOM.createRoot(el);
    el.__vroot.render(<App />);
  }
  window.__BWP_REMOUNT = mount;   // Supabase loader calls this after refreshing window.VDATA
  mount();
})();
