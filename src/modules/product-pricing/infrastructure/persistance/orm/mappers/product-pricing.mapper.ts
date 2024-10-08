import { ProductPricing } from '../../../../domain/product-pricing';
import { ProductPricingEntity } from '../entities/product-pricing.entities';

export class ProductPricingMapper {
  static toDomain(entity: ProductPricingEntity): ProductPricing {
    return new ProductPricing(
      entity.id,
      entity.productId,
      entity.price,
      entity.currency,
      entity.isActive,
      entity.effectiveFrom,
      entity.effectiveTo,
    );
  }

  static toPersistence(domain: ProductPricing): ProductPricingEntity {
    const entity = new ProductPricingEntity();
    entity.id = domain.id;
    entity.productId = domain.product_id;
    entity.price = domain.price;
    entity.currency = domain.currency;
    entity.isActive = domain.is_active;
    entity.effectiveFrom = domain.effective_from;
    entity.effectiveTo = domain.effective_to || null;
    return entity;
  }
}
