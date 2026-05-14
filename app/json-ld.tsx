import { buildLodgingJsonLd } from "@/lib/schema/json-ld";

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://swisscottagessix.com";
}

export function JsonLd() {
  const graph = buildLodgingJsonLd(siteUrl());
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
