import { Module } from '@nestjs/common';
import { ProductFactory } from '../domain/factories/product.factory';
import { ProductsController } from '../presentation/http/products.controller';
import { ProductsService} from './products.service';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductFactory],
})
export class ProductsModule {}
