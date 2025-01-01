import { Product } from '../../domain/entities/product.entity';

export interface ProductRepositoryPort {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findValidProducts(date: Date): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
