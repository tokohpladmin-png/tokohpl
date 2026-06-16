'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SLIDES = [
  { src: '/images/hero-1.jpg', alt: 'Material Library — HPL display panels' },
  { src: '/images/hero-2.jpg', alt: 'HPL showroom — material consultation space' },
];

const INTERVAL = 3000; // 3 seconds

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      advance();
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current]);

  function advance(to?: number) {
    const next = to !== undefined ? to : (current + 1) % SLIDES.length;
    if (next === current || animating) return;
    setPrev(current);
    setCurrent(next);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }

  return (
    <section className="relative overflow-hidden bg-hpl-ink" style={{ height: 'min(100vh, 720px)' }}>

      {/* Slides */}
      {SLIDES.map((slide, i) => {
        const isCurrent = i === current;
        const isPrev    = i === prev;
        return (
          <div key={slide.src}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: isCurrent ? 1 : 0, zIndex: isCurrent ? 2 : isPrev ? 1 : 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: isCurrent ? 'scale(1.04)' : 'scale(1.0)',
                transition: 'transform 6s ease',
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)'
            }}/>
          </div>
        );
      })}

      {/* Content — always on top */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center">
        <div className="shell">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="w-7 h-[1.5px] bg-hpl-accent"/>
              <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-hpl-accent">
                Authorized Dealer EDL &amp; Lamitak
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(36px,5.5vw,68px)] font-light tracking-[-0.04em] leading-[1.0] text-white mb-6 animate-fade-up delay-100">
              Kini, Anda Bisa<br />
              Mendapatkan <span className="font-bold">HPL<br />
              Berkualitas</span> Dengan<br />
              Mudah dan Nyaman.
            </h1>

            {/* Sub */}
            <p className="text-[14px] leading-7 text-white/60 max-w-md mb-8 animate-fade-up delay-200">
              Ribuan pilihan HPL berkualitas siap dikirim ke lokasi Anda cukup dengan beberapa ketukan jari.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <Link href="/products" className="btn-accent">
                Lihat Produk
              </Link>
              <a href="https://wa.me/628161345224" target="_blank" rel="noreferrer"
                className="btn-ghost-white">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} type="button" aria-label={`Slide ${i + 1}`}
            onClick={() => advance(i)}
            className="transition-all duration-300"
            style={{
              width:  i === current ? '28px' : '8px',
              height: '3px',
              background: i === current ? '#CC4E2A' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/10">
        <div key={current} className="h-full bg-hpl-accent origin-left"
          style={{ animation: `progress ${INTERVAL}ms linear` }}/>
      </div>

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
