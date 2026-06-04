export interface UpdateProductPayload {
  name?: string;
  shortDescription?: string;
  description?: string;
  prices?: { detal: number; mayor: number; mayorMin: number };
  colors?: { name: string; hex: string; slug: string }[];
  images?: string[];
  featured?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  tags?: string[];
}

export class UpdateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly payload: UpdateProductPayload,
  ) {}
}
