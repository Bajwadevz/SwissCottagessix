export type PricingResult = {
  guests: number;
  nights: number;
  weekdayNights: number;
  weekendNights: number;
  weekdayRate: number;
  weekendRate: number;
  weekdaySubtotal: number;
  weekendSubtotal: number;
  breakfastExtra: number;
  subtotalBeforeDiscount: number;
  stayDiscountPct: number;
  stayDiscount: number;
  totalPrice: number;
  listPrice: number;
  totalListPrice: number;
  totalSavings: number;
  savingsPct: number;
  advanceFee: number;
  upsellMessage: string | null;
};

/** Weekday rates Mon–Thu + Sun (direct booking) */
const WEEKDAY_RATES: Record<string, number> = {
  "1-4": 28_000,
  "5-6": 32_000,
  "7-8": 38_000,
};

/** Weekend premium rates Fri + Sat (~28–29% above weekday) */
const WEEKEND_RATES: Record<string, number> = {
  "1-4": 36_000,
  "5-6": 42_000,
  "7-8": 45_000,
};

const LIST_PRICE = 45_000;
export const ADVANCE_FEE_PCT = 0.10;

function guestTier(g: number): string {
  if (g <= 4) return "1-4";
  if (g <= 6) return "5-6";
  return "7-8";
}

/** Friday (5) and Saturday (6) carry the weekend premium */
export function isWeekendNight(date: Date): boolean {
  const d = date.getDay();
  return d === 5 || d === 6;
}

function multiNightDiscountPct(nights: number): number {
  if (nights >= 7) return 15;
  if (nights >= 5) return 10;
  if (nights >= 4) return 7;
  if (nights >= 3) return 5;
  return 0;
}

function buildUpsellMessage(nights: number): string | null {
  if (nights === 1) return "Add 1 more night — save 5% on 3+ night stays";
  if (nights === 2) return "Add 1 more night — unlock 5% off your entire stay";
  if (nights === 3) return "Add 1 more night — 4+ nights unlocks 7% off";
  if (nights === 4) return "Add 1 more night — 5+ nights unlocks 10% off";
  if (nights === 5 || nights === 6) {
    const gap = 7 - nights;
    return `Add ${gap} more night${gap > 1 ? "s" : ""} — 7 nights unlocks 15% off`;
  }
  return null;
}

export function calculatePricing(
  guests: number,
  nights: number,
  checkIn?: Date,
): PricingResult {
  const g = Math.min(8, Math.max(1, Math.round(guests)));
  const n = Math.max(1, Math.round(nights));
  const tier = guestTier(g);

  const weekdayRate = WEEKDAY_RATES[tier];
  const weekendRate = WEEKEND_RATES[tier];

  let weekdayNights = n;
  let weekendNights = 0;

  if (checkIn) {
    weekdayNights = 0;
    weekendNights = 0;
    const cur = new Date(checkIn);
    for (let i = 0; i < n; i++) {
      if (isWeekendNight(cur)) weekendNights++;
      else weekdayNights++;
      cur.setDate(cur.getDate() + 1);
    }
  }

  const weekdaySubtotal = weekdayRate * weekdayNights;
  const weekendSubtotal = weekendRate * weekendNights;
  const extraGuests = Math.max(0, g - 4);
  const breakfastExtra = extraGuests * 300 * n;
  const subtotalBeforeDiscount = weekdaySubtotal + weekendSubtotal + breakfastExtra;
  const stayDiscountPct = multiNightDiscountPct(n);
  const stayDiscount = Math.round((subtotalBeforeDiscount * stayDiscountPct) / 100);
  const totalPrice = subtotalBeforeDiscount - stayDiscount;
  const totalListPrice = LIST_PRICE * n;
  const totalSavings = totalListPrice - totalPrice;

  return {
    guests: g,
    nights: n,
    weekdayNights,
    weekendNights,
    weekdayRate,
    weekendRate,
    weekdaySubtotal,
    weekendSubtotal,
    breakfastExtra,
    subtotalBeforeDiscount,
    stayDiscountPct,
    stayDiscount,
    totalPrice,
    listPrice: LIST_PRICE,
    totalListPrice,
    totalSavings,
    savingsPct: Math.round((totalSavings / Math.max(1, totalListPrice)) * 100),
    advanceFee: Math.round(totalPrice * ADVANCE_FEE_PCT),
    upsellMessage: buildUpsellMessage(n),
  };
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
