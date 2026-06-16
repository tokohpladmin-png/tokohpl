import Link from 'next/link';

export const metadata = { title: '404 — Halaman Tidak Ditemukan | TokoHPL' };

export default function NotFound() {
  return (
    <div className="shell py-32 text-center max-w-lg mx-auto">
      <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-hpl-400 mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink mb-4">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-[14px] leading-7 text-hpl-500 mb-8">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-ink">Kembali ke Beranda</Link>
        <Link href="/products" className="btn-ghost">Lihat Produk</Link>
      </div>
    </div>
  );
}
