"use client";

import { useState } from "react";

import { Icon } from "@/lib/icon";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      checkIn: String(fd.get("checkIn") ?? ""),
      checkOut: String(fd.get("checkOut") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: unknown };
        const msg =
          typeof j.error === "string"
            ? j.error
            : j.error && typeof j.error === "object"
              ? "Please check the form fields."
              : "Request failed";
        throw new Error(msg);
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-lg border border-line bg-surface p-6 md:grid-cols-2"
      id="contact-form"
    >
      <div className="md:col-span-2">
        <span className="eyebrow text-brass">Direct inquiry</span>
        <h3 className="display mt-2 text-2xl text-ink">We reply within minutes.</h3>
        <p className="mt-2 text-sm text-ink-mute">
          Skip the platforms. Send us your dates and guest count — our host will personally confirm availability and rates over WhatsApp.
        </p>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Name</span>
        <input
          name="name"
          required
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Email</span>
        <input
          name="email"
          type="email"
          required
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Phone</span>
        <input
          name="phone"
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Check-in</span>
        <input
          name="checkIn"
          type="date"
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Check-out</span>
        <input
          name="checkOut"
          type="date"
          className="rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <label className="md:col-span-2 flex flex-col gap-1 text-sm">
        <span className="text-ink-mute">Message</span>
        <textarea
          name="message"
          rows={4}
          className="resize-y rounded-md border border-line-2 bg-bg-2 px-3 py-2 text-ink outline-none focus:border-brass"
        />
      </label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "loading"} className="btn btn-primary">
          {status === "loading" ? "Sending…" : "Send to concierge"}
          <Icon name="send" size={14} />
        </button>
        {status === "ok" && <span className="text-sm text-pine">Sent. We will WhatsApp you shortly.</span>}
        {status === "err" && error && <span className="text-sm text-rose">{error}</span>}
      </div>
    </form>
  );
}
