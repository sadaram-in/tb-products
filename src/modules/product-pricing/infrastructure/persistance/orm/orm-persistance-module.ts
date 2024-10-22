import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductPricingRepository } from '../../../domain/ports/product-pricing.repository';
import { ProductPricingEntity } from './entities/product-pricing.entities';
import { ProductPricingRepository } from './repositories/product-pricing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPricingEntity])],
  providers: [
    {
      provide: IProductPricingRepository,
      useClass: ProductPricingRepository, 
    },
  ],
  exports: [ProductPricingRepository],
})
export class ProductPersistenceModule {}
