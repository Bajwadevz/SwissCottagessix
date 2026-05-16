import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

import { JsonLd } from "./json-ld";
import { Providers } from "./providers";

import "./globals.css";

import { VapiBridge } from "./components/vapi-bridge";
import { WhatsAppFAB } from "./components/whatsapp-fab";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://swisscottagessix.com";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Swiss Cottages Six — Luxury cottage Bhurban · Gated community Murree",
    template: "%s · Swiss Cottages Six",
  },
  description:
    "Luxury private cottages near PC Bhurban, Murree Hills — 5 min from Pearl Continental Bhurban. Exclusive gated estate at 6,800 ft with Kashmir peak views, 24/7 security, and direct booking. Ideal for families up to 8 guests.",
  keywords: [
    "Luxury Cottage Bhurban",
    "Family Villa Murree",
    "Private Cottage near PC Bhurban",
    "luxury cottage Bhurban Murree",
    "Bhurban cottage for rent",
    "private villa Murree Hills",
    "gated community Murree",
    "Swiss Cottages Six",
    "PC Bhurban cottage",
    "Murree Hills vacation rental",
    "Bhurban vacation home",
    "luxury family accommodation Murree",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site,
    siteName: "Swiss Cottages Six",
    title: "Swiss Cottages Six — Luxury Cottage Bhurban, Murree Hills",
    description:
      "Luxury private cottages near PC Bhurban, Murree. 3 bedrooms, up to 8 guests, gated estate at 6,800 ft. Direct booking — no platform fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Cottages Six — Luxury Cottage Bhurban, Murree",
    description:
      "Private luxury cottages near PC Bhurban, Murree Hills. Up to 8 guests. Direct rates, no platform fees.",
  },
  alternates: { canonical: site },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#131210",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <style>{`
          :root {
            --f-display: var(--font-playfair), "Playfair Display", "Garamond", serif;
            --f-ui: var(--font-inter), "Inter", "Helvetica Neue", system-ui, sans-serif;
            --f-mono: var(--font-jetbrains), "JetBrains Mono", ui-monospace, monospace;
          }
        `}</style>
        <JsonLd />
        <Providers>{children}</Providers>
        <VapiBridge />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
