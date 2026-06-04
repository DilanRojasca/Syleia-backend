import { DomainException } from '@/domain/shared/exceptions/domain.exception';

export type ProductCategoryValue =
  | 'scrunchies'
  | 'combo-descanso'
  | 'gorros'
  | 'fundas';

const VALID_CATEGORIES: ProductCategoryValue[] = [
  'scrunchies',
  'combo-descanso',
  'gorros',
  'fundas',
];

export class ProductCategory {
  private constructor(private readonly value: ProductCategoryValue) {}

  static create(value: string): ProductCategory {
    if (!VALID_CATEGORIES.includes(value as ProductCategoryValue)) {
      throw new DomainException(
        `Invalid product category: '${value}'. Valid values: ${VALID_CATEGORIES.join(', ')}`,
      );
    }
    return new ProductCategory(value as ProductCategoryValue);
  }

  static validValues(): ProductCategoryValue[] {
    return [...VALID_CATEGORIES];
  }

  toString(): string {
    return this.value;
  }

  equals(other: ProductCategory): boolean {
    return this.value === other.value;
  }
}
