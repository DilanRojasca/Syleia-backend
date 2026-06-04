export interface CreateProductPayload {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  prices: { detal: number; mayor: number; mayorMin: number };
  colors: { name: string; hex: string; slug: string }[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  isNew?: boolean;
  tags: string[];
}

export class CreateProductCommand {
  constructor(public readonly payload: CreateProductPayload) {}
}
