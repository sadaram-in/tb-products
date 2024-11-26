import { ProductTermEntity } from '../../infrastructure/persistance/orm/entities/product-term.entities';
import { CreateProductTermDto } from '../../presentation/http/dto/create-product-term.dto';

export class ProductTermFactory {
  create(createProductTermDto: CreateProductTermDto): ProductTermEntity {
    const { term_type } = createProductTermDto;

    const productTerm = new ProductTermEntity();
    productTerm.term_type = term_type;
    return productTerm;
  }
}
