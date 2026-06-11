export const metadata = { title: 'Kontak — TokoHPL' };

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Layanan Pelanggan</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Hubungi Kami</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-[14px] leading-7 text-hpl-600 mb-8">
              Tim kami siap membantu Anda dalam pemilihan produk, konsultasi spesifikasi, maupun proses pemesanan. Hubungi kami melalui salah satu kanal berikut.
            </p>
            <div className="space-y-6">
              {[
                {
                  label: 'WhatsApp',
                  value: '0812 8888 5224',
                  href: 'https://wa.me/6281288885224',
                  note: 'Respons tercepat — tersedia Senin s.d. Sabtu',
                },
                {
                  label: 'Surel',
                  value: 'info@tokohpl.com',
                  href: 'mailto:info@tokohpl.com',
                  note: 'Untuk pertanyaan teknis dan penawaran khusus',
                },
                {
                  label: 'Jam Operasional',
                  value: 'Senin – Sabtu, 08.00 – 17.00 WIB',
                  note: 'Di luar jam operasional, pesan WhatsApp tetap kami balas',
                },
              ].map((item) => (
                <div key={item.label} className="border border-hpl-line p-5">
                  <p className="label text-hpl-500 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[14px] font-medium text-hpl-ink hover:text-hpl-gold transition-colors block mb-1">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[14px] font-medium text-hpl-ink mb-1">{item.value}</p>
                  )}
                  {item.note && (
                    <p className="text-[11px] text-hpl-500">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="https://wa.me/6281288885224" target="_blank" rel="noreferrer" className="btn-ink">
                Mulai Chat via WhatsApp
              </a>
            </div>
          </div>

          <div className="border border-hpl-line bg-hpl-50 p-8">
            <p className="label mb-4">Jangkauan Pengiriman</p>
            <h2 className="display text-hpl-ink text-3xl mb-4">Area Layanan</h2>
            <p className="text-[13px] leading-7 text-hpl-600 mb-6">
              Kami melayani pengiriman ke seluruh Indonesia. Bebas ongkos kirim berlaku untuk wilayah Jawa dan Bali.
            </p>
            <div className="mb-6">
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-hpl-gold mb-3">Bebas Ongkir</p>
              <ul className="space-y-2">
                {['DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali'].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px] text-hpl-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-hpl-gold"/>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-hpl-500 mb-3">Tarif Pengiriman</p>
              <p className="text-[12px] leading-6 text-hpl-500">
                Untuk wilayah di luar Jawa dan Bali, ongkos kirim dihitung berdasarkan berat dan tujuan pengiriman. Hubungi kami untuk mendapatkan estimasi biaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
