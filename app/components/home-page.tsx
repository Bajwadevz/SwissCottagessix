"use client";

import { BookingCalendar } from "./booking-calendar";
import { DesignSystemPanel, Footer } from "./footer";
import { GatedCommunity } from "./gated-community";
import { Hero, Nav } from "./nav-hero";
import { LeadForm } from "./lead-form";
import { Showcase } from "./showcase";
import { SocialProof } from "./social-proof";

export function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <GatedCommunity />
        <Showcase />

        {/* Booking + Inquiry */}
        <section id="booking" className="section border-t border-line bg-bg-2 scroll-mt-20">
          <div className="container">
            <div className="mb-10">
              <span className="eyebrow text-brass">Reservations · Bhurban, Murree</span>
              <h2 className="display mt-3 text-[clamp(32px,4vw,52px)] leading-tight">
                Check availability &amp; <span className="display-italic text-brass">reserve your dates</span>.
              </h2>
              <p className="mt-3 max-w-[560px] text-base text-ink-mute">
                Live calendar synced from Booking.com. Select your dates, review pricing, and secure your stay directly — no platform fees.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <BookingCalendar />
              <LeadForm />
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <DesignSystemPanel />
    </>
  );
}
