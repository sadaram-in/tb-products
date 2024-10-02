import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPricing } from './product-pricing.entity';
import { CreateProductPricingDto, UpdateProductPricingDto } from './product-pricing.dto';

@Injectable()
export class ProductPricingService {
  constructor(
    @InjectRepository(ProductPricing)
    private readonly productPricingRepository: Repository<ProductPricing>,
  ) {}

  async createProductPricing(createProductPricingDto: CreateProductPricingDto) {
    const newPricing = this.productPricingRepository.create(createProductPricingDto);
    return this.productPricingRepository.save(newPricing);
  }

  getAllProductPricing() {
    return this.productPricingRepository.find({ relations: ['product'] });
  }

  getProductPricingById(id: string) {
    return this.productPricingRepository.findOne({ where: { id }, relations: ['product'] });
  }

  async updateProductPricing(id: string, updateProductPricingDto: UpdateProductPricingDto) {
    await this.productPricingRepository.update(id, updateProductPricingDto);
    return this.getProductPricingById(id);
  }

  async softDeleteProductPricing(id: string) {
    const pricing = await this.getProductPricingById(id);
    if (!pricing) {
      throw new HttpException('Product pricing not found', HttpStatus.NOT_FOUND);
    }
    pricing.is_active = false;
    return this.productPricingRepository.save(pricing);
  }
}
