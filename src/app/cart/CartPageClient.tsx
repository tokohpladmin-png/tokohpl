'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { getVolumeTier, getNextVolumeTier } from '@/lib/discount';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from '@/components/ProductImage';
import { QuantityInput } from '@/components/QuantityInput';
import { DiscountBadge, DiscountTierTable } from '@/components/DiscountBadge';
import { CouponInput } from '@/components/CouponInput';

export function CartPageClient() {
  const {
    items, removeItem, updateQuantity, clearCart, getItemRate,
    subtotal, totalDiscount, grandTotal, shippingFee, orderTotal,
    totalQty, appliedCoupon, province,
  } = useCartStore();

  const qty   = totalQty();
  const sub   = subtotal();
  const disc  = totalDiscount();
  const total = grandTotal();
  const ship  = shippingFee();
  const order = orderTotal();
  const tier  = getVolumeTier(qty);
  const next  = getNextVolumeTier(qty);

  if (items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <p className="label mb-4">Keranjang Belanja</p>
        <h1 className="display text-hpl-ink text-4xl mb-4">Keranjang Masih Kosong</h1>
        <p className="text-[13px] text-hpl-500 mb-8">Belum ada produk yang ditambahkan ke dalam keranjang belanja Anda.</p>
        <Link href="/products" className="btn-ink">Lihat Produk</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">Pembelian</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">Keranjang Belanja</h1>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* Kiri — daftar produk */}
          <div>
            <div className="mb-4"><DiscountBadge /></div>

            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">
                  {items.length} Jenis Produk · {qty} Lembar
                </p>
                <button onClick={clearCart}
                  className="text-[11px] tracking-[0.12em] uppercase text-hpl-400 hover:text-red-600 transition-colors">
                  Kosongkan Keranjang
                </button>
              </div>

              <ul className="divide-y divide-hpl-line">
                {items.map((item) => {
                  const key = item.product.code;
                  return (
                    <li key={key} className="flex gap-5 p-6">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-hpl-line overflow-hidden bg-hpl-50">
                        <ProductImage
                          src={item.product.imageUrl || ''}
                          alt={item.product.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.16em] uppercase text-hpl-500 mb-0.5">
                          {item.product.brand} · {item.product.code}
                        </p>
                        <p className="text-[14px] font-medium text-hpl-ink leading-[1.4] mb-1">{item.product.name}</p>
                        {(() => {
                        const rate = getItemRate(item.product.code);
                        return rate > 0 ? (
                          <p className="text-[12px] text-hpl-500 mb-4">
                            <span className="line-through">{formatIDR(item.product.price)}</span>
                            {' → '}
                            <span className="text-hpl-accent font-semibold">{formatIDR(typeof item.product.price === 'number' ? Math.round(item.product.price * (1 - rate)) : null)}</span>
                            {' / lembar'}
                          </p>
                        ) : (
                          <p className="text-[12px] text-hpl-500 mb-4">{formatIDR(item.product.price)} / lembar</p>
                        );
                      })()}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <QuantityInput value={item.quantity} onChange={(v) => updateQuantity(item.product.code, v)}/>
                          <div className="flex items-center gap-4">
                            <span className="text-[15px] font-semibold text-hpl-ink">
                              {(() => {
                          const rate = getItemRate(item.product.code);
                          const full = typeof item.product.price === 'number' ? item.product.price * item.quantity : null;
                          return formatIDR(full !== null && rate > 0 ? Math.round(full * (1 - rate)) : full);
                        })()}
                            </span>
                            <button type="button" onClick={() => removeItem(item.product.code)}
                              className="text-[11px] tracking-[0.12em] uppercase text-hpl-400 hover:text-red-600 transition-colors">
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4">
              <Link href="/products" className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                ← Lanjutkan Berbelanja
              </Link>
            </div>

            <div className="mt-8"><DiscountTierTable /></div>
          </div>

          {/* Kanan — ringkasan */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            {/* Kupon */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-5 py-3 bg-hpl-50">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Kode Kupon</p>
              </div>
              <div className="p-4"><CouponInput /></div>
            </div>

            {/* Ringkasan pesanan */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Ringkasan Pesanan</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Subtotal ({qty} lembar)</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(sub)}</span>
                </div>

                {disc > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <div>
                      <span className="text-hpl-accent font-semibold">Diskon</span>
                      {tier.rate > 0 && (
                        <span className="ml-1.5 text-[9px] bg-hpl-accent text-white px-1.5 py-0.5 font-bold uppercase">
                          VOL {Math.round(tier.rate * 100)}%
                        </span>
                      )}
                      {appliedCoupon && (
                        <span className="ml-1.5 text-[9px] bg-hpl-ink text-white px-1.5 py-0.5 font-bold uppercase">
                          {appliedCoupon.code}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-hpl-accent">− {formatIDR(disc)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Ongkos Kirim</span>
                  {province ? (
                    <span className={ship === 0 ? 'font-semibold text-hpl-accent' : 'font-semibold text-hpl-ink'}>
                      {ship === 0 ? 'Gratis' : formatIDR(ship)}
                    </span>
                  ) : (
                    <span className="text-hpl-400 italic text-[12px]">Dihitung pada saat checkout sesuai tujuan</span>
                  )}
                </div>

                <div className="border-t border-hpl-line pt-3 flex justify-between">
                  <span className="text-[13px] font-semibold text-hpl-ink">Total</span>
                  <span className="text-[18px] font-semibold text-hpl-ink">
                    {formatIDR(province ? order : total)}
                  </span>
                </div>

                {disc > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-hpl-accent px-4 py-2">
                    <span className="text-[9px] font-bold tracking-[0.14em] uppercase bg-hpl-accent text-white px-2 py-0.5">HEMAT</span>
                    <span className="text-[11px] text-hpl-600">{formatIDR(disc)}</span>
                  </div>
                )}

                {!appliedCoupon && next && (
                  <p className="text-[11px] text-hpl-500 bg-hpl-50 border border-hpl-line px-4 py-2">
                    Tambah <strong className="text-hpl-accent">{next.minQty - qty} lembar lagi</strong> untuk mendapatkan diskon {Math.round(next.rate * 100)}%
                  </p>
                )}

                <Link href="/checkout" className="btn-ink w-full justify-center">
                  Lanjut ke Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
