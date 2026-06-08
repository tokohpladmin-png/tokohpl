export const metadata = { title: 'Info Pengiriman' };

export default function ShippingPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Informasi</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Info Pengiriman</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">

          {/* Jawa & Bali */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">Jawa & Bali</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur, Bali</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Gratis Ongkir</p>
                <p className="text-[15px] font-bold text-hpl-ink">≥ Rp 10.000.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Total setelah diskon</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Di Bawah Threshold</p>
                <p className="text-[15px] font-bold text-hpl-ink">Rp 100.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Flat per pengiriman</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Estimasi</p>
                <p className="text-[15px] font-bold text-hpl-ink">3–7 hari kerja</p>
              </div>
            </div>
          </div>

          {/* Luar Jawa */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">Luar Jawa & Bali</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">Sumatera, Kalimantan, Sulawesi, Nusa Tenggara, Maluku, Papua</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Gratis Ongkir</p>
                <p className="text-[15px] font-bold text-hpl-ink">≥ Rp 25.000.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Total setelah diskon</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Di Bawah Threshold</p>
                <p className="text-[15px] font-bold text-hpl-ink">Rp 250.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Flat per pengiriman</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Estimasi</p>
                <p className="text-[15px] font-bold text-hpl-ink">7–21 hari kerja</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-8 bg-hpl-50">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-4">Catatan Penting</p>
            <ul className="space-y-2">
              {[
                'Threshold gratis ongkir dihitung dari total belanja setelah diskon.',
                'Estimasi pengiriman adalah hari kerja, tidak termasuk hari libur nasional.',
                'Untuk daerah terpencil di Papua dan Maluku, estimasi dapat lebih lama.',
                'Produk dikemas dengan aman untuk mencegah kerusakan selama pengiriman.',
                'Konfirmasi pesanan dilakukan via WhatsApp dalam 1×24 jam.',
              ].map((note) => (
                <li key={note} className="flex items-start gap-2 text-[12px] text-hpl-600">
                  <span className="text-hpl-gold mt-0.5 shrink-0">→</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
