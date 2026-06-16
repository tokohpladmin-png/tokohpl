import type { Product } from '@/types/product';
import { parseProductsFromCsv } from './parseProducts';
import { normalizeCode } from './utils';

async function fetchCsv(): Promise<string> {
  // Try env override first (absolute URL for production)
  const envUrl = process.env.NEXT_PUBLIC_PRODUCTS_CSV_URL;
  if (envUrl) {
    const res = await fetch(envUrl, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
    return res.text();
  }

  // In Node.js (build/server), read from filesystem
  if (typeof window === 'undefined') {
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    try {
      return readFileSync(join(process.cwd(), 'public', 'data', 'products.csv'), 'utf-8');
    } catch (err) {
      console.error('Could not read local CSV:', err);
      return '';
    }
  }

  // Browser fetch (client components should never reach here)
  const res = await fetch('/data/products.csv');
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
  return res.text();
}

let _cache: Product[] | null = null;
let _cacheTs = 0;
const CACHE_TTL = 10 * 60 * 1000;

export async function getAllProducts(): Promise<Product[]> {
  const now = Date.now();
  if (_cache && now - _cacheTs < CACHE_TTL) return _cache;
  try {
    const text = await fetchCsv();
    const products = parseProductsFromCsv(text);
    _cache = products;
    _cacheTs = now;
    return products;
  } catch (err) {
    console.error('Failed to load products:', err);
    return _cache || [];
  }
}

export async function getPublicProducts() { return getAllProducts(); }

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductByCode(code: string) {
  const products = await getAllProducts();
  const norm = normalizeCode(code);
  return products.find((p) => normalizeCode(p.code) === norm);
}

export async function getFilterOptions() {
  const products = await getAllProducts();
  const uniq = <T>(arr: (T | undefined)[]): T[] =>
    Array.from(new Set(arr.filter(Boolean) as T[])).sort() as T[];
  return {
    brands: uniq(products.map((p) => p.brand as string)),
    collections: uniq(products.map((p) => p.collection)),
    categories: uniq(products.map((p) => p.category)),
    sizes: uniq(products.map((p) => p.size)),
  };
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  const q = query.toLowerCase().replace(/\s+/g, '');
  return products.filter((p) => {
    const haystack = [p.code, p.name, p.brand, p.collection, p.category]
      .join(' ').toLowerCase().replace(/\s+/g, '');
    return haystack.includes(q);
  });
}
