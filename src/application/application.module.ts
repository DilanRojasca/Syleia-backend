import { Module } from '@nestjs/common';
import { ProductApplicationModule } from './product/product-application.module';

@Module({
  imports: [ProductApplicationModule],
})
export class ApplicationModule {}
