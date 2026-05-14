/* global React, ReactDOM, Nav, Hero, SocialProof, Showcase, AIHub, Footer, DesignSystemPanel */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#B89968",
  "heroVariant": "valley",
  "showBookingBar": true,
  "marqueeSpeed": 60
}/*EDITMODE-END*/;

const ACCENTS = [
  ["#B89968", "Brass"],
  ["#9C8A6A", "Stone"],
  ["#A87F4A", "Amber"],
  ["#6E7F58", "Sage"],
];

function App() {
  const t = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const [tweaks, setTweak] = t;

  // Apply theme
  useEffectApp(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
  }, [tweaks.theme]);

  // Apply accent
  useEffectApp(() => {
    const root = document.documentElement.style;
    root.setProperty("--brass", tweaks.accent);
    // derive brass-2 (lighter)
    root.setProperty("--brass-2", lighten(tweaks.accent, 0.12));
  }, [tweaks.accent]);

  // Marquee speed
  useEffectApp(() => {
    document.documentElement.style.setProperty("--marquee-speed", `${tweaks.marqueeSpeed}s`);
    document.querySelectorAll(".marquee-track").forEach(el => {
      el.style.animationDuration = `${tweaks.marqueeSpeed}s`;
    });
  }, [tweaks.marqueeSpeed]);

  return (
    <>
      <Nav
        theme={tweaks.theme}
        onTheme={() => setTweak("theme", tweaks.theme === "dark" ? "light" : "dark")}
      />
      <Hero />
      <SocialProof />
      <GatedCommunity />
      <Showcase />
      <Footer />
      <AIHub />
      <DesignSystemPanel />

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Theme">
            <window.TweakRadio
              label="Mode"
              value={tweaks.theme}
              onChange={(v) => setTweak("theme", v)}
              options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
            />
            <window.TweakColor
              label="Accent"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={ACCENTS.map(([v]) => v)}
            />
          </window.TweakSection>
          <window.TweakSection label="Motion">
            <window.TweakSlider
              label="Marquee speed"
              min={20} max={120} step={5}
              value={tweaks.marqueeSpeed}
              onChange={(v) => setTweak("marqueeSpeed", v)}
              unit="s"
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

// tiny color helper — accepts #rrggbb only
function lighten(hex, amount = 0.1) {
  const n = parseInt(hex.replace("#",""), 16);
  let r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);
  return "#" + [r,g,b].map(x => x.toString(16).padStart(2,"0")).join("");
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
