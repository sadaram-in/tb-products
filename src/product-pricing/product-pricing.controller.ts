import { Controller, Get } from '@nestjs/common';

@Controller('product-pricing')
export class ProductPricingController {
  @Get()
  getProductPricing(): string {
    return 'Hello, this is product pricing';
  }
}
