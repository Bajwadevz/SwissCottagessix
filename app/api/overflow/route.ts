import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(1).max(40),
  dates: z.string().min(1).max(120),
  guests: z.coerce.number().int().min(1).max(8),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("overflow_leads").insert({
      name: data.name,
      phone: data.phone,
      dates: data.dates,
      guests: data.guests,
      status: "new",
    });
    if (error) console.error("[overflow] db insert", error);
  }

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "overflow_lead",
          name: data.name,
          phone: data.phone,
          dates: data.dates,
          guests: data.guests,
          source: "swiss-cottages-six-web",
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("[overflow] webhook error", e);
    }
  }

  return NextResponse.json({ ok: true });
}
