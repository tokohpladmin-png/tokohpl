'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export function CouponInput() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    if (!input.trim()) { setError('Masukkan kode kupon'); return; }
    setLoading(true);
    setError('');
    // Small timeout for UX feel
    setTimeout(() => {
      const result = applyCoupon(input.trim());
      if (!result.valid) setError(result.error);
      else setInput('');
      setLoading(false);
    }, 300);
  };

  if (appliedCoupon) {
    return (
      <div className="border border-hpl-gold bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-hpl-gold text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5">
              KUPON
            </span>
            <span className="text-[13px] font-semibold text-hpl-ink">{appliedCoupon.code}</span>
          </div>
          <p className="text-[11px] text-hpl-600 mt-1">{appliedCoupon.description}</p>
        </div>
        <button
          type="button"
          onClick={() => removeCoupon()}
          className="text-[10px] font-semibold tracking-[0.14em] uppercase text-hpl-400 hover:text-red-600 transition-colors shrink-0"
        >
          Hapus
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-0">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          placeholder="Kode kupon"
          className="field flex-1 text-[13px] tracking-[0.06em] uppercase"
          style={{ borderRight: 'none' }}
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={loading}
          className="btn-ink text-[10px] px-5 shrink-0 disabled:opacity-60"
        >
          {loading ? '...' : 'Pakai'}
        </button>
      </div>
      {error && (
        <p className="text-[11px] text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}
