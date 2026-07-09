'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cartStore';

const TIER_COLORS: Record<string, string> = {
  TPLBRONZE:   '#cd7f32',
  TPLSILVER:   '#a0a0a0',
  TPLGOLD:     '#d4a017',
  TPLPLATINUM: '#6a6a8a',
};

const TIER_NAMES: Record<string, string> = {
  TPLBRONZE:   'Bronze Member',
  TPLSILVER:   'Silver Member',
  TPLGOLD:     'Gold Member',
  TPLPLATINUM: 'Platinum Member',
};

export function CouponInput() {
  const t = useTranslations('Cart');
  const tDiscount = useTranslations('Discount');
  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [input, setInput]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    if (!input.trim()) { setError(t('couponEnterCode')); return; }
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = applyCoupon(input.trim());
      if (!result.valid) setError(tDiscount(`errors.${result.errorCode}`));
      else setInput('');
      setLoading(false);
    }, 300);
  };

  if (appliedCoupon) {
    const upperCode = appliedCoupon.code.toUpperCase();
    const tierColor = TIER_COLORS[upperCode];
    const tierName = TIER_NAMES[upperCode];
    return (
      <div className="border border-hpl-line bg-hpl-50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {tierName ? (
            <span className="text-[9px] font-black tracking-[0.12em] uppercase px-2 py-1 text-white"
              style={{ background: tierColor }}>
              {tierName}
            </span>
          ) : (
            <span className="bg-hpl-ink text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5">
              {t('couponLabel')}
            </span>
          )}
          <div>
            <p className="text-[12px] font-semibold text-hpl-ink">{appliedCoupon.code}</p>
            <p className="text-[10px] text-hpl-500">{tDiscount(`coupons.${appliedCoupon.descriptionKey}`)}</p>
          </div>
        </div>
        <button type="button" onClick={() => removeCoupon()}
          className="text-[10px] font-semibold tracking-[0.14em] uppercase text-hpl-400 hover:text-red-600 transition-colors shrink-0">
          {t('removeCoupon')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-0">
        <input value={input}
          onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          placeholder={t('couponPlaceholder')}
          className="field flex-1 text-[13px] tracking-[0.06em] uppercase"
          style={{ borderRight: 'none' }}/>
        <button type="button" onClick={handleApply} disabled={loading}
          className="btn-ink text-[10px] px-5 shrink-0 disabled:opacity-60">
          {loading ? '...' : t('apply')}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
