export const metadata = { title: 'Kontak' };
export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Hubungi Kami</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Kontak</h1>
        </div>
      </div>
      <div className="shell py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-[14px] leading-7 text-hpl-600 mb-8">
              Ada pertanyaan tentang produk? Butuh bantuan pemesanan? Tim kami siap membantu Anda.
            </p>
            <div className="space-y-6">
              {[
                { label: 'WhatsApp', value: '0811 945 224', href: 'https://wa.me/62811945224' },
                { label: 'Email', value: 'info@tokohpl.com', href: 'mailto:info@tokohpl.com' },
                { label: 'Jam Operasional', value: 'Senin – Sabtu, 08.00 – 17.00 WIB' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 border border-hpl-line p-5">
                  <div>
                    <p className="label text-hpl-500 mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[14px] font-medium text-hpl-ink hover:text-hpl-gold transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-[14px] font-medium text-hpl-ink">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer" className="btn-ink">
                Chat via WhatsApp
              </a>
            </div>
          </div>
          <div className="border border-hpl-line bg-hpl-50 p-8">
            <p className="label mb-4">Area Pengiriman</p>
            <h2 className="display text-hpl-ink text-3xl mb-4">Jawa & Bali</h2>
            <p className="text-[13px] leading-7 text-hpl-600 mb-6">
              Saat ini kami melayani pengiriman gratis ke seluruh wilayah Jawa dan Bali.
            </p>
            <ul className="space-y-2">
              {['DKI Jakarta','Banten','Jawa Barat','Jawa Tengah','DI Yogyakarta','Jawa Timur','Bali'].map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-hpl-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-hpl-gold"/>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
