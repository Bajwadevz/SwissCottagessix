"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { ReviewCard } from "@/lib/reviews-fallback";
import { FALLBACK_REVIEWS } from "@/lib/reviews-fallback";
import { Icon } from "@/lib/icon";

function Counter({
  to,
  suffix = "",
  duration = 1600,
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

function Stars() {
  return (
    <div className="inline-flex gap-0.5 text-star">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={12} />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: ReviewCard }) {
  const initials = r.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <article
      className="mx-3 flex w-[360px] max-w-[85vw] flex-[0_0_360px] flex-col gap-4 rounded-lg border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-[38px] place-items-center rounded-full bg-gradient-to-br from-brass to-pine text-sm font-bold text-[#1a1610]">
            {initials}
          </div>
          <div>
            <div className="text-sm font-semibold">{r.name}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-ink-dim">
              <span className="text-sm">{r.country}</span>
              <span>{r.flag}</span> ·{" "}
              <span>
                {r.nights ? `${r.nights} nights · ` : ""}
                {r.date}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-brass/30 bg-brass/10 px-2.5 py-1.5 font-mono text-[13px] font-bold text-brass">
          {r.score}
        </div>
      </div>
      <p className="display m-0 text-[19px] leading-snug text-ink">“{r.quote}”</p>
      <div className="mt-auto flex justify-end border-t border-dashed border-line pt-3">
        <Stars />
      </div>
    </article>
  );
}

export function SocialProof() {
  const [paused, setPaused] = useState(false);
  const [reviews, setReviews] = useState<ReviewCard[]>(FALLBACK_REVIEWS);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d: { reviews?: ReviewCard[] }) => {
        if (Array.isArray(d.reviews) && d.reviews.length) setReviews(d.reviews);
      })
      .catch(() => {});
  }, []);

  const doubled = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="section border-y border-line"
    >
      <div className="container">
        <header className="mb-14 grid gap-8 md:grid-cols-2 md:items-end md:gap-[60px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow text-brass">Unquestioned Pedigree · 384 Verified Stays · 23 Countries</span>
            <h2 className="display mt-3 text-[clamp(40px,5vw,64px)] leading-tight">
              <span className="display-italic">95%</span> of our guests
              <br />
              come <span className="text-brass">back</span>.
            </h2>
          </motion.div>
          <p className="max-w-[460px] justify-self-end text-[15px] text-ink-mute md:text-right">
            Authentic testimonials from five continents—spanning the UK, USA, UAE, Canada, and beyond. Once guests experience the sanctuary within our gates, they inevitably return.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-4 overflow-hidden rounded-lg border border-brass/35 bg-gradient-to-br from-brass/10 to-brass/[0.02] p-10 md:p-12"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 0% 50%, rgba(184,153,104,0.18), transparent 50%)",
            }}
          />
          <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
            <div
              className="flex items-baseline gap-1 font-display text-[clamp(80px,12vw,160px)] font-medium leading-none tracking-tighter text-brass"
            >
              <Counter to={95} duration={2000} />
              <span className="text-[0.4em]">%</span>
            </div>
            <div>
              <div className="eyebrow text-brass">The Loyalty Standard</div>
              <h3 className="display mt-2 max-w-[540px] text-[clamp(28px,3.4vw,44px)] leading-tight">
                Exceptional return rate.{" "}
                <span className="display-italic text-ink-mute">
                  Once experienced, it is never forgotten.
                </span>
              </h3>
              <p className="mt-3 max-w-[520px] text-sm text-ink-mute">
                Calculated among guests completing a stay within the trailing 24 months. Cross-referenced across all premium channels and deduplicated by passport.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mb-14 grid divide-y divide-line rounded-lg border border-line bg-surface md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { node: <Counter to={9.2} decimals={1} duration={1500} />, l: "Average score", s: "out of 10" },
            { node: <Counter to={384} duration={1800} />, l: "Verified stays", s: "since 2022" },
            { node: <Counter to={23} duration={1400} />, l: "Countries", s: "guests from" },
            { node: <Counter to={12} duration={1600} />, l: "Cottages", s: "the entire community" },
          ].map((s, i) => (
            <div key={i} className="p-8">
              <div className="display text-[56px] leading-none text-brass">{s.node}</div>
              <div className="eyebrow mt-2.5">{s.l}</div>
              <div className="mt-1 text-xs text-ink-dim">{s.s}</div>
            </div>
          ))}
        </div>

        <div className="mb-14 mt-14 grid gap-6 md:grid-cols-3">
          {/* Google Business */}
          <a
            href="https://share.google/5U6hHhEynfGAhieI4"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[22px] font-display text-ink">
                  <Icon name="google" size={24} className="text-brass" /> Google
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-brass/10 px-3 py-1 text-xs font-bold text-brass">
                  <Icon name="star" size={12} /> 5.0
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-mute">
                Rated 5.0 stars on Google. Guests consistently highlight the panoramic mountain views, privacy, and proximity to Pearl Continental Bhurban.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[13px] font-semibold text-brass transition-transform duration-300 group-hover:translate-x-1">
              Read our reviews <Icon name="arrow" size={14} />
            </div>
          </a>

          {/* Booking.com */}
          <a
            href="https://www.booking.com/hotel/pk/swiss-cottage-bhurban-bhurban.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0071c2]/50 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[22px] font-display text-[#0071c2] dark:text-[#3399ff]">
                  <Icon name="booking" size={24} /> Booking.com
                </div>
                <div className="rounded-t-lg rounded-bl-none rounded-br-lg bg-[#0071c2] px-3 py-1 text-xs font-bold text-white dark:bg-[#3399ff] dark:text-[#002244]">
                  9.2
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-mute">
                Awarded the Traveller Review Award. Guests from 23 countries rate Swiss Cottages Six 9.2/10 for location, comfort, and exceptional value.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[13px] font-semibold text-[#0071c2] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#3399ff]">
              View our listing <Icon name="arrow" size={14} />
            </div>
          </a>

          {/* Instagram Feed */}
          <a
            href="https://www.instagram.com/swisscottagesix/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C]/50 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[22px] font-display text-ink">
                  <Icon name="instagram" size={24} /> Instagram
                </div>
                <div className="text-[11px] font-mono tracking-wider text-ink-mute">
                  @swisscottagesix
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="aspect-square overflow-hidden rounded bg-line">
                  <img src="/cottage/aerial.jpg" alt="Aerial view of Swiss Cottages Six gated estate" className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="aspect-square overflow-hidden rounded bg-line">
                  <img src="/cottage/lounge.jpg" alt="Spacious sun-drenched living room lounge" className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="aspect-square overflow-hidden rounded bg-line">
                  <img src="/cottage/bedroom-view.jpg" alt="Master suite with pine-timber ceiling and mountain view" className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[13px] font-semibold text-[#E1306C] transition-transform duration-300 group-hover:translate-x-1">
              Explore our journal <Icon name="arrow" size={14} />
            </div>
          </a>
        </div>

        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-2 rounded-xl border border-brass/25 bg-brass/[0.05] px-6 py-3 text-[13px] text-ink-mute">
          <span className="text-brass">📍</span>
          <span>
            <strong className="text-ink">Swiss Cottages Six</strong> · Off PC Bhurban Road, Bhurban, Murree Hills ·{" "}
            <a href="https://maps.app.goo.gl/xuDvuCaRxPECUBzB7" target="_blank" rel="noopener noreferrer" className="font-semibold text-brass hover:underline">
              View on Google Maps
            </a>
          </span>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className={`marquee-track flex w-max ${paused ? "paused" : ""}`}>
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
