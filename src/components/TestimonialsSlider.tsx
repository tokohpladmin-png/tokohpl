'use client';
import { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    name: 'Budi Santoso',
    role: 'Interior Designer',
    city: 'Jakarta',
    text: 'Proses pemesanan sangat mudah dan cepat. Produk HPL yang saya terima sesuai dengan spesifikasi yang tertera. Sangat membantu untuk proyek interior klien saya.',
    rating: 5,
  },
  {
    name: 'Rina Kusuma',
    role: 'Kontraktor',
    city: 'Surabaya',
    text: 'Sudah beberapa kali memesan dari TokoHPL. Harga transparan, tidak ada biaya tersembunyi. Pengiriman ke Surabaya tepat waktu. Pasti akan pesan lagi.',
    rating: 5,
  },
  {
    name: 'Hendri Wijaya',
    role: 'Furniture Maker',
    city: 'Bandung',
    text: 'Koleksi EDL dan Lamitak lengkap sekali. Saya sering cari motif tertentu dan selalu ada. Diskon volume juga sangat membantu untuk order dalam jumlah besar.',
    rating: 5,
  },
  {
    name: 'Sari Dewi',
    role: 'Arsitek',
    city: 'Bali',
    text: 'Pertama kali mencoba order online HPL dan pengalaman yang menyenangkan. Tim sangat responsif via WhatsApp. Produk berkualitas dan terjamin keasliannya.',
    rating: 5,
  },
  {
    name: 'Agus Pramono',
    role: 'Project Buyer',
    city: 'Semarang',
    text: 'Pembelian untuk proyek hotel. Order dalam jumlah besar, proses lancar, dan mendapat diskon volume yang cukup signifikan. Terima kasih TokoHPL!',
    rating: 5,
  },
];

const INTERVAL = 4000;

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const t = TESTIMONIALS[current];

  return (
    <section className="border-b border-hpl-line">
      <div className="shell py-14 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label mb-3">Testimoni Pelanggan</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-light tracking-[-0.03em]">
              Dipercaya Para Profesional
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="hidden sm:flex gap-2">
            <button type="button" onClick={() => go(current - 1)}
              className="w-10 h-10 border border-hpl-line flex items-center justify-center hover:bg-hpl-ink hover:text-white hover:border-hpl-ink transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button type="button" onClick={() => go(current + 1)}
              className="w-10 h-10 border border-hpl-line flex items-center justify-center hover:bg-hpl-ink hover:text-white hover:border-hpl-ink transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>

          {/* Active card */}
          <div key={current} className="animate-fade-in">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-px bg-hpl-line border border-hpl-line">

              {/* Left — avatar */}
              <div className="bg-hpl-50 flex flex-col items-center justify-center py-10 px-8 text-center">
                <div className="w-16 h-16 bg-hpl-ink text-white flex items-center justify-center text-[22px] font-bold mb-4">
                  {t.name.charAt(0)}
                </div>
                <p className="text-[14px] font-semibold text-hpl-ink mb-1">{t.name}</p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-hpl-500 mb-0.5">{t.role}</p>
                <p className="text-[11px] text-hpl-400">{t.city}</p>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#CC4E2A">
                      <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5l3.5-.5z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Right — quote */}
              <div className="bg-white p-8 sm:p-10 flex flex-col justify-center">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-hpl-200 mb-5">
                  <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0zm20 0V14.4C20 6.4 24.8 1.6 34.4 0L36 2.4C30.4 3.6 27.6 6.4 27.2 10.4H32V24H20z" fill="currentColor"/>
                </svg>
                <p className="text-[15px] sm:text-[16px] leading-8 text-hpl-700 mb-6 italic">
                  "{t.text}"
                </p>
                <div className="w-8 h-0.5 bg-hpl-accent"/>
              </div>

            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} type="button" onClick={() => go(i)}
                className="transition-all duration-300"
                style={{
                  width:  i === current ? '24px' : '6px',
                  height: '3px',
                  background: i === current ? '#CC4E2A' : '#E5E5E5',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
