// ─────────────────────────────────────────────
//  Volume Discount Tiers
//  Applied per total cart quantity (sheets)
// ─────────────────────────────────────────────
export type DiscountTier = {
  minQty: number;
  maxQty: number | null;
  rate: number;
  labelKey: string;
};

export const VOLUME_TIERS: DiscountTier[] = [
  { minQty: 0,   maxQty: 9,   rate: 0,    labelKey: 'none' },
  { minQty: 10,  maxQty: 24,  rate: 0.02, labelKey: 'tier2' },
  { minQty: 25,  maxQty: 49,  rate: 0.05, labelKey: 'tier5' },
  { minQty: 50,  maxQty: 99,  rate: 0.07, labelKey: 'tier7' },
  { minQty: 100, maxQty: null, rate: 0.10, labelKey: 'tier10' },
];

export function getVolumeTier(totalQty: number): DiscountTier {
  return (
    [...VOLUME_TIERS].reverse().find((t) => totalQty >= t.minQty) ||
    VOLUME_TIERS[0]
  );
}

export function getNextVolumeTier(totalQty: number): DiscountTier | null {
  const current = getVolumeTier(totalQty);
  const idx = VOLUME_TIERS.findIndex((t) => t.rate === current.rate);
  return VOLUME_TIERS[idx + 1] ?? null;
}

// ─────────────────────────────────────────────
//  Coupon System
//  Each coupon defines per-brand + per-prefix rates
//  No prefix match → 0%
// ─────────────────────────────────────────────
export type CouponRule = {
  brand: string;           // 'EDL' | 'LAMITAK' | '*' for all
  prefixes?: string[];     // e.g. ['WY','DXO'] — if omitted matches all codes in brand
  rate: number;            // 0.05 = 5%
};

export type Coupon = {
  code: string;
  descriptionKey: string;
  rules: CouponRule[];
  active: boolean;
  expiresAt: string | null; // ISO date string e.g. '2025-12-31' or null = no expiry
};

// ─────────────────────────────────────────────
//  COUPON CONFIG — edit this to add/remove codes
//  descriptionKey maps to messages/<locale>/discount.json → coupons.<key>
// ─────────────────────────────────────────────
export const COUPONS: Coupon[] = [
  // ── Loyalty Tiers ──────────────────────────
  // Share these codes directly with customers.
  // Higher tier = higher fixed discount on all items.
  // If volume discount is higher on a given order, that wins instead.
  {
    code: 'TPLBRONZE',
    descriptionKey: 'bronze',
    rules: [{ brand: '*', rate: 0.02 }],
    active: true,
    expiresAt: null,
  },
  {
    code: 'TPLSILVER',
    descriptionKey: 'silver',
    rules: [{ brand: '*', rate: 0.05 }],
    active: true,
    expiresAt: null,
  },
  {
    code: 'TPLGOLD',
    descriptionKey: 'gold',
    rules: [{ brand: '*', rate: 0.07 }],
    active: true,
    expiresAt: null,
  },
  {
    code: 'TPLplatinum',
    descriptionKey: 'platinum',
    rules: [{ brand: '*', rate: 0.10 }],
    active: true,
    expiresAt: null,
  },
  // ── Promotional ────────────────────────────
  {
    code: 'WELCOME10',
    descriptionKey: 'welcome10',
    rules: [{ brand: '*', rate: 0.10 }],
    active: true,
    expiresAt: '2026-12-31',
  },
  {
    code: 'EDL5',
    descriptionKey: 'edl5',
    rules: [
      { brand: 'EDL', rate: 0.05 },
      { brand: 'LAMITAK', rate: 0 },
    ],
    active: true,
    expiresAt: null,
  },
  {
    code: 'LAMITAK10',
    descriptionKey: 'lamitak10',
    rules: [
      { brand: 'LAMITAK', rate: 0.10 },
      { brand: 'EDL', rate: 0 },
    ],
    active: true,
    expiresAt: null,
  },
];

// ─────────────────────────────────────────────
//  Coupon lookup & validation
// ─────────────────────────────────────────────
export type CouponErrorCode = 'NOT_FOUND' | 'INACTIVE' | 'EXPIRED';

export type CouponValidation =
  | { valid: true;  coupon: Coupon }
  | { valid: false; errorCode: CouponErrorCode };

export function validateCoupon(code: string): CouponValidation {
  const coupon = COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );
  if (!coupon) return { valid: false, errorCode: 'NOT_FOUND' };
  if (!coupon.active) return { valid: false, errorCode: 'INACTIVE' };
  if (coupon.expiresAt) {
    const expiry = new Date(coupon.expiresAt);
    expiry.setHours(23, 59, 59);
    if (new Date() > expiry) return { valid: false, errorCode: 'EXPIRED' };
  }
  return { valid: true, coupon };
}

// Rate that a coupon gives for a specific product code + brand
export function getCouponRateForProduct(
  coupon: Coupon,
  brand: string,
  productCode: string
): number {
  // Find the most specific matching rule
  const upperCode = productCode.toUpperCase();
  const upperBrand = brand.toUpperCase();

  // First try prefix + brand match
  for (const rule of coupon.rules) {
    if (rule.brand === '*') continue; // handle wildcard later
    if (rule.brand.toUpperCase() !== upperBrand) continue;
    if (rule.prefixes && rule.prefixes.length > 0) {
      const matched = rule.prefixes.some((p) =>
        upperCode.startsWith(p.toUpperCase())
      );
      if (matched) return rule.rate;
    }
  }

  // Then try brand-only match (no prefixes specified)
  for (const rule of coupon.rules) {
    if (rule.brand === '*') continue;
    if (rule.brand.toUpperCase() !== upperBrand) continue;
    if (!rule.prefixes || rule.prefixes.length === 0) return rule.rate;
  }

  // Then try wildcard brand
  for (const rule of coupon.rules) {
    if (rule.brand === '*') return rule.rate;
  }

  return 0; // no match → 0%
}

// ─────────────────────────────────────────────
//  Promo item base discount
//  isPromo products always get at least 5%
//  Volume discount only wins if 7% or higher
// ─────────────────────────────────────────────
export const PROMO_RATE = 0.05; // 5% fixed for promo items

export function getEffectiveRate(
  volumeRate: number,
  coupon: Coupon | null,
  brand: string,
  productCode: string,
  isPromo = false,
): number {
  const couponRate = coupon ? getCouponRateForProduct(coupon, brand, productCode) : 0;

  // For promo items: base is 5%, volume only wins if >= 7%
  const baseRate = isPromo ? Math.max(PROMO_RATE, volumeRate >= 0.07 ? volumeRate : PROMO_RATE) : volumeRate;

  return Math.max(baseRate, couponRate);
}
