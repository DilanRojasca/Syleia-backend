import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductId } from '@/domain/product/value-objects/product-id.vo';
import { ProductColor } from '@/domain/product/value-objects/product-color.vo';
import { ProductPrices } from '@/domain/product/value-objects/product-prices.vo';
import { ProductNotFoundException } from '@/domain/product/exceptions/product-not-found.exception';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';
import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, void>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const { productId, payload } = command;

    const product = await this.productRepository.findById(
      ProductId.createFromString(productId),
    );
    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    product.update({
      name: payload.name,
      shortDescription: payload.shortDescription,
      description: payload.description,
      prices: payload.prices ? ProductPrices.create(payload.prices) : undefined,
      colors: payload.colors
        ? payload.colors.map((c) => ProductColor.create(c))
        : undefined,
      images: payload.images,
      featured: payload.featured,
      inStock: payload.inStock,
      isNew: payload.isNew,
      tags: payload.tags,
    });

    await this.productRepository.save(product);
  }
}
