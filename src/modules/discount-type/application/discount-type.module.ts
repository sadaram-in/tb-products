import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountTypeController } from '../presentation/http/discount-type.controller';
import { DiscountTypeRepository } from '../infrastructure/persistance/orm/repositories/discount-type.repository';
import { DiscountTypeEntity } from '../infrastructure/persistance/orm/entities/discount-type.entities';

import { CreateDiscountTypeCommandHandler } from './commands/create-discount-type.command-handler';
import { UpdateDiscountTypeCommandHandler } from './commands/update-discount-type.command-handler';
import { DeleteDiscountTypeCommandHandler } from './commands/delete-discount-type.command-handler';

import { GetDiscountTypeQueryHandler } from './queries/get-discount-type.query-handler';
import { GetDiscountTypeByIdQueryHandler } from './queries/get-discount-type-by-id.query-handler';

import { DiscountTypeService } from './discount-type.service';

import { IDiscountTypeRepository } from '../domain/ports/discount-type.repository';
import { ResponseService } from 'src/shared/response/response.service';
import { DiscountTypeFactory } from '../domain/factories/discount-type.factory';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountTypeEntity])],
  controllers: [DiscountTypeController],
  providers: [
    DiscountTypeService,
    ResponseService,
    DiscountTypeFactory,
    {
      provide: IDiscountTypeRepository,
      useClass: DiscountTypeRepository,
    },
    CreateDiscountTypeCommandHandler,
    GetDiscountTypeQueryHandler,
    GetDiscountTypeByIdQueryHandler,
    UpdateDiscountTypeCommandHandler,
    DeleteDiscountTypeCommandHandler,
  ],
})
export class DiscountTypeModule {}
