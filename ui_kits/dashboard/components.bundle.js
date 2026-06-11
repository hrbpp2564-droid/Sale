function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  var React = window.React;

  /* components/core/Button.jsx */

  /**
   * Vantage Button — primary action element.
   * Variants: primary | secondary | ghost | danger
   * Sizes: sm | md | lg
   */
  function Button({
    variant = 'primary',
    size = 'md',
    iconLeft = null,
    iconRight = null,
    disabled = false,
    fullWidth = false,
    style = {},
    children,
    ...rest
  }) {
    const sizes = {
      sm: {
        h: 30,
        px: 12,
        fs: 'var(--text-sm)',
        gap: 6
      },
      md: {
        h: 36,
        px: 16,
        fs: 'var(--text-base)',
        gap: 8
      },
      lg: {
        h: 44,
        px: 22,
        fs: 'var(--text-md)',
        gap: 8
      }
    };
    const s = sizes[size] || sizes.md;
    const variants = {
      primary: {
        background: 'var(--accent)',
        color: 'var(--accent-fg)',
        border: '1px solid transparent'
      },
      secondary: {
        background: 'var(--surface-2)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)'
      },
      ghost: {
        background: 'transparent',
        color: 'var(--text-secondary)',
        border: '1px solid transparent'
      },
      danger: {
        background: 'var(--negative)',
        color: 'var(--negative-fg)',
        border: '1px solid transparent'
      }
    };
    const v = variants[variant] || variants.primary;
    const [hover, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);
    let bg = v.background;
    if (!disabled && hover) {
      if (variant === 'primary') bg = 'var(--accent-hover)';else if (variant === 'secondary') bg = 'var(--surface-3)';else if (variant === 'ghost') bg = 'var(--surface-2)';else if (variant === 'danger') bg = 'var(--red-400)';
    }
    if (!disabled && active && variant === 'primary') bg = 'var(--accent-press)';
    return /*#__PURE__*/React.createElement("button", _extends({
      disabled: disabled,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => {
        setHover(false);
        setActive(false);
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        padding: `0 ${s.px}px`,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: s.fs,
        fontWeight: 'var(--weight-medium)',
        lineHeight: 1,
        borderRadius: 'var(--radius-md)',
        background: bg,
        color: v.color,
        border: v.border,
        transform: !disabled && active ? 'translateY(0.5px)' : 'none',
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'color var(--dur-fast), transform var(--dur-fast)',
        whiteSpace: 'nowrap',
        ...style
      }
    }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flex: '0 0 auto'
      }
    }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flex: '0 0 auto'
      }
    }, iconRight));
  }

  /* components/core/IconButton.jsx */

  /**
   * Vantage IconButton — square, icon-only control for toolbars and headers.
   * Variants: ghost | solid | outline
   */
  function IconButton({
    variant = 'ghost',
    size = 'md',
    active = false,
    disabled = false,
    label,
    style = {},
    children,
    ...rest
  }) {
    const sizes = {
      sm: 28,
      md: 34,
      lg: 40
    };
    const dim = sizes[size] || sizes.md;
    const [hover, setHover] = React.useState(false);
    const base = {
      ghost: {
        bg: 'transparent',
        color: 'var(--text-secondary)',
        border: '1px solid transparent'
      },
      solid: {
        bg: 'var(--surface-2)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)'
      },
      outline: {
        bg: 'transparent',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-default)'
      }
    }[variant] || {
      bg: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent'
    };
    let bg = base.bg;
    let color = base.color;
    if (active) {
      bg = 'var(--accent-subtle)';
      color = 'var(--accent-hover)';
    } else if (hover && !disabled) {
      bg = 'var(--surface-3)';
      color = 'var(--text-primary)';
    }
    return /*#__PURE__*/React.createElement("button", _extends({
      "aria-label": label,
      title: label,
      disabled: disabled,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        flex: '0 0 auto',
        borderRadius: 'var(--radius-md)',
        background: bg,
        color,
        border: active ? '1px solid transparent' : base.border,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'color var(--dur-fast)',
        ...style
      }
    }, rest), children);
  }

  /* components/core/SegmentedControl.jsx */

  /**
   * Vantage SegmentedControl — pill toggle for view modes
   * (e.g. รายเดือน / รายไตรมาส / รายปี, or chart types).
   */
  function SegmentedControl({
    options = [],
    value,
    onChange = () => {},
    size = 'md',
    style = {}
  }) {
    const norm = options.map(o => typeof o === 'string' ? {
      value: o,
      label: o
    } : o);
    const sizes = {
      sm: {
        h: 28,
        px: 10,
        fs: 'var(--text-xs)'
      },
      md: {
        h: 34,
        px: 14,
        fs: 'var(--text-sm)'
      },
      lg: {
        h: 40,
        px: 18,
        fs: 'var(--text-base)'
      }
    };
    const s = sizes[size] || sizes.md;
    return /*#__PURE__*/React.createElement("div", {
      role: "tablist",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 3,
        background: 'var(--surface-inset)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        ...style
      }
    }, norm.map(o => {
      const selected = o.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: o.value,
        role: "tab",
        "aria-selected": selected,
        onClick: () => onChange(o.value),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: s.h,
          padding: `0 ${s.px}px`,
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-sans)',
          fontSize: s.fs,
          fontWeight: selected ? 'var(--weight-semibold)' : 'var(--weight-medium)',
          background: selected ? 'var(--surface-2)' : 'transparent',
          color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
          boxShadow: selected ? 'var(--shadow-xs)' : 'none',
          cursor: 'pointer',
          transition: 'all var(--dur-fast) var(--ease-standard)',
          whiteSpace: 'nowrap'
        }
      }, o.icon && /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex'
        }
      }, o.icon), o.label);
    }));
  }

  /* components/core/Select.jsx */

  /**
   * Vantage Select — compact filter dropdown used across the global filter bar.
   * Custom popover (not native) so it matches dark surfaces.
   */
  function Select({
    options = [],
    value,
    onChange = () => {},
    placeholder = 'เลือก',
    label = null,
    size = 'md',
    disabled = false,
    width = 180,
    style = {}
  }) {
    const norm = options.map(o => typeof o === 'string' ? {
      value: o,
      label: o
    } : o);
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    const sizes = {
      sm: 30,
      md: 36,
      lg: 42
    };
    const h = sizes[size] || sizes.md;
    const current = norm.find(o => o.value === value);
    React.useEffect(() => {
      function onDoc(e) {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      }
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'relative',
        width,
        ...style
      }
    }, label && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
        marginBottom: 5
      }
    }, label), /*#__PURE__*/React.createElement("button", {
      disabled: disabled,
      onClick: () => setOpen(o => !o),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%',
        height: h,
        padding: '0 10px 0 12px',
        background: 'var(--surface-1)',
        border: `1px solid ${open ? 'var(--border-accent)' : 'var(--border-default)'}`,
        boxShadow: open ? '0 0 0 3px var(--accent-ring)' : 'none',
        borderRadius: 'var(--radius-md)',
        color: current ? 'var(--text-primary)' : 'var(--text-tertiary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, current ? current.label : placeholder), /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      style: {
        flex: '0 0 auto',
        transform: open ? 'rotate(180deg)' : 'none',
        transition: 'transform var(--dur-fast)',
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 9l6 6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 0,
        right: 0,
        zIndex: 'var(--z-overlay)',
        maxHeight: 280,
        overflowY: 'auto',
        padding: 4,
        background: 'var(--surface-2)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)'
      }
    }, norm.map(o => {
      const sel = o.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: o.value,
        onClick: () => {
          onChange(o.value);
          setOpen(false);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          width: '100%',
          padding: '8px 10px',
          border: 'none',
          textAlign: 'left',
          background: sel ? 'var(--accent-subtle)' : 'transparent',
          color: sel ? 'var(--accent-hover)' : 'var(--text-secondary)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: sel ? 'var(--weight-medium)' : 'var(--weight-regular)'
        },
        onMouseEnter: e => {
          if (!sel) e.currentTarget.style.background = 'var(--surface-3)';
        },
        onMouseLeave: e => {
          if (!sel) e.currentTarget.style.background = 'transparent';
        }
      }, o.label, sel && /*#__PURE__*/React.createElement("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M20 6L9 17l-5-5",
        stroke: "currentColor",
        strokeWidth: "2.2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })));
    })));
  }

  /* components/core/Card.jsx */

  /**
   * Vantage Card — the base surface for panels, charts, and tables.
   * Optional header (title + subtitle + actions slot).
   */
  function Card({
    title = null,
    subtitle = null,
    actions = null,
    padding = 'md',
    interactive = false,
    style = {},
    bodyStyle = {},
    children,
    ...rest
  }) {
    const pads = {
      none: 0,
      sm: 'var(--space-3)',
      md: 'var(--space-5)',
      lg: 'var(--space-6)'
    };
    const pad = pads[padding] ?? pads.md;
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("section", _extends({
      onMouseEnter: () => interactive && setHover(true),
      onMouseLeave: () => interactive && setHover(false),
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-1)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base), transform var(--dur-base)',
        transform: interactive && hover ? 'translateY(-1px)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style
      }
    }, rest), (title || actions) && /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        padding: `var(--space-4) ${typeof pad === 'number' ? pad + 'px' : pad}`,
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, title && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-md)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)',
        lineHeight: 'var(--leading-snug)'
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)',
        marginTop: 2
      }
    }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        flex: '0 0 auto'
      }
    }, actions)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: pad,
        flex: 1,
        minHeight: 0,
        ...bodyStyle
      }
    }, children));
  }

  /* components/core/Badge.jsx */

  /**
   * Vantage Badge — small status / category label.
   * Tones: neutral | accent | positive | negative | warning | info
   */
  function Badge({
    tone = 'neutral',
    variant = 'soft',
    size = 'md',
    dot = false,
    style = {},
    children
  }) {
    const tones = {
      neutral: {
        fg: 'var(--text-secondary)',
        soft: 'var(--surface-3)',
        solid: 'var(--slate-600)'
      },
      accent: {
        fg: 'var(--accent-hover)',
        soft: 'var(--accent-subtle)',
        solid: 'var(--accent)'
      },
      positive: {
        fg: 'var(--positive)',
        soft: 'var(--positive-subtle)',
        solid: 'var(--positive)'
      },
      negative: {
        fg: 'var(--negative)',
        soft: 'var(--negative-subtle)',
        solid: 'var(--negative)'
      },
      warning: {
        fg: 'var(--warning)',
        soft: 'var(--warning-subtle)',
        solid: 'var(--warning)'
      },
      info: {
        fg: 'var(--info)',
        soft: 'var(--info-subtle)',
        solid: 'var(--info)'
      }
    };
    const t = tones[tone] || tones.neutral;
    const solid = variant === 'solid';
    const sizes = {
      sm: {
        h: 18,
        px: 6,
        fs: 'var(--text-2xs)'
      },
      md: {
        h: 22,
        px: 8,
        fs: 'var(--text-xs)'
      }
    };
    const s = sizes[size] || sizes.md;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: s.h,
        padding: `0 ${s.px}px`,
        borderRadius: 'var(--radius-full)',
        background: solid ? t.solid : t.soft,
        color: solid ? '#fff' : t.fg,
        border: variant === 'outline' ? `1px solid ${t.fg}` : '1px solid transparent',
        fontFamily: 'var(--font-sans)',
        fontSize: s.fs,
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style
      }
    }, dot && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: solid ? '#fff' : t.fg
      }
    }), children);
  }

  /* components/data/DeltaBadge.jsx */

  /**
   * Vantage DeltaBadge — directional growth indicator (▲ +12.4% / ▼ -3.1%).
   * Positive is green, negative red; "neutral" (≈0) is muted.
   * Set invert for metrics where down is good (e.g. ต้นทุน).
   */
  function DeltaBadge({
    value = 0,
    format = 'percent',
    // 'percent' | 'number'
    size = 'md',
    showArrow = true,
    invert = false,
    suffix = '',
    style = {}
  }) {
    const positive = value > 0;
    const negative = value < 0;
    const good = invert ? negative : positive;
    const bad = invert ? positive : negative;
    const color = good ? 'var(--positive)' : bad ? 'var(--negative)' : 'var(--text-tertiary)';
    const bg = good ? 'var(--positive-subtle)' : bad ? 'var(--negative-subtle)' : 'var(--surface-3)';
    const sizes = {
      sm: {
        h: 18,
        px: 6,
        fs: 'var(--text-2xs)',
        arrow: 8
      },
      md: {
        h: 22,
        px: 7,
        fs: 'var(--text-xs)',
        arrow: 9
      },
      lg: {
        h: 26,
        px: 9,
        fs: 'var(--text-sm)',
        arrow: 11
      }
    };
    const s = sizes[size] || sizes.md;
    const abs = Math.abs(value);
    const num = format === 'percent' ? `${abs.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })}%` : abs.toLocaleString('en-US');
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        height: s.h,
        padding: `0 ${s.px}px`,
        borderRadius: 'var(--radius-sm)',
        background: bg,
        color,
        fontFamily: 'var(--font-numeric)',
        fontSize: s.fs,
        fontWeight: 'var(--weight-semibold)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style
      }
    }, showArrow && (positive || negative) && /*#__PURE__*/React.createElement("svg", {
      width: s.arrow,
      height: s.arrow,
      viewBox: "0 0 12 12",
      fill: "none",
      style: {
        transform: negative ? 'rotate(180deg)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 2.5L10 8H2L6 2.5z",
      fill: "currentColor"
    })), positive ? '+' : negative ? '−' : '', num, suffix);
  }

  /* components/data/KpiCard.jsx */

  /**
   * Vantage KpiCard — the executive metric tile.
   * Big tabular figure + label + optional delta(s) + sparkline slot.
   * Drill-down ready: pass onClick to make the whole tile a drill target.
   */
  function KpiCard({
    label,
    value,
    unit = '',
    delta = null,
    // number → renders a DeltaBadge
    deltaSuffix = '',
    secondary = null,
    // e.g. { label: 'YoY', value: 8.2 }
    icon = null,
    spark = null,
    // ReactNode (e.g. <Sparkline/>)
    accent = false,
    // highlight tile (primary KPI)
    onClick = null,
    style = {}
  }) {
    const [hover, setHover] = React.useState(false);
    const clickable = !!onClick;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick || undefined,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        minHeight: 118,
        background: accent ? 'linear-gradient(180deg, var(--accent-subtle), var(--surface-1) 70%)' : 'var(--surface-1)',
        border: `1px solid ${hover && clickable ? 'var(--border-strong)' : accent ? 'rgba(56,139,253,0.30)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover && clickable ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover && clickable ? 'translateY(-1px)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all var(--dur-base) var(--ease-standard)',
        overflow: 'hidden',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-secondary)',
        letterSpacing: 'var(--tracking-normal)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, label), icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        borderRadius: 'var(--radius-sm)',
        background: accent ? 'var(--accent-subtle)' : 'var(--surface-3)',
        color: accent ? 'var(--accent-hover)' : 'var(--text-tertiary)',
        flex: '0 0 auto'
      }
    }, icon)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        flexWrap: 'nowrap',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: String(value).length > 11 ? 'var(--text-lg)' : String(value).length > 5 ? 'var(--text-2xl)' : 'var(--text-3xl)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)',
        letterSpacing: 'var(--tracking-tight)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.05,
        whiteSpace: 'nowrap',
        flexShrink: 0
      }
    }, value), unit && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-tertiary)',
        fontWeight: 'var(--weight-medium)',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, unit)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 'auto'
      }
    }, delta !== null && /*#__PURE__*/React.createElement(DeltaBadge, {
      value: delta,
      suffix: deltaSuffix,
      size: "sm"
    }), secondary && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement("span", null, secondary.label), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: secondary.value,
      size: "sm",
      showArrow: false,
      style: {
        background: 'transparent',
        padding: 0
      }
    })), spark && /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        flex: '0 0 auto'
      }
    }, spark)));
  }

  /* components/data/RankBar.jsx */

  /**
   * Vantage RankBar — a single ranked row with a proportional bar.
   * Used in Top-10 product/customer rankings. Bar width = value / max.
   */
  function RankBar({
    rank,
    label,
    sublabel = null,
    value,
    // formatted string shown at the right
    ratio,
    // 0..1 fill proportion
    share = null,
    // optional % share string
    delta = null,
    // optional number for a small trend mark
    color = 'var(--viz-1)',
    onClick = null,
    style = {}
  }) {
    const [hover, setHover] = React.useState(false);
    const clickable = !!onClick;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick || undefined,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: 'grid',
        gridTemplateColumns: '26px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '8px 10px',
        borderRadius: 'var(--radius-md)',
        background: hover && clickable ? 'var(--surface-2)' : 'transparent',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-fast)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderRadius: 'var(--radius-sm)',
        background: rank <= 3 ? 'var(--accent-subtle)' : 'var(--surface-3)',
        color: rank <= 3 ? 'var(--accent-hover)' : 'var(--text-tertiary)',
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        flex: '0 0 auto'
      }
    }, rank), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, label), sublabel && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-tertiary)',
        flex: '0 0 auto'
      }
    }, sublabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 'var(--radius-full)',
        background: 'var(--surface-3)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.max(2, Math.min(100, ratio * 100))}%`,
        height: '100%',
        borderRadius: 'var(--radius-full)',
        background: color,
        transition: 'width var(--dur-slow) var(--ease-out)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, value), (share || delta !== null) && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 6,
        marginTop: 2
      }
    }, share && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-numeric)'
      }
    }, share), delta !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        fontFamily: 'var(--font-numeric)',
        fontWeight: 'var(--weight-semibold)',
        color: delta >= 0 ? 'var(--positive)' : 'var(--negative)'
      }
    }, delta >= 0 ? '+' : '−', Math.abs(delta).toFixed(1), "%"))));
  }

  /* components/data/InsightCard.jsx */

  /**
   * Vantage InsightCard — a single AI-generated insight line for the Insight Engine.
   * Tone-coded left rail + icon; supports a drill action.
   */
  function InsightCard({
    tone = 'info',
    // positive | negative | warning | info
    icon = null,
    title,
    detail = null,
    metric = null,
    // optional emphasized figure, e.g. "+18.4%"
    time = null,
    // e.g. "เรียลไทม์", "วันนี้"
    onClick = null,
    style = {}
  }) {
    const tones = {
      positive: {
        c: 'var(--positive)',
        bg: 'var(--positive-subtle)'
      },
      negative: {
        c: 'var(--negative)',
        bg: 'var(--negative-subtle)'
      },
      warning: {
        c: 'var(--warning)',
        bg: 'var(--warning-subtle)'
      },
      info: {
        c: 'var(--info)',
        bg: 'var(--info-subtle)'
      }
    };
    const t = tones[tone] || tones.info;
    const [hover, setHover] = React.useState(false);
    const clickable = !!onClick;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick || undefined,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-start',
        padding: 'var(--space-3) var(--space-4)',
        background: hover && clickable ? 'var(--surface-2)' : 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `2px solid ${t.c}`,
        borderRadius: 'var(--radius-md)',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-fast)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 'var(--radius-sm)',
        background: t.bg,
        color: t.c,
        flex: '0 0 auto',
        marginTop: 1
      }
    }, icon), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-primary)',
        lineHeight: 'var(--leading-snug)'
      }
    }, title), metric && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        color: t.c,
        fontVariantNumeric: 'tabular-nums'
      }
    }, metric)), detail && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)',
        marginTop: 3,
        lineHeight: 'var(--leading-normal)'
      }
    }, detail)), time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-disabled)',
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        marginTop: 2
      }
    }, time));
  }

  /* components/data/DataTable.jsx */

  /**
   * Vantage DataTable — compact, dark data grid for rankings and detail views.
   * Columns describe alignment, width, and an optional render fn.
   */
  function DataTable({
    columns = [],
    // [{ key, header, align?, width?, render?(row,i), numeric? }]
    rows = [],
    sortable = true,
    rowKey = (r, i) => i,
    onRowClick = null,
    stickyHeader = true,
    zebra = false,
    style = {}
  }) {
    const [sort, setSort] = React.useState(null); // { key, dir }
    const [hover, setHover] = React.useState(null);
    const sorted = React.useMemo(() => {
      if (!sort) return rows;
      const col = columns.find(c => c.key === sort.key);
      if (!col) return rows;
      return [...rows].sort((a, b) => {
        const av = a[sort.key],
          bv = b[sort.key];
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'th');
        return sort.dir === 'asc' ? cmp : -cmp;
      });
    }, [rows, sort, columns]);
    function toggleSort(key) {
      if (!sortable) return;
      setSort(s => s && s.key === key ? s.dir === 'desc' ? {
        key,
        dir: 'asc'
      } : null : {
        key,
        dir: 'desc'
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        overflowX: 'auto',
        ...style
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => {
      const isSorted = sort && sort.key === c.key;
      const alignRight = c.align === 'right' || c.numeric;
      return /*#__PURE__*/React.createElement("th", {
        key: c.key,
        onClick: () => c.sortable !== false && toggleSort(c.key),
        style: {
          position: stickyHeader ? 'sticky' : 'static',
          top: 0,
          zIndex: 1,
          textAlign: alignRight ? 'right' : c.align || 'left',
          width: c.width,
          padding: '10px 14px',
          background: 'var(--surface-2)',
          borderBottom: '1px solid var(--border-default)',
          fontSize: 'var(--text-2xs)',
          fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase',
          color: isSorted ? 'var(--text-secondary)' : 'var(--text-tertiary)',
          cursor: sortable && c.sortable !== false ? 'pointer' : 'default',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          justifyContent: alignRight ? 'flex-end' : 'flex-start'
        }
      }, c.header, isSorted && /*#__PURE__*/React.createElement("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 12 12",
        style: {
          transform: sort.dir === 'asc' ? 'rotate(180deg)' : 'none'
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6 8L2.5 4h7L6 8z",
        fill: "currentColor"
      }))));
    }))), /*#__PURE__*/React.createElement("tbody", null, sorted.map((row, i) => /*#__PURE__*/React.createElement("tr", {
      key: rowKey(row, i),
      onClick: () => onRowClick && onRowClick(row, i),
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        background: hover === i ? 'var(--surface-2)' : zebra && i % 2 ? 'var(--surface-1)' : 'transparent',
        cursor: onRowClick ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-fast)'
      }
    }, columns.map(c => {
      const alignRight = c.align === 'right' || c.numeric;
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        style: {
          textAlign: alignRight ? 'right' : c.align || 'left',
          padding: '11px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: 'var(--text-sm)',
          fontFamily: c.numeric ? 'var(--font-numeric)' : 'var(--font-sans)',
          fontVariantNumeric: c.numeric ? 'tabular-nums' : 'normal',
          color: c.muted ? 'var(--text-tertiary)' : 'var(--text-primary)',
          whiteSpace: 'nowrap'
        }
      }, c.render ? c.render(row, i) : row[c.key]);
    }))))));
  }

  /* components/charts/LineChart.jsx */

  function useMeasure() {
    const ref = React.useRef(null);
    const [w, setW] = React.useState(640);
    React.useEffect(() => {
      if (!ref.current) return;
      const ro = new ResizeObserver(entries => {
        const cw = entries[0].contentRect.width;
        if (cw > 0) setW(cw);
      });
      ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
    return [ref, w];
  }

  /**
   * Vantage LineChart — multi-series line / area / combo chart.
   * The workhorse trend chart (Sales Overview, Year Comparison, Price).
   */
  function LineChart({
    series = [],
    // [{ name, data:[n], color, type?:'line'|'area'|'bar', axis?:'left'|'right' }]
    labels = [],
    // x-axis category labels
    height = 240,
    yFormat = v => v.toLocaleString('en-US'),
    showGrid = true,
    showDots = false,
    showLegend = true,
    padding = {
      top: 16,
      right: 16,
      bottom: 26,
      left: 44
    },
    style = {}
  }) {
    const [ref, width] = useMeasure();
    const [hover, setHover] = React.useState(null);
    const p = padding;
    const iw = Math.max(10, width - p.left - p.right);
    const ih = Math.max(10, height - p.top - p.bottom);
    const leftSeries = series.filter(s => (s.axis || 'left') === 'left');
    const rightSeries = series.filter(s => s.axis === 'right');
    const maxOf = arr => Math.max(1, ...arr.flatMap(s => s.data));
    const lMax = maxOf(leftSeries.length ? leftSeries : series) * 1.12;
    const rMax = maxOf(rightSeries.length ? rightSeries : series) * 1.12;
    const n = labels.length || (series[0]?.data.length ?? 0);
    const xAt = i => p.left + (n <= 1 ? iw / 2 : i / (n - 1) * iw);
    const yAt = (v, axis) => p.top + ih - v / (axis === 'right' ? rMax : lMax) * ih;
    const bxAt = i => p.left + (i + 0.5) / n * iw; // bar centers

    const gridLines = 4;
    function pathFor(data, axis) {
      return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
    }
    function areaFor(data, axis) {
      const top = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
      return `${top} L ${xAt(data.length - 1).toFixed(1)} ${(p.top + ih).toFixed(1)} L ${xAt(0).toFixed(1)} ${(p.top + ih).toFixed(1)} Z`;
    }
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%',
        ...style
      }
    }, showLegend && series.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        marginBottom: 10
      }
    }, series.map(s => /*#__PURE__*/React.createElement("span", {
      key: s.name,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: s.type === 'bar' ? 2 : '50%',
        background: s.color
      }
    }), s.name))), /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        display: 'block',
        overflow: 'visible'
      },
      onMouseLeave: () => setHover(null),
      onMouseMove: e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * width;
        const i = Math.round((x - p.left) / iw * (n - 1));
        if (i >= 0 && i < n) setHover(i);
      }
    }, showGrid && Array.from({
      length: gridLines + 1
    }).map((_, g) => {
      const y = p.top + g / gridLines * ih;
      const val = lMax * (1 - g / gridLines);
      return /*#__PURE__*/React.createElement("g", {
        key: g
      }, /*#__PURE__*/React.createElement("line", {
        x1: p.left,
        y1: y,
        x2: p.left + iw,
        y2: y,
        stroke: "var(--chart-grid)",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: p.left - 8,
        y: y + 4,
        textAnchor: "end",
        fontSize: "10",
        fill: "var(--chart-axis)",
        fontFamily: "var(--font-numeric)"
      }, yFormat(Math.round(val))));
    }), series.filter(s => s.type === 'bar').map(s => {
      const bw = iw / n * 0.5;
      return s.data.map((v, i) => /*#__PURE__*/React.createElement("rect", {
        key: s.name + i,
        x: bxAt(i) - bw / 2,
        y: yAt(v, s.axis),
        width: bw,
        height: p.top + ih - yAt(v, s.axis),
        rx: "2",
        fill: s.color,
        opacity: "0.85"
      }));
    }), series.filter(s => s.type === 'area').map(s => /*#__PURE__*/React.createElement("path", {
      key: s.name,
      d: areaFor(s.data, s.axis),
      fill: s.color,
      opacity: "0.12"
    })), series.filter(s => s.type !== 'bar').map(s => /*#__PURE__*/React.createElement("path", {
      key: s.name,
      d: pathFor(s.data, s.axis),
      fill: "none",
      stroke: s.color,
      strokeWidth: "2",
      strokeLinejoin: "round",
      strokeLinecap: "round"
    })), showDots && series.filter(s => s.type !== 'bar').map(s => s.data.map((v, i) => /*#__PURE__*/React.createElement("circle", {
      key: s.name + i,
      cx: xAt(i),
      cy: yAt(v, s.axis),
      r: "2.5",
      fill: "var(--surface-1)",
      stroke: s.color,
      strokeWidth: "1.5"
    }))), hover !== null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: xAt(hover),
      y1: p.top,
      x2: xAt(hover),
      y2: p.top + ih,
      stroke: "var(--border-strong)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), series.filter(s => s.type !== 'bar').map(s => /*#__PURE__*/React.createElement("circle", {
      key: s.name,
      cx: xAt(hover),
      cy: yAt(s.data[hover], s.axis),
      r: "3.5",
      fill: s.color,
      stroke: "var(--surface-1)",
      strokeWidth: "1.5"
    }))), labels.map((l, i) => (n <= 14 || i % Math.ceil(n / 12) === 0) && /*#__PURE__*/React.createElement("text", {
      key: i,
      x: series.some(s => s.type === 'bar') ? bxAt(i) : xAt(i),
      y: height - 8,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-sans)"
    }, l))), hover !== null && labels[hover] && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        marginTop: 8,
        padding: '8px 12px',
        background: 'var(--surface-inset)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, labels[hover]), series.map(s => /*#__PURE__*/React.createElement("span", {
      key: s.name,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: s.color
      }
    }), s.name, ": ", /*#__PURE__*/React.createElement("strong", {
      style: {
        fontFamily: 'var(--font-numeric)',
        color: 'var(--text-primary)'
      }
    }, yFormat(s.data[hover]))))));
  }

  /* components/charts/Sparkline.jsx */

  /**
   * Vantage Sparkline — tiny inline trend for KPI tiles and table rows.
   * Fixed-size SVG; pass width/height. Optional area fill + end dot.
   */
  function Sparkline({
    data = [],
    width = 84,
    height = 30,
    color = 'var(--accent)',
    fill = true,
    endDot = true,
    strokeWidth = 1.5,
    style = {}
  }) {
    if (!data.length) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;
    const iw = width - pad * 2;
    const ih = height - pad * 2;
    const x = i => pad + (data.length <= 1 ? iw / 2 : i / (data.length - 1) * iw);
    const y = v => pad + ih - (v - min) / range * ih;
    const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    const area = `${line} L ${x(data.length - 1).toFixed(1)} ${(pad + ih).toFixed(1)} L ${x(0).toFixed(1)} ${(pad + ih).toFixed(1)} Z`;
    const id = React.useId();
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        display: 'block',
        overflow: 'visible',
        ...style
      }
    }, fill && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: `spark-${id}`,
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: color,
      stopOpacity: "0.28"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: color,
      stopOpacity: "0"
    }))), /*#__PURE__*/React.createElement("path", {
      d: area,
      fill: `url(#spark-${id})`
    })), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), endDot && /*#__PURE__*/React.createElement("circle", {
      cx: x(data.length - 1),
      cy: y(data[data.length - 1]),
      r: "2",
      fill: color
    }));
  }

  /* components/charts/DonutChart.jsx */

  /**
   * Vantage DonutChart — proportional ring for Product Mix / contribution share.
   * Renders segments + optional center total and side legend.
   */
  function DonutChart({
    data = [],
    // [{ label, value, color }]
    size = 200,
    thickness = 26,
    centerLabel = null,
    centerValue = null,
    showLegend = true,
    gap = 2,
    // degrees between segments
    style = {}
  }) {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const r = (size - thickness) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circ = 2 * Math.PI * r;
    const [active, setActive] = React.useState(null);
    let offset = 0;
    const segs = data.map((d, i) => {
      const frac = d.value / total;
      const len = frac * circ;
      const gapLen = gap / 360 * circ;
      const seg = {
        ...d,
        i,
        dasharray: `${Math.max(0, len - gapLen)} ${circ - Math.max(0, len - gapLen)}`,
        dashoffset: -offset,
        pct: frac * 100
      };
      offset += len;
      return seg;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-6)',
        flexWrap: 'wrap',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: size,
        height: size,
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: {
        transform: 'rotate(-90deg)'
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: r,
      fill: "none",
      stroke: "var(--surface-3)",
      strokeWidth: thickness
    }), segs.map(s => /*#__PURE__*/React.createElement("circle", {
      key: s.i,
      cx: cx,
      cy: cy,
      r: r,
      fill: "none",
      stroke: s.color,
      strokeWidth: active === s.i ? thickness + 4 : thickness,
      strokeDasharray: s.dasharray,
      strokeDashoffset: s.dashoffset,
      strokeLinecap: "butt",
      style: {
        transition: 'stroke-width var(--dur-fast)',
        cursor: 'pointer',
        opacity: active === null || active === s.i ? 1 : 0.45
      },
      onMouseEnter: () => setActive(s.i),
      onMouseLeave: () => setActive(null)
    }))), (centerLabel || centerValue) && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }
    }, active !== null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)'
      }
    }, segs[active].pct.toFixed(1), "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-tertiary)',
        maxWidth: size - thickness * 2,
        textAlign: 'center'
      }
    }, segs[active].label)) : /*#__PURE__*/React.createElement(React.Fragment, null, centerValue && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)'
      }
    }, centerValue), centerLabel && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-tertiary)'
      }
    }, centerLabel)))), showLegend && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 150,
        flex: 1
      }
    }, segs.map(s => /*#__PURE__*/React.createElement("div", {
      key: s.i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        opacity: active === null || active === s.i ? 1 : 0.5
      },
      onMouseEnter: () => setActive(s.i),
      onMouseLeave: () => setActive(null)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 2,
        background: s.color,
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--text-primary)'
      }
    }, s.pct.toFixed(1), "%")))));
  }

  /* components/charts/ParetoChart.jsx */

  function useMeasure() {
    const ref = React.useRef(null);
    const [w, setW] = React.useState(640);
    React.useEffect(() => {
      if (!ref.current) return;
      const ro = new ResizeObserver(e => {
        const cw = e[0].contentRect.width;
        if (cw > 0) setW(cw);
      });
      ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
    return [ref, w];
  }

  /**
   * Vantage ParetoChart — bars (value) + cumulative % line for contribution analysis.
   * Includes the 80% reference line for Pareto / customer-concentration risk.
   */
  function ParetoChart({
    data = [],
    // [{ label, value }]
    height = 280,
    barColor = 'var(--viz-1)',
    lineColor = 'var(--viz-3)',
    threshold = 80,
    // % reference line
    valueFormat = v => v.toLocaleString('en-US'),
    style = {}
  }) {
    const [ref, width] = useMeasure();
    const [hover, setHover] = React.useState(null);
    const p = {
      top: 18,
      right: 44,
      bottom: 40,
      left: 46
    };
    const iw = Math.max(10, width - p.left - p.right);
    const ih = Math.max(10, height - p.top - p.bottom);
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((s, d) => s + d.value, 0) || 1;
    const maxV = Math.max(...sorted.map(d => d.value), 1) * 1.1;
    let cum = 0;
    const pts = sorted.map((d, i) => {
      cum += d.value;
      return {
        ...d,
        cumPct: cum / total * 100,
        i
      };
    });
    const n = pts.length;
    const bw = iw / n * 0.62;
    const bx = i => p.left + (i + 0.5) / n * iw;
    const by = v => p.top + ih - v / maxV * ih;
    const ly = pct => p.top + ih - pct / 100 * ih;
    const linePath = pts.map((d, i) => `${i === 0 ? 'M' : 'L'} ${bx(i).toFixed(1)} ${ly(d.cumPct).toFixed(1)}`).join(' ');
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%',
        ...style
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        display: 'block',
        overflow: 'visible'
      },
      onMouseLeave: () => setHover(null)
    }, [0, 0.25, 0.5, 0.75, 1].map((g, k) => {
      const y = p.top + g * ih;
      return /*#__PURE__*/React.createElement("g", {
        key: k
      }, /*#__PURE__*/React.createElement("line", {
        x1: p.left,
        y1: y,
        x2: p.left + iw,
        y2: y,
        stroke: "var(--chart-grid)",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: p.left - 8,
        y: y + 4,
        textAnchor: "end",
        fontSize: "10",
        fill: "var(--chart-axis)",
        fontFamily: "var(--font-numeric)"
      }, Math.round(maxV * (1 - g)).toLocaleString()), /*#__PURE__*/React.createElement("text", {
        x: p.left + iw + 8,
        y: y + 4,
        textAnchor: "start",
        fontSize: "10",
        fill: "var(--chart-axis)",
        fontFamily: "var(--font-numeric)"
      }, Math.round(100 * (1 - g)), "%"));
    }), /*#__PURE__*/React.createElement("line", {
      x1: p.left,
      y1: ly(threshold),
      x2: p.left + iw,
      y2: ly(threshold),
      stroke: "var(--negative)",
      strokeWidth: "1",
      strokeDasharray: "4 4",
      opacity: "0.7"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.left + iw,
      y: ly(threshold) - 5,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--negative)",
      fontFamily: "var(--font-numeric)"
    }, threshold, "%"), pts.map((d, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: bx(i) - bw / 2,
      y: by(d.value),
      width: bw,
      height: p.top + ih - by(d.value),
      rx: "2",
      fill: barColor,
      opacity: hover === null || hover === i ? 0.9 : 0.4,
      onMouseEnter: () => setHover(i),
      style: {
        cursor: 'pointer',
        transition: 'opacity var(--dur-fast)'
      }
    })), /*#__PURE__*/React.createElement("path", {
      d: linePath,
      fill: "none",
      stroke: lineColor,
      strokeWidth: "2",
      strokeLinejoin: "round"
    }), pts.map((d, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: bx(i),
      cy: ly(d.cumPct),
      r: hover === i ? 4 : 2.5,
      fill: lineColor,
      stroke: "var(--surface-1)",
      strokeWidth: "1.5"
    })), pts.map((d, i) => (n <= 12 || i % Math.ceil(n / 12) === 0) && /*#__PURE__*/React.createElement("text", {
      key: i,
      x: bx(i),
      y: height - 22,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-sans)",
      transform: n > 8 ? `rotate(-30 ${bx(i)} ${height - 22})` : undefined
    }, d.label))), hover !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        marginTop: 8,
        padding: '8px 12px',
        background: 'var(--surface-inset)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--text-primary)'
      }
    }, pts[hover].label), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        fontFamily: 'var(--font-numeric)',
        color: 'var(--text-primary)'
      }
    }, valueFormat(pts[hover].value))), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, "\u0E2A\u0E30\u0E2A\u0E21: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        fontFamily: 'var(--font-numeric)',
        color: lineColor
      }
    }, pts[hover].cumPct.toFixed(1), "%"))));
  }
  window.VantageSalesIntelligenceDesignSystem_a75d0a = Object.assign(window.VantageSalesIntelligenceDesignSystem_a75d0a || {}, {
    Button,
    IconButton,
    SegmentedControl,
    Select,
    Card,
    Badge,
    DeltaBadge,
    KpiCard,
    RankBar,
    InsightCard,
    DataTable,
    LineChart,
    Sparkline,
    DonutChart,
    ParetoChart
  });
})();