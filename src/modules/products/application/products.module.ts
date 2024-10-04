import { Module } from '@nestjs/common';
import { ProductFactory } from '../domain/factories/product.factory';
import { ProductsController } from '../presentation/http/products.controller';
import { ProductsService} from './products.service';
import { CreateProductCommandHandler } from './commands/create-product.command-handler';
import { GetProductsQueryHandler } from './queries/get-products.query-handler';
import { ProductRepository } from '../infrastructure/persistance/orm/repositories/product.repository';
import { IProductRepository } from '../domain/ports/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../infrastructure/persistance/orm/entities/product.entities';
@Module({
  imports: [ TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    ProductFactory,
    {
      provide: IProductRepository,
      useClass: ProductRepository, // 💡 This is where we bind the port to an adapter
    },
    CreateProductCommandHandler,
    GetProductsQueryHandler
    
  ],
 
})
export class ProductsModule {}
