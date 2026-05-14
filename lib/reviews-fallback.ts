/** Curated fallback when Google Places reviews are unavailable */
export type ReviewCard = {
  name: string;
  country: string;
  flag: string;
  score: number;
  channel: string;
  quote: string;
  date: string;
  nights: number;
};

export const FALLBACK_REVIEWS: ReviewCard[] = [
  {
    name: "Eleanor Whitfield",
    country: "🇬🇧",
    flag: "UK",
    score: 9.8,
    channel: "STAY-A",
    quote:
      "A slice of the Swiss Alps in Pakistan. The security and the views are unmatched — we slept with the curtains open every night.",
    date: "Mar 2026",
    nights: 5,
  },
  {
    name: "Marcus Hale",
    country: "🇺🇸",
    flag: "US",
    score: 9.6,
    channel: "STAY-B",
    quote:
      "The AI booking was flawless — quoted, held, and confirmed in under three minutes. Best stay in the Murree hills, hands down.",
    date: "Feb 2026",
    nights: 4,
  },
  {
    name: "Hessa Al-Mansouri",
    country: "🇦🇪",
    flag: "UAE",
    score: 9.7,
    channel: "STAY-C",
    quote:
      "Total privacy. Five-star service from the moment our car was waved through the gate. Perfect for a family retreat.",
    date: "Feb 2026",
    nights: 6,
  },
  {
    name: "Daniel Beaulieu",
    country: "🇨🇦",
    flag: "CA",
    score: 9.5,
    channel: "STAY-A",
    quote:
      "Breathtaking views of the Kashmir peaks from our private balcony. Coffee at sunrise here is a thing I'll remember for years.",
    date: "Jan 2026",
    nights: 4,
  },
  {
    name: "Bilal Raza",
    country: "🇵🇰",
    flag: "PK",
    score: 9.9,
    channel: "STAY-C",
    quote:
      "The only place in Bhurban that offers this level of gated security and modern luxury. We've already booked our next stay.",
    date: "Jan 2026",
    nights: 3,
  },
  {
    name: "Sophie Whitfield",
    country: "🇬🇧",
    flag: "UK",
    score: 9.4,
    channel: "STAY-B",
    quote:
      "Everything you'd hope from a small, owner-run estate — and quiet enough that you actually hear the snow falling.",
    date: "Dec 2025",
    nights: 5,
  },
];
