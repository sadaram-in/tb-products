import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from './infrastructure/persistence/typeorm/entities/product.entity';
import { ProductPricingEntity } from './infrastructure/persistence/typeorm/entities/product-pricing.entity';
import { SubscriptionTermsEntity } from './infrastructure/persistence/typeorm/entities/subscription-terms.entity';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductRepository } from './infrastructure/persistence/typeorm/repositories/product.repository';
import { ProductRepositoryAdapter } from './infrastructure/adapters/product.repository.adapter';
import { CreateProductHandler } from './application/commands/create-product.handler';
import {
  GetProductsHandler,
  GetValidProductsHandler,
} from './application/queries/get-products.handler';
import { LoggingModule } from 'src/utils/logging/logging.module';
import { DeleteProductHandler } from './application/commands/delete-product.handler';
import { ProductAuditEntity } from './infrastructure/persistence/typeorm/entities/product-audit.entity';
import { ProductAuditRepository } from './infrastructure/persistence/typeorm/repositories/product-audit.repository';
import { UpdateProductHandler } from './application/commands/update-product.handler';
import { AuthModule } from 'src/auth/auth.module';

const CommandHandlers = [
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
];
const QueryHandlers = [GetProductsHandler, GetValidProductsHandler];

@Module({
  imports: [
    CqrsModule,
    LoggingModule,
    AuthModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductPricingEntity,
      SubscriptionTermsEntity,
      ProductAuditEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    ProductAuditRepository,
    ProductRepositoryAdapter,
    {
      provide: 'ProductRepositoryPort',
      useExisting: ProductRepositoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ProductModule {}
