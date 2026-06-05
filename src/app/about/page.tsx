export const metadata = { title: 'Tentang Kami' };
export default function AboutPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Tentang Kami</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">TokoHPL</h1>
        </div>
      </div>
      <div className="shell py-14 sm:py-20 max-w-3xl">
        <p className="text-[15px] leading-8 text-hpl-600 mb-8">
          TokoHPL adalah toko online terpercaya yang menyediakan produk HPL (High Pressure Laminate) berkualitas tinggi dari dua brand terkemuka: <strong className="text-hpl-ink">EDL HPL</strong> dan <strong className="text-hpl-ink">Lamitak HPL</strong>.
        </p>
        <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line mb-12">
          {[
            { title: 'Distributor Resmi', body: 'Kami adalah distributor resmi EDL dan Lamitak di Indonesia, memastikan keaslian setiap produk yang kami jual.' },
            { title: 'Ribuan Pilihan', body: 'Tersedia lebih dari 1.300 pilihan produk HPL dengan berbagai motif, ukuran, dan finish.' },
            { title: 'Harga Transparan', body: 'Semua harga sudah termasuk PPN 11%. Tidak ada biaya tersembunyi.' },
            { title: 'Gratis Ongkir', body: 'Pengiriman gratis ke seluruh Jawa dan Bali tanpa minimum order.' },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6">
              <div className="w-6 h-[1.5px] bg-hpl-gold mb-4"/>
              <h3 className="text-[13px] font-semibold text-hpl-ink mb-2">{item.title}</h3>
              <p className="text-[12px] leading-6 text-hpl-500">{item.body}</p>
            </div>
          ))}
        </div>
        <h2 className="display text-hpl-ink text-3xl mb-4">Produk Kami</h2>
        <p className="text-[14px] leading-7 text-hpl-600 mb-4">
          HPL (High Pressure Laminate) adalah material pelapis permukaan yang banyak digunakan dalam industri furniture, interior, dan konstruksi. Material ini dikenal karena ketahanannya, variasi desain yang luas, dan kemudahan pemasangan.
        </p>
        <p className="text-[14px] leading-7 text-hpl-600">
          Kami menyediakan HPL dalam berbagai kategori: motif kayu (woods), pola (patterns), polos (solids), dengan berbagai ukuran dan ketebalan sesuai kebutuhan proyek Anda.
        </p>
      </div>
    </div>
  );
}
