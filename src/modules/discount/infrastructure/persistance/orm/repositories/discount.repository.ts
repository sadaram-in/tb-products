import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDiscountRepository } from '../../../../domain/ports/discount.repository';
import { Discount } from '../../../../domain/discount';
import { DiscountEntity } from '../entities/discount.entities';
import { DiscountMapper } from '../mappers/discount.mapper';

@Injectable()
export class DiscountRepository implements IDiscountRepository {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
  ) {}

  async findAll(): Promise<Discount[]> {
    const entities = await this.discountRepository.find();
    // console.log(entities);
    return entities.map((item) => DiscountMapper.toDomain(item));
  }

  async findOne(id: string): Promise<Discount> {
    const entity = await this.discountRepository.findOne({ where: { id } });
    return DiscountMapper.toDomain(entity);
    // return null;
  }

  async save(discount: Discount): Promise<Discount> {
    // console.log(product);
    const persistenceModel = DiscountMapper.toPersistence(discount);
    // console.log(persistenceModel);
    const newEntity = await this.discountRepository.save(persistenceModel);
    // console.log(newEntity);
    return DiscountMapper.toDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.discountRepository.delete(id);
  }
}
