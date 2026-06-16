export type ProductBrand = 'EDL' | 'LAMITAK';

export type Product = {
  slug: string;
  code: string;
  name: string;
  itemName?: string;  // full CSV Item Name e.g. "DXO 5338D - LAMITAK HPL 4'x8' | STOFFA GRIGIO"
  brand: ProductBrand;
  collection?: string;
  subCollection?: string;
  category?: string;
  size?: string;
  thickness?: string;
  price?: number | null;
  taxIncluded?: boolean;
  currency: 'IDR';
  active: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
  imageUrl?: string;
  description?: string;
};


export type CartItem = {
  product: Product;
  quantity: number;
};
