import { useTranslations } from 'next-intl';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations('Products');

  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-hpl-line bg-white">
        <p className="text-[13px] text-hpl-500">{t('emptyState')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-hpl-line border border-hpl-line">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
