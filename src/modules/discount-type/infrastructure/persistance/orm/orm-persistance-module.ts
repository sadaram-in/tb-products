import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDiscountTypeRepository } from '../../../domain/ports/discount-type.repository';
import { DiscountTypeEntity } from 'src/modules/discount-type/infrastructure/persistance/orm/entities/discount-type.entities';
import { DiscountTypeRepository } from './repositories/discount-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountTypeEntity])],
  providers: [
    {
      provide: IDiscountTypeRepository,
      useClass: DiscountTypeRepository,
    },
  ],
  exports: [DiscountTypeRepository],
})
export class DiscountTypePersistenceModule {}
