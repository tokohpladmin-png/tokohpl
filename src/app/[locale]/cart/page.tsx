import { getTranslations } from 'next-intl/server';
import { CartPageClient } from './CartPageClient';

export async function generateMetadata() {
  const t = await getTranslations('Cart');
  return { title: t('heading') };
}

export default function CartPage() { return <CartPageClient/>; }
