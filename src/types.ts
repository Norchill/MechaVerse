/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductSpecs {
  insulation: string;
  membrane: string;
  temperatureRating: string;
  weight: string;
  waterproofRate: string;
}

export interface Product {
  id: string;
  name: string;
  subName: string;
  price: number;
  img: string;
  colors: string[];
  colorImages?: Record<string, string>;
  sizes: string[];
  category: 'ALL' | 'SHELL' | 'INSULATED' | 'SPEC-OPS';
  description: string;
  isNew: boolean;
  specs: ProductSpecs;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
