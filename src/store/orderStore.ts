import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/product';

export type PendingOrder = {
  id: string;
  timestamp: string;
  deadlineIso: string;  // 24h from timestamp
  customer: {
    fullName: string;
    phone: string;
    email: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
    notes: string;
  };
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  shippingFee: number;
  orderTotal: number;
  couponCode: string | null;
};

type OrderState = {
  pending: PendingOrder | null;
  confirmed: PendingOrder[];
  setPending: (order: PendingOrder) => void;
  confirmPending: () => void;
  clearPending: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      pending: null,
      confirmed: [],
      setPending: (order) => set({ pending: order }),
      confirmPending: () => {
        const { pending, confirmed } = get();
        if (!pending) return;
        set({ confirmed: [pending, ...confirmed], pending: null });
      },
      clearPending: () => set({ pending: null }),
    }),
    { name: 'tokohpl-orders-v1' }
  )
);

export function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `TPL-${date}-${rand}`;
}

export function getDeadlineIso(): string {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
}
