export const metadata = { title: 'Info Pengiriman' };
export default function ShippingPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Informasi</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Pengiriman</h1>
        </div>
      </div>
      <div className="shell py-14 sm:py-20 max-w-3xl">
        <div className="space-y-10">
          {[
            {
              title: 'Area Pengiriman',
              body: 'Kami melayani pengiriman GRATIS ke seluruh wilayah Jawa dan Bali, mencakup: DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur, dan Bali.'
            },
            {
              title: 'Estimasi Waktu',
              body: 'Pesanan akan diproses dalam 1×24 jam setelah pembayaran dikonfirmasi. Estimasi pengiriman 3–7 hari kerja tergantung lokasi tujuan.'
            },
            {
              title: 'Biaya Ongkir',
              body: 'Gratis ongkir ke seluruh Jawa dan Bali tanpa minimum order. Tidak ada biaya pengiriman tersembunyi.'
            },
            {
              title: 'Kondisi Produk',
              body: 'Setiap produk dikemas dengan hati-hati menggunakan bahan pelindung untuk memastikan produk sampai dalam kondisi sempurna.'
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-hpl-line pt-8 first:border-t-0 first:pt-0">
              <h2 className="text-[16px] font-semibold text-hpl-ink mb-3">{item.title}</h2>
              <p className="text-[14px] leading-7 text-hpl-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
