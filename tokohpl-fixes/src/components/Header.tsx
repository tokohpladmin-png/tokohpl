'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

function HeaderSearch({ onSearch }: { onSearch?: () => void }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari kode atau nama produk…"
        aria-label="Cari produk"
        className="h-10 w-full border border-hpl-line bg-hpl-50 px-4 pr-12 text-[13px] text-hpl-ink outline-none transition-all duration-150 placeholder:text-hpl-400 focus:border-hpl-ink focus:bg-white"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="absolute right-0 top-0 flex h-10 w-11 items-center justify-center bg-hpl-ink text-white transition hover:bg-hpl-800"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </form>
  );
}

function CartIcon() {
  const { totalItems, openDrawer } = useCartStore();
  const count = totalItems();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Keranjang (${count} item)`}
      className="relative flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-hpl-ink">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-hpl-gold text-white text-[9px] font-bold px-1">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* Announcement */}
      <div className="bg-hpl-ink text-white text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-hpl-200">
          Gratis Ongkir ke Jawa & Bali · EDL HPL & Lamitak HPL
        </p>
      </div>

      <header className={`sticky top-0 z-40 bg-hpl-paper transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_0_rgba(26,23,20,0.10)]' : ''}`}>
        <div className="rule" />

        <div className="shell">
          <div className="flex h-[68px] items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2" aria-label="TokoHPL">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-hpl-ink flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold tracking-widest">HPL</span>
                </div>
                <span className="display text-hpl-ink text-xl">
                  <span className="font-light">toko</span><span className="font-black">hpl</span><span className="text-hpl-gold">.com</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-700">
              <Link href="/" className="hover:text-hpl-ink transition-colors">Beranda</Link>
              <div className="group relative py-6">
                <button className="flex items-center gap-1 hover:text-hpl-ink transition-colors cursor-pointer">
                  Produk
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="translate-y-px">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 w-52 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-[100]">
                  <div className="mt-2 border border-hpl-line bg-white shadow-luxury py-1">
                    {[
                      { href: '/products?brand=EDL', label: 'EDL HPL' },
                      { href: '/products?brand=LAMITAK', label: 'Lamitak HPL' },
                    ].map((item) => (
                      <Link key={item.href} href={item.href}
                        className="block px-5 py-3 text-[11px] font-medium tracking-[0.1em] uppercase text-hpl-700 hover:bg-hpl-50 hover:text-hpl-ink transition-colors">
                        {item.label}
                      </Link>
                    ))}
                    <div className="rule mx-4 my-1"/>
                    <Link href="/products"
                      className="block px-5 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase text-hpl-ink hover:bg-hpl-50 transition-colors">
                      Semua Produk →
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/about" className="hover:text-hpl-ink transition-colors">Tentang Kami</Link>
              <Link href="/shipping" className="hover:text-hpl-ink transition-colors">Pengiriman</Link>
              <Link href="/contact" className="hover:text-hpl-ink transition-colors">Kontak</Link>
            </nav>

            {/* Search */}
            <div className="hidden lg:block min-w-0 flex-1 max-w-xs xl:max-w-sm">
              <HeaderSearch />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 shrink-0">
              <CartIcon />
              <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer"
                className="hidden sm:flex btn-ink text-[10px] py-2.5 px-5">
                WhatsApp
              </a>
              {/* Mobile hamburger */}
              <button type="button" aria-label="Toggle menu" aria-expanded={isOpen}
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0">
                <span className={`block h-[1.5px] w-6 bg-hpl-ink transition-all duration-200 ${isOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}/>
                <span className={`block h-[1.5px] w-6 bg-hpl-ink transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`}/>
                <span className={`block h-[1.5px] w-6 bg-hpl-ink transition-all duration-200 ${isOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}/>
              </button>
            </div>
          </div>
        </div>

        <div className="rule"/>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-hpl-paper border-b border-hpl-line animate-fade-in">
            <div className="shell py-4">
              <HeaderSearch onSearch={() => setIsOpen(false)}/>
            </div>
            <div className="rule"/>
            <nav className="shell py-4">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/products', label: 'Semua Produk' },
                { href: '/products?brand=EDL', label: 'EDL HPL' },
                { href: '/products?brand=LAMITAK', label: 'Lamitak HPL' },
                { href: '/about', label: 'Tentang Kami' },
                { href: '/shipping', label: 'Pengiriman' },
                { href: '/contact', label: 'Kontak' },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className="block py-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700 hover:text-hpl-ink transition-colors border-b border-hpl-line/50 last:border-0">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="shell pb-5 pt-2">
              <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer"
                className="btn-ink w-full justify-center">
                WhatsApp Kami
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
