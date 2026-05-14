import type { Metadata } from "next";

import { HomePage } from "./components/home-page";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://swisscottagessix.com").replace(/\/$/, "");

/** Page-level SEO refinements (merges with `app/layout.tsx`). */
export const metadata: Metadata = {
  title: "Luxury cottage Bhurban · Premium Murree vacation rental",
  alternates: { canonical: site },
};

export default function Page() {
  return <HomePage />;
}
