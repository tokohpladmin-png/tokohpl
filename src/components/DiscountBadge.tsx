'use client';
import { useCartStore } from '@/store/cartStore';
import { getVolumeTier, getNextVolumeTier, VOLUME_TIERS } from '@/lib/discount';
import { formatIDR } from '@/lib/utils';

export function DiscountBadge() {
  const totalQty   = useCartStore((s) => s.totalQty());
  const totalDisc  = useCartStore((s) => s.totalDiscount());
  const coupon     = useCartStore((s) => s.appliedCoupon);
  const tier       = getVolumeTier(totalQty);
  const next       = getNextVolumeTier(totalQty);

  if (totalQty === 0) return null;

  const hasDiscount = totalDisc > 0;

  return (
    <div className={`border px-4 py-3 ${hasDiscount ? 'border-hpl-gold bg-amber-50' : 'border-hpl-line bg-hpl-50'}`}>
      {hasDiscount ? (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {tier.rate > 0 && (
              <span className="bg-hpl-gold text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5">
                VOL {Math.round(tier.rate * 100)}%
              </span>
            )}
            {coupon && (
              <span className="bg-hpl-ink text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5">
                {coupon.code}
              </span>
            )}
            <span className="text-[12px] text-hpl-600">
              Hemat {formatIDR(totalDisc)}
            </span>
          </div>
          {!coupon && next && (
            <span className="text-[11px] text-hpl-500">
              +{next.minQty - totalQty} lembar → {Math.round(next.rate * 100)}% off
            </span>
          )}
        </div>
      ) : (
        !coupon && next && (
          <p className="text-[11px] text-hpl-500 m-0">
            💡 Beli <strong className="text-hpl-gold">{next.minQty - totalQty} lembar lagi</strong> untuk diskon {Math.round(next.rate * 100)}%
          </p>
        )
      )}
    </div>
  );
}

export function DiscountTierTable() {
  const totalQty   = useCartStore((s) => s.totalQty());
  const currentTier = getVolumeTier(totalQty);

  return (
    <div className="border border-hpl-line">
      <div className="border-b border-hpl-line px-4 py-3 bg-hpl-50">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-hpl-ink">
          Diskon Volume
        </p>
      </div>
      {VOLUME_TIERS.map((tier) => {
        const isActive = tier.rate === currentTier.rate && totalQty > 0;
        return (
          <div key={tier.minQty}
            className={`flex items-center justify-between px-4 py-2.5 border-b border-hpl-line/60 last:border-0 ${isActive ? 'bg-amber-50' : ''}`}
            style={{ borderLeft: isActive ? '3px solid #a8763e' : '3px solid transparent' }}>
            <span className={`text-[12px] ${isActive ? 'font-semibold text-hpl-ink' : 'text-hpl-500'}`}>
              {tier.maxQty === null
                ? `≥ ${tier.minQty} lembar`
                : tier.minQty === 0
                  ? `1–${tier.maxQty} lembar`
                  : `${tier.minQty}–${tier.maxQty} lembar`}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[12px] font-bold ${tier.rate === 0 ? 'text-hpl-400' : 'text-hpl-gold'}`}>
                {tier.rate === 0 ? 'Tidak ada diskon' : `${Math.round(tier.rate * 100)}% off`}
              </span>
              {isActive && (
                <span className="text-[8px] font-bold tracking-[0.16em] uppercase bg-hpl-gold text-white px-2 py-0.5">
                  Aktif
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
