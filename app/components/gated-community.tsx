"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/lib/icon";

function Counter12({
  to,
  suffix = "",
  duration = 1800,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function CottageGrid() {
  const [revealed, setRevealed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            let i = 0;
            const id = window.setInterval(() => {
              i += 1;
              setRevealed(i);
              if (i >= 12) window.clearInterval(id);
            }, 130);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const BOOKABLE = [3, 6, 7, 8, 9];
  const cottages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    ours: BOOKABLE.includes(i + 1),
  }));

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-line bg-surface p-8"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 opacity-25"
      >
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(184,153,104,0.5)" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#dots)" />
        <path
          d="M-20,180 Q80,120 200,140 T420,100"
          stroke="rgba(184,153,104,0.3)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-20,220 Q120,180 240,200 T420,170"
          stroke="rgba(184,153,104,0.18)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-20,260 Q140,230 260,250 T420,230"
          stroke="rgba(184,153,104,0.1)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <div className="eyebrow text-brass">The community · plan view</div>
          <div className="font-mono text-[11px] text-ink-dim">
            <span className="text-brass">●</span> Available · <span>○</span> Neighbours
          </div>
        </div>

        <div className="my-6 grid grid-cols-4 gap-3">
          {cottages.map((c, i) => (
            <div
              key={c.id}
              className="relative grid aspect-[1.4/1] place-items-center rounded-[10px] border transition-all duration-500"
              style={{
                borderColor: c.ours ? "var(--brass)" : "var(--line-2)",
                background: c.ours ? "rgba(184,153,104,0.12)" : "rgba(241,237,228,0.02)",
                opacity: i < revealed ? 1 : 0,
                transform:
                  i < revealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
              }}
            >
              <div
                className="font-mono text-[11px] font-semibold"
                style={{ color: c.ours ? "var(--brass)" : "var(--ink-dim)" }}
              >
                {String(c.id).padStart(2, "0")}
              </div>
              {c.ours && (
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brass shadow-[0_0_8px_var(--brass)]" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-line pt-4 text-xs text-ink-mute">
          <div>
            <span className="font-semibold text-ink">5 of 12</span> cottages available to book —
            the rest are private residences.
          </div>
          <div className="font-mono text-[10px] text-ink-dim">EST. 1998</div>
        </div>
      </div>
    </div>
  );
}

export function GatedCommunity() {
  const highlights = [
    {
      icon: "award" as const,
      eyebrow: "2 Minutes",
      title: "Pearl Continental Bhurban · 2 min",
      desc: "The Pearl Continental hotel, championship golf course, and the vibrant Bhurban dining strip—all accessible within a mere two-minute drive from our gate.",
      meta: "0.4 km / 2 min drive",
    },
    {
      icon: "mountain" as const,
      eyebrow: "Panoramic",
      title: "Snow-Capped Kashmir Peaks",
      desc: "Each cottage is meticulously sited to capture an unobstructed, east-facing vista of the Pir Panjal range. Brilliant snow caps remain visible nine months of the year.",
      meta: "Elevation 6,800 ft",
    },
    {
      icon: "users" as const,
      eyebrow: "24/7 Security",
      title: "Manned Gate & On-Site Concierge",
      desc: "A single point of entry, discreet screened security, and a dedicated live-in caretaker. Includes private parking for two vehicles per cottage.",
      meta: "Response < 4 min",
    },
  ];

  return (
    <section id="community" className="section border-y border-line bg-bg-2">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-[70px] grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-20"
        >
          <div>
            <span className="eyebrow text-brass">The gated community · Bhurban Heights</span>
            <h2 className="display mt-3 max-w-[760px] text-[clamp(40px,5.4vw,76px)] leading-tight">
              An exclusive enclave of{" "}
              <span className="display-italic text-brass">
                <Counter12 to={12} duration={1600} />
              </span>{" "}
              luxury cottages.
            </h2>
          </div>
          <p className="m-0 max-w-[480px] justify-self-end text-base leading-relaxed text-ink-mute md:text-right">
            Perched upon a private 4-acre sanctuary in the heart of Bhurban, offering a solitary manned gate and
            round-the-clock security. There are only twelve cottages here—and only five are available
            for your retreat.
          </p>
        </motion.header>

        <div className="grid gap-7 md:grid-cols-2 md:items-stretch">
          <CottageGrid />
          <div className="flex flex-col gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid flex-1 grid-cols-[auto_1fr_auto] gap-5 rounded-lg border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass md:items-start"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-brass bg-brass/[0.08] text-brass">
                  <Icon name={h.icon} size={22} stroke={1.6} />
                </div>
                <div className="min-w-0">
                  <span className="eyebrow text-brass">{h.eyebrow}</span>
                  <div className="display mt-1.5 text-2xl">{h.title}</div>
                  <p className="mt-2 text-[13px] leading-snug text-ink-mute">{h.desc}</p>
                </div>
                <div className="whitespace-nowrap pt-1.5 text-right font-mono text-[10px] tracking-wide text-ink-dim">
                  {h.meta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-6 rounded-lg border border-line bg-surface px-6 py-4">
          <div className="flex items-center gap-2.5 text-[13px] text-ink-mute">
            <Icon name="pin" size={15} className="text-brass shrink-0" />
            <span><strong className="text-ink font-semibold">Off PC Bhurban Road</strong>, Bhurban, Murree Hills, Punjab 47150</span>
          </div>
          <a
            href="https://maps.app.goo.gl/xuDvuCaRxPECUBzB7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-brass hover:underline"
          >
            Open in Google Maps <Icon name="arrow" size={12} />
          </a>
          <div className="ml-auto font-mono text-[11px] text-ink-dim">33.9603°N · 73.4538°E</div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-line-2 bg-surface px-6 py-5 md:px-7">
          <div className="flex items-center gap-4 text-[13px] text-ink-mute">
            <span className="size-2 animate-pulse-dot rounded-full bg-brass" />
            <span>
              <span className="font-semibold text-ink">Limited availability</span> for the upcoming
              season — waitlist averages 11 weeks
            </span>
          </div>
          <a href="#book" className="btn btn-primary py-3 pl-5 pr-5 text-[13px]">
            Secure your dates <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
