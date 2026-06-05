import type { Product } from '@/types/product';
import { slugify } from './utils';
import { getProductImageCandidates } from './cloudinary';

function addPpn(price?: number | null): number | null {
  if (typeof price !== 'number' || isNaN(price)) return null;
  return Math.round(price * 1.11);
}

function parsePrice(raw?: string): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function parseBool(raw?: string): boolean {
  const v = (raw || '').toLowerCase().trim();
  return v === 'true' || v === '1' || v === 'yes' || v === 'active';
}

export function parseProductsFromCsv(csvText: string): Product[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_'));

  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // CSV-aware split respecting quoted fields
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || '').trim();
    });

    const brand = (row['brand'] || row['merk'] || 'LAMITAK').toUpperCase() as 'EDL' | 'LAMITAK';

    // Code: EDL may embed code in item name, Lamitak has dedicated column
    let code = row['code'] || row['kode'] || row['product_code'] || row['item_code'] || '';
    if (!code && brand === 'EDL') {
      // Try extracting from name like "DA 2081N - Some Name"
      const match = (row['name'] || row['item_name'] || '').match(/^([A-Z0-9 \-]+?)\s*[-–]\s*/i);
      if (match) code = match[1].trim();
    }
    if (!code) code = row['name'] || row['item_name'] || '';

    const name = row['name'] || row['item_name'] || row['product_name'] || code;
    const rawPrice = parsePrice(row['price'] || row['harga'] || row['rate'] || row['selling_price']);
    const priceWithTax = addPpn(rawPrice);

    const activeRaw = row['active'] || row['status'] || 'true';
    const active = parseBool(activeRaw) || activeRaw === '' || activeRaw === 'active';

    const imageUrlCandidates = getProductImageCandidates(brand, code);

    const product: Product = {
      slug: slugify(`${brand.toLowerCase()}-${code}-${name}`).slice(0, 96),
      code: code.toUpperCase(),
      name,
      brand,
      collection: row['collection'] || row['koleksi'] || undefined,
      category: row['category'] || row['kategori'] || undefined,
      finish: row['finish'] || undefined,
      size: row['size'] || row['ukuran'] || undefined,
      thickness: row['thickness'] || row['ketebalan'] || undefined,
      price: priceWithTax,
      taxIncluded: true,
      currency: 'IDR',
      active,
      imageUrl: imageUrlCandidates[0],
      imageUrlCandidates,
      description: row['description'] || row['deskripsi'] || undefined,
    };

    products.push(product);
  }

  return products.filter((p) => p.active && p.code);
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
