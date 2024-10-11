import { ProductEntity } from '../../infrastructure/persistance/orm/entities/product.entities';
import { CreateProductDto } from '../../presentation/http/dto/create-product.dto';

export class ProductFactory {
  create(createProductDto: CreateProductDto): ProductEntity {
    const {
      name,
      description,
      change_log,
      effective_from,
      effective_to,
      is_active,
    } = createProductDto;

    const product = new ProductEntity();
    product.name = name;
    product.description = description;
    product.change_log = change_log;
    product.effective_from = effective_from;
    product.effective_to = effective_to;
    product.is_active = is_active;

    return product;
  }
}
