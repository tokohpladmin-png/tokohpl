import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('About');
  return { title: t('metaTitle') };
}

export default async function AboutPage() {
  const t = await getTranslations('About');
  const features = t.raw('features') as { title: string; body: string }[];

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">{t('eyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">{t('heading')}</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <p className="text-[15px] leading-8 text-hpl-600 mb-8">
          {t.rich('intro', {
            em: (chunks) => <em>{chunks}</em>,
            strong: (chunks) => <strong className="text-hpl-ink">{chunks}</strong>,
          })}
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line mb-12">
          {features.map((item) => (
            <div key={item.title} className="bg-white p-6">
              <div className="w-6 h-[1.5px] bg-hpl-accent mb-4"/>
              <h3 className="text-[13px] font-semibold text-hpl-ink mb-2">{item.title}</h3>
              <p className="text-[12px] leading-6 text-hpl-500">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="display text-hpl-ink text-3xl mb-4">{t('materialHeading')}</h2>
        <p className="text-[14px] leading-7 text-hpl-600 mb-4">
          {t.rich('materialP1', { em: (chunks) => <em>{chunks}</em> })}
        </p>
        <p className="text-[14px] leading-7 text-hpl-600 mb-8">
          {t.rich('materialP2', { em: (chunks) => <em>{chunks}</em> })}
        </p>

        <h2 className="display text-hpl-ink text-3xl mb-4">{t('servicesHeading')}</h2>
        <p className="text-[14px] leading-7 text-hpl-600 mb-4">
          {t('servicesP1')}
        </p>
        <p className="text-[14px] leading-7 text-hpl-600">
          {t('servicesP2')}
        </p>
      </div>
    </div>
  );
}
