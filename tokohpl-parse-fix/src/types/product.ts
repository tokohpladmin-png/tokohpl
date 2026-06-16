export type ProductBrand = 'EDL' | 'LAMITAK';

export type Product = {
  slug: string;
  code: string;
  name: string;
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
  edgeBand?: EdgeBand;
};

export type EdgeBand = {
  code: string;
  sizes: EdgeBandSize[];
};

export type EdgeBandSize = {
  label: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  edgeBand?: {
    code: string;
    sizeLabel: string;
    price: number;
    meters: number;
  };
};
