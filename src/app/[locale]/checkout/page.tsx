import { getTranslations } from 'next-intl/server';
import { CheckoutClient } from './CheckoutClient';

export async function generateMetadata() {
  const t = await getTranslations('Checkout');
  return { title: t('pageHeading') };
}

export default function CheckoutPage() { return <CheckoutClient/>; }
