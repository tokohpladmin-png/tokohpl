import { LAMITAK_NUM_FMT, EDL_DESIGN_MAP, EDL_CODE_MAP } from './cloudinaryMap';

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
// Two lookup paths:
// 1. By design name (CSV "Code" column, e.g. "TITAN I") → p063-titan-i images
// 2. By product code prefix (e.g. "DH 1596QT") → non-p063 images
function edlUrl(productCode: string, designName: string): string {
  // Try product code first (non-p063 images like DH 1596QT, DWT 3776W etc.)
  const byCode = EDL_CODE_MAP[productCode.toUpperCase()];
  if (byCode) return proxy(byCode);

  // Try design name (p063-* images cover most EDL products)
  if (designName) {
    const byDesign = EDL_DESIGN_MAP[designName.toUpperCase()];
    if (byDesign) return proxy(byDesign);
  }

  return '';
}

export function getProductImageUrl(
  brand: string,
  code: string,
  designName?: string,
): string {
  if (!code) return '';
  const b = brand?.toUpperCase();
  if (b === 'LAMITAK') return lamitakUrl(code);
  if (b === 'EDL') return edlUrl(code, designName ?? '');
  return '';
}
