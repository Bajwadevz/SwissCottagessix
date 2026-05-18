"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const STATS = [
  { value: "4", unit: "Acres", label: "Private estate" },
  { value: "6,800", unit: "ft", label: "Elevation" },
  { value: "12", unit: "Cottages", label: "Gated community" },
  { value: "2 min", unit: "", label: "From PC Bhurban" },
];

export function AerialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: image drifts up slightly as you scroll past
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  // Zoom effect: image scales from 1.08 to 1.0 as it enters viewport (feels like pulling back to reveal)
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1.0]);

  return (
    <section
      ref={sectionRef}
      aria-label="Aerial view of Swiss Cottages Six estate"
      className="relative h-[80vh] min-h-[520px] overflow-hidden border-y border-line"
    >
      {/* Image with parallax + zoom-in-on-enter */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="/cottage/aerial.jpg"
          alt="Swiss Cottages Six — aerial bird's-eye view of the gated estate, Bhurban Murree Hills"
          fill
          priority={false}
          sizes="100vw"
          quality={95}
          /*
           * object-position: push the focal point to where the cottages sit.
           * The cottages cluster in the upper-centre of the aerial shot.
           * "55% 35%" keeps them centred while cropping out empty hillside below.
           */
          className="object-cover"
          style={{ objectPosition: "55% 35%" }}
        />
      </motion.div>

      {/* Tonal overlays — keep the dramatic mood */}
      {/* Bottom-up dark gradient (for text legibility) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,0.88)] via-[rgba(10,9,7,0.22)] to-[rgba(10,9,7,0.10)]" />
      {/* Subtle left vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(10,9,7,0.35)] via-transparent to-transparent" />
      {/* Top-down softener so the sky edge doesn't clip hard */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[rgba(10,9,7,0.25)] to-transparent" />

      {/* Top coordinate label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 top-8 -translate-x-1/2"
      >
        <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-black/25 px-4 py-1.5 font-mono text-[11px] tracking-widest text-white/75 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brass" />
          THE ESTATE · 33.9603° N, 73.4538° E
        </span>
      </motion.div>

      {/* Centred headline — appears as section scrolls into view */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] text-center"
      >
        <h2 className="display text-[clamp(28px,4vw,52px)] leading-tight text-white">
          Twelve residences.
          <br />
          <span className="display-italic text-brass">One sanctuary.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-relaxed text-white/60">
          Seen from above — the gated estate in Bhurban, at 6,800 ft in the Murree Hills.
        </p>
      </motion.div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container pb-10 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="rounded-lg border border-white/12 bg-black/30 px-5 py-4 backdrop-blur-sm"
              >
                <div className="display text-[28px] leading-none text-white">
                  {s.value}
                  {s.unit && (
                    <span className="ml-1 font-sans text-[13px] font-normal text-white/55">
                      {s.unit}
                    </span>
                  )}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/45">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
