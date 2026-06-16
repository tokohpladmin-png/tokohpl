import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-hpl-ink text-hpl-200">
      <div className="shell pt-14 pb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold tracking-widest">HPL</span>
            </div>
            <span className="display text-white text-xl">
              <span className="font-light">toko</span><span className="font-black">hpl</span><span className="text-hpl-gold">.com</span>
            </span>
          </div>
          <p className="text-[13px] leading-7 text-hpl-400 max-w-xs">
            Toko online HPL terpercaya di Indonesia. Menjual EDL HPL dan Lamitak HPL dengan harga terbaik dan pengiriman ke seluruh Indonesia.
          </p>
        </div>

        {/* Produk */}
        <div>
          <p className="label text-hpl-500 mb-5">Produk</p>
          <ul className="space-y-3">
            {[
              { href: '/products?brand=EDL', label: 'EDL HPL' },
              { href: '/products?brand=LAMITAK', label: 'Lamitak HPL' },
              { href: '/products', label: 'Semua Produk' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[13px] text-hpl-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Perusahaan */}
        <div>
          <p className="label text-hpl-500 mb-5">Perusahaan</p>
          <ul className="space-y-3">
            {[
              { href: '/about',            label: 'Tentang Kami' },
              { href: '/shipping',         label: 'Info Pengiriman' },
              { href: '/panduan-belanja',  label: 'Panduan Belanja' },
              { href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
              { href: '/contact',          label: 'Hubungi Kami' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[13px] text-hpl-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <p className="label text-hpl-500 mb-5">Kontak</p>
          <address className="not-italic space-y-3">
            <p className="text-[13px] text-hpl-400">
              <span className="block text-hpl-500 text-[10px] tracking-[0.16em] uppercase mb-1">WhatsApp</span>
              <a href="https://wa.me/62811945224" className="hover:text-white transition-colors">0811 945 224</a>
            </p>
            <p className="text-[13px] text-hpl-400">
              <span className="block text-hpl-500 text-[10px] tracking-[0.16em] uppercase mb-1">Email</span>
              <a href="mailto:tokohpl.admin@gmail.com" className="hover:text-white transition-colors">tokohpl.admin@gmail.com</a>
            </p>
            <p className="text-[13px] text-hpl-400">
              <span className="block text-hpl-500 text-[10px] tracking-[0.16em] uppercase mb-1">Jam Operasional</span>
              Senin–Jumat, 09.00–17.00 WIB
            </p>
          </address>
        </div>

      </div>

      <div className="border-t border-white/[0.07]">
        <div className="shell py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-hpl-600">© {year} TokoHPL. Semua hak dilindungi.</p>
          <p className="text-[11px] text-hpl-700">Distributor Resmi EDL HPL &amp; Lamitak HPL</p>
        </div>
      </div>
    </footer>
  );
}
