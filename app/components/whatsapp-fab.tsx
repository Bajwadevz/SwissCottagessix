"use client";

import { Icon } from "@/lib/icon";

export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/923190514569"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 grid size-[60px] place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 group-hover:animate-ping pointer-events-none" />
      <Icon name="whatsapp" size={32} />
    </a>
  );
}
