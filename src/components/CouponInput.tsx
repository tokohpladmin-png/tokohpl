'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  TPLBRONZE:   { label: 'Bronze Member',   color: '#cd7f32' },
  TPLSILVER:   { label: 'Silver Member',   color: '#a0a0a0' },
  TPLGOLD:     { label: 'Gold Member',     color: '#d4a017' },
  TPLPLATINUM: { label: 'Platinum Member', color: '#6a6a8a' },
};

function getTierMeta(code: string) {
  return TIER_LABELS[code.toUpperCase()] ?? null;
}

export function CouponInput() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [input, setInput]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    if (!input.trim()) { setError('masukkan kode kupon terlebih dahulu'); return; }
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = applyCoupon(input.trim());
      if (!result.valid) setError(result.error);
      else setInput('');
      setLoading(false);
    }, 300);
  };

  if (appliedCoupon) {
    const tier = getTierMeta(appliedCoupon.code);
    return (
      <div className="border border-hpl-line bg-hpl-50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {tier ? (
            <span className="text-[9px] font-black tracking-[0.12em] uppercase px-2 py-1 text-white"
              style={{ background: tier.color }}>
              {tier.label}
            </span>
          ) : (
            <span className="bg-hpl-ink text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5">
              KUPON
            </span>
          )}
          <div>
            <p className="text-[12px] font-semibold text-hpl-ink">{appliedCoupon.code}</p>
            <p className="text-[10px] text-hpl-500">{appliedCoupon.description}</p>
          </div>
        </div>
        <button type="button" onClick={() => removeCoupon()}
          className="text-[10px] font-semibold tracking-[0.14em] uppercase text-hpl-400 hover:text-red-600 transition-colors shrink-0">
          Hapus
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
          placeholder="masukkan kode kupon"
          className="field flex-1 text-[13px] tracking-[0.06em] uppercase"
          style={{ borderRight: 'none' }}/>
        <button type="button" onClick={handleApply} disabled={loading}
          className="btn-ink text-[10px] px-5 shrink-0 disabled:opacity-60">
          {loading ? '...' : 'Terapkan'}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
