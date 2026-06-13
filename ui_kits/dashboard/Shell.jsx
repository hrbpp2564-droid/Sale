/* Vantage app shell: Sidebar, TopBar, FilterBar, Layout. → window.{Sidebar,TopBar,FilterBar,AppShell} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { IconButton, Button, Select, Badge, SegmentedControl } = NS;
  const Icon = window.Icon;

  const NAV = [
    { id: 'overview', label: 'ภาพรวมผู้บริหาร', icon: 'layout-dashboard' },
    { id: 'sales', label: 'Sales Overview', icon: 'line-chart' },
    { id: 'product', label: 'Product Analysis', icon: 'package' },
    { id: 'customer', label: 'Customer Analysis', icon: 'users' },
    { id: 'contribution', label: 'Customer Contribution', icon: 'bar-chart-2' },
    { id: 'mix', label: 'Product Mix', icon: 'pie-chart' },
    { id: 'price', label: 'Price Analysis', icon: 'dollar-sign' },
    { id: 'year', label: 'Year Comparison', icon: 'calendar' },
    { id: 'forecast', label: 'Forecast', icon: 'sparkles' },
  ];
  window.VANTAGE_NAV = NAV;

  function Logo({ collapsed }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 'var(--topbar-h)', padding: collapsed ? '0' : '0 18px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <svg width="30" height="30" viewBox="0 0 48 48" fill="none" style={{ flex: '0 0 auto' }}>
          <rect width="48" height="48" rx="11" fill="#1f6feb"/>
          <path d="M12 31.5L20 22.5L26.5 29L36 16.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="36" cy="16.5" r="3" fill="white"/>
          <path d="M12 36.5H36" stroke="white" strokeOpacity="0.45" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
        {!collapsed && (
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>BWP <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Vantage</span></div>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Best World Interplas</div>
          </div>
        )}
      </div>
    );
  }

  function Sidebar({ active, onNav, collapsed, onToggle }) {
    const [hovered, setHovered] = React.useState(null);
    return (
      <aside style={{
        position: 'sticky', top: 0, height: '100vh', flex: `0 0 ${collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'}`,
        width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
        background: 'var(--bg-base)', borderRight: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column', transition: 'width var(--dur-base) var(--ease-standard)', zIndex: 20,
      }}>
        <Logo collapsed={collapsed} />
        <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map((n) => {
            const on = n.id === active;
            const hot = !on && hovered === n.id;
            return (
              <button key={n.id} onClick={() => onNav(n.id)} title={collapsed ? n.label : undefined}
                onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                  padding: collapsed ? '10px 0' : '9px 11px', justifyContent: collapsed ? 'center' : 'flex-start',
                  border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
                  background: on ? 'var(--accent-subtle)' : hot ? 'var(--surface-2)' : 'transparent',
                  color: on ? 'var(--accent-hover)' : hot ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: on ? 600 : 500,
                  transition: 'color var(--dur-fast)', position: 'relative',
                }}>
                {on && !collapsed && <span style={{ position: 'absolute', left: -10, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--accent)' }} />}
                <Icon name={n.icon} size={17} />
                {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 10, borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onToggle} title="ย่อ/ขยายเมนู"
            style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', padding: collapsed ? '9px 0' : '9px 11px', justifyContent: collapsed ? 'center' : 'flex-start', border: 'none', background: 'transparent', color: 'var(--text-tertiary)', cursor: 'pointer', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)' }}>
            <Icon name="chevrons-left" size={17} style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
            {!collapsed && <span>ย่อเมนู</span>}
          </button>
        </div>
      </aside>
    );
  }

  function TopBar({ title, subtitle, theme, onTheme, breadcrumb, onBack }) {
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 15, height: 'var(--topbar-h)', flex: '0 0 auto',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
        background: 'color-mix(in srgb, var(--bg-app) 88%, transparent)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {breadcrumb && (
            <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-sans)', marginBottom: 1, padding: 0 }}>
              <Icon name="chevron-left" size={13} /> {breadcrumb}
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{title}</h1>
            {subtitle && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{subtitle}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, color: 'var(--text-tertiary)', pointerEvents: 'none' }}><Icon name="search" size={15} /></span>
            <input placeholder="ค้นหาสินค้า ลูกค้า..." style={{
              height: 36, width: 200, padding: '0 12px 0 32px', background: 'var(--surface-1)',
              border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', outline: 'none',
            }} onFocus={(e)=>e.target.style.borderColor='var(--border-accent)'} onBlur={(e)=>e.target.style.borderColor='var(--border-default)'} />
          </div>
          <Button variant="secondary" size="md" iconLeft={<Icon name="edit" size={15} />} onClick={() => window.location.href = '/Sale/bwp-data-editor/'}>แก้ไขข้อมูล</Button>
          <Button variant="secondary" size="md" iconLeft={<Icon name="download" size={15} />}>ส่งออก</Button>
          <IconButton label="การแจ้งเตือน" variant="ghost"><Icon name="bell" size={17} /></IconButton>
          <IconButton label={theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'} variant="ghost" onClick={onTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, marginLeft: 2, borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--viz-4),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 13 }}>B</div>
          </div>
        </div>
      </header>
    );
  }

  function FilterBar({ filters, setFilters, onExport }) {
    const D = window.VDATA;
    const set = (k) => (v) => setFilters((f) => ({ ...f, [k]: v }));
    return (
      <div style={{
        position: 'sticky', top: 'var(--topbar-h)', zIndex: 12, minHeight: 'var(--filterbar-h)',
        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 22px', flexWrap: 'wrap',
        background: 'var(--bg-base)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginRight: 2 }}>
          <Icon name="filter" size={14} /> ตัวกรอง
        </span>
        <Select width={110} value={filters.year} onChange={set('year')} options={D.YEARS.map(String)} />
        <Select width={120} value={filters.month} onChange={set('month')} options={[{value:'all',label:'ทุกเดือน'}, ...D.MONTHS_ACT.map((m,i)=>({value:String(i),label:m}))]} />
        <Select width={170} value={filters.customerGroup} onChange={set('customerGroup')} options={[{value:'all',label:'ลูกค้าทั้งหมด'}, ...D.CUSTOMERS.slice(0,6).map(c=>({value:c.id,label:c.name.length>16?c.name.slice(0,16)+'…':c.name}))]} />
        <Select width={160} value={filters.productGroup} onChange={set('productGroup')} options={[{value:'all',label:'ทุกกลุ่มสินค้า'},'ฟิล์มใส','พิมพ์สี','PCR (รีไซเคิล)','สูตรพิเศษ']} />
        <Select width={150} value={filters.product || 'all'} onChange={set('product')} options={[{value:'all',label:'ทุกสินค้า'}, ...(D.PRODUCTS||[]).map(p=>({value:p.id,label:p.name.length>14?p.name.slice(0,14)+'…':p.name}))]} />
        <div style={{ flex: 1 }} />
        <Badge tone="accent" variant="soft" dot>ปี {filters.year} · 5 เดือน (ม.ค.–พ.ค.)</Badge>
        <SegmentedControl size="sm" value={filters.granularity} onChange={set('granularity')}
          options={[{value:'month',label:'รายเดือน'},{value:'year',label:'รายปี'}]} />
      </div>
    );
  }

  window.Sidebar = Sidebar;
  window.TopBar = TopBar;
  window.FilterBar = FilterBar;
})();
