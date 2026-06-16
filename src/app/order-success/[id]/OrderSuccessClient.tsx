'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOrderStore } from '@/store/orderStore';
import { formatIDR } from '@/lib/utils';

const BCA_ACCOUNT = '7610516224';
const BCA_NAME    = 'CV. VARINDO FORMA HUTAMA';
const BCA_BRANCH  = 'KCP. Supermal Karawaci, Tangerang';
const WA_NUMBER   = '62811945224';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el);
      el.select(); document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={handle}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase border transition-all ${
        copied ? 'bg-green-50 border-green-400 text-green-700'
               : 'bg-white border-hpl-line text-hpl-600 hover:border-hpl-ink hover:text-hpl-ink'}`}>
      {copied ? (
        <><svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>Tersalin</>
      ) : (
        <><svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2"/>
        </svg>{label}</>
      )}
    </button>
  );
}

function Countdown({ deadlineIso }: { deadlineIso: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [expired, setExpired]   = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = new Date(deadlineIso).getTime() - Date.now();
      if (diff <= 0) { setExpired(true); setTimeLeft('00:00:00'); return; }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadlineIso]);

  const deadline = new Date(deadlineIso).toLocaleString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  return (
    <div className={`border px-5 py-4 ${expired ? 'border-red-300 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
      <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-amber-700 mb-2">
        {expired ? 'Batas Waktu Pembayaran Telah Terlewat' : 'Batas Waktu Pembayaran'}
      </p>
      {!expired && (
        <p className="text-[32px] font-bold tracking-[-0.02em] text-hpl-ink leading-none mb-1 font-mono">
          {timeLeft}
        </p>
      )}
      <p className="text-[12px] text-amber-800">
        {expired
          ? 'Pesanan ini mungkin telah dibatalkan. Hubungi kami untuk informasi lebih lanjut.'
          : `Bayar sebelum ${deadline}`}
      </p>
    </div>
  );
}

export function OrderSuccessClient({ orderId }: { orderId: string }) {
  const [mounted, setMounted] = useState(false);
  const confirmed = useOrderStore((s) => s.confirmed);

  useEffect(() => { setMounted(true); }, []);

  // Wait for hydration
  if (!mounted) {
    return (
      <div className="shell py-20 text-center">
        <p className="text-[13px] text-hpl-500">Memuat detail pesanan…</p>
      </div>
    );
  }

  const order = confirmed.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="shell py-20 text-center max-w-lg mx-auto">
        <p className="label mb-4">Pesanan tidak ditemukan</p>
        <h1 className="text-3xl font-light tracking-[-0.03em] text-hpl-ink mb-4">
          Nomor pesanan <span className="font-bold">{orderId}</span> tidak ditemukan.
        </h1>
        <p className="text-[13px] text-hpl-500 mb-8">
          Jika Anda baru saja memesan, coba muat ulang halaman ini. Atau hubungi kami via WhatsApp dengan nomor pesanan Anda.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo TokoHPL, saya ingin menanyakan pesanan saya dengan nomor ${orderId}.`)}`}
            target="_blank" rel="noreferrer" className="btn-ink">
            Hubungi via WhatsApp
          </a>
          <Link href="/products" className="btn-ghost">Lanjut Belanja</Link>
        </div>
      </div>
    );
  }

  const waText = `Halo TokoHPL, saya sudah melakukan transfer untuk pesanan *${order.id}* sebesar *${formatIDR(order.orderTotal)}*. Mohon konfirmasinya. Terima kasih.`;

  return (
    <div>
      {/* Header */}
      <div className="bg-hpl-ink text-white">
        <div className="shell py-10 sm:py-14">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-hpl-accent flex items-center justify-center shrink-0 mt-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l6 6L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-hpl-500 mb-2">Pesanan Dikonfirmasi</p>
              <h1 className="text-3xl sm:text-4xl font-light tracking-[-0.03em] text-white mb-2">
                Terima Kasih, {order.customer.fullName.split(' ')[0]}!
              </h1>
              <p className="text-[13px] text-hpl-400 max-w-lg">
                Pesanan Anda telah kami terima. Tim kami akan menghubungi Anda melalui WhatsApp untuk mengkonfirmasi pesanan setelah pembayaran diterima.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* Left */}
          <div className="space-y-6">

            {/* Order ID */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Nomor Pesanan</p>
              </div>
              <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[28px] font-bold tracking-[-0.02em] text-hpl-ink leading-none">{order.id}</p>
                  <p className="text-[11px] text-hpl-500 mt-1.5">
                    Gunakan nomor ini sebagai <strong className="text-hpl-ink">keterangan transfer</strong> Anda.
                  </p>
                </div>
                <CopyButton text={order.id} label="Salin" />
              </div>
            </div>

            {/* Countdown */}
            <Countdown deadlineIso={order.deadlineIso} />

            {/* Follow up info */}
            <div className="border border-hpl-line bg-hpl-50 px-6 py-5 flex items-start gap-4">
              <div className="w-9 h-9 bg-hpl-ink flex items-center justify-center shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.42 10.5 19.79 19.79 0 01.36 1.82 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-hpl-ink mb-1">Tim kami akan menghubungi Anda</p>
                <p className="text-[12px] leading-6 text-hpl-600">
                  Setelah pembayaran kami terima, tim TokoHPL akan menghubungi Anda melalui WhatsApp{' '}
                  <strong className="text-hpl-ink">{order.customer.phone}</strong> dalam 1×24 jam kerja untuk konfirmasi dan informasi pengiriman.
                </p>
              </div>
            </div>

            {/* Payment instructions */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Instruksi Pembayaran</p>
              </div>
              <div className="p-6 space-y-5">

                {/* Bank */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-9 bg-[#003087] flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-black tracking-wider">BCA</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-hpl-ink">Bank Central Asia (BCA)</p>
                    <p className="text-[11px] text-hpl-500">{BCA_BRANCH}</p>
                  </div>
                </div>

                {/* Account + Amount */}
                <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
                  <div className="bg-white p-5">
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-500 mb-2">Nomor Rekening</p>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-[20px] font-bold tracking-[0.04em] text-hpl-ink">{BCA_ACCOUNT}</p>
                      <CopyButton text={BCA_ACCOUNT} label="Salin" />
                    </div>
                    <p className="text-[11px] text-hpl-500">a/n {BCA_NAME}</p>
                  </div>
                  <div className="bg-white p-5">
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-hpl-500 mb-2">Jumlah Transfer</p>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-[20px] font-bold text-hpl-ink">{formatIDR(order.orderTotal)}</p>
                      <CopyButton text={String(order.orderTotal)} label="Salin" />
                    </div>
                    <p className="text-[11px] text-hpl-500">Transfer tepat sesuai jumlah</p>
                  </div>
                </div>

                {/* Steps */}
                <ol className="space-y-3">
                  {[
                    `Transfer sebesar ${formatIDR(order.orderTotal)} ke rekening BCA di atas`,
                    `Isi keterangan transfer dengan nomor pesanan: ${order.id}`,
                    'Kirim konfirmasi pembayaran via WhatsApp dengan menekan tombol di bawah',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-[12px] text-hpl-600">
                      <span className="shrink-0 w-5 h-5 bg-hpl-ink text-white text-[9px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                {/* WhatsApp */}
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`}
                  target="_blank" rel="noreferrer"
                  className="btn-ink w-full justify-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L0 24l6.334-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.498-5.194-1.365l-.373-.215-3.861.921.957-3.756-.235-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Konfirmasi Pembayaran via WhatsApp
                </a>
                <p className="text-[10px] text-center text-hpl-500">
                  Tombol di atas akan membuka WhatsApp dengan pesan yang sudah terisi otomatis.
                </p>
              </div>
            </div>

            {/* Order items */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Detail Pesanan</p>
              </div>
              <ul className="divide-y divide-hpl-line">
                {order.items.map((item) => {
                  const key = item.product.code;

                  return (
                    <li key={key} className="flex items-center justify-between gap-4 px-6 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-500">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-hpl-500 mt-0.5">
                          {`${formatIDR(item.product.price)} × ${item.quantity} lembar`}
                        </p>
                      </div>
                      <span className="text-[14px] font-semibold text-hpl-ink shrink-0">
                        {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : 0)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-hpl-line px-6 py-4 space-y-2 bg-hpl-50">
                <div className="flex justify-between text-[12px]">
                  <span className="text-hpl-600">Subtotal</span>
                  <span className="text-hpl-ink">{formatIDR(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-hpl-accent">Diskon {order.couponCode ? `(${order.couponCode})` : ''}</span>
                    <span className="text-hpl-accent">− {formatIDR(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[12px]">
                  <span className="text-hpl-600">Ongkos Kirim</span>
                  <span className={order.shippingFee === 0 ? 'text-hpl-accent' : 'text-hpl-ink'}>
                    {order.shippingFee === 0 ? 'Gratis' : formatIDR(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] font-bold border-t border-hpl-line pt-2">
                  <span className="text-hpl-ink">Total</span>
                  <span className="text-hpl-ink">{formatIDR(order.orderTotal)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right — shipping + nav */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">

            {/* Shipping */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Alamat Pengiriman</p>
              </div>
              <div className="p-6 space-y-0.5">
                <p className="text-[13px] font-semibold text-hpl-ink">{order.customer.fullName}</p>
                <p className="text-[12px] text-hpl-600">{order.customer.phone}</p>
                <p className="text-[12px] text-hpl-600 mt-2">{order.customer.address}</p>
                <p className="text-[12px] text-hpl-600">{order.customer.city}, {order.customer.province} {order.customer.postalCode}</p>
                {order.customer.notes && (
                  <p className="text-[11px] text-hpl-500 italic mt-1">Catatan: {order.customer.notes}</p>
                )}
              </div>
            </div>

            {/* Info box */}
            <div className="border border-hpl-line px-6 py-5 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-hpl-500">Informasi Pesanan</p>
              <div className="flex justify-between text-[12px]">
                <span className="text-hpl-600">Nomor Pesanan</span>
                <span className="font-semibold text-hpl-ink">{order.id}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-hpl-600">Tanggal Pesanan</span>
                <span className="text-hpl-ink">
                  {new Date(order.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-hpl-600">Status</span>
                <span className="font-semibold text-amber-600">Menunggu Pembayaran</span>
              </div>
            </div>

            <Link href="/products" className="btn-ghost w-full justify-center text-[11px] py-2.5 block text-center">
              Lanjut Belanja
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
