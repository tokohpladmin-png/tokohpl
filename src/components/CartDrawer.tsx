'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from './ProductImage';
import { QuantityInput } from './QuantityInput';

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-hpl-ink/40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-hpl-paper flex flex-col shadow-luxury transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Keranjang belanja"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hpl-line">
          <div>
            <p className="label mb-0.5">TokoHPL</p>
            <h2 className="display text-hpl-ink text-2xl">Keranjang</h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Tutup keranjang"
            className="w-10 h-10 flex items-center justify-center border border-hpl-line hover:border-hpl-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-hpl-300 mb-4">
                <path d="M8 8h4l5 22h18l4-14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="38" r="2" fill="currentColor"/>
                <circle cx="32" cy="38" r="2" fill="currentColor"/>
              </svg>
              <p className="text-[13px] font-medium text-hpl-ink mb-1">Keranjang kosong</p>
              <p className="text-[12px] text-hpl-500 mb-6">Tambahkan produk untuk memulai</p>
              <button onClick={closeDrawer} className="btn-ghost text-[10px] py-2.5 px-5">
                Lihat Produk
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-hpl-line">
              {items.map((item) => (
                <li key={item.product.code} className="flex gap-4 px-6 py-5">
                  <div className="w-20 h-20 shrink-0 border border-hpl-line overflow-hidden bg-hpl-50">
                    <ProductImage
                      src={item.product.imageUrl || ''}
                      imageUrls={item.product.imageUrlCandidates}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-hpl-500 mb-0.5">{item.product.code}</p>
                    <p className="text-[12px] font-medium text-hpl-ink leading-[1.4] line-clamp-2 mb-2">{item.product.name}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <QuantityInput
                        value={item.quantity}
                        onChange={(v) => updateQuantity(item.product.code, v)}
                      />
                      <div className="text-right">
                        <p className="text-[13px] font-semibold text-hpl-ink">
                          {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.code)}
                          className="text-[10px] tracking-[0.12em] uppercase text-hpl-400 hover:text-red-600 transition-colors mt-1"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-hpl-line px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[12px] tracking-[0.12em] uppercase text-hpl-600">Subtotal</span>
              <span className="text-[15px] font-semibold text-hpl-ink">{formatIDR(subtotal())}</span>
            </div>
            <p className="text-[11px] text-hpl-500 bg-hpl-50 border border-hpl-line px-4 py-3">
              🚚 Gratis ongkir ke Jawa & Bali
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="btn-ghost text-[10px] py-3 justify-center"
              >
                Lihat Keranjang
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="btn-ink text-[10px] py-3 justify-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
