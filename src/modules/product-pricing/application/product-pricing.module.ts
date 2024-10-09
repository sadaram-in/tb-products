import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductPricingController } from '../presentation/http/product-pricing.controller';
import { ProductPricingRepository } from '../infrastructure/persistance/orm/repositories/product-pricing.repository';
import { ProductPricingEntity } from '../infrastructure/persistance/orm/entities/product-pricing.entities';

// Commands
import { CreateProductPricingCommandHandler } from './commands/create-product-pricing.command-handler';
import { UpdateProductPricingCommandHandler } from './commands/update-product-pricing.command-handler';
import { DeleteProductPricingCommandHandler } from './commands/delete-product-pricing.command-handler';

// Queries
import { GetProductPricingByIdQueryHandler } from './queries/get-product-pricing-by-id.query-handler';
import { GetProductPricingsQueryHandler } from './queries/get-product-pricing.query-handler';

// Factories
import { ProductPricingFactory } from '../domain/factories/product-pricing.factory';
import { ProductPricingService } from './product-pricing.service';
import { IProductPricingRepository } from '../domain/ports/product-pricing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPricingEntity])],
  controllers: [ProductPricingController],
  providers: [
    ProductPricingService,
    ProductPricingFactory,
    {
      provide: IProductPricingRepository,
      useClass: ProductPricingRepository,
    },

    CreateProductPricingCommandHandler,
    UpdateProductPricingCommandHandler,
    DeleteProductPricingCommandHandler,

    GetProductPricingByIdQueryHandler,
    GetProductPricingsQueryHandler,
  ],
})
export class ProductPricingModule {}
