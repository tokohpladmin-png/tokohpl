import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import { formatIDR } from '@/lib/utils';
import { ProductImage } from '@/components/ProductImage';

export function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations('ProductDetail');
  const tCommon = useTranslations('Common');

  const specs = [
    [t('specs.code'), product.code],
    [t('specs.design'), product.name],
    [t('specs.brand'), product.brand],
    [t('specs.collection'), product.collection],
    [t('specs.size'), product.size],
    [t('specs.thickness'), product.thickness],
  ].filter(([, v]) => Boolean(v));

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-4 flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase">
          <Link href="/" className="text-hpl-500 hover:text-hpl-ink transition-colors">{t('breadcrumbHome')}</Link>
          <span className="text-hpl-300">·</span>
          <Link href="/products" className="text-hpl-500 hover:text-hpl-ink transition-colors">{t('breadcrumbProducts')}</Link>
          <span className="text-hpl-300">·</span>
          <span className="text-hpl-ink font-medium truncate max-w-xs">{product.code}</span>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Image */}
          <div>
            <div className="aspect-square border border-hpl-line overflow-hidden bg-hpl-50">
              <ProductImage
                src={product.imageUrl || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 border border-hpl-line/60 bg-hpl-50 px-5 py-4">
              <p className="text-[11px] leading-6 text-hpl-500">
                {t('colorDisclaimer')}
              </p>
            </div>
          </div>

          {/* Detail */}
          <div>
            <p className="label text-hpl-gold mb-3">{product.brand}</p>
            <h1 className="display text-hpl-ink text-3xl sm:text-4xl mb-2 leading-tight">
              {product.itemName || `${product.code} - ${product.brand} HPL | ${product.name}`}
            </h1>

            <div className="border-t border-b border-hpl-line py-5 mb-7">
              <span className="font-display text-3xl font-light text-hpl-ink">{formatIDR(product.price) ?? tCommon('priceTBD')}</span>
              <p className="mt-2 text-[11px] tracking-[0.14em] uppercase text-hpl-400">
                {t('priceIncludesVat')}
              </p>
            </div>

            {/* Ask via WhatsApp */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                <a
                  href={`https://wa.me/62811945224?text=${encodeURIComponent(`Halo TokoHPL, saya ingin bertanya tentang produk ${product.brand} ${product.code} — ${product.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ink w-full sm:w-auto justify-center flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.882l6.187-1.448A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.213-3.667.858.925-3.585-.234-.369A9.818 9.818 0 1112 21.818z" fill="currentColor"/>
                  </svg>
                  {t('askWhatsapp')}
                </a>
              </div>
            </div>

            {/* Shipping note */}
            <div className="mb-8 border border-hpl-line bg-hpl-50 px-5 py-4 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-hpl-gold mt-0.5 shrink-0">
                <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m-5 9a2 2 0 100 4 2 2 0 000-4zm0 0h5.5a2 2 0 002-2v-5a2 2 0 00-.586-1.414L16 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p className="text-[12px] leading-6 text-hpl-600">
                {t('shippingNote')}
              </p>
            </div>

            {/* Specs */}
            {specs.length > 0 && (
              <div className="border border-hpl-line">
                <div className="border-b border-hpl-line px-5 py-3.5 bg-hpl-50">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('specsHeading')}</p>
                </div>
                <dl>
                  {specs.map(([label, value], i) => (
                    <div key={label} className={`flex ${i > 0 ? 'border-t border-hpl-line/60' : ''}`}>
                      <dt className="w-2/5 px-5 py-3 text-[11px] tracking-[0.12em] uppercase text-hpl-500 bg-hpl-50/50">{label}</dt>
                      <dd className="flex-1 px-5 py-3 text-[12px] font-medium text-hpl-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
