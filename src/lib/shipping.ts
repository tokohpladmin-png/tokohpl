// ─────────────────────────────────────────────
//  Shipping Configuration
// ─────────────────────────────────────────────

export type ShippingRegion = 'jawa-bali' | 'luar-jawa';

export type ShippingZone = {
  region: ShippingRegion;
  labelKey: string;
  freeThreshold: number;   // grand total >= this → free shipping
  flatRate: number;        // otherwise this flat fee
  estimasiKey: string;     // delivery estimate text key
};

// labelKey/estimasiKey map to messages/<locale>/shippingZones.json
export const SHIPPING_ZONES: Record<ShippingRegion, ShippingZone> = {
  'jawa-bali': {
    region: 'jawa-bali',
    labelKey: 'jawaBali',
    freeThreshold: 10_000_000,
    flatRate: 100_000,
    estimasiKey: 'default',
  },
  'luar-jawa': {
    region: 'luar-jawa',
    labelKey: 'luarJawa',
    freeThreshold: 25_000_000,
    flatRate: 250_000,
    estimasiKey: 'default',
  },
};

// All Indonesian provinces mapped to their shipping region
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
  // Sort: Jawa & Bali first, then alphabetical
  const ra = PROVINCE_REGION[a];
  const rb = PROVINCE_REGION[b];
  if (ra === rb) return a.localeCompare(b);
  return ra === 'jawa-bali' ? -1 : 1;
});

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

export function getDeliveryEstimateKey(province: string): string | null {
  const zone = getShippingZone(province);
  return zone ? zone.estimasiKey : null;
}

// ── Crating & chargeable weight (for cartStore compatibility) ─────────────────

export const JABODETABEK = ['Jakarta', 'Bogor', 'Tangerang', 'Bekasi', 'Depok'];

export type CratingInfo = {
  sheets: number;
  crates: number;
  cratingWeight: number;
};

export function isJabodetabek(city: string): boolean {
  return JABODETABEK.some(j => city.toLowerCase().includes(j.toLowerCase()));
}

export function calculateCrating(sheets: number): CratingInfo {
  const crates = Math.ceil(sheets / 20);
  return { sheets, crates, cratingWeight: crates * 10 };
}

export function calculateChargeableWeight(
  baseWeightKg: number,
  sheets: number,
  city: string,
): number {
  if (isJabodetabek(city)) return baseWeightKg;
  const { cratingWeight } = calculateCrating(sheets);
  return baseWeightKg + cratingWeight;
}
