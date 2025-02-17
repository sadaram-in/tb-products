import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductPricingEntity } from '../entities/product-pricing.entity';
import { SubscriptionTermsEntity } from '../entities/subscription-terms.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductPricingEntity)
    private readonly pricingRepo: Repository<ProductPricingEntity>,
    @InjectRepository(SubscriptionTermsEntity)
    private readonly termsRepo: Repository<SubscriptionTermsEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find({
      relations: ['pricing', 'subscriptionTerms'],
      withDeleted: false, // This will exclude soft-deleted records
    });
  }

  async findOneWithRelations(id: string): Promise<ProductEntity> {
    return this.productRepo.findOne({
      where: { id },
      relations: ['pricing', 'subscriptionTerms'],
      withDeleted: false,
    });
  }

  async findValidProducts(date: Date): Promise<ProductEntity[]> {
    return this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.pricing', 'pricing')
      .leftJoinAndSelect('product.subscriptionTerms', 'terms')
      .where('product.startDate <= :date', { date })
      .andWhere('product.endDate >= :date', { date })
      .andWhere('pricing.validFrom <= :date', { date })
      .andWhere('pricing.validTo >= :date', { date })
      .andWhere('pricing.isActive = :active', { active: true })
      .andWhere('terms.eolDate IS NULL OR terms.eolDate >= :date', { date })
      .andWhere('product.deletedAt IS NULL')
      .andWhere('pricing.deletedAt IS NULL')
      .andWhere('terms.deletedAt IS NULL')
      .getMany();
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepo.save(product);
  }

  async saveWithRelations(
    product: ProductEntity,
    pricing: ProductPricingEntity[],
    terms: SubscriptionTermsEntity[],
  ): Promise<ProductEntity> {
    const savedProduct = await this.productRepo.save(product);

    pricing.forEach((p) => (p.productId = savedProduct.id));
    terms.forEach((t) => (t.productId = savedProduct.id));

    await Promise.all([
      this.pricingRepo.save(pricing),
      this.termsRepo.save(terms),
    ]);

    return this.findOneWithRelations(savedProduct.id);
  }

  async softDelete(id: string): Promise<void> {
    await this.productRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Soft delete pricing
        await transactionalEntityManager.softDelete(ProductPricingEntity, {
          productId: id,
        });

        // Soft delete terms
        await transactionalEntityManager.softDelete(SubscriptionTermsEntity, {
          productId: id,
        });

        // Soft delete product
        await transactionalEntityManager.softDelete(ProductEntity, { id });
      },
    );
  }

  // Optional: Add method to restore soft-deleted products
  async restore(id: string): Promise<void> {
    await this.productRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Restore related pricing entries
        await transactionalEntityManager
          .createQueryBuilder()
          .update(ProductPricingEntity)
          .set({ deletedAt: null })
          .where('productId = :id', { id })
          .execute();

        // Restore related subscription terms
        await transactionalEntityManager
          .createQueryBuilder()
          .update(SubscriptionTermsEntity)
          .set({ deletedAt: null })
          .where('productId = :id', { id })
          .execute();

        // Restore the product
        await transactionalEntityManager
          .createQueryBuilder()
          .update(ProductEntity)
          .set({ deletedAt: null })
          .where('id = :id', { id })
          .execute();
      },
    );
  }

  // Keep the hard delete method if needed for administrative purposes
  async delete(id: string): Promise<void> {
    await this.pricingRepo.delete({ productId: id });
    await this.termsRepo.delete({ productId: id });
    await this.productRepo.delete(id);
  }
}
