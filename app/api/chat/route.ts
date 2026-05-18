/**
 * POST /api/chat
 *
 * Swiss Cottages Six — Claude-powered multilingual chat API.
 *
 * Request body:
 *   { message: string, history: Array<{role:"user"|"assistant", content:string}> }
 *
 * Response:
 *   { reply: string, action?: ChatAction }
 *
 * Chat history is maintained entirely on the CLIENT (browser localStorage).
 * This makes the endpoint stateless — perfect for Vercel serverless functions.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SWISS_COTTAGES_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";

export const runtime = "nodejs";

// ─── Types ────────────────────────────────────────────────────────────────────

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAction =
  | { type: "whatsapp_handoff"; phone: string; dates?: string; guests?: number; message: string }
  | { type: "show_calendar" }
  | { type: "show_pricing"; guests: number; nights: number; checkIn?: string };

// ─── Anthropic client ─────────────────────────────────────────────────────────

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Fetch currently blocked date ranges from the calendar API */
async function getBlockedDatesContext(siteUrl: string): Promise<string> {
  try {
    const res = await fetch(`${siteUrl}/api/calendar`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    if (!res.ok) return "";
    const data = await res.json() as { blocks?: Array<{ start: string; end: string }> };
    if (!data.blocks?.length) return "";
    const lines = data.blocks
      .map((b) => `  - ${b.start} → ${b.end}`)
      .join("\n");
    return `\n\n## CURRENTLY BLOCKED DATES (live from calendar)\n${lines}\nDates not listed above are currently available.`;
  } catch {
    return "";
  }
}

/** Extract a structured action from the assistant's reply (if any) */
function extractAction(text: string): { cleanText: string; action: ChatAction | null } {
  const actionRegex = /```action\n([\s\S]*?)\n```/;
  const match = text.match(actionRegex);
  if (!match) return { cleanText: text, action: null };

  let action: ChatAction | null = null;
  try {
    action = JSON.parse(match[1]) as ChatAction;
  } catch {
    // malformed action block — ignore
  }

  const cleanText = text.replace(actionRegex, "").trim();
  return { cleanText, action };
}

/** Send a WhatsApp message via wa.me deep link (returns the URL for the frontend) */
function buildWhatsAppUrl(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Parse request ──────────────────────────────────────────────────────
  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  // Validate and sanitise history (last 10 messages max)
  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: HistoryMessage[] = rawHistory
    .filter(
      (m): m is HistoryMessage =>
        m !== null &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-10);

  // ── 2. Build dynamic system prompt ───────────────────────────────────────
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://swisscottagessix.com";

  const blockedDatesContext = await getBlockedDatesContext(siteUrl);
  const systemPrompt = SWISS_COTTAGES_SYSTEM_PROMPT + blockedDatesContext;

  // ── 3. Build messages array ───────────────────────────────────────────────
  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  // ── 4. Call Claude ────────────────────────────────────────────────────────
  let response: Anthropic.Message;
  try {
    response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });
  } catch (err) {
    console.error("[chat] Anthropic API error:", err);
    return NextResponse.json(
      { error: "AI service temporarily unavailable. Please try again in a moment." },
      { status: 503 }
    );
  }

  const rawReply =
    response.content[0]?.type === "text" ? response.content[0].text : "";

  // ── 5. Extract any structured action from the reply ───────────────────────
  const { cleanText: reply, action } = extractAction(rawReply);

  // ── 6. If it's a WhatsApp handoff action, enrich with a wa.me URL ─────────
  let whatsappUrl: string | undefined;
  if (action?.type === "whatsapp_handoff") {
    whatsappUrl = buildWhatsAppUrl(action.phone, action.message);
  }

  // ── 7. Return response ────────────────────────────────────────────────────
  return NextResponse.json({
    reply,
    action: action ?? undefined,
    whatsappUrl,
  });
}
