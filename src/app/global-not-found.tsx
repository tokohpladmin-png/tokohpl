import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Not Found | TokoHPL',
  description: 'The page you are looking for does not exist. / Halaman yang Anda cari tidak ditemukan.',
};

// Bypasses all layouts (no locale context available here), so this stays
// intentionally bilingual and minimal. See not-found.md: "must return a full
// HTML document, including <html> and <body> tags."
export default function GlobalNotFound() {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen antialiased flex items-center justify-center bg-hpl-50 text-hpl-ink px-6">
        <div className="text-center max-w-md">
          <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-hpl-accent mb-3">404</p>
          <h1 className="text-[28px] font-light mb-2">Halaman Tidak Ditemukan</h1>
          <h2 className="text-[17px] font-light text-hpl-500 mb-8">Page Not Found</h2>
          <div className="flex items-center justify-center gap-4">
            <a href="/id" className="btn-ink">Beranda</a>
            <a href="/en" className="btn-ghost">Home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
