'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import { searchProducts } from '@/lib/products';
import { ProductGrid } from './ProductGrid';

const PER_PAGE = 24;

type Props = {
  products: Product[];
  filterOptions: {
    brands: string[];
    collections: string[];
    categories: string[];
    sizes: string[];
    finishes: string[];
  };
};

function Select({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string;
}) {
  return (
    <label className="block">
      <span className="label text-hpl-600 mb-2 block">{label}</span>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="field-select w-full">
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-hpl-400">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </label>
  );
}

export function ProductExplorer({ products, filterOptions }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [collection, setCollection] = useState('');
  const [size, setSize] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
    setBrand(searchParams.get('brand') || '');
    setPage(1);
  }, [searchParams]);

  useEffect(() => { setPage(1); }, [query, brand, collection, size]);

  const filtered = useMemo(() => {
    const promoOnly = searchParams.get('promo') === 'true';
    let result = searchProducts(products, query);
    if (promoOnly) result = result.filter((p) => p.isPromo);
    if (brand) result = result.filter((p) => p.brand === brand.toUpperCase());
    if (collection) result = result.filter((p) => p.collection === collection);
    if (size) result = result.filter((p) => p.size === size);
    return result;
  }, [products, query, brand, collection, size, searchParams]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);
  const hasFilters = Boolean(query || brand || collection || size);

  const clearAll = () => { setQuery(''); setBrand(''); setCollection(''); setSize(''); setPage(1); };

  return (
    <div>
      {/* Brand tabs */}
      <div className="flex gap-0 overflow-x-auto border-b border-hpl-line mb-8">
        {[
          { label: 'Semua', value: '' },
          { label: 'EDL HPL', value: 'EDL' },
          { label: 'Lamitak HPL', value: 'LAMITAK' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setBrand(tab.value)}
            className={`shrink-0 px-5 py-3 text-[10px] font-semibold tracking-[0.18em] uppercase border-b-2 transition-all duration-150 whitespace-nowrap ${
              brand === tab.value
                ? 'border-hpl-ink text-hpl-ink'
                : 'border-transparent text-hpl-600 hover:text-hpl-ink hover:border-hpl-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="border border-hpl-line bg-white mb-8">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-hpl-line">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-hpl-500">
              <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="label text-hpl-700">Filter</span>
          </div>
          {hasFilters && (
            <button onClick={clearAll} className="text-[11px] font-medium tracking-[0.12em] uppercase text-hpl-gold hover:text-hpl-ink transition-colors">
              Hapus Filter
            </button>
          )}
        </div>
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block sm:col-span-2 lg:col-span-1">
              <span className="label text-hpl-600 mb-2 block">Cari Produk</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kode atau nama produk…"
                className="field w-full"
              />
            </label>
            <Select label="Brand" value={brand} onChange={setBrand}
              options={filterOptions.brands} placeholder="Semua Brand"/>
            <Select label="Koleksi" value={collection} onChange={setCollection}
              options={filterOptions.collections} placeholder="Semua Koleksi"/>
            <Select label="Ukuran" value={size} onChange={setSize}
              options={filterOptions.sizes} placeholder="Semua Ukuran"/>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-hpl-500">
            <p>
              <span className="font-semibold text-hpl-ink">{filtered.length}</span>{' '}
              produk ditemukan
              {filtered.length > 0 && (
                <span> · Menampilkan <span className="font-semibold text-hpl-ink">{start + 1}–{Math.min(start + PER_PAGE, filtered.length)}</span></span>
              )}
            </p>
          </div>
        </div>
      </div>

      <ProductGrid products={paginated}/>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-10">
          <button
            onClick={() => { setPage(safePage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={safePage <= 1}
            className="h-10 w-10 flex items-center justify-center border border-hpl-line hover:border-hpl-ink disabled:opacity-30 transition-colors"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M6 10L2 6L6 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            const p = i + Math.max(1, safePage - 3);
            if (p > totalPages) return null;
            return (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`h-10 w-10 text-[12px] font-semibold border transition-colors ${
                  p === safePage
                    ? 'bg-hpl-ink text-white border-hpl-ink'
                    : 'border-hpl-line hover:border-hpl-ink text-hpl-700'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => { setPage(safePage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={safePage >= totalPages}
            className="h-10 w-10 flex items-center justify-center border border-hpl-line hover:border-hpl-ink disabled:opacity-30 transition-colors"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M2 2L6 6L2 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
