import { getTranslations } from 'next-intl/server';
import { SHIPPING_ZONES } from '@/lib/shipping';
import { formatIDR } from '@/lib/utils';

export async function generateMetadata() {
  const t = await getTranslations('ShippingPage');
  return { title: t('metaTitle') };
}

export default async function ShippingPage() {
  const t = await getTranslations('ShippingPage');
  const tZones = await getTranslations('ShippingZones');
  const notes = t.raw('notes') as string[];
  const jawaBali = SHIPPING_ZONES['jawa-bali'];
  const luarJawa = SHIPPING_ZONES['luar-jawa'];

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-12">
          <p className="label mb-3">{t('eyebrow')}</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">{t('heading')}</h1>
        </div>
      </div>

      <div className="shell py-14 sm:py-20 max-w-3xl">
        <div className="space-y-0 border border-hpl-line divide-y divide-hpl-line">

          {/* Jawa & Bali */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">{tZones(`labels.${jawaBali.labelKey}`)}</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">{t('provincesJawaBali')}</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('shippingCostLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{t('shippingCostValue', { amount: formatIDR(jawaBali.freeThreshold) ?? '' })}</p>
                <p className="text-[11px] text-hpl-500 mt-1">{t('shippingCostNote')}</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('belowThresholdLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{formatIDR(jawaBali.flatRate)}</p>
                <p className="text-[11px] text-hpl-500 mt-1">{t('belowThresholdNote')}</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('estimateLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{tZones(`estimasi.${jawaBali.estimasiKey}`)}</p>
              </div>
            </div>
          </div>

          {/* Luar Jawa */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="label mb-2">{tZones(`labels.${luarJawa.labelKey}`)}</p>
                <h2 className="text-[18px] font-semibold text-hpl-ink">{t('provincesLuarJawa')}</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-hpl-line border border-hpl-line">
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('shippingCostLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{t('shippingCostValue', { amount: formatIDR(luarJawa.freeThreshold) ?? '' })}</p>
                <p className="text-[11px] text-hpl-500 mt-1">{t('shippingCostNote')}</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('belowThresholdLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{formatIDR(luarJawa.flatRate)}</p>
                <p className="text-[11px] text-hpl-500 mt-1">{t('belowThresholdNote')}</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-2">{t('estimateLabel')}</p>
                <p className="text-[15px] font-bold text-hpl-ink">{tZones(`estimasi.${luarJawa.estimasiKey}`)}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-8 bg-hpl-50">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-500 mb-4">{t('importantNotesLabel')}</p>
            <ul className="space-y-2">
              {notes.map((note) => (
                <li key={note} className="flex items-start gap-2 text-[12px] text-hpl-600">
                  <span className="text-hpl-gold mt-0.5 shrink-0">→</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
