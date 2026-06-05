import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types/product';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (code: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1) => {
        const qty = Math.min(Math.max(1, Math.floor(quantity)), 9999);
        set((state) => {
          const existing = state.items.find((i) => i.product.code === product.code);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.code === product.code
                  ? { ...i, quantity: Math.min(i.quantity + qty, 9999) }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return { items: [...state.items, { product, quantity: qty }], isDrawerOpen: true };
        });
      },

      removeItem: (code) =>
        set((state) => ({ items: state.items.filter((i) => i.product.code !== code) })),

      updateQuantity: (code, quantity) => {
        const qty = Math.min(Math.max(1, Math.floor(quantity)), 9999);
        set((state) => ({
          items: state.items.map((i) =>
            i.product.code === code ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (typeof i.product.price === 'number' ? i.product.price * i.quantity : 0),
          0
        ),
    }),
    { name: 'tokohpl-cart' }
  )
);
