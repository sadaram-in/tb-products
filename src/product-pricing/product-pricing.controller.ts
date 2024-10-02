import { Controller, Get } from '@nestjs/common';
import { ProductPricingService } from './product-pricing.service';

@Controller('product-pricing')
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  @Get()
  getProductPricing() {
    return this.productPricingService.getProductPricing();
  }
}
