import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductTermRepository } from '../../../../domain/ports/product-term.repository';
import { ProductTerm } from '../../../../domain/product-term';
import { ProductTermEntity } from '../entities/product-term.entities';
import { ProductTermMapper } from '../mappers/product-term.mapper';

@Injectable()
export class ProductTermRepository implements IProductTermRepository {
  constructor(
    @InjectRepository(ProductTermEntity)
    private readonly productTermRepository: Repository<ProductTermEntity>,
  ) {}

  async findAll(): Promise<ProductTerm[]> {
    const entities = await this.productTermRepository.find();
    // console.log(entities);
    return entities.map((item) => ProductTermMapper.toDomain(item));
  }

  async findOne(id: string): Promise<ProductTerm> {
    const entity = await this.productTermRepository.findOne({ where: { id } });
    return ProductTermMapper.toDomain(entity);
    // return null;
  }

  async save(productTerm: ProductTerm): Promise<ProductTerm> {
    // console.log(productTerm);
    const persistenceModel = ProductTermMapper.toPersistence(productTerm);
    // console.log(persistenceModel);
    const newEntity = await this.productTermRepository.save(persistenceModel);
    // console.log(newEntity);
    return ProductTermMapper.toDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.productTermRepository.delete(id);
  }
}
