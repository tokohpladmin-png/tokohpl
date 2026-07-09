import { getTranslations } from 'next-intl/server';
import { OrderSuccessClient } from './OrderSuccessClient';

export async function generateMetadata() {
  const t = await getTranslations('OrderSuccess');
  return { title: `${t('confirmedLabel')} — TokoHPL` };
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderSuccessClient orderId={id} />;
}
