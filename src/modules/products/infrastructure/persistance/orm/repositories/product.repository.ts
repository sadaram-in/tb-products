import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductRepository } from '../../../../domain/ports/products.repository';
import { Product } from '../../../../domain/product';
import { ProductEntity } from '../entities/product.entities';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    const entities = await this.productRepository.find();
    return entities.map((item) => ProductMapper.toDomain(item));
  }

  async save(product: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(product);
    const newEntity = await this.productRepository.save(persistenceModel);
    return ProductMapper.toDomain(newEntity);
  }
}