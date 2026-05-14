/* global React */
const { useState: useStateSH } = React;

/* ============================== SHOWCASE (BENTO) ============================== */

const ShowcaseImg = ({ label, tag, ratio = "4 / 3", children, accent }) => (
  <div className="placeholder-img" style={{
    aspectRatio: ratio, borderRadius: "var(--r-lg)",
    position: "relative", height: "100%", width: "100%",
    border: "1px solid var(--line)",
    overflow: "hidden",
  }}>
    {accent && (
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 60% 40%, ${accent}, transparent 65%)`,
      }} />
    )}
    {children}
    <div className="ph-label">
      <span>// {label}</span>
      <span className="ph-tag">{tag}</span>
    </div>
  </div>
);

const HoverCard = ({ children, reveal }) => {
  const [hover, setHover] = useStateSH(false);
  return (
    <div
      className="hover-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: "var(--r-lg)",
        height: "100%",
      }}>
      <div style={{
        transition: "transform 700ms var(--ease-out)",
        transform: hover ? "scale(1.06)" : "scale(1)",
        height: "100%",
      }}>
        {children}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 40%, rgba(19,18,16,0.92) 100%)",
        opacity: hover ? 1 : 0.65, transition: "opacity 320ms",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: 22, right: 22, bottom: 22,
        transform: hover ? "translateY(0)" : "translateY(12px)",
        opacity: hover ? 1 : 0.85,
        transition: "transform 460ms var(--ease-out), opacity 320ms",
        color: "var(--ink)",
      }}>
        {reveal}
      </div>
    </div>
  );
};

const RevealBody = ({ eyebrow, title, sub, meta }) => (
  <>
    <div className="eyebrow" style={{ color: "var(--brass)" }}>{eyebrow}</div>
    <div className="display" style={{ fontSize: 28, marginTop: 6, color: "#fff" }}>{title}</div>
    {sub && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6, maxWidth: 360 }}>{sub}</div>}
    {meta && <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
      {meta.map((m,i) => (
        <span key={i} style={{ fontSize: 11, padding: "5px 10px", borderRadius: 999,
          background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)",
          fontFamily: "var(--f-mono)", letterSpacing: "0.05em" }}>{m}</span>
      ))}
    </div>}
  </>
);

const Showcase = () => {
  return (
    <section id="cottages" className="section">
      <div className="container">
        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--brass)" }}>Cottage Six · the flagship · 1.4 acres</span>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "12px 0 0" }}>
              The corner cottage.<br/>
              <span className="display-italic">Six</span> of <span style={{ color: "var(--brass)" }}>twelve</span>.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--ink-mute)", maxWidth: 460, justifySelf: "end", margin: 0 }}>
            Cottage Six sits at the corner of the estate — the largest in the community,
            with a private acre, three fireplaces, and an east-facing deck onto the Kashmir peaks.
            Cottages 3, 7, 8 and 9 are also available when our schedule allows.
          </p>
        </header>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "180px",
          gap: 14,
        }}>
          {/* Hero suite */}
          <div style={{ gridColumn: "span 7", gridRow: "span 3" }}>
            <HoverCard reveal={
              <RevealBody
                eyebrow="Suite 03 · Pine Loft"
                title="The flagship: two floors, three fireplaces."
                sub="King bed, cedar bath, library nook with a window seat over the valley. 68 m²."
                meta={["2 floors", "Sleeps 3", "Cedar bath", "Fireplace × 3"]} />
            }>
              <ShowcaseImg label="SUITE_03 — pine loft, hero shot" tag="68 m²" ratio="auto" />
            </HoverCard>
          </div>

          <div style={{ gridColumn: "span 5", gridRow: "span 2" }}>
            <HoverCard reveal={
              <RevealBody
                eyebrow="The deck"
                title="A cedar deck wraps every suite."
                sub="Coffee at 6:30, mist clearing by 9, valley by 11." />
            }>
              <ShowcaseImg label="DECK — cedar wrap, mist" tag="east" accent="rgba(184,153,104,0.18)" />
            </HoverCard>
          </div>

          <div style={{ gridColumn: "span 5", gridRow: "span 2" }}>
            <HoverCard reveal={
              <RevealBody
                eyebrow="The kitchen"
                title="A chef on call, or cook your own."
                sub="Pre-stocked pantry on arrival. Chef Imran from 6pm if you'd like."
                meta={["Pantry incl.", "Chef ₨ 8,500"]} />
            }>
              <ShowcaseImg label="KITCHEN — open hearth, copper" tag="dawn" />
            </HoverCard>
          </div>

          {/* Row 2 */}
          <div style={{ gridColumn: "span 3", gridRow: "span 2" }}>
            <HoverCard reveal={
              <RevealBody eyebrow="The library" title="A small library." sub="3,200 books, one cat." />
            }>
              <ShowcaseImg label="LIBRARY — books, cat" tag="all day" />
            </HoverCard>
          </div>
          <div style={{ gridColumn: "span 4", gridRow: "span 2" }}>
            <HoverCard reveal={
              <RevealBody eyebrow="The bath" title="Cedar tub. Mountain water." sub="A small ritual at dusk." meta={["Hot 24/7"]} />
            }>
              <ShowcaseImg label="BATH — cedar soak" tag="dusk" />
            </HoverCard>
          </div>

          <div style={{ gridColumn: "span 5", gridRow: "span 2" }}>
            <HoverCard reveal={
              <RevealBody
                eyebrow="Amenities · all suites"
                title="Eleven small things that add up."
                meta={["Wi-Fi 600/600", "Heated floors", "Electric BMW charger", "Concierge 24/7"]} />
            }>
              <ShowcaseImg label="AMENITIES — overhead flatlay" tag="kit" />
            </HoverCard>
          </div>
        </div>

        {/* Experiences strip */}
        <div id="experiences" style={{ marginTop: 100 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40 }}>
            <h3 className="display" style={{ fontSize: 44, margin: 0 }}>
              Nearby, by <span className="display-italic">foot or car</span>.
            </h3>
            <a className="btn btn-ghost" href="#experiences">All 14 experiences <Icon name="arrow" size={14} /></a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {[
              { eyebrow: "12 min walk", title: "Bhurban ridge trail", desc: "An easy 4 km loop along the pines. Best at golden hour.", icon: "leaf" },
              { eyebrow: "20 min drive", title: "Kashmir Point", desc: "The classic Murree viewpoint. Snow most of December–March.", icon: "mountain" },
              { eyebrow: "35 min drive", title: "Patriata chairlift", desc: "Two-stage chairlift up to 2,300 m. Bring a jacket.", icon: "award" },
              { eyebrow: "On site", title: "Cedar bath ritual", desc: "Bookable 7–9pm. Tea & a soak. Made for cold nights.", icon: "flame" },
            ].map((e, i) => (
              <div key={i} style={{
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
              }}>
                <ShowcaseImg label={e.title.toUpperCase()} tag={e.eyebrow} ratio="5 / 4" />
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="eyebrow" style={{ color: "var(--brass)" }}>{e.eyebrow}</span>
                    <Icon name={e.icon} size={16} />
                  </div>
                  <div className="display" style={{ fontSize: 22, marginTop: 8 }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 8 }}>{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Showcase });
