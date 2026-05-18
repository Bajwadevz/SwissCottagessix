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
              Experience uncompromised luxury at Bhurban, Murree Hills — 2 minutes from Pearl Continental. Book directly and avoid platform fees. Your personal host is one WhatsApp message away from the moment you reserve.
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
            className="group relative block min-h-[280px] overflow-hidden rounded-lg border border-line transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.2!2d73.4538!3d33.9603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU3JzM3LjEiTiA3M8KwMjcnMTMuNyJF!5e0!3m2!1sen!2spk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0, filter: "grayscale(30%) contrast(1.05)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Swiss Cottages Six location map — Bhurban, Murree Hills"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,0.7)] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-white/80 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-brass" />
                Off PC Bhurban Road · Bhurban, Murree · 33.9603°N, 73.4538°E
              </div>
            </div>
          </a>
        </div>

        <div
          id="contact"
          className="grid gap-12 border-b border-line pb-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-16"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
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
              <div className="display text-[22px]">Swiss Cottages Six</div>
            </div>
            <p className="mb-4 max-w-[320px] text-[13px] text-ink-mute">
              Luxury private cottages near PC Bhurban, Murree Hills. An exclusive gated estate at 6,800 ft — curated for families up to 8 guests, managed by the Raza family since 1998.
            </p>
            <div className="flex gap-2.5">
              {[
                { i: "instagram" as const, l: "Instagram", href: "https://www.instagram.com/swisscottagesix/" },
                { i: "whatsapp" as const, l: "WhatsApp", href: "https://wa.me/923190514569?text=Hi%2C%20I%27d%20like%20to%20book%20Swiss%20Cottages%20Six." },
                { i: "mail" as const, l: "Email", href: "mailto:info@swisscottages.pk" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  target={s.l !== "Email" ? "_blank" : undefined}
                  rel={s.l !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={s.l}
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
            <a
              href="https://maps.app.goo.gl/xuDvuCaRxPECUBzB7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-brass hover:underline"
            >
              <Icon name="pin" size={12} /> Open in Google Maps
            </a>
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
