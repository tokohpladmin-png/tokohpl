import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('PanduanBelanja');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

type Step = { num: string; title: string; desc: string; tips: string[] };
type Faq = { q: string; a: string };

export default async function PanduanBelanjaPage() {
  const t = await getTranslations('PanduanBelanja');
  const steps = t.raw('steps') as Step[];
  const paymentTerms = t.raw('paymentTerms') as string[];
  const faqs = t.raw('faqs') as Faq[];

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">{t('eyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">
            {t('heading')}
          </h1>
          <p className="text-[14px] text-hpl-500 mt-3 max-w-xl">
            {t('subheading')}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="shell py-14 sm:py-20">
        <p className="label mb-8">{t('stepsLabel')}</p>
        <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">
          {steps.map((step) => (
            <div key={step.num} className="grid sm:grid-cols-[80px_1fr] gap-0">
              <div className="bg-hpl-ink flex items-center justify-center py-6 sm:py-0">
                <span className="text-[22px] font-bold tracking-[-0.03em] text-white">{step.num}</span>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-[15px] font-semibold text-hpl-ink mb-2">{step.title}</h2>
                <p className="text-[13px] leading-7 text-hpl-600 mb-4">{step.desc}</p>
                {step.tips.length > 0 && (
                  <ul className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-[12px] text-hpl-500">
                        <span className="text-hpl-accent mt-0.5 shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment info */}
      <div className="border-t border-hpl-line bg-hpl-50">
        <div className="shell py-14 sm:py-20">
          <p className="label mb-6">{t('paymentInfoLabel')}</p>
          <div className="grid sm:grid-cols-2 gap-px bg-hpl-line border border-hpl-line">
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-8 bg-[#003087] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-black tracking-wider">BCA</span>
                </div>
                <p className="text-[13px] font-semibold text-hpl-ink">{t('bankName')}</p>
              </div>
              <div className="space-y-3 text-[13px] text-hpl-600">
                <div className="flex justify-between">
                  <span>{t('accountNumberLabel')}</span>
                  <span className="font-bold text-hpl-ink tracking-wider">7610516224</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('accountHolderLabel')}</span>
                  <span className="font-medium text-hpl-ink">CV. VARINDO FORMA HUTAMA</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('branchLabel')}</span>
                  <span className="text-hpl-ink">Supermal Karawaci, Tangerang</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-hpl-500 mb-4">{t('paymentTermsLabel')}</p>
              <ul className="space-y-3">
                {paymentTerms.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12px] text-hpl-600">
                    <div className="w-1 h-1 rounded-full bg-hpl-accent mt-2 shrink-0"/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-hpl-line">
        <div className="shell py-14 sm:py-20 max-w-3xl">
          <p className="label mb-8">{t('faqLabel')}</p>
          <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-hpl-50 transition-colors">
                  <span className="text-[13px] font-medium text-hpl-ink">{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180">
                    <path d="M2 5l5 5 5-5" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[13px] leading-7 text-hpl-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-hpl-line bg-hpl-ink">
        <div className="shell py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-hpl-600 mb-2">{t('ctaQuestion')}</p>
            <p className="text-[18px] font-light tracking-[-0.02em] text-white">{t('ctaBody')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-accent">{t('ctaShop')}</Link>
            <a href="https://wa.me/628161345224" target="_blank" rel="noreferrer"
              className="btn-ghost-white">
              {t('ctaWhatsapp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
