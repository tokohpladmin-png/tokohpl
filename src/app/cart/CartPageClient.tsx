'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from '@/components/ProductImage';
import { QuantityInput } from '@/components/QuantityInput';

export function CartPageClient() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <p className="label mb-4">Keranjang</p>
        <h1 className="display text-hpl-ink text-4xl mb-4">Keranjang Kosong</h1>
        <p className="text-[13px] text-hpl-500 mb-8">Belum ada produk yang ditambahkan ke keranjang.</p>
        <Link href="/products" className="btn-ink">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">Belanja</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Keranjang Belanja</h1>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* Items */}
          <div>
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">
                  {items.length} Produk
                </p>
                <button onClick={clearCart}
                  className="text-[11px] tracking-[0.12em] uppercase text-hpl-400 hover:text-red-600 transition-colors">
                  Kosongkan
                </button>
              </div>
              <ul className="divide-y divide-hpl-line">
                {items.map((item) => (
                  <li key={item.product.code} className="flex gap-5 p-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-hpl-line overflow-hidden bg-hpl-50">
                      <ProductImage
                        src={item.product.imageUrl || ''}
                        imageUrls={item.product.imageUrlCandidates}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-[0.16em] uppercase text-hpl-500 mb-0.5">{item.product.brand} · {item.product.code}</p>
                      <p className="text-[14px] font-medium text-hpl-ink leading-[1.4] mb-1">{item.product.name}</p>
                      <p className="text-[12px] text-hpl-500 mb-4">{formatIDR(item.product.price)} / lembar</p>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <QuantityInput
                          value={item.quantity}
                          onChange={(v) => updateQuantity(item.product.code, v)}
                        />
                        <div className="flex items-center gap-4">
                          <span className="text-[15px] font-semibold text-hpl-ink">
                            {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.code)}
                            className="text-[11px] tracking-[0.12em] uppercase text-hpl-400 hover:text-red-600 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <Link href="/products" className="text-[11px] font-semibold tracking-[0.16em] uppercase text-hpl-500 hover:text-hpl-ink transition-colors">
                ← Lanjut Belanja
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Ringkasan Order</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Subtotal</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(subtotal())}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Ongkir</span>
                  <span className="font-semibold text-hpl-gold">Gratis</span>
                </div>
                <div className="border-t border-hpl-line pt-4 flex justify-between">
                  <span className="text-[13px] font-semibold text-hpl-ink">Total</span>
                  <span className="text-[18px] font-semibold text-hpl-ink">{formatIDR(subtotal())}</span>
                </div>
                <p className="text-[11px] text-hpl-500 bg-hpl-50 border border-hpl-line px-4 py-3">
                  🚚 Gratis ongkir ke Jawa & Bali
                </p>
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
