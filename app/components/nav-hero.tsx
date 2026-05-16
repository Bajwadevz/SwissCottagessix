"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

import { useSiteTheme } from "@/app/providers";
import { Icon } from "@/lib/icon";

const stepperBtn: CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 999,
  border: "1px solid var(--line-2)",
  background: "transparent",
  color: "var(--ink)",
  display: "grid",
  placeItems: "center",
};

function BookingField({
  label,
  icon,
  value,
  divider,
}: {
  label: string;
  icon: ComponentProps<typeof Icon>["name"];
  value: ReactNode;
  divider?: boolean;
}) {
  return (
    <div
      style={{
        padding: "6px 22px",
        borderLeft: divider ? "1px solid var(--glass-bd)" : "none",
        minWidth: 0,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon name={icon} size={14} />
        <span className="eyebrow">{label}</span>
      </div>
      <div
        className="mt-1.5 text-sm font-semibold text-ink"
        style={{ whiteSpace: "nowrap" }}
      >
        {value}
      </div>
    </div>
  );
}

export function Nav() {
  const { theme, toggleTheme } = useSiteTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="nav-links-wrapper fixed left-0 right-0 top-0 z-50"
      style={{
        padding: scrolled ? "14px 0" : "26px 0",
        transition:
          "padding 320ms var(--ease-out), background 320ms var(--ease-out), border-color 320ms",
        background: scrolled ? "var(--glass-bg-strong)" : "transparent",
        backdropFilter: scrolled ? "blur(22px) saturate(150%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px) saturate(150%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 whitespace-nowrap">
          <div className="grid size-10 place-items-center rounded-full border border-brass text-brass shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]">
              <path d="M2 20h20" />
              <path d="M12 3l8 17" />
              <path d="M10 3l-8 17" />
              <path d="M12 3l-5 17" />
              <path d="M10.8 7H9" />
              <path d="M10 11H7" />
              <path d="M9.2 15H5" />
              <path d="M13 20v-5a1.5 1.5 0 0 1 3 0v5" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="display text-[22px] tracking-wide">Swiss Cottages</div>
            <div className="eyebrow text-[9px] text-brass">SIX · BHURBAN</div>
          </div>
        </a>
        <div className="nav-links hidden items-center gap-9 md:flex">
          {["Cottages", "Experiences", "Reviews"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[13px] font-medium text-ink-mute transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-[38px] place-items-center rounded-full border border-line-2 bg-transparent text-ink"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>
          <a href="#book" className="btn btn-primary py-2.5 pl-[18px] pr-[18px] text-[13px]">
            Reserve <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  const [guests, setGuests] = useState(4);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0 z-0 bg-bg overflow-hidden" style={{ y }}>
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full opacity-80"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bg)" />
              <stop offset="100%" stopColor="var(--bg-2)" />
            </linearGradient>
            <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="var(--bg)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#skyGrad)" />

          {/* Far Mountains (Parallax slow) */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 120]) }}>
            <path
              d="M0,600 L150,450 L350,550 L600,300 L900,500 L1200,350 L1200,800 L0,800 Z"
              fill="var(--surface)"
              opacity="0.4"
              stroke="var(--brass)"
              strokeWidth="1"
              strokeOpacity="0.08"
            />
          </motion.g>

          {/* Mid Mountains (Parallax medium) */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 70]) }}>
            <path
              d="M-100,700 L200,500 L450,650 L800,450 L1000,550 L1300,450 L1300,800 L-100,800 Z"
              fill="var(--surface-2)"
              opacity="0.6"
              stroke="var(--brass)"
              strokeWidth="1"
              strokeOpacity="0.12"
            />
          </motion.g>

          {/* Clouds (Parallax horizontal) */}
          <motion.g style={{ x: useTransform(scrollY, [0, 1000], [0, -120]) }}>
            <path
              d="M100,400 Q150,350 200,400 Q250,380 300,420 Q200,450 100,400 Z"
              fill="var(--ink)"
              opacity="0.03"
            />
            <path
              d="M700,300 Q750,250 800,300 Q850,280 900,320 Q800,350 700,300 Z"
              fill="var(--ink)"
              opacity="0.02"
            />
            <path
              d="M1000,450 Q1050,400 1100,450 Q1150,430 1200,470 Q1100,500 1000,450 Z"
              fill="var(--ink)"
              opacity="0.025"
            />
          </motion.g>

          {/* Foreground Minimalist Line-Art Logo Motif */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 25]) }}>
            {/* Ground Mask/Backdrop */}
            <path d="M0,800 Q300,600 600,700 T1200,650 L1200,800 Z" fill="var(--surface)" />
            
            {/* Sun/Moon Glow */}
            <circle cx="600" cy="550" r="140" fill="var(--brass)" opacity="0.08" />

            <g stroke="var(--brass)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(600, 620) scale(1.1)">
              {/* Ground Lines under Cabin */}
              <line x1="-120" y1="80" x2="-80" y2="80" />
              <line x1="80" y1="80" x2="100" y2="80" />

              {/* The Cabin */}
              <g>
                {/* Right Roof Slope */}
                <line x1="0" y1="-80" x2="80" y2="80" />
                {/* Right Roof Notches */}
                <line x1="16.5" y1="-47" x2="22" y2="-47" />
                <line x1="33" y1="-14" x2="38" y2="-14" />
                <line x1="49.5" y1="19" x2="55" y2="19" />
                <line x1="66" y1="52" x2="71" y2="52" />

                {/* Left Roof Slopes (Ladder style) */}
                <line x1="-20" y1="-80" x2="-100" y2="80" />
                <line x1="0" y1="-80" x2="-60" y2="80" />
                
                {/* Horizontal Slats on Left Roof */}
                <line x1="-10" y1="-53.3" x2="-26.6" y2="-53.3" />
                <line x1="-20" y1="-26.6" x2="-43.3" y2="-26.6" />
                <line x1="-30" y1="0" x2="-60" y2="0" />
                <line x1="-40" y1="26.6" x2="-76.6" y2="26.6" />
                <line x1="-50" y1="53.3" x2="-93.3" y2="53.3" />
                
                {/* Top horizontal connector */}
                <line x1="-20" y1="-80" x2="0" y2="-80" />

                {/* Arched Door */}
                <path d="M-15,80 V50 A15,15 0 0,1 15,50 V80" />
                {/* Door Handle */}
                <circle cx="6" cy="65" r="1.5" fill="var(--brass)" />

                {/* Vertical Window */}
                <rect x="-2" y="15" width="4" height="12" rx="1" />
              </g>

              {/* Trees */}
              <g strokeWidth="1.2">
                {/* Tree Left 1 (Taller) */}
                <g transform="translate(-130, 80)">
                  <line x1="0" y1="0" x2="0" y2="-90" />
                  <path d="M-10,-80 L0,-90 L10,-80 M-10,-65 L0,-75 L10,-65 M-10,-50 L0,-60 L10,-50 M-10,-35 L0,-45 L10,-35 M-10,-20 L0,-30 L10,-20 M-10,-5 L0,-15 L10,-5" />
                </g>
                
                {/* Tree Left 2 (Shorter) */}
                <g transform="translate(-105, 80)">
                  <line x1="0" y1="0" x2="0" y2="-70" />
                  <path d="M-8,-60 L0,-70 L8,-60 M-8,-45 L0,-55 L8,-45 M-8,-30 L0,-40 L8,-30 M-8,-15 L0,-25 L8,-15" />
                </g>

                {/* Tree Right */}
                <g transform="translate(115, 80)">
                  <line x1="0" y1="0" x2="0" y2="-90" />
                  <path d="M-10,-80 L0,-90 L10,-80 M-10,-65 L0,-75 L10,-65 M-10,-50 L0,-60 L10,-50 M-10,-35 L0,-45 L10,-35 M-10,-20 L0,-30 L10,-20 M-10,-5 L0,-15 L10,-5" />
                </g>
              </g>
            </g>
          </motion.g>

          {/* Atmosphere Fog */}
          <rect x="0" y="500" width="100%" height="300" fill="url(#fog)" opacity="0.9" />
        </svg>

        <div
          className="absolute inset-0 mix-blend-overlay opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>\")"
          }}
        />
        
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg"
        />
      </motion.div>

      <div className="container relative z-[2] pb-[340px] pt-[22vh] md:pb-[200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border border-glass-bd bg-glass-bg px-3.5 py-2 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-brass" />
          <span className="eyebrow text-ink">Bhurban, Murree Hills · Gated Estate · 5 min from PC Bhurban · 6,800 ft</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="display mt-7 max-w-[1100px] text-[clamp(56px,8.5vw,124px)] leading-none text-ink"
        >
          Exclusivity
          <br />
          above the <span className="display-italic text-brass">clouds</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[640px] text-[19px] text-ink-mute leading-relaxed"
        >
          Luxury private cottages near PC Bhurban, Murree Hills. An elite gated sanctuary of twelve residences at 6,800 ft — where uncompromised luxury meets the Kashmir peaks and mountain mist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-3.5"
        >
          <a href="#book" className="btn btn-primary">
            Check availability <Icon name="arrow" size={14} />
          </a>
          <a
            href="#gallery"
            className="btn btn-ghost border-line-2 text-ink hover:bg-line-2"
          >
            <Icon name="play" size={12} /> Explore the estate
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 flex flex-wrap gap-8"
        >
          {[
            { label: "Guest score", value: "9.2", sub: "/ 10 · 384 stays" },
            { label: "Repeat guests", value: "95%", sub: "they never want to leave" },
            { label: "Booked nights", value: "92%", sub: "summer '25" },
          ].map((s) => (
            <div key={s.label} className="border-l border-line-2 pl-4">
              <div className="eyebrow text-ink-mute">{s.label}</div>
              <div className="display text-[32px] text-ink">
                {s.value}{" "}
                <span className="font-sans text-[13px] font-normal text-ink-dim">{s.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        id="book"
        className="absolute bottom-9 left-1/2 z-[3] w-[min(1200px,calc(100%-60px))] -translate-x-1/2"
      >
        <div className="glass glass-strong p-[18px] md:p-[18px_22px]">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:gap-0">
            <BookingField label="Suite" icon="bed" value="Cottage 03 · Cedar" />
            <BookingField label="Arrive" icon="calendar" value="Fri · 12 Jun" divider />
            <BookingField label="Depart" icon="calendar" value="Mon · 15 Jun" divider />
            <BookingField
              label="Guests"
              icon="users"
              divider
              value={
                <span className="flex items-center gap-2.5">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    style={stepperBtn}
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  >
                    <Icon name="minus" size={12} />
                  </button>
                  <span className="min-w-[22px] text-center">{guests}</span>
                  <button
                    type="button"
                    aria-label="More guests"
                    style={stepperBtn}
                    onClick={() => setGuests((g) => Math.min(12, g + 1))}
                  >
                    <Icon name="plus" size={12} />
                  </button>
                </span>
              }
            />
            <div className="pl-0 pt-2 md:pl-[18px] md:pt-0">
              <button type="button" className="btn btn-primary px-6 py-3.5">
                Check rates <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
