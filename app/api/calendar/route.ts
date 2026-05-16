import ical from "node-ical";
import type { CalendarComponent } from "node-ical";
import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Block = { start: string; end: string; uid: string; source: string };

function collectEvents(
  data: Record<string, CalendarComponent>,
  source: string
): Block[] {
  const blocks: Block[] = [];
  for (const [key, ev] of Object.entries(data)) {
    if (!ev || ev.type !== "VEVENT") continue;
    if (!ev.start || !ev.end) continue;
    const start = new Date(ev.start as Date);
    const end = new Date(ev.end as Date);
    if (Number.isNaN(+start) || Number.isNaN(+end)) continue;
    const uid = ((ev as unknown as Record<string, unknown>).uid as string | undefined) ?? key;
    blocks.push({ start: start.toISOString(), end: end.toISOString(), uid, source });
  }
  return blocks;
}

function toDate(iso: string) {
  return iso.split("T")[0];
}

export async function GET() {
  const sources: { url: string; label: string }[] = [
    { url: process.env.AIRBNB_ICAL_URL ?? "", label: "airbnb" },
    { url: process.env.BOOKING_ICAL_URL ?? "", label: "booking.com" },
  ].filter((s) => Boolean(s.url));

  const blocks: Block[] = [];

  for (const { url, label } of sources) {
    try {
      const data = (await ical.async.fromURL(url, {
        headers: { "User-Agent": "SwissCottagesSix/1.0 (+https://swisscottagessix.com)" },
      })) as unknown as Record<string, CalendarComponent>;
      blocks.push(...collectEvents(data, label));
    } catch (e) {
      console.error("[calendar] iCal error", label, e);
    }
  }

  const supabase = getSupabaseAdmin();
  const keySnippet = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 30) ?? "MISSING";
  console.log("[calendar] supabase client:", supabase ? "ok" : "null", "key prefix:", keySnippet);

  if (supabase && blocks.length > 0) {
    // Upsert blocked dates into the bookings table for the frontend calendar
    const rows = blocks.map((b) => ({
      external_id: b.uid,
      start_date: toDate(b.start),
      end_date: toDate(b.end),
      source: b.source,
    }));

    const { error: upsertError } = await supabase
      .from("bookings")
      .upsert(rows, { onConflict: "external_id,source" });

    if (upsertError) console.warn("[calendar] bookings upsert", upsertError.message);

    // Append observability snapshot
    const { error: snapError } = await supabase.from("ical_snapshots").insert({
      block_count: blocks.length,
      sources: sources.length,
    });
    if (snapError) console.warn("[calendar] snapshot log skipped", snapError.message);
  }

  return NextResponse.json({
    blocks: blocks.map((b) => ({ start: b.start, end: b.end })),
  });
}
