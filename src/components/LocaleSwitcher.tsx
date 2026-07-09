'use client';
import { Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

function LocaleLinks({ href, className }: { href: string; className: string }) {
  const locale = useLocale();
  const t = useTranslations('Nav');

  return (
    <div className={`flex items-center gap-1 text-[11px] font-semibold tracking-[0.1em] ${className}`} aria-label={t('language')}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-hpl-300">/</span>}
          <Link
            href={href}
            locale={l}
            className={l === locale ? 'text-hpl-ink uppercase' : 'text-hpl-400 uppercase hover:text-hpl-ink transition-colors'}
            aria-current={l === locale ? 'true' : undefined}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}

function LocaleSwitcherWithQuery({ className }: { className: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `${pathname}?${query}` : pathname;
  return <LocaleLinks href={href} className={className} />;
}

function LocaleSwitcherFallback({ className }: { className: string }) {
  const pathname = usePathname();
  return <LocaleLinks href={pathname} className={className} />;
}

export function LocaleSwitcher({ className = '' }: { className?: string }) {
  return (
    <Suspense fallback={<LocaleSwitcherFallback className={className} />}>
      <LocaleSwitcherWithQuery className={className} />
    </Suspense>
  );
}
