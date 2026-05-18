export type PricingResult = {
  guests: number;
  nights: number;
  pricePerNight: number;
  breakfastExtra: number;
  totalPrice: number;
  listPrice: number;
  totalListPrice: number;
  discountPerNight: number;
  totalDiscount: number;
  savingsPct: number;
  /** 10 % advance reservation fee required to secure the booking */
  advanceFee: number;
};

/** Advance booking fee as a fraction of totalPrice */
export const ADVANCE_FEE_PCT = 0.10;

/** Base nightly list rate before direct-booking discount */
const LIST_PRICE = 40_000;

/**
 * Strict tiered pricing for Swiss Cottages Six.
 *
 * Tiers (PKR / night):
 *   1–4 guests  → 28,000  (includes breakfast for 4)
 *   5–6 guests  → 32,000
 *   7–8 guests  → 38,000  (max capacity)
 *
 * Extra breakfast/amenities: +300 PKR × extra guests (beyond 4) × nights
 */
export function calculatePricing(guests: number, nights: number): PricingResult {
  const g = Math.min(8, Math.max(1, Math.round(guests)));
  const n = Math.max(1, Math.round(nights));

  let pricePerNight: number;
  if (g <= 4) pricePerNight = 28_000;
  else if (g <= 6) pricePerNight = 32_000;
  else pricePerNight = 38_000;

  const extraGuests = Math.max(0, g - 4);
  const breakfastExtra = extraGuests * 300 * n;
  const totalPrice = pricePerNight * n + breakfastExtra;
  const totalListPrice = LIST_PRICE * n;
  const totalDiscount = totalListPrice - totalPrice;

  return {
    guests: g,
    nights: n,
    pricePerNight,
    breakfastExtra,
    totalPrice,
    listPrice: LIST_PRICE,
    totalListPrice,
    discountPerNight: LIST_PRICE - pricePerNight,
    totalDiscount,
    savingsPct: Math.round((totalDiscount / totalListPrice) * 100),
    advanceFee: Math.round(totalPrice * ADVANCE_FEE_PCT),
  };
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
