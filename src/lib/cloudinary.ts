import { LAMITAK_NUM_FMT, EDL_CODE_MAP } from './cloudinaryMap';

const USE_PROXY = true;
const BASE      = 'https://res.cloudinary.com/varindo/image/upload';
const BASE_PI   = `${BASE}/product-images`;

function proxy(url: string): string {
  return USE_PROXY ? `/api/img?src=${encodeURIComponent(url)}` : url;
}

// ── Lamitak ────────────────────────────────────────────────────────────────────
// product-images/{num}.{ext} where num = digits extracted from product code
// "WY 5216D" → 5216, "SCT 15159VU" → 15159, "CC 47101S" → 47101
function lamitakUrl(code: string): string {
  const m = code.match(/\d+/);
  if (!m) return '';
  const fmt = LAMITAK_NUM_FMT[m[0]];
  return fmt ? proxy(`${BASE_PI}/${m[0]}.${fmt}`) : '';
}

// ── EDL ────────────────────────────────────────────────────────────────────────
// By product code (e.g. "DA 2081N") → edl/{public_id}.{ext}
function edlUrl(productCode: string): string {
  const byCode = EDL_CODE_MAP[productCode.toUpperCase()];
  return byCode ? proxy(byCode) : '';
}

export function getProductImageUrl(
  brand: string,
  code: string,
  designName?: string,
): string {
  if (!code) return '';
  const b = brand?.toUpperCase();
  if (b === 'LAMITAK') return lamitakUrl(code);
  if (b === 'EDL') return edlUrl(code);
  return '';
}
