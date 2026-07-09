import { Suspense } from 'react';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductExplorer } from '@/components/ProductExplorer';
import { getTranslations } from 'next-intl/server';

export const revalidate = 600;
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t.raw('metaKeywords') as string[],
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescriptionShort'),
      url: `https://tokohpl.com/${locale}/products`,
    },
    alternates: { canonical: `https://tokohpl.com/${locale}/products` },
  };
}

export default async function ProductsPage() {
  const t = await getTranslations('Products');
  const [products, filterOptions] = await Promise.all([
    getPublicProducts(),
    getFilterOptions(),
  ]);

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-10">
          <p className="label mb-3">{t('pageEyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">{t('pageHeading')}</h1>
          <p className="mt-3 text-[13px] leading-7 text-hpl-500 max-w-lg">
            {t('pageSubhead')}
          </p>
        </div>
      </div>
      <div className="shell py-10 sm:py-14">
        <Suspense fallback={<div className="py-20 text-center text-hpl-500 text-[13px]">{t('loadingFallback')}</div>}>
          <ProductExplorer products={products} filterOptions={filterOptions}/>
        </Suspense>
      </div>
    </div>
  );
}
