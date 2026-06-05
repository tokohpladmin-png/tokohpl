'use client';
import { useState } from 'react';

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export function QuantityInput({ value, onChange, min = 1, max = 9999 }: Props) {
  const [raw, setRaw] = useState(String(value));
  const [error, setError] = useState('');

  const commit = (str: string) => {
    const n = parseInt(str, 10);
    if (!str || isNaN(n)) { setError('Masukkan angka yang valid'); setRaw(String(value)); return; }
    if (n < min) { setError(`Minimum ${min}`); setRaw(String(value)); return; }
    if (n > max) { setError(`Maksimum ${max}`); setRaw(String(max)); onChange(max); return; }
    setError('');
    setRaw(String(n));
    onChange(n);
  };

  const decrement = () => {
    const next = Math.max(min, value - 1);
    setRaw(String(next));
    setError('');
    onChange(next);
  };

  const increment = () => {
    const next = Math.min(max, value + 1);
    setRaw(String(next));
    setError('');
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center border border-hpl-line">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 flex items-center justify-center text-hpl-ink hover:bg-hpl-50 disabled:opacity-30 transition-colors"
          aria-label="Kurangi"
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor"><rect width="10" height="2" rx="1"/></svg>
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={raw}
          min={min}
          max={max}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(raw); }}
          className="w-14 h-10 text-center text-sm font-medium text-hpl-ink border-x border-hpl-line outline-none focus:border-hpl-ink"
        />
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 flex items-center justify-center text-hpl-ink hover:bg-hpl-50 disabled:opacity-30 transition-colors"
          aria-label="Tambah"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <rect x="4" width="2" height="10" rx="1"/><rect y="4" width="10" height="2" rx="1"/>
          </svg>
        </button>
      </div>
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
