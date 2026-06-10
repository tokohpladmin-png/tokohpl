// ─────────────────────────────────────────────
//  Shipping Configuration
// ─────────────────────────────────────────────

export type ShippingRegion = 'jawa-bali' | 'luar-jawa';

export type ShippingZone = {
  region: ShippingRegion;
  label: string;
  freeThreshold: number;   // grand total >= this → free shipping
  flatRate: number;        // flat rate when below threshold (placeholder until OTW rate card)
  estimasi: string;
};

export const SHIPPING_ZONES: Record<ShippingRegion, ShippingZone> = {
  'jawa-bali': {
    region: 'jawa-bali',
    label: 'Jawa & Bali',
    freeThreshold: 10_000_000,
    flatRate: 100_000,
    estimasi: '3–7 hari kerja',
  },
  'luar-jawa': {
    region: 'luar-jawa',
    label: 'Luar Jawa & Bali',
    freeThreshold: 25_000_000,
    flatRate: 250_000,
    estimasi: '7–21 hari kerja',
  },
};

// ─────────────────────────────────────────────
//  Province → Region map
// ─────────────────────────────────────────────
export const PROVINCE_REGION: Record<string, ShippingRegion> = {
  // Jawa & Bali
  'DKI Jakarta':    'jawa-bali',
  'Banten':         'jawa-bali',
  'Jawa Barat':     'jawa-bali',
  'Jawa Tengah':    'jawa-bali',
  'DI Yogyakarta':  'jawa-bali',
  'Jawa Timur':     'jawa-bali',
  'Bali':           'jawa-bali',
  // Sumatera
  'Aceh':                    'luar-jawa',
  'Sumatera Utara':          'luar-jawa',
  'Sumatera Barat':          'luar-jawa',
  'Riau':                    'luar-jawa',
  'Kepulauan Riau':          'luar-jawa',
  'Jambi':                   'luar-jawa',
  'Sumatera Selatan':        'luar-jawa',
  'Bangka Belitung':         'luar-jawa',
  'Bengkulu':                'luar-jawa',
  'Lampung':                 'luar-jawa',
  // Kalimantan
  'Kalimantan Barat':        'luar-jawa',
  'Kalimantan Tengah':       'luar-jawa',
  'Kalimantan Selatan':      'luar-jawa',
  'Kalimantan Timur':        'luar-jawa',
  'Kalimantan Utara':        'luar-jawa',
  // Sulawesi
  'Sulawesi Utara':          'luar-jawa',
  'Gorontalo':               'luar-jawa',
  'Sulawesi Tengah':         'luar-jawa',
  'Sulawesi Barat':          'luar-jawa',
  'Sulawesi Selatan':        'luar-jawa',
  'Sulawesi Tenggara':       'luar-jawa',
  // Nusa Tenggara
  'Nusa Tenggara Barat':     'luar-jawa',
  'Nusa Tenggara Timur':     'luar-jawa',
  // Maluku
  'Maluku':                  'luar-jawa',
  'Maluku Utara':            'luar-jawa',
  // Papua
  'Papua Barat':             'luar-jawa',
  'Papua':                   'luar-jawa',
  'Papua Selatan':           'luar-jawa',
  'Papua Tengah':            'luar-jawa',
  'Papua Pegunungan':        'luar-jawa',
  'Papua Barat Daya':        'luar-jawa',
};

export const ALL_PROVINCES = Object.keys(PROVINCE_REGION).sort((a, b) => {
  const ra = PROVINCE_REGION[a];
  const rb = PROVINCE_REGION[b];
  if (ra === rb) return a.localeCompare(b);
  return ra === 'jawa-bali' ? -1 : 1;
});

// ─────────────────────────────────────────────
//  Crating Logic
//  Outside Jabodetabek → wooden crate required
//  Max 20 sheets/crate, 10 kg/crate added to chargeable weight
//  No crating for: Jakarta, Bogor, Tangerang, Bekasi, Depok
// ─────────────────────────────────────────────

/** City names (lowercase for comparison) that are exempt from crating */
const JABODETABEK_CITIES = [
  'jakarta',
  'jakarta utara',
  'jakarta selatan',
  'jakarta barat',
  'jakarta timur',
  'jakarta pusat',
  'kota jakarta utara',
  'kota jakarta selatan',
  'kota jakarta barat',
  'kota jakarta timur',
  'kota jakarta pusat',
  'bogor',
  'kota bogor',
  'kabupaten bogor',
  'tangerang',
  'kota tangerang',
  'tangerang selatan',
  'kota tangerang selatan',
  'kabupaten tangerang',
  'bekasi',
  'kota bekasi',
  'kabupaten bekasi',
  'depok',
  'kota depok',
];

/**
 * Returns true if the city is within Jabodetabek (no crating needed).
 * Accepts free-form city text entered by the customer.
 */
export function isJabodetabek(city: string): boolean {
  const normalized = city.toLowerCase().trim();
  return JABODETABEK_CITIES.some((jabo) => {
    // Check if the city contains any of the jabodetabek keywords
    return normalized.includes(jabo) || jabo.includes(normalized);
  });
}

export type CratingInfo = {
  required: boolean;
  totalSheets: number;
  cratesNeeded: number;
  cratingWeightKg: number;  // total extra weight from crates
};

/**
 * Calculate crating requirements for a given city + total sheet count.
 * Returns crating info; cratingWeightKg is added to base product weight
 * to get the total chargeable weight.
 */
export function calculateCrating(city: string, totalSheets: number): CratingInfo {
  if (!city || totalSheets <= 0 || isJabodetabek(city)) {
    return { required: false, totalSheets, cratesNeeded: 0, cratingWeightKg: 0 };
  }
  const SHEETS_PER_CRATE = 20;
  const KG_PER_CRATE = 10;
  const cratesNeeded = Math.ceil(totalSheets / SHEETS_PER_CRATE);
  const cratingWeightKg = cratesNeeded * KG_PER_CRATE;
  return { required: true, totalSheets, cratesNeeded, cratingWeightKg };
}

// ─────────────────────────────────────────────
//  Shipping helpers
// ─────────────────────────────────────────────

export function getShippingZone(province: string): ShippingZone | null {
  const region = PROVINCE_REGION[province];
  if (!region) return null;
  return SHIPPING_ZONES[region];
}

export function calculateShipping(province: string, grandTotal: number): number {
  const zone = getShippingZone(province);
  if (!zone) return 0;
  return grandTotal >= zone.freeThreshold ? 0 : zone.flatRate;
}

export function getDeliveryEstimate(province: string): string {
  const zone = getShippingZone(province);
  if (!zone) return '';
  return zone.estimasi;
}

/**
 * Calculate total chargeable weight for a cart.
 * Adds base product weight + crating overhead (if applicable).
 *
 * @param items  Array of { weightKgPerSheet, quantity }
 * @param city   Destination city (used to determine crating)
 */
export function calculateChargeableWeight(
  items: Array<{ weightKgPerSheet: number; quantity: number }>,
  city: string
): { baseWeightKg: number; cratingWeightKg: number; totalWeightKg: number; crating: CratingInfo } {
  const totalSheets = items.reduce((sum, i) => sum + i.quantity, 0);
  const baseWeightKg = items.reduce((sum, i) => sum + i.weightKgPerSheet * i.quantity, 0);
  const crating = calculateCrating(city, totalSheets);
  const totalWeightKg = baseWeightKg + crating.cratingWeightKg;
  return { baseWeightKg, cratingWeightKg: crating.cratingWeightKg, totalWeightKg, crating };
}
