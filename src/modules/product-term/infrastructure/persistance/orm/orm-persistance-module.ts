import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductTermRepository } from '../../../domain/ports/product-term.repository';
import { ProductTermEntity } from './entities/product-term.entities';
import { ProductTermRepository } from './repositories/product-term.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTermEntity])],
  providers: [
    {
      provide: IProductTermRepository,
      useClass: ProductTermRepository,
    },
  ],
  exports: [ProductTermRepository],
})
export class ProductTermPersistenceModule {}
