"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

import "react-day-picker/style.css";

import { calculatePricing, formatPKR } from "@/lib/pricing";
import { Icon } from "@/lib/icon";

type Block = { start: string; end: string };

// ─── helpers ──────────────────────────────────────────────────────────────────

function fmt(d: Date) {
  return d.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

function rangeOverlapsBlocks(range: DateRange, blocks: Block[]): boolean {
  if (!range.from || !range.to) return false;
  const from = range.from.getTime();
  const to = range.to.getTime();
  return blocks.some((b) => {
    const bS = new Date(b.start).setHours(0, 0, 0, 0);
    const bE = new Date(b.end).setHours(23, 59, 59, 999);
    return from <= bE && to >= bS;
  });
}

// ─── Pricing card shown when valid dates are selected ─────────────────────────

function PricingCard({
  guests,
  nights,
  onBook,
}: {
  guests: number;
  nights: number;
  onBook: () => void;
}) {
  const p = calculatePricing(guests, nights);

  return (
    <div className="mt-5 rounded-lg border border-brass/40 bg-brass/[0.06] p-5">
      <div className="eyebrow mb-3 text-brass">Price estimate · direct booking</div>
      <div className="space-y-2 text-[13px]">
        <div className="flex justify-between text-ink-mute">
          <span>
            {formatPKR(p.pricePerNight)} × {p.nights} night{p.nights !== 1 ? "s" : ""}
          </span>
          <span className="text-ink">{formatPKR(p.pricePerNight * p.nights)}</span>
        </div>
        {p.breakfastExtra > 0 && (
          <div className="flex justify-between text-ink-mute">
            <span>Breakfast · {p.guests - 4} extra guest{p.guests - 4 !== 1 ? "s" : ""}</span>
            <span className="text-ink">{formatPKR(p.breakfastExtra)}</span>
          </div>
        )}
        <div className="flex justify-between text-ink-mute line-through opacity-60">
          <span>List price ({formatPKR(p.listPrice)}/night)</span>
          <span>{formatPKR(p.totalListPrice)}</span>
        </div>
        <div className="border-t border-line pt-2 flex justify-between font-semibold text-ink">
          <span>Total (direct rate)</span>
          <span>{formatPKR(p.totalPrice)}</span>
        </div>

        {/* Advance reservation fee */}
        <div className="rounded-md border border-brass/30 bg-brass/[0.08] px-3 py-2.5 space-y-0.5">
          <div className="flex justify-between text-[12px] font-semibold text-brass">
            <span>Advance reservation fee (10%)</span>
            <span>{formatPKR(p.advanceFee)}</span>
          </div>
          <p className="text-[11px] text-ink-dim leading-snug">
            Due now to secure your dates. Remaining balance payable at check-in.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-pine/30 bg-pine/10 px-3 py-2 text-pine text-[12px]">
          <Icon name="check" size={13} />
          You save {formatPKR(p.totalDiscount)} ({p.savingsPct}% off list price)
        </div>
      </div>

      <button
        type="button"
        onClick={onBook}
        className="btn btn-primary mt-4 w-full justify-center py-3"
      >
        Reserve via WhatsApp <Icon name="whatsapp" size={15} />
      </button>

      {/* Legal small print */}
      <p className="mt-2.5 text-center text-[10px] leading-snug text-ink-dim">
        Advance booking fee of {formatPKR(p.advanceFee)} is{" "}
        <strong className="font-semibold text-ink-mute">non-refundable</strong>. Full stay amount
        due at check-in. Direct booking — no platform fee.
      </p>
    </div>
  );
}

// ─── Overflow form shown when dates are blocked ────────────────────────────────

function OverflowForm({
  prefillDates,
  prefillGuests,
}: {
  prefillDates: string;
  prefillGuests: number;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(prefillGuests);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/overflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, guests, dates: prefillDates }),
      });
    } catch {
      // still show success — lead may have been saved to DB
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="mt-5 rounded-lg border border-brass/40 bg-brass/[0.06] p-6 text-center">
        <Icon name="check" size={22} className="mx-auto text-brass" />
        <div className="display mt-3 text-[20px]">We&apos;ll reach out on WhatsApp!</div>
        <p className="mt-2 text-sm text-ink-mute">
          Our team will send you options for available luxury cottages within minutes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-5 rounded-lg border border-amber-500/40 bg-amber-500/[0.06] p-5 space-y-4"
    >
      <div>
        <div className="eyebrow text-amber-600 dark:text-amber-400">
          Cottage Six is booked for these dates
        </div>
        <h4 className="display mt-1.5 text-[18px] leading-snug">
          But we have other luxury cottages available!
        </h4>
        <p className="mt-2 text-[13px] text-ink-mute">
          Enter your details to get instant options on WhatsApp — same gated estate, same premium
          standard.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-[13px]">
        <span className="text-ink-mute">Your Name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ali Hassan"
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>

      <label className="flex flex-col gap-1 text-[13px]">
        <span className="text-ink-mute">WhatsApp Number</span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3XX XXXXXXX"
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>

      <div className="flex flex-col gap-1 text-[13px]">
        <span className="text-ink-mute">Guests</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="grid size-8 place-items-center rounded-full border border-line-2 text-ink"
          >
            <Icon name="minus" size={12} />
          </button>
          <span className="min-w-[28px] text-center font-semibold text-ink">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(8, g + 1))}
            className="grid size-8 place-items-center rounded-full border border-line-2 text-ink"
          >
            <Icon name="plus" size={12} />
          </button>
        </div>
      </div>

      <div className="rounded-md border border-line bg-surface px-3 py-2 text-[12px] font-mono text-ink-mute">
        Dates: {prefillDates}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full justify-center py-3"
      >
        {status === "loading" ? "Sending…" : "Get instant options"}
        <Icon name="whatsapp" size={15} />
      </button>
    </form>
  );
}

// ─── Guest stepper ────────────────────────────────────────────────────────────

function GuestStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid size-7 place-items-center rounded-full border border-line-2 text-ink"
      >
        <Icon name="minus" size={11} />
      </button>
      <span className="min-w-[24px] text-center text-sm font-semibold text-ink">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(8, value + 1))}
        className="grid size-7 place-items-center rounded-full border border-line-2 text-ink"
      >
        <Icon name="plus" size={11} />
      </button>
      <span className="text-[12px] text-ink-mute">
        {value <= 4 ? "incl. breakfast for 4" : `+breakfast for ${value - 4} extra`}
      </span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function BookingCalendar() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => r.json())
      .then((d: { blocks?: Block[] }) => setBlocks(d.blocks ?? []))
      .catch(() => setBlocks([]));
  }, []);

  const disabledDays = useMemo(
    () =>
      blocks.map((b) => ({
        from: new Date(b.start),
        to: new Date(b.end),
      })),
    [blocks]
  );

  function handleSelect(newRange: DateRange | undefined) {
    setRange(newRange);
    setOverflow(false);
    if (newRange?.from && newRange?.to && rangeOverlapsBlocks(newRange, blocks)) {
      setOverflow(true);
    }
  }

  const nights =
    range?.from && range?.to
      ? Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000))
      : 0;

  const overflowDates =
    range?.from && range?.to ? `${fmt(range.from)} – ${fmt(range.to)}` : "";

  const showPricing = !overflow && range?.from && range?.to && nights > 0;

  const pricing = range?.from && range?.to && nights > 0
    ? calculatePricing(guests, nights)
    : null;

  const waNumber = "923190514569";
  const waMessage = range?.from && range?.to && pricing
    ? encodeURIComponent(
        `Hi, I'd like to reserve Cottage Six.\n\n` +
        `Dates: ${fmt(range.from)} – ${fmt(range.to)}\n` +
        `Guests: ${guests}\n` +
        `Total: ${formatPKR(pricing.totalPrice)}\n` +
        `Advance fee (10%): ${formatPKR(pricing.advanceFee)}\n\n` +
        `Please confirm availability and share payment details.`
      )
    : "";

  return (
    <div className="glass glass-strong rounded-lg p-5">
      <div className="eyebrow mb-1 text-brass">Availability · Bhurban, Murree</div>
      <p className="mb-4 text-sm text-ink-mute">
        Live calendar synced hourly from Booking.com &amp; Airbnb. Select your dates to see pricing.
      </p>

      {/* Guest selector */}
      <div className="mb-4 flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3">
        <Icon name="users" size={15} className="text-ink-mute shrink-0" />
        <span className="text-[13px] text-ink-mute shrink-0">Guests:</span>
        <GuestStepper value={guests} onChange={setGuests} />
      </div>

      {/* Date picker */}
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={[{ before: new Date() }, ...disabledDays]}
        defaultMonth={new Date()}
        className="mx-auto"
      />

      {/* Selection summary */}
      {range?.from && (
        <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-mono text-ink-mute">
          <span className="rounded-md border border-line bg-surface px-2.5 py-1">
            {fmt(range.from)}
          </span>
          {range.to && (
            <>
              <span className="self-center">→</span>
              <span className="rounded-md border border-line bg-surface px-2.5 py-1">
                {fmt(range.to)}
              </span>
              <span className="self-center text-ink-dim">
                · {nights} night{nights !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>
      )}

      {/* Overflow UI */}
      {overflow && (
        <OverflowForm prefillDates={overflowDates} prefillGuests={guests} />
      )}

      {/* Pricing + WhatsApp CTA */}
      {showPricing && (
        <PricingCard
          guests={guests}
          nights={nights}
          onBook={() => {
            window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
          }}
        />
      )}
    </div>
  );
}
