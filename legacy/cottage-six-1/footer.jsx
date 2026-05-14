/* global React */
const { useState: useStateFT } = React;

/* ============================== FOOTER (SEO) ============================== */
const Footer = () => {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-2)", paddingTop: 100, paddingBottom: 40 }}>
      <div className="container">
        {/* Big tag */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, marginBottom: 80 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--brass)" }}>Stay with us</span>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 80px)", margin: "16px 0 0", lineHeight: 1.0 }}>
              The pines are<br/>
              <span className="display-italic">waiting</span>.
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-mute)", marginTop: 24, maxWidth: 460 }}>
              Direct rates only here. No platform fees, no service charges, and the host's
              cell number on your confirmation email.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <a href="#book" className="btn btn-primary">Reserve a suite <Icon name="arrow" size={14} /></a>
              <a href="#contact" className="btn btn-ghost">Call us <Icon name="phone" size={14} /></a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="placeholder-img" style={{
            borderRadius: "var(--r-lg)",
            minHeight: 280,
            position: "relative",
            border: "1px solid var(--line)",
          }}>
            {/* faux map graphics */}
            <svg width="100%" height="100%" viewBox="0 0 400 280" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(241,237,228,0.05)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="280" fill="url(#grid)" />
              <path d="M0,180 Q100,160 180,170 T400,150" stroke="rgba(184,153,104,0.4)" strokeWidth="1.5" fill="none" />
              <path d="M0,210 Q120,200 220,215 T400,195" stroke="rgba(184,153,104,0.25)" strokeWidth="1" fill="none" />
              <path d="M180,0 Q200,80 195,140 T220,280" stroke="rgba(74,90,62,0.3)" strokeWidth="1.5" fill="none" />
              <circle cx="220" cy="140" r="8" fill="var(--brass)" />
              <circle cx="220" cy="140" r="20" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.5" />
              <circle cx="220" cy="140" r="32" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.2" />
            </svg>
            <div style={{ position: "absolute", top: 18, left: 18, padding: "6px 12px", borderRadius: 999, background: "var(--glass-bg-strong)", border: "1px solid var(--glass-bd)", fontSize: 11, fontFamily: "var(--f-mono)" }}>
              33.9603° N, 73.4538° E
            </div>
            <div className="ph-label">
              <span>// MAP_EMBED — Google Maps iframe slot</span>
              <span className="ph-tag">Bhurban</span>
            </div>
          </div>
        </div>

        {/* NAP grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: 60, paddingBottom: 56, borderBottom: "1px solid var(--line)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                border: "1px solid var(--brass)",
                display: "grid", placeItems: "center",
                color: "var(--brass)",
              }}><Icon name="mountain" size={16} /></div>
              <div className="display" style={{ fontSize: 22 }}>Swiss Cottages Six</div>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-mute)", margin: "0 0 18px", maxWidth: 320 }}>
              A five-cottage retreat inside a private 12-cottage gated community at 6,800 ft. Owned and run by the Raza family since 1998.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { i: "instagram", l: "@swisscottagesix" },
                { i: "whatsapp", l: "WhatsApp" },
                { i: "mail", l: "Email" },
              ].map(s => (
                <a key={s.l} href="#" style={{
                  width: 38, height: 38, borderRadius: 999,
                  border: "1px solid var(--line-2)",
                  display: "grid", placeItems: "center",
                  color: "var(--ink-mute)",
                  transition: "all 220ms",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--brass)"; e.currentTarget.style.borderColor = "var(--brass)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-mute)"; e.currentTarget.style.borderColor = "var(--line-2)"; }}
                >
                  <Icon name={s.i} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div id="contact">
            <span className="eyebrow">Find us</span>
            <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, color: "var(--ink-mute)" }}>
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Swiss Cottages Six</strong><br/>
              Off PC Bhurban Road<br/>
              Bhurban, Murree<br/>
              Punjab 47150, Pakistan
            </div>
          </div>

          <div>
            <span className="eyebrow">Talk to us</span>
            <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.9, color: "var(--ink-mute)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="phone" size={13} /> +92 51 ··· ····
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="whatsapp" size={13} /> +92 3·· ··· ····
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="mail" size={13} /> stay@swisscottagessix.com
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">Site</span>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Suites & rates", "Experiences", "House manual", "Press kit", "Privacy", "Group bookings"].map(l => (
                <a key={l} href="#" style={{ fontSize: 13, color: "var(--ink-mute)", transition: "color 200ms" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--brass)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--ink-mute)"}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 18,
        }}>
          <div style={{ fontSize: 11, color: "var(--ink-dim)", fontFamily: "var(--f-mono)" }}>
            © 2026 SWISS COTTAGES SIX · CRAFTED IN BHURBAN
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 11, color: "var(--ink-dim)" }}>
            <span>v 2.0 · Spec 04</span>
            <span>Built on Next.js · Vercel</span>
            <span>Last booked · 14 min ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ============================== DESIGN SYSTEM PANEL ============================== */
const DesignSystemPanel = () => {
  const [open, setOpen] = useStateFT(false);
  const [visible, setVisible] = useStateFT(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", left: 24, bottom: 24, zIndex: 60,
          padding: "10px 14px",
          borderRadius: 999,
          background: "var(--glass-bg-strong)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--glass-bd)",
          color: "var(--ink)",
          fontSize: 12, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 8,
          transform: visible ? "translateY(0)" : "translateY(80px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "transform 320ms var(--ease-out), opacity 220ms",
        }}>
        <Icon name="sparkle" size={14} /> Design spec
      </button>

      <div style={{
        position: "fixed", left: 24, bottom: 80, zIndex: 60,
        width: 380, maxWidth: "calc(100vw - 32px)",
        maxHeight: "70vh", overflowY: "auto",
        borderRadius: "var(--r-lg)",
        background: "var(--glass-bg-strong)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        border: "1px solid var(--glass-bd)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        padding: 22,
        transform: open && visible ? "translateY(0)" : "translateY(12px)",
        opacity: open && visible ? 1 : 0,
        pointerEvents: open && visible ? "auto" : "none",
        transition: "all 320ms var(--ease-out)",
      }}
      className="no-scrollbar"
      >
        <div className="eyebrow" style={{ color: "var(--brass)" }}>Design tokens · v2.0</div>
        <h3 className="display" style={{ fontSize: 24, margin: "8px 0 18px" }}>The system at a glance</h3>

        {/* Colors */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10 }}>Color · Tailwind tokens</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 22 }}>
          {[
            { n: "brass", v: "#B89968" },
            { n: "pine",  v: "#4A5A3E" },
            { n: "ink",   v: "#F1EDE4" },
            { n: "bg",    v: "#131210" },
            { n: "surf",  v: "#211E19" },
            { n: "rose",  v: "#B86A4A" },
            { n: "star",  v: "#E6C477" },
            { n: "trust", v: "#C9A96E" },
          ].map(c => (
            <div key={c.n}>
              <div style={{ aspectRatio: "1", borderRadius: 8, background: c.v, border: "1px solid var(--line)" }} />
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, marginTop: 4, color: "var(--ink-mute)" }}>{c.n}</div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--ink-dim)" }}>{c.v}</div>
            </div>
          ))}
        </div>

        {/* Type */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10 }}>Type pairing</div>
        <div style={{ padding: 14, borderRadius: 10, border: "1px solid var(--line)", marginBottom: 20 }}>
          <div className="display" style={{ fontSize: 28, lineHeight: 1.05 }}>Cormorant Garamond</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--ink-dim)", marginBottom: 12 }}>display · 400 / 400 italic / 500</div>
          <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>Manrope — the UI sans.</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--ink-dim)" }}>body · 400 / 500 / 600 / 700</div>
        </div>

        {/* Motion */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10 }}>Motion · Framer Motion specs</div>
        <div style={{ fontSize: 12, color: "var(--ink-mute)", lineHeight: 1.7, marginBottom: 20 }}>
          <div><strong style={{ color: "var(--ink)" }}>Entrance:</strong> <code style={{ fontFamily: "var(--f-mono)" }}>fadeUp · 900ms · ease-out · stagger 120ms</code></div>
          <div><strong style={{ color: "var(--ink)" }}>Hover lift:</strong> <code style={{ fontFamily: "var(--f-mono)" }}>spring · stiffness 280 · damping 22</code></div>
          <div><strong style={{ color: "var(--ink)" }}>Image scale:</strong> <code style={{ fontFamily: "var(--f-mono)" }}>scale 1 → 1.06 · 700ms · easeOut</code></div>
          <div><strong style={{ color: "var(--ink)" }}>FAB pulse:</strong> <code style={{ fontFamily: "var(--f-mono)" }}>ring 0.85 → 1.8 · 2.4s · infinite</code></div>
          <div><strong style={{ color: "var(--ink)" }}>Panel:</strong> <code style={{ fontFamily: "var(--f-mono)" }}>spring(0.34, 1.56, 0.64, 1) · 380ms</code></div>
        </div>

        {/* Component tree */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10 }}>Next.js component tree</div>
        <pre style={{
          fontFamily: "var(--f-mono)", fontSize: 10.5,
          background: "var(--bg)", border: "1px solid var(--line)",
          padding: 12, borderRadius: 8, margin: 0,
          color: "var(--ink-mute)", lineHeight: 1.6, overflow: "auto",
        }}>{`app/
└─ (marketing)/
   └─ page.tsx
       ├─ <SiteNav />
       ├─ <Hero />
       │   └─ <BookingBar />
       ├─ <SocialProof />
       │   ├─ <TrustStats />
       │   └─ <ReviewMarquee />
       ├─ <Showcase />
       │   ├─ <BentoGrid />
       │   └─ <ExperiencesRow />
       ├─ <SeoFooter />
       └─ <AiBookingHub />     ← client component
           ├─ <ChatTab />        (RAG)
           ├─ <VoiceTab />       (WebRTC)
           └─ <DirectTab />      (deep link)`}</pre>
      </div>
    </>
  );
};

Object.assign(window, { Footer, DesignSystemPanel });
