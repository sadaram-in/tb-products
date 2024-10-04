import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from '../../../domain/ports/products.repository';
import { ProductEntity } from './entities/product.entities';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository, // 💡 This is where we bind the port to an adapter
    },
  ],
  exports: [ProductRepository],
})
export class ProductPersistenceModule {}