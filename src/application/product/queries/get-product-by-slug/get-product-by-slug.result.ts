import { ProductReadDto } from '@/application/product/shared/product-read.dto';

export class GetProductBySlugResult {
  constructor(public readonly product: ProductReadDto) {}
}
