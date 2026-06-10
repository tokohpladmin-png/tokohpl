export type ProductBrand = 'EDL' | 'LAMITAK' | 'AICA';

export type Product = {
  slug: string;
  code: string;
  name: string;
  brand: ProductBrand;
  collection?: string;
  category?: string;
  finish?: string;
  size?: string;
  thickness?: string;
  price?: number | null;
  weight?: number;        // kg per sheet, default 3.5
  taxIncluded?: boolean;
  currency: 'IDR';
  active: boolean;
  imageUrl?: string;
  imageUrlCandidates?: string[];
  description?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
