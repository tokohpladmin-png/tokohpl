'use client';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore, generateOrderId } from '@/store/orderStore';

import { getVolumeTier } from '@/lib/discount';
import { ALL_PROVINCES, PROVINCE_REGION, getShippingZone } from '@/lib/shipping';
import { formatIDR } from '@/lib/utils';
import { CouponInput } from '@/components/CouponInput';

type FormData = {
  fullName: string; phone: string; email: string;
  province: string; city: string; address: string;
  postalCode: string; notes: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

function Field({ label, error, children, span2 = false }: {
  label: string; error?: string; children: React.ReactNode; span2?: boolean;
}) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <label className="block">
        <span className="label text-hpl-600 mb-2 block">{label}</span>
        {children}
      </label>
      {error && <p className="text-[11px] text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}

export function CheckoutClient() {
  const t = useTranslations('Checkout');
  const tCommon = useTranslations('Common');
  const tZones = useTranslations('ShippingZones');
  const {
    items, subtotal, totalDiscount, grandTotal, shippingFee, orderTotal,
    totalQty, appliedCoupon, province, setProvince, setCity, clearCart,
  } = useCartStore();
  const { setPending } = useOrderStore();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    fullName: '', phone: '', email: '',
    province: province || '', city: '', address: '', postalCode: '', notes: '',
  });
  const [errors, setErrors]     = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState('');

  const qty   = totalQty();
  const sub   = subtotal();
  const disc  = totalDiscount();
  const total = grandTotal();
  const ship  = shippingFee();
  const order = orderTotal();
  const tier  = getVolumeTier(qty);

  const currentZone = form.province ? getShippingZone(form.province) : null;

  const handleProvinceChange = (val: string) => {
    setForm((f) => ({ ...f, province: val }));
    setProvince(val);
    setErrors((e) => ({ ...e, province: undefined }));
  };

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (key === 'province') { handleProvinceChange(e.target.value); return; }
      if (key === 'city') { setCity(e.target.value); }
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.fullName.trim())   e.fullName   = t('errors.fullNameRequired');
    if (!form.phone.trim())      e.phone      = t('errors.phoneRequired');
    if (!form.email.trim())      e.email      = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('errors.emailInvalid');
    if (!form.province)          e.province   = t('errors.provinceRequired');
    if (!form.city.trim())       e.city       = t('errors.cityRequired');
    if (!form.address.trim())    e.address    = t('errors.addressRequired');
    return e;
  };

  const handleSubmit = () => {
    if (items.length === 0) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const id = generateOrderId();
    const now = new Date();
    const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const orderData = {
      id,
      timestamp: now.toISOString(),
      deadlineIso: deadline.toISOString(),
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        province: form.province,
        city: form.city,
        address: form.address,
        postalCode: form.postalCode,
        notes: form.notes ?? '',
      },
      items,
      subtotal: sub,
      discountAmount: disc,
      grandTotal: total,
      shippingFee: ship,
      orderTotal: order,
      couponCode: appliedCoupon?.code ?? null,
    };

    setPending(orderData);
    router.push('/order-confirmation');
  };

  if (submitted) {
    return (
      <div className="shell py-20 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 bg-hpl-ink flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12l6 6L20 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="label mb-3">{t('orderReceivedLabel')}</p>
        <h1 className="display text-hpl-ink text-4xl mb-4">{t('thankYou')}</h1>
        <p className="text-[13px] text-hpl-500 mb-2">{t('orderNumber', { id: orderId })}</p>
        <p className="text-[13px] text-hpl-500 mb-8">{t('willContact', { phone: form.phone })}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href={`https://wa.me/62811945224?text=${encodeURIComponent(`Halo, saya baru memesan dengan nomor ${orderId}. Mohon konfirmasinya.`)}`}
            target="_blank" rel="noreferrer" className="btn-ink">
            {t('confirmViaWhatsapp')}
          </a>
          <Link href="/products" className="btn-ghost">{t('continueShopping')}</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="display text-hpl-ink text-4xl mb-4">{t('emptyCartTitle')}</h1>
        <Link href="/products" className="btn-ink">{t('startShopping')}</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">{t('pageEyebrow')}</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">{t('pageHeading')}</h1>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">

          {/* Form */}
          <div className="space-y-6">

            {/* Customer */}
            <fieldset className="border border-hpl-line p-0">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('customerInfo')}</p>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-5">
                <Field label={t('fullName')} error={errors.fullName}>
                  <input value={form.fullName} onChange={set('fullName')} placeholder={t('fullNamePlaceholder')} className={`field ${errors.fullName ? 'border-red-400' : ''}`}/>
                </Field>
                <Field label={t('whatsappNumber')} error={errors.phone}>
                  <input value={form.phone} onChange={set('phone')} placeholder={t('whatsappPlaceholder')} className={`field ${errors.phone ? 'border-red-400' : ''}`}/>
                </Field>
                <Field label={t('email')} error={errors.email} span2>
                  <input type="email" value={form.email} onChange={set('email')} placeholder={t('emailPlaceholder')} className={`field ${errors.email ? 'border-red-400' : ''}`}/>
                </Field>
              </div>
            </fieldset>

            {/* Shipping */}
            <fieldset className="border border-hpl-line p-0">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('shippingAddress')}</p>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-5">
                <Field label={t('province')} error={errors.province}>
                  <div className="relative">
                    <select value={form.province} onChange={set('province')}
                      className={`field-select w-full ${errors.province ? 'border-red-400' : ''}`}>
                      <option value="">{t('selectProvince')}</option>
                      <optgroup label={t('provinceGroupJawaBali')}>
                        {ALL_PROVINCES.filter(p => PROVINCE_REGION[p] === 'jawa-bali').map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </optgroup>
                      <optgroup label={t('provinceGroupLuarJawa')}>
                        {ALL_PROVINCES.filter(p => PROVINCE_REGION[p] === 'luar-jawa').map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </optgroup>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-hpl-400" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                </Field>
                <Field label={t('city')} error={errors.city}>
                  <input value={form.city} onChange={set('city')} placeholder={t('cityPlaceholder')} className={`field ${errors.city ? 'border-red-400' : ''}`}/>
                </Field>
                <Field label={t('address')} error={errors.address} span2>
                  <textarea value={form.address} onChange={set('address')} rows={3}
                    placeholder={t('addressPlaceholder')}
                    className={`field h-auto py-3 resize-none ${errors.address ? 'border-red-400' : ''}`}/>
                </Field>
                <Field label={t('postalCode')} error={errors.postalCode}>
                  <input value={form.postalCode} onChange={set('postalCode')} placeholder={t('postalCodePlaceholder')} className={`field ${errors.postalCode ? 'border-red-400' : ''}`}/>
                </Field>
                <Field label={t('shippingNotes')}>
                  <input value={form.notes} onChange={set('notes')} placeholder={t('shippingNotesPlaceholder')} className="field"/>
                </Field>
              </div>

              {/* Shipping info banner */}
              {currentZone && (
                <div className="mx-6 mb-6 border border-hpl-line bg-hpl-50 px-5 py-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-hpl-500 mb-1">
                        {t('estimatedDeliveryTo', { zone: tZones(`labels.${currentZone.labelKey}`) })}
                      </p>
                      <p className="text-[13px] font-semibold text-hpl-ink">{tZones(`estimasi.${currentZone.estimasiKey}`)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-hpl-500 mb-1">{t('shippingCost')}</p>
                      {ship === 0 ? (
                        <p className="text-[13px] font-semibold text-hpl-gold">{t('freeParty')}</p>
                      ) : (
                        <div>
                          <p className="text-[13px] font-semibold text-hpl-ink">{formatIDR(ship)}</p>
                          <p className="text-[10px] text-hpl-500">
                            {t('freeIfTotalGte', { amount: formatIDR(currentZone.freeThreshold) ?? '' })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </fieldset>

            {/* Coupon */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('couponCode')}</p>
              </div>
              <div className="p-6"><CouponInput /></div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('orderSummary')}</p>
              </div>

              <ul className="divide-y divide-hpl-line max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.product.code} className="flex items-center justify-between gap-3 px-6 py-3">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-500">{item.product.brand} · {item.product.code}</p>
                      <p className="text-[12px] font-medium text-hpl-ink truncate">{item.product.name}</p>
                      <p className="text-[11px] text-hpl-500">{t('sheetsCount', { count: item.quantity })}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-hpl-ink shrink-0">
                      {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null) ?? tCommon('priceTBD')}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-hpl-line p-6 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">{t('subtotalWithCount', { count: qty })}</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(sub) ?? tCommon('priceTBD')}</span>
                </div>

                {disc > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-hpl-gold font-semibold">
                      {t('discount')}
                      {tier.rate > 0 && <span className="ml-1 text-[9px] bg-hpl-gold text-white px-1.5 py-0.5 font-bold uppercase">VOL</span>}
                      {appliedCoupon && <span className="ml-1 text-[9px] bg-hpl-ink text-white px-1.5 py-0.5 font-bold uppercase">{appliedCoupon.code}</span>}
                    </span>
                    <span className="font-semibold text-hpl-gold">− {formatIDR(disc)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">{t('shippingCost')}</span>
                  {form.province ? (
                    <span className={ship === 0 ? 'font-semibold text-hpl-gold' : 'font-semibold text-hpl-ink'}>
                      {ship === 0 ? t('free') : formatIDR(ship)}
                    </span>
                  ) : (
                    <span className="text-hpl-400 italic text-[12px]">{t('selectProvinceHint')}</span>
                  )}
                </div>

                <div className="border-t border-hpl-line pt-3 flex justify-between">
                  <span className="text-[13px] font-semibold text-hpl-ink">{t('total')}</span>
                  <span className="text-[18px] font-semibold text-hpl-ink">
                    {formatIDR(form.province ? order : total) ?? tCommon('priceTBD')}
                  </span>
                </div>

                <button type="button" onClick={handleSubmit} className="btn-ink w-full justify-center py-4">
                  {t('confirmOrder')}
                </button>
                <p className="text-[10px] text-center text-hpl-500">
                  {t('termsNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
