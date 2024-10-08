import { Injectable } from '@nestjs/common';
import { ProductPricing } from '../product-pricing';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductPricingFactory {
  create({
    productId,
    price,
    currency,
    isActive,
    effectiveFrom,
    effectiveTo,
  }: {
    productId: string;
    price: number;
    currency: string;
    isActive: boolean;
    effectiveFrom: Date;
    effectiveTo: Date | null;
  }): ProductPricing {
    return new ProductPricing(
      randomUUID(),
      productId,
      price,
      currency,
      isActive,
      effectiveFrom,
      effectiveTo,
    );
  }
}
