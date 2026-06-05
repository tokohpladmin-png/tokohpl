import { notFound } from 'next/navigation';
import { getProductBySlug, getPublicProducts } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

export const revalidate = 600;

export async function generateStaticParams() {
  const products = await getPublicProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.code} ${product.name}` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product}/>;
}
