import { Product } from '../../../../domain/product';
import { ProductEntity } from '../entities/product.entities';
export class ProductMapper {
    static toDomain(productEntity: ProductEntity): Product {
    
      const alarmModel = new Product(
        productEntity.id,
        productEntity.name,
        //rest of the product fields
      );
      return alarmModel;
    }
  
    static toPersistence(product: Product) {
      const entity = new ProductEntity();
      entity.id = product.id;
      entity.name = product.name;
     //rest of the product fields
      return entity;
    }
  }