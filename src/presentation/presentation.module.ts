import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsController } from './products/products.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [CqrsModule, UploadModule],
  controllers: [ProductsController],
})
export class PresentationModule {}
