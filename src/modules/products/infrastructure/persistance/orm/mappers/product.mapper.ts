import { Product } from '../../../../domain/product';
import { ProductEntity } from '../entities/product.entities';
export class ProductMapper {
  static toDomain(productEntity: ProductEntity): Product {
    const productModel = new Product(
      productEntity.id,
      productEntity.golden_id,
      productEntity.name,
      productEntity.description,
      productEntity.change_log,
      productEntity.start_date,
      productEntity.end_date,
      productEntity.is_active,
      productEntity.created_at,
      productEntity.updated_at,
    );
    return productModel;
  }

  static toPersistence(product: Product) {
    const entity = new ProductEntity();
    entity.id = product.id;
    entity.golden_id = product.golden_id;
    entity.name = product.name;
    entity.description = product.description;
    entity.change_log = product.change_log;
    entity.start_date = product.start_date;
    entity.end_date = product.end_date;
    entity.is_active = product.is_active;
    entity.created_at = product.created_at;
    entity.updated_at = product.updated_at;
    return entity;
  }
}
