/* global React, Icon */
const { useState: useStateGC, useEffect: useEffectGC, useRef: useRefGC } = React;

/* ============================== GATED COMMUNITY ==============================
   Exclusivity + location highlights. Twelve-cottage grid that fills in as you
   scroll into view (only six are ours / available), reinforcing scarcity.
   ============================================================================ */

const Counter12 = ({ to, suffix = "", duration = 1800, decimals = 0 }) => {
  const [val, setVal] = useStateGC(0);
  const ref = useRefGC(null);
  const startedRef = useRefGC(false);
  useEffectGC(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
};

const CottageGrid = () => {
  const [revealed, setRevealed] = useStateGC(0);
  const ref = useRefGC(null);
  useEffectGC(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && revealed === 0) {
          let i = 0;
          const id = setInterval(() => {
            i += 1;
            setRevealed(i);
            if (i >= 12) clearInterval(id);
          }, 130);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  // 12 cottages total — #3, 6, 7, 8, 9 are bookable; the rest are private residences
  const BOOKABLE = [3, 6, 7, 8, 9];
  const cottages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    ours: BOOKABLE.includes(i + 1),
  }));

  return (
    <div ref={ref} style={{
      padding: 32,
      borderRadius: "var(--r-lg)",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* faint topo map background */}
      <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}>
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(184,153,104,0.5)" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#dots)" />
        <path d="M-20,180 Q80,120 200,140 T420,100" stroke="rgba(184,153,104,0.3)" strokeWidth="1" fill="none" />
        <path d="M-20,220 Q120,180 240,200 T420,170" stroke="rgba(184,153,104,0.18)" strokeWidth="1" fill="none" />
        <path d="M-20,260 Q140,230 260,250 T420,230" stroke="rgba(184,153,104,0.1)" strokeWidth="1" fill="none" />
      </svg>

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div className="eyebrow" style={{ color: "var(--brass)" }}>The community · plan view</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-dim)" }}>
            <span style={{ color: "var(--brass)" }}>●</span> Available · <span style={{ color: "var(--ink-dim)" }}>○</span> Neighbours
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          margin: "24px 0",
        }}>
          {cottages.map((c, i) => (
            <div key={c.id} style={{
              aspectRatio: "1.4 / 1",
              borderRadius: 10,
              border: `1px solid ${c.ours ? "var(--brass)" : "var(--line-2)"}`,
              background: c.ours ? "rgba(184,153,104,0.12)" : "rgba(241,237,228,0.02)",
              display: "grid", placeItems: "center",
              position: "relative",
              opacity: i < revealed ? 1 : 0,
              transform: i < revealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
              transition: "opacity 400ms var(--ease-out), transform 500ms var(--ease-spring)",
            }}>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                color: c.ours ? "var(--brass)" : "var(--ink-dim)",
                fontWeight: 600,
              }}>{String(c.id).padStart(2, "0")}</div>
              {c.ours && (
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  width: 6, height: 6, borderRadius: 999,
                  background: "var(--brass)",
                  boxShadow: "0 0 8px var(--brass)",
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 16, borderTop: "1px dashed var(--line)",
        }}>
          <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>5 of 12</span> cottages
            available to book — the rest are private residences.
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--ink-dim)" }}>
            EST. 1998
          </div>
        </div>
      </div>
    </div>
  );
};

const GatedCommunity = () => {
  const highlights = [
    {
      icon: "award", eyebrow: "5 minutes",
      title: "PC Bhurban & Golf Course",
      desc: "Pearl Continental hotel, championship golf, and the Bhurban dining strip — all under a five-minute drive from our gate.",
      meta: "0.4 km / 5 min drive",
    },
    {
      icon: "mountain", eyebrow: "Panoramic",
      title: "Snow-capped Kashmir peaks",
      desc: "Every cottage is sited for a clear, east-facing view of the Pir Panjal range. Snow caps visible nine months of the year.",
      meta: "Elevation 6,800 ft",
    },
    {
      icon: "users", eyebrow: "24/7",
      title: "Manned gate & on-site maintenance",
      desc: "Single point of entry, screened security, and a live-in caretaker. Private parking for two cars per cottage.",
      meta: "Response < 4 min",
    },
  ];

  return (
    <section id="community" className="section" style={{
      background: "var(--bg-2)",
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div className="container">
        <header style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "end", marginBottom: 70 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--brass)" }}>The gated community · Bhurban Heights</span>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5.4vw, 76px)", margin: "14px 0 0", maxWidth: 760 }}>
              An exclusive enclave of
              {" "}<span className="display-italic" style={{ color: "var(--brass)" }}>
                <Counter12 to={12} duration={1600} />
              </span>{" "}
              luxury cottages.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--ink-mute)", maxWidth: 480, justifySelf: "end", margin: 0, lineHeight: 1.6 }}>
            Built on a private 4-acre estate in the heart of Bhurban, with a single
            manned gate and round-the-clock security. There are only twelve cottages
            here — and only five of them are ours to lend.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "stretch" }}>
          {/* Left — the 12 cottage grid */}
          <CottageGrid />

          {/* Right — location highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {highlights.map((h, i) => (
              <div key={i} style={{
                padding: 26,
                borderRadius: "var(--r-lg)",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 22,
                alignItems: "start",
                flex: 1,
                transition: "border-color 280ms, transform 280ms var(--ease-out)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brass)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  border: "1px solid var(--brass)",
                  background: "rgba(184,153,104,0.08)",
                  display: "grid", placeItems: "center",
                  color: "var(--brass)",
                }}>
                  <Icon name={h.icon} size={22} stroke={1.6} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <span className="eyebrow" style={{ color: "var(--brass)" }}>{h.eyebrow}</span>
                  <div className="display" style={{ fontSize: 24, margin: "6px 0 8px" }}>{h.title}</div>
                  <p style={{ fontSize: 13, color: "var(--ink-mute)", margin: 0, lineHeight: 1.55 }}>{h.desc}</p>
                </div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 10,
                  color: "var(--ink-dim)", letterSpacing: "0.06em",
                  textAlign: "right", whiteSpace: "nowrap",
                  paddingTop: 6,
                }}>
                  {h.meta}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — exclusivity bar */}
        <div style={{
          marginTop: 28,
          padding: "22px 28px",
          borderRadius: "var(--r-lg)",
          background: "var(--surface)",
          border: "1px dashed var(--line-2)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 18,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999, background: "var(--brass)",
              animation: "pulse-dot 1.8s infinite",
            }} />
            <span style={{ fontSize: 13, color: "var(--ink-mute)" }}>
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>2 cottages available</span> for the coming season ·
              waitlist averages 11 weeks
            </span>
          </div>
          <a href="#book" className="btn btn-primary" style={{ padding: "12px 20px", fontSize: 13 }}>
            Hold a cottage <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { GatedCommunity });
