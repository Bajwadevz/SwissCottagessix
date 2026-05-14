import type { MetadataRoute } from "next";

const base = () => (process.env.NEXT_PUBLIC_SITE_URL ?? "https://swisscottagessix.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const b = base();
  return [
    {
      url: b,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
