'use client';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from './ProductImage';
import { useCartStore } from '@/store/cartStore';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="group bg-white border border-hpl-line transition-all duration-200 hover:border-hpl-400 hover:shadow-card-hover">
      <Link href={`/products/${product.slug}`} aria-label={product.name} className="block">
        <div className="relative aspect-square overflow-hidden bg-hpl-100">
          <ProductImage
            src={product.imageUrl || ''}
            alt={product.name}
          />
          <div className="absolute inset-0 bg-hpl-ink/0 transition-colors duration-200 group-hover:bg-hpl-ink/[0.03]" />
        </div>
      </Link>

      <div className="px-4 py-4">
        {product.code && (
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-400 mb-1">
            {product.code}
          </p>
        )}
        <Link href={`/products/${product.slug}`}
          className="block text-[13px] font-medium leading-[1.4] text-hpl-ink hover:text-hpl-accent transition-colors line-clamp-2 min-h-[36px]">
          {product.name}
        </Link>
        {product.brand && (
          <p className="mt-1 text-[10px] tracking-[0.1em] uppercase text-hpl-400">{product.brand}</p>
        )}
        <div className="mt-3 pt-3 border-t border-hpl-line flex items-end justify-between gap-2">
          <div>
            <span className="text-[13px] font-semibold text-hpl-ink">{formatIDR(product.price)}</span>
            <p className="mt-0.5 text-[10px] text-hpl-400">Termasuk PPN</p>
          </div>
          <button type="button" onClick={() => addItem(product, 1)}
            className="shrink-0 flex items-center justify-center w-8 h-8 bg-hpl-ink text-white hover:bg-hpl-accent transition-colors"
            aria-label={`Tambah ${product.name} ke keranjang`}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1h2l1.5 7h6l1.5-5H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6.5" cy="12" r="1" fill="currentColor"/>
              <circle cx="10.5" cy="12" r="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
