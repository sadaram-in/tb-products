import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountController } from '../presentation/http/discount.controller';
import { DiscountRepository } from '../infrastructure/persistance/orm/repositories/discount.repository';
import { DiscountEntity } from '../infrastructure/persistance/orm/entities/discount.entities';

import { CreateDiscountCommandHandler } from './commands/create-discount.command-handler';
import { UpdateDiscountCommandHandler } from './commands/update-discount.command-handler';
import { DeleteDiscountCommandHandler } from './commands/delete-discount.command-handler';

import { GetDiscountsQueryHandler } from './queries/get-discount.query-handler';
import { GetDiscountByIdQueryHandler,    } from './queries/get-discount-by-id.query-handler';

import {  DiscountService } from './discount.service';

import { IDiscountRepository } from '../domain/ports/discount.repository';
import { ResponseService } from 'src/shared/response/response.service';
import { DiscountFactory } from '../domain/factories/discount.factory';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  controllers: [DiscountController],
  providers: [
    DiscountService,
    ResponseService,
    DiscountFactory,
    {
      provide: IDiscountRepository,
      useClass: DiscountRepository,
    },
    CreateDiscountCommandHandler,
    GetDiscountsQueryHandler,
    GetDiscountByIdQueryHandler,
    UpdateDiscountCommandHandler,
    DeleteDiscountCommandHandler,
  ],
})
export class DiscountModule {}
