import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProductBySlug, getPublicProducts } from '@/lib/products';
import { routing } from '@/i18n/routing';
import { ProductDetailClient } from './ProductDetailClient';

export const revalidate = 600;

const SITE_URL = 'https://tokohpl.com';

export async function generateStaticParams() {
  const products = await getPublicProducts();
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: 'ProductDetail.meta' });

  const title = `${product.code} ${product.name} — ${product.brand} HPL`;
  const description = [
    t('descFrom', { name: product.name, code: product.code, brand: product.brand }),
    product.size ? t('descSize', { size: product.size }) : '',
    product.thickness ? t('descThickness', { thickness: product.thickness }) : '',
    product.collection ? t('descCollection', { collection: product.collection }) : '',
    t('descClosing'),
  ].filter(Boolean).join(' ');

  const canonicalUrl = `${SITE_URL}/${locale}/products/${slug}`;

  return {
    title,
    description,
    keywords: [
      product.code,
      product.name,
      `${product.brand} HPL`,
      t('keywordBuy', { brand: product.brand }),
      t('keywordPrice', { code: product.code }),
      t('keywordDesignHpl', { name: product.name }),
      product.collection ?? '',
      t('keywordBuyOnline'),
      t('keywordIndonesia'),
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      siteName: 'TokoHPL',
      images: product.imageUrl
        ? [{ url: product.imageUrl, width: 800, height: 800, alt: `${product.code} ${product.name}` }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TokoHPL' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.imageUrl ? [product.imageUrl] : ['/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/products/${slug}`]),
      ),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'ProductDetail.meta' });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: [
      `${product.name} (${product.code}) — ${product.brand} HPL.`,
      product.size ? t('descSize', { size: product.size }) : '',
      product.thickness ? t('descThickness', { thickness: product.thickness }) : '',
    ].filter(Boolean).join(' '),
    sku: product.code,
    mpn: product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.collection ?? product.category ?? 'HPL',
    image: product.imageUrl ? [product.imageUrl] : [],
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      priceCurrency: 'IDR',
      price: product.price ?? 0,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'TokoHPL — CV. Varindo Forma Hutama',
        url: SITE_URL,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product}/>
    </>
  );
}
