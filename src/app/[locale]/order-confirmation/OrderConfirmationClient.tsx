'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useOrderStore, type PendingOrder } from '@/store/orderStore';
import { useCartStore } from '@/store/cartStore';
import { formatIDR } from '@/lib/utils';

export function OrderConfirmationClient() {
  const t = useTranslations('OrderConfirmation');
  const tCommon = useTranslations('Common');
  const router = useRouter();
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read directly from store after hydration
    const pending = useOrderStore.getState().pending;
    if (!pending) {
      router.replace('/checkout');
    } else {
      setOrder(pending);
    }
  }, [router]);

  const handleConfirm = () => {
    if (!order) return;
    useOrderStore.getState().confirmPending();
    fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).catch((err) => console.error('Email send failed:', err));
    router.push(`/order-success/${order.id}`);
    setTimeout(() => useCartStore.getState().clearCart(), 300);
  };

  const handleEdit = () => {
    useOrderStore.getState().clearPending();
    router.push('/checkout');
  };

  if (!mounted || !order) return (
    <div className="shell py-20 text-center">
      <p className="text-hpl-500 text-[13px]">{t('loading')}</p>
    </div>
  );

  const { customer, items, subtotal, discountAmount, shippingFee, orderTotal, couponCode } = order;

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">{t('stepLabel')}</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-hpl-ink">{t('heading')}</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="border-b border-hpl-line">
        <div className="shell">
          <div className="flex">
            <div className="py-3 pr-8 flex items-center gap-2 border-b-2 border-transparent">
              <span className="w-5 h-5 bg-hpl-200 text-hpl-500 text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-hpl-400">{t('step1Label')}</span>
            </div>
            <div className="py-3 px-8 flex items-center gap-2 border-b-2 border-hpl-ink">
              <span className="w-5 h-5 bg-hpl-ink text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-hpl-ink">{t('step2Label')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">

          {/* Left */}
          <div className="space-y-6">

            {/* Customer info */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('customerInfo')}</p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">{t('edit')}</button>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  { label: t('fullName'), value: customer.fullName },
                  { label: t('whatsapp'), value: customer.phone },
                  { label: t('email'), value: customer.email },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="label mb-1">{r.label}</p>
                    <p className="text-[13px] font-medium text-hpl-ink">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('shippingAddress')}</p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">{t('edit')}</button>
              </div>
              <div className="p-6 space-y-1">
                <p className="text-[13px] font-medium text-hpl-ink">{customer.fullName}</p>
                <p className="text-[13px] text-hpl-600">{customer.address}</p>
                <p className="text-[13px] text-hpl-600">
                  {customer.city}, {customer.province} {customer.postalCode}
                </p>
                {customer.notes && (
                  <p className="text-[12px] text-hpl-500 mt-2 italic">{t('notes', { notes: customer.notes })}</p>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">
                  {t('productList', { count: items.length })}
                </p>
                <button onClick={handleEdit} className="text-[11px] text-hpl-accent hover:underline">{t('edit')}</button>
              </div>
              <ul className="divide-y divide-hpl-line">
                {items.map((item) => (
                  <li key={item.product.code} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-500">{item.product.brand} · {item.product.code}</p>
                      <p className="text-[13px] font-medium text-hpl-ink">{item.product.name}</p>
                      <p className="text-[11px] text-hpl-500 mt-0.5">
                        {t('perSheetPrice', { price: formatIDR(item.product.price) ?? tCommon('priceTBD'), qty: item.quantity })}
                      </p>
                    </div>
                    <span className="text-[14px] font-semibold text-hpl-ink shrink-0">
                      {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null) ?? tCommon('priceTBD')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment method */}
            <div className="border border-hpl-line bg-hpl-50 p-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700 mb-4">{t('paymentMethod')}</p>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#003087] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black tracking-widest">BCA</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-hpl-ink">{t('bankTransfer')}</p>
                  <p className="text-[12px] text-hpl-500 mt-0.5">
                    {t('paymentInstructionsNote')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right — totals */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">{t('totalPayment')}</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">{t('subtotal')}</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(subtotal) ?? tCommon('priceTBD')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-hpl-accent font-semibold">
                      {t('discount', { coupon: couponCode ? `(${couponCode})` : '' })}
                    </span>
                    <span className="font-semibold text-hpl-accent">− {formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">{t('shippingCost')}</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(shippingFee) ?? tCommon('priceTBD')}</span>
                </div>
                <div className="border-t border-hpl-line pt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[13px] font-bold text-hpl-ink">{t('total')}</span>
                    <span className="text-[22px] font-bold text-hpl-ink leading-none">{formatIDR(orderTotal) ?? tCommon('priceTBD')}</span>
                  </div>
                  <p className="text-[10px] text-hpl-500 text-right">{t('vatIncluded')}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 px-4 py-3">
                  <p className="text-[11px] text-amber-800 leading-5">
                    <strong>{t('importantLabel')}</strong>{' '}
                    {t.rich('importantNotice', { strong: (chunks) => <strong>{chunks}</strong> })}
                  </p>
                </div>
                <button type="button" onClick={handleConfirm}
                  className="btn-ink w-full justify-center py-4 text-[12px]">
                  {t('confirmOrder')}
                </button>
                <button type="button" onClick={handleEdit}
                  className="btn-ghost w-full justify-center py-3 text-[11px]">
                  {t('editOrder')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
