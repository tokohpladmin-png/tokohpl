import type { Product } from '@/types/product';
import { slugify } from './utils';
import { getProductImageUrl } from './cloudinary';
import { getEdgeBand } from './edgeband';

function addPpn(price: number): number {
  return Math.round(price * 1.11);
}

/**
 * CSV columns:
 *   Item Name   — e.g. "DA 2081N - EDL HPL 4'x8' | TITAN I"
 *                 or   "ART 1009 XM - LAMITAK HPL 4' x 8' | LUNIGIANA UNO"
 *   Design Name — product code for EDL (e.g. "DA 2081N"), design name for Lamitak
 *   Code        — design name for EDL (e.g. "TITAN I"), product code for Lamitak (e.g. "ART 1009XM")
 *   Rate        — base price (PPN excluded)
 *   Status      — "Active" / "Inactive"
 *   Size        — e.g. "1220 x 2440 mm" or "4'x8' / 1220 x 2440mm"
 *   Collection  — "Wood","Solid","Pattern","Marble","Stone","Metal","Aptico" (EDL)
 *                 "Woods","Solids","Patterns" (Lamitak)
 *   Sub Collection, Thickness, New Arrivals, Best Sellers, Promo Items
 */
export function parseProductsFromCsv(csvText: string): Product[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Normalise headers to lowercase with underscores
  const rawHeaders = parseCsvLine(lines[0]);
  const headers = rawHeaders.map((h) => h.trim().toLowerCase().replace(/[^a-z0-9]/g, '_'));

  const col = (row: string[], key: string): string => {
    const idx = headers.indexOf(key);
    return idx >= 0 ? (row[idx] || '').trim() : '';
  };

  const products: Product[] = [];
  const slugSeen: Record<string, number> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCsvLine(line);
    const itemName    = col(values, 'item_name');
    const designName  = col(values, 'design_name');
    const codeCol     = col(values, 'code');
    const rateRaw     = col(values, 'rate');
    const status      = col(values, 'status').toLowerCase();
    const size        = col(values, 'size');
    const collection  = col(values, 'collection');
    const subColl     = col(values, 'sub_collection');
    const thickness   = col(values, 'thickness');
    const isNew       = col(values, 'new_arrivals').toLowerCase() === 'true';
    const isBest      = col(values, 'best_sellers').toLowerCase() === 'true';
    const isPromo     = col(values, 'promo_items').toLowerCase() === 'true';

    if (status !== 'active') continue;

    // ── Detect brand from Item Name ─────────────────────────────────────────
    const itemUpper = itemName.toUpperCase();
    if (itemUpper.includes('AICA')) continue; // exclude AICA
    
    let brand: 'EDL' | 'LAMITAK';
    if (itemUpper.includes('EDL')) {
      brand = 'EDL';
    } else if (itemUpper.includes('LAMITAK')) {
      brand = 'LAMITAK';
    } else {
      continue; // skip unknown brands
    }

    // ── Extract product code & design name ──────────────────────────────────
    // EDL:     Design Name = product code ("DA 2081N"), Code = design ("TITAN I")
    // Lamitak: Code = product code ("ART 1009XM"), Design Name = design ("LUNIGIANA UNO")
    let code: string;
    let designLabel: string;

    if (brand === 'EDL') {
      code        = designName.toUpperCase();   // "DA 2081N"
      designLabel = codeCol;                    // "TITAN I"
    } else {
      code        = codeCol.toUpperCase();      // "ART 1009XM"
      designLabel = designName;                 // "LUNIGIANA UNO"
    }

    if (!code) continue;

    // ── Price (Rate + PPN 11%) ───────────────────────────────────────────────
    const rate = parseFloat(rateRaw.replace(/[^0-9.]/g, ''));
    const price = isNaN(rate) ? null : addPpn(rate);

    // ── Slug (deduplicated) ──────────────────────────────────────────────────
    let baseSlug = slugify(`${brand.toLowerCase()}-${code}-${designLabel}`).slice(0, 90);
    let slug = baseSlug;
    if (slugSeen[baseSlug] !== undefined) {
      slugSeen[baseSlug]++;
      slug = `${baseSlug}-${slugSeen[baseSlug]}`;
    } else {
      slugSeen[baseSlug] = 0;
    }

    // ── Image URL ────────────────────────────────────────────────────────────
    const imageUrl = getProductImageUrl(brand, code);

    // ── Edge band ────────────────────────────────────────────────────────────
    const edgeBand = getEdgeBand(code) ?? undefined;

    const product: Product = {
      slug,
      code,
      name: designLabel || code,
      brand,
      collection: collection || undefined,
      subCollection: subColl || undefined,
      category: collection || undefined,
      size: size || undefined,
      thickness: thickness || undefined,
      price,
      taxIncluded: true,
      currency: 'IDR',
      active: true,
      isNew,
      isBestSeller: isBest,
      isPromo,
      imageUrl,
      edgeBand,
    };

    products.push(product);
  }

  return products;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
