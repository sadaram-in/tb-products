import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDiscountTypeRepository } from '../../../../domain/ports/discount-type.repository';
import { DiscountType } from '../../../../domain/discount-type';
import { DiscountTypeEntity } from '../entities/discount-type.entities';
import { DiscountTypeMapper } from '../mappers/discount-type.mapper';

@Injectable()
export class DiscountTypeRepository implements IDiscountTypeRepository {
  constructor(
    @InjectRepository(DiscountTypeEntity)
    private readonly discountTypeRepository: Repository<DiscountTypeEntity>,
  ) {}

  async findAll(): Promise<DiscountType[]> {
    const entities = await this.discountTypeRepository.find();
    // console.log(entities);
    return entities.map((item) => DiscountTypeMapper.toDomain(item));
  }

  async findOne(id: string): Promise<DiscountType> {
    const entity = await this.discountTypeRepository.findOne({ where: { id } });
    return DiscountTypeMapper.toDomain(entity);
    // return null;
  }

  async save(discount: DiscountType): Promise<DiscountType> {
    // console.log(product);
    const persistenceModel = DiscountTypeMapper.toPersistence(discount);
    // console.log(persistenceModel);
    const newEntity = await this.discountTypeRepository.save(persistenceModel);
    // console.log(newEntity);
    return DiscountTypeMapper.toDomain(newEntity);
  }

  async delete(id: string): Promise<void> {
    await this.discountTypeRepository.delete(id);
  }
}
