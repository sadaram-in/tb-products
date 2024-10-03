
import { Product } from '../product';

export abstract class IProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract save(product: Product): Promise<Product>;
}