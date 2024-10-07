import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    // console.log(entities);
    return entities.map((item) => ProductMapper.toDomain(item));
  }

  async findOne(id: string): Promise<Product> {
    const entity = await this.productRepository.findOne({ where: { id } });
    return ProductMapper.toDomain(entity);
    // return null;
  }

  async save(product: Product): Promise<Product> {
    console.log(product);
    const persistenceModel = ProductMapper.toPersistence(product);
    console.log(persistenceModel);
    const newEntity = await this.productRepository.save(persistenceModel);
    console.log(newEntity);
    return ProductMapper.toDomain(newEntity);
  }
 
  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
