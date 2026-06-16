import { Suspense } from 'react';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductExplorer } from '@/components/ProductExplorer';

export const revalidate = 600;
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog HPL — EDL & Lamitak | 1.748 Pilihan Produk',
  description: 'Katalog lengkap HPL EDL dan Lamitak. 1.748 pilihan motif kayu, warna solid, batu, dan pola. Filter berdasarkan merek, koleksi, dan ukuran. Harga termasuk PPN.',
  keywords: ['katalog HPL', 'daftar harga HPL', 'HPL EDL lengkap', 'HPL Lamitak lengkap', 'motif HPL', 'warna HPL solid', 'HPL kayu', 'beli HPL online'],
  openGraph: {
    title: 'Katalog HPL — EDL & Lamitak | 1.748 Pilihan Produk',
    description: 'Katalog lengkap HPL EDL dan Lamitak. 1.748 pilihan motif, filter berdasarkan merek, koleksi, dan ukuran.',
    url: 'https://tokohpl.com/products',
  },
  alternates: { canonical: 'https://tokohpl.com/products' },
};

export default async function ProductsPage() {
  const [products, filterOptions] = await Promise.all([
    getPublicProducts(),
    getFilterOptions(),
  ]);

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-10">
          <p className="label mb-3">Produk</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">Koleksi Produk</h1>
          <p className="mt-3 text-[13px] leading-7 text-hpl-500 max-w-lg">
            Temukan pilihan lengkap koleksi produk. Cari berdasarkan kode produk, nama, atau kategori.
          </p>
        </div>
      </div>
      <div className="shell py-10 sm:py-14">
        <Suspense fallback={<div className="py-20 text-center text-hpl-500 text-[13px]">Memuat produk…</div>}>
          <ProductExplorer products={products} filterOptions={filterOptions}/>
        </Suspense>
      </div>
    </div>
  );
}
