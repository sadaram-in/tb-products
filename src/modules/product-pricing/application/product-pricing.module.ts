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
import { GetProductPricingByProductIdQueryHandler } from './queries/get-product-pricing-by-product-id.query-handler';
import { GetProductPricingsQueryHandler } from './queries/get-product-pricing.query-handler';

// Factories
import { ProductPricingFactory } from '../domain/factories/product-pricing.factory';
import { ProductPricingService } from './product-pricing.service';
import { IProductPricingRepository } from '../domain/ports/product-pricing.repository';
import { ResponseService } from 'src/shared/response/response.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UpdateIsActiveCron } from '../../../shared/cron/update-is-active.cron';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPricingEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ProductPricingController],
  providers: [
    UpdateIsActiveCron,
    ProductPricingService,
    ResponseService,
    ProductPricingFactory,
    {
      provide: IProductPricingRepository,
      useClass: ProductPricingRepository,
    },

    CreateProductPricingCommandHandler,
    UpdateProductPricingCommandHandler,
    DeleteProductPricingCommandHandler,

    GetProductPricingByIdQueryHandler,
    GetProductPricingByProductIdQueryHandler,
    GetProductPricingsQueryHandler,
  ],
})
export class ProductPricingModule {}
