import ical from "node-ical";
import type { CalendarComponent } from "node-ical";
import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/server";

export const revalidate = 3600;

type Block = { start: string; end: string };

function collectEvents(data: Record<string, CalendarComponent>): Block[] {
  const blocks: Block[] = [];
  for (const ev of Object.values(data)) {
    if (!ev || ev.type !== "VEVENT") continue;
    if (!ev.start || !ev.end) continue;
    const start = new Date(ev.start as Date);
    const end = new Date(ev.end as Date);
    if (Number.isNaN(+start) || Number.isNaN(+end)) continue;
    blocks.push({ start: start.toISOString(), end: end.toISOString() });
  }
  return blocks;
}

export async function GET() {
  const urls = [process.env.AIRBNB_ICAL_URL, process.env.BOOKING_ICAL_URL].filter(
    (u): u is string => Boolean(u)
  );

  const blocks: Block[] = [];

  for (const url of urls) {
    try {
      const data = (await ical.async.fromURL(url, {
        headers: { "User-Agent": "SwissCottagesSix/1.0 (+https://vercel.com)" },
      })) as Record<string, CalendarComponent>;
      blocks.push(...collectEvents(data));
    } catch (e) {
      console.error("[calendar] iCal error", url, e);
    }
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("ical_snapshots").insert({
      block_count: blocks.length,
      sources: urls.length,
    });
    if (error) console.warn("[calendar] snapshot log skipped", error.message);
  }

  return NextResponse.json({ blocks });
}
