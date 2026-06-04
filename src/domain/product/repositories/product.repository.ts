import { Product } from '@/domain/product/entities/product.entity';
import { ProductId } from '@/domain/product/value-objects/product-id.vo';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductFilters {
  category?: string;
  featured?: boolean;
}

export interface IProductRepository {
  findAll(filters: ProductFilters): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findById(id: ProductId): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: ProductId): Promise<void>;
}
