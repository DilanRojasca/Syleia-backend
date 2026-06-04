import { Product } from '@/domain/product/entities/product.entity';

export interface ProductColorDto {
  name: string;
  hex: string;
  slug: string;
}

export interface ProductPricesDto {
  detal: number;
  mayor: number;
  mayorMin: number;
}

export interface ProductReadDto {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  prices: ProductPricesDto;
  colors: ProductColorDto[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  isNew: boolean;
  tags: string[];
}

export function mapProductToDto(product: Product): ProductReadDto {
  return {
    id: product.getId().toString(),
    slug: product.getSlug(),
    name: product.getName(),
    shortDescription: product.getShortDescription(),
    description: product.getDescription(),
    category: product.getCategory().toString(),
    prices: product.getPrices().toPlain(),
    colors: product.getColors().map((c) => c.toPlain()),
    images: product.getImages(),
    featured: product.isFeatured(),
    inStock: product.isInStock(),
    isNew: product.getIsNew(),
    tags: product.getTags(),
  };
}
