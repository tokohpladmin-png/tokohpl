'use client';
import { useState } from 'react';

interface Props {
  src: string;
  imageUrls?: string[];
  alt: string;
  className?: string;
}

export function ProductImage({ src, imageUrls = [], alt, className = 'object-cover w-full h-full' }: Props) {
  const candidates = [src, ...imageUrls].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed || candidates.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-hpl-100">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-hpl-300">
          <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 28l9-8 6 6 5-5 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      className={className}
      onError={() => {
        if (idx < candidates.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
}
