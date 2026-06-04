import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductId } from '@/domain/product/value-objects/product-id.vo';
import { ProductNotFoundException } from '@/domain/product/exceptions/product-not-found.exception';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, void>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const product = await this.productRepository.findById(
      ProductId.createFromString(command.productId),
    );
    if (!product) {
      throw new ProductNotFoundException(command.productId);
    }
    product.softDelete();
    await this.productRepository.save(product);
  }
}
