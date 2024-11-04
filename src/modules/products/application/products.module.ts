import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from '../presentation/http/products.controller';
import { ProductRepository } from '../infrastructure/persistance/orm/repositories/product.repository';
import { ProductEntity } from '../infrastructure/persistance/orm/entities/product.entities';

import { CreateProductCommandHandler } from './commands/create-product.command-handler';
import { UpdateProductCommandHandler } from './commands/update-product.command-handler';
import { DeleteProductCommandHandler } from './commands/delete-product.command-handler';

import { GetProductsQueryHandler } from './queries/get-products.query-handler';
import { GetProductsByIdQueryHandler } from './queries/get-products-by-id.query-handler';

import { ProductFactory } from '../domain/factories/product.factory';
import { ProductsService } from './products.service';
import { IProductRepository } from '../domain/ports/products.repository';
import { ResponseService } from 'src/shared/response/response.service';
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ResponseService,
    ProductFactory,
    {
      provide: IProductRepository,
      useClass: ProductRepository, 
    },
    CreateProductCommandHandler,
    GetProductsQueryHandler,
    GetProductsByIdQueryHandler,
    UpdateProductCommandHandler,
    DeleteProductCommandHandler,
  ],
})
export class ProductsModule {}
