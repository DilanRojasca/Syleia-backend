import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetProductsHandler } from './queries/get-products/get-products.handler';
import { GetProductBySlugHandler } from './queries/get-product-by-slug/get-product-by-slug.handler';
import { CreateProductHandler } from './commands/create-product/create-product.handler';
import { UpdateProductHandler } from './commands/update-product/update-product.handler';
import { DeleteProductHandler } from './commands/delete-product/delete-product.handler';

const QueryHandlers = [GetProductsHandler, GetProductBySlugHandler];
const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ProductApplicationModule {}
