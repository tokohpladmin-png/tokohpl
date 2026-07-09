import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from './ProductImage';

export function ProductCard({ product }: { product: Product }) {
  const tCommon = useTranslations('Common');

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
        <div className="mt-3 pt-3 border-t border-hpl-line">
          <span className="text-[13px] font-semibold text-hpl-ink">{formatIDR(product.price) ?? tCommon('priceTBD')}</span>
          <p className="mt-0.5 text-[10px] text-hpl-400">{tCommon('includesVat')}</p>
        </div>
      </div>
    </article>
  );
}
