/* global React, lucide */
const { useState, useEffect, useRef } = React;

/* ============== ICON SHIM (no lucide-react in browser, use inline SVGs) ============== */
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    star:    <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2" />,
    mountain:<><path d="M3 20 L10 8 L13 13 L16 9 L21 20 Z"/><circle cx="17" cy="5" r="1.6"/></>,
    arrow:   <><path d="M5 12 H19"/><path d="M13 6 L19 12 L13 18"/></>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10 H21"/><path d="M8 3 V7"/><path d="M16 3 V7"/></>,
    users:   <><circle cx="9" cy="8" r="3.5"/><path d="M2 21 c0-4 3.5-6 7-6 s7 2 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15 c3 0 6 1.5 6 5"/></>,
    map:     <><path d="M9 4 L3 6 V21 L9 19 L15 21 L21 19 V4 L15 6 L9 4 Z"/><path d="M9 4 V19"/><path d="M15 6 V21"/></>,
    mic:     <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 12 a7 7 0 0 0 14 0"/><path d="M12 19 V22"/></>,
    chat:    <><path d="M21 12 a8 8 0 0 1-11.5 7.2 L4 21 l1.8-5.5 A8 8 0 1 1 21 12 Z"/></>,
    whatsapp:<><path d="M21 12 a9 9 0 1 1-3.4-7 L21 4 L19.7 7.5 A9 9 0 0 1 21 12 Z"/><path d="M8.5 8.5 c-0.3 1 -0.2 2.5 1.4 4.1 c1.6 1.6 3.1 1.7 4.1 1.4 l1.2 -0.6 l1.5 1.5 c-1.5 1.6 -3.7 1.7 -5.6 0.8 c-2.5 -1.2 -4 -3.6 -4.3 -5.5 c-0.2 -1.6 0.4 -2.6 1.3 -3 z"/></>,
    x:       <><path d="M6 6 L18 18"/><path d="M18 6 L6 18"/></>,
    send:    <><path d="M22 2 L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    sparkle: <><path d="M12 3 L13.5 9 L19.5 10.5 L13.5 12 L12 18 L10.5 12 L4.5 10.5 L10.5 9 Z"/><path d="M19 17 L19.7 19.3 L22 20 L19.7 20.7 L19 23 L18.3 20.7 L16 20 L18.3 19.3 Z"/></>,
    check:   <polyline points="4 12 10 18 20 6"/>,
    play:    <polygon points="6 4 20 12 6 20 6 4"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
    phone:   <path d="M22 17 v3 a2 2 0 0 1 -2 2 a18 18 0 0 1 -18 -18 a2 2 0 0 1 2 -2 h3 a2 2 0 0 1 2 1.7 l0.6 3.2 a2 2 0 0 1 -0.6 2 L7.5 10.5 a16 16 0 0 0 6 6 l1.6 -1.5 a2 2 0 0 1 2 -0.6 l3.2 0.7 A2 2 0 0 1 22 17 Z"/>,
    mail:    <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7 L12 13 L21 7"/></>,
    pin:     <><path d="M12 22 s7-7 7-12 a7 7 0 0 0 -14 0 c0 5 7 12 7 12 z"/><circle cx="12" cy="10" r="2.5"/></>,
    wifi:    <><path d="M3 9 a16 16 0 0 1 18 0"/><path d="M6 13 a11 11 0 0 1 12 0"/><path d="M9 17 a6 6 0 0 1 6 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></>,
    flame:   <path d="M12 2 c1 4 5 5 5 10 a5 5 0 0 1 -10 0 c0-3 2 -4 3 -7 c0 2 2 3 2 -3 z"/>,
    bed:     <><path d="M3 18 V8"/><path d="M21 18 V12"/><path d="M3 12 H21"/><path d="M3 18 H21"/><circle cx="8" cy="11" r="2"/></>,
    bath:    <><path d="M4 12 H20 V16 a3 3 0 0 1 -3 3 H7 a3 3 0 0 1 -3 -3 z"/><path d="M6 12 V6 a2 2 0 0 1 4 0"/><path d="M2 12 H22"/></>,
    leaf:    <><path d="M5 19 c0 -10 6 -14 16 -14 c0 10 -6 14 -16 14 z"/><path d="M5 19 L13 11"/></>,
    chevron: <polyline points="9 18 15 12 9 6"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    sun:     <><circle cx="12" cy="12" r="4"/><path d="M12 2 V4"/><path d="M12 20 V22"/><path d="M2 12 H4"/><path d="M20 12 H22"/><path d="M4.9 4.9 L6.3 6.3"/><path d="M17.7 17.7 L19.1 19.1"/><path d="M4.9 19.1 L6.3 17.7"/><path d="M17.7 6.3 L19.1 4.9"/></>,
    moon:    <path d="M21 13 A9 9 0 1 1 11 3 a7 7 0 0 0 10 10 z"/>,
    minus:   <path d="M5 12 H19"/>,
    plus:    <><path d="M12 5 V19"/><path d="M5 12 H19"/></>,
    waveform:<><path d="M3 12 H5 L7 6 L10 18 L13 9 L16 15 L19 11 H21"/></>,
    award:   <><circle cx="12" cy="9" r="5"/><path d="M9 13 L7 22 L12 19 L17 22 L15 13"/></>,
    coffee:  <><path d="M4 8 H18 V14 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4 z"/><path d="M18 9 H21 a2 2 0 0 1 0 4 H18"/><path d="M8 3 V5"/><path d="M12 3 V5"/></>,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || null}</svg>;
};

/* ============================== NAV ============================== */
const Nav = ({ onTheme, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "14px 0" : "26px 0",
      transition: "padding 320ms var(--ease-out), background 320ms var(--ease-out), border-color 320ms",
      background: scrolled ? "var(--glass-bg-strong)" : "transparent",
      backdropFilter: scrolled ? "blur(22px) saturate(150%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(22px) saturate(150%)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            border: "1px solid var(--brass)",
            display: "grid", placeItems: "center",
            color: "var(--brass)",
          }}>
            <Icon name="mountain" size={18} />
          </div>
          <div style={{ lineHeight: 1.05 }}>
            <div className="display" style={{ fontSize: 22, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>Swiss Cottages</div>
            <div className="eyebrow" style={{ fontSize: 9, color: "var(--brass)", whiteSpace: "nowrap" }}>SIX · BHURBAN</div>
          </div>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Cottages", "Community", "Reviews", "Experiences", "Journal"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontSize: 13, fontWeight: 500, color: "var(--ink-mute)",
              transition: "color 200ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-mute)"}
            >{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onTheme} aria-label="Theme" style={{
            width: 38, height: 38, borderRadius: 999,
            background: "transparent", border: "1px solid var(--line-2)",
            color: "var(--ink)", display: "grid", placeItems: "center",
          }}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>
          <a href="#book" className="btn btn-primary" style={{ padding: "11px 18px", fontSize: 13 }}>
            Reserve <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
};

/* ============================== HERO ============================== */
const Hero = () => {
  const [guests, setGuests] = useState(4);
  return (
    <section id="top" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* full-bleed placeholder */}
      <div className="placeholder-img grain" style={{ position: "absolute", inset: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(19,18,16,0.35) 0%, rgba(19,18,16,0.15) 35%, rgba(19,18,16,0.85) 100%)",
        }} />
        {/* slow ken-burns hint */}
        <div style={{
          position: "absolute", inset: "-5%",
          background: "radial-gradient(ellipse at 20% 30%, rgba(184,153,104,0.18), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(74,90,62,0.20), transparent 60%)",
          animation: "fadeUp 1800ms var(--ease-out) both",
        }} />
        <div className="ph-label">
          <span>// HERO_BG — looping HTML5 video · pines + drifting mist</span>
          <span className="ph-tag">video/mp4 · 4K · ~14s loop</span>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{
        position: "relative", zIndex: 2,
        paddingTop: "22vh", paddingBottom: 200,
      }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 10,
          padding: "8px 14px", borderRadius: 999,
          background: "var(--glass-bg)", border: "1px solid var(--glass-bd)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          whiteSpace: "nowrap",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--brass)" }} />
          <span className="eyebrow" style={{ color: "var(--ink)" }}>A gated community · 12 cottages · 6,800 ft</span>
        </div>

        <h1 className="display fade-up" style={{
          fontSize: "clamp(56px, 8.5vw, 124px)",
          margin: "28px 0 22px",
          maxWidth: 1100,
          color: "var(--ink)",
          animationDelay: "120ms",
        }}>
          Exclusivity<br/>
          above the <span className="display-italic" style={{ color: "var(--brass)" }}>clouds</span>.
        </h1>

        <p className="fade-up" style={{
          fontSize: 19, maxWidth: 640, color: "var(--ink-mute)",
          margin: 0, animationDelay: "260ms",
        }}>
          The gold standard of mountain living in an elite gated community of only
          twelve private cottages. Nestled in the heart of Bhurban — where luxury
          meets the mist.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: 14, marginTop: 40, animationDelay: "400ms" }}>
          <a href="#book" className="btn btn-primary">Check availability <Icon name="arrow" size={14} /></a>
          <a href="#gallery" className="btn btn-ghost" style={{ color: "var(--ink)", borderColor: "rgba(255,255,255,0.3)" }}>
            <Icon name="play" size={12} /> Watch the film
          </a>
        </div>

        {/* Trust strip — text-only, no platform logos */}
        <div className="fade-up" style={{ display: "flex", gap: 32, marginTop: 56, flexWrap: "wrap", animationDelay: "560ms" }}>
          {[
            { label: "Guest score", value: "9.2", sub: "/ 10 · 384 stays" },
            { label: "Repeat guests", value: "95%", sub: "they never want to leave" },
            { label: "Booked nights", value: "92%", sub: "summer '25" },
          ].map((s) => (
            <div key={s.label} style={{ paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,0.18)" }}>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
              <div className="display" style={{ fontSize: 32, color: "var(--ink)" }}>
                {s.value} <span style={{ fontSize: 13, fontFamily: "var(--f-ui)", color: "rgba(255,255,255,0.5)" }}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frosted booking bar */}
      <div id="book" style={{
        position: "absolute", left: "50%", bottom: 36, transform: "translateX(-50%)",
        width: "min(1200px, calc(100% - 60px))",
        zIndex: 3,
      }}>
        <div className="glass glass-strong" style={{ padding: "18px 22px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto",
            gap: 0,
            alignItems: "center",
          }}>
              <BookingField label="Suite" icon="bed" value="Cottage 03 · Cedar" />
              <BookingField label="Arrive" icon="calendar" value="Fri · 12 Jun" divider />
              <BookingField label="Depart" icon="calendar" value="Mon · 15 Jun" divider />
            <BookingField label="Guests" icon="users" value={
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setGuests(Math.max(1, guests-1))} style={stepperBtn}><Icon name="minus" size={12} /></button>
                <span style={{ minWidth: 22, textAlign: "center" }}>{guests}</span>
                <button onClick={() => setGuests(Math.min(12, guests+1))} style={stepperBtn}><Icon name="plus" size={12} /></button>
              </span>
            } divider />
            <div style={{ paddingLeft: 18 }}>
              <button className="btn btn-primary" style={{ padding: "14px 24px" }}>
                Check rates <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const stepperBtn = {
  width: 26, height: 26, borderRadius: 999,
  border: "1px solid var(--line-2)",
  background: "transparent", color: "var(--ink)",
  display: "grid", placeItems: "center",
};

const BookingField = ({ label, icon, value, divider }) => (
  <div style={{
    padding: "6px 22px",
    borderLeft: divider ? "1px solid var(--glass-bd)" : "none",
    minWidth: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon name={icon} size={14} />
      <span className="eyebrow">{label}</span>
    </div>
    <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap" }}>{value}</div>
  </div>
);

Object.assign(window, { Icon, Nav, Hero });
