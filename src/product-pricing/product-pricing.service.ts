import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPricing } from './product-pricing.entity';

@Injectable()
export class ProductPricingService {
  constructor(
    @InjectRepository(ProductPricing)
    private readonly productPricingRepository: Repository<ProductPricing>,
  ) {}

  getProductPricing() {
    return this.productPricingRepository.find();
  }
}
