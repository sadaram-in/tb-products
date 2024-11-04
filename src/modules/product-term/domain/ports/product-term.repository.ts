import { ProductTerm } from '../product-term';

export abstract class IProductTermRepository {
  abstract findAll(): Promise<ProductTerm[]>;
  abstract findOne(id: string): Promise<ProductTerm>;
  abstract save(productTerm: ProductTerm): Promise<ProductTerm>;
  abstract delete(id: string): Promise<void>;
}
