import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getPublicProducts } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

export const revalidate = 600;

const SITE_URL = 'https://tokohpl.com';

export async function generateStaticParams() {
  const products = await getPublicProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.code} ${product.name} — ${product.brand} HPL`;
  const description = [
    `${product.name} (${product.code}) dari ${product.brand} HPL.`,
    product.size ? `Ukuran ${product.size}.` : '',
    product.thickness ? `Ketebalan ${product.thickness}.` : '',
    product.collection ? `Koleksi ${product.collection}.` : '',
    `Beli online dengan harga terbaik di TokoHPL. Pengiriman ke seluruh Indonesia.`,
  ].filter(Boolean).join(' ');

  const canonicalUrl = `${SITE_URL}/products/${slug}`;

  return {
    title,
    description,
    keywords: [
      product.code,
      product.name,
      `${product.brand} HPL`,
      `beli ${product.brand} HPL`,
      `harga ${product.code}`,
      `${product.name} HPL`,
      product.collection ?? '',
      'beli HPL online',
      'HPL Indonesia',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'id_ID',
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
    alternates: { canonical: canonicalUrl },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `${product.name} (${product.code}) — ${product.brand} HPL. ${product.size ? `Ukuran ${product.size}.` : ''} ${product.thickness ? `Ketebalan ${product.thickness}.` : ''}`,
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
      url: `${SITE_URL}/products/${product.slug}`,
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
