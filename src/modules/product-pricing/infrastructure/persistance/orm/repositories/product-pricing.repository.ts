import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductPricingRepository } from '../../../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../../../domain/product-pricing';
import { ProductPricingEntity } from '../entities/product-pricing.entities'; 
import { ProductPricingMapper } from '../mappers/product-pricing.mapper';

@Injectable()
export class ProductPricingRepository implements IProductPricingRepository {
  constructor(
    @InjectRepository(ProductPricingEntity)
    private readonly productPricingRepository: Repository<ProductPricingEntity>,
  ) {}

  async findAll(): Promise<ProductPricing[]> {
    const entities = await this.productPricingRepository.find();
    return entities.map((item) => ProductPricingMapper.toDomain(item));
  }

  async findOne(id: string): Promise<ProductPricing> {
    const entity = await this.productPricingRepository.findOne({ where: { id } });
    return ProductPricingMapper.toDomain(entity);
  }

  async save(productPricing: ProductPricing): Promise<ProductPricing> {
    console.log(productPricing)
    const persistenceModel = ProductPricingMapper.toPersistence(productPricing);
    const newEntity = await this.productPricingRepository.save(persistenceModel);
    return ProductPricingMapper.toDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.productPricingRepository.delete(id);
  }
}
