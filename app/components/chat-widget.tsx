"use client";

/**
 * Swiss Cottages Six — AI Chat Widget
 *
 * A floating chat assistant powered by Claude (multilingual: English / Urdu / Roman Urdu).
 * - Floating button (bottom-right, above the WhatsApp FAB)
 * - Chat window with message history
 * - Sends history to /api/chat on every message (stateless API)
 * - Persists chat history in sessionStorage
 * - Handles WhatsApp handoff actions from the AI
 * - Fully responsive (mobile + desktop)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

interface ChatAction {
  type: "whatsapp_handoff" | "show_calendar" | "show_pricing";
  phone?: string;
  whatsappUrl?: string;
  guests?: number;
  nights?: number;
  checkIn?: string;
}

interface ApiResponse {
  reply: string;
  action?: ChatAction;
  whatsappUrl?: string;
  error?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "sc6_chat_history";
const MAX_STORED_MESSAGES = 30;

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Assalam-u-Alaikum! I'm Sasha, your Swiss Cottages Six assistant. 🏔️\n\nI can help you with availability, pricing, and reservations — in English, اردو, or Roman Urdu. What brings you here today?",
  timestamp: Date.now(),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [GREETING];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [GREETING];
    const parsed = JSON.parse(raw) as Message[];
    return parsed.length ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
}

function saveHistory(messages: Message[]) {
  try {
    const trimmed = messages.slice(-MAX_STORED_MESSAGES);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // storage quota — ignore
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-brass/50"
          style={{
            animation: `chatBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Avatar({ role }: { role: Role }) {
  if (role === "user") return null;
  return (
    <div className="mr-2 mt-auto flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brass/80 to-brass/40 text-[10px] font-bold tracking-wide text-[#1a1610]">
      SC
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const lines = msg.content.split("\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <Avatar role={msg.role} />
      <div className={`flex max-w-[82%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isUser
              ? "rounded-br-sm bg-brass text-[#1a1610] font-medium"
              : "rounded-bl-sm border border-line/70 bg-surface text-ink shadow-sm"
          }`}
        >
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </div>
        <span className="mt-1 px-1 text-[10px] text-ink-dim opacity-60">
          {formatTime(msg.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

function WhatsAppHandoff({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="mx-auto mt-1 mb-3 flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-[13px] font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20"
    >
      <WhatsAppIcon />
      Continue on WhatsApp
    </motion.a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}


function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="size-4">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "+92 319 051 4569";
const PHONE_HREF = "tel:+923190514569";
const WA_HREF = "https://wa.me/923190514569?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Swiss%20Cottages%20Six.";

// ─── Main widget ──────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "call">("chat");
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingWhatsApp, setPendingWhatsApp] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Load from sessionStorage on mount ──────────────────────────────────────
  useEffect(() => {
    const stored = loadHistory();
    setMessages(stored);
  }, []);

  // ── Persist to sessionStorage whenever messages change ─────────────────────
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  // ── Auto-scroll to bottom ──────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Focus input when opened ────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // ── Auto-open with subtle delay (first visit) ──────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenChat = sessionStorage.getItem("sc6_chat_seen");
      if (!hasSeenChat) {
        setUnread(1);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // ── External trigger: any button can dispatch 'open-sasha' to open the chat ─
  useEffect(() => {
    const chatHandler = () => {
      setMode("chat");
      setOpen(true);
      setHasOpened(true);
      sessionStorage.setItem("sc6_chat_seen", "1");
    };
    const callHandler = () => {
      setMode("call");
      setOpen(true);
      setHasOpened(true);
      sessionStorage.setItem("sc6_chat_seen", "1");
    };
    window.addEventListener("open-sasha", chatHandler);
    window.addEventListener("open-sasha-call", callHandler);
    return () => {
      window.removeEventListener("open-sasha", chatHandler);
      window.removeEventListener("open-sasha-call", callHandler);
    };
  }, []);

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setPendingWhatsApp(null);

      // Build history for API (exclude the greeting, last 10 real messages)
      const historyForApi = [...messages, userMsg]
        .filter((m) => m.id !== "greeting")
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history: historyForApi }),
        });

        const data: ApiResponse = await res.json();

        const assistantMsg: Message = {
          id: uid(),
          role: "assistant",
          content: data.reply || "I'm sorry, I couldn't process that. Please try again.",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Handle action from AI
        if (data.action?.type === "show_calendar") {
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        }

        if (data.whatsappUrl) {
          setPendingWhatsApp(data.whatsappUrl);
        }

        if (!open) setUnread((u) => u + 1);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: "Sorry, I'm having trouble connecting right now. Please try again or reach us on WhatsApp directly.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, open]
  );

  // ── Handle Enter key ───────────────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // ── Open widget ───────────────────────────────────────────────────────────
  function handleOpen(m: "chat" | "call" = "chat") {
    setMode(m);
    setOpen(true);
    setHasOpened(true);
    setUnread(0);
    sessionStorage.setItem("sc6_chat_seen", "1");
  }

  // ── Clear conversation ─────────────────────────────────────────────────────
  function clearChat() {
    setMessages([GREETING]);
    setPendingWhatsApp(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }


  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Animations */}
      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(184,153,104,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(184,153,104,0); }
        }
        @keyframes callRing {
          0% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>

      {/* ── Widget window ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-4 z-[9998] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line/60 bg-bg shadow-2xl shadow-black/30"
            style={{ maxHeight: "min(580px, calc(100dvh - 120px))" }}
          >
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="border-b border-line/60 bg-gradient-to-r from-[rgba(184,153,104,0.12)] to-transparent px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brass to-brass/60 text-[11px] font-bold text-[#1a1610]">
                    SC
                    <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-bg bg-green-400" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">Swiss Cottages Six</div>
                    <div className="text-[11px] text-ink-dim">
                      {mode === "chat" ? "Sasha · AI Concierge · Online" : "Talk to us · Bhurban, Murree"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {mode === "chat" && (
                    <button
                      onClick={clearChat}
                      title="New conversation"
                      className="grid size-7 place-items-center rounded-lg text-ink-dim transition-colors hover:bg-surface hover:text-ink"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="grid size-7 place-items-center rounded-lg text-ink-dim transition-colors hover:bg-surface hover:text-ink"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* ── Mode tabs ──────────────────────────────────────────────── */}
              <div className="mt-3 flex gap-1 rounded-lg border border-line/50 bg-surface/60 p-0.5">
                <button
                  onClick={() => setMode("chat")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[12px] font-medium transition-all ${
                    mode === "chat"
                      ? "bg-brass text-[#1a1610] shadow-sm"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Chat with Sasha
                </button>
                <button
                  onClick={() => setMode("call")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[12px] font-medium transition-all ${
                    mode === "call"
                      ? "bg-brass text-[#1a1610] shadow-sm"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call / Contact
                </button>
              </div>
            </div>

            {/* ── Chat mode ──────────────────────────────────────────────────── */}
            {mode === "chat" && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4" style={{ overscrollBehavior: "contain" }}>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))}
                  {pendingWhatsApp && <WhatsAppHandoff url={pendingWhatsApp} />}
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 flex justify-start">
                      <div className="mr-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brass/80 to-brass/40 text-[10px] font-bold text-[#1a1610]">
                        SC
                      </div>
                      <div className="rounded-2xl rounded-bl-sm border border-line/70 bg-surface px-3 py-2 shadow-sm">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Quick chips */}
                <div className="flex gap-2 overflow-x-auto border-t border-line/40 px-4 py-2 scrollbar-none">
                  {[
                    { label: "Availability", msg: "Is the cottage available this weekend?" },
                    { label: "Pricing", msg: "What are the rates for 4 guests?" },
                    { label: "Book via WhatsApp", msg: "I'd like to book via WhatsApp" },
                  ].map((q) => (
                    <button
                      key={q.label}
                      onClick={() => sendMessage(q.msg)}
                      disabled={loading}
                      className="shrink-0 rounded-full border border-brass/30 bg-brass/[0.06] px-3 py-1 text-[11px] font-medium text-brass transition-all hover:bg-brass/15 disabled:opacity-50"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-line/60 bg-surface/50 px-3 py-3">
                  <div className="flex items-end gap-2 rounded-xl border border-line/70 bg-bg px-3 py-2 focus-within:border-brass/50">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type in English, Urdu, or Roman Urdu…"
                      rows={1}
                      disabled={loading}
                      className="flex-1 resize-none bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-dim disabled:opacity-50"
                      style={{ maxHeight: "80px" }}
                      onInput={(e) => {
                        const t = e.currentTarget;
                        t.style.height = "auto";
                        t.style.height = `${Math.min(t.scrollHeight, 80)}px`;
                      }}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-brass text-[#1a1610] transition-all hover:brightness-110 disabled:opacity-40"
                    >
                      <SendIcon />
                    </button>
                  </div>
                  <button
                    onClick={() => setMode("call")}
                    className="mt-2 flex w-full items-center justify-center gap-1 text-[10px] text-ink-dim hover:text-brass transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Prefer to speak directly? Call us
                  </button>
                </div>
              </>
            )}

            {/* ── Call / Contact mode ─────────────────────────────────────────── */}
            {mode === "call" && (
              <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                {/* Avatar */}
                <div className="mx-auto mb-2 flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-brass/20" style={{ animation: "callRing 2.2s ease-out infinite" }} />
                    <div className="absolute inset-0 rounded-full bg-brass/10" style={{ animation: "callRing 2.2s ease-out 0.5s infinite" }} />
                    <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brass to-brass/60 text-[15px] font-bold text-[#1a1610]">
                      SC
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-semibold text-ink">Swiss Cottages Six</div>
                    <div className="text-[11px] text-ink-mute">Bhurban, Murree Hills · Est. 1998</div>
                  </div>
                </div>

                {/* Direct call */}
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 rounded-xl border border-line/60 bg-surface px-4 py-3.5 transition-all hover:border-brass/50 hover:text-brass active:scale-[0.98]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brass/10 text-brass">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">{PHONE_DISPLAY}</div>
                    <div className="text-[11px] text-ink-mute">Call directly · 9am–10pm PKT</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 px-4 py-3.5 transition-all hover:bg-[#25D366]/15 active:scale-[0.98]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#25D366]">{PHONE_DISPLAY}</div>
                    <div className="text-[11px] text-[#25D366]/70">WhatsApp · Reply within 2 hrs</div>
                  </div>
                </a>

                {/* Divider */}
                <div className="flex items-center gap-3 text-[11px] text-ink-dim">
                  <div className="flex-1 border-t border-line/40" />
                  or chat with Sasha
                  <div className="flex-1 border-t border-line/40" />
                </div>

                {/* Back to chat */}
                <button
                  onClick={() => setMode("chat")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-line/50 bg-surface/60 px-4 py-3 text-[12px] font-medium text-ink-mute transition-all hover:border-brass/30 hover:text-brass"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Chat with Sasha — instant AI answers
                </button>

                <div className="text-center text-[10px] text-ink-dim">
                  Outside hours? WhatsApp gets a reply within 2 hrs.
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger — split: chat + call ────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="chat-fab"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[88px] right-4 z-[9998] flex items-center overflow-hidden rounded-full border border-brass/30 bg-bg shadow-lg shadow-black/20"
            style={{
              animation: !hasOpened ? "chatPulse 2.5s ease-in-out 3s 3" : undefined,
            }}
          >
            {/* Chat side */}
            <button
              onClick={() => handleOpen("chat")}
              aria-label="Chat with Sasha"
              className="flex items-center gap-2.5 px-4 py-3 transition-all hover:bg-surface"
            >
              <div className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brass to-brass/70">
                <SparkleIcon />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </div>
              <div className="text-left">
                <div className="text-[12px] font-semibold text-ink">Ask Sasha</div>
                <div className="text-[10px] text-ink-dim">AI Concierge</div>
              </div>
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-line/60" />

            {/* Call side */}
            <button
              onClick={() => handleOpen("call")}
              aria-label="Call us"
              className="flex items-center justify-center px-3.5 py-3 text-ink-mute transition-all hover:bg-surface hover:text-brass"
              title={`Call ${PHONE_DISPLAY}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
