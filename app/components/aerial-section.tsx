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

  // Gentle parallax drift only — no scale transform (avoids blur amplification)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Aerial view of Swiss Cottages Six estate"
      className="relative h-[80vh] min-h-[520px] overflow-hidden border-y border-line"
    >
      {/*
        The aerial image is portrait (720×1600).
        In this wide landscape section, object-fit:cover upscales to fill width.
        - Upscale factor: viewport width ÷ 720 (e.g. 1440÷720 = 2×)
        - Displayed height: 1600 × 2 = 3200px, section shows ~800px of that
        - object-position "center 28%" centres the crop on the cottage cluster
          which sits in the upper-middle band of the drone shot.
        - CSS filter: contrast + brightness sharpen the upscaled result.
      */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <Image
          src="/cottage/aerial.jpg"
          alt="Swiss Cottages Six — bird's-eye aerial view of the gated estate, Bhurban Murree Hills"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover"
          style={{
            objectPosition: "center 28%",
            // Sharpen upscaled photo: crisp edges, punchy contrast, vivid greens
            filter: "contrast(1.12) brightness(1.04) saturate(1.18)",
            imageRendering: "crisp-edges",
          }}
        />
      </motion.div>

      {/* Overlays — keep the dramatic mood without muddying the photo */}
      {/* Strong bottom gradient for stats legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.92)] via-[rgba(8,7,5,0.18)] to-transparent" />
      {/* Top softener */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(8,7,5,0.30)] to-transparent" />
      {/* Left vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(8,7,5,0.30)] via-transparent to-transparent" />

      {/* GPS coordinate label */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 top-8 -translate-x-1/2"
      >
        <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-[11px] tracking-widest text-white/75 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brass" />
          THE ESTATE · 33.9603° N, 73.4538° E
        </span>
      </motion.div>

      {/* Centred headline */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[72%] text-center"
      >
        <h2 className="display text-[clamp(26px,4vw,50px)] leading-tight text-white drop-shadow-lg">
          Twelve residences.
          <br />
          <span className="display-italic text-brass">One sanctuary.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[400px] text-[13px] leading-relaxed text-white/55 drop-shadow">
          Seen from above — the gated estate at 6,800 ft in the Murree Hills.
        </p>
      </motion.div>

      {/* Stats bar */}
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
                className="rounded-lg border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-sm"
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
