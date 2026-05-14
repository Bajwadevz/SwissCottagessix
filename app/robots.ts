import type { MetadataRoute } from "next";

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://swisscottagessix.com";

export default function robots(): MetadataRoute.Robots {
  const b = base().replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${b}/sitemap.xml`,
  };
}
