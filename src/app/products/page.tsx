import { Suspense } from 'react';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductExplorer } from '@/components/ProductExplorer';

export const revalidate = 600;
export const metadata = { title: 'Katalog Produk' };

export default async function ProductsPage() {
  const [products, filterOptions] = await Promise.all([
    getPublicProducts(),
    getFilterOptions(),
  ]);

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-10">
          <p className="label mb-3">Katalog</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Semua Produk HPL</h1>
          <p className="mt-3 text-[13px] leading-7 text-hpl-500 max-w-lg">
            Temukan pilihan lengkap EDL HPL dan Lamitak HPL. Cari berdasarkan kode produk, nama, atau kategori.
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
