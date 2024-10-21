import { Injectable } from '@nestjs/common';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
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

  async findOneById(id: string): Promise<ProductPricing> {
    const entity = await this.productPricingRepository.findOne({
      where: { id },
    });
    return ProductPricingMapper.toDomain(entity);
  }

  async findByCommand(
    product_id: string,
    check_start_date: Date,
    check_end_date: Date,
    order: boolean,
  ): Promise<ProductPricing[]> {
    const entities = await this.productPricingRepository.find({
      where: {
        product_id,
        start_date: Between(check_start_date, check_end_date),
      },
      order: order ? { start_date: 'ASC' } : {},
    });
    return entities.map((item) => ProductPricingMapper.toDomain(item));
  }
}
