import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../application/ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../persistence/typeorm/repositories/product.repository';
import { ProductPricing } from 'src/products/domain/entities/product-pricing.entity';
import { SubscriptionTerms } from 'src/products/domain/entities/subscription-terms.entity';
import { ProductAuditRepository } from '../persistence/typeorm/repositories/product-audit.repository';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  constructor(
    private readonly repository: ProductRepository,
    private readonly auditRepository: ProductAuditRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.findAll();
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOneWithRelations(id);
    return entity ? this.toDomain(entity) : null;
  }

  async findValidProducts(date: Date): Promise<Product[]> {
    const entities = await this.repository.findValidProducts(date);
    return entities.map((e) => this.toDomain(e));
  }

  async save(product: Product): Promise<Product> {
    const entity = this.toEntity(product);
    const saved = await this.repository.saveWithRelations(
      entity,
      entity.pricing,
      entity.subscriptionTerms,
    );
    return this.toDomain(saved);
  }

  async update(id: string, product: Product): Promise<Product> {
    const oldProduct = await this.findById(id);
    const entity = this.toEntity(product);
    const updated = await this.repository.saveWithRelations(
      { ...entity, id },
      entity.pricing,
      entity.subscriptionTerms,
    );

    await this.auditRepository.logChange(
      id,
      'UPDATE',
      oldProduct,
      updated,
      'system', // Replace with actual user ID from context
    );

    return this.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    const oldProduct = await this.findById(id);
    if (!oldProduct) {
      throw new Error('Product not found');
    }

    // Create a soft deleted version of the product
    const deletedProduct = new Product(
      oldProduct.id,
      oldProduct.businessId,
      oldProduct.name,
      oldProduct.description,
      oldProduct.metadata,
      oldProduct.type,
      oldProduct.startDate,
      oldProduct.endDate,
      oldProduct.getPricing(),
      oldProduct.getSubscriptionTerms(),
    );
    deletedProduct.softDelete(); // This will set the deletedAt timestamp

    const entity = this.toEntity(deletedProduct);
    await this.repository.softDelete(id);

    // Log the soft delete action
    await this.auditRepository.logChange(
      id,
      'SOFT_DELETE',
      oldProduct,
      deletedProduct,
      'system', // Replace with actual user ID from context
    );
  }

  async delete(id: string): Promise<void> {
    const oldProduct = await this.findById(id);
    await this.repository.delete(id);
    await this.auditRepository.logChange(
      id,
      'DELETE',
      oldProduct,
      null,
      'system', // Replace with actual user ID from context
    );
  }

  // Update toEntity and toDomain methods to handle deletedAt
  private toDomain(entity: any): Product {
    const pricing = entity.pricing?.map(
      (p) =>
        new ProductPricing(
          p.id,
          p.productId,
          p.price,
          p.currency,
          p.tierType,
          p.isActive,
          p.validFrom,
          p.validTo,
          p.deletedAt,
        ),
    );

    const terms = entity.subscriptionTerms?.map(
      (t) =>
        new SubscriptionTerms(
          t.id,
          t.productId,
          t.termPeriod,
          t.termUom,
          t.trialPeriodDays,
          t.billingFrequency,
          t.eolDate,
          t.description,
          t.deletedAt,
        ),
    );

    const product = new Product(
      entity.id,
      entity.businessId,
      entity.name,
      entity.description,
      entity.metadata,
      entity.type,
      entity.startDate,
      entity.endDate,
      pricing,
      terms,
      entity.deletedAt,
    );

    if (entity.deletedAt) {
      product.softDelete();
    }

    return product;
  }

  private toEntity(domain: Product): any {
    return {
      id: domain.id,
      businessId: domain.businessId,
      name: domain.name,
      description: domain.description,
      metadata: domain.metadata,
      type: domain.type,
      startDate: domain.startDate,
      endDate: domain.endDate,
      deletedAt: domain.getDeletedAt(),
      pricing: domain.getPricing().map((p) => ({
        id: p.id,
        productId: p.productId,
        price: p.getAmount(),
        currency: p.getCurrency(),
        tierType: p.tierType,
        isActive: p.isActive,
        validFrom: p.validFrom,
        validTo: p.validTo,
        deletedAt: p.getDeletedAt(),
      })),
      subscriptionTerms: domain.getSubscriptionTerms().map((t) => ({
        id: t.id,
        productId: t.productId,
        termPeriod: t.termPeriod,
        termUom: t.termUom,
        trialPeriodDays: t.trialPeriodDays,
        billingFrequency: t.billingFrequency,
        eolDate: t.eolDate,
        description: t.description,
        deletedAt: t.getDeletedAt(),
      })),
    };
  }
}
