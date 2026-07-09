'use client';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { LocaleSwitcher } from './LocaleSwitcher';

function HeaderSearch({ onSearch }: { onSearch?: () => void }) {
  const t = useTranslations('Nav');
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
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchAria')}
        className="h-10 w-full border border-hpl-line bg-hpl-50 px-4 pr-12 text-[13px] text-hpl-ink outline-none transition-all duration-150 placeholder:text-hpl-400 focus:border-hpl-ink focus:bg-white"
      />
      <button
        type="submit"
        aria-label={t('searchSubmitAria')}
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

export function Header() {
  const t = useTranslations('Nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const edlCollections: [string, string][] = [
    [t('collections.wood'), '/products?brand=EDL&collection=Wood'],
    [t('collections.solid'), '/products?brand=EDL&collection=Solid'],
    [t('collections.pattern'), '/products?brand=EDL&collection=Pattern'],
    [t('collections.marble'), '/products?brand=EDL&collection=Marble'],
    [t('collections.stone'), '/products?brand=EDL&collection=Stone'],
    [t('collections.metal'), '/products?brand=EDL&collection=Metal'],
    [t('collections.aptico'), '/products?brand=EDL&collection=Aptico'],
  ];
  const lamitakCollections: [string, string][] = [
    [t('collections.woods'), '/products?brand=LAMITAK&collection=Woods'],
    [t('collections.solids'), '/products?brand=LAMITAK&collection=Solids'],
    [t('collections.patterns'), '/products?brand=LAMITAK&collection=Patterns'],
  ];

  const mobileNavItems = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('allProducts') },
    { href: '/products?brand=EDL', label: 'EDL HPL' },
    ...edlCollections.map(([label, href]) => ({ href, label: `· ${label}` })),
    { href: '/products?brand=LAMITAK', label: 'Lamitak HPL' },
    ...lamitakCollections.map(([label, href]) => ({ href, label: `· ${label}` })),
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      {/* Announcement */}
      <div className="bg-hpl-ink text-white text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.22em] uppercase font-medium text-hpl-200">
          {t('announcement')}
        </p>
      </div>

      <header className={`sticky top-0 z-40 bg-hpl-paper transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_0_rgba(26,23,20,0.10)]' : ''}`}>
        <div className="rule" />

        <div className="shell">
          <div className="flex h-[68px] items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2" aria-label={t('logoAria')}>
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
              <Link href="/" className="hover:text-hpl-ink transition-colors">{t('home')}</Link>
              <div className="group relative py-6">
                <button className="flex items-center gap-1 hover:text-hpl-ink transition-colors cursor-pointer">
                  {t('products')}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="translate-y-px">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-[100]" style={{minWidth:'460px'}}>
                  <div className="mt-2 border border-hpl-line bg-white shadow-luxury py-5 px-5">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Link href="/products?brand=EDL"
                          className="block text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-ink pb-2 mb-2 border-b border-hpl-line hover:text-hpl-accent transition-colors">
                          EDL HPL
                        </Link>
                        {edlCollections.map(([label, href]) => (
                          <Link key={href} href={href}
                            className="block py-1.5 text-[12px] text-hpl-600 hover:text-hpl-ink transition-colors">
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <Link href="/products?brand=LAMITAK"
                          className="block text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-ink pb-2 mb-2 border-b border-hpl-line hover:text-hpl-accent transition-colors">
                          Lamitak HPL
                        </Link>
                        {lamitakCollections.map(([label, href]) => (
                          <Link key={href} href={href}
                            className="block py-1.5 text-[12px] text-hpl-600 hover:text-hpl-ink transition-colors">
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="rule mt-4 mb-3"/>
                    <Link href="/products"
                      className="text-[11px] font-semibold tracking-[0.14em] uppercase text-hpl-ink hover:text-hpl-accent transition-colors">
                      {t('allProductsArrow')}
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/about" className="hover:text-hpl-ink transition-colors">{t('about')}</Link>
              <Link href="/contact" className="hover:text-hpl-ink transition-colors">{t('contact')}</Link>
            </nav>

            {/* Search */}
            <div className="hidden lg:block min-w-0 flex-1 max-w-xs xl:max-w-sm">
              <HeaderSearch />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 shrink-0">
              <LocaleSwitcher className="hidden sm:flex" />

              {/* Mobile hamburger */}
              <button type="button" aria-label={t('toggleMenuAria')} aria-expanded={isOpen}
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
              {mobileNavItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className="block py-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700 hover:text-hpl-ink transition-colors border-b border-hpl-line/50 last:border-0">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="rule"/>
            <div className="shell py-4">
              <LocaleSwitcher />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
