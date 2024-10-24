import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDiscountRepository } from '../../../domain/ports/discount.repository';
import { DiscountEntity } from './entities/discount.entities';
import { DiscountRepository } from './repositories/discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  providers: [
    {
      provide: IDiscountRepository,
      useClass: DiscountRepository,
    },
  ],
  exports: [DiscountRepository],
})
export class DiscountPersistenceModule {}
