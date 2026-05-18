"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "4", unit: "Acres", label: "Private estate" },
  { value: "6,800", unit: "ft", label: "Elevation" },
  { value: "12", unit: "Cottages", label: "Gated community" },
  { value: "2 min", unit: "", label: "From PC Bhurban" },
];

export function AerialSection() {
  return (
    <section
      aria-label="Aerial view of Swiss Cottages Six estate"
      className="relative h-[70vh] min-h-[480px] overflow-hidden border-y border-line"
    >
      {/* Image */}
      <Image
        src="/cottage/bedroom-view.jpg"
        alt="Aerial view of Swiss Cottages Six gated estate, Bhurban, Murree Hills"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(19,18,16,0.82)] via-[rgba(19,18,16,0.3)] to-[rgba(19,18,16,0.15)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(19,18,16,0.4)] via-transparent to-transparent" />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 top-8 -translate-x-1/2"
      >
        <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/8 px-4 py-1.5 font-mono text-[11px] tracking-widest text-white/70 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-brass" />
          THE ESTATE · 33.9603° N, 73.4538° E
        </span>
      </motion.div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container pb-10 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <div className="display text-[26px] leading-none text-white">
                  {s.value}
                  {s.unit && (
                    <span className="ml-1 font-sans text-[13px] font-normal text-white/60">
                      {s.unit}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[11px] tracking-wide text-white/50 uppercase font-mono">
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
