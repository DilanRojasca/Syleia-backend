import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@/infrastructure/auth/decorators/public.decorator';
import { GetProductsQuery } from '@/application/product/queries/get-products/get-products.query';
import { GetProductsResult } from '@/application/product/queries/get-products/get-products.result';
import { GetProductBySlugQuery } from '@/application/product/queries/get-product-by-slug/get-product-by-slug.query';
import { GetProductBySlugResult } from '@/application/product/queries/get-product-by-slug/get-product-by-slug.result';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List products (optionally filtered by category or featured)' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  async getProducts(
    @Query() query: GetProductsQueryDto,
  ): Promise<ProductResponseDto[]> {
    const result = await this.queryBus.execute<GetProductsQuery, GetProductsResult>(
      new GetProductsQuery(query.category, query.featured),
    );
    return result.products as ProductResponseDto[];
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get a single product by slug' })
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProductBySlug(
    @Param('slug') slug: string,
  ): Promise<ProductResponseDto> {
    const result = await this.queryBus.execute<
      GetProductBySlugQuery,
      GetProductBySlugResult
    >(new GetProductBySlugQuery(slug));
    return result.product as ProductResponseDto;
  }
}
