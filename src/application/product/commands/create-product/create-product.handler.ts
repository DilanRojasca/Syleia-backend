import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from '@/domain/product/entities/product.entity';
import { ProductCategory } from '@/domain/product/value-objects/product-category.vo';
import { ProductColor } from '@/domain/product/value-objects/product-color.vo';
import { ProductPrices } from '@/domain/product/value-objects/product-prices.vo';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, string>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<string> {
    const { payload } = command;

    const product = Product.create({
      slug: payload.slug,
      name: payload.name,
      shortDescription: payload.shortDescription,
      description: payload.description,
      category: ProductCategory.create(payload.category),
      prices: ProductPrices.create(payload.prices),
      colors: payload.colors.map((c) => ProductColor.create(c)),
      images: payload.images,
      featured: payload.featured,
      inStock: payload.inStock,
      isNew: payload.isNew,
      tags: payload.tags,
    });

    await this.productRepository.save(product);
    return product.getId().toString();
  }
}
