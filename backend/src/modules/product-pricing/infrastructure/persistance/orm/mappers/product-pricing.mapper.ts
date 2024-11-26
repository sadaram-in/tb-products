import { MAX_DATE } from 'class-validator';
import { ProductPricing } from '../../../../domain/product-pricing';
import { ProductPricingEntity } from '../entities/product-pricing.entities';

export class ProductPricingMapper {
  static toDomain(entity: ProductPricingEntity): ProductPricing {
    return new ProductPricing(
      entity.id,
      entity.product_id,
      entity.price,
      entity.currency,
      entity.is_active,
      entity.start_date,
      entity.end_date,
      entity.eol_date,
      entity.term_id,
      entity.created_at,
      entity.updated_at,
    );
  }

  static toPersistence(domain: ProductPricing): ProductPricingEntity {
    const entity = new ProductPricingEntity();
    entity.id = domain.id;
    entity.product_id = domain.product_id;

    entity.price = domain.price;
    entity.currency = domain.currency;
    entity.is_active = domain.is_active;
    entity.start_date = domain.start_date;
    entity.end_date = domain.end_date || new Date('9999-12-31');
    entity.eol_date = domain.eol_date || new Date('9999-12-31');
    entity.term_id = domain.term_id ;
    entity.created_at = domain.created_at;
    entity.updated_at = domain.updated_at;
    return entity;
  }
}
