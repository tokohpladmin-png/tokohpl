export const metadata = { title: 'Informasi Pengiriman — TokoHPL' };

export default function ShippingPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Kebijakan Pengiriman</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Informasi Pengiriman</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <p className="text-[14px] leading-7 text-hpl-600 mb-10">
          TokoHPL melayani pengiriman ke seluruh wilayah Indonesia melalui mitra logistik terpercaya. Kebijakan bebas ongkos kirim berlaku berdasarkan wilayah tujuan dan nilai total pembelian.
        </p>

        <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">

          {/* Jawa & Bali */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">Wilayah Jawa & Bali</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">
                  DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur, Bali
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Bebas Ongkir</p>
                <p className="text-[15px] font-bold text-hpl-ink">≥ Rp 10.000.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Total setelah diskon</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Di Bawah Minimum</p>
                <p className="text-[15px] font-bold text-hpl-ink">Rp 100.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Tarif flat per pengiriman</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Estimasi Tiba</p>
                <p className="text-[15px] font-bold text-hpl-ink">3–7 hari kerja</p>
              </div>
            </div>
          </div>

          {/* Luar Jawa */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">Luar Jawa & Bali</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">
                  Sumatera, Kalimantan, Sulawesi, Nusa Tenggara, Maluku, Papua
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Bebas Ongkir</p>
                <p className="text-[15px] font-bold text-hpl-ink">≥ Rp 25.000.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Total setelah diskon</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Di Bawah Minimum</p>
                <p className="text-[15px] font-bold text-hpl-ink">Rp 250.000</p>
                <p className="text-[11px] text-hpl-500 mt-1">Tarif flat per pengiriman</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Estimasi Tiba</p>
                <p className="text-[15px] font-bold text-hpl-ink">7–21 hari kerja</p>
              </div>
            </div>
          </div>

          {/* Crating */}
          <div className="p-8">
            <p className="label mb-3">Peti Kayu (Crating)</p>
            <h2 className="text-[16px] font-semibold text-hpl-ink mb-3">
              Pengiriman ke Luar Jabodetabek
            </h2>
            <p className="text-[13px] leading-6 text-hpl-600 mb-4">
              Untuk pengiriman HPL ke luar wilayah Jabodetabek (Jakarta, Bogor, Tangerang, Bekasi, Depok), produk dikemas menggunakan peti kayu pelindung guna memastikan kondisi material tetap sempurna saat tiba di tujuan.
            </p>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Kapasitas Peti</p>
                <p className="text-[15px] font-bold text-hpl-ink">Maks. 20 lembar</p>
                <p className="text-[11px] text-hpl-500 mt-1">Per peti kayu</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Berat Peti</p>
                <p className="text-[15px] font-bold text-hpl-ink">+10 kg per peti</p>
                <p className="text-[11px] text-hpl-500 mt-1">Dihitung dalam berat pengiriman</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">Biaya</p>
                <p className="text-[15px] font-bold text-hpl-ink">Termasuk ongkir</p>
                <p className="text-[11px] text-hpl-500 mt-1">Tidak ditagihkan secara terpisah</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-8 bg-hpl-50">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-4">Ketentuan Pengiriman</p>
            <ul className="space-y-2">
              {[
                'Minimum bebas ongkir dihitung berdasarkan total nilai pembelian setelah diskon.',
                'Estimasi pengiriman mengacu pada hari kerja dan tidak mencakup hari libur nasional.',
                'Untuk wilayah terpencil di Papua dan Maluku, estimasi pengiriman dapat melebihi perkiraan standar.',
                'Setiap produk dikemas secara profesional untuk mencegah kerusakan selama proses pengiriman.',
                'Konfirmasi pemesanan akan dilakukan melalui WhatsApp dalam waktu 1×24 jam setelah pesanan diterima.',
                'TokoHPL tidak bertanggung jawab atas keterlambatan yang disebabkan oleh kondisi di luar kendali mitra logistik.',
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
