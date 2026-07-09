import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('NotFound');
  return { title: t('title') };
}

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="shell py-32 text-center max-w-lg mx-auto">
      <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-hpl-400 mb-4">{t('eyebrow')}</p>
      <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink mb-4">
        {t('heading')}
      </h1>
      <p className="text-[14px] leading-7 text-hpl-500 mb-8">
        {t('body')}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-ink">{t('backHome')}</Link>
        <Link href="/products" className="btn-ghost">{t('viewProducts')}</Link>
      </div>
    </div>
  );
}
