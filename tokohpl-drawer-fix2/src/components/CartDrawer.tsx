'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getVolumeTier, getNextVolumeTier } from '@/lib/discount';
import { formatIDR } from '@/lib/utils';
import { QuantityInput } from './QuantityInput';
import { CouponInput } from './CouponInput';

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const {
    items: allItems, isDrawerOpen,
    subtotal, totalDiscount, grandTotal, shippingFee, orderTotal,
    totalQty, appliedCoupon, province,
  } = useCartStore();
  const closeDrawer    = () => useCartStore.getState().closeDrawer();
  const removeItem     = (code: string) => useCartStore.getState().removeItem(code);
  const updateQuantity = (code: string, qty: number) => useCartStore.getState().updateQuantity(code, qty);

  // Use empty state until client-side hydration completes
  const items  = mounted ? allItems  : [];
  const qty    = mounted ? totalQty()    : 0;
  const sub    = mounted ? subtotal()    : 0;
  const disc   = mounted ? totalDiscount() : 0;
  const total  = mounted ? grandTotal()  : 0;
  const ship   = mounted ? shippingFee()  : 0;
  const order  = mounted ? orderTotal()   : 0;
  const tier  = getVolumeTier(qty);
  const next  = getNextVolumeTier(qty);

  return (
    <>
      {/* Overlay — only in DOM when open, so it never silently blocks clicks */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-hpl-ink/40"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-white flex flex-col shadow-luxury transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Keranjang belanja"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hpl-line bg-hpl-ink">
          <div>
            <p className="text-[9px] font-bold tracking-[0.22em] uppercase mb-0.5" style={{ color: '#CC4E2A' }}>tokohpl.com</p>
            <h2 className="text-[20px] font-light tracking-[-0.03em] text-white">
              Keranjang Belanja
              {qty > 0 && <span className="text-[14px] font-normal text-hpl-400 ml-2">({qty} lembar)</span>}
            </h2>
          </div>
          <button type="button" onClick={closeDrawer} aria-label="Tutup keranjang"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-white/60 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Volume nudge */}
        {qty > 0 && !appliedCoupon && next && (
          <div className="bg-hpl-50 border-b border-hpl-line px-6 py-2.5 text-[11px] text-hpl-500">
            Tambah <strong className="text-hpl-accent">{next.minQty - qty} lembar lagi</strong> untuk mendapatkan diskon {Math.round(next.rate * 100)}%
          </div>
        )}
        {qty > 0 && (tier.rate > 0 || appliedCoupon) && (
          <div className="bg-hpl-accent px-6 py-2 text-[11px] font-semibold text-white flex items-center justify-between">
            <span>
              {tier.rate > 0 && `Diskon ${Math.round(tier.rate * 100)}%`}
              {tier.rate > 0 && appliedCoupon && ' + '}
              {appliedCoupon && `Kupon ${appliedCoupon.code}`}
              
            </span>
            <span>Anda hemat {formatIDR(disc)}</span>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-hpl-300 mb-4">
                <path d="M8 8h4l5 22h18l4-14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="38" r="2" fill="currentColor"/>
                <circle cx="32" cy="38" r="2" fill="currentColor"/>
              </svg>
              <p className="text-[13px] font-medium text-hpl-ink mb-1">Keranjang Belanja Anda kosong</p>
              <p className="text-[12px] text-hpl-500 mb-6">Silahkan tambahkan produk untuk memulai pemesanan.</p>
              <button onClick={closeDrawer} className="btn-ghost text-[10px] py-2.5 px-5">Lihat Produk</button>
            </div>
          ) : (
            <ul className="divide-y divide-hpl-line">
              {items.map((item) => {
                const key = item.product.code;
                return (
                  <li key={key} className="flex gap-4 px-6 py-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-[10px] tracking-[0.16em] uppercase text-hpl-500">{item.product.brand} · {item.product.code}</p>
                        <button type="button" onClick={() => removeItem(item.product.code)}
                          aria-label="Hapus produk"
                          className="text-hpl-300 hover:text-red-500 transition-colors shrink-0">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                      <p className="text-[12px] font-medium text-hpl-ink leading-[1.4] line-clamp-2 mb-2">{item.product.name}</p>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <QuantityInput value={item.quantity} onChange={(v) => updateQuantity(item.product.code, v)}/>
                        <p className="text-[13px] font-semibold text-hpl-ink">
                          {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-hpl-line px-6 py-5 space-y-3 bg-white">
            <CouponInput />

            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-[12px]">
                <span className="text-hpl-600">Subtotal</span>
                <span className="text-hpl-ink">{formatIDR(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-[12px]">
                  <span className="text-hpl-accent font-semibold">Diskon</span>
                  <span className="text-hpl-accent font-semibold">− {formatIDR(disc)}</span>
                </div>
              )}
              {province ? (
                <div className="flex justify-between text-[12px]">
                  <span className="text-hpl-600">Ongkos Kirim</span>
                  <span className={ship === 0 ? 'text-hpl-accent font-semibold' : 'text-hpl-ink'}>
                    {ship === 0 ? 'Gratis' : formatIDR(ship)}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between text-[12px]">
                  <span className="text-hpl-600">Ongkos Kirim</span>
                  <span className="text-hpl-400 italic">Dihitung pada saat checkout sesuai tujuan</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-hpl-line">
                <span className="text-[12px] font-semibold text-hpl-ink">Total</span>
                <span className="text-[16px] font-semibold text-hpl-ink">{formatIDR(province ? order : total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link href="/cart" onClick={closeDrawer} className="btn-ghost text-[10px] py-3 justify-center">
                Lihat Keranjang
              </Link>
              <Link href="/checkout" onClick={closeDrawer} className="btn-ink text-[10px] py-3 justify-center">
                Lanjut Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
