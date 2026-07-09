import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('PrivacyPolicy');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

function ListSection({ intro, items, outro }: { intro: string; items: string[]; outro?: React.ReactNode }) {
  return (
    <div className="space-y-3 text-[13px] leading-7 text-hpl-600">
      <p>{intro}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2.5 shrink-0"/>
            {item}
          </li>
        ))}
      </ul>
      {outro && <p>{outro}</p>}
    </div>
  );
}

export default async function KebijakanPrivasiPage() {
  const t = await getTranslations('PrivacyPolicy');
  const strong = (chunks: React.ReactNode) => <strong className="text-hpl-ink">{chunks}</strong>;
  const emailLink = (chunks: React.ReactNode) => (
    <a href="mailto:tokohpl.admin@gmail.com" className="text-hpl-accent hover:underline">{chunks}</a>
  );

  const collectItems = t.raw('sections.collect.items') as string[];
  const useItems = t.raw('sections.use.items') as string[];
  const sharingItems = t.raw('sections.sharing.items') as string[];
  const rightsItems = t.raw('sections.rights.items') as string[];

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">{t('eyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">
            {t('heading')}
          </h1>
          <p className="text-[12px] text-hpl-500 mt-3">{t('effectiveDate')}</p>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <div className="prose-custom space-y-10">

          <section>
            <p className="text-[14px] leading-7 text-hpl-600">
              {t.rich('intro', { strong })}
            </p>
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.collect.title')}</h2>
            <ListSection intro={t('sections.collect.intro')} items={collectItems} outro={t('sections.collect.outro')} />
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.use.title')}</h2>
            <ListSection intro={t('sections.use.intro')} items={useItems} outro={t.rich('sections.use.outro', { strong })} />
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.storage.title')}</h2>
            <p className="text-[13px] leading-7 text-hpl-600">{t('sections.storage.body')}</p>
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.sharing.title')}</h2>
            <ListSection intro={t('sections.sharing.intro')} items={sharingItems} />
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.security.title')}</h2>
            <p className="text-[13px] leading-7 text-hpl-600">{t('sections.security.body')}</p>
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.rights.title')}</h2>
            <ListSection
              intro={t('sections.rights.intro')}
              items={rightsItems}
              outro={t.rich('sections.rights.outro', { email: emailLink })}
            />
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.cookies.title')}</h2>
            <p className="text-[13px] leading-7 text-hpl-600">{t('sections.cookies.body')}</p>
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.changes.title')}</h2>
            <p className="text-[13px] leading-7 text-hpl-600">{t('sections.changes.body')}</p>
          </section>

          <section className="border-t border-hpl-line pt-8">
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-hpl-ink mb-4">{t('sections.contact.title')}</h2>
            <div className="text-[13px] leading-7 text-hpl-600">
              <p className="mb-3">{t('sections.contact.intro')}</p>
              <div className="border border-hpl-line bg-hpl-50 p-5 space-y-1">
                <p className="font-semibold text-hpl-ink">CV. Varindo Forma Hutama</p>
                <p>Branz BSD Tower A Unit 3310, Jl. BSD Boulevard Parcel 55-F</p>
                <p>Tangerang 15339, Banten, Indonesia</p>
                <p className="mt-2">
                  {t('sections.contact.emailLabel')}: <a href="mailto:tokohpl.admin@gmail.com" className="text-hpl-accent hover:underline">tokohpl.admin@gmail.com</a>
                </p>
                <p>
                  {t('sections.contact.whatsappLabel')}: <a href="https://wa.me/62811945224" className="text-hpl-accent hover:underline">0811 945 224</a>
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
