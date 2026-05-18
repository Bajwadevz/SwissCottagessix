import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

import { JsonLd } from "./json-ld";
import { Providers } from "./providers";

import "./globals.css";

import { WhatsAppFAB } from "./components/whatsapp-fab";
import { ChatWidget } from "./components/chat-widget";

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
    default: "Swiss Cottages Six — Best Luxury Cottages Bhurban Murree | 2 min from PC Hotel",
    template: "%s · Swiss Cottages Six",
  },
  description:
    "Best place to stay near PC Bhurban Murree — exclusive gated alpine estate at 6,800 ft. Private luxury cottage, 3 bedrooms, up to 8 guests, panoramic Kashmir views. Direct booking from PKR 28,000/night. Top-rated: 9.2/10 · 384 verified stays.",
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
    "cottage near PC Bhurban",
    "weekend getaway Murree",
    "family cottage Bhurban",
    "luxury villa Murree Hills",
    "Bhurban holiday cottage",
    "Murree holiday home",
    "cottage for rent near Islamabad",
    "Swiss cottage Murree",
    "gated community Bhurban",
    "best cottage Bhurban",
    "holiday rental Murree",
    "PC Bhurban hotel alternative",
    "best places to stay in Murree",
    "top hotels Bhurban",
    "best hotel near PC Bhurban",
    "luxury resort Bhurban",
    "best cottage Murree Hills",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site,
    siteName: "Swiss Cottages Six",
    title: "Swiss Cottages Six — Best Luxury Cottages in Bhurban, Murree Hills",
    description:
      "Rated 9.2/10 across 384 stays. Exclusive gated estate 2 min from PC Bhurban — 3 bedrooms, up to 8 guests, panoramic Kashmir views. Direct booking from PKR 28,000/night.",
    images: [
      {
        url: `${site}/cottage/aerial.jpg`,
        width: 1200,
        height: 630,
        alt: "Swiss Cottages Six — aerial view of the gated estate, Bhurban, Murree Hills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Cottages Six — Luxury Cottage Bhurban, Murree",
    description:
      "Private luxury cottage near PC Bhurban, Murree Hills. Up to 8 guests. Direct rates from PKR 28,000/night, no platform fees.",
    images: [`${site}/cottage/aerial.jpg`],
  },
  alternates: { canonical: site },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
        <WhatsAppFAB />
        <ChatWidget />
      </body>
    </html>
  );
}
