import { NextResponse } from "next/server";

import { FALLBACK_REVIEWS, type ReviewCard } from "@/lib/reviews-fallback";

export const revalidate = 3600;

type GoogleReview = {
  author_name?: string;
  text?: string;
  time?: number;
  rating?: number;
  profile_photo_url?: string;
};

function mapGoogleToCard(r: GoogleReview, i: number): ReviewCard {
  const rating = typeof r.rating === "number" ? r.rating : 5;
  return {
    name: r.author_name ?? `Guest ${i + 1}`,
    country: "⭐",
    flag: "Google",
    score: Math.min(10, Math.round((rating / 5) * 10 * 10) / 10),
    channel: "GOOGLE",
    quote: r.text?.slice(0, 420) ?? "",
    date: r.time ? new Date(r.time * 1000).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "",
    nights: 0,
  };
}

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const key = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !key) {
    return NextResponse.json({ source: "fallback" as const, reviews: FALLBACK_REVIEWS });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ source: "fallback" as const, reviews: FALLBACK_REVIEWS });
    }
    const data = (await res.json()) as {
      result?: { reviews?: GoogleReview[] };
      status?: string;
    };
    const raw = data.result?.reviews ?? [];
    const mapped = raw.slice(0, 12).map(mapGoogleToCard).filter((r) => r.quote.length > 0);
    if (mapped.length === 0) {
      return NextResponse.json({ source: "fallback" as const, reviews: FALLBACK_REVIEWS });
    }
    return NextResponse.json({ source: "google" as const, reviews: mapped });
  } catch {
    return NextResponse.json({ source: "fallback" as const, reviews: FALLBACK_REVIEWS });
  }
}
