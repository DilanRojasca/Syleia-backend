import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';
import {
  mapProductToDto,
} from '@/application/product/shared/product-read.dto';
import { GetProductsQuery } from './get-products.query';
import { GetProductsResult } from './get-products.result';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery, GetProductsResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: GetProductsQuery): Promise<GetProductsResult> {
    const products = await this.productRepository.findAll({
      category: query.category,
      featured: query.featured,
    });
    return new GetProductsResult(products.map(mapProductToDto));
  }
}
