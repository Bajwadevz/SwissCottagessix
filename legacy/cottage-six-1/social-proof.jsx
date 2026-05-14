/* global React */
const { useState: useStateSP, useRef: useRefSP, useEffect: useEffectSP } = React;

/* ============================== SOCIAL PROOF ============================== */
/* Original platform badges — NOT recreations of any brand's UI.
   Each "channel" is rendered as a neutral monogram chip with a generic shape. */

const REVIEWS = [
  { name: "Eleanor Whitfield", country: "🇬🇧", flag: "UK", score: 9.8, channel: "STAY-A",
    quote: "A slice of the Swiss Alps in Pakistan. The security and the views are unmatched — we slept with the curtains open every night.", date: "Mar 2026", nights: 5 },
  { name: "Marcus Hale",      country: "🇺🇸", flag: "US", score: 9.6, channel: "STAY-B",
    quote: "The AI booking was flawless — quoted, held, and confirmed in under three minutes. Best stay in the Murree hills, hands down.", date: "Feb 2026", nights: 4 },
  { name: "Hessa Al-Mansouri",country: "🇦🇪", flag: "UAE", score: 9.7, channel: "STAY-C",
    quote: "Total privacy. Five-star service from the moment our car was waved through the gate. Perfect for a family retreat.", date: "Feb 2026", nights: 6 },
  { name: "Daniel Beaulieu",   country: "🇨🇦", flag: "CA", score: 9.5, channel: "STAY-A",
    quote: "Breathtaking views of the Kashmir peaks from our private balcony. Coffee at sunrise here is a thing I'll remember for years.", date: "Jan 2026", nights: 4 },
  { name: "Bilal Raza",        country: "🇵🇰", flag: "PK", score: 9.9, channel: "STAY-C",
    quote: "The only place in Bhurban that offers this level of gated security and modern luxury. We've already booked our next stay.", date: "Jan 2026", nights: 3 },
  { name: "Sophie Whitfield",  country: "🇬🇧", flag: "UK", score: 9.4, channel: "STAY-B",
    quote: "Everything you'd hope from a small, owner-run estate — and quiet enough that you actually hear the snow falling.", date: "Dec 2025", nights: 5 },
  { name: "Carmen Rivera",     country: "🇺🇸", flag: "US", score: 9.5, channel: "STAY-A",
    quote: "Booked sight-unseen on the strength of the reviews. They under-sell it. The cedar bath alone is worth the trip.", date: "Dec 2025", nights: 4 },
  { name: "Khalid Al-Mansouri",country: "🇦🇪", flag: "UAE", score: 9.6, channel: "STAY-C",
    quote: "Concierge anticipated everything. Chef Imran cooked one of the best meals of our year. Already planning Eid here.", date: "Nov 2025", nights: 7 },
];

const PLATFORMS = [];

/* Animated counter — counts up when scrolled into view */
const Counter = ({ to, suffix = "", duration = 1600, decimals = 0 }) => {
  const [val, setVal] = useStateSP(0);
  const ref = useRefSP(null);
  const startedRef = useRefSP(false);
  useEffectSP(() => {
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

const Stars = ({ score = 5 }) => (
  <div style={{ display: "inline-flex", gap: 2, color: "var(--star)" }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Icon key={i} name="star" size={12} />
    ))}
  </div>
);

const ReviewCard = ({ r }) => (
  <article style={{
    width: 360, flex: "0 0 360px",
    margin: "0 12px",
    padding: 26,
    borderRadius: "var(--r-lg)",
    background: "var(--surface)",
    border: "1px solid var(--line)",
    display: "flex", flexDirection: "column", gap: 16,
    transition: "transform 320ms var(--ease-out), border-color 320ms",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brass)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "none"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 999,
          background: "linear-gradient(135deg, var(--brass), var(--pine))",
          display: "grid", placeItems: "center",
          color: "#1a1610", fontWeight: 700, fontSize: 14,
        }}>{r.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
          <div style={{ fontSize: 11, color: "var(--ink-dim)", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 14 }}>{r.country}</span>
            <span>{r.flag}</span> · <span>{r.nights} nights · {r.date}</span>
          </div>
        </div>
      </div>
      <div style={{
        padding: "6px 10px", borderRadius: 8,
        background: "rgba(184,153,104,0.12)",
        border: "1px solid rgba(184,153,104,0.3)",
        color: "var(--brass)", fontWeight: 700, fontSize: 13,
        fontFamily: "var(--f-mono)",
      }}>{r.score}</div>
    </div>
    <p className="display" style={{ fontSize: 19, lineHeight: 1.32, margin: 0, color: "var(--ink)" }}>
      “{r.quote}”
    </p>
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "auto", paddingTop: 12, borderTop: "1px dashed var(--line)" }}>
      <Stars />
    </div>
  </article>
);

const SocialProof = () => {
  const [paused, setPaused] = useStateSP(false);
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="section" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 60 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--brass)" }}>Trust engine · 384 verified stays · 23 countries</span>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "12px 0 0" }}>
              <span className="display-italic">95%</span> of our guests<br/>
              come <span style={{ color: "var(--brass)" }}>back</span>.
            </h2>
          </div>
          <div style={{ fontSize: 15, color: "var(--ink-mute)", maxWidth: 460, justifySelf: "end" }}>
            Verified reviews from five continents — UK, USA, UAE, Canada, Pakistan and beyond.
            Once people stay inside the gates, they tend to return.
          </div>
        </header>

        {/* Featured loyalty badge — 95% */}
        <div style={{
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center",
          padding: "40px 48px",
          borderRadius: "var(--r-lg)",
          background: "linear-gradient(135deg, rgba(184,153,104,0.10), rgba(184,153,104,0.02) 60%), var(--surface)",
          border: "1px solid rgba(184,153,104,0.35)",
          marginBottom: 18,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 0% 50%, rgba(184,153,104,0.18), transparent 50%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "flex", alignItems: "baseline", gap: 4,
            fontFamily: "var(--f-display)",
            fontSize: "clamp(80px, 12vw, 160px)",
            fontWeight: 500, lineHeight: 0.92,
            color: "var(--brass)",
            letterSpacing: "-0.04em",
            position: "relative",
          }}>
            <Counter to={95} duration={2000} />
            <span style={{ fontSize: "0.4em" }}>%</span>
          </div>
          <div style={{ position: "relative" }}>
            <div className="eyebrow" style={{ color: "var(--brass)" }}>The loyalty stat</div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", margin: "10px 0 12px", maxWidth: 540 }}>
              Repeat guest rate. <span className="display-italic" style={{ color: "var(--ink-mute)" }}>Once people visit, they never want to leave.</span>
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-mute)", margin: 0, maxWidth: 520 }}>
              Among guests who completed a stay in the last 24 months and were eligible to return.
              Bookings logged across all three channels, deduped by passport.
            </p>
          </div>
        </div>

        {/* Stat row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          borderRadius: "var(--r-lg)",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          marginBottom: 60,
        }}>
          {[
            { node: <><Counter to={9.2} decimals={1} duration={1500} /></>, l: "Average score", s: "out of 10" },
            { node: <><Counter to={384} duration={1800} /></>, l: "Verified stays", s: "since 2022" },
            { node: <><Counter to={23} duration={1400} /></>, l: "Countries", s: "guests from" },
            { node: <><Counter to={12} duration={1600} /></>, l: "Cottages", s: "the entire community" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "30px 32px",
              borderRight: i < 3 ? "1px solid var(--line)" : "none",
            }}>
              <div className="display" style={{ fontSize: 56, color: "var(--brass)", lineHeight: 1 }}>{s.node}</div>
              <div className="eyebrow" style={{ marginTop: 10 }}>{s.l}</div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 4 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative", overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}>
        <div className={`marquee-track ${paused ? "paused" : ""}`}>
          {doubled.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { SocialProof });
