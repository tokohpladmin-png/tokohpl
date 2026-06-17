import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types/product';
import {
  getVolumeTier,
  getEffectiveRate,
  validateCoupon,
  type Coupon,
  type CouponValidation,
} from '@/lib/discount';
import {
  calculateShipping,
  calculateChargeableWeight,
} from '@/lib/shipping';

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  couponCode: string;
  province: string;
  city: string;

  // Drawer — NOT persisted, always starts closed
  isDrawerOpen: boolean;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (code: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
  getItemRate: (productCode: string) => number;
  openDrawer: () => void;
  closeDrawer: () => void;
  setProvince: (province: string) => void;
  setCity: (city: string) => void;
  applyCoupon: (code: string) => CouponValidation;
  removeCoupon: () => void;

  // Computed
  totalItems: () => number;
  totalQty: () => number;
  subtotal: () => number;
  totalDiscount: () => number;
  grandTotal: () => number;
  shippingWeight: () => { baseWeightKg: number; cratingWeightKg: number; totalWeightKg: number };
  shippingFee: () => number;
  orderTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      couponCode: '',
      province: '',
      city: '',
      isDrawerOpen: false,  // always false on start — excluded from persist below

      addItem: (product, quantity = 1) => {
        const qty = Math.min(Math.max(1, Math.floor(quantity)), 9999);
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.code === product.code
          );
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
        set((state) => ({
          items: state.items.filter((i) => !(i.product.code === code)),
        })),

      updateQuantity: (code, quantity) => {
        const qty = Math.min(Math.max(1, Math.floor(quantity)), 9999);
        set((state) => ({
          items: state.items.map((i) =>
            i.product.code === code ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () =>
        set({ items: [], appliedCoupon: null, couponCode: '', province: '', city: '' }),

      openDrawer:  () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      setProvince: (province) => set({ province }),
      setCity:     (city)     => set({ city }),

      applyCoupon: (code) => {
        const result = validateCoupon(code);
        if (result.valid) set({ appliedCoupon: result.coupon, couponCode: result.coupon.code });
        return result;
      },

      removeCoupon: () => set({ appliedCoupon: null, couponCode: '' }),

      // Returns the effective unit price for a single item after discount
      getItemRate: (productCode: string) => {
        const { items, appliedCoupon } = get();
        const totalQty = items.reduce((s, i) => s + i.quantity, 0);
        const volumeRate = getVolumeTier(totalQty).rate;
        const item = items.find(i => i.product.code === productCode);
        if (!item) return 0;
        return getEffectiveRate(volumeRate, appliedCoupon, item.product.brand, item.product.code, item.product.isPromo);
      },

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalQty:   () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) =>
          sum + (typeof i.product.price === 'number' ? i.product.price * i.quantity : 0),
        0),

      totalDiscount: () => {
        const { items, appliedCoupon } = get();
        const totalQty = items.reduce((s, i) => s + i.quantity, 0);
        const volumeRate = getVolumeTier(totalQty).rate;
        return items.reduce((sum, item) => {
          if (typeof item.product.price !== 'number') return sum;
          const rate = getEffectiveRate(volumeRate, appliedCoupon, item.product.brand, item.product.code, item.product.isPromo);
          return sum + Math.round(item.product.price * item.quantity * rate);
        }, 0);
      },

      grandTotal: () => {
        const s = get();
        return Math.max(0, s.subtotal() - s.totalDiscount());
      },

      shippingWeight: () => {
        const { items, city } = get();
        const baseWeightKg = items.reduce((sum, i) => {
          const w = typeof (i.product as any).weight === 'number' && (i.product as any).weight > 0
            ? (i.product as any).weight : 3.5;
          return sum + w * i.quantity;
        }, 0);
        const sheets = items.reduce((sum, i) => sum + i.quantity, 0);
        const totalWeightKg = calculateChargeableWeight(baseWeightKg, sheets, city || '');
        return {
          baseWeightKg,
          cratingWeightKg: Math.max(0, totalWeightKg - baseWeightKg),
          totalWeightKg,
        };
      },

      shippingFee: () => {
        const { province } = get();
        if (!province) return 0;
        return calculateShipping(province, get().grandTotal());
      },

      orderTotal: () => {
        const s = get();
        return s.grandTotal() + s.shippingFee();
      },
    }),
    {
      name: 'tokohpl-cart-v2',
      // Exclude isDrawerOpen from persistence — always starts closed
      partialize: (state) => ({
        items:         state.items,
        appliedCoupon: state.appliedCoupon,
        couponCode:    state.couponCode,
        province:      state.province,
        city:          state.city,
      }),
    }
  )
);
