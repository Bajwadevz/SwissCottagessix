import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase/server";

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  checkIn: z.string().max(32).optional().or(z.literal("")),
  checkOut: z.string().max(32).optional().or(z.literal("")),
});

function emptyToNull(s: string | undefined) {
  if (s === undefined || s === "") return null;
  return s;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const webhook = process.env.N8N_WEBHOOK_URL;
  const supabase = getSupabaseAdmin();

  if (!webhook && !supabase) {
    return NextResponse.json(
      {
        error:
          "Lead capture is not configured. Set N8N_WEBHOOK_URL and/or Supabase (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY). See .env.example.",
      },
      { status: 503 }
    );
  }

  let leadId: string | null = null;
  let storedInDb = false;

  if (supabase) {
    const { data: row, error } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: emptyToNull(data.phone),
        check_in: emptyToNull(data.checkIn),
        check_out: emptyToNull(data.checkOut),
        message: emptyToNull(data.message),
        source: "swiss-cottages-six-web",
        n8n_forwarded: false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[lead] supabase insert", error);
      return NextResponse.json({ error: "Could not store lead" }, { status: 500 });
    }
    leadId = row?.id ?? null;
    storedInDb = true;
  }

  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "swiss-cottages-six-web",
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!r.ok) {
        console.error("[lead] n8n webhook failed", r.status, await r.text());
        return NextResponse.json(
          { error: "Upstream webhook error", storedInDb },
          { status: 502 }
        );
      }
      if (supabase && leadId) {
        const { error } = await supabase.from("leads").update({ n8n_forwarded: true }).eq("id", leadId);
        if (error) console.warn("[lead] could not mark n8n_forwarded", error);
      }
    } catch (e) {
      console.error("[lead] n8n fetch error", e);
      return NextResponse.json({ error: "Upstream unreachable", storedInDb }, { status: 502 });
    }
  }

  return NextResponse.json({
    ok: true,
    storedInDb,
    n8nForwarded: Boolean(webhook),
  });
}
