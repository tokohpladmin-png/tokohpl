import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';

export const revalidate = 600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');
  const [products] = await Promise.all([getPublicProducts(), getFilterOptions()]);
  const featured = products.filter(p => p.isBestSeller).slice(0, 8);
  const numberLocale = locale === 'en' ? 'en-US' : 'id-ID';

  const edlCollections = ['Wood', 'Solid', 'Pattern', 'Marble', 'Stone', 'Metal', 'Aptico'];
  const lamitakCollections = ['Woods', 'Solids', 'Patterns'];
  const strip = t.raw('hero.strip') as string[];
  const whyItems = t.raw('why.items') as { title: string; body: string }[];

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hpl-ink min-h-[calc(100vh-100px)] flex items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-hpl-ink via-hpl-800 to-hpl-700" />
        <div className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-gradient-to-r from-hpl-ink/80 to-transparent" />

        <div className="shell w-full grid lg:grid-cols-2 gap-12 py-20 lg:py-28 items-center">
          <div className="animate-fade-up">
            <p className="label text-hpl-300 mb-5">{t('hero.eyebrow')}</p>
            <h1 className="display text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.1]">
              {t('hero.heading')}
            </h1>
            <p className="text-[14px] leading-7 text-white/65 max-w-md mb-8">
              {t('hero.body')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-ghost-white">
                {t('hero.ctaAll')}
              </Link>
              <Link href="/products?brand=EDL" className="btn-ghost-white">
                {t('hero.ctaEdl')}
              </Link>
              <Link href="/products?brand=LAMITAK" className="btn-ghost-white">
                {t('hero.ctaLamitak')}
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <div className="bg-white border border-hpl-line p-6 sm:p-8 shadow-luxury">
              <div className="mb-6">
                <p className="label text-hpl-gold mb-1">{t('hero.quickSearchLabel')}</p>
                <p className="font-display text-2xl font-light text-hpl-ink">{t('hero.quickSearchTitle')}</p>
              </div>
              <form action="/products" className="relative mb-5">
                <input type="search" name="search" aria-label={t('hero.searchAria')}
                  placeholder={t('hero.searchPlaceholder')} className="field pr-12"/>
                <button type="submit" aria-label={t('hero.searchSubmitAria')}
                  className="absolute right-0 top-0 h-11 w-11 bg-hpl-ink flex items-center justify-center text-white hover:bg-hpl-800 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>
              <div className="grid grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
                {[
                  { label: t('hero.ctaEdl'), href: '/products?brand=EDL' },
                  { label: t('hero.ctaLamitak'), href: '/products?brand=LAMITAK' },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    className="bg-white p-4 hover:bg-hpl-50 transition-colors group">
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-hpl-ink group-hover:text-hpl-gold transition-colors">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-hpl-line">
                <p className="text-[11px] text-hpl-400">
                  <span className="font-semibold text-hpl-ink">{products.length.toLocaleString(numberLocale)}</span> {t('hero.productsAvailable')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="shell py-4 flex items-center gap-8 overflow-x-auto">
            {strip.map((item) => (
              <span key={item} className="text-[10px] tracking-[0.2em] uppercase text-white/40 shrink-0">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand cards */}
      <section className="border-b border-hpl-line">
        <div className="shell py-14 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line">

            {/* EDL */}
            <Link href="/products?brand=EDL"
              className="bg-white p-8 sm:p-10 hover:bg-hpl-50 transition-colors group">
              <p className="text-[18px] font-semibold text-hpl-ink mb-3 group-hover:text-hpl-accent transition-colors">{t('brands.edlName')}</p>
              <p className="text-[13px] leading-7 text-hpl-500 mb-5">
                {t('brands.edlBody')}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {edlCollections.map(c => (
                  <span key={c} className="text-[10px] tracking-[0.12em] uppercase border border-hpl-line px-2 py-1 text-hpl-500">{c}</span>
                ))}
              </div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-accent">{t('brands.edlCta')}</p>
            </Link>

            {/* Lamitak */}
            <Link href="/products?brand=LAMITAK"
              className="bg-white p-8 sm:p-10 hover:bg-hpl-50 transition-colors group">
              <p className="text-[18px] font-semibold text-hpl-ink mb-3 group-hover:text-hpl-accent transition-colors">{t('brands.lamitakName')}</p>
              <p className="text-[13px] leading-7 text-hpl-500 mb-5">
                {t('brands.lamitakBody')}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {lamitakCollections.map(c => (
                  <span key={c} className="text-[10px] tracking-[0.12em] uppercase border border-hpl-line px-2 py-1 text-hpl-500">{c}</span>
                ))}
              </div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-accent">{t('brands.lamitakCta')}</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-b border-hpl-line">
          <div className="shell py-14 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">{t('bestSellers.eyebrow')}</p>
                <h2 className="display text-hpl-ink text-4xl sm:text-5xl">{t('bestSellers.heading')}</h2>
              </div>
              <Link href="/products" className="hidden sm:block text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                {t('bestSellers.viewAll')}
              </Link>
            </div>
            <ProductGrid products={featured}/>
          </div>
        </section>
      )}

      {/* Why TokoHPL */}
      <section className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="label mb-4">{t('why.eyebrow')}</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl mb-5">
                {t('why.headingLine1')}<br />{t('why.headingLine2')}
              </h2>
              <p className="text-[14px] leading-7 text-hpl-500 max-w-md">
                {t('why.body')}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              {whyItems.map((item) => (
                <div key={item.title} className="bg-white p-6">
                  <div className="w-6 h-[1.5px] bg-hpl-gold mb-4"/>
                  <h3 className="text-[13px] font-semibold text-hpl-ink mb-2">{item.title}</h3>
                  <p className="text-[12px] leading-6 text-hpl-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-hpl-line">
        <TestimonialsSlider />
      </section>

      <section>
        <div className="bg-hpl-ink text-white">
          <div className="shell py-14 sm:py-20 text-center">
            <p className="label text-hpl-400 mb-5">{t('cta.eyebrow')}</p>
            <h2 className="display text-white text-4xl sm:text-5xl mb-6">
              {t('cta.headingLine1')}<br />
              <em className="text-hpl-300 not-italic">{t('cta.headingLine2')}</em>
            </h2>
            <p className="text-[14px] leading-7 text-hpl-400 max-w-md mx-auto mb-8">
              {t('cta.body')}
            </p>
            <Link href="/products" className="btn-ghost-white">
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
