import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPricingController } from './product-pricing.controller';
import { ProductPricingService } from './product-pricing.service';
import { ProductPricing } from './product-pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPricing])],
  controllers: [ProductPricingController],
  providers: [ProductPricingService],
})
export class ProductPricingModule {}
