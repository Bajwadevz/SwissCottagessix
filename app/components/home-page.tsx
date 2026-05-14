"use client";

import { useState } from "react";

import { AccentSync } from "@/app/providers";

import { BookingCalendar } from "./booking-calendar";
import { DesignSystemPanel, Footer } from "./footer";
import { GatedCommunity } from "./gated-community";
import { Hero, Nav } from "./nav-hero";
import { LeadForm } from "./lead-form";
import { Showcase } from "./showcase";
import { SocialProof } from "./social-proof";

const DEFAULT_ACCENT = "#B89968";

export function HomePage() {
  const [accent] = useState(DEFAULT_ACCENT);

  return (
    <>
      <AccentSync accent={accent} />
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <GatedCommunity />
        <Showcase />
        <section className="section border-t border-line bg-bg-2">
          <div className="container grid gap-10 lg:grid-cols-2 lg:items-start">
            <BookingCalendar />
            <LeadForm />
          </div>
        </section>
        <Footer />
      </main>
      <DesignSystemPanel />
    </>
  );
}
