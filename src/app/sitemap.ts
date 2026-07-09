import type { MetadataRoute } from 'next';
import { getPublicProducts } from '@/lib/products';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://tokohpl.com';

export const revalidate = 3600; // regenerate hourly

function localizedEntry(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublicProducts();

  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntry('', { changeFrequency: 'daily', priority: 1.0 }),
    ...localizedEntry('/products', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntry('/products?brand=EDL', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntry('/products?brand=LAMITAK', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntry('/about', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntry('/contact', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntry('/kebijakan-privasi', { changeFrequency: 'yearly', priority: 0.3 }),
  ];

  const productPages: MetadataRoute.Sitemap = products.flatMap((product) =>
    localizedEntry(`/products/${product.slug}`, { changeFrequency: 'weekly', priority: 0.7 }),
  );

  return [...staticPages, ...productPages];
}
