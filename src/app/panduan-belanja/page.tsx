import Link from 'next/link';

export const metadata = {
  title: 'Panduan Belanja — TokoHPL',
  description: 'Cara mudah memesan HPL di tokohpl.com. Panduan lengkap dari pilih produk hingga konfirmasi pembayaran.',
};

const STEPS = [
  {
    num: '01',
    title: 'Temukan Produk',
    desc: 'Jelajahi katalog produk EDL dan Lamitak melalui menu Produk. Gunakan filter merek, koleksi, atau ukuran untuk mempersempit pilihan. Anda juga dapat mencari langsung menggunakan kode produk (contoh: WY 5216D).',
    tips: ['Gunakan tab koleksi untuk filter cepat: Wood, Solid, Pattern, Stone', 'Klik produk untuk melihat spesifikasi lengkap dan tabel diskon volume'],
  },
  {
    num: '02',
    title: 'Tambah ke Keranjang',
    desc: 'Pilih jumlah lembar yang diinginkan, lalu klik "Tambah ke Keranjang". Anda dapat menambahkan produk dari berbagai merek dalam satu pesanan. Keranjang akan muncul di sisi kanan layar.',
    tips: ['Minimum pembelian: 1 lembar', 'Diskon volume diterapkan otomatis berdasarkan total lembar', 'Jika tersedia, Anda dapat menambahkan Edge Band yang sesuai'],
  },
  {
    num: '03',
    title: 'Masukkan Kode Diskon (Opsional)',
    desc: 'Jika Anda memiliki kode diskon member (Bronze, Silver, Gold, atau Platinum), masukkan kode tersebut di kolom Kode Kupon pada halaman keranjang. Sistem akan menerapkan diskon yang lebih besar antara kode kupon dan diskon volume.',
    tips: ['Kode kupon bersifat rahasia — jangan bagikan kepada pihak lain', 'Diskon tidak berlaku untuk Edge Band'],
  },
  {
    num: '04',
    title: 'Isi Data Pengiriman',
    desc: 'Klik "Lanjut ke Checkout" dan isi data diri serta alamat pengiriman dengan lengkap dan benar. Pastikan nomor WhatsApp aktif karena tim kami akan menghubungi Anda melalui nomor tersebut.',
    tips: ['Pilih provinsi terlebih dahulu untuk melihat estimasi ongkos kirim', 'Gunakan nama penerima yang sesuai untuk keperluan pengiriman'],
  },
  {
    num: '05',
    title: 'Konfirmasi Pesanan',
    desc: 'Periksa kembali seluruh detail pesanan pada halaman Konfirmasi Pesanan — produk, jumlah, harga, dan alamat pengiriman. Jika ada yang perlu diubah, klik "Ubah Pesanan". Jika sudah sesuai, klik "Konfirmasi Pesanan".',
    tips: ['Setelah dikonfirmasi, pesanan tidak dapat diubah melalui website', 'Untuk perubahan setelah konfirmasi, segera hubungi kami via WhatsApp'],
  },
  {
    num: '06',
    title: 'Lakukan Pembayaran',
    desc: 'Setelah konfirmasi, Anda akan mendapatkan nomor pesanan dan instruksi pembayaran. Transfer sesuai jumlah yang tertera ke rekening BCA kami dalam waktu 24 jam. Gunakan nomor pesanan sebagai keterangan transfer.',
    tips: ['Transfer tepat sesuai jumlah — jangan dibulatkan', 'Gunakan nomor pesanan (contoh: TPL-20250614-1234) sebagai keterangan transfer', 'Pesanan yang belum dibayar dalam 24 jam akan dibatalkan otomatis'],
  },
  {
    num: '07',
    title: 'Konfirmasi Pembayaran',
    desc: 'Setelah transfer, kirim konfirmasi pembayaran via WhatsApp dengan menekan tombol yang tersedia pada halaman pesanan. Pesan WhatsApp sudah terisi otomatis dengan nomor pesanan dan jumlah transfer.',
    tips: ['Tim kami akan memverifikasi pembayaran dalam 1×24 jam kerja', 'Simpan bukti transfer Anda sebagai arsip'],
  },
  {
    num: '08',
    title: 'Proses & Pengiriman',
    desc: 'Setelah pembayaran terverifikasi, tim kami akan memproses dan mengirimkan pesanan Anda. Estimasi pengiriman: 3–7 hari kerja untuk Jawa dan Bali, 7–21 hari kerja untuk luar Jawa.',
    tips: ['Tim kami akan menginformasikan nomor resi pengiriman via WhatsApp', 'Untuk pengiriman ke luar Jabodetabek, produk akan dikemas menggunakan peti kayu pelindung'],
  },
];

const FAQS = [
  {
    q: 'Apakah saya perlu membuat akun untuk memesan?',
    a: 'Tidak. TokoHPL mendukung pembelian tanpa akun (guest checkout). Anda cukup mengisi data pengiriman saat checkout.',
  },
  {
    q: 'Berapa minimum pembelian?',
    a: 'Tidak ada minimum pembelian dalam lembar. Anda dapat memesan mulai dari 1 lembar. Namun, diskon volume berlaku mulai dari 10 lembar.',
  },
  {
    q: 'Apakah harga yang tertera sudah termasuk PPN?',
    a: 'Ya. Seluruh harga yang tertera di website sudah mencakup PPN 11%. Tidak ada biaya tambahan yang tersembunyi.',
  },
  {
    q: 'Bisakah saya memesan produk dari merek yang berbeda dalam satu transaksi?',
    a: 'Ya. Anda dapat memesan produk EDL dan Lamitak sekaligus dalam satu transaksi. Diskon volume dihitung berdasarkan total keseluruhan lembar.',
  },
  {
    q: 'Bagaimana jika produk yang saya inginkan tidak tersedia?',
    a: 'Hubungi kami via WhatsApp. Tim kami akan membantu mengecek ketersediaan stok atau memberikan alternatif produk yang sesuai.',
  },
  {
    q: 'Apakah tersedia layanan pengiriman ke seluruh Indonesia?',
    a: 'Ya. Kami melayani pengiriman ke seluruh Indonesia melalui berbagai mitra ekspedisi terpercaya. Estimasi tiba bervariasi tergantung lokasi tujuan.',
  },
  {
    q: 'Apa yang dimaksud dengan peti kayu pada pengiriman?',
    a: 'Untuk pengiriman ke luar Jabodetabek, produk HPL dikemas menggunakan peti kayu pelindung guna memastikan produk tiba dalam kondisi sempurna. Biaya peti sudah termasuk dalam ongkos kirim.',
  },
  {
    q: 'Apakah saya bisa membatalkan atau mengubah pesanan?',
    a: 'Pesanan dapat diubah sebelum dikonfirmasi melalui halaman Konfirmasi Pesanan. Setelah dikonfirmasi, hubungi tim kami segera via WhatsApp sebelum pembayaran diproses.',
  },
];

export default function PanduanBelanjaPage() {
  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">Bantuan</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">
            Panduan Belanja
          </h1>
          <p className="text-[14px] text-hpl-500 mt-3 max-w-xl">
            Cara mudah memesan HPL di tokohpl.com — dari pilih produk hingga produk tiba di lokasi Anda.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="shell py-14 sm:py-20">
        <p className="label mb-8">Langkah Pemesanan</p>
        <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">
          {STEPS.map((step) => (
            <div key={step.num} className="grid sm:grid-cols-[80px_1fr] gap-0">
              <div className="bg-hpl-ink flex items-center justify-center py-6 sm:py-0">
                <span className="text-[22px] font-bold tracking-[-0.03em] text-white">{step.num}</span>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-[15px] font-semibold text-hpl-ink mb-2">{step.title}</h2>
                <p className="text-[13px] leading-7 text-hpl-600 mb-4">{step.desc}</p>
                {step.tips.length > 0 && (
                  <ul className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-[12px] text-hpl-500">
                        <span className="text-hpl-accent mt-0.5 shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment info */}
      <div className="border-t border-hpl-line bg-hpl-50">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-6">Informasi Pembayaran</p>
          <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-8 bg-[#003087] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-black tracking-wider">BCA</span>
                </div>
                <p className="text-[13px] font-semibold text-hpl-ink">Bank Central Asia (BCA)</p>
              </div>
              <div className="space-y-3 text-[13px] text-hpl-600">
                <div className="flex justify-between">
                  <span>Nomor Rekening</span>
                  <span className="font-bold text-hpl-ink tracking-wider">7610516224</span>
                </div>
                <div className="flex justify-between">
                  <span>Atas Nama</span>
                  <span className="font-medium text-hpl-ink">CV. VARINDO FORMA HUTAMA</span>
                </div>
                <div className="flex justify-between">
                  <span>KCP</span>
                  <span className="text-hpl-ink">Supermal Karawaci, Tangerang</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-hpl-500 mb-4">Ketentuan Pembayaran</p>
              <ul className="space-y-3">
                {[
                  'Pembayaran dilakukan melalui transfer bank BCA',
                  'Transfer tepat sesuai jumlah yang tertera',
                  'Gunakan nomor pesanan sebagai keterangan transfer',
                  'Batas waktu pembayaran: 24 jam sejak pesanan dikonfirmasi',
                  'Pesanan yang melewati batas waktu akan dibatalkan otomatis',
                  'Konfirmasi pembayaran via WhatsApp setelah transfer',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12px] text-hpl-600">
                    <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2 shrink-0"/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-hpl-line">
        <div className="shell py-14 sm:py-20 max-w-3xl">
          <p className="label mb-8">Pertanyaan Umum</p>
          <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-hpl-50 transition-colors">
                  <span className="text-[13px] font-medium text-hpl-ink">{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180">
                    <path d="M2 5l5 5 5-5" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[13px] leading-7 text-hpl-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-hpl-line bg-hpl-ink">
        <div className="shell py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-hpl-600 mb-2">Masih Ada Pertanyaan?</p>
            <p className="text-[18px] font-light tracking-[-0.02em] text-white">Tim kami siap membantu Anda.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-accent">Mulai Belanja</Link>
            <a href="https://wa.me/628161345224" target="_blank" rel="noreferrer"
              className="btn-ghost-white">
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
