import { OrderSuccessClient } from './OrderSuccessClient';
export const metadata = { title: 'Pesanan Berhasil — TokoHPL' };
export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderSuccessClient orderId={id} />;
}
