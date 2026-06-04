import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProductsController],
})
export class PresentationModule {}
