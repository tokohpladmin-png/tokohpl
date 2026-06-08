// ─────────────────────────────────────────────
//  Volume Discount Tiers
//  Applied per total cart quantity (sheets)
// ─────────────────────────────────────────────
export type DiscountTier = {
  minQty: number;
  maxQty: number | null;
  rate: number;
  label: string;
};

export const VOLUME_TIERS: DiscountTier[] = [
  { minQty: 0,   maxQty: 9,   rate: 0,    label: 'Tidak ada diskon' },
  { minQty: 10,  maxQty: 24,  rate: 0.02, label: 'Diskon 2%' },
  { minQty: 25,  maxQty: 49,  rate: 0.05, label: 'Diskon 5%' },
  { minQty: 50,  maxQty: 99,  rate: 0.07, label: 'Diskon 7%' },
  { minQty: 100, maxQty: null, rate: 0.10, label: 'Diskon 10%' },
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
  brand: string;           // 'EDL' | 'LAMITAK' | 'AICA' | '*' for all
  prefixes?: string[];     // e.g. ['WY','DXO'] — if omitted matches all codes in brand
  rate: number;            // 0.05 = 5%
};

export type Coupon = {
  code: string;
  description: string;
  rules: CouponRule[];
  active: boolean;
  expiresAt: string | null; // ISO date string e.g. '2025-12-31' or null = no expiry
};

// ─────────────────────────────────────────────
//  COUPON CONFIG — edit this to add/remove codes
// ─────────────────────────────────────────────
export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    description: '10% off semua produk',
    rules: [
      { brand: '*', rate: 0.10 },
    ],
    active: true,
    expiresAt: '2026-12-31',
  },
  {
    code: 'EDL5',
    description: '5% off EDL HPL (WY, DXO) — tidak berlaku untuk ATS, ARTE',
    rules: [
      { brand: 'EDL', prefixes: ['WY', 'DXO'], rate: 0.05 },
      { brand: 'EDL', prefixes: ['ATS', 'ARTE'], rate: 0 },
      { brand: 'LAMITAK', rate: 0.05 },
      { brand: 'AICA', rate: 0 },
    ],
    active: true,
    expiresAt: null,
  },
  {
    code: 'AICA15',
    description: '15% off semua produk AICA',
    rules: [
      { brand: 'AICA', rate: 0.15 },
      { brand: 'EDL', rate: 0 },
      { brand: 'LAMITAK', rate: 0 },
    ],
    active: true,
    expiresAt: '2026-06-30',
  },
  {
    code: 'LAMITAK10',
    description: '10% off Lamitak',
    rules: [
      { brand: 'LAMITAK', rate: 0.10 },
      { brand: 'EDL', rate: 0 },
      { brand: 'AICA', rate: 0 },
    ],
    active: true,
    expiresAt: null,
  },
];

// ─────────────────────────────────────────────
//  Coupon lookup & validation
// ─────────────────────────────────────────────
export type CouponValidation =
  | { valid: true;  coupon: Coupon }
  | { valid: false; error: string };

export function validateCoupon(code: string): CouponValidation {
  const coupon = COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );
  if (!coupon) return { valid: false, error: 'Kode kupon tidak ditemukan' };
  if (!coupon.active) return { valid: false, error: 'Kupon sudah tidak aktif' };
  if (coupon.expiresAt) {
    const expiry = new Date(coupon.expiresAt);
    expiry.setHours(23, 59, 59);
    if (new Date() > expiry) return { valid: false, error: 'Kupon sudah kadaluarsa' };
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
//  Per-line effective discount
//  Higher of volume rate vs coupon rate wins
// ─────────────────────────────────────────────
export function getEffectiveRate(
  volumeRate: number,
  coupon: Coupon | null,
  brand: string,
  productCode: string
): number {
  if (!coupon) return volumeRate;
  const couponRate = getCouponRateForProduct(coupon, brand, productCode);
  return Math.max(volumeRate, couponRate);
}
