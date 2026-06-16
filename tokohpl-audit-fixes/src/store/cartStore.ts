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
  addEdgeBand: (product: Product, size: string, meters: number, pricePerMeter: number) => void;
  removeItem: (code: string) => void;
  removeEdgeBandItem: (code: string, size: string) => void;
  updateEdgeBandMeters: (code: string, size: string, meters: number) => void;
  updateQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
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
            (i) => i.product.code === product.code && !i.edgeBand
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.code === product.code && !i.edgeBand
                  ? { ...i, quantity: Math.min(i.quantity + qty, 9999) }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return { items: [...state.items, { product, quantity: qty }], isDrawerOpen: true };
        });
      },

      addEdgeBand: (product, size, meters, pricePerMeter) => {
        set((state) => {
          // Find existing edge band line with same product + size
          const existing = state.items.find(
            (i) => i.product.code === product.code && i.edgeBand?.size === size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.code === product.code && i.edgeBand?.size === size
                  ? { ...i, edgeBand: { ...i.edgeBand!, meters: i.edgeBand!.meters + meters } }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, edgeBand: { size, meters, pricePerMeter } }],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (code) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.product.code === code && !i.edgeBand)),
        })),

      removeEdgeBandItem: (code, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.code === code && i.edgeBand?.size === size)
          ),
        })),

      updateEdgeBandMeters: (code, size, meters) => {
        const m = Math.max(10, Math.round(meters / 10) * 10); // snap to nearest 10
        set((state) => ({
          items: state.items.map((i) =>
            i.product.code === code && i.edgeBand?.size === size
              ? { ...i, edgeBand: { ...i.edgeBand!, meters: m } }
              : i
          ),
        }));
      },

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

      totalItems: () => get().items.filter(i => !i.edgeBand).reduce((sum, i) => sum + i.quantity, 0),
      totalQty:   () => get().items.filter(i => !i.edgeBand).reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          if (i.edgeBand) {
            return sum + i.edgeBand.pricePerMeter * i.edgeBand.meters;
          }
          return sum + (typeof i.product.price === 'number' ? i.product.price * i.quantity : 0);
        }, 0),

      totalDiscount: () => {
        const { items, appliedCoupon } = get();
        const hplItems = items.filter(i => !i.edgeBand);
        const totalQty = hplItems.reduce((s, i) => s + i.quantity, 0);
        const volumeRate = getVolumeTier(totalQty).rate;
        return hplItems.reduce((sum, item) => {
          if (typeof item.product.price !== 'number') return sum;
          const rate = getEffectiveRate(volumeRate, appliedCoupon, item.product.brand, item.product.code);
          return sum + Math.round(item.product.price * item.quantity * rate);
        }, 0);
      },

      grandTotal: () => {
        const s = get();
        return Math.max(0, s.subtotal() - s.totalDiscount());
      },

      shippingWeight: () => {
        const { items, city } = get();
        const hplItems = items.filter(i => !i.edgeBand);
        const baseWeightKg = hplItems.reduce((sum, i) => {
          const w = typeof (i.product as any).weight === 'number' && (i.product as any).weight > 0
            ? (i.product as any).weight : 3.5;
          return sum + w * i.quantity;
        }, 0);
        const sheets = hplItems.reduce((sum, i) => sum + i.quantity, 0);
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
