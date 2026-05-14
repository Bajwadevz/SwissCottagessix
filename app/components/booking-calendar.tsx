"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";

type Block = { start: string; end: string };

export function BookingCalendar() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => r.json())
      .then((d: { blocks?: Block[] }) => setBlocks(d.blocks ?? []))
      .catch(() => setBlocks([]));
  }, []);

  const disabled = (date: Date) => {
    const t = date.setHours(12, 0, 0, 0);
    return blocks.some((b) => {
      const s = new Date(b.start).setHours(0, 0, 0, 0);
      const e = new Date(b.end).setHours(23, 59, 59, 999);
      return t >= s && t <= e;
    });
  };

  return (
    <div className="glass glass-strong rounded-lg p-5">
      <div className="eyebrow mb-1 text-brass">Live calendar</div>
      <p className="mb-4 text-sm text-ink-mute">
        Dates blocked from Airbnb &amp; Booking.com iCal feeds (hourly refresh).
      </p>
      <DayPicker defaultMonth={new Date()} disabled={disabled} className="mx-auto" />
    </div>
  );
}
