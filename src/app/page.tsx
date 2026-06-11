import Link from 'next/link';
import { getPublicProducts, getFilterOptions } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const revalidate = 600;

export default async function HomePage() {
  const [products, filterOptions] = await Promise.all([getPublicProducts(), getFilterOptions()]);
  const featured = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hpl-ink min-h-[calc(100vh-100px)] flex items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-hpl-ink via-hpl-800 to-hpl-700" />
        <div className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-gradient-to-r from-hpl-ink/80 to-transparent" />

        <div className="shell w-full grid lg:grid-cols-2 gap-12 py-20 lg:py-28 items-center">
          <div className="animate-fade-up">
            <p className="label text-hpl-300 mb-5">Distributor Resmi HPL Indonesia</p>
            <h1 className="display text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-[1.0]">
              Material<br />
              <em className="text-hpl-300 not-italic">yang</em><br />
              Mendefinisikan<br />
              Ruang.
            </h1>
            <p className="text-[14px] leading-7 text-white/65 max-w-md mb-8">
              Ribuan pilihan HPL berkualitas dari EDL dan Lamitak — tersedia dengan layanan pengiriman ke seluruh Indonesia.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-ghost-white">
                Jelajahi Katalog
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
                <p className="font-display text-2xl font-light text-hpl-ink">Cari Berdasarkan Kode Produk</p>
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
                  <span className="font-semibold text-hpl-ink">{products.length.toLocaleString('id-ID')}</span> referensi produk tersedia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="shell py-4 flex items-center gap-8 overflow-x-auto">
            {[
              'Distributor Resmi EDL HPL',
              'Distributor Resmi Lamitak HPL',
              'Bebas Ongkir ke Jawa & Bali',
              'Harga Sudah Termasuk PPN',
            ].map((item) => (
              <span key={item} className="text-[10px] tracking-[0.2em] uppercase text-white/40 shrink-0">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand */}
      <section className="border-b border-hpl-line">
        <div className="shell py-14 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label mb-3">Merek Unggulan</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl">Dua Merek Terpercaya</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
            {[
              {
                brand: 'EDL HPL',
                href: '/products?brand=EDL',
                desc: 'Koleksi lengkap HPL EDL mencakup beragam pilihan motif kayu, warna polos, dan pola dekoratif. Kualitas premium untuk keperluan interior profesional.',
              },
              {
                brand: 'Lamitak HPL',
                href: '/products?brand=LAMITAK',
                desc: 'HPL Lamitak menghadirkan desain eksklusif dengan daya tahan tinggi. Sesuai untuk aplikasi furnitur, lemari, dan panel dinding interior.',
              },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="bg-white p-8 hover:bg-hpl-50 transition-colors group">
                <div className="w-6 h-[1.5px] bg-hpl-line group-hover:bg-hpl-gold transition-colors mb-4"/>
                <p className="text-[13px] font-semibold tracking-[0.14em] uppercase text-hpl-ink group-hover:text-hpl-gold transition-colors mb-3">
                  {item.brand}
                </p>
                <p className="text-[13px] leading-7 text-hpl-500 max-w-sm">{item.desc}</p>
                <p className="mt-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-gold">Lihat Koleksi →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="border-b border-hpl-line">
          <div className="shell py-14 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="label mb-3">Rekomendasi</p>
                <h2 className="display text-hpl-ink text-4xl sm:text-5xl">Produk Pilihan</h2>
              </div>
              <Link href="/products" className="hidden sm:block text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                Lihat Seluruh Katalog →
              </Link>
            </div>
            <ProductGrid products={featured}/>
          </div>
        </section>
      )}

      {/* Inspiration by space */}
      <section className="border-b border-hpl-line">
        <div className="shell py-14 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label mb-3">Inspirasi Ruang</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl">HPL untuk Setiap Ruangan</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
            {[
              { room: 'Dapur & Pantri', desc: 'Motif kayu dan solid yang tahan terhadap kelembapan.' },
              { room: 'Lemari & Wardrobe', desc: 'Pilihan finish matt dan gloss untuk tampilan bersih.' },
              { room: 'Meja & Kabinet', desc: 'Permukaan tahan gores untuk intensitas penggunaan tinggi.' },
              { room: 'Panel Dinding', desc: 'Pola dekoratif dan tekstur arsitektural.' },
              { room: 'Ruang Kantor', desc: 'Desain profesional dan warna netral yang produktif.' },
              { room: 'Area Komersial', desc: 'Daya tahan tinggi untuk ruang publik dan ritel.' },
            ].map((item) => (
              <Link key={item.room} href="/products"
                className="bg-white p-6 hover:bg-hpl-50 transition-colors group">
                <div className="w-4 h-[1.5px] bg-hpl-line group-hover:bg-hpl-gold transition-colors mb-3"/>
                <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-hpl-ink mb-2">{item.room}</p>
                <p className="text-[11px] leading-6 text-hpl-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why TokoHPL */}
      <section className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="label mb-4">Keunggulan Layanan</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl mb-5">
                Mengapa Memilih<br />TokoHPL?
              </h2>
              <p className="text-[14px] leading-7 text-hpl-500 max-w-md">
                Kami melayani desainer interior, kontraktor, dan pelaku industri furnitur dengan standar layanan profesional — mulai dari konsultasi produk hingga pengiriman ke lokasi proyek.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              {[
                {
                  title: 'Harga Transparan',
                  body: 'Seluruh harga yang tertera sudah mencakup PPN 11%. Tidak ada biaya tambahan yang tersembunyi.',
                },
                {
                  title: 'Bebas Ongkos Kirim',
                  body: 'Pengiriman gratis ke seluruh wilayah Jawa dan Bali tanpa minimum pembelian.',
                },
                {
                  title: 'Produk Bergaransi',
                  body: 'Kami merupakan distributor resmi EDL dan Lamitak. Keaslian setiap produk terjamin.',
                },
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

      {/* Discount tiers */}
      <section className="border-b border-hpl-line">
        <div className="shell py-14 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label mb-3">Program Pembelian</p>
              <h2 className="display text-hpl-ink text-4xl sm:text-5xl">Diskon Volume</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hpl-line border border-hpl-line">
            {[
              { range: '10 – 24 Lembar', disc: '2%', label: 'Pembelian Awal' },
              { range: '25 – 49 Lembar', disc: '5%', label: 'Pembelian Menengah' },
              { range: '50 – 99 Lembar', disc: '7%', label: 'Pembelian Besar' },
              { range: '≥ 100 Lembar', disc: '10%', label: 'Pembelian Proyek' },
            ].map((item) => (
              <div key={item.range} className="bg-white p-6">
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-hpl-500 mb-2">{item.label}</p>
                <p className="display text-hpl-gold text-3xl mb-1">{item.disc}</p>
                <p className="text-[12px] text-hpl-ink font-medium">{item.range}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-hpl-500">
            * Diskon volume dihitung berdasarkan total keseluruhan lembar dalam satu transaksi. Diskon yang lebih besar antara volume dan kupon akan diterapkan secara otomatis.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="bg-hpl-ink text-white">
          <div className="shell py-14 sm:py-20 text-center">
            <p className="label text-hpl-400 mb-5">Mulai Pengadaan</p>
            <h2 className="display text-white text-4xl sm:text-5xl mb-6">
              Ribuan Pilihan HPL<br />
              <em className="text-hpl-300 not-italic">Siap Dikirim ke Lokasi Anda</em>
            </h2>
            <p className="text-[14px] leading-7 text-hpl-400 max-w-md mx-auto mb-8">
              Temukan HPL yang sesuai kebutuhan proyek Anda. Bebas ongkos kirim ke seluruh Jawa dan Bali.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products" className="btn-ghost-white">
                Buka Katalog Lengkap
              </Link>
              <a href="https://wa.me/6281288885224" target="_blank" rel="noreferrer"
                className="btn-gold">
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
