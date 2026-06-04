import { ProductReadDto } from '@/application/product/shared/product-read.dto';

export class GetProductsResult {
  constructor(public readonly products: ProductReadDto[]) {}
}
