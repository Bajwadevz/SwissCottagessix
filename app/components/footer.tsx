"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/lib/icon";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2 pb-10 pt-24 md:pb-10 md:pt-[100px]">
      <div className="container">
        <div className="mb-20 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <div>
            <span className="eyebrow text-brass">Reserve your retreat</span>
            <h2 className="display mt-4 text-[clamp(40px,6vw,80px)] leading-none">
              The Pines
              <br />
              <span className="display-italic">Await</span>.
            </h2>
            <p className="mt-6 max-w-[460px] text-base text-ink-mute">
              Experience uncompromised luxury with direct reservations. Avoid platform fees, bypass intermediaries, and enjoy direct contact with your host from the moment you book.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="btn btn-primary">
                Reserve a suite <Icon name="arrow" size={14} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Call us <Icon name="phone" size={14} />
              </a>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/xuDvuCaRxPECUBzB7"
            target="_blank"
            rel="noopener noreferrer"
            className="placeholder-img group relative block min-h-[280px] rounded-lg border border-line transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg"
          >
            <svg width="100%" height="100%" viewBox="0 0 400 280" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="rgba(241,237,228,0.05)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="400" height="280" fill="url(#grid)" />
              <path
                d="M0,180 Q100,160 180,170 T400,150"
                stroke="rgba(184,153,104,0.4)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M0,210 Q120,200 220,215 T400,195"
                stroke="rgba(184,153,104,0.25)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M180,0 Q200,80 195,140 T220,280"
                stroke="rgba(74,90,62,0.3)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="220" cy="140" r="8" fill="var(--brass)" />
              <circle cx="220" cy="140" r="20" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.5" />
              <circle cx="220" cy="140" r="32" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.2" className="transition-all duration-300 group-hover:r-[40px] group-hover:opacity-40" />
            </svg>
            <div className="absolute left-[18px] top-[18px] rounded-pill border border-glass-bd bg-glass-strong px-3 py-1.5 font-mono text-[11px] transition-colors group-hover:border-brass group-hover:text-brass">
              33.9603° N, 73.4538° E <Icon name="arrow" size={10} className="inline ml-1" />
            </div>
            <div className="ph-label">
              <span>// MAP_EMBED — Google Maps iframe slot</span>
              <span className="ph-tag">Bhurban</span>
            </div>
          </a>
        </div>

        <div
          id="contact"
          className="grid gap-12 border-b border-line pb-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-16"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full border border-brass text-brass">
                <Icon name="mountain" size={16} />
              </div>
              <div className="display text-[22px]">Swiss Cottages Six</div>
            </div>
            <p className="mb-4 max-w-[320px] text-[13px] text-ink-mute">
              An exclusive five-cottage sanctuary set within a private, twelve-cottage gated estate at 6,800 ft. Curated and managed by the Raza family since 1998.
            </p>
            <div className="flex gap-2.5">
              {[
                { i: "instagram" as const, l: "@swisscottagessix" },
                { i: "whatsapp" as const, l: "WhatsApp" },
                { i: "mail" as const, l: "Email" },
              ].map((s) => (
                <a
                  key={s.l}
                  href="#"
                  className="grid size-[38px] place-items-center rounded-full border border-line-2 text-ink-mute transition-colors hover:border-brass hover:text-brass"
                >
                  <Icon name={s.i} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">Find us</span>
            <div className="mt-3.5 text-[13px] leading-relaxed text-ink-mute">
              <strong className="font-semibold text-ink">Swiss Cottages Six</strong>
              <br />
              Off PC Bhurban Road
              <br />
              Bhurban, Murree
              <br />
              Punjab 47150, Pakistan
            </div>
          </div>

          <div>
            <span className="eyebrow">Talk to us</span>
            <div className="mt-3.5 space-y-1 text-[13px] leading-loose text-ink-mute">
              <div className="flex items-center gap-2">
                <Icon name="phone" size={13} /> +92 319 0514569
              </div>
              <div className="flex items-center gap-2">
                <Icon name="whatsapp" size={13} /> +92 319 0514569
              </div>
              <div className="flex items-center gap-2">
                <Icon name="mail" size={13} /> info@swisscottages.pk
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">Site</span>
            <div className="mt-3.5 flex flex-col gap-2">
              {["Cottages", "Experiences", "Reviews"].map(
                (l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-ink-mute transition-colors hover:text-brass">
                    {l}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-ink-dim">
          <div className="font-mono">© 2026 SWISS COTTAGES SIX · CRAFTED IN BHURBAN</div>
          <div className="flex flex-wrap gap-4 font-mono">
            <span>v 2.0 · Spec 04</span>
            <span>Built on Next.js · Vercel</span>
            <span>Last booked · 14 min ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DesignSystemPanel() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 rounded-pill border border-glass-bd bg-glass-strong px-3.5 py-2.5 text-xs font-semibold text-ink backdrop-blur-xl transition-all duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(80px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <Icon name="sparkle" size={14} /> Design spec
      </button>

      <div
        className="no-scrollbar fixed bottom-20 left-6 z-[60] max-h-[70vh] w-[380px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-lg border border-glass-bd bg-glass-strong p-5 shadow-2xl backdrop-blur-xl transition-all duration-300"
        style={{
          transform: open && visible ? "translateY(0)" : "translateY(12px)",
          opacity: open && visible ? 1 : 0,
          pointerEvents: open && visible ? "auto" : "none",
        }}
      >
        <div className="eyebrow text-brass">Design tokens · v2.0</div>
        <h3 className="display mt-2 text-2xl">The system at a glance</h3>
        <p className="mt-3 text-xs text-ink-mute">
          Dev-only panel. Production builds omit this component.
        </p>
      </div>
    </>
  );
}
