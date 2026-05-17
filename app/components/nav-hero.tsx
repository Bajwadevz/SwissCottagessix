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
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bg)" />
              <stop offset="65%" stopColor="var(--bg-2)" />
              <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bg)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="midFog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bg)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#skyGrad)" />

          {/* Distant ghost peaks — barely visible, high elevation */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 160]) }}>
            <path
              d="M0,500 L100,360 L260,440 L460,210 L660,360 L840,255 L1020,330 L1200,270 L1200,800 L0,800 Z"
              fill="var(--surface)"
              opacity="0.12"
            />
          </motion.g>

          {/* Far mountains — primary ridge */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 110]) }}>
            <path
              d="M0,570 L160,410 L320,500 L560,265 L800,440 L1020,330 L1200,395 L1200,800 L0,800 Z"
              fill="var(--surface)"
              opacity="0.28"
              stroke="var(--brass)"
              strokeWidth="0.6"
              strokeOpacity="0.09"
            />
          </motion.g>

          {/* Mid mountains — secondary ridge, slightly warmer */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 65]) }}>
            <path
              d="M-80,650 L120,490 L360,590 L640,415 L880,530 L1100,440 L1300,510 L1300,800 L-80,800 Z"
              fill="var(--surface-2)"
              opacity="0.48"
              stroke="var(--brass)"
              strokeWidth="0.5"
              strokeOpacity="0.13"
            />
          </motion.g>

          {/* Near foothills — rolling hills closer */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 35]) }}>
            <path
              d="M-60,710 L80,590 L240,660 L460,555 L680,635 L920,565 L1100,610 L1300,575 L1300,800 L-60,800 Z"
              fill="var(--surface)"
              opacity="0.62"
            />
          </motion.g>

          {/* Pine treeline silhouette */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 18]) }}>
            <path
              d="M-20,800 L-20,748 L0,702 L20,748 L38,694 L58,748 L76,682 L96,748 L116,688 L136,748 L156,672 L176,748 L198,696 L218,748 L238,676 L258,748 L278,682 L300,748 L320,668 L342,748 L362,686 L382,748 L402,678 L424,748 L444,663 L466,748 L486,682 L508,748 L528,670 L550,748 L570,686 L592,748 L612,666 L634,748 L654,682 L676,748 L696,672 L718,748 L738,660 L760,748 L780,678 L802,748 L822,670 L844,748 L864,684 L886,748 L906,666 L928,748 L948,678 L970,748 L990,663 L1012,748 L1032,682 L1054,748 L1074,670 L1096,748 L1116,666 L1138,748 L1158,682 L1180,748 L1200,668 L1222,748 L1222,800 Z"
              fill="var(--pine)"
              opacity="0.22"
            />
          </motion.g>

          {/* Primary cloud bank — drifts left on scroll */}
          <motion.g style={{ x: useTransform(scrollY, [0, 1000], [0, -80]) }}>
            <ellipse cx="155" cy="345" rx="95" ry="30" fill="var(--ink)" opacity="0.038" />
            <ellipse cx="125" cy="354" rx="62" ry="21" fill="var(--ink)" opacity="0.028" />
            <ellipse cx="200" cy="350" rx="52" ry="18" fill="var(--ink)" opacity="0.022" />
            <ellipse cx="755" cy="268" rx="105" ry="32" fill="var(--ink)" opacity="0.032" />
            <ellipse cx="722" cy="277" rx="68" ry="22" fill="var(--ink)" opacity="0.026" />
            <ellipse cx="808" cy="273" rx="58" ry="19" fill="var(--ink)" opacity="0.018" />
            <ellipse cx="1055" cy="385" rx="82" ry="25" fill="var(--ink)" opacity="0.028" />
            <ellipse cx="1022" cy="392" rx="52" ry="17" fill="var(--ink)" opacity="0.022" />
          </motion.g>

          {/* Secondary cloud layer — slower drift */}
          <motion.g style={{ x: useTransform(scrollY, [0, 1000], [0, -38]) }}>
            <ellipse cx="355" cy="302" rx="72" ry="22" fill="var(--ink)" opacity="0.022" />
            <ellipse cx="605" cy="382" rx="88" ry="26" fill="var(--ink)" opacity="0.018" />
            <ellipse cx="908" cy="318" rx="64" ry="19" fill="var(--ink)" opacity="0.018" />
          </motion.g>

          {/* Foreground — ground, glow, cabin, trees */}
          <motion.g style={{ y: useTransform(scrollY, [0, 1000], [0, 22]) }}>
            <path d="M0,800 Q200,668 600,728 T1200,698 L1200,800 Z" fill="var(--surface)" opacity="0.55" />

            {/* Warm ambient glow — lantern / moon */}
            <circle cx="600" cy="562" r="130" fill="var(--brass)" opacity="0.055" />
            <circle cx="600" cy="562" r="220" fill="var(--brass)" opacity="0.022" />

            {/* A-frame cabin & pine grove */}
            <g stroke="var(--brass)" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" transform="translate(600, 645) scale(1.2)">
              {/* Ground datum lines */}
              <line x1="-145" y1="70" x2="-88" y2="70" opacity="0.45" />
              <line x1="88" y1="70" x2="135" y2="70" opacity="0.45" />

              {/* Main A-frame structure */}
              <line x1="0" y1="-94" x2="76" y2="70" />
              <line x1="-26" y1="-94" x2="-98" y2="70" />
              <line x1="0" y1="-94" x2="-60" y2="70" />

              {/* Right roof shingle marks */}
              <line x1="15" y1="-60" x2="21" y2="-60" />
              <line x1="30" y1="-26" x2="36" y2="-26" />
              <line x1="45" y1="8" x2="51" y2="8" />
              <line x1="60" y1="42" x2="66" y2="42" />

              {/* Left roof horizontal slats */}
              <line x1="-13" y1="-63" x2="-32" y2="-63" />
              <line x1="-25" y1="-31" x2="-50" y2="-31" />
              <line x1="-37" y1="1" x2="-68" y2="1" />
              <line x1="-48" y1="33" x2="-84" y2="33" />
              <line x1="-59" y1="62" x2="-97" y2="62" />

              {/* Ridge cap */}
              <line x1="-26" y1="-94" x2="0" y2="-94" />

              {/* Chimney */}
              <rect x="18" y="-114" width="9" height="24" rx="1.5" />
              <line x1="16" y1="-114" x2="29" y2="-114" />

              {/* Arched front door */}
              <path d="M-14,70 V38 A14,14 0 0,1 14,38 V70" />
              <circle cx="7" cy="56" r="2" fill="var(--brass)" />

              {/* Centre window */}
              <rect x="-3" y="5" width="6" height="15" rx="1.5" />

              {/* Porch step */}
              <line x1="-20" y1="70" x2="20" y2="70" />

              {/* Pine trees */}
              <g strokeWidth="1.25">
                {/* Left tall pine */}
                <g transform="translate(-155, 70)">
                  <line x1="0" y1="0" x2="0" y2="-106" />
                  <path d="M-12,-93 L0,-106 L12,-93 M-12,-77 L0,-90 L12,-77 M-13,-61 L0,-74 L13,-61 M-14,-45 L0,-58 L14,-45 M-14,-29 L0,-42 L14,-29 M-13,-13 L0,-26 L13,-13" />
                </g>

                {/* Left short pine */}
                <g transform="translate(-120, 70)">
                  <line x1="0" y1="0" x2="0" y2="-80" />
                  <path d="M-10,-68 L0,-80 L10,-68 M-10,-53 L0,-65 L10,-53 M-11,-38 L0,-50 L11,-38 M-11,-23 L0,-35 L11,-23 M-10,-8 L0,-20 L10,-8" />
                </g>

                {/* Right tall pine */}
                <g transform="translate(116, 70)">
                  <line x1="0" y1="0" x2="0" y2="-106" />
                  <path d="M-12,-93 L0,-106 L12,-93 M-12,-77 L0,-90 L12,-77 M-13,-61 L0,-74 L13,-61 M-14,-45 L0,-58 L14,-45 M-14,-29 L0,-42 L14,-29 M-13,-13 L0,-26 L13,-13" />
                </g>

                {/* Right small pine */}
                <g transform="translate(143, 70)">
                  <line x1="0" y1="0" x2="0" y2="-64" />
                  <path d="M-8,-53 L0,-64 L8,-53 M-9,-39 L0,-50 L9,-39 M-9,-25 L0,-36 L9,-25 M-8,-11 L0,-22 L8,-11" />
                </g>
              </g>
            </g>
          </motion.g>

          {/* Mid-ground mist layer */}
          <rect x="0" y="555" width="100%" height="245" fill="url(#midFog)" opacity="0.65" />

          {/* Bottom fade to bg */}
          <rect x="0" y="640" width="100%" height="160" fill="url(#fogGrad)" opacity="1" />
        </svg>

        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>\")"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </motion.div>

      <div className="container relative z-[2] pb-[340px] pt-[22vh] md:pb-[200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border border-glass-bd bg-glass-bg px-3.5 py-2 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-brass" />
          <span className="eyebrow text-ink">Bhurban, Murree Hills · Private Gated Estate · 2 min from PC Bhurban · 6,800 ft</span>
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
          An exclusive gated sanctuary at 6,800 ft in the Murree Hills — twelve private residences where alpine solitude meets the timeless grandeur of Kashmir's mist-draped peaks.
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
            { label: "Booked nights", value: "92%", sub: "summer 2025" },
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
