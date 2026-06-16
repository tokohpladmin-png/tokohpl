export const metadata = { title: 'Tentang Kami — TokoHPL' };

export default function AboutPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Profil Perusahaan</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">Tentang TokoHPL</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <p className="text-[15px] leading-8 text-hpl-600 mb-8">
          TokoHPL adalah platform pengadaan material HPL <em>(High Pressure Laminate)</em> yang melayani kebutuhan profesional industri interior Indonesia. Kami merupakan distributor resmi dari dua merek terkemuka:{' '}
          <strong className="text-hpl-ink">EDL HPL</strong> dan{' '}
          <strong className="text-hpl-ink">Lamitak HPL</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line mb-12">
          {[
            {
              title: 'Distributor Resmi',
              body: 'Kami adalah distributor resmi EDL dan Lamitak di Indonesia, menjamin keaslian serta kualitas setiap produk yang kami distribusikan.',
            },
            {
              title: 'Ragam Koleksi Luas',
              body: 'Tersedia ratusan referensi produk HPL dalam beragam motif, ukuran, ketebalan, dan jenis finish untuk memenuhi kebutuhan proyek Anda.',
            },
            {
              title: 'Harga Transparan',
              body: 'Seluruh harga yang tertera telah mencakup PPN 11%. Tidak ada biaya tambahan yang tidak tercantum.',
            },
            {
              title: 'Bebas Ongkos Kirim',
              body: 'Pengiriman ke seluruh Indonesia melalui mitra ekspedisi terpercaya dengan tarif kompetitif.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6">
              <div className="w-6 h-[1.5px] bg-hpl-accent mb-4"/>
              <h3 className="text-[13px] font-semibold text-hpl-ink mb-2">{item.title}</h3>
              <p className="text-[12px] leading-6 text-hpl-500">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="display text-hpl-ink text-3xl mb-4">Material HPL</h2>
        <p className="text-[14px] leading-7 text-hpl-600 mb-4">
          HPL <em>(High Pressure Laminate)</em> adalah material pelapis permukaan berbasis kertas dekoratif bertekanan tinggi yang banyak digunakan dalam industri furnitur, interior, dan konstruksi. Material ini dikenal memiliki ketahanan tinggi terhadap goresan, kelembapan, dan panas, serta tersedia dalam variasi desain yang sangat luas.
        </p>
        <p className="text-[14px] leading-7 text-hpl-600 mb-8">
          Kami menyediakan HPL dalam berbagai kategori: motif kayu <em>(woods)</em>, pola dekoratif <em>(patterns)</em>, dan warna polos <em>(solids)</em> — dengan pilihan ukuran dan ketebalan yang disesuaikan dengan standar kebutuhan proyek profesional.
        </p>

        <h2 className="display text-hpl-ink text-3xl mb-4">Layanan Kami</h2>
        <p className="text-[14px] leading-7 text-hpl-600 mb-4">
          Kami melayani desainer interior, kontraktor, pelaku industri furnitur, hingga individu yang membutuhkan material HPL berkualitas. Tim kami siap memberikan rekomendasi produk yang sesuai dengan kebutuhan spesifik proyek Anda.
        </p>
        <p className="text-[14px] leading-7 text-hpl-600">
          Untuk konsultasi produk dan informasi lebih lanjut, silakan menghubungi kami melalui WhatsApp atau email yang tersedia di halaman Kontak.
        </p>
      </div>
    </div>
  );
}
