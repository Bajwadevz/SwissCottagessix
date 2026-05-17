"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Icon } from "@/lib/icon";

function ShowcaseImg({
  label,
  tag,
  ratio = "4 / 3",
  children,
  accent,
  imgSrc,
}: {
  label: string;
  tag: string;
  ratio?: string;
  children?: React.ReactNode;
  accent?: string;
  imgSrc?: string;
}) {
  return (
    <div
      className="placeholder-img relative h-full w-full overflow-hidden rounded-lg border border-line"
      style={{ aspectRatio: ratio }}
    >
      {imgSrc ? (
        <>
          {/* Dark Mode Version (Original) */}
          <img src={imgSrc} alt={label} className="absolute inset-0 h-full w-full object-cover hidden dark:block" />
          {/* Light Mode Version (Inverted + Green Accent) */}
          <img 
            src={imgSrc} 
            alt={label} 
            className="absolute inset-0 h-full w-full object-cover block dark:hidden" 
            style={{ filter: "invert(1) hue-rotate(-180deg) saturate(1.8) brightness(0.95)" }} 
          />
        </>
      ) : accent ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${accent}, transparent 65%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  );
}

function HoverCard({
  children,
  reveal,
}: {
  children: React.ReactNode;
  reveal: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="hover-card relative h-full overflow-hidden rounded-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="h-full transition-transform duration-700"
        style={{
          transform: hover ? "scale(1.06)" : "scale(1)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(19,18,16,0.92)] transition-opacity duration-300"
        style={{ opacity: hover ? 1 : 0.65 }}
      />
      <div
        className="absolute bottom-[22px] left-[22px] right-[22px] text-ink transition-all duration-[460ms]"
        style={{
          transform: hover ? "translateY(0)" : "translateY(12px)",
          opacity: hover ? 1 : 0.85,
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        {reveal}
      </div>
    </div>
  );
}

function RevealBody({
  eyebrow,
  title,
  sub,
  meta,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  meta?: string[];
}) {
  return (
    <>
      <div className="eyebrow text-brass">{eyebrow}</div>
      <div className="display mt-1.5 text-[28px] text-white">{title}</div>
      {sub && <div className="mt-1.5 max-w-[360px] text-[13px] text-white/75">{sub}</div>}
      {meta && (
        <div className="mt-3.5 flex flex-wrap gap-3">
          {meta.map((m, i) => (
            <span
              key={i}
              className="rounded-pill border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wide"
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export function Showcase() {
  return (
    <section id="cottages" className="section pt-16 md:pt-24">
      <div className="container">
        
        {/* The Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-32 max-w-[800px]"
        >
          <span className="eyebrow text-brass">The Heritage</span>
          <h2 className="display mt-4 text-[clamp(32px,4vw,48px)] leading-tight text-ink">
            Authentic Swiss Architecture, <br className="hidden md:block" />
            <span className="display-italic text-brass">perfected</span> in Bhurban.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-mute">
            Conceived to bring the spirit of alpine Switzerland to Bhurban&apos;s mist-draped ridgeline, Swiss Cottages Six was designed from first principles using authentic Swiss architectural heritage. Every fixture, material, and dimension was deliberate — premium Interwood furnishings, handcrafted timber accents, and double-insulated walls forged for mountain winters. A sanctuary where European elegance and Kashmir&apos;s eternal wilderness share the same view.
          </p>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-8 md:grid-cols-2 md:items-end md:gap-[60px]"
        >
          <div>
            <span className="eyebrow text-brass">Cottage Six · Bhurban</span>
            <h2 className="display mt-3 text-[clamp(40px,5vw,64px)] leading-tight">
              2 minutes from
              <br />
              <span className="display-italic">Pearl Continental</span>, <span className="text-brass">Bhurban</span>.
            </h2>
          </div>
          <div className="m-0 max-w-[460px] justify-self-end text-base text-ink-mute md:text-right flex flex-col items-start md:items-end">
            <p className="mb-3">The entire cottage — up to 8 guests — is exclusively yours. No shared amenities, no compromises:</p>
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              {[
                "2 Floors", "3 Bedrooms", "2 Bathrooms", "Bespoke Furnishings", 
                "WiFi", "Netflix", "Redundant High-Speed Internet", "Private Parking", 
                "24/7 Hot Water", "Climate Control", "Round-the-Clock Security"
              ].map(item => (
                <span key={item} className="rounded-pill border border-line bg-surface px-3 py-1 text-[13px]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.header>

        <div
          id="gallery"
          className="grid auto-rows-[220px] grid-cols-12 gap-3.5"
        >
          <div className="col-span-12 md:col-span-7 md:row-span-2">
            <HoverCard
              reveal={
                <RevealBody eyebrow="Living Area" title="Spacious Living Room" sub="State of the art furniture and natural light." />
              }
            >
              <ShowcaseImg imgSrc="/cottage/1.jpg" label="LIVING_ROOM — natural light" tag="Ground" ratio="auto" />
            </HoverCard>
          </div>

          <div className="col-span-12 md:col-span-5 md:row-span-2">
            <HoverCard
              reveal={
                <RevealBody eyebrow="Bedroom" title="Comfortable Twin Room" sub="Cozy atmosphere with modern amenities." />
              }
            >
              <ShowcaseImg imgSrc="/cottage/2.jpg" label="BEDROOM — twin beds" tag="Floor 1" ratio="auto" />
            </HoverCard>
          </div>

          <div className="col-span-12 md:col-span-6 md:row-span-2">
            <HoverCard reveal={<RevealBody eyebrow="Master Bedroom" title="Elegant Master Suite" sub="Beautifully decorated with wood accents." />}>
              <ShowcaseImg imgSrc="/cottage/3.jpg" label="MASTER_BEDROOM — wood ceiling" tag="Floor 2" ratio="auto" />
            </HoverCard>
          </div>

          <div className="col-span-12 md:col-span-6 md:row-span-2">
            <HoverCard
              reveal={
                <RevealBody eyebrow="Living Area" title="Cozy Seating Space" sub="Perfect for reading or relaxing." />
              }
            >
              <ShowcaseImg imgSrc="/cottage/4.jpg" label="SEATING_AREA — reading corner" tag="Ground" ratio="auto" />
            </HoverCard>
          </div>
        </div>

        <div id="experiences" className="mt-24 md:mt-[100px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h3 className="display m-0 text-[clamp(32px,5vw,44px)] leading-tight">
              Explore the <span className="display-italic">Surroundings</span>.
            </h3>
            <a className="btn btn-ghost" href="#experiences">
              View all <Icon name="arrow" size={14} />
            </a>
          </div>
          <div className="grid gap-3.5 md:grid-cols-5">
            {[
              {
                eyebrow: "5 KM",
                title: "Murree Hills",
                desc: "Traverse pristine pine-covered trails offering breathtaking alpine panoramas.",
                imgSrc: "/attractions/murree_hills.png",
                icon: "mountain" as const,
              },
              {
                eyebrow: "8 KM",
                title: "Sozo Adventure Park",
                desc: "A premium family destination featuring curated recreational experiences.",
                imgSrc: "/attractions/sozo_park.png",
                icon: "award" as const,
              },
              {
                eyebrow: "20 KM",
                title: "Patriata Chair Lift",
                desc: "Ascend the peaks via an iconic chairlift for unparalleled valley views.",
                imgSrc: "/attractions/patriata.png",
                icon: "star" as const,
              },
              {
                eyebrow: "10 KM",
                title: "Kashmir Point",
                desc: "The quintessential Murree vantage point, perfect for golden-hour photography.",
                imgSrc: "/attractions/kashmir_point.png",
                icon: "pin" as const,
              },
              {
                eyebrow: "9 KM",
                title: "Mall Road Murree",
                desc: "The bustling epicenter of Murree, offering vibrant culinary and retail therapy.",
                imgSrc: "/attractions/mall_road.png",
                icon: "coffee" as const,
              },
            ].map((e, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface"
              >
                <ShowcaseImg imgSrc={e.imgSrc} label={e.title.toUpperCase()} tag={e.eyebrow} ratio="5 / 4" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-brass">{e.eyebrow}</span>
                    <Icon name={e.icon} size={16} />
                  </div>
                  <div className="display mt-2 text-[22px]">{e.title}</div>
                  <div className="mt-2 text-[13px] text-ink-mute">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
