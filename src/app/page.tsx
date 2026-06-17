import Link from 'next/link';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';

export const revalidate = 600;

export default async function HomePage() {
  const [products, filterOptions] = await Promise.all([getPublicProducts(), getFilterOptions()]);
  const featured = products.filter(p => p.isBestSeller).slice(0, 8);
  const promoProducts = products.filter(p => p.isPromo).slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hpl-ink min-h-[calc(100vh-100px)] flex items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-hpl-ink via-hpl-800 to-hpl-700" />
        <div className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-gradient-to-r from-hpl-ink/80 to-transparent" />

        <div className="shell w-full grid lg:grid-cols-2 gap-12 py-20 lg:py-28 items-center">
          <div className="animate-fade-up">
            <p className="label text-hpl-300 mb-5">Distributor Resmi HPL Indonesia</p>
            <h1 className="display text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.1]">
              Kini Anda dapat dengan mudah mendapatkan HPL berkualitas
            </h1>
            <p className="text-[14px] leading-7 text-white/65 max-w-md mb-8">
              Temukan ribuan pilihan HPL berkualitas dari EDL dan Lamitak. Pengiriman ke seluruh Indonesia dengan harga kompetitif dan layanan yang berpusat pada pelanggan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-ghost-white">
                Lihat Semua Produk
              </Link>
              <Link href="/products?brand=EDL" className="btn-ghost-white">
                EDL HPL
              </Link>
              <Link href="/products?brand=LAMITAK" className="btn-ghost-white">
                Lamitak HPL
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <div className="bg-white border border-hpl-line p-6 sm:p-8 shadow-luxury">
              <div className="mb-6">
                <p className="label text-hpl-gold mb-1">Pencarian Cepat</p>
                <p className="font-display text-2xl font-light text-hpl-ink">Cari Kode Produk</p>
              </div>
              <form action="/products" className="relative mb-5">
                <input type="search" name="search" aria-label="Cari produk"
                  placeholder="Contoh: DA 2081N, WY 5216D…" className="field pr-12"/>
                <button type="submit" aria-label="Cari"
                  className="absolute right-0 top-0 h-11 w-11 bg-hpl-ink flex items-center justify-center text-white hover:bg-hpl-800 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>
              <div className="grid grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
                {[
                  { label: 'EDL HPL', href: '/products?brand=EDL' },
                  { label: 'Lamitak HPL', href: '/products?brand=LAMITAK' },
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
                  <span className="font-semibold text-hpl-ink">{products.length.toLocaleString('id-ID')}</span> produk tersedia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="shell py-4 flex items-center gap-8 overflow-x-auto">
            {['Distributor Resmi EDL HPL', 'Distributor Resmi Lamitak HPL', 'Pengiriman ke Seluruh Indonesia', 'Harga Kompetitif'].map((item) => (
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
              <p className="text-[18px] font-semibold text-hpl-ink mb-3 group-hover:text-hpl-accent transition-colors">EDL HPL</p>
              <p className="text-[13px] leading-7 text-hpl-500 mb-5">
                Merek HPL premium asal Singapura yang menghadirkan koleksi lengkap dengan inovasi desain dan teknologi terkini. EDL menawarkan lebih dari 500 pilihan motif — kayu, solid, pola, marmer, batu, dan metal — untuk mewujudkan konsep interior Anda.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Wood', 'Solid', 'Pattern', 'Marble', 'Stone', 'Metal', 'Aptico'].map(c => (
                  <span key={c} className="text-[10px] tracking-[0.12em] uppercase border border-hpl-line px-2 py-1 text-hpl-500">{c}</span>
                ))}
              </div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-accent">Lihat Koleksi EDL →</p>
            </Link>

            {/* Lamitak */}
            <Link href="/products?brand=LAMITAK"
              className="bg-white p-8 sm:p-10 hover:bg-hpl-50 transition-colors group">
              <p className="text-[18px] font-semibold text-hpl-ink mb-3 group-hover:text-hpl-accent transition-colors">Lamitak HPL</p>
              <p className="text-[13px] leading-7 text-hpl-500 mb-5">
                Merek HPL premium asal Singapura yang telah hadir sejak 2001 dengan tagline <em>Inspiring Spaces</em>. Lamitak dikenal dengan desain eksklusif, finishing autentik yang tampak natural, dan komitmen pada material ramah lingkungan. Banyak digunakan pada proyek hotel, apartemen, dan kantor premium di Indonesia.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Woods', 'Solids', 'Patterns'].map(c => (
                  <span key={c} className="text-[10px] tracking-[0.12em] uppercase border border-hpl-line px-2 py-1 text-hpl-500">{c}</span>
                ))}
              </div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-accent">Lihat Koleksi Lamitak →</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Produk Promo */}
      {promoProducts.length > 0 && (
        <section className="border-b border-hpl-line bg-hpl-50">
          <div className="shell py-14 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">Penawaran Terbatas</p>
                <h2 className="display text-hpl-ink text-4xl sm:text-5xl">Produk Promo</h2>
              </div>
              <Link href="/products?promo=true" className="hidden sm:block text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                Lihat Semua →
              </Link>
            </div>
            <ProductGrid products={promoProducts}/>
          </div>
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-b border-hpl-line">
          <div className="shell py-14 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">Pilihan Editor</p>
                <h2 className="display text-hpl-ink text-4xl sm:text-5xl">Paling Laris</h2>
              </div>
              <Link href="/products" className="hidden sm:block text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                Lihat Semua →
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
              <p className="label mb-4">Keunggulan Kami</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl mb-5">
                Mengapa Belanja<br />di TokoHPL?
              </h2>
              <p className="text-[14px] leading-7 text-hpl-500 max-w-md">
                Kami menyediakan produk HPL berkualitas tinggi dengan harga kompetitif, pengiriman cepat, dan pelayanan profesional.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              {[
                { title: 'Harga Transparan', body: 'Harga yang tercantum pada situs ini merupakan harga resmi. Anda juga akan mendapatkan diskon dan potongan ongkos kirim untuk pembelian dalam jumlah tertentu.' },
                { title: 'Pengiriman Terpercaya', body: 'Pengiriman ke seluruh Indonesia melalui mitra ekspedisi terpercaya dengan tarif kompetitif.' },
                { title: 'Produk Resmi', body: 'Distributor resmi EDL dan Lamitak dengan produk berkualitas yang dijamin keasliannya. Anda akan mendapatkan produk sesuai dengan yang Anda butuhkan.' },
              ].map((item) => (
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

      {/* CTA */}
      {/* Testimonials */}
      <section className="border-b border-hpl-line">
        <TestimonialsSlider />
      </section>

      <section>
        <div className="bg-hpl-ink text-white">
          <div className="shell py-14 sm:py-20 text-center">
            <p className="label text-hpl-400 mb-5">Mulai Belanja</p>
            <h2 className="display text-white text-4xl sm:text-5xl mb-6">
              Ribuan Pilihan HPL<br />
              <em className="text-hpl-300 not-italic">Siap Dikirim</em>
            </h2>
            <p className="text-[14px] leading-7 text-hpl-400 max-w-md mx-auto mb-8">
              Temukan HPL yang sesuai kebutuhan Anda. Pengiriman ke seluruh Indonesia.
            </p>
            <Link href="/products" className="btn-ghost-white">
              Mulai Belanja Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
