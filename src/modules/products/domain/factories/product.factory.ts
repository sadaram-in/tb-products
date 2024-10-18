import { ProductEntity } from '../../infrastructure/persistance/orm/entities/product.entities';
import { CreateProductDto } from '../../presentation/http/dto/create-product.dto';

export class ProductFactory {
  create(createProductDto: CreateProductDto): ProductEntity {
    const {
      name,
      golden_id,
      description,
      change_log,
      start_date,
      end_date,
      is_active,
    } = createProductDto;

    const product = new ProductEntity();
    product.golden_id = golden_id;
    product.name = name;
    product.description = description;
    product.change_log = change_log;
    product.start_date = start_date;
    product.end_date = end_date;
    product.is_active = is_active;

    return product;
  }
}
