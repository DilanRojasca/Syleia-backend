import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDocument, ProductSchema } from './schemas/product.schema';
import { MongoProductRepository } from './repositories/mongo-product.repository';
import { PRODUCT_REPOSITORY } from '@/domain/product/repositories/product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: MongoProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class PersistenceModule {}
