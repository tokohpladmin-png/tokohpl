import { getTranslations } from 'next-intl/server';
import { OrderConfirmationClient } from './OrderConfirmationClient';

export async function generateMetadata() {
  const t = await getTranslations('OrderConfirmation');
  return { title: `${t('heading')} — TokoHPL` };
}

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}
