import { ProductPricing } from '../../../../domain/product-pricing';
import { ProductPricingEntity } from '../entities/product-pricing.entities';
import { ProductEntity } from 'src/modules/products/infrastructure/persistance/orm/entities/product.entities';

export class ProductPricingMapper {
  static toDomain(entity: ProductPricingEntity): ProductPricing {
    return new ProductPricing(
      entity.id,
      entity.product_id,
      entity.price,
      entity.currency,
      entity.is_active,
      entity.effective_from,
      entity.effective_to,
      entity.eol_date,
      entity.term,
    );
  }

  static toPersistence(domain: ProductPricing): ProductPricingEntity {
    const entity = new ProductPricingEntity();
    entity.id = domain.id;
    entity.product_id = domain.product_id;

    entity.price = domain.price;
    entity.currency = domain.currency;
    entity.is_active = domain.is_active;
    entity.effective_from = domain.effective_from;
    entity.effective_to = domain.effective_to || null;
    entity.eol_date = domain.eol_date || null;
    entity.term = domain.term || null;
    return entity;
  }
}
