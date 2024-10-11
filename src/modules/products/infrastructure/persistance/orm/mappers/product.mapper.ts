import { Product } from '../../../../domain/product';
import { ProductEntity } from '../entities/product.entities';
export class ProductMapper {
  static toDomain(productEntity: ProductEntity): Product {
    const productModel = new Product(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.change_log,
      productEntity.effective_from,
      productEntity.effective_to,
      productEntity.is_active,
    );
    return productModel;
  }

  static toPersistence(product: Product) {
    const entity = new ProductEntity();
    entity.id = product.id;
    entity.name = product.name;
    entity.description = product.description;
    entity.change_log = product.change_log;
    entity.effective_from = product.effective_from;
    entity.effective_to = product.effective_to;
    entity.is_active = product.is_active;
    return entity;
  }
}
