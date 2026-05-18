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
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y }}>
        <img
          src="/cottage/aerial.jpg"
          alt="Swiss Cottages Six gated estate aerial view, Bhurban Murree Hills"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,9,7,0.55)] via-[rgba(10,9,7,0.35)] to-[rgba(10,9,7,0.90)]" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,9,7,0.4)] via-transparent to-transparent" />
      </motion.div>

      <div className="container relative z-[2] pb-[340px] pt-[22vh] md:pb-[200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border border-glass-bd bg-glass-bg px-3.5 py-2 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-brass" />
          <span className="eyebrow text-white/80">Bhurban, Murree Hills · Private Gated Estate · 2 min from PC Bhurban · 6,800 ft</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="display mt-7 max-w-[1100px] text-[clamp(56px,8.5vw,124px)] leading-none text-white"
        >
          Exclusivity
          <br />
          above the <span className="display-italic text-brass">clouds</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[640px] text-[19px] text-white/70 leading-relaxed"
        >
          An exclusive gated sanctuary at 6,800 ft in the Murree Hills — twelve private residences where alpine solitude meets the timeless grandeur of Kashmir&apos;s mist-draped peaks.
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
            href="#cottages"
            className="btn btn-ghost border border-white/25 text-white hover:bg-white/10"
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
            <div key={s.label} className="border-l border-white/20 pl-4">
              <div className="eyebrow text-white/50">{s.label}</div>
              <div className="display text-[32px] text-white">
                {s.value}{" "}
                <span className="font-sans text-[13px] font-normal text-white/40">{s.sub}</span>
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
              <a href="#booking" className="btn btn-primary px-6 py-3.5">
                Check rates <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
