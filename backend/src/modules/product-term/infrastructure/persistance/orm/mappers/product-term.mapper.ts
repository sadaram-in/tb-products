import { ProductTerm } from '../../../../domain/product-term';
import { ProductTermEntity } from '../entities/product-term.entities';
export class ProductTermMapper {
  static toDomain(productTermEntity: ProductTermEntity): ProductTerm {
    const productTermModel = new ProductTerm(
      productTermEntity.id,
      productTermEntity.term_type,
      productTermEntity.created_at,
      productTermEntity.updated_at,
    );
    return productTermModel;
  }

  static toPersistence(productTerm: ProductTerm) {
    const entity = new ProductTermEntity();
    entity.id = productTerm.id;
    entity.term_type = productTerm.term_type;
    entity.created_at = productTerm.created_at;
    entity.updated_at = productTerm.updated_at;
    return entity;
  }
}
