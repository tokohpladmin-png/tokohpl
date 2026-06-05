export type ProductBrand = 'EDL' | 'LAMITAK';

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
