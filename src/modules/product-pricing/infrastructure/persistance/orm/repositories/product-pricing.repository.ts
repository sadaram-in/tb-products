import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
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

  async findOne(product_id: string, startDate: Date): Promise<ProductPricing> {
    console.log(product_id, startDate);
    const entity = await this.productPricingRepository.find({
      where: {
        product_id: product_id,
        start_date: LessThanOrEqual(startDate),
      },
      order: {
        start_date: 'DESC',
      },
    });
    return ProductPricingMapper.toDomain(entity[0]);
  }

  async save(productPricing: ProductPricing): Promise<ProductPricing> {
    const persistenceModel = ProductPricingMapper.toPersistence(productPricing);
    const newEntity =
      await this.productPricingRepository.save(persistenceModel);
    return ProductPricingMapper.toDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.productPricingRepository.delete(id);
  }

  async updateIsActive(currentDate: Date): Promise<void> {
    await this.productPricingRepository
      .createQueryBuilder()
      .update(ProductPricingEntity)
      .set({ is_active: false })
      .where('eol_date < :currentDate', { currentDate })
      .execute();
  }
}

// await this.productPricingRepository
//   .createQueryBuilder()
//   .update(ProductPricingEntity)
//   .set({ is_active: true })
//   .where(
//     'start_date <= :currentDate AND (eol_date IS NULL OR eol_date >= :currentDate)',
//     { currentDate },
//   )
//   .execute();
