import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://tokohpl.com';
const SITE_NAME = 'TokoHPL';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TokoHPL — Beli HPL Online | EDL HPL & Lamitak HPL',
    template: '%s | TokoHPL',
  },
  description: 'Beli HPL online harga terbaik. Distributor resmi EDL HPL dan Lamitak HPL di Indonesia. 1.748 pilihan motif kayu, solid, dan pola. Pengiriman ke seluruh Indonesia.',
  keywords: [
    'beli HPL online', 'harga HPL', 'HPL murah', 'HPL berkualitas',
    'EDL HPL', 'Lamitak HPL', 'distributor HPL Indonesia',
    'HPL interior', 'HPL furnitur', 'HPL Jakarta', 'toko HPL online',
    'High Pressure Laminate', 'HPL kayu', 'HPL solid', 'HPL motif',
  ],
  authors: [{ name: 'TokoHPL', url: SITE_URL }],
  creator: 'CV. Varindo Forma Hutama',
  publisher: 'TokoHPL',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'TokoHPL — Beli HPL Online | EDL HPL & Lamitak HPL',
    description: 'Beli HPL online harga terbaik. Distributor resmi EDL HPL dan Lamitak HPL. 1.748 pilihan produk, pengiriman ke seluruh Indonesia.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TokoHPL — Beli HPL Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TokoHPL — Beli HPL Online | EDL HPL & Lamitak HPL',
    description: 'Distributor resmi EDL HPL dan Lamitak HPL. 1.748 pilihan produk, pengiriman ke seluruh Indonesia.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      </head>
      <body className="min-h-screen antialiased">
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
