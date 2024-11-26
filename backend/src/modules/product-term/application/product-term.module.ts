import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTermController } from '../presentation/http/product-term.controller';
import { ProductTermRepository } from '../infrastructure/persistance/orm/repositories/product-term.repository';
import { ProductTermEntity } from '../infrastructure/persistance/orm/entities/product-term.entities';

import { CreateProductTermCommandHandler } from './commands/create-product-term.command-handler';
import { UpdateProductTermCommandHandler } from './commands/update-product-term.command-handler';
import { DeleteProductTermCommandHandler } from './commands/delete-product-term.command-handler';

import { GetProductTermQueryHandler } from './queries/get-product-term.query-handler';
import { GetProductTermByIdQueryHandler } from './queries/get-product-term-by-id.query-handler';

import { ProductTermService } from './product-term.service';

import { IProductTermRepository } from '../domain/ports/product-term.repository';
import { ResponseService } from 'src/shared/response/response.service';
import { ProductTermFactory } from '../domain/factories/product-term.factory';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTermEntity])],
  controllers: [ProductTermController],
  providers: [
    ProductTermService,
    ResponseService,
    ProductTermFactory,
    {
      provide: IProductTermRepository,
      useClass: ProductTermRepository,
    },
    CreateProductTermCommandHandler,
    GetProductTermQueryHandler,
    GetProductTermByIdQueryHandler,
    UpdateProductTermCommandHandler,
    DeleteProductTermCommandHandler,
  ],
})
export class ProductTermModule {}
