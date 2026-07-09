import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/checkout',
          '/*/order-confirmation',
          '/*/order-success',
          '/*/cart',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://tokohpl.com/sitemap.xml',
    host: 'https://tokohpl.com',
  };
}
