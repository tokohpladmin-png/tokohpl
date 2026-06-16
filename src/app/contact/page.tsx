export const metadata = { title: 'Kontak — TokoHPL' };

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Layanan Pelanggan</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">Hubungi Kami</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left */}
          <div>
            <p className="text-[14px] leading-7 text-hpl-500 mb-8">
              Jika Anda memiliki pertanyaan mengenai produk dan layanan kami, jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
            </p>

            {/* Combined contact card */}
            <div className="border border-hpl-line divide-y divide-hpl-line">
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-hpl-50 border border-hpl-line flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-hpl-ink">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.42 10.5 19.79 19.79 0 01.36 1.82 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-500 mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/62811945224" className="text-[14px] font-medium text-hpl-ink hover:text-hpl-accent transition-colors">
                      0811 945 224
                    </a>
                  </div>
                </div>
                <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer"
                  className="btn-ink text-[10px] py-2 px-4 shrink-0">
                  Chat
                </a>
              </div>

              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-hpl-50 border border-hpl-line flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-hpl-ink">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-500 mb-0.5">Email</p>
                    <a href="mailto:tokohpl.admin@gmail.com" className="text-[14px] font-medium text-hpl-ink hover:text-hpl-accent transition-colors">
                      tokohpl.admin@gmail.com
                    </a>
                  </div>
                </div>
                <a href="mailto:tokohpl.admin@gmail.com"
                  className="btn-ghost text-[10px] py-2 px-4 shrink-0">
                  Kirim
                </a>
              </div>

              <div className="px-6 py-5 flex items-center gap-4">
                <div className="w-9 h-9 bg-hpl-50 border border-hpl-line flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-hpl-ink">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-500 mb-0.5">Jam Operasional</p>
                  <p className="text-[14px] font-medium text-hpl-ink">Senin – Jumat, 09.00 – 17.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — company */}
          <div className="border border-hpl-line p-8">
            <p className="label mb-6">Perusahaan</p>
            <p className="text-[14px] font-bold text-hpl-ink mb-5">CV. Varindo Forma Hutama</p>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-9 h-9 bg-hpl-50 border border-hpl-line flex items-center justify-center shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-hpl-ink">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <address className="not-italic text-[13px] leading-7 text-hpl-600">
                Branz BSD Tower A Unit 3310<br />
                Jl. BSD Boulevard Parcel 55-F<br />
                Tangerang 15339, Banten, Indonesia<br />
                T. <a href="tel:+62811945224" className="hover:text-hpl-accent transition-colors">0811 945 224</a>
              </address>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
