import { LAMITAK_NUM_FMT, EDL_CODE_MAP } from './cloudinaryMap';

const BASE_PI  = 'https://res.cloudinary.com/varindo/image/upload/product-images';
const BASE_EDL = 'https://res.cloudinary.com/varindo/image/upload';

// Set to true to proxy images through /api/img (bypasses host_not_allowed)
// Set to false once Cloudinary delivery is fully public
const USE_PROXY = true;

function proxyUrl(cloudinaryUrl: string): string {
  if (!USE_PROXY) return cloudinaryUrl;
  return `/api/img?src=${encodeURIComponent(cloudinaryUrl)}`;
}

/**
 * Extract the numeric portion from a Lamitak product code.
 * "WY 5216D" → "5216", "SCT 15159VU" → "15159", "CC 47101S" → "47101"
 */
function extractNum(code: string): string | null {
  const m = code.match(/\d+/);
  return m ? m[0] : null;
}

function lamitakUrl(code: string): string | null {
  const num = extractNum(code);
  if (!num) return null;
  const fmt = LAMITAK_NUM_FMT[num];
  if (!fmt) return null;
  return proxyUrl(`${BASE_PI}/${num}.${fmt}`);
}

function edlUrl(code: string): string | null {
  const entry = EDL_CODE_MAP[code.toUpperCase()];
  if (!entry) return null;
  return proxyUrl(`${BASE_EDL}/${entry.id}.${entry.fmt}`);
}

export function getProductImageUrl(brand: string, code: string): string {
  if (!code) return '';
  const upper = brand?.toUpperCase();
  if (upper === 'LAMITAK') return lamitakUrl(code) ?? '';
  if (upper === 'EDL') return edlUrl(code) ?? '';
  return '';
}
