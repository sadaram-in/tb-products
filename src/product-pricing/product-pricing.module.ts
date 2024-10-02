import { Module } from '@nestjs/common';
import { ProductPricingService } from './product-pricing.service';

@Module({
  providers: [ProductPricingService]
})
export class ProductPricingModule {}
