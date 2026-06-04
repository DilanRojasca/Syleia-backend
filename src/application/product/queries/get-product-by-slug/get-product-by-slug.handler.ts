import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';
import { ProductNotFoundException } from '@/domain/product/exceptions/product-not-found.exception';
import { mapProductToDto } from '@/application/product/shared/product-read.dto';
import { GetProductBySlugQuery } from './get-product-by-slug.query';
import { GetProductBySlugResult } from './get-product-by-slug.result';

@QueryHandler(GetProductBySlugQuery)
export class GetProductBySlugHandler
  implements IQueryHandler<GetProductBySlugQuery, GetProductBySlugResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: GetProductBySlugQuery): Promise<GetProductBySlugResult> {
    const product = await this.productRepository.findBySlug(query.slug);
    if (!product) {
      throw new ProductNotFoundException(query.slug);
    }
    return new GetProductBySlugResult(mapProductToDto(product));
  }
}
