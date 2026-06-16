export const metadata = {
  title: 'Kebijakan Privasi — TokoHPL',
  description: 'Kebijakan privasi dan perlindungan data pelanggan TokoHPL.',
};

export default function KebijakanPrivasiPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">
            Kebijakan Privasi
          </h1>
          <p className="text-[12px] text-hpl-500 mt-3">Berlaku sejak 1 Januari 2025</p>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">

        <div className="prose-custom space-y-10">

          <section>
            <p className="text-[14px] leading-7 text-hpl-600">
              TokoHPL (<strong className="text-hpl-ink">tokohpl.com</strong>), yang dioperasikan oleh CV. Varindo Forma Hutama, berkomitmen untuk melindungi privasi dan data pribadi setiap pelanggan. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi yang Anda berikan kepada kami.
            </p>
          </section>

          {[
            {
              title: '1. Informasi yang Kami Kumpulkan',
              content: (
                <div className="space-y-4 text-[13px] leading-7 text-hpl-600">
                  <p>Ketika Anda melakukan pemesanan di tokohpl.com, kami mengumpulkan informasi berikut:</p>
                  <ul className="space-y-2">
                    {[
                      'Nama lengkap',
                      'Nomor telepon / WhatsApp',
                      'Alamat email',
                      'Alamat pengiriman (provinsi, kota, alamat lengkap, kode pos)',
                      'Catatan pengiriman yang Anda berikan secara sukarela',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2.5 shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>Kami tidak mengumpulkan informasi pembayaran seperti nomor kartu kredit atau rekening bank Anda. Pembayaran dilakukan melalui transfer bank langsung.</p>
                </div>
              ),
            },
            {
              title: '2. Penggunaan Informasi',
              content: (
                <div className="space-y-3 text-[13px] leading-7 text-hpl-600">
                  <p>Informasi yang Anda berikan digunakan semata-mata untuk:</p>
                  <ul className="space-y-2">
                    {[
                      'Memproses dan mengkonfirmasi pesanan Anda',
                      'Mengatur pengiriman produk ke alamat yang ditentukan',
                      'Menghubungi Anda melalui WhatsApp atau email terkait status pesanan',
                      'Memberikan layanan pelanggan yang lebih baik',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2.5 shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>Kami <strong className="text-hpl-ink">tidak</strong> menggunakan data Anda untuk keperluan pemasaran pihak ketiga atau menjual data Anda kepada pihak lain.</p>
                </div>
              ),
            },
            {
              title: '3. Penyimpanan Data',
              content: (
                <p className="text-[13px] leading-7 text-hpl-600">
                  Data pesanan disimpan secara lokal di perangkat Anda melalui penyimpanan browser (localStorage) dan di sistem internal kami untuk keperluan pencatatan transaksi. Data tersebut tidak disimpan di server pihak ketiga tanpa sepengetahuan Anda.
                </p>
              ),
            },
            {
              title: '4. Berbagi Informasi dengan Pihak Ketiga',
              content: (
                <div className="space-y-3 text-[13px] leading-7 text-hpl-600">
                  <p>Kami hanya berbagi informasi yang diperlukan dengan:</p>
                  <ul className="space-y-2">
                    {[
                      'Mitra logistik pengiriman, semata-mata untuk memproses pengiriman pesanan Anda',
                      'Pihak berwenang apabila diwajibkan oleh hukum yang berlaku di Indonesia',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2.5 shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              title: '5. Keamanan Data',
              content: (
                <p className="text-[13px] leading-7 text-hpl-600">
                  Kami mengambil langkah-langkah yang wajar untuk melindungi informasi pribadi Anda dari akses yang tidak sah, pengungkapan, atau penyalahgunaan. Komunikasi melalui WhatsApp dilindungi oleh enkripsi end-to-end.
                </p>
              ),
            },
            {
              title: '6. Hak Anda',
              content: (
                <div className="space-y-3 text-[13px] leading-7 text-hpl-600">
                  <p>Anda memiliki hak untuk:</p>
                  <ul className="space-y-2">
                    {[
                      'Meminta akses terhadap data pribadi yang kami simpan tentang Anda',
                      'Meminta koreksi data yang tidak akurat',
                      'Meminta penghapusan data pribadi Anda dari sistem kami',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2.5 shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>Untuk mengajukan permintaan tersebut, silakan hubungi kami melalui email di <a href="mailto:tokohpl.admin@gmail.com" className="text-hpl-accent hover:underline">tokohpl.admin@gmail.com</a>.</p>
                </div>
              ),
            },
            {
              title: '7. Cookie dan Penyimpanan Lokal',
              content: (
                <p className="text-[13px] leading-7 text-hpl-600">
                  Website ini menggunakan penyimpanan lokal browser (localStorage) untuk menyimpan data keranjang belanja dan preferensi Anda selama sesi berbelanja. Data ini tersimpan di perangkat Anda dan dapat dihapus kapan saja melalui pengaturan browser.
                </p>
              ),
            },
            {
              title: '8. Perubahan Kebijakan',
              content: (
                <p className="text-[13px] leading-7 text-hpl-600">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan yang signifikan akan diberitahukan melalui halaman ini dengan memperbarui tanggal berlaku. Penggunaan layanan kami setelah perubahan tersebut berarti Anda menyetujui kebijakan yang diperbarui.
                </p>
              ),
            },
            {
              title: '9. Hubungi Kami',
              content: (
                <div className="text-[13px] leading-7 text-hpl-600">
                  <p className="mb-3">Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami:</p>
                  <div className="border border-hpl-line bg-hpl-50 p-5 space-y-1">
                    <p className="font-semibold text-hpl-ink">CV. Varindo Forma Hutama</p>
                    <p>Branz BSD Tower A Unit 3310, Jl. BSD Boulevard Parcel 55-F</p>
                    <p>Tangerang 15339, Banten, Indonesia</p>
                    <p className="mt-2">
                      Email: <a href="mailto:tokohpl.admin@gmail.com" className="text-hpl-accent hover:underline">tokohpl.admin@gmail.com</a>
                    </p>
                    <p>
                      WhatsApp: <a href="https://wa.me/62811945224" className="text-hpl-accent hover:underline">0811 945 224</a>
                    </p>
                  </div>
                </div>
              ),
            },
          ].map((section) => (
            <section key={section.title} className="border-t border-hpl-line pt-8">
              <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}

        </div>
      </div>
    </div>
  );
}
