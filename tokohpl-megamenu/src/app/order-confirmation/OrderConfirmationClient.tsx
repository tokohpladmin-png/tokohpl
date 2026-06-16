'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrderStore } from '@/store/orderStore';
import { useCartStore } from '@/store/cartStore';
import { formatIDR } from '@/lib/utils';

export function OrderConfirmationClient() {
  const router = useRouter();
  const { pending, confirmPending, clearPending } = useOrderStore();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (!pending) router.replace('/checkout');
  }, [pending, router]);

  if (!pending) return null;

  const { id, customer, items, subtotal, discountAmount, grandTotal, shippingFee, orderTotal, couponCode } = pending;

  const handleConfirm = () => {
    confirmPending();
    clearCart();
    router.push(`/order-success/${id}`);
  };

  const handleEdit = () => {
    clearPending();
    router.push('/checkout');
  };

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">Langkah 2 dari 2</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">Konfirmasi Pesanan</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="border-b border-hpl-line">
        <div className="shell">
          <div className="flex">
            <div className="py-3 pr-8 flex items-center gap-2 border-b-2 border-transparent">
              <span className="w-5 h-5 bg-hpl-200 text-hpl-500 text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-hpl-400">Detail Pengiriman</span>
            </div>
            <div className="py-3 px-8 flex items-center gap-2 border-b-2 border-hpl-ink">
              <span className="w-5 h-5 bg-hpl-ink text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-hpl-ink">Konfirmasi Pesanan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">

          {/* Left — review */}
          <div className="space-y-6">

            {/* Customer info */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Informasi Pelanggan</p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">Ubah</button>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  { label: 'Nama Lengkap', value: customer.fullName },
                  { label: 'No. WhatsApp', value: customer.phone },
                  { label: 'Email', value: customer.email },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="label mb-1">{r.label}</p>
                    <p className="text-[13px] font-medium text-hpl-ink">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping address */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Alamat Pengiriman</p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">Ubah</button>
              </div>
              <div className="p-6 space-y-1">
                <p className="text-[13px] font-medium text-hpl-ink">{customer.fullName}</p>
                <p className="text-[13px] text-hpl-600">{customer.address}</p>
                <p className="text-[13px] text-hpl-600">{customer.city}, {customer.province} {customer.postalCode}</p>
                {customer.notes && (
                  <p className="text-[12px] text-hpl-500 mt-2 italic">Catatan: {customer.notes}</p>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">
                  Daftar Produk ({items.length} barang)
                </p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">Ubah</button>
              </div>
              <ul className="divide-y divide-hpl-line">
                {items.map((item) => (
                  <li key={item.product.code} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-500">{item.product.brand} · {item.product.code}</p>
                      <p className="text-[13px] font-medium text-hpl-ink">{item.product.name}</p>
                      <p className="text-[11px] text-hpl-500 mt-0.5">
                        {formatIDR(item.product.price)} × {item.quantity} lembar
                      </p>
                    </div>
                    <span className="text-[14px] font-semibold text-hpl-ink shrink-0">
                      {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment method info */}
            <div className="border border-hpl-line bg-hpl-50 p-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700 mb-4">Metode Pembayaran</p>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#003087] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black tracking-widest">BCA</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-hpl-ink">Transfer Bank BCA</p>
                  <p className="text-[12px] text-hpl-500 mt-0.5">
                    Setelah mengkonfirmasi pesanan, Anda akan mendapatkan detail rekening tujuan dan batas waktu pembayaran.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right — totals + confirm */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Total Pembayaran</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Subtotal</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-hpl-accent font-semibold">
                      Diskon {couponCode ? `(${couponCode})` : ''}
                    </span>
                    <span className="font-semibold text-hpl-accent">− {formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Ongkos Kirim</span>
                  <span className={shippingFee === 0 ? 'font-semibold text-hpl-accent' : 'font-semibold text-hpl-ink'}>
                    {shippingFee === 0 ? 'Gratis' : formatIDR(shippingFee)}
                  </span>
                </div>
                <div className="border-t border-hpl-line pt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[13px] font-bold text-hpl-ink">Total</span>
                    <span className="text-[22px] font-bold text-hpl-ink leading-none">{formatIDR(orderTotal)}</span>
                  </div>
                  <p className="text-[10px] text-hpl-500 text-right">Sudah termasuk PPN</p>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 border border-amber-200 px-4 py-3">
                  <p className="text-[11px] text-amber-800 leading-5">
                    <strong>Penting:</strong> Setelah mengkonfirmasi, Anda wajib melakukan pembayaran dalam <strong>24 jam</strong>. Pesanan yang belum dibayar akan dibatalkan secara otomatis.
                  </p>
                </div>

                <button type="button" onClick={handleConfirm}
                  className="btn-ink w-full justify-center py-4 text-[12px]">
                  Konfirmasi Pesanan
                </button>
                <button type="button" onClick={handleEdit}
                  className="btn-ghost w-full justify-center py-3 text-[11px]">
                  ← Ubah Pesanan
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
