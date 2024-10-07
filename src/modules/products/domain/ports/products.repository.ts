
import { Product } from '../product';

export abstract class IProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract findOne(id: string): Promise<Product>;
  abstract save(product: Product): Promise<Product>;
}